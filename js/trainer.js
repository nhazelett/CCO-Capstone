/* ==========================================================================
   TRAINER VIEW
   ========================================================================== */

// v0.2.7: load every inject present in the bundle rather than a hardcoded pair.
// Previously this was ['IM-01', 'IM-02'] which meant IM-03..IM-50 silently
// never loaded. The bundle is the source of truth for what ships.
function bundleInjectIds() {
  return (window.__CCO_DATA && window.__CCO_DATA.injects)
    ? Object.keys(window.__CCO_DATA.injects)
    : ['IM-01', 'IM-02'];
}

(async function init() {
  // Load config or redirect
  const configRaw = localStorage.getItem('cco-capstone-config');
  if (!configRaw) {
    window.location.href = 'startex.html';
    return;
  }
  const config = JSON.parse(configRaw);

  document.getElementById('difficulty-label').textContent =
    config.difficulty.charAt(0).toUpperCase() + config.difficulty.slice(1);

  // Load content
  await Engine.loadContacts();
  await Engine.loadInjects(bundleInjectIds());

  // Resume or start
  if (!Engine.loadState()) {
    Engine.startExercise(config);
  }
  Engine.enableSync();

  // Initial render
  renderAll();

  // Event hooks
  document.addEventListener('engine:tick', () => {
    renderClock();
    renderCountdown();
  });
  document.addEventListener('engine:inject-fired', () => renderAll());
  document.addEventListener('engine:sync', () => renderAll());
  document.addEventListener('engine:paused', () => updateStatusPill('paused'));
  document.addEventListener('engine:resumed', () => updateStatusPill('live'));
  document.addEventListener('engine:endex', () => {
    updateStatusPill('endex');
    alert('ENDEX. Hotwash mode coming in v0.3.');
  });

  // Buttons
  document.getElementById('pause-btn').addEventListener('click', () => {
    const s = Engine.getState();
    if (s.paused) {
      Engine.resume();
      document.getElementById('pause-btn').innerHTML = '<svg viewBox="0 0 24 24" fill="none"><rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/></svg> Pause';
    } else {
      Engine.pause();
      document.getElementById('pause-btn').innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M5 4l14 8-14 8z" fill="currentColor"/></svg> Resume';
    }
  });

  document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Reset the exercise? This clears all fired injects and returns to STARTEX config.')) {
      Engine.resetState();
      window.location.href = 'startex.html';
    }
  });

  document.getElementById('endex-btn').addEventListener('click', () => {
    if (confirm('Call ENDEX? The clock will stop and the exercise will end.')) {
      Engine.endExercise();
    }
  });

  document.getElementById('fire-next-btn').addEventListener('click', () => {
    Engine.fireNextInject();
  });

  // White cell controls
  document.querySelectorAll('.wc-btn').forEach(btn => {
    btn.addEventListener('click', () => handleWhiteCellAction(btn.dataset.wc));
  });

  // Modal
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-backdrop').addEventListener('click', (e) => {
    if (e.target.id === 'modal-backdrop') closeModal();
  });
})();

function renderAll() {
  renderClock();
  renderTimeline();
  renderActiveFeed();
  renderInboxMirror();
  renderStats();
  renderCountdown();
}

function renderClock() {
  const now = Engine.getExerciseTime();
  document.getElementById('exercise-clock').textContent = now.displayString;
  document.getElementById('stat-day').textContent = `${now.day} / 4`;
}

function renderStats() {
  const s = Engine.getState();
  const now = Engine.getExerciseTime();
  document.getElementById('stat-fired').textContent = `${s.fired.size} / ${s.injects.length}`;
  document.getElementById('stat-flagged').textContent = s.flagged.length;

  // Active count
  const active = s.injects.filter(i => {
    if (!s.fired.has(i.id)) return false;
    const tMin = triggerMin(i);
    const end = tMin + (i.duration_minutes || 30);
    return now.totalMinutes < end;
  });
  document.getElementById('stat-active').textContent = active.length;

  // Pace
  const paceEl = document.getElementById('stat-pace');
  if (s.paused) {
    paceEl.textContent = 'Paused';
    paceEl.style.color = 'var(--warn)';
  } else {
    paceEl.textContent = 'On track';
    paceEl.style.color = 'var(--good)';
  }
}

