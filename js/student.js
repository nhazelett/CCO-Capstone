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
let selectedMailId = null;

// v0.2.7: student responses are persisted to a separate localStorage key
// (NOT the main state key) so they survive read-only mode and don't race
// the trainer's state writes. The inspector.js view reads this key during
// grading to show what the student actually did in response to each inject.
const STUDENT_RESPONSES_KEY = 'cco-capstone-student-responses';
let studentResponses = loadStudentResponses();
let saveHintTimer = null;

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
  // Future: delegated items bypass the role filter
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
function flashSaveHint() {
  const el = document.getElementById('response-hint');
  if (!el) return;
  el.textContent = 'Saved ✓';
  el.classList.add('saved');
  clearTimeout(saveHintTimer);
  saveHintTimer = setTimeout(() => {
    el.textContent = 'Autosaving';
    el.classList.remove('saved');
  }, 900);
}

(async function init() {
  // Student workstation is read-only. Only the trainer ticks.
  Engine.setReadOnly(true);

  await Engine.loadContacts();
  await Engine.loadInjects(bundleInjectIds());
  Engine.loadState();
  Engine.enableSync();

  // v0.2.8: show persona picker if nothing is stored yet
  wirePersonaBar();
  if (!currentPersona) {
    showPersonaOverlay();
  } else {
    renderPersonaBar();
  }

  renderAll();

  document.addEventListener('engine:tick', () => {
    renderClock();
    renderProgress();
  });
  document.addEventListener('engine:sync', () => {
    renderPersonaBar();
    renderAll();
  });
  document.addEventListener('engine:inject-fired', renderAll);
  document.addEventListener('engine:inbox-updated', renderAll);
  document.addEventListener('engine:team-roles-updated', () => {
    renderPersonaBar();
    renderAll();
  });
  document.addEventListener('engine:sms-received', renderNotifFeed);
  document.addEventListener('engine:sms-updated', renderNotifFeed);

  renderQuickContacts();

  // Safety poll - same as mobile view
  let lastSnapshot = '';
  setInterval(() => {
    try {
      const raw = localStorage.getItem('cco-capstone-state');
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
  renderProgress();
  renderPersonaBar();
  renderMailList();
  renderMailDetail();
  renderResponsePanel();
  renderNotifFeed();
  renderDocList();
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

// v0.2.7: render the inline response form for the inject attached to the
// currently-selected mail. Each inject gets ONE response (multiple mails from
// the same inject share the same form). Autosaves on every keystroke.
function renderResponsePanel() {
  const title = document.getElementById('response-title');
  const body  = document.getElementById('response-body');
  const hint  = document.getElementById('response-hint');
  if (!body) return;

  if (!selectedMailId) {
    title.textContent = 'Select a message';
    hint.textContent = '—';
    hint.classList.remove('saved');
    body.innerHTML = `
      <div class="muted text-center" style="padding: 24px 16px; font-size: 12px;">
        Click a message in your inbox to log your response. What you write here is visible to the inspector during grading.
      </div>`;
    return;
  }

  const s = Engine.getState();
  const mail = s.inbox.find(m => m.id === selectedMailId);
  if (!mail) {
    title.textContent = 'Message not found';
    body.innerHTML = '';
    return;
  }
  const inj = s.injects.find(i => i.id === mail.injectId);
  if (!inj) {
    title.textContent = mail.injectId || '—';
    body.innerHTML = '<div class="muted" style="padding: 12px; font-size: 11px;">Inject metadata not loaded.</div>';
    return;
  }

  const r = responseFor(inj.id);
  title.textContent = `${inj.id} · ${inj.title || ''}`;
  hint.textContent = r.updatedAt ? 'Autosaving' : 'Draft';
  hint.classList.remove('saved');

  body.innerHTML = `
    <div class="response-form ${r.locked ? 'locked' : ''}">
      <div class="response-field">
        <label class="field-label" for="rsp-action">Action taken</label>
        <textarea id="rsp-action" class="tall" placeholder="What did you do? Who did you call, what did you sign, what did you refuse?">${esc(r.action)}</textarea>
      </div>
      <div class="response-field">
        <label class="field-label" for="rsp-authority">Authority / citation</label>
        <input type="text" id="rsp-authority" placeholder="e.g. FAR 6.302-2 urgent &amp; compelling, JER 5500.7-R §2-203b, 18 USC 208" value="${esc(r.authority)}" />
      </div>
      <div class="response-field">
        <label class="field-label" for="rsp-rationale">Rationale</label>
        <textarea id="rsp-rationale" class="tall" placeholder="Why this action? What was the trade-off you made?">${esc(r.rationale)}</textarea>
      </div>
      <label class="response-locked-toggle ${r.locked ? 'locked' : ''}">
        <input type="checkbox" id="rsp-locked" ${r.locked ? 'checked' : ''} />
        <span>${r.locked ? 'Submitted to inspector (unlock to edit)' : 'Submit to inspector'}</span>
      </label>
      ${r.updatedAt ? `<div class="response-meta">Last saved · ${formatTime(r.updatedAt)}</div>` : ''}
    </div>
  `;

  const bind = (id, prop) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      r[prop] = el.value;
      r.updatedAt = new Date().toISOString();
      saveStudentResponses();
      flashSaveHint();
    });
  };
  bind('rsp-action', 'action');
  bind('rsp-authority', 'authority');
  bind('rsp-rationale', 'rationale');

  const lockEl = document.getElementById('rsp-locked');
  if (lockEl) {
    lockEl.addEventListener('change', () => {
      r.locked = lockEl.checked;
      r.updatedAt = new Date().toISOString();
      saveStudentResponses();
      renderResponsePanel();
    });
  }
}

function formatTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) { return iso; }
}

