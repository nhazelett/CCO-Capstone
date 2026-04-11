/* ==========================================================================
   MOBILE VIEW — phone PWA
   ========================================================================== */

const MOBILE_INJECT_IDS = ['IM-01', 'IM-02'];
let currentView = 'home';
let currentThreadContact = null;
let currentMailItem = null;

(async function init() {
  const syncDot = document.getElementById('sync-dot');

  // Phone is a READ-ONLY consumer of state. Only the trainer ticks the clock.
  // This prevents races where the phone saves its own state over the trainer's.
  Engine.setReadOnly(true);

  // Load content — safe even if exercise not running yet
  await Engine.loadContacts();
  await Engine.loadInjects(MOBILE_INJECT_IDS);

  // Attempt to load existing state
  const hadState = Engine.loadState();
  Engine.enableSync();

  // Set initial sync dot state
  if (syncDot) {
    if (hadState) {
      syncDot.classList.add('connected');
      syncDot.title = 'Connected to exercise (state loaded)';
    } else {
      syncDot.classList.add('error');
      syncDot.title = 'No exercise state found — start STARTEX on the trainer view first';
    }
  }

  // Initial render
  renderAll();

  // Listen to engine events
  document.addEventListener('engine:tick', renderClock);
  document.addEventListener('engine:sync', () => {
    if (syncDot) {
      syncDot.classList.remove('error');
      syncDot.classList.add('connected');
    }
    renderAll();
  });
  document.addEventListener('engine:sms-received', (e) => {
    pulseSyncDot();
    renderAll();
    const contact = Engine.getContact(e.detail.contactId);
    if (contact) showPhoneToast(contact, e.detail.text);
  });
  document.addEventListener('engine:inject-fired', renderAll);
  document.addEventListener('engine:inbox-updated', renderAll);
  document.addEventListener('engine:sms-updated', renderAll);

  // Wire navigation
  document.querySelectorAll('[data-view]').forEach((el) => {
    el.addEventListener('click', () => switchView(el.dataset.view));
  });
  document.querySelectorAll('[data-back]').forEach((el) => {
    el.addEventListener('click', () => switchView(el.dataset.back));
  });

  // Safety poll: re-read state every 1.5s as a backup to the storage event.
  // Track IDs of SMS we've already seen so we only toast for GENUINELY new ones.
  let lastSnapshot = '';
  const seenSmsIds = new Set();
  // Seed with whatever's already in state on load (don't toast for pre-existing messages)
  Object.values(Engine.getState().smsThreads || {}).forEach((arr) => {
    (arr || []).forEach((m) => seenSmsIds.add(m.id));
  });
  let lastInboxCount = (Engine.getState().inbox || []).length;

  setInterval(() => {
    try {
      const raw = localStorage.getItem('cco-capstone-state');
      if (!raw) return;
      if (raw === lastSnapshot) return;
      lastSnapshot = raw;
      Engine.loadState();

      // Find any SMS we haven't seen before
      const threads = Engine.getState().smsThreads || {};
      const newMessages = []; // { contactId, message }
      Object.entries(threads).forEach(([cid, msgs]) => {
        (msgs || []).forEach((m) => {
          if (m.direction === 'in' && !seenSmsIds.has(m.id)) {
            newMessages.push({ contactId: cid, message: m });
            seenSmsIds.add(m.id);
          }
        });
      });

      // Show a toast for the most recent new one
      if (newMessages.length > 0) {
        const latest = newMessages[newMessages.length - 1];
        const c = Engine.getContact(latest.contactId);
        if (c && latest.message && latest.message.text) {
          showPhoneToast(c, latest.message.text);
        }
        pulseSyncDot();
      }

      const newInboxCount = (Engine.getState().inbox || []).length;
      if (newInboxCount > lastInboxCount) {
        pulseSyncDot();
        lastInboxCount = newInboxCount;
      }

      if (syncDot) {
        syncDot.classList.remove('error');
        syncDot.classList.add('connected');
      }

      renderAll();
    } catch (e) { console.error('Poll error', e); }
  }, 1500);
})();

