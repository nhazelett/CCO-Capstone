/* ==========================================================================
   STUDENT WORKSTATION
   ========================================================================== */

// v0.2.7: load every inject present in the bundle so the read-only student
// view has full metadata for anything the trainer might fire.
function bundleInjectIds() {
  return (window.__CCO_DATA && window.__CCO_DATA.injects)
    ? Object.keys(window.__CCO_DATA.injects)
    : ['IM-01', 'IM-02'];
}
// v0.2.9: simplified selection model — only one thing is "open" in the
// reading pane at a time. Either an email (selectedMailId) or an SMS
// thread (selectedTextsContactId). Selecting one clears the other.
let selectedMailId = null;
let selectedTextsContactId = null;

// v0.2.7: student responses are persisted to a separate localStorage key
// (NOT the main state key) so they survive read-only mode and don't race
// the trainer's state writes. The inspector.js view reads this key during
// grading to show what the student actually did in response to each inject.
const STUDENT_RESPONSES_KEY = 'cco-capstone-student-responses';
let studentResponses = loadStudentResponses();

// v0.2.9: notes — free-text scratchpad per persona. Persisted in a separate
// localStorage namespace so observer notes, CCO notes, Commander notes, etc.
// don't collide on the same laptop, and none of them race the main state
// key (which is read-only from the student side).
const STUDENT_NOTES_KEY_PREFIX = 'cco-capstone-notes-';
function notesKeyFor(persona) {
  if (persona === 'observer') return STUDENT_NOTES_KEY_PREFIX + 'observer';
  if (!persona || !persona.id) return STUDENT_NOTES_KEY_PREFIX + 'unassigned';
  return STUDENT_NOTES_KEY_PREFIX + persona.id;
}
function loadNotes() {
  try { return localStorage.getItem(notesKeyFor(currentPersona)) || ''; }
  catch (e) { return ''; }
}
function saveNotes(text) {
  try { localStorage.setItem(notesKeyFor(currentPersona), text || ''); }
  catch (e) { console.error('notes save fail', e); }
}
let notesSaveTimer = null;

// v0.2.14: additional sticky notes — Actions Taken & Key Info
const STUDENT_ACTIONS_KEY_PREFIX = 'cco-capstone-actions-';
const STUDENT_KEYINFO_KEY_PREFIX = 'cco-capstone-keyinfo-';
function actionsKeyFor(persona) {
  if (persona === 'observer') return STUDENT_ACTIONS_KEY_PREFIX + 'observer';
  if (!persona || !persona.id) return STUDENT_ACTIONS_KEY_PREFIX + 'unassigned';
  return STUDENT_ACTIONS_KEY_PREFIX + persona.id;
}
function keyinfoKeyFor(persona) {
  if (persona === 'observer') return STUDENT_KEYINFO_KEY_PREFIX + 'observer';
  if (!persona || !persona.id) return STUDENT_KEYINFO_KEY_PREFIX + 'unassigned';
  return STUDENT_KEYINFO_KEY_PREFIX + persona.id;
}
function loadActions() {
  try { return localStorage.getItem(actionsKeyFor(currentPersona)) || ''; }
  catch (e) { return ''; }
}
function saveActions(text) {
  try { localStorage.setItem(actionsKeyFor(currentPersona), text || ''); }
  catch (e) {}
}
function loadKeyInfo() {
  try { return localStorage.getItem(keyinfoKeyFor(currentPersona)) || ''; }
  catch (e) { return ''; }
}
function saveKeyInfo(text) {
  try { localStorage.setItem(keyinfoKeyFor(currentPersona), text || ''); }
  catch (e) {}
}
let actionsSaveTimer = null;
let keyinfoSaveTimer = null;

