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
    paused: false
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
    saveState();
    if (state.clock.interval) clearInterval(state.clock.interval);
    state.clock.interval = setInterval(tick, 1000);
    processInjects();
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
    if (!inj.trigger || inj.trigger.type !== 'absolute') return false;
    const t = inj.trigger;
    const triggerMin = (t.day - 1) * 1440 + t.hour * 60 + t.minute;
    return now.totalMinutes >= triggerMin;
  }

  function fireInject(inj) {
    state.fired.add(inj.id);

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
          unread: true
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
    const t = inj.trigger;
    return (t.day - 1) * 1440 + t.hour * 60 + t.minute;
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
    getState: () => state,
    getContacts: () => state.contacts,
    getContact: (id) => state.contacts.find((c) => c.id === id)
  };
})();