function renderTimeline() {
  const s = Engine.getState();
  const now = Engine.getExerciseTime();
  const container = document.getElementById('timeline');

  if (s.injects.length === 0) {
    container.innerHTML = '<div class="muted text-center" style="padding: 32px 16px; font-size: 12px;">No injects loaded</div>';
    return;
  }

  const sorted = [...s.injects].sort((a, b) => triggerMin(a) - triggerMin(b));

  container.innerHTML = sorted.map(inj => {
    const tMin = triggerMin(inj);
    const fired = s.fired.has(inj.id);
    const endMin = tMin + (inj.duration_minutes || 30);
    const isActive = fired && now.totalMinutes < endMin;
    const isPast = fired && now.totalMinutes >= endMin;
    const diff = tMin - now.totalMinutes;

    let cls = 'queued';
    if (isPast) cls = 'past';
    else if (isActive) cls = 'live';
    else if (diff >= 0 && diff <= 30) cls = 'next';

    const tMinForDisplay = tMin;
    const dispDay = Math.floor(tMinForDisplay / 1440) + 1;
    const dispMin = tMinForDisplay % 1440;
    const dispHour = Math.floor(dispMin / 60);
    const dispMinute = dispMin % 60;
    return `
      <div class="timeline-item ${cls}" data-id="${inj.id}">
        <div class="timeline-time">${pad(dispHour)}:${pad(dispMinute)}</div>
        <div class="timeline-content">
          <div class="timeline-id">${inj.id} · D${dispDay}</div>
          <div class="timeline-title">${esc(inj.title)}</div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.timeline-item').forEach(el => {
    el.addEventListener('click', () => {
      const inj = s.injects.find(i => i.id === el.dataset.id);
      if (inj) showInjectDetail(inj);
    });
  });
}

function renderActiveFeed() {
  const s = Engine.getState();
  const now = Engine.getExerciseTime();
  const container = document.getElementById('active-feed');

  const active = s.injects.filter(i => {
    if (!s.fired.has(i.id)) return false;
    const tMin = triggerMin(i);
    const end = tMin + (i.duration_minutes || 30);
    return now.totalMinutes < end;
  });

  document.getElementById('active-count').textContent =
    active.length === 0 ? 'No active injects' :
    active.length === 1 ? '1 inject active' :
    `${active.length} injects active`;

  if (active.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="1.5"/><path d="M24 14v10l6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </div>
        <div class="empty-state-title">No active injects</div>
        <div class="empty-state-desc">The next inject will fire on schedule.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = active.map(inj => `
    <div class="inject-card">
      <div class="inject-card-meta">
        <div class="dot"></div>
        <span>${inj.id} · LIVE · ${triggerDisplay(inj)}</span>
      </div>
      <div class="inject-card-title">${esc(inj.title)}</div>
      <div class="inject-card-body">${esc(inj.scenario_for_students || inj.description)}</div>
      <div class="inject-card-actions">
        <button class="btn" data-action="expected" data-id="${inj.id}">Expected actions</button>
        ${inj.phone_script_id ? `<button class="btn" data-action="phone" data-id="${inj.id}">Phone script</button>` : ''}
        <button class="btn" data-action="teaching" data-id="${inj.id}">Teaching point</button>
        <button class="btn" data-action="wrong" data-id="${inj.id}">Wrong answers</button>
        <button class="btn" data-action="real" data-id="${inj.id}">What really happened</button>
        <button class="btn" data-action="flag" data-id="${inj.id}">Flag</button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const inj = s.injects.find(i => i.id === btn.dataset.id);
      if (inj) handleInjectAction(btn.dataset.action, inj);
    });
  });
}