// v0.2.10: per-laptop dismissed mail tracking. Students can close/hide any
// email they're done with — it stays in the underlying inbox (so inspectors
// and the trainer still see it) but vanishes from this student's list. The
// set is keyed per persona so "Ramirez dismissed this" doesn't hide it
// from Chen working on the same laptop under a different persona later.
const DISMISSED_MAIL_KEY_PREFIX = 'cco-capstone-dismissed-mail-';
function dismissedKeyFor(persona) {
  if (persona === 'observer') return DISMISSED_MAIL_KEY_PREFIX + 'observer';
  if (!persona || !persona.id) return DISMISSED_MAIL_KEY_PREFIX + 'unassigned';
  return DISMISSED_MAIL_KEY_PREFIX + persona.id;
}
function loadDismissedMail() {
  try {
    const raw = localStorage.getItem(dismissedKeyFor(currentPersona));
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch (e) { return new Set(); }
}
function saveDismissedMail(set) {
  try {
    localStorage.setItem(dismissedKeyFor(currentPersona), JSON.stringify(Array.from(set)));
  } catch (e) {}
}
function dismissMail(id) {
  const s = loadDismissedMail();
  s.add(id);
  saveDismissedMail(s);
  if (selectedMailId === id) selectedMailId = null;
}
function undismissMail(id) {
  const s = loadDismissedMail();
  s.delete(id);
  saveDismissedMail(s);
}

// v0.2.8: persona picker — which roster member is seated at this laptop.
// Per-laptop localStorage (not synced via main state key) so multiple
// student workstations can all run against the same exercise without
// colliding. 'observer' is a special value for the trainer's laptop that
// sees everything unfiltered.
const PERSONA_KEY = 'cco-capstone-student-persona';
let currentPersona = loadPersona(); // { id, name, role, color, initials } or 'observer' or null

function loadPersona() {
  try {
    const raw = localStorage.getItem(PERSONA_KEY);
    if (!raw) return null;
    if (raw === 'observer') return 'observer';
    return JSON.parse(raw);
  } catch (e) { return null; }
}
function savePersona(p) {
  try {
    if (p === 'observer') localStorage.setItem(PERSONA_KEY, 'observer');
    else if (p) localStorage.setItem(PERSONA_KEY, JSON.stringify(p));
    else localStorage.removeItem(PERSONA_KEY);
  } catch (e) {}
}
function personaId() {
  if (!currentPersona || currentPersona === 'observer') return null;
  return currentPersona.id;
}
function isObserver() { return currentPersona === 'observer'; }

// v0.2.8: What role does this persona currently hold? Reads team_roles
// assignments from engine. Returns a role key ('cco'|'aco'|'team_lead'|
// 'commander'|'sel'|'flight_chief') or null.
function personaRole() {
  if (!currentPersona || currentPersona === 'observer') return null;
  if (!Engine.getRoleOf) return null;
  return Engine.getRoleOf(currentPersona.id);
}

const LEADER_ROLE_KEYS = ['commander', 'sel', 'flight_chief', 'team_lead'];
function isLeaderRole(role) { return LEADER_ROLE_KEYS.indexOf(role) !== -1; }
function roleLabel(role) {
  return ({
    cco: 'cco', aco: 'aco', team_lead: 'team lead',
    commander: 'commander', sel: 'SEL', flight_chief: 'flight chief'
  })[role] || role || 'unassigned';
}
function ucfirst(s) { return s ? s[0].toUpperCase() + s.slice(1) : s; }

// Core filter: does this student see this inbox item?
// Rules by role:
//   - observer                      → see everything
//   - no persona chosen              → fail-open (dev iteration)
//   - no role assigned yet           → broadcasts only (role_tag null)
//   - leader (Cmdr/SEL/FC/TL)        → see everything
//   - aco                            → broadcasts + cco + aco
//   - cco                            → broadcasts + cco (NOT aco, NOT leadership)
//
// Delegation (v0.2.9): if item.delegated_to === me, show regardless.
function itemVisibleToMe(item) {
  if (isObserver()) return true;
  if (!currentPersona) return true; // fail-open in dev
  const me = currentPersona.id;

  // v0.2.9: trainer replies (and other private items) are visible ONLY to
  // the delegated target. Leaders can also see them — they need visibility
  // into the full conversation when auditing. Non-leaders who aren't the
  // target don't see it at all.
  if (item.is_trainer_reply || item.is_private) {
    if (item.delegated_to === me) return true;
    const myRole0 = personaRole();
    return isLeaderRole(myRole0);
  }

  // Normal delegation (a leader forwards an inbox item) is ADDITIVE — the
  // target sees it even if their role_tag wouldn't normally route to them.
  if (item.delegated_to === me) return true;

  const tag = item.role_tag || null;
  const myRole = personaRole();
  // No role assigned → broadcast only
  if (!myRole) return tag == null;
  // Leaders see everything (broadcasts, cco, aco, leadership)
  if (isLeaderRole(myRole)) return true;
  // ACO: broadcasts + cco + aco (not leadership)
  if (myRole === 'aco') return tag == null || tag === 'cco' || tag === 'aco';
  // CCO: broadcasts + cco only
  if (myRole === 'cco') return tag == null || tag === 'cco';
  return true;
}

function loadStudentResponses() {
  try {
    const raw = localStorage.getItem(STUDENT_RESPONSES_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) { return {}; }
}
function saveStudentResponses() {
  try { localStorage.setItem(STUDENT_RESPONSES_KEY, JSON.stringify(studentResponses)); }
  catch (e) { console.error('student response save fail:', e); }
}
function responseFor(injectId) {
  if (!studentResponses[injectId]) {
    studentResponses[injectId] = {
      injectId,
      action: '',
      authority: '',
      rationale: '',
      locked: false,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };
  }
  return studentResponses[injectId];
}
// v0.2.9: flashSaveHint removed — the response-hint DOM node was deleted
// with the old response panel. Response storage helpers stay in place so
// inspector grading can still read anything that was captured in v0.2.7/8.

// v0.2.11: render (or remove) the "waiting for kickoff" banner based on
// the current session phase. When trainer clicks Start Exercise, the
// storage event flips phase to 'cold-open' and this function clears the
// banner on the next engine:phase-changed or engine:sync.
function renderStudentKickoffBanner() {
  const phase = Engine.getPhase ? Engine.getPhase() : 'cold-open';
  let overlay = document.getElementById('student-kickoff-overlay');
  if (phase !== 'pre-exercise') {
    if (overlay) overlay.remove();
    return;
  }
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'student-kickoff-overlay';
    overlay.className = 'kickoff-overlay kickoff-overlay-student';
    document.body.appendChild(overlay);
  }
  const code = (Engine.getSession && Engine.getSession()) || 'default';
  const name = currentPersona ? currentPersona.name : 'You';
  overlay.innerHTML = `
    <div class="kickoff-card kickoff-card-student">
      <div class="kickoff-head">
        <div class="micro micro-accent">Waiting for kickoff</div>
        <h1 class="kickoff-title">Stand by, <strong>${name}</strong>.</h1>
        <p class="kickoff-sub">You're joined to session <span class="session-code mono">${code}</span>. The trainer will start the exercise when everyone's on deck. Your dashboard will come alive the moment they hit Start.</p>
      </div>
      <div class="kickoff-student-spinner">
        <div class="kickoff-pulse"></div>
        <div class="kickoff-pulse"></div>
        <div class="kickoff-pulse"></div>
      </div>
    </div>
  `;
}

(async function init() {
  // Student workstation is read-only. Only the trainer ticks.
  Engine.setReadOnly(true);

  await Engine.loadContacts();
  await Engine.loadInjects(bundleInjectIds());
  Engine.loadState();
  Engine.enableSync();

  // v0.2.11: if the URL carried an identity hint (?as=student:stu-1) use it
  // to pre-select the persona. Trainer-generated launch links bake this in.
  if (Engine.readIdentityFromLocation) {
    const ident = Engine.readIdentityFromLocation();
    if (ident && ident.type === 'student' && ident.id) {
      const cfg = Engine.getState().config || {};
      const match = (cfg.students || []).find(s => s.id === ident.id);
      if (match) {
        currentPersona = {
          id: match.id,
          name: match.name,
          shop: match.shop || 'CONS',
          color: match.color,
          initials: match.initials
        };
        try { localStorage.setItem(PERSONA_KEY, JSON.stringify(currentPersona)); } catch (e) {}
      }
    }
  }

  // v0.2.11: start presence heartbeat so the trainer sees us joined.
  if (Engine.startPresence) {
    const presenceId = currentPersona
      ? ((currentPersona.shop === 'whitecell' ? 'whitecell:' : 'student:') + currentPersona.id)
      : 'student:unassigned';
    Engine.startPresence(presenceId, {
      role: 'student',
      name: currentPersona ? currentPersona.name : 'Unassigned',
      identity: presenceId
    });
  }

  // v0.2.11: kickoff waiting overlay renders if phase === 'pre-exercise'.
  renderStudentKickoffBanner();
  document.addEventListener('engine:phase-changed', renderStudentKickoffBanner);

  // v0.2.8: show persona picker if nothing is stored yet
  wirePersonaBar();
  if (!currentPersona) {
    showPersonaOverlay();
  } else {
    renderPersonaBar();
  }

  initKDrive();
  initPhone();
  renderAll();

  document.addEventListener('engine:tick', () => {
    renderClock();
  });
  document.addEventListener('engine:sync', () => {
    renderPersonaBar();
    renderStudentKickoffBanner();
    renderAll();
  });
  document.addEventListener('engine:inject-fired', renderAll);
  document.addEventListener('engine:inbox-updated', renderAll);
  // v0.2.12: keep the unclaimed tray reactive without waiting for sync
  document.addEventListener('engine:unclaimed-inject',   renderUnclaimedTray);
  document.addEventListener('engine:unclaimed-resolved', renderUnclaimedTray);
  document.addEventListener('engine:team-roles-updated', renderUnclaimedTray);
  document.addEventListener('engine:team-roles-updated', () => {
    renderPersonaBar();
    renderAll();
  });
  document.addEventListener('engine:sms-received', () => {
    renderTextsList();
    if (selectedTextsContactId) renderReadingPane();
  });
  document.addEventListener('engine:sms-updated', () => {
    renderTextsList();
    if (selectedTextsContactId) renderReadingPane();
  });

  // Safety poll - same as mobile view. Uses session-scoped key via engine.
  let lastSnapshot = '';
  setInterval(() => {
    try {
      const raw = Engine.getRawStateString ? Engine.getRawStateString() : null;
      if (!raw) return;
      if (raw === lastSnapshot) return;
      lastSnapshot = raw;
      Engine.loadState();
      renderAll();
    } catch (e) { console.error('Poll error', e); }
  }, 1500);
})();

function renderAll() {
  renderClock();
  renderPhoneClock();
  renderPersonaBar();
  renderUnclaimedTray();
  renderMailList();
  renderTextsList();
  renderReadingPane();
  renderNotesPanel();
  renderPhoneBadges();
  startSignalNoise();
}

// v0.2.12: unclaimed inject tray. When a leadership-tagged inject fires
// and nobody on the team has claimed commander / SEL / flight chief /
// team lead, the engine pushes an entry into state.unclaimedInjects. We
// render a red warning bar at the top of every student dashboard so the
// whole team sees "NOBODY OWNS THIS — somebody needs to step up." The
// bar hides the moment a leader is assigned (retroactiveRouteRefresh
// marks entries resolved and they filter out of listUnclaimedInjects).
function renderUnclaimedTray() {
  if (!Engine.listUnclaimedInjects) return;
  const entries = Engine.listUnclaimedInjects();
  let bar = document.getElementById('unclaimed-tray');

  // Hide / remove when nothing unclaimed
  if (!entries || entries.length === 0) {
    if (bar) bar.remove();
    return;
  }

  // Create on first use, insert above the main grid
  if (!bar) {
    const main = document.querySelector('.student-main');
    if (!main) return;
    bar = document.createElement('div');
    bar.id = 'unclaimed-tray';
    bar.className = 'unclaimed-tray';
    const personaBar = document.getElementById('persona-bar');
    if (personaBar && personaBar.nextSibling) {
      main.insertBefore(bar, personaBar.nextSibling);
    } else {
      main.insertBefore(bar, main.firstChild);
    }
  }

  const countLabel = entries.length === 1 ? '1 unclaimed inject' : `${entries.length} unclaimed injects`;
  const rows = entries.map(e => {
    const subj = esc(e.subject || 'Leadership action required');
    const time = esc(e.firedAtDisplay || '');
    return `
      <li class="unclaimed-row">
        <span class="unclaimed-row-tag">Leadership</span>
        <span class="unclaimed-row-subject">${subj}</span>
        <span class="unclaimed-row-time mono">${time}</span>
      </li>
    `;
  }).join('');

  bar.innerHTML = `
    <div class="unclaimed-tray-head">
      <div class="unclaimed-tray-flag">⚠</div>
      <div class="unclaimed-tray-text">
        <div class="unclaimed-tray-title">${countLabel} — nobody on your team is commander yet.</div>
        <div class="unclaimed-tray-sub mono">Assign a leader to claim these items.</div>
      </div>
    </div>
    <ul class="unclaimed-tray-list">${rows}</ul>
  `;
}

// v0.2.8: persona bar + overlay picker
function wirePersonaBar() {
  const switchBtn = document.getElementById('persona-switch-btn');
  if (switchBtn) {
    switchBtn.addEventListener('click', showPersonaOverlay);
  }
  const observeBtn = document.getElementById('persona-observe-btn');
  if (observeBtn) {
    observeBtn.addEventListener('click', () => {
      currentPersona = 'observer';
      savePersona('observer');
      hidePersonaOverlay();
      renderPersonaBar();
      renderAll();
    });
  }
}

function configStudents() {
  const s = Engine.getState();
  return (s.config && (s.config.students || s.config.roster)) || [];
}

function showPersonaOverlay() {
  const overlay = document.getElementById('persona-overlay');
  const list = document.getElementById('persona-overlay-list');
  if (!overlay || !list) return;
  const students = configStudents();
  if (students.length === 0) {
    list.innerHTML = `
      <div class="muted text-center" style="padding: 24px 8px; font-size: 12px;">
        No roster loaded. Run STARTEX first, then return here.
      </div>`;
  } else {
    list.innerHTML = students.map(st => `
      <button class="persona-choice" data-id="${esc(st.id)}">
        <div class="persona-choice-avatar" style="background: ${esc(st.color || '#8A7AB0')};">
          ${esc(st.initials || initialsFromName(st.name))}
        </div>
        <div class="persona-choice-body">
          <div class="persona-choice-name">${esc(st.name)}</div>
          <div class="persona-choice-role">${esc(st.role || '—')}</div>
        </div>
      </button>
    `).join('');
    list.querySelectorAll('.persona-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const picked = students.find(s => s.id === id);
        if (picked) {
          currentPersona = picked;
          savePersona(picked);
          hidePersonaOverlay();
          renderPersonaBar();
          renderAll();
        }
      });
    });
  }
  overlay.hidden = false;
}