function countSms(threads) {
  let n = 0;
  Object.values(threads || {}).forEach((arr) => { n += (arr || []).length; });
  return n;
}

function pulseSyncDot() {
  const dot = document.getElementById('sync-dot');
  if (!dot) return;
  dot.classList.add('pulse');
  setTimeout(() => dot.classList.remove('pulse'), 400);
}

// ----- View switching -----

function switchView(view) {
  currentView = view;
  ['home', 'messages', 'thread', 'mail', 'mail-detail'].forEach((v) => {
    const el = document.getElementById(`view-${v}`);
    if (el) {
      if (v === view) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  });
  // Reset scroll to top of the visible view
  document.getElementById('phone-screen').scrollTop = 0;
  renderAll();
}

function openThread(contactId) {
  currentThreadContact = contactId;
  Engine.markSmsRead(contactId);
  renderAll();
  switchView('thread');
}

function openMail(itemId) {
  currentMailItem = itemId;
  Engine.markInboxRead(itemId);
  renderAll();
  switchView('mail-detail');
}

// ----- Rendering -----

function renderAll() {
  renderClock();
  renderBadges();
  renderNotifications();
  // Always render everything — cheap, and ensures we never show stale data
  // regardless of what view was current when the state changed.
  renderThreadList();
  if (currentView === 'thread') renderThread();
  renderMailList();
  if (currentView === 'mail-detail') renderMailDetail();
}

function renderClock() {
  const now = Engine.getExerciseTime();
  const s = Engine.getState();
  if (!s.clock.running) {
    document.getElementById('phone-time').textContent = '--:--';
    document.getElementById('home-day').textContent = 'Standby';
    return;
  }
  document.getElementById('phone-time').textContent = now.shortTime;
  document.getElementById('home-day').textContent = `Day ${now.day}`;
}

function renderBadges() {
  const s = Engine.getState();

  // SMS unread count across all threads
  let smsUnread = 0;
  Object.values(s.smsThreads || {}).forEach((arr) => {
    smsUnread += arr.filter((m) => m.unread && m.direction === 'in').length;
  });
  const smsBadge = document.getElementById('badge-messages');
  if (smsUnread > 0) {
    smsBadge.textContent = smsUnread;
    smsBadge.classList.remove('hidden');
  } else {
    smsBadge.classList.add('hidden');
  }

  // Mail unread
  const mailUnread = (s.inbox || []).filter((m) => m.unread).length;
  const mailBadge = document.getElementById('badge-mail');
  if (mailUnread > 0) {
    mailBadge.textContent = mailUnread;
    mailBadge.classList.remove('hidden');
  } else {
    mailBadge.classList.add('hidden');
  }
}

function renderNotifications() {
  const s = Engine.getState();
  const container = document.getElementById('notif-list');

  // Build flat list of recent activity: SMS + mail, sorted by time (approximate via order)
  const items = [];

  // Mail items (already ordered newest first by the engine)
  (s.inbox || []).slice(0, 4).forEach((m) => {
    items.push({
      type: 'mail',
      id: m.id,
      name: m.from,
      time: m.time,
      text: m.subject,
      color: '#4FC3D7',
      initials: initialsFromName(m.from),
    });
  });

  // SMS items — take the latest 1 per thread
  Object.entries(s.smsThreads || {}).forEach(([contactId, msgs]) => {
    if (!msgs || msgs.length === 0) return;
    const contact = Engine.getContact(contactId);
    if (!contact) return;
    const latest = msgs[msgs.length - 1];
    items.push({
      type: 'sms',
      id: `thread-${contactId}`,
      contactId: contactId,
      name: contact.name,
      time: latest.time,
      text: latest.text,
      color: contact.color,
      initials: contact.initials,
    });
  });

  if (items.length === 0) {
    container.innerHTML = '<div class="notif-empty">No notifications yet.<br>Exercise will push here as it runs.</div>';
    return;
  }

  // Show most recent first — SMS first since it's more urgent/immediate
  const sms = items.filter((i) => i.type === 'sms');
  const mail = items.filter((i) => i.type === 'mail');
  const ordered = [...sms, ...mail].slice(0, 6);

  container.innerHTML = ordered
    .map(
      (n) => `
    <div class="notif-card" data-type="${n.type}" data-id="${esc(n.id)}" data-contact="${esc(n.contactId || '')}">
      <div class="notif-card-icon" style="background: ${n.color};">${esc(n.initials)}</div>
      <div class="notif-card-content">
        <div class="notif-card-head">
          <div class="notif-card-name">${esc(n.name)}</div>
          <div class="notif-card-time">${esc(n.time)}</div>
        </div>
        <div class="notif-card-text">${esc(n.text)}</div>
      </div>
    </div>
  `
    )
    .join('');

  container.querySelectorAll('.notif-card').forEach((el) => {
    el.addEventListener('click', () => {
      if (el.dataset.type === 'sms') {
        openThread(el.dataset.contact);
      } else if (el.dataset.type === 'mail') {
        openMail(el.dataset.id);
      }
    });
  });
}

function renderThreadList() {
  const s = Engine.getState();
  const contacts = Engine.getContacts();
  const container = document.getElementById('thread-list');

  // Count total SMS across all threads for debug visibility
  let totalSms = 0;
  Object.values(s.smsThreads || {}).forEach((arr) => { totalSms += (arr || []).length; });

  // Only show contacts with at least one message
  const withMessages = contacts.filter((c) => s.smsThreads[c.id] && s.smsThreads[c.id].length > 0);

  const debugLine = `<div style="padding: 6px 16px; font-family: var(--font-mono); font-size: 9px; color: var(--text-tertiary); background: var(--bg-raised); border-bottom: 1px solid var(--line-faint);">DBG: ${totalSms} total SMS · ${withMessages.length} threads · ${contacts.length} contacts loaded</div>`;

  if (withMessages.length === 0) {
    container.innerHTML = debugLine + '<div class="thread-empty">No messages yet.<br>The phone will buzz when someone texts.</div>';
    return;
  }

  container.innerHTML = debugLine + withMessages
    .map((c) => {
      const msgs = s.smsThreads[c.id];
      const latest = msgs[msgs.length - 1];
      const unread = msgs.some((m) => m.unread && m.direction === 'in');
      return `
        <div class="thread-row ${unread ? 'unread' : ''}" data-contact="${c.id}">
          <div class="avatar-sm" style="background: ${c.color};">${esc(c.initials)}</div>
          <div class="thread-row-content">
            <div class="thread-row-head">
              <div class="thread-row-name">${esc(c.name)}</div>
              <div class="thread-row-time">${esc(latest.time)}</div>
            </div>
            <div class="thread-row-preview">${esc(latest.text)}</div>
          </div>
          <div class="thread-row-indicator"></div>
        </div>
      `;
    })
    .join('');

  container.querySelectorAll('.thread-row').forEach((el) => {
    el.addEventListener('click', () => openThread(el.dataset.contact));
  });
}

function renderThread() {
  if (!currentThreadContact) return;
  const s = Engine.getState();
  const contact = Engine.getContact(currentThreadContact);
  if (!contact) return;

  document.getElementById('thread-name').textContent = contact.name;
  document.getElementById('thread-title').textContent = contact.title || '';
  const avatar = document.getElementById('thread-avatar');
  avatar.textContent = contact.initials;
  avatar.style.background = contact.color;

  const msgs = s.smsThreads[currentThreadContact] || [];
  const body = document.getElementById('thread-body');

  if (msgs.length === 0) {
    body.innerHTML = '<div class="thread-empty">No messages yet.</div>';
    return;
  }

  // Group consecutive messages from the same direction
  let html = '';
  let lastTime = '';
  let groupOpen = false;

  msgs.forEach((m, idx) => {
    if (m.time !== lastTime) {
      if (groupOpen) {
        html += '</div>';
        groupOpen = false;
      }
      html += `<div class="bubble-time">${esc(m.time)}</div>`;
      lastTime = m.time;
    }
    if (!groupOpen) {
      html += `<div class="bubble-group">`;
      groupOpen = true;
    }
    html += `<div class="bubble ${m.direction}">${esc(m.text)}</div>`;
  });

  if (groupOpen) html += '</div>';

  body.innerHTML = html;

  // Scroll to bottom of thread
  setTimeout(() => {
    const screen = document.getElementById('phone-screen');
    screen.scrollTop = screen.scrollHeight;
  }, 50);
}

function renderMailList() {
  const s = Engine.getState();
  const container = document.getElementById('mail-list');

  if (!s.inbox || s.inbox.length === 0) {
    container.innerHTML = '<div class="mail-empty">Inbox is empty.<br>Messages will arrive as the exercise runs.</div>';
    return;
  }

  container.innerHTML = s.inbox
    .map((m) => {
      const preview = (m.body || '').split('\n')[0].slice(0, 80);
      return `
        <div class="mail-row ${m.unread ? 'unread' : ''}" data-id="${esc(m.id)}">
          <div class="mail-row-head">
            <div class="mail-row-from">${esc(m.from)}</div>
            <div class="mail-row-time">${esc(m.time)}</div>
          </div>
          <div class="mail-row-subject">${esc(m.subject)}</div>
          <div class="mail-row-preview">${esc(preview)}</div>
        </div>
      `;
    })
    .join('');

  container.querySelectorAll('.mail-row').forEach((el) => {
    el.addEventListener('click', () => openMail(el.dataset.id));
  });
}

function renderMailDetail() {
  if (!currentMailItem) return;
  const s = Engine.getState();
  const m = (s.inbox || []).find((x) => x.id === currentMailItem);
  if (!m) return;

  document.getElementById('mail-detail').innerHTML = `
    <div class="mail-detail-subject">${esc(m.subject)}</div>
    <div class="mail-detail-meta">
      <div>
        <div class="mail-detail-from">${esc(m.from)}</div>
        ${m.fromEmail ? `<div class="mail-detail-from-email">${esc(m.fromEmail)}</div>` : ''}
      </div>
      <div class="mail-detail-time">${esc(m.time)}</div>
    </div>
    <div class="mail-detail-body">${esc(m.body)}</div>
  `;
}

// ----- Phone toast notification -----

let toastTimeout = null;

function showPhoneToast(contact, text) {
  const toast = document.getElementById('phone-toast');
  toast.classList.remove('hidden');
  document.getElementById('toast-name').textContent = contact.name;
  document.getElementById('toast-text').textContent = text;
  const icon = document.getElementById('toast-icon');
  icon.textContent = contact.initials;
  icon.style.background = contact.color;

  // Animate in
  requestAnimationFrame(() => toast.classList.add('show'));

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 400);
  }, 4000);

  // Click toast opens the thread
  toast.onclick = () => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 400);
    openThread(contact.id);
  };
  toast.style.pointerEvents = 'auto';
}