function renderCountdown() {
  const s = Engine.getState();
  const now = Engine.getExerciseTime();
  const box = document.getElementById('countdown-box');

  const upcoming = s.injects
    .filter(i => !s.fired.has(i.id))
    .sort((a, b) => triggerMin(a) - triggerMin(b));

  if (upcoming.length === 0) {
    box.classList.add('hidden');
    return;
  }

  const next = upcoming[0];
  const tMin = triggerMin(next);
  const diffMin = tMin - now.totalMinutes;

  if (diffMin <= 0) {
    box.classList.add('hidden');
    return;
  }

  box.classList.remove('hidden');
  const totalSec = diffMin * 60 - Math.floor((s.clock.exerciseMs % 60000) / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const sec = totalSec % 60;
  document.getElementById('countdown-value').textContent =
    `${pad(h)}:${pad(m)}:${pad(sec)}`;
  document.getElementById('countdown-next').textContent = `${next.id} · ${next.title}`;
}

function renderInboxMirror() {
  const s = Engine.getState();
  const container = document.getElementById('inbox-mirror');
  document.getElementById('inbox-count').textContent = s.inbox.length;

  if (s.inbox.length === 0) {
    container.innerHTML = '<div class="muted text-center" style="padding: 20px; font-size: 11px;">Empty</div>';
    return;
  }

  container.innerHTML = s.inbox.slice(0, 5).map(m => `
    <div class="inbox-mirror-item ${m.unread ? 'unread' : ''}" data-id="${m.id}">
      <div class="inbox-mirror-from">${esc(m.from)}</div>
      <div class="inbox-mirror-subject">${esc(m.subject)}</div>
    </div>
  `).join('');
}

// ----- Action handlers -----

function handleInjectAction(action, inj) {
  switch (action) {
    case 'expected': showExpectedActions(inj); break;
    case 'phone': showPhoneScript(inj); break;
    case 'teaching': showTeachingPoint(inj); break;
    case 'wrong': showWrongAnswers(inj); break;
    case 'real': showWhatReallyHappened(inj); break;
    case 'flag':
      Engine.flagForHotwash(inj.id, '');
      renderStats();
      showToast(`Flagged ${inj.id}`);
      break;
  }
}

function handleWhiteCellAction(action) {
  switch (action) {
    case 'sms':
      showCustomSmsModal();
      break;
    case 'email':
      showModal('Send email', '<p class="muted">Custom email composer coming in v0.3. For now, emails fire from scheduled injects.</p>');
      break;
    case 'call':
      showModal('Place customer call', '<p class="muted">Placeholder. In the full version this fires a scripted phone call inject.</p>');
      break;
    case 'doc':
      showModal('Push supporting document', '<p class="muted">Supporting document library coming in v0.3.</p>');
      break;
    case 'curveball':
      showModal('Fire curveball', '<p class="muted">Curveball inject library coming in v0.3.</p>');
      break;
    case 'flag':
      showModal('Flag for hotwash', '<p class="muted">Use the Flag button on an active inject card. This general flag is for atmospheric moments not tied to an inject.</p>');
      break;
  }
}

function showCustomSmsModal() {
  const contacts = Engine.getContacts().filter(c => !c.is_group);
  const html = `
    <h4>Send a custom SMS to the student phone</h4>
    <p>Tap a contact below, type your message, hit Send. The message lands on the phone immediately.</p>

    <div style="margin-top: 18px;">
      <label class="field-label" style="margin-bottom: 10px; display: block;">From — tap to select</label>
      <div class="contact-picker" id="contact-picker">
        ${contacts.map(c => `
          <button type="button" class="contact-card" data-value="${esc(c.id)}">
            <div class="contact-card-avatar" style="background: ${c.color};">${esc(c.initials)}</div>
            <div class="contact-card-text">
              <div class="contact-card-name">${esc(c.name)}</div>
              <div class="contact-card-title">${esc(c.title)}</div>
            </div>
          </button>
        `).join('')}
      </div>
    </div>

    <div style="margin-top: 18px;">
      <label class="field-label" style="margin-bottom: 8px; display: block;">Message</label>
      <textarea id="sms-text" rows="3" placeholder="Type the message..." style="height: auto; padding: 12px;"></textarea>
    </div>

    <div style="display: flex; gap: 8px; margin-top: 20px; justify-content: space-between; align-items: center;">
      <button class="btn btn-sm" id="sms-quick-test" title="Send a canned test message from Col Ramsey to verify the phone is receiving">
        ⚡ Quick test (Ramsey)
      </button>
      <div style="display: flex; gap: 8px;">
        <button class="btn" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" id="send-sms-btn">Send SMS</button>
      </div>
    </div>
  `;
  showModal('White cell · Custom SMS', html);

  setTimeout(() => {
    let selectedContactId = null;

    document.querySelectorAll('.contact-card').forEach((card) => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.contact-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedContactId = card.dataset.value;
      });
    });

    document.getElementById('send-sms-btn').addEventListener('click', () => {
      if (!selectedContactId) {
        showToast('Pick a contact first');
        return;
      }
      const msg = document.getElementById('sms-text').value.trim();
      if (!msg) {
        showToast('Type a message first');
        return;
      }
      Engine.sendCustomSms(selectedContactId, msg);
      closeModal();
      showToast('SMS sent to student phone');
    });

    document.getElementById('sms-quick-test').addEventListener('click', () => {
      Engine.sendCustomSms('ramsey', 'Where are you on that runway status?');
      closeModal();
      showToast('Test SMS sent — check the phone window');
    });
  }, 50);
}