function hidePersonaOverlay() {
  const overlay = document.getElementById('persona-overlay');
  if (overlay) overlay.hidden = true;
}

function renderPersonaBar() {
  const avatar = document.getElementById('persona-avatar');
  const name = document.getElementById('persona-bar-name');
  const micro = document.getElementById('persona-bar-micro');
  const roles = document.getElementById('persona-bar-roles');
  if (!avatar || !name || !roles) return;

  if (isObserver()) {
    avatar.textContent = 'OB';
    avatar.style.background = '#A8B050';
    micro.textContent = 'Trainer laptop';
    name.textContent = 'Observing all students';
    roles.innerHTML = '<span class="role-pill observer">Observer</span>';
    return;
  }
  if (!currentPersona) {
    avatar.textContent = '??';
    avatar.style.background = '#8A7AB0';
    micro.textContent = 'Not signed in';
    name.textContent = 'Pick a persona';
    roles.innerHTML = '';
    return;
  }
  avatar.textContent = currentPersona.initials || initialsFromName(currentPersona.name);
  avatar.style.background = currentPersona.color || '#8A7AB0';
  micro.textContent = 'You are';
  name.textContent = `${currentPersona.name} · ${currentPersona.role || 'CCO'}`;

  const myRole = personaRole();
  const ROLE_LABELS_S = {
    cco: 'CCO', aco: 'ACO', team_lead: 'Team Lead',
    commander: 'Commander', sel: 'SEL', flight_chief: 'Flight Chief'
  };
  if (!myRole) {
    roles.innerHTML = '<span class="role-pill" style="opacity: 0.5;">Awaiting role assignment</span>';
  } else {
    const cls = isLeaderRole(myRole) ? 'lead' : '';
    roles.innerHTML = `<span class="role-pill ${cls}">${esc(ROLE_LABELS_S[myRole] || myRole)}</span>`;
    // Also show if I'm currently the leadership primary
    const primary = Engine.getLeadershipPrimary && Engine.getLeadershipPrimary();
    if (primary === currentPersona.id) {
      roles.innerHTML += ' <span class="role-pill primary" style="background: #d9a400; color: #1a1a1a;">Primary</span>';
    }
  }
}

// v0.2.9: the old structured response panel (Action / Authority / Rationale)
// was removed as part of the student page simplification. Responses are now
// captured via free-text Notes (per persona) and optional trainer replies.
// loadStudentResponses / saveStudentResponses / responseFor stay in place so
// inspector grading (which reads the same localStorage key) doesn't break.

function renderClock() {
  const now = Engine.getExerciseTime();
  const s = Engine.getState();
  const clockEl = document.getElementById('ambient-clock');
  const subEl = document.getElementById('ambient-sub');
  if (!clockEl) return;
  if (!s.clock.running) {
    clockEl.textContent = 'STANDBY';
    if (subEl) subEl.textContent = 'FOS Eagle Crest';
    return;
  }
  clockEl.textContent = now.displayString;
  if (subEl) subEl.textContent = `${now.shortTime} local · ${pad(now.hour)}:${pad(now.minute)} / 17:00`;
}