// ----- Helpers -----

function initialsFromName(name) {
  if (!name) return '?';
  const parts = name.replace(/[^a-zA-Z ]/g, '').trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

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
   DEBUG DRAWER — diagnostic panel for v0.2.5
   ========================================================================== */

const DebugDrawer = (function () {
  const MAX_LOG = 20;
  const eventLog = [];
  let visible = false;
  let autoRefreshTimer = null;

  function wallTime() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
  }

  function logEvent(type, detail) {
    eventLog.unshift({ time: wallTime(), type, detail });
    if (eventLog.length > MAX_LOG) eventLog.pop();
    if (visible) renderLog();
  }

  function attach() {
    const fab = document.getElementById('debug-fab');
    const drawer = document.getElementById('debug-drawer');
    if (!fab || !drawer) return;

    fab.addEventListener('click', toggle);
    document.getElementById('debug-close').addEventListener('click', hide);
    document.getElementById('debug-reload').addEventListener('click', () => {
      Engine.loadState();
      renderAll();
      render();
      logEvent('manual:reload', 'operator tapped Reload state');
    });
    document.getElementById('debug-copy').addEventListener('click', copyJson);

    // Triple-tap the sync dot to toggle as an alt trigger
    const dot = document.getElementById('sync-dot');
    if (dot) {
      let taps = 0;
      let tapTimer = null;
      dot.addEventListener('click', () => {
        taps++;
        clearTimeout(tapTimer);
        tapTimer = setTimeout(() => { taps = 0; }, 600);
        if (taps >= 3) { taps = 0; toggle(); }
      });
    }

    // Hook engine events for the log
    const hooks = [
      ['engine:tick', 'tick'],
      ['engine:sync', 'sync'],
      ['engine:sms-received', 'sms-received'],
      ['engine:sms-updated', 'sms-updated'],
      ['engine:inbox-updated', 'inbox-updated'],
      ['engine:inject-fired', 'inject-fired'],
    ];
    hooks.forEach(([evt, label]) => {
      document.addEventListener(evt, (e) => {
        // Skip tick noise in the log — it fires every second
        if (label === 'tick') return;
        let desc = '';
        if (e.detail) {
          if (e.detail.text) desc = `"${e.detail.text.slice(0, 60)}"`;
          else if (e.detail.id) desc = `id=${e.detail.id}`;
          else if (e.detail.contactId) desc = `contact=${e.detail.contactId}`;
          else if (typeof e.detail === 'object') desc = JSON.stringify(e.detail).slice(0, 80);
        }
        logEvent(label, desc);
      });
    });

    logEvent('init', `readOnly=${Engine.getState().readOnly === true}`);
  }

  function toggle() { visible ? hide() : show(); }
  function show() {
    document.getElementById('debug-drawer').classList.remove('hidden');
    visible = true;
    render();
    if (autoRefreshTimer) clearInterval(autoRefreshTimer);
    autoRefreshTimer = setInterval(render, 1000);
  }
  function hide() {
    document.getElementById('debug-drawer').classList.add('hidden');
    visible = false;
    if (autoRefreshTimer) { clearInterval(autoRefreshTimer); autoRefreshTimer = null; }
  }

  function render() {
    const s = Engine.getState();
    const now = Engine.getExerciseTime();

    // Flags
    const ro = s.readOnly === true;
    const src = s._contentSource || 'none';
    const srcCls = src === 'inline' ? 'ok' : (src === 'fetch' ? 'v' : 'warn');
    const errCount = (s._loadErrors || []).length;
    document.getElementById('debug-flags').innerHTML =
      `<span class="k">readOnly</span>: <span class="${ro ? 'ok' : 'warn'}">${ro}</span>  ` +
      `<span class="k">running</span>: <span class="${s.clock.running ? 'ok' : 'warn'}">${s.clock.running}</span>  ` +
      `<span class="k">paused</span>: <span class="v">${s.paused}</span><br>` +
      `<span class="k">content source</span>: <span class="${srcCls}">${src}</span>  ` +
      `<span class="k">load errors</span>: <span class="${errCount ? 'warn' : 'ok'}">${errCount}</span>` +
      (errCount ? `<br><span class="warn">${esc((s._loadErrors[0] || {}).where)}: ${esc((s._loadErrors[0] || {}).msg)}</span>` : '');

    // Clock
    document.getElementById('debug-clock').innerHTML =
      `<span class="k">exercise</span>: <span class="v">${now.displayString}</span>  ` +
      `<span class="k">exerciseMs</span>: <span class="v">${s.clock.exerciseMs}</span><br>` +
      `<span class="k">ratio</span>: <span class="v">${s.clock.wallToExerciseRatio}x</span>  ` +
      `<span class="k">currentView</span>: <span class="v">${currentView}</span>`;

    // Counts
    let totalSms = 0;
    const threadCounts = {};
    Object.entries(s.smsThreads || {}).forEach(([cid, arr]) => {
      const n = (arr || []).length;
      totalSms += n;
      if (n > 0) threadCounts[cid] = n;
    });
    const contacts = Engine.getContacts() || [];
    const pending = (s._pendingSms || []).length;
    document.getElementById('debug-counts').innerHTML =
      `<span class="k">contacts</span>: <span class="v">${contacts.length}</span>  ` +
      `<span class="k">inbox</span>: <span class="v">${(s.inbox || []).length}</span>  ` +
      `<span class="k">sms total</span>: <span class="v">${totalSms}</span>  ` +
      `<span class="k">sms pending</span>: <span class="v">${pending}</span><br>` +
      `<span class="k">threads with msgs</span>: <span class="v">${JSON.stringify(threadCounts)}</span>  ` +
      `<span class="k">fired</span>: <span class="v">${s.fired.size || 0}</span>`;

    // Raw dumps
    document.getElementById('debug-sms').textContent =
      JSON.stringify(s.smsThreads || {}, null, 2);
    document.getElementById('debug-inbox').textContent =
      JSON.stringify(s.inbox || [], null, 2);

    // localStorage snapshot
    try {
      const raw = localStorage.getItem('cco-capstone-state');
      if (!raw) {
        document.getElementById('debug-ls').innerHTML =
          `<span class="warn">empty — trainer has not started STARTEX</span>`;
      } else {
        const parsed = JSON.parse(raw);
        const ts = parsed._lastUpdate ? new Date(parsed._lastUpdate) : null;
        const lsSms = parsed.smsThreads ? Object.values(parsed.smsThreads).reduce((n, a) => n + (a || []).length, 0) : 0;
        const lsInbox = (parsed.inbox || []).length;
        const age = ts ? ((Date.now() - ts.getTime()) / 1000).toFixed(1) + 's ago' : 'unknown';
        document.getElementById('debug-ls').innerHTML =
          `<span class="k">bytes</span>: <span class="v">${raw.length}</span>  ` +
          `<span class="k">last update</span>: <span class="v">${age}</span><br>` +
          `<span class="k">ls.smsThreads total</span>: <span class="v">${lsSms}</span>  ` +
          `<span class="k">ls.inbox</span>: <span class="v">${lsInbox}</span>  ` +
          `<span class="k">ls.fired</span>: <span class="v">${(parsed.fired || []).length}</span>`;
      }
    } catch (e) {
      document.getElementById('debug-ls').innerHTML = `<span class="warn">parse error: ${esc(String(e))}</span>`;
    }

    renderLog();
  }

  function renderLog() {
    const container = document.getElementById('debug-log');
    if (!container) return;
    if (eventLog.length === 0) {
      container.innerHTML = '<div class="debug-log-row"><div class="d" style="color:#7A8699;">(no events yet)</div></div>';
      return;
    }
    container.innerHTML = eventLog.map((e) => {
      const cls = e.type.startsWith('sms') ? 'evt-sms'
        : e.type.startsWith('inject') ? 'evt-inject'
        : e.type.startsWith('inbox') ? 'evt-inbox'
        : '';
      return `<div class="debug-log-row ${cls}">
        <div class="t">${esc(e.time)}</div>
        <div class="e">${esc(e.type)}</div>
        <div class="d">${esc(e.detail || '')}</div>
      </div>`;
    }).join('');
  }

  function copyJson() {
    const s = Engine.getState();
    const payload = {
      flags: { readOnly: s.readOnly === true, running: s.clock.running, paused: s.paused },
      clock: { exerciseMs: s.clock.exerciseMs, display: Engine.getExerciseTime().displayString },
      counts: {
        contacts: (Engine.getContacts() || []).length,
        inbox: (s.inbox || []).length,
        sms: Object.values(s.smsThreads || {}).reduce((n, a) => n + (a || []).length, 0),
        pending: (s._pendingSms || []).length,
      },
      inbox: s.inbox || [],
      smsThreads: s.smsThreads || {},
      eventLog: eventLog,
    };
    const text = JSON.stringify(payload, null, 2);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => logEvent('manual:copy', `${text.length} chars copied`))
        .catch((err) => logEvent('manual:copy', `failed: ${err.message}`));
    } else {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); logEvent('manual:copy', `${text.length} chars (legacy)`); }
      catch (e) { logEvent('manual:copy', 'failed'); }
      document.body.removeChild(ta);
    }
  }

  return { attach, logEvent, show, hide, toggle };
})();

// Attach on next tick so the Engine init above has finished
setTimeout(() => { try { DebugDrawer.attach(); } catch (e) { console.error('Debug drawer attach failed', e); } }, 0);