// ----- Modal content builders -----

function showInjectDetail(inj) {
  showModal(`${inj.id} · ${inj.title}`, `
    <h4>Description</h4>
    <p>${esc(inj.description)}</p>
    <h4>Scenario for students</h4>
    <p>${esc(inj.scenario_for_students || '—')}</p>
    <h4>Duration</h4>
    <p class="mono">${inj.duration_minutes || 30} min window</p>
    <h4>TLOs covered</h4>
    <ul>${(inj.tlo || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
  `);
}

function showExpectedActions(inj) {
  const actions = inj.expected_actions || [];
  showModal(`${inj.id} · Expected actions`, `
    <h4>What a competent CCO should do</h4>
    <ul>
      ${actions.map(a => `
        <li>
          <strong>${esc(a.description)}</strong>
          ${a.priority ? `<div class="mono" style="font-size: 10px; color: var(--text-tertiary); margin-top: 4px; letter-spacing: 0.1em; text-transform: uppercase;">${esc(a.priority)} · ${a.objective ? 'objective' : 'subjective'}</div>` : ''}
          ${a.notes ? `<div style="margin-top: 6px; font-size: 12px; color: var(--warn);">${esc(a.notes)}</div>` : ''}
        </li>
      `).join('')}
    </ul>
    ${inj.trainer_prompts ? `
      <h4>Trainer prompts</h4>
      <ul>${inj.trainer_prompts.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
    ` : ''}
  `);
}

async function showPhoneScript(inj) {
  const script = await Engine.loadPhoneScript(inj.phone_script_id);
  if (!script) {
    showModal('Phone script', '<p class="muted">Not found.</p>');
    return;
  }

  let html = `
    <h4>Caller</h4>
    <p><strong>${esc(script.caller)}</strong></p>
    <p style="font-size: 12px; color: var(--text-secondary);">${esc(script.caller_context)}</p>

    <h4>Delivery notes</h4>
    <div class="script-note">${esc(script.delivery_notes)}</div>

    <h4>Opening</h4>
    <div class="script-block">
      <div class="script-speaker">${esc(script.opening.speaker)}</div>
      <div class="script-line">"${esc(script.opening.line)}"</div>
    </div>

    <h4>Main brief — read in order</h4>
    ${script.main_brief.map(b => `
      <div class="script-block">
        <div class="script-speaker">${esc(b.speaker)}</div>
        <div class="script-line">"${esc(b.line)}"</div>
      </div>
    `).join('')}
  `;

  if (script.branches && script.branches.length > 0) {
    html += `<h4>Branching responses</h4>`;
    script.branches.forEach(b => {
      html += `
        <div class="script-note">IF: ${esc(b.trigger)}</div>
        <div class="script-block">
          <div class="script-speaker">${esc(b.response.speaker)}</div>
          <div class="script-line">"${esc(b.response.line)}"</div>
        </div>
        ${b.response.post_note ? `<p style="font-size: 11px; color: var(--text-tertiary); margin-top: 6px; padding-left: 14px;">Note: ${esc(b.response.post_note)}</p>` : ''}
      `;
    });
  }

  html += `
    <h4>Closing</h4>
    <div class="script-block">
      <div class="script-speaker">${esc(script.closing.speaker)}</div>
      <div class="script-line">"${esc(script.closing.line)}"</div>
    </div>
  `;

  if (script.post_call_trainer_checklist) {
    html += `
      <h4>After the call — trainer checklist</h4>
      <ul>${script.post_call_trainer_checklist.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
    `;
  }

  showModal(`${inj.id} · Phone script`, html);
}

function showTeachingPoint(inj) {
  showModal(`${inj.id} · Teaching point`, `
    <h4>The core lesson</h4>
    <p>${esc(inj.teaching_point || '—')}</p>
  `);
}

function showWrongAnswers(inj) {
  const wrongs = inj.wrong_answer_walkthroughs || [];
  showModal(`${inj.id} · Common wrong answers`, `
    <h4>Watch for these failure patterns</h4>
    ${wrongs.map(w => `
      <div style="margin-bottom: 16px; padding: 14px 16px; background: var(--alert-bg); border: 1px solid var(--alert-line); border-radius: var(--r-md);">
        <div style="color: var(--alert); font-weight: 600; font-size: 13px; margin-bottom: 8px;">${esc(w.answer)}</div>
        <div style="font-size: 12px; color: var(--text-primary); margin-bottom: 6px;"><strong class="muted" style="font-weight: 500;">Consequence:</strong> ${esc(w.consequence)}</div>
        <div style="font-size: 12px; color: var(--good);"><strong class="muted" style="font-weight: 500; color: var(--text-tertiary);">Teaching moment:</strong> ${esc(w.teaching_moment)}</div>
      </div>
    `).join('')}
  `);
}

function showWhatReallyHappened(inj) {
  showModal(`${inj.id} · What really happened`, `
    <h4>The real-world basis for this inject</h4>
    <p>${esc(inj.what_really_happened || '—')}</p>
    <p style="margin-top: 20px; font-size: 12px; color: var(--text-tertiary); padding-top: 16px; border-top: 1px solid var(--line-faint);">Read this aloud to students during hotwash. This is the moment the training lands.</p>
  `);
}

// ----- Helpers -----

function showModal(title, html) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal-backdrop').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-backdrop').classList.add('hidden');
}