function renderMailList() {
  const s = Engine.getState();
  const container = document.getElementById('mail-col-list');

  // v0.2.8: filter inbox by who this laptop belongs to
  // v0.2.10: also filter out mail this persona has dismissed/closed
  const dismissed = loadDismissedMail();
  const roleVisible = (s.inbox || []).filter(itemVisibleToMe);
  const visible = roleVisible.filter(m => !dismissed.has(m.id));
  const hiddenCount = (s.inbox || []).length - roleVisible.length;
  const dismissedCount = roleVisible.length - visible.length;

  document.getElementById('mail-count').textContent =
    visible.length === 1 ? '1 message' : `${visible.length} messages`;

  // Build optional filter notice
  let notice = '';
  const myRole = personaRole();
  if (isObserver()) {
    notice = `<div class="inbox-filter-notice"><strong>Observer view</strong> — showing all inbox items across every student.</div>`;
  } else if (currentPersona && !myRole) {
    notice = `<div class="inbox-filter-notice">Awaiting role assignment — showing broadcasts only. Trainer assigns on the panel.</div>`;
  } else if (currentPersona && isLeaderRole(myRole)) {
    notice = `<div class="inbox-filter-notice"><strong>${ucfirst(roleLabel(myRole))} view</strong> — full visibility across the team.</div>`;
  } else if (currentPersona && hiddenCount > 0) {
    notice = `<div class="inbox-filter-notice">${hiddenCount} item${hiddenCount === 1 ? '' : 's'} routed to other roles (hidden).</div>`;
  }
  // v0.2.10: tell the student when they have dismissed mail they could restore.
  if (dismissedCount > 0) {
    notice += `<div class="inbox-filter-notice">${dismissedCount} closed · <button class="btn-link-sm" id="mail-restore-all">restore all</button></div>`;
  }

  if (!visible || visible.length === 0) {
    container.innerHTML = notice + `
      <div class="mail-empty-state">
        <div class="mail-empty-icon">
          <svg viewBox="0 0 48 48" fill="none"><rect x="6" y="12" width="36" height="24" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M6 14l18 12L42 14" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="mail-empty-title">No messages</div>
        <div class="mail-empty-desc">Inbox will populate as the exercise runs.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = notice + visible
    .map((m) => {
      const preview = (m.body || '').split('\n')[0].slice(0, 90);
      const isSelected = selectedMailId === m.id;
      // v0.2.8 routing tag — based on role_tag
      let tag = '';
      if (m.role_tag === 'leadership') {
        tag = `<span class="routing-tag lead">Leadership</span>`;
      } else if (m.role_tag === 'aco') {
        tag = `<span class="routing-tag duty">ACO</span>`;
      } else if (m.role_tag === 'cco') {
        tag = `<span class="routing-tag duty">CCO</span>`;
      }
      const rowInitials = initialsFromName(m.from);
      return `
        <div class="s-mail-row ${m.unread ? 'unread' : ''} ${isSelected ? 'selected' : ''}" data-id="${esc(m.id)}">
          <button class="s-mail-close" data-dismiss="${esc(m.id)}" title="Close this email">&times;</button>
          <div class="s-mail-row-avatar">${esc(rowInitials)}</div>
          <div class="s-mail-row-content">
            <div class="s-mail-head">
              <div class="s-mail-from">${esc(m.from)}${tag}</div>
              <div class="s-mail-time">${esc(m.time)}</div>
            </div>
            <div class="s-mail-subject">${esc(m.subject)}</div>
            <div class="s-mail-preview">${esc(preview)}</div>
          </div>
        </div>
      `;
    })
    .join('');

  container.querySelectorAll('.s-mail-row').forEach((el) => {
    el.addEventListener('click', (ev) => {
      // Ignore clicks on the close button — they handle their own thing.
      if (ev.target.closest('.s-mail-close')) return;
      selectedMailId = el.dataset.id;
      selectedTextsContactId = null; // clear SMS selection when picking an email
      Engine.markInboxRead(selectedMailId);
      renderAll();
    });
  });

  // Per-row dismiss buttons
  container.querySelectorAll('[data-dismiss]').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      dismissMail(btn.dataset.dismiss);
      renderAll();
    });
  });

  // Restore-all button (present only when dismissedCount > 0)
  const restore = document.getElementById('mail-restore-all');
  if (restore) {
    restore.addEventListener('click', (ev) => {
      ev.stopPropagation();
      try { localStorage.removeItem(dismissedKeyFor(currentPersona)); } catch (e) {}
      renderAll();
    });
  }
}

// v0.2.9: Texts list — one row per SMS contact thread, newest activity first,
// with unread count + last message preview. Clicking opens the thread in the
// reading pane.
function renderTextsList() {
  const container = document.getElementById('texts-list');
  if (!container) return;
  const s = Engine.getState();
  const contacts = Engine.getContacts ? Engine.getContacts() : [];
  const threads = s.smsThreads || {};

  // Only show contacts that have at least one message
  const withMessages = contacts
    .filter(c => Array.isArray(threads[c.id]) && threads[c.id].length > 0)
    .map(c => {
      const msgs = threads[c.id];
      const last = msgs[msgs.length - 1];
      const unread = msgs.filter(m => m.unread && m.direction === 'in').length;
      return { contact: c, last, unread, count: msgs.length };
    })
    // Rough ordering: unread first, then by count (no wall-clock timestamps on SMS entries)
    .sort((a, b) => {
      if (a.unread !== b.unread) return b.unread - a.unread;
      return b.count - a.count;
    });

  const countEl = document.getElementById('texts-count');
  if (countEl) {
    const totalUnread = withMessages.reduce((sum, x) => sum + x.unread, 0);
    countEl.textContent = totalUnread > 0 ? `${totalUnread} new` : `${withMessages.length} threads`;
  }

  if (withMessages.length === 0) {
    container.innerHTML = '<div class="muted text-center" style="padding: 24px 16px; font-size: 12px;">No SMS threads yet.</div>';
    return;
  }

  container.innerHTML = withMessages.map(({ contact, last, unread }) => {
    const isSelected = selectedTextsContactId === contact.id;
    const preview = (last && last.text || '').slice(0, 70);
    return `
      <div class="texts-row ${unread > 0 ? 'unread' : ''} ${isSelected ? 'selected' : ''}" data-id="${esc(contact.id)}">
        <div class="texts-avatar" style="background: ${esc(contact.color || '#8A7AB0')};">${esc(contact.initials || '??')}</div>
        <div class="texts-body">
          <div class="texts-head">
            <div class="texts-name">${esc(contact.name)}</div>
            ${unread > 0 ? `<div class="texts-unread-badge">${unread}</div>` : `<div class="texts-time">${esc(last.time || '')}</div>`}
          </div>
          <div class="texts-preview">${esc(preview)}</div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.texts-row').forEach(el => {
    el.addEventListener('click', () => {
      selectedTextsContactId = el.dataset.id;
      selectedMailId = null; // clear email selection when opening a thread
      if (Engine.markSmsRead) Engine.markSmsRead(selectedTextsContactId);
      renderAll();
    });
  });
}

// v0.2.9: unified reading pane — dispatches to email detail or SMS thread
// detail depending on what the user has selected.
function renderReadingPane() {
  const container = document.getElementById('reading-pane');
  if (!container) return;

  if (selectedMailId) {
    renderEmailDetail(container);
    return;
  }
  if (selectedTextsContactId) {
    renderThreadDetail(container);
    return;
  }
  container.innerHTML = `
    <div class="reading-empty outlook-empty-reading">
      <svg viewBox="0 0 56 56" fill="none" style="width:48px;height:48px;margin-bottom:12px;opacity:0.35;"><rect x="6" y="10" width="44" height="36" rx="3" stroke="#0078D4" stroke-width="1.5"/><path d="M6 14l22 14L50 14" stroke="#0078D4" stroke-width="1.5"/></svg>
      <p style="color:#605E5C;font-size:13px;font-family:'Segoe UI',-apple-system,sans-serif;">Select an item to read</p>
    </div>
  `;
}