function renderClock() {
  const now = Engine.getExerciseTime();
  const s = Engine.getState();
  if (!s.clock.running) {
    document.getElementById('ambient-clock').textContent = 'STANDBY';
    return;
  }
  document.getElementById('ambient-clock').textContent = now.displayString;
  document.getElementById('ambient-sub').textContent = `FOS Eagle Crest · ${now.shortTime} local`;
}

function renderProgress() {
  const s = Engine.getState();
  const now = Engine.getExerciseTime();
  const dayMinutesElapsed = (now.totalMinutes - 8 * 60) % (24 * 60);
  const workdayMinutes = 9 * 60; // 08:00 to 17:00
  const pct = Math.max(0, Math.min(100, (dayMinutesElapsed / workdayMinutes) * 100));

  document.getElementById('progress-fill').style.width = `${pct}%`;
  document.getElementById('ambient-progress').textContent = `${pad(now.hour)}:${pad(now.minute)} / 17:00`;
}

function renderMailList() {
  const s = Engine.getState();
  const container = document.getElementById('mail-col-list');

  // v0.2.8: filter inbox by who this laptop belongs to
  const visible = (s.inbox || []).filter(itemVisibleToMe);
  const hiddenCount = (s.inbox || []).length - visible.length;

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
      return `
        <div class="s-mail-row ${m.unread ? 'unread' : ''} ${isSelected ? 'selected' : ''}" data-id="${esc(m.id)}">
          <div class="s-mail-head">
            <div class="s-mail-from">${esc(m.from)}${tag}</div>
            <div class="s-mail-time">${esc(m.time)}</div>
          </div>
          <div class="s-mail-subject">${esc(m.subject)}</div>
          <div class="s-mail-preview">${esc(preview)}</div>
        </div>
      `;
    })
    .join('');

  container.querySelectorAll('.s-mail-row').forEach((el) => {
    el.addEventListener('click', () => {
      selectedMailId = el.dataset.id;
      Engine.markInboxRead(selectedMailId);
      renderAll();
    });
  });
}

