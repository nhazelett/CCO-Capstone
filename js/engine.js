/* ==========================================================================
   CCO CAPSTONE — EXERCISE ENGINE v0.2
   Clock, scheduler, state, cross-window sync via localStorage
   ========================================================================== */

const Engine = (function () {
  const STORAGE_KEY = 'cco-capstone-state';
  const CONFIG_KEY = 'cco-capstone-config';

  const state = {
    config: null,
    injects: [],
    phoneScripts: {},
    contacts: [],
    clock: {
      running: false,
      exerciseStart: null,
      exerciseMs: 0,
      dayStart: 8 * 60,
      wallToExerciseRatio: 10,
      interval: null
    },
    fired: new Set(),
    firedSms: new Set(),
    flagged: [],
    inbox: [],
    smsThreads: {},
    paused: false,
    // v0.2.6: resolved per-inject fire times (totalMinutes from exercise start).
    // Populated once at startExercise() so randomness is stable across ticks
    // and persists across page reloads via saveState/loadState.
    _resolvedTriggers: {},
    // v0.2.8: fixed-role assignments for inject routing.
    //   assignments — studentId -> role key. Role keys are one of:
    //     'cco'           — Contingency Contracting Officer (worker, default)
    //     'aco'           — Administrative CO (worker, gets cco + extra injects)
    //     'team_lead'     — Team Lead (leadership, minimum floor)
    //     'commander'     — Commander (top of leadership fall-through)
    //     'sel'           — Senior Enlisted Leader
    //     'flight_chief'  — Flight Chief
    //
    //   Each student holds ONE role. Leadership fall-through order for
    //   "who's primary on a leadership inject" is:
    //     commander -> sel -> flight_chief -> team_lead
    //   If none are assigned at fire time, leadership items land as broadcast
    //   (assigned_to = null) and all leaders will still see them once filled.
    //
    //   Filtering rules (applied client-side in student.js):
    //     role=cco           -> sees broadcast + role_tag:'cco'
    //     role=aco           -> sees broadcast + cco + aco
    //     role=team_lead/... -> sees EVERYTHING (leadership has full visibility)
    //
    //   Delegation (v0.2.9) will let leaders forward an item to a subordinate.
    team_roles: { assignments: {} }
  };

  // ----- Content loaders -----
  // Order of preference:
  //   1. window.__CCO_DATA (inline bundle, loaded via <script> — works from file://)
  //   2. fetch() of JSON files (works from local server)
  // Chrome blocks fetch() on file:// URLs, so the inline bundle is the only
  // path that works when users double-click index.html. Errors get logged to
  // state._loadErrors so the mobile debug drawer can display them.

  state._loadErrors = [];
  state._contentSource = null;

  function _recordErr(where, err) {
    const msg = err && err.message ? err.message : String(err);
    state._loadErrors.push({ where, msg, time: new Date().toISOString() });
    console.error('[CCO loader]', where, err);
  }

  async function loadInjects(injectIds) {
    const bundle = (window.__CCO_DATA && window.__CCO_DATA.injects) || null;
    if (bundle) {
      state.injects = injectIds.map((id) => bundle[id]).filter(Boolean);
      const missing = injectIds.filter((id) => !bundle[id]);
      if (missing.length) _recordErr('loadInjects', `missing in bundle: ${missing.join(',')}`);
      state._contentSource = state._contentSource || 'inline';
      return state.injects;
    }
    const results = await Promise.all(
      injectIds.map(async (id) => {
        try {
          const r = await fetch(`content/injects/${id}.json`);
          if (!r.ok) throw new Error(id);
          return await r.json();
        } catch (e) {
          _recordErr(`loadInjects:${id}`, e);
          return null;
        }
      })
    );
    state.injects = results.filter(Boolean);
    state._contentSource = state._contentSource || 'fetch';
    return state.injects;
  }

  async function loadPhoneScript(id) {
    if (state.phoneScripts[id]) return state.phoneScripts[id];
    const bundle = (window.__CCO_DATA && window.__CCO_DATA.phoneScripts) || null;
    if (bundle && bundle[id]) {
      state.phoneScripts[id] = bundle[id];
      state._contentSource = state._contentSource || 'inline';
      return bundle[id];
    }
    try {
      const r = await fetch(`content/phone-scripts/${id}.json`);
      if (!r.ok) throw new Error(id);
      const data = await r.json();
      state.phoneScripts[id] = data;
      state._contentSource = state._contentSource || 'fetch';
      return data;
    } catch (e) {
      _recordErr(`loadPhoneScript:${id}`, e);
      return null;
    }
  }

  async function loadContacts() {
    const bundle = (window.__CCO_DATA && window.__CCO_DATA.contacts) || null;
    if (bundle) {
      state.contacts = bundle.contacts || [];
      state.contacts.forEach((c) => {
        if (!state.smsThreads[c.id]) state.smsThreads[c.id] = [];
      });
      state._contentSource = state._contentSource || 'inline';
      return state.contacts;
    }
    try {
      const r = await fetch('content/contacts/contacts.json');
      if (!r.ok) throw new Error('contacts HTTP ' + r.status);
      const data = await r.json();
      state.contacts = data.contacts || [];
      state.contacts.forEach((c) => {
        if (!state.smsThreads[c.id]) state.smsThreads[c.id] = [];
      });
      state._contentSource = state._contentSource || 'fetch';
      return state.contacts;
    } catch (e) {
      _recordErr('loadContacts', e);
      return [];
    }
  }

  // ----- Clock -----

  function startExercise(config) {
    state.config = config;
    state.clock.running = true;
    state.clock.exerciseStart = new Date();
    state.clock.exerciseMs = 0;
    state.fired.clear();
    state.firedSms.clear();
    state.flagged = [];
    state.inbox = [];
    state.smsThreads = {};
    state.contacts.forEach((c) => { state.smsThreads[c.id] = []; });
    state.paused = false;
    state.team_roles = { assignments: {} };
    resolveTriggers();
    saveState();
    if (state.clock.interval) clearInterval(state.clock.interval);
    state.clock.interval = setInterval(tick, 1000);
    processInjects();
  }

  // v0.2.6: random inject timing.
  // Each inject declares either:
  //   trigger.type === 'absolute'  + day/hour/minute (+ optional jitter in min)
  //   trigger.type === 'window'    + day + earliest_hour..latest_hour
  // Both resolve to a concrete totalMinutes for this exercise run, stored in
  // state._resolvedTriggers. Called at startExercise(). Results persist so
  // reloading doesn't reshuffle the schedule mid-exercise.
  function resolveTriggers() {
    state._resolvedTriggers = {};
    state.injects.forEach((inj) => {
      const t = inj.trigger;
      if (!t) return;
      let minutes;
      if (t.type === 'window') {
        const eh = t.earliest_hour   != null ? t.earliest_hour   : 8;
        const em = t.earliest_minute != null ? t.earliest_minute : 0;
        const lh = t.latest_hour     != null ? t.latest_hour     : 17;
        const lm = t.latest_minute   != null ? t.latest_minute   : 0;
        const earliest = (t.day - 1) * 1440 + eh * 60 + em;
        const latest   = (t.day - 1) * 1440 + lh * 60 + lm;
        const range = Math.max(1, latest - earliest);
        minutes = earliest + Math.floor(Math.random() * range);
      } else {
        const base = (t.day - 1) * 1440 + (t.hour || 0) * 60 + (t.minute || 0);
        const jitter = t.jitter_minutes || 0;
        const offset = jitter
          ? (Math.floor(Math.random() * (2 * jitter + 1)) - jitter)
          : 0;
        minutes = Math.max(0, base + offset);
      }
      state._resolvedTriggers[inj.id] = minutes;
    });
  }

  function tick() {
    if (state.paused) return;
    state.clock.exerciseMs += 1000 * state.clock.wallToExerciseRatio;
    processInjects();
    processSmsDelays();
    saveState();
    dispatch('engine:tick', getExerciseTime());
  }

  function getExerciseTime() {
    const elapsedMin = Math.floor(state.clock.exerciseMs / 60000);
    const total = state.clock.dayStart + elapsedMin;
    const day = Math.floor(total / (24 * 60)) + 1;
    const minInDay = total % (24 * 60);
    const hour = Math.floor(minInDay / 60);
    const minute = minInDay % 60;
    return {
      day, hour, minute, totalMinutes: total,
      displayString: `D${day} ${pad(hour)}:${pad(minute)}`,
      shortTime: `${pad(hour)}:${pad(minute)}`
    };
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  // ----- Inject firing -----

  function processInjects() {
    const now = getExerciseTime();
    state.injects.forEach((inj) => {
      if (state.fired.has(inj.id)) return;
      if (shouldFire(inj, now)) fireInject(inj);
    });
  }

  function shouldFire(inj, now) {
    const resolved = state._resolvedTriggers && state._resolvedTriggers[inj.id];
    if (resolved == null) {
      // Fallback: compute from absolute trigger (handles injects added after
      // startExercise or loaded from state that predates _resolvedTriggers).
      if (!inj.trigger || inj.trigger.type === 'window') return false;
      const t = inj.trigger;
      const base = (t.day - 1) * 1440 + (t.hour || 0) * 60 + (t.minute || 0);
      return now.totalMinutes >= base;
    }
    return now.totalMinutes >= resolved;
  }

  function fireInject(inj) {
    state.fired.add(inj.id);

    // v0.2.8: resolve who this inject's inbox items should land on.
    //   role_tag unset / 'broadcast'  -> assigned_to = null (everyone sees)
    //   role_tag 'cco' / 'aco'        -> assigned_to = null, filtered at render
    //                                    (CCOs/ACOs both see cco; only ACO sees aco)
    //   role_tag 'leadership'         -> assigned_to = top of fall-through chain
    //                                    (commander -> sel -> flight_chief -> team_lead)
    //                                    All leaders still SEE it; primary is the
    //                                    one who's "on point."
    const routing = resolveRouting(inj);

    // Inbox items -> student mail
    if (inj.inbox_items) {
      inj.inbox_items.forEach((item) => {
        state.inbox.unshift({
          id: `${inj.id}-${item.id}`,
          injectId: inj.id,
          from: item.from,
          fromEmail: item.from_email || '',
          subject: item.subject,
          body: item.body,
          time: getExerciseTime().displayString,
          unread: true,
          // v0.2.8 routing fields
          role_tag: routing.role_tag,         // 'cco'|'aco'|'leadership'|null
          assigned_to: routing.assigned_to    // studentId (leadership primary) or null
        });
      });
    }

    // SMS items -> scheduled for later delivery
    if (inj.sms_items) {
      inj.sms_items.forEach((sms) => {
        const fireAt = getExerciseTime().totalMinutes + (sms.delay_minutes || 0);
        sms.messages.forEach((text, idx) => {
          state.firedSms.add(`${inj.id}-${sms.id}-${idx}-pending`);
        });
        // Store pending SMS with scheduled delivery time
        if (!state._pendingSms) state._pendingSms = [];
        sms.messages.forEach((text, idx) => {
          state._pendingSms.push({
            id: `${inj.id}-${sms.id}-${idx}`,
            contactId: sms.contact_id,
            text: text,
            fireAt: fireAt + (idx * 0.5) // small stagger between messages in a burst
          });
        });
      });
    }

    dispatch('engine:inject-fired', inj);
  }

  function processSmsDelays() {
    if (!state._pendingSms || state._pendingSms.length === 0) return;
    const nowMin = getExerciseTime().totalMinutes;
    const ready = state._pendingSms.filter((m) => nowMin >= m.fireAt);
    if (ready.length === 0) return;
    ready.forEach((msg) => {
      if (!state.smsThreads[msg.contactId]) state.smsThreads[msg.contactId] = [];
      state.smsThreads[msg.contactId].push({
        id: msg.id,
        direction: 'in',
        text: msg.text,
        time: getExerciseTime().displayString,
        unread: true
      });
      dispatch('engine:sms-received', { contactId: msg.contactId, text: msg.text });
    });
    state._pendingSms = state._pendingSms.filter((m) => nowMin < m.fireAt);
  }

  function fireNextInject() {
    const now = getExerciseTime();
    const queued = state.injects
      .filter((i) => !state.fired.has(i.id))
      .sort((a, b) => triggerMinutes(a) - triggerMinutes(b));
    if (queued.length > 0) fireInject(queued[0]);
  }

  function triggerMinutes(inj) {
    const resolved = state._resolvedTriggers && state._resolvedTriggers[inj.id];
    if (resolved != null) return resolved;
    const t = inj.trigger || {};
    return (t.day - 1) * 1440 + (t.hour || 0) * 60 + (t.minute || 0);
  }

  // ----- v0.2.8: role-based routing -----
  //
  // Each student holds exactly one role. Role keys:
  //   'cco'          — Contingency CO (default worker)
  //   'aco'          — Administrative CO (worker + extras)
  //   'team_lead'    — Team Lead (leadership floor — at least one required)
  //   'commander'    — Commander
  //   'sel'          — Senior Enlisted Leader
  //   'flight_chief' — Flight Chief
  //
  // Leadership fall-through order (for leadership-tagged injects):
  //   commander -> sel -> flight_chief -> team_lead
  //
  // Inject routing at fire time (resolveRouting reads inj.role_tag):
  //
  //   inj.role_tag        outcome
  //   ──────────────      ─────────────────────────────────────────────────
  //   unset/'broadcast'   { assigned_to: null, role_tag: null }
  //                       Everyone sees it.
  //   'cco'               { assigned_to: null, role_tag: 'cco' }
  //                       CCOs, ACOs, and leaders see it. Filtered at render.
  //   'aco'               { assigned_to: null, role_tag: 'aco' }
  //                       ACOs and leaders see it. CCOs do NOT.
  //   'leadership'        { assigned_to: <primary>, role_tag: 'leadership' }
  //                       All leaders see it; <primary> is the fall-through
  //                       top (whoever the team currently expects to own it).
  //                       If no leader is assigned at fire time, assigned_to
  //                       is null and retroactiveRouteRefresh() will re-stamp
  //                       it once a leader takes a slot.
  //
  // Delegation (v0.2.9): a leader will be able to forward a specific inbox
  // item to a CCO/ACO. That will stamp item.delegated_to on top of the
  // role_tag filter so the subordinate sees it even though the role_tag
  // wouldn't normally route to them.

  const LEADERSHIP_ROLES = ['commander', 'sel', 'flight_chief', 'team_lead'];

  function getRoleOf(studentId) {
    if (!studentId) return null;
    return (state.team_roles.assignments || {})[studentId] || null;
  }

  function getStudentsWithRole(role) {
    const out = [];
    const a = state.team_roles.assignments || {};
    Object.keys(a).forEach((id) => { if (a[id] === role) out.push(id); });
    return out;
  }

  function getLeadershipPrimary() {
    // Walk the fall-through chain: commander -> sel -> flight_chief -> team_lead
    // Return the studentId of the first role that has at least one holder.
    for (const role of LEADERSHIP_ROLES) {
      const holders = getStudentsWithRole(role);
      if (holders.length > 0) return holders[0];
    }
    return null;
  }

  function resolveRouting(inj) {
    const tag = inj.role_tag || null;
    if (!tag || tag === 'broadcast') {
      return { assigned_to: null, role_tag: null };
    }
    if (tag === 'leadership') {
      return { assigned_to: getLeadershipPrimary(), role_tag: 'leadership' };
    }
    // 'cco' or 'aco' — no single primary; filter at render time
    return { assigned_to: null, role_tag: tag };
  }

  function assignRole(studentId, roleKey) {
    if (!studentId) return;
    if (!state.team_roles.assignments) state.team_roles.assignments = {};
    if (!roleKey) {
      delete state.team_roles.assignments[studentId];
    } else {
      state.team_roles.assignments[studentId] = roleKey;
    }
    retroactiveRouteRefresh();
    saveState();
    dispatch('engine:team-roles-updated', { team_roles: state.team_roles });
  }

  function retroactiveRouteRefresh() {
    // Re-stamp leadership-tagged inbox items to reflect the current
    // fall-through top. Forward-only: if an item is already assigned and
    // the primary shifts, we move it; but broadcasts and cco/aco-tagged
    // items are filtered client-side and don't need re-stamping here.
    const primary = getLeadershipPrimary();
    state.inbox.forEach((m) => {
      if (m.role_tag === 'leadership') {
        m.assigned_to = primary;
      }
    });
  }

  function getTeamRoles() {
    return state.team_roles;
  }

  function getAssignedPlayer(inj) {
    // helper for UI: "if this inject fired right now, who would be primary?"
    return resolveRouting(inj).assigned_to;
  }

  // ----- State controls -----

  function pause() { state.paused = true; saveState(); dispatch('engine:paused'); }
  function resume() { state.paused = false; saveState(); dispatch('engine:resumed'); }

  function endExercise() {
    state.clock.running = false;
    if (state.clock.interval) { clearInterval(state.clock.interval); state.clock.interval = null; }
    saveState();
    dispatch('engine:endex');
  }

  function flagForHotwash(injectId, note) {
    state.flagged.push({ injectId, note: note || '', time: getExerciseTime().displayString });
    saveState();
  }

  function markInboxRead(itemId) {
    const item = state.inbox.find((i) => i.id === itemId);
    if (item) { item.unread = false; saveState(); dispatch('engine:inbox-updated'); }
  }

  function markSmsRead(contactId) {
    if (state.smsThreads[contactId]) {
      state.smsThreads[contactId].forEach((m) => { m.unread = false; });
      saveState();
      dispatch('engine:sms-updated');
    }
  }

  function sendCustomSms(contactId, text) {
    if (!state.smsThreads[contactId]) state.smsThreads[contactId] = [];
    state.smsThreads[contactId].push({
      id: `custom-${Date.now()}`,
      direction: 'in',
      text: text,
      time: getExerciseTime().displayString,
      unread: true
    });
    saveState();
    dispatch('engine:sms-received', { contactId, text });
  }

  // ----- Persistence -----

  function saveState() {
    // In read-only mode (phone, student) we never write state back to
    // localStorage. This prevents races where the consumer clobbers the
    // producer's (trainer's) latest updates.
    if (state.readOnly) return;
    try {
      const snap = {
        config: state.config,
        clock: {
          running: state.clock.running,
          exerciseStart: state.clock.exerciseStart ? state.clock.exerciseStart.toISOString() : null,
          exerciseMs: state.clock.exerciseMs,
          dayStart: state.clock.dayStart,
          wallToExerciseRatio: state.clock.wallToExerciseRatio
        },
        fired: Array.from(state.fired),
        firedSms: Array.from(state.firedSms),
        flagged: state.flagged,
        inbox: state.inbox,
        smsThreads: state.smsThreads,
        _pendingSms: state._pendingSms || [],
        _resolvedTriggers: state._resolvedTriggers || {},
        team_roles: state.team_roles || { assignments: {} },
        paused: state.paused,
        _lastUpdate: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snap));
    } catch (e) { console.error('Save fail:', e); }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const s = JSON.parse(raw);
      state.config = s.config;
      state.clock.running = s.clock.running;
      state.clock.exerciseStart = s.clock.exerciseStart ? new Date(s.clock.exerciseStart) : null;
      state.clock.exerciseMs = s.clock.exerciseMs;
      state.clock.dayStart = s.clock.dayStart;
      state.clock.wallToExerciseRatio = s.clock.wallToExerciseRatio;
      state.fired = new Set(s.fired || []);
      state.firedSms = new Set(s.firedSms || []);
      state.flagged = s.flagged || [];
      state.inbox = s.inbox || [];
      state.smsThreads = s.smsThreads || {};
      state._pendingSms = s._pendingSms || [];
      state._resolvedTriggers = s._resolvedTriggers || {};
      // v0.2.8: accept both new shape and legacy {lead,duties} shape
      // (legacy state is silently discarded — roles must be re-assigned).
      const incoming = s.team_roles || {};
      state.team_roles = incoming.assignments
        ? { assignments: incoming.assignments }
        : { assignments: {} };
      state.paused = s.paused || false;

      // Only start a local tick interval if NOT in read-only mode.
      // Read-only consumers (phone, student) should never run the clock
      // themselves — they only observe state that the trainer writes.
      if (state.clock.running && !state.paused && !state.readOnly) {
        if (state.clock.interval) clearInterval(state.clock.interval);
        state.clock.interval = setInterval(tick, 1000);
      }
      return true;
    } catch (e) { console.error('Load fail:', e); return false; }
  }

  function setReadOnly(v) {
    state.readOnly = !!v;
    if (state.readOnly && state.clock.interval) {
      clearInterval(state.clock.interval);
      state.clock.interval = null;
    }
  }

  function resetState() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CONFIG_KEY);
    if (state.clock.interval) clearInterval(state.clock.interval);
    state.config = null;
    state.clock = { running: false, exerciseStart: null, exerciseMs: 0, dayStart: 8*60, wallToExerciseRatio: 10, interval: null };
    state.fired.clear();
    state.firedSms.clear();
    state.flagged = [];
    state.inbox = [];
    state.smsThreads = {};
    state._pendingSms = [];
    state.team_roles = { assignments: {} };
    state.paused = false;
  }

  // ----- Cross-window sync -----
  // When one window writes state, other windows receive a 'storage' event
  // and reload the state. This is how the trainer, student, and mobile
  // views stay in sync without a server.

  function enableSync() {
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        // Another window updated state — reload silently
        const wasRunning = state.clock.running;
        loadState();
        dispatch('engine:sync', null);
      }
    });
  }

  // ----- Event dispatching -----

  function dispatch(name, detail) {
    document.dispatchEvent(new CustomEvent(name, { detail }));
  }

  // ----- Public API -----
  return {
    loadInjects, loadPhoneScript, loadContacts,
    startExercise, pause, resume, endExercise,
    flagForHotwash, fireNextInject,
    markInboxRead, markSmsRead, sendCustomSms,
    getExerciseTime, loadState, resetState, enableSync,
    setReadOnly,
    // v0.2.8 role-based routing
    assignRole, getRoleOf, getStudentsWithRole,
    getLeadershipPrimary, getTeamRoles, getAssignedPlayer,
    LEADERSHIP_ROLES,
    getState: () => state,
    getContacts: () => state.contacts,
    getContact: (id) => state.contacts.find((c) => c.id === id),
    getResolvedTriggerMinutes: (id) => state._resolvedTriggers[id],
    resolveTriggers
  };
})();