function renderEmailDetail(container) {
  const s = Engine.getState();
  const m = s.inbox.find((x) => x.id === selectedMailId);
  if (!m) {
    container.innerHTML = `<div class="mail-detail-empty"><div class="micro">Message not found</div></div>`;
    return;
  }

  const initials = initialsFromName(m.from);
  const myRole = personaRole();
  const isLeader = !isObserver() && myRole && isLeaderRole(myRole);
  const canReply = !isObserver() && currentPersona;

  // Delegation dropdown — leaders only. Lists every roster member currently
  // assigned CCO or ACO. Firing Engine.delegateItem stamps delegated_to on
  // this item so the target will see it in their filtered feed.
  let delegateBlock = '';
  if (isLeader && !m.is_trainer_reply) {
    const roster = configStudents();
    const assignments = (Engine.getTeamRoles && Engine.getTeamRoles().assignments) || {};
    const candidates = roster.filter(st => {
      const role = assignments[st.id];
      return role === 'cco' || role === 'aco';
    });
    const already = m.delegated_to
      ? roster.find(st => st.id === m.delegated_to)
      : null;
    delegateBlock = `
      <div class="mail-delegate-row">
        <label class="micro" for="delegate-select">Delegate to</label>
        <select id="delegate-select">
          <option value="">— pick a subordinate —</option>
          ${candidates.map(st => {
            const role = assignments[st.id];
            const selected = already && already.id === st.id ? 'selected' : '';
            return `<option value="${esc(st.id)}" ${selected}>${esc(st.name)} · ${esc((role || '').toUpperCase())}</option>`;
          }).join('')}
        </select>
        <button class="btn btn-sm" id="delegate-btn">Forward</button>
        ${already ? `<span class="delegated-note">currently with ${esc(already.name)}</span>` : ''}
      </div>
    `;
  }

  // If this item was delegated to someone else, show a strip noting that.
  let delegatedFromStrip = '';
  if (m.delegated_to && currentPersona && m.delegated_to === currentPersona.id) {
    const fromSt = m.delegated_from
      ? configStudents().find(st => st.id === m.delegated_from)
      : null;
    delegatedFromStrip = `
      <div class="delegated-from-strip">
        ← Delegated to you${fromSt ? ` by <strong>${esc(fromSt.name)}</strong>` : ''}
        ${m.delegated_at ? ` · ${esc(m.delegated_at)}` : ''}
      </div>
    `;
  }

  // Reply box — lets the student ask the trainer a question about this
  // inject. The question lands in state.trainer_queue and surfaces on the
  // trainer Action Queue panel.
  let replyBlock = '';
  if (canReply) {
    replyBlock = `
      <div class="mail-reply-box">
        <div class="micro">Ask the trainer</div>
        <textarea id="mail-reply-text" rows="2" placeholder="Type a question back to the trainer (e.g., 'Which template do I use for this quote?')"></textarea>
        <div class="mail-reply-actions">
          <span class="muted" id="mail-reply-hint" style="font-size:11px;"></span>
          <button class="btn btn-sm" id="mail-reply-send">Send to trainer →</button>
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="s-mail-detail-subject">${esc(m.subject)}${m.is_trainer_reply ? ' <span class="routing-tag">white cell</span>' : ''}</div>
    <div class="s-mail-detail-meta">
      <div class="s-mail-avatar">${esc(initials)}</div>
      <div class="s-mail-from-block">
        <div class="s-mail-from-name">${esc(m.from)}</div>
        ${m.fromEmail ? `<div class="s-mail-from-email">${esc(m.fromEmail)}</div>` : ''}
      </div>
      <div class="s-mail-detail-time">${esc(m.time)}</div>
      <button class="s-mail-detail-close btn btn-sm" id="mail-detail-close" title="Close this email">Close</button>
    </div>
    ${delegatedFromStrip}
    <div class="s-mail-detail-body">${esc(m.body)}</div>
    ${delegateBlock}
    ${replyBlock}
  `;

  // Wire the Close button in the detail header
  const closeBtn = document.getElementById('mail-detail-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      dismissMail(m.id);
      renderAll();
    });
  }

  // Wire delegate
  const delBtn = document.getElementById('delegate-btn');
  if (delBtn) {
    delBtn.addEventListener('click', () => {
      const sel = document.getElementById('delegate-select');
      const target = sel && sel.value;
      if (!target) return;
      if (Engine.delegateItem) {
        Engine.delegateItem(m.id, target);
        renderAll();
      }
    });
  }

  // Wire reply
  const replyBtn = document.getElementById('mail-reply-send');
  if (replyBtn) {
    replyBtn.addEventListener('click', () => {
      const ta = document.getElementById('mail-reply-text');
      const hint = document.getElementById('mail-reply-hint');
      const body = (ta && ta.value || '').trim();
      if (!body) {
        if (hint) hint.textContent = 'Type something first.';
        return;
      }
      // v0.2.10: route through the outbox side channel so the student's
      // read-only engine actually persists the ask. studentAsk() writes to
      // state.trainer_queue, but saveState() no-ops in read-only mode, so
      // the trainer never saw it. studentAskOut() writes to OUTBOX_KEY and
      // the trainer drains it.
      const out = Engine.studentAskOut || Engine.studentAsk;
      if (!out) return;
      out({
        personaId: currentPersona.id,
        personaName: currentPersona.name,
        injectId: m.injectId,
        threadId: m.thread_id || m.id,
        subject: m.subject,
        body: body
      });
      if (ta) ta.value = '';
      if (hint) {
        hint.textContent = 'Sent to trainer ✓';
        setTimeout(() => { if (hint) hint.textContent = ''; }, 2200);
      }
    });
  }
}

// v0.2.9: notes pane — simple free-text area. Autosaves on keystroke.
function renderNotesPanel() {
  const el = document.getElementById('notes-textarea');
  if (!el) return;
  // Only repopulate if the persona changed (so we don't stomp what the
  // student is typing every time renderAll fires).
  const expectedKey = notesKeyFor(currentPersona);
  if (el.dataset.key !== expectedKey) {
    el.value = loadNotes();
    el.dataset.key = expectedKey;
  }
  const header = document.getElementById('notes-header');
  if (header) {
    if (isObserver()) header.textContent = 'Observer notes';
    else if (currentPersona) header.textContent = `Notes · ${currentPersona.name}`;
    else header.textContent = 'Notes';
  }
  if (!el.dataset.wired) {
    el.dataset.wired = '1';
    el.addEventListener('input', () => {
      clearTimeout(notesSaveTimer);
      notesSaveTimer = setTimeout(() => saveNotes(el.value), 250);
    });
  }

  // v0.2.14: wire additional sticky notes (Actions Taken, Key Info)
  const actionsEl = document.getElementById('actions-textarea');
  if (actionsEl) {
    const aKey = actionsKeyFor(currentPersona);
    if (actionsEl.dataset.key !== aKey) {
      actionsEl.value = loadActions();
      actionsEl.dataset.key = aKey;
    }
    if (!actionsEl.dataset.wired) {
      actionsEl.dataset.wired = '1';
      actionsEl.addEventListener('input', () => {
        clearTimeout(actionsSaveTimer);
        actionsSaveTimer = setTimeout(() => saveActions(actionsEl.value), 250);
      });
    }
  }
  const keyinfoEl = document.getElementById('keyinfo-textarea');
  if (keyinfoEl) {
    const kKey = keyinfoKeyFor(currentPersona);
    if (keyinfoEl.dataset.key !== kKey) {
      keyinfoEl.value = loadKeyInfo();
      keyinfoEl.dataset.key = kKey;
    }
    if (!keyinfoEl.dataset.wired) {
      keyinfoEl.dataset.wired = '1';
      keyinfoEl.addEventListener('input', () => {
        clearTimeout(keyinfoSaveTimer);
        keyinfoSaveTimer = setTimeout(() => saveKeyInfo(keyinfoEl.value), 250);
      });
    }
  }
}