function renderMailDetail() {
  const container = document.getElementById('mail-col-detail');
  if (!selectedMailId) {
    container.innerHTML = `
      <div class="mail-detail-empty">
        <div class="micro">Select a message</div>
        <p>Click a message from the list to read it here.</p>
      </div>
    `;
    return;
  }
  const s = Engine.getState();
  const m = s.inbox.find((x) => x.id === selectedMailId);
  if (!m) {
    container.innerHTML = `<div class="mail-detail-empty"><div class="micro">Message not found</div></div>`;
    return;
  }

  const initials = initialsFromName(m.from);

  container.innerHTML = `
    <div class="s-mail-detail-subject">${esc(m.subject)}</div>
    <div class="s-mail-detail-meta">
      <div class="s-mail-avatar">${esc(initials)}</div>
      <div class="s-mail-from-block">
        <div class="s-mail-from-name">${esc(m.from)}</div>
        ${m.fromEmail ? `<div class="s-mail-from-email">${esc(m.fromEmail)}</div>` : ''}
      </div>
      <div class="s-mail-detail-time">${esc(m.time)}</div>
    </div>
    <div class="s-mail-detail-body">${esc(m.body)}</div>
  `;
}

function renderNotifFeed() {
  const s = Engine.getState();
  const container = document.getElementById('notif-feed');

  // Build a chronological feed of events: inbox items + SMS
  const events = [];

  (s.inbox || []).filter(itemVisibleToMe).forEach((m) => {
    events.push({
      type: 'mail',
      name: m.from,
      time: m.time,
      text: m.subject,
      color: '#4FC3D7',
      initials: initialsFromName(m.from),
      isNew: m.unread,
    });
  });

  Object.entries(s.smsThreads || {}).forEach(([contactId, msgs]) => {
    if (!msgs) return;
    const contact = Engine.getContact(contactId);
    if (!contact) return;
    msgs.forEach((m) => {
      events.push({
        type: 'sms',
        name: contact.name,
        time: m.time,
        text: m.text,
        color: contact.color,
        initials: contact.initials,
        isNew: m.unread && m.direction === 'in',
      });
    });
  });

  document.getElementById('notif-count').textContent = events.length;

  if (events.length === 0) {
    container.innerHTML = '<div class="muted text-center" style="padding: 32px 16px; font-size: 12px;">Quiet. Activity will appear here.</div>';
    return;
  }

  // Newest first — SMS tends to come in clumps so reverse insertion order
  const ordered = events.slice().reverse().slice(0, 10);

  container.innerHTML = ordered
    .map(
      (e) => `
    <div class="notif-feed-item ${e.isNew ? 'new' : ''}">
      <div class="notif-feed-icon" style="background: ${e.color};">${esc(e.initials)}</div>
      <div class="notif-feed-content">
        <div class="notif-feed-head">
          <div class="notif-feed-name">${esc(e.name)}</div>
          <div class="notif-feed-time">${esc(e.time)}</div>
        </div>
        <div class="notif-feed-text">${esc(e.text)}</div>
      </div>
    </div>
  `
    )
    .join('');
}

function renderDocList() {
  // Placeholder — docs push will populate this in v0.3.
  // For now show the 2 docs that ship with Iron Meridian
  const container = document.getElementById('doc-list');
  container.innerHTML = `
    <div class="doc-item">
      <div class="doc-icon">
        <svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 2v6h6" stroke="currentColor" stroke-width="1.5"/></svg>
      </div>
      <div>
        <div class="doc-name">Scenario bible</div>
        <div class="doc-meta">Iron Meridian · v0.2</div>
      </div>
    </div>
    <div class="doc-item">
      <div class="doc-icon">
        <svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 2v6h6" stroke="currentColor" stroke-width="1.5"/></svg>
      </div>
      <div>
        <div class="doc-name">Wing org chart</div>
        <div class="doc-meta">455 AEW (P) · current</div>
      </div>
    </div>
  `;
}

function renderQuickContacts() {
  const container = document.getElementById('qc-list');
  const contacts = Engine.getContacts();
  container.innerHTML = contacts
    .filter((c) => !c.is_group)
    .map(
      (c) => `
    <div class="qc-item">
      <div class="qc-avatar" style="background: ${c.color};">${esc(c.initials)}</div>
      <div>
        <div class="qc-name">${esc(c.name)}</div>
        <div class="qc-title">${esc(c.title)}</div>
      </div>
    </div>
  `
    )
    .join('');
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