function updateStatusPill(status) {
  const pill = document.getElementById('status-pill');
  const text = document.getElementById('exercise-status');
  pill.classList.remove('live', 'active', 'ready');
  if (status === 'live') { pill.classList.add('live'); text.textContent = 'Exercise live'; }
  else if (status === 'paused') { pill.classList.add('active'); text.textContent = 'Paused'; }
  else if (status === 'endex') { text.textContent = 'ENDEX'; }
}

function showToast(msg) {
  console.log('[toast]', msg);
  // simple inline implementation
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--bg-elevated);border:1px solid var(--accent-line);color:var(--accent);padding:12px 20px;border-radius:var(--r-md);font-size:13px;z-index:200;box-shadow:var(--shadow-pop);';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// v0.2.7: prefer the engine's resolved trigger time (set once at startExercise
// so window-type injects have a concrete minute). Fall back to the declared
// absolute trigger for injects that don't have a resolved slot yet, and to
// the window's earliest edge for un-resolved window triggers.
function triggerMin(inj) {
  const resolved = Engine.getResolvedTriggerMinutes
    ? Engine.getResolvedTriggerMinutes(inj.id)
    : null;
  if (resolved != null) return resolved;
  const t = inj.trigger || {};
  if (t.type === 'window') {
    return (t.day - 1) * 1440 + (t.earliest_hour || 8) * 60 + (t.earliest_minute || 0);
  }
  return (t.day - 1) * 1440 + (t.hour || 0) * 60 + (t.minute || 0);
}

// v0.2.7: human label that handles both trigger types gracefully.
function triggerDisplay(inj) {
  const tm = triggerMin(inj);
  const day = Math.floor(tm / 1440) + 1;
  const minInDay = tm % 1440;
  return `D${day} ${pad(Math.floor(minInDay / 60))}:${pad(minInDay % 60)}`;
}

function pad(n) { return String(n).padStart(2, '0'); }

function esc(s) {
  if (s == null) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// expose for inline onclick
window.closeModal = closeModal;