// v0.2.9: SMS thread detail — renders all messages for the selected contact
// in an iMessage-style bubble list. Inbound messages on the left, any
// outbound messages (direction === 'out') on the right. Replies back to the
// trainer via SMS aren't supported yet — that's a future feature.
function renderThreadDetail(container) {
  const s = Engine.getState();
  const contact = Engine.getContact ? Engine.getContact(selectedTextsContactId) : null;
  if (!contact) {
    container.innerHTML = `<div class="reading-empty"><div class="micro">Thread not found</div></div>`;
    return;
  }
  const msgs = (s.smsThreads && s.smsThreads[contact.id]) || [];

  container.innerHTML = `
    <div class="s-thread-head">
      <div class="s-thread-avatar" style="background: ${esc(contact.color || '#8A7AB0')};">${esc(contact.initials || '??')}</div>
      <div class="s-thread-meta">
        <div class="s-thread-name">${esc(contact.name)}</div>
        <div class="s-thread-title">${esc(contact.title || '')}</div>
      </div>
      <div class="s-thread-count mono">${msgs.length} msg${msgs.length === 1 ? '' : 's'}</div>
    </div>
    <div class="s-thread-bubbles">
      ${msgs.length === 0
        ? '<div class="reading-empty"><p>No messages in this thread.</p></div>'
        : msgs.map(m => `
            <div class="s-bubble ${m.direction === 'out' ? 'out' : 'in'}">
              <div class="s-bubble-text">${esc(m.text)}</div>
              <div class="s-bubble-time">${esc(m.time || '')}</div>
            </div>
          `).join('')}
    </div>
    <div class="s-thread-reply">
      <div class="s-thread-reply-head">
        <span class="micro">Reply to ${esc(contact.name)}</span>
        <span class="s-thread-reply-hint" id="sms-reply-hint"></span>
      </div>
      <div class="s-thread-reply-row">
        <input type="text" id="sms-reply-text" class="s-thread-reply-input" placeholder="Type a message…" maxlength="320" />
        <button class="btn btn-sm btn-primary" id="sms-reply-send">Send</button>
      </div>
    </div>
  `;

  // Wire SMS reply composer. Routes through the outbox side channel so the
  // student's read-only engine still reaches the trainer.
  const sendBtn = document.getElementById('sms-reply-send');
  const input = document.getElementById('sms-reply-text');
  const hint = document.getElementById('sms-reply-hint');
  const sendSms = () => {
    const text = (input && input.value || '').trim();
    if (!text) {
      if (hint) hint.textContent = 'Type something first.';
      return;
    }
    const out = Engine.studentSmsOut;
    if (!out) {
      if (hint) hint.textContent = 'Engine offline.';
      return;
    }
    out({
      contactId: contact.id,
      contactName: contact.name,
      text,
      personaId: currentPersona && currentPersona.id,
      personaName: currentPersona && currentPersona.name
    });
    if (input) input.value = '';
    if (hint) {
      hint.textContent = 'Sent ✓';
      setTimeout(() => { if (hint) hint.textContent = ''; }, 2000);
    }
  };
  if (sendBtn) sendBtn.addEventListener('click', sendSms);
  if (input) {
    input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' && !ev.shiftKey) {
        ev.preventDefault();
        sendSms();
      }
    });
  }
}

