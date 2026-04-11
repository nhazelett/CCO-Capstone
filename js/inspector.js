/* ==========================================================================
   CCO CAPSTONE — Inspector Whiteboard controller
   Read-only consumer of engine state + local inspector notes persistence
   ========================================================================== */

(function () {
  const NOTES_KEY = 'cco-capstone-inspector-notes';
  const CONFIG_KEY = 'cco-capstone-config';
  // v0.2.7: inspector reads (never writes) the student's response log.
  const STUDENT_RESPONSES_KEY = 'cco-capstone-student-responses';

  function loadStudentResponses() {
    try {
      const raw = localStorage.getItem(STUDENT_RESPONSES_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function studentResponseFor(injectId) {
    const all = loadStudentResponses();
    return all[injectId] || null;
  }

  // Generic observations that apply to any inject. Specific inject checklists
  // come from inj.expected_actions automatically.
  const GENERIC_OBSERVATIONS = [
    { id: 'gen-comms',  text: 'Team communicated clearly and delegated effectively' },
    { id: 'gen-urg',    text: 'Student recognized urgency and prioritized correctly' },
    { id: 'gen-verify', text: 'Student verified information rather than trusting verbally' },
    { id: 'gen-far',    text: 'Appropriate FAR / DFARS authority was cited or applied' },
    { id: 'gen-ethics', text: 'Ethics or fiscal red flags were caught and addressed' },
    { id: 'gen-esc',    text: 'Student escalated to CCO / KO when required' },
    { id: 'gen-doc',    text: 'Decision was documented in the contract file' },
  ];

  // ---------- State ----------
  const ui = {
    stream:        document.getElementById('inject-stream'),
    filterBtns:    document.querySelectorAll('.chip-btn'),
    gradeBody:     document.getElementById('grade-body'),
    gradeTitle:    document.getElementById('grade-title'),
    gradeStatus:   document.getElementById('grade-status'),
    clock:         document.getElementById('ih-clock'),
    firedCount:    document.getElementById('ih-fired-count'),
    totalCount:    document.getElementById('ih-total-count'),
    gradedCount:   document.getElementById('ih-graded-count'),
    flagCount:     document.getElementById('ih-flag-count'),
    exerciseStat:  document.getElementById('exercise-status'),
    inspectorSel:  document.getElementById('inspector-select'),
    btnExport:     document.getElementById('btn-export'),
    btnReset:      document.getElementById('btn-reset'),
  };

  let notes = loadNotes();
  let selectedInjectId = null;
  let streamFilter = 'all';
  let currentInspectorId = notes.currentInspectorId || '';

  // ---------- Notes persistence ----------
  function loadNotes() {
    try {
      const raw = localStorage.getItem(NOTES_KEY);
      if (!raw) return { currentInspectorId: '', entries: {} };
      const parsed = JSON.parse(raw);
      return { currentInspectorId: parsed.currentInspectorId || '', entries: parsed.entries || {} };
    } catch (e) {
      return { currentInspectorId: '', entries: {} };
    }
  }

  function saveNotes() {
    try {
      notes.currentInspectorId = currentInspectorId;
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (e) { console.error('[inspector] save fail:', e); }
  }

  function noteFor(injectId) {
    if (!notes.entries[injectId]) {
      notes.entries[injectId] = {
        checked: {},    // observation id -> true
        comment: '',
        flagged: false,
        score: '',       // '', 'GO', 'NO-GO'
        inspector: currentInspectorId,
        updatedAt: null,
      };
    }
    return notes.entries[injectId];
  }

  // ---------- Inspector selector ----------
  function loadInspectorsFromConfig() {
    try {
      const raw = localStorage.getItem(CONFIG_KEY);
      if (!raw) return [];
      const cfg = JSON.parse(raw);
      return cfg.inspectors || [];
    } catch (e) { return []; }
  }

  function populateInspectorSelect() {
    const inspectors = loadInspectorsFromConfig();
    ui.inspectorSel.innerHTML = '<option value="">Pick inspector…</option>';
    inspectors.forEach(i => {
      const opt = document.createElement('option');
      opt.value = i.id;
      opt.textContent = i.name + ' · ' + i.role;
      ui.inspectorSel.appendChild(opt);
    });
    if (currentInspectorId) ui.inspectorSel.value = currentInspectorId;
  }

  ui.inspectorSel.addEventListener('change', () => {
    currentInspectorId = ui.inspectorSel.value;
    saveNotes();
  });

  // ---------- Engine hookup ----------
  function initEngine() {
    Engine.setReadOnly(true);
    Engine.enableSync();

    // Load content bundle (contacts/injects/phone scripts)
    const configRaw = localStorage.getItem(CONFIG_KEY);
    if (!configRaw) {
      ui.exerciseStat.textContent = 'No config — launch STARTEX first';
      return;
    }
    const cfg = JSON.parse(configRaw);

    // Load all injects in the bundle (not just scenario-scoped), because
    // when new injects fire we want their metadata available.
    const bundleIds = (window.__CCO_DATA && window.__CCO_DATA.injects)
      ? Object.keys(window.__CCO_DATA.injects)
      : ['IM-01', 'IM-02'];

    Promise.all([
      Engine.loadInjects(bundleIds),
      Engine.loadContacts(),
    ]).then(() => {
      Engine.loadState();
      render();
    });
  }

  // ---------- Rendering ----------
  function render() {
    renderStream();
    renderHeader();
    renderGrade();
  }

  function renderHeader() {
    const state = Engine.getState();
    const time = Engine.getExerciseTime();
    ui.clock.textContent = state.clock.running ? time.displayString : '—';
    ui.totalCount.textContent = state.injects.length;
    ui.firedCount.textContent = state.fired.size;
    ui.gradedCount.textContent = countGraded();
    ui.flagCount.textContent  = countFlagged();
    ui.exerciseStat.textContent = state.clock.running
      ? (state.paused ? 'Exercise paused' : 'Exercise live')
      : 'Exercise not running';
  }

  function countGraded() {
    return Object.values(notes.entries).filter(n => n.score || Object.keys(n.checked || {}).some(k => n.checked[k]) || (n.comment && n.comment.trim())).length;
  }

  function countFlagged() {
    return Object.values(notes.entries).filter(n => n.flagged).length;
  }

  function firedInjects() {
    const state = Engine.getState();
    return state.injects
      .filter(i => state.fired.has(i.id))
      .sort((a, b) => {
        // Fired order roughly matches trigger order in absolute-trigger mode
        const at = a.trigger ? (a.trigger.day * 1440 + a.trigger.hour * 60 + a.trigger.minute) : 0;
        const bt = b.trigger ? (b.trigger.day * 1440 + b.trigger.hour * 60 + b.trigger.minute) : 0;
        return at - bt;
      });
  }

  function renderStream() {
    const list = firedInjects();
    const filtered = list.filter(inj => {
      const n = notes.entries[inj.id];
      if (streamFilter === 'ungraded') return !n || !n.score;
      if (streamFilter === 'flagged')  return n && n.flagged;
      return true;
    });

    if (list.length === 0) {
      ui.stream.innerHTML = `
        <div class="stream-empty">
          <div class="micro">No injects yet</div>
          <p>When the trainer fires an inject, it'll show up here for grading.</p>
        </div>`;
      return;
    }

    if (filtered.length === 0) {
      ui.stream.innerHTML = `
        <div class="stream-empty">
          <div class="micro">Nothing matches this filter</div>
        </div>`;
      return;
    }

    ui.stream.innerHTML = '';
    filtered.forEach(inj => {
      const n = notes.entries[inj.id];
      const item = document.createElement('div');
      item.className = 'stream-item' + (inj.id === selectedInjectId ? ' active' : '');
      item.dataset.injectId = inj.id;

      const head = document.createElement('div');
      head.className = 'stream-item-head';
      head.innerHTML = `
        <span class="stream-id">${escapeHtml(inj.id)}</span>
        <span class="stream-time">${triggerLabel(inj)}</span>`;
      item.appendChild(head);

      const title = document.createElement('div');
      title.className = 'stream-title';
      title.textContent = inj.title || '(untitled)';
      item.appendChild(title);

      const status = document.createElement('div');
      status.className = 'stream-status';
      if (n && n.score) {
        const scoreBadge = document.createElement('span');
        scoreBadge.className = 'stream-badge graded';
        scoreBadge.textContent = n.score;
        status.appendChild(scoreBadge);
      } else {
        const un = document.createElement('span');
        un.className = 'stream-badge ungraded';
        un.textContent = 'Ungraded';
        status.appendChild(un);
      }
      if (n && n.flagged) {
        const flg = document.createElement('span');
        flg.className = 'stream-badge flagged';
        flg.textContent = 'Flagged';
        status.appendChild(flg);
      }
      item.appendChild(status);

      item.addEventListener('click', () => {
        selectedInjectId = inj.id;
        render();
      });
      ui.stream.appendChild(item);
    });
  }

  function triggerLabel(inj) {
    // Prefer resolved time (set at startExercise with jitter/window), fall
    // back to the declared absolute trigger for injects that haven't fired yet.
    const resolved = Engine.getResolvedTriggerMinutes
      ? Engine.getResolvedTriggerMinutes(inj.id)
      : null;
    if (resolved != null) {
      const day = Math.floor(resolved / 1440) + 1;
      const mid = resolved % 1440;
      return `D${day} ${pad(Math.floor(mid / 60))}:${pad(mid % 60)}`;
    }
    if (!inj.trigger) return '';
    const t = inj.trigger;
    if (t.type === 'window') {
      return `D${t.day} ${pad(t.earliest_hour || 8)}–${pad(t.latest_hour || 17)}`;
    }
    return `D${t.day} ${pad(t.hour || 0)}:${pad(t.minute || 0)}`;
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function renderGrade() {
    if (!selectedInjectId) {
      ui.gradeBody.innerHTML = `
        <div class="grade-empty">
          <svg viewBox="0 0 48 48" fill="none">
            <rect x="6" y="8" width="36" height="32" rx="2" stroke="currentColor" stroke-width="1.5"/>
            <path d="M14 18h20M14 26h20M14 34h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <div class="micro">Whiteboard ready</div>
          <p>Pick a fired inject on the left to start grading. You can mark observations, flag incidents, and leave comments that appear in the hotwash export.</p>
        </div>`;
      ui.gradeTitle.textContent = 'Select an inject';
      ui.gradeStatus.innerHTML = '';
      return;
    }

    const state = Engine.getState();
    const inj = state.injects.find(i => i.id === selectedInjectId);
    if (!inj) {
      ui.gradeBody.innerHTML = `<div class="grade-empty"><p>Inject not found in current bundle.</p></div>`;
      return;
    }

    const n = noteFor(inj.id);
    ui.gradeTitle.textContent = `${inj.id} · ${inj.title || ''}`;
    ui.gradeStatus.innerHTML = n.score
      ? `<span class="grade-status-pill graded">${escapeHtml(n.score)}</span>`
      : `<span class="grade-status-pill">Ungraded</span>`;

    ui.gradeBody.innerHTML = '';

    // Meta row
    const meta = document.createElement('div');
    meta.className = 'grade-meta';
    meta.innerHTML = `
      <div class="grade-meta-block">
        <div class="field-label">Trigger</div>
        <div class="value">${triggerLabel(inj)}</div>
      </div>
      <div class="grade-meta-block">
        <div class="field-label">Duration</div>
        <div class="value">${inj.duration_minutes || '—'} min</div>
      </div>
      <div class="grade-meta-block">
        <div class="field-label">TLO</div>
        <div class="value">${(inj.tlo || []).join(' · ') || '—'}</div>
      </div>
      <div class="grade-meta-block">
        <div class="field-label">Difficulty</div>
        <div class="value">${(inj.difficulty || []).join('/') || '—'}</div>
      </div>`;
    ui.gradeBody.appendChild(meta);

    // Description
    if (inj.description) {
      const desc = document.createElement('div');
      desc.className = 'inject-description';
      desc.textContent = inj.description;
      ui.gradeBody.appendChild(desc);
    }

    // v0.2.7: student's self-reported response to this inject.
    // Read-only here; grader uses this to anchor their observations.
    const sr = studentResponseFor(inj.id);
    const srBlock = document.createElement('div');
    srBlock.className = 'student-response-block' + (sr ? '' : ' empty');
    if (!sr || (!sr.action && !sr.authority && !sr.rationale)) {
      srBlock.innerHTML = `
        <div class="sr-head">
          <div class="micro">Student response</div>
          <div class="sr-status empty">Not logged</div>
        </div>
        <div class="sr-empty">Student has not recorded a response for this inject yet.</div>`;
    } else {
      srBlock.innerHTML = `
        <div class="sr-head">
          <div class="micro">Student response${sr.locked ? ' · SUBMITTED' : ' · DRAFT'}</div>
          <div class="sr-status ${sr.locked ? 'locked' : 'draft'}">${sr.locked ? 'Submitted' : 'Draft'}</div>
        </div>
        <div class="sr-grid">
          <div class="sr-row">
            <div class="sr-label">Action taken</div>
            <div class="sr-value">${escapeHtml(sr.action || '—')}</div>
          </div>
          <div class="sr-row">
            <div class="sr-label">Authority cited</div>
            <div class="sr-value mono">${escapeHtml(sr.authority || '—')}</div>
          </div>
          <div class="sr-row">
            <div class="sr-label">Rationale</div>
            <div class="sr-value">${escapeHtml(sr.rationale || '—')}</div>
          </div>
        </div>`;
    }
    ui.gradeBody.appendChild(srBlock);

    // Toolbar: flag + score
    const toolbar = document.createElement('div');
    toolbar.className = 'grade-toolbar';
    toolbar.innerHTML = `
      <label class="flag-toggle ${n.flagged ? 'on' : ''}">
        <input type="checkbox" ${n.flagged ? 'checked' : ''} />
        <span>Flag for hotwash</span>
      </label>
      <div class="score-group">
        <div class="field-label">Score</div>
        <button type="button" class="score-btn" data-score="GO"    >GO</button>
        <button type="button" class="score-btn" data-score="NO-GO" >NO-GO</button>
      </div>`;
    ui.gradeBody.appendChild(toolbar);

    toolbar.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
      n.flagged = e.target.checked;
      toolbar.querySelector('.flag-toggle').classList.toggle('on', n.flagged);
      touch(n);
      renderHeader();
      renderStream();
    });

    toolbar.querySelectorAll('.score-btn').forEach(btn => {
      if (btn.dataset.score === n.score) btn.classList.add('active');
      btn.addEventListener('click', () => {
        n.score = (n.score === btn.dataset.score) ? '' : btn.dataset.score;
        touch(n);
        renderGrade();
        renderHeader();
        renderStream();
      });
    });

    // Section: per-inject expected actions
    const specific = inj.expected_actions || [];
    if (specific.length) {
      ui.gradeBody.appendChild(sectionHeader(
        'Scenario-specific observations',
        `${Object.keys(n.checked).filter(k => n.checked[k] && k.startsWith('sp-')).length} / ${specific.length}`
      ));
      const list = document.createElement('div');
      list.className = 'obs-list';
      specific.forEach(a => {
        const key = 'sp-' + a.id;
        list.appendChild(obsItem(key, a.description, a.priority, !!n.checked[key], (val) => {
          if (val) n.checked[key] = true; else delete n.checked[key];
          touch(n);
        }));
      });
      ui.gradeBody.appendChild(list);
    }

    // Section: generic observations
    ui.gradeBody.appendChild(sectionHeader(
      'General observations',
      `${Object.keys(n.checked).filter(k => n.checked[k] && k.startsWith('gen-')).length} / ${GENERIC_OBSERVATIONS.length}`
    ));
    const glist = document.createElement('div');
    glist.className = 'obs-list';
    GENERIC_OBSERVATIONS.forEach(a => {
      const key = a.id;
      glist.appendChild(obsItem(key, a.text, null, !!n.checked[key], (val) => {
        if (val) n.checked[key] = true; else delete n.checked[key];
        touch(n);
      }));
    });
    ui.gradeBody.appendChild(glist);

    // Section: comments
    const cwrap = document.createElement('div');
    cwrap.className = 'grade-section';
    const chead = document.createElement('div');
    chead.className = 'grade-section-head';
    chead.innerHTML = `
      <div class="micro">Inspector comments</div>
      <div class="autosave-hint" id="autosave-hint">Autosaving</div>`;
    cwrap.appendChild(chead);
    const ta = document.createElement('textarea');
    ta.className = 'comment-field';
    ta.placeholder = 'What did the student actually do? What was the moment? What would you say in the hotwash?';
    ta.value = n.comment || '';
    ta.addEventListener('input', () => {
      n.comment = ta.value;
      touch(n);
      const hint = document.getElementById('autosave-hint');
      if (hint) { hint.textContent = 'Saved ✓'; setTimeout(() => { hint.textContent = 'Autosaving'; }, 900); }
      renderHeader();
    });
    cwrap.appendChild(ta);
    ui.gradeBody.appendChild(cwrap);
  }

  function sectionHeader(label, countText) {
    const wrap = document.createElement('div');
    wrap.className = 'grade-section';
    wrap.innerHTML = `
      <div class="grade-section-head">
        <div class="micro">${escapeHtml(label)}</div>
        <div class="section-count">${escapeHtml(countText)}</div>
      </div>`;
    return wrap;
  }

  function obsItem(key, text, priority, checked, onChange) {
    const label = document.createElement('label');
    label.className = 'obs-item' + (checked ? ' checked' : '');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = checked;
    cb.addEventListener('change', () => {
      onChange(cb.checked);
      label.classList.toggle('checked', cb.checked);
      renderHeader();
      renderStream();
    });
    label.appendChild(cb);
    const body = document.createElement('div');
    body.className = 'obs-item-body';
    const txt = document.createElement('div');
    txt.className = 'obs-item-text';
    txt.textContent = text;
    body.appendChild(txt);
    label.appendChild(body);
    if (priority) {
      const tag = document.createElement('span');
      tag.className = 'obs-item-tag ' + priority;
      tag.textContent = priority;
      label.appendChild(tag);
    }
    return label;
  }

  function touch(n) {
    n.updatedAt = new Date().toISOString();
    n.inspector = currentInspectorId;
    saveNotes();
  }

  // ---------- Filter + actions ----------
  ui.filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      ui.filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      streamFilter = btn.dataset.filter;
      renderStream();
    });
  });

  ui.btnReset.addEventListener('click', () => {
    if (confirm('Clear all inspector notes? This cannot be undone.')) {
      notes = { currentInspectorId: currentInspectorId, entries: {} };
      saveNotes();
      selectedInjectId = null;
      render();
    }
  });

  ui.btnExport.addEventListener('click', exportNotes);

  function exportNotes() {
    const state = Engine.getState();
    const lines = [];
    lines.push('CCO CAPSTONE — Inspector notes export');
    lines.push('Generated: ' + new Date().toLocaleString());
    if (currentInspectorId) {
      const cfg = JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}');
      const me = (cfg.inspectors || []).find(i => i.id === currentInspectorId);
      if (me) lines.push('Inspector: ' + me.name + ' · ' + me.role);
    }
    lines.push('');
    lines.push('='.repeat(60));
    const fired = firedInjects();
    fired.forEach(inj => {
      const n = notes.entries[inj.id];
      if (!n) return;
      lines.push('');
      lines.push(`[${inj.id}] ${inj.title || ''}`);
      lines.push(`  Score: ${n.score || 'Ungraded'}${n.flagged ? ' · FLAGGED' : ''}`);
      // v0.2.7: fold the student's self-reported response into the export
      const sr = studentResponseFor(inj.id);
      if (sr && (sr.action || sr.authority || sr.rationale)) {
        lines.push(`  Student response${sr.locked ? ' (submitted)' : ' (draft)'}:`);
        if (sr.action)    lines.push(`    Action: ${sr.action.replace(/\n/g, ' ')}`);
        if (sr.authority) lines.push(`    Authority: ${sr.authority}`);
        if (sr.rationale) lines.push(`    Rationale: ${sr.rationale.replace(/\n/g, ' ')}`);
      }
      const checks = [];
      Object.keys(n.checked || {}).forEach(k => {
        if (!n.checked[k]) return;
        if (k.startsWith('sp-')) {
          const id = k.slice(3);
          const a = (inj.expected_actions || []).find(x => x.id === id);
          checks.push('  ✓ ' + (a ? a.description : k));
        } else {
          const g = GENERIC_OBSERVATIONS.find(x => x.id === k);
          checks.push('  ✓ ' + (g ? g.text : k));
        }
      });
      if (checks.length) lines.push(...checks);
      if (n.comment && n.comment.trim()) {
        lines.push('  Comment:');
        n.comment.split('\n').forEach(l => lines.push('    ' + l));
      }
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inspector-notes-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ---------- Utils ----------
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    })[c]);
  }

  // ---------- Event subscriptions ----------
  document.addEventListener('engine:sync',         render);
  document.addEventListener('engine:inject-fired', render);
  document.addEventListener('engine:tick',         renderHeader);

  // Also repopulate inspector select on sync (roster may have changed on relaunch)
  document.addEventListener('engine:sync', populateInspectorSelect);

  // v0.2.7: watch the student-response key directly so inspector sees new
  // writes from the student window without waiting on engine:sync.
  window.addEventListener('storage', (e) => {
    if (e.key === STUDENT_RESPONSES_KEY && selectedInjectId) {
      renderGrade();
    }
  });

  // ---------- Boot ----------
  populateInspectorSelect();
  initEngine();
})();