function initialsFromName(name) {
  if (!name) return '?';
  const parts = name.replace(/[^a-zA-Z ]/g, '').trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function pad(n) { return String(n).padStart(2, '0'); }

function esc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================================
   K: SHARED DRIVE — file browser panel
   Reads window.__CCO_KDRIVE manifest and renders an Explorer-style
   folder/file browser with breadcrumb navigation.
   ========================================================================== */
let kdrivePath = [];          // stack of folder names forming current path
let kdriveCollapsed = false;  // toggle state

function initKDrive() {
  const toggle = document.getElementById('kdrive-toggle-btn');
  if (toggle) {
    toggle.addEventListener('click', () => {
      kdriveCollapsed = !kdriveCollapsed;
      const body = document.getElementById('kdrive-body');
      if (body) body.style.display = kdriveCollapsed ? 'none' : '';
      toggle.textContent = kdriveCollapsed ? '▸' : '▾';
    });
  }
  renderKDrive();
}

function kdriveCurrentFolder() {
  const root = window.__CCO_KDRIVE;
  if (!root) return null;
  let node = root;
  for (const seg of kdrivePath) {
    const child = (node.children || []).find(c => c.name === seg && c.type === 'folder');
    if (!child) return node; // path broken, stay at last valid
    node = child;
  }
  return node;
}

function renderKDrive() {
  const list = document.getElementById('kdrive-file-list');
  const crumbs = document.getElementById('kdrive-breadcrumb');
  if (!list) return;
  const root = window.__CCO_KDRIVE;
  if (!root) {
    list.innerHTML = '<div class="kdrive-empty">No shared drive loaded.</div>';
    return;
  }

  // Breadcrumb
  if (crumbs) {
    let html = '<span class="kdrive-crumb kdrive-crumb-root" data-depth="-1">K:</span>';
    kdrivePath.forEach((seg, i) => {
      html += ` <span class="kdrive-sep">›</span> <span class="kdrive-crumb" data-depth="${i}">${esc(seg)}</span>`;
    });
    crumbs.innerHTML = html;
    crumbs.querySelectorAll('.kdrive-crumb').forEach(el => {
      el.addEventListener('click', () => {
        const depth = parseInt(el.dataset.depth, 10);
        if (depth < 0) kdrivePath = [];
        else kdrivePath = kdrivePath.slice(0, depth + 1);
        renderKDrive();
      });
    });
  }

  const folder = kdriveCurrentFolder();
  const children = folder ? (folder.children || []) : [];

  if (children.length === 0) {
    list.innerHTML = '<div class="kdrive-empty">This folder is empty.</div>';
    return;
  }

  // Sort: folders first, then files, alphabetical within each group
  const sorted = children.slice().sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  list.innerHTML = sorted.map(item => {
    if (item.type === 'folder') {
      const count = (item.children || []).length;
      return `
        <div class="kdrive-item kdrive-folder" data-name="${esc(item.name)}">
          <div class="kdrive-icon kdrive-icon-folder">
            <svg viewBox="0 0 20 20" fill="none"><path d="M2 5a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" stroke="#FFB900" stroke-width="1.3" fill="rgba(255,185,0,0.15)"/></svg>
          </div>
          <div class="kdrive-item-body">
            <div class="kdrive-item-name">${esc(item.name)}</div>
            <div class="kdrive-item-meta">${count} item${count !== 1 ? 's' : ''}</div>
          </div>
        </div>`;
    }
    // File
    const iconClass = 'kdrive-icon-' + (item.icon || 'file');
    const noteHtml = item.note ? `<span class="kdrive-item-note" title="${esc(item.note)}">ⓘ</span>` : '';
    return `
      <div class="kdrive-item kdrive-file" data-name="${esc(item.name)}" data-href="${esc(item.href || '')}" data-dynamic="${esc(item.dynamic || '')}">
        <div class="kdrive-icon ${esc(iconClass)}">
          ${kdriveFileIcon(item.icon)}
        </div>
        <div class="kdrive-item-body">
          <div class="kdrive-item-name">${esc(item.name)}${noteHtml}</div>
          <div class="kdrive-item-meta">${esc(item.size || '')}</div>
        </div>
      </div>`;
  }).join('');

  // Wire folder clicks
  list.querySelectorAll('.kdrive-folder').forEach(el => {
    el.addEventListener('click', () => {
      kdrivePath.push(el.dataset.name);
      renderKDrive();
    });
  });

  // Wire file clicks
  list.querySelectorAll('.kdrive-file').forEach(el => {
    el.addEventListener('click', () => {
      const href = el.dataset.href;
      const dyn = el.dataset.dynamic;
      if (dyn) {
        kdriveOpenDynamic(dyn, el.dataset.name);
      } else if (href) {
        window.open(href, '_blank');
      }
    });
  });
}

function kdriveFileIcon(type) {
  switch (type) {
    case 'pdf':
      return '<svg viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="1.5" stroke="#D32F2F" stroke-width="1.2"/><text x="10" y="13" text-anchor="middle" fill="#D32F2F" font-size="5" font-weight="bold" font-family="sans-serif">PDF</text></svg>';
    case 'xlsx':
      return '<svg viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="1.5" stroke="#217346" stroke-width="1.2"/><text x="10" y="13" text-anchor="middle" fill="#217346" font-size="5" font-weight="bold" font-family="sans-serif">XLS</text></svg>';
    case 'docx':
      return '<svg viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="1.5" stroke="#2B579A" stroke-width="1.2"/><text x="10" y="13" text-anchor="middle" fill="#2B579A" font-size="5" font-weight="bold" font-family="sans-serif">DOC</text></svg>';
    default:
      return '<svg viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="1.5" stroke="#888" stroke-width="1.2"/></svg>';
  }
}

function kdriveOpenDynamic(type, name) {
  // Dynamic file generators — produce client-side content
  if (type === 'shop-tracker') {
    kdriveOpenShopTracker();
    return;
  }
  alert('Dynamic file type "' + type + '" not yet implemented.');
}

/* ==========================================================================
   PHONE UI — tab switching, Signal chat, notifications
   ========================================================================== */
let activePhoneApp = null; // null = home screen

function initPhone() {
  // App icon clicks → open app
  document.querySelectorAll('.phone-icon[data-app]').forEach(icon => {
    if (icon.classList.contains('phone-icon-deco')) return; // decorative
    icon.addEventListener('click', () => {
      openPhoneApp(icon.dataset.app);
    });
  });

  // Back buttons → home screen
  document.querySelectorAll('.phone-back-btn[data-back]').forEach(btn => {
    btn.addEventListener('click', () => {
      closePhoneApp();
    });
  });

  renderPhoneClock();
  renderSignalChat();
}

function openPhoneApp(appName) {
  activePhoneApp = appName;
  const home = document.getElementById('phone-home');
  const appView = document.getElementById('phone-app-' + appName);
  if (home) home.style.display = 'none';
  if (appView) appView.style.display = 'flex';

  // Mark signal as seen when opening relay
  if (appName === 'signal') {
    signalSeenCount = signalMessages.length;
    renderPhoneBadges();
  }
}

function closePhoneApp() {
  // Hide current app, show home
  if (activePhoneApp) {
    const appView = document.getElementById('phone-app-' + activePhoneApp);
    if (appView) appView.style.display = 'none';
  }
  activePhoneApp = null;
  const home = document.getElementById('phone-home');
  if (home) home.style.display = '';
}

function renderPhoneClock() {
  const el = document.getElementById('phone-time');
  if (!el) return;
  // Use exercise time if running, otherwise real time
  const now = Engine.getExerciseTime ? Engine.getExerciseTime() : null;
  const s = Engine.getState ? Engine.getState() : {};
  if (now && s.clock && s.clock.running) {
    el.textContent = now.shortTime || '--:--';
  } else {
    const d = new Date();
    el.textContent = d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
  }
}

function renderPhoneBadges() {
  // Messages badge
  const msgBadge = document.getElementById('phone-badge-messages');
  if (msgBadge) {
    const s = Engine.getState();
    const threads = s.smsThreads || {};
    let totalUnread = 0;
    Object.values(threads).forEach(msgs => {
      if (Array.isArray(msgs)) {
        totalUnread += msgs.filter(m => m.unread && m.direction === 'in').length;
      }
    });
    if (totalUnread > 0) {
      msgBadge.textContent = totalUnread;
      msgBadge.hidden = false;
    } else {
      msgBadge.hidden = true;
    }
  }

  // Signal badge — count unseen signal messages
  const sigBadge = document.getElementById('phone-badge-signal');
  if (sigBadge) {
    const unseen = signalUnseenCount();
    if (unseen > 0) {
      sigBadge.textContent = unseen;
      sigBadge.hidden = false;
    } else {
      sigBadge.hidden = true;
    }
  }
}

// Signal chat state
let signalMessages = [];
let signalSeenCount = 0;
let signalNoiseTimer = null;

function signalUnseenCount() {
  return Math.max(0, signalMessages.length - signalSeenCount);
}

// The noise library — deployment chatter that populates Signal throughout.
// Some messages are pure noise; some hint at upcoming injects (marked with hintFor).
const SIGNAL_NOISE_LIBRARY = [
  { sender: 'TSgt Williams', text: 'Anyone know where the spare generator keys are? CE can\'t find them.', delay: 0 },
  { sender: 'SSgt Parker', text: 'Laundry room is PACKED. Someone took my PT gear out of the dryer and just left it on the floor 😤', delay: 45 },
  { sender: 'MSgt Rodriguez', text: 'Reminder: DFAC hours changed — dinner is now 1700-1900, not 1800-2000.', delay: 90 },
  { sender: 'TSgt Kim', text: 'Top wants everyone at the 0700 stand-up tomorrow. No exceptions.', delay: 150 },
  { sender: 'SrA Davis', text: 'WiFi at the CLU is trash again. Anyone else having issues?', delay: 210 },
  { sender: 'SSgt Parker', text: 'Seriously though, WHO is taking people\'s stuff from the laundry?? This is the third time this week.', delay: 280, hintFor: 'security-cameras' },
  { sender: 'MSgt Rodriguez', text: 'Fuel delivery was short again this morning. Only 80% of what we ordered.', delay: 350, hintFor: 'fuel-delivery' },
  { sender: 'TSgt Williams', text: 'CE says the AC in Building 3 is down. It\'s going to be a rough day in there.', delay: 420 },
  { sender: 'SSgt Chen', text: 'Anyone have the number for the local vendor who does the office supply runs? Binder clips are apparently a hot commodity.', delay: 490, hintFor: 'bpa-supplies' },
  { sender: 'SrA Davis', text: 'Shout out to whoever left donuts in the break room. You\'re a hero. 🍩', delay: 540 },
  { sender: 'TSgt Kim', text: 'Top III meeting notes: Commander wants a brief on contracting backlog by COB Friday.', delay: 600, hintFor: 'commander-brief' },
  { sender: 'SSgt Parker', text: 'Ok now clothes are MISSING from the laundry. Not just moved — GONE. Top needs to do something about this.', delay: 680, hintFor: 'security-cameras' },
  { sender: 'MSgt Rodriguez', text: 'FM says the MIPR for airfield lighting is still sitting there from last rotation. Anyone tracking?', delay: 760, hintFor: 'mipr-stale' },
  { sender: 'TSgt Williams', text: 'Porta-johns outside the gym need serviced. Putting in a request but just FYI.', delay: 830 },
  { sender: 'SSgt Chen', text: 'The BPA for office supplies — is that still valid? I heard it might be expiring soon.', delay: 900, hintFor: 'bpa-expiring' },
  { sender: 'SrA Davis', text: 'Mail run is at 1400 if anyone needs to send packages.', delay: 960 },
  { sender: 'TSgt Kim', text: 'Commander asked about security cameras for the laundry and common areas. Said "figure it out." Classic.', delay: 1040, hintFor: 'security-cameras' },
  { sender: 'MSgt Rodriguez', text: 'DFAC repair still not funded. CE is getting antsy. Says the fryer is a safety hazard.', delay: 1120, hintFor: 'dfac-repair' },
  { sender: 'SSgt Parker', text: 'Update: found half my PT gear in the trash. Filing a report with SF.', delay: 1200 },
  { sender: 'TSgt Williams', text: 'Friendly reminder to hydrate. It\'s 115°F outside. Don\'t be a statistic.', delay: 1280 },
];

function startSignalNoise() {
  if (signalNoiseTimer) return;
  const s = Engine.getState();
  if (!s.clock || !s.clock.running) return;

  // Use exerciseMs from clock state to get real elapsed seconds
  const clockState = s.clock || {};
  const elapsed = Math.floor((clockState.exerciseMs || 0) / 1000);

  // Add all messages whose delay has passed
  SIGNAL_NOISE_LIBRARY.forEach(msg => {
    const triggerSec = msg.delay;
    if (elapsed >= triggerSec && !signalMessages.find(m => m._src === msg)) {
      signalMessages.push({
        _src: msg,
        sender: msg.sender,
        text: msg.text,
        time: formatSignalTime(triggerSec),
        hintFor: msg.hintFor || null
      });
    }
  });

  // Set timers for future messages
  SIGNAL_NOISE_LIBRARY.forEach(msg => {
    const triggerSec = msg.delay;
    if (elapsed < triggerSec) {
      const waitMs = (triggerSec - elapsed) * 1000;
      setTimeout(() => {
        if (!signalMessages.find(m => m._src === msg)) {
          signalMessages.push({
            _src: msg,
            sender: msg.sender,
            text: msg.text,
            time: formatSignalTime(triggerSec),
            hintFor: msg.hintFor || null
          });
          renderSignalChat();
          renderPhoneBadges();
          // Pulse the Signal icon on home screen if not in the app
          if (activePhoneApp !== 'signal') {
            const icon = document.getElementById('phone-icon-signal');
            if (icon) { icon.classList.add('phone-icon-pulse'); setTimeout(() => icon.classList.remove('phone-icon-pulse'), 800); }
          }
        }
      }, waitMs);
    }
  });
}

function formatSignalTime(delaySec) {
  // Convert delay seconds to time string using the exercise day start
  const s = Engine.getState ? Engine.getState() : {};
  const dayStart = (s.clock && s.clock.dayStart) || 420; // default 0700
  const totalMin = dayStart + Math.floor(delaySec / 60);
  const h = Math.floor((totalMin % (24 * 60)) / 60);
  const m = totalMin % 60;
  return pad(h) + ':' + pad(m);
}

function renderSignalChat() {
  const container = document.getElementById('signal-chat');
  if (!container) return;

  if (signalMessages.length === 0) {
    container.innerHTML = '<div class="signal-empty">No messages yet. Chat will populate during the exercise.</div>';
    return;
  }

  container.innerHTML = '<div class="signal-date-sep">Today</div>' +
    signalMessages.map(m => `
      <div class="signal-msg signal-msg-in">
        <div class="signal-msg-sender">${esc(m.sender)}</div>
        <div class="signal-msg-text">${esc(m.text)}</div>
        <div class="signal-msg-time">${esc(m.time)}</div>
      </div>
    `).join('');

  // Auto-scroll to bottom
  container.scrollTop = container.scrollHeight;

  // Mark as seen if signal tab is active
  if (activePhoneApp === 'signal') {
    signalSeenCount = signalMessages.length;
  }
}

function kdriveOpenShopTracker() {
  // Show a simple HTML preview of the shop tracker spreadsheet
  // In a future version this could generate a real .xlsx via SheetJS
  const today = new Date();
  const fmt = d => d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };

  const modal = document.createElement('div');
  modal.className = 'kdrive-modal-overlay';
  modal.innerHTML = `
    <div class="kdrive-modal">
      <div class="kdrive-modal-header">
        <span class="kdrive-modal-title">K_Shop_Tracker_LAST_ROTATION.xlsx</span>
        <button class="kdrive-modal-close">&times;</button>
      </div>
      <div class="kdrive-modal-body">
        <table class="kdrive-tracker-table">
          <thead>
            <tr>
              <th>Contract / Action</th>
              <th>Type</th>
              <th>Status</th>
              <th>Key Date</th>
              <th>Assigned</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>FA8501XXD0012 Base O&M (IDIQ)</td><td>Service</td><td class="status-green">Active</td><td>${fmt(addDays(today, 180))}</td><td>—</td><td>Option Yr 2 exercised. COR: TBD this rotation.</td></tr>
            <tr><td>FA8501XXD0034 Vehicles (IDIQ)</td><td>Service</td><td class="status-green">Active</td><td>${fmt(addDays(today, 240))}</td><td>—</td><td>Fleet status nominal. TO 003 maint svc active.</td></tr>
            <tr><td>FA8501XXD0051 Cell/Comms (IDIQ)</td><td>Supply</td><td class="status-green">Active</td><td>${fmt(addDays(today, 120))}</td><td>—</td><td>40 handsets issued. 6 sat phones on rental.</td></tr>
            <tr><td>FA8501XXP0089 Gen Fuel</td><td>Supply</td><td class="status-green">Active</td><td>${fmt(addDays(today, 45))}</td><td>—</td><td>Delivery schedule on track. Verify fuel quality certs.</td></tr>
            <tr><td>FA8501XXP0102 Fence Repair</td><td>Service</td><td class="status-green">Active</td><td>${fmt(addDays(today, 30))}</td><td>—</td><td>Sections 4-7. Final inspection pending.</td></tr>
            <tr><td>FA8501XXP0115 HVAC Compressor</td><td>Supply</td><td class="status-green">Active</td><td>${fmt(addDays(today, 15))}</td><td>—</td><td>Sole source — Carrier OEM. Delivery expected soon.</td></tr>
            <tr><td>BPA0001 — Office Supplies</td><td>BPA</td><td class="status-yellow">Expiring</td><td>${fmt(addDays(today, 2))}</td><td>—</td><td>EXPIRES ${fmt(addDays(today, 2))} — renew or re-compete ASAP</td></tr>
            <tr><td>BPA0002 — Water & Rations</td><td>BPA</td><td class="status-green">Active</td><td>${fmt(addDays(today, 90))}</td><td>—</td><td>Delivery nominal. QA spot checks clean.</td></tr>
            <tr><td>BPA0003 — Latrine Svcing</td><td>BPA</td><td class="status-green">Active</td><td>${fmt(addDays(today, 60))}</td><td>—</td><td>Service schedule map on K drive.</td></tr>
            <tr><td>GPC Reconciliation</td><td>Admin</td><td class="status-yellow">Due</td><td>${fmt(addDays(today, 5))}</td><td>—</td><td>Monthly log due to RM NLT ${fmt(addDays(today, 5))}</td></tr>
            <tr><td>MIPR — Airfield Lighting</td><td>MIPR</td><td class="status-red">Stale</td><td>${fmt(addDays(today, -30))}</td><td>—</td><td>Prev rotation did not close. Verify w/ FM if funds still available.</td></tr>
            <tr><td>New Req — DFAC Fryer Repair</td><td>Service</td><td class="status-red">Unfunded</td><td>TBD</td><td>—</td><td>CE submitted PR. Awaiting fund cite from FM.</td></tr>
          </tbody>
        </table>
        <div class="kdrive-tracker-note">
          <strong>Note:</strong> Tracker from previous rotation. "Assigned" column cleared for incoming team.
          Dates auto-calculated from today (${fmt(today)}).
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector('.kdrive-modal-close').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (ev) => { if (ev.target === modal) modal.remove(); });
}
