/* ==========================================================================
   CCO CAPSTONE — Firebase storage adapter  v0.2.13
   Mirrors localStorage state to Firebase Realtime Database so multiple
   devices can share an exercise session. Loaded dynamically by net-loader.js
   when the URL contains ?net=1.

   Data layout in Firebase:
     /sessions/{CODE}/state      — full exercise state blob (JSON)
     /sessions/{CODE}/outbox     — student outbox append-log (JSON array)
     /sessions/{CODE}/presence/{clientId} — heartbeat per connected client
     /sessions/{CODE}/config     — exercise config (roster, scenario, etc.)

   Sync flow:
     Outbound: engine saveState() → localStorage + netHook → Firebase set()
     Inbound:  Firebase on('value') → Engine.applyRemoteState() →
                 writes localStorage → loadState → dispatch engine:sync
     Loop prevention: applyRemoteState sets _skipNetPush so the inbound
                      write doesn't echo back to Firebase.
   ========================================================================== */

(function () {
  'use strict';

  // Master try-catch: if ANYTHING throws, show it on the badge.
  var _earlyBadge = document.getElementById('cco-net-badge');
  try { _initFirebase(); } catch (err) {
    console.error('[firebase-storage] Init crashed:', err);
    if (_earlyBadge) {
      _earlyBadge.textContent = '✗ NET: ' + (err.message || err);
      _earlyBadge.style.borderColor = 'rgba(217, 85, 42, 0.7)';
      _earlyBadge.style.color = '#D9552A';
      _earlyBadge.style.background = 'rgba(217, 85, 42, 0.15)';
      _earlyBadge.style.opacity = '1';
    }
    return;
  }

  function _initFirebase() {

  // Guard: only run if Firebase SDK + config + Engine are all present.
  // v0.2.14: update the net-loader badge with failure reason if a guard trips.
  var _earlyBadge2 = _earlyBadge; // closure ref
  function _guardFail(msg) {
    console.warn('[firebase-storage] ' + msg);
    if (_earlyBadge) {
      _earlyBadge.textContent = '✗ NET: ' + msg;
      _earlyBadge.style.borderColor = 'rgba(217, 85, 42, 0.7)';
      _earlyBadge.style.color = '#D9552A';
      _earlyBadge.style.background = 'rgba(217, 85, 42, 0.15)';
      _earlyBadge.style.opacity = '1';
    }
  }
  if (!window.firebase || !window.firebase.database) {
    _guardFail('Firebase SDK not loaded');
    return;
  }
  if (!window.CCOFirebaseConfig || window.CCOFirebaseConfig.apiKey === 'PASTE_YOUR_API_KEY') {
    _guardFail('Firebase config not set');
    return;
  }
  if (!window.Engine || !Engine.setNetworkHooks) {
    _guardFail('Engine missing setNetworkHooks');
    return;
  }

  // ---- Initialize Firebase ----
  var app = firebase.initializeApp(window.CCOFirebaseConfig);
  var db  = firebase.database();

  // ---- Session tracking ----
  // The session may not be known yet (e.g., startex.html before the user
  // clicks STARTEX). We install hooks and the badge immediately, and bind
  // Firebase listeners once a real session is available. If the session IS
  // already known (e.g., trainer.html#session=XYZ), we bind right away.
  var _boundSession = null;  // the session code we're actively syncing
  var _listeners = [];       // { ref, event, fn } — for cleanup if rebinding

  function stateRef()            { return db.ref('sessions/' + _boundSession + '/state'); }
  function outboxRef()           { return db.ref('sessions/' + _boundSession + '/outbox'); }
  function presenceRef(cid)      { return db.ref('sessions/' + _boundSession + '/presence/' + cid); }
  function presenceRootRef()     { return db.ref('sessions/' + _boundSession + '/presence'); }
  function configRef()           { return db.ref('sessions/' + _boundSession + '/config'); }

  // ---- Timestamp tracking to ignore own echoes ----
  var _lastWrittenUpdate = 0;

  // ---- Outbound hooks (engine → Firebase) ----
  // Installed immediately so the engine can relay writes the moment a
  // session binds. If _boundSession is null, writes are silently skipped.

  Engine.setNetworkHooks({

    onStateWrite: function (sessionCode, snap) {
      if (!_boundSession) return;
      _lastWrittenUpdate = snap._lastUpdate || Date.now();
      stateRef().set(snap).catch(function (e) {
        console.warn('[firebase-storage] state write failed:', e);
      });
    },

    onOutboxWrite: function (sessionCode, list) {
      if (!_boundSession) return;
      outboxRef().set(list).catch(function (e) {
        console.warn('[firebase-storage] outbox write failed:', e);
      });
    },

    onPresenceWrite: function (sessionCode, clientId, payload) {
      if (!_boundSession) return;
      var ref = presenceRef(clientId);
      ref.set(payload).catch(function (e) {
        console.warn('[firebase-storage] presence write failed:', e);
      });
      ref.onDisconnect().remove().catch(function () {});
    },

    onPresenceStop: function (sessionCode, clientId) {
      if (!_boundSession) return;
      presenceRef(clientId).remove().catch(function () {});
    }

  });

  // ---- Bind Firebase listeners for a session ----
  function bindSession(code) {
    if (!code || code === 'default') return;
    if (code === _boundSession) return; // already bound

    // Tear down previous listeners if re-binding
    unbindListeners();

    _boundSession = code;
    console.log('[firebase-storage] Binding to session: ' + code);
    updateBadge();

    // --- Inbound: state ---
    var stateCb = function (snapshot) {
      var val = snapshot.val();
      if (!val) return;
      if (val._lastUpdate && val._lastUpdate === _lastWrittenUpdate) return;
      Engine.applyRemoteState(val);
    };
    stateRef().on('value', stateCb);
    _listeners.push({ ref: stateRef(), event: 'value', fn: stateCb });

    // --- Inbound: outbox ---
    var outboxCb = function (snapshot) {
      var val = snapshot.val();
      if (!val || !Array.isArray(val) || val.length === 0) return;
      Engine.applyRemoteOutbox(val);
      if (!Engine.getState().readOnly) {
        outboxRef().set([]).catch(function () {});
      }
    };
    outboxRef().on('value', outboxCb);
    _listeners.push({ ref: outboxRef(), event: 'value', fn: outboxCb });

    // --- Inbound: presence ---
    var pAddCb = function (snap) {
      var p = snap.val();
      if (p && p.clientId) Engine.applyRemotePresence(p.clientId, p);
    };
    var pChangeCb = function (snap) {
      var p = snap.val();
      if (p && p.clientId) Engine.applyRemotePresence(p.clientId, p);
    };
    var pRemoveCb = function (snap) {
      var p = snap.val();
      if (p && p.clientId) Engine.removeRemotePresence(p.clientId);
    };
    presenceRootRef().on('child_added',   pAddCb);
    presenceRootRef().on('child_changed', pChangeCb);
    presenceRootRef().on('child_removed', pRemoveCb);
    _listeners.push({ ref: presenceRootRef(), event: 'child_added',   fn: pAddCb });
    _listeners.push({ ref: presenceRootRef(), event: 'child_changed', fn: pChangeCb });
    _listeners.push({ ref: presenceRootRef(), event: 'child_removed', fn: pRemoveCb });

    // --- Inbound: config ---
    var configCb = function (snapshot) {
      var val = snapshot.val();
      if (!val) return;
      try {
        var json = JSON.stringify(val);
        localStorage.setItem('cco-capstone-config', json);
        localStorage.setItem('cco-capstone-config:' + code, json);
      } catch (e) {}
    };
    configRef().on('value', configCb);
    _listeners.push({ ref: configRef(), event: 'value', fn: configCb });

    // --- Initial state sync ---
    stateRef().once('value').then(function (snapshot) {
      var val = snapshot.val();
      if (val && val._lastUpdate) {
        var localRaw = Engine.getRawStateString ? Engine.getRawStateString() : null;
        var localUpdate = 0;
        if (localRaw) {
          try { localUpdate = JSON.parse(localRaw)._lastUpdate || 0; } catch (e) {}
        }
        if (val._lastUpdate > localUpdate) {
          console.log('[firebase-storage] Remote state is newer — applying.');
          Engine.applyRemoteState(val);
        }
      }
    });

    // --- Seed config to Firebase ---
    var localConfig = null;
    try {
      var raw = localStorage.getItem('cco-capstone-config:' + code) ||
                localStorage.getItem('cco-capstone-config');
      if (raw) localConfig = JSON.parse(raw);
    } catch (e) {}
    if (localConfig) {
      configRef().set(localConfig).catch(function (e) {
        console.warn('[firebase-storage] config seed failed:', e);
      });
    }
  }

  function unbindListeners() {
    _listeners.forEach(function (l) {
      try { l.ref.off(l.event, l.fn); } catch (e) {}
    });
    _listeners = [];
  }

  // ---- Visual indicator ----
  // Reuse the badge net-loader.js already created, or make a new one.
  var badge = document.getElementById('cco-net-badge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'cco-net-badge';
    badge.style.cssText = [
      'position:fixed', 'bottom:8px', 'right:8px', 'z-index:99999',
      'background:rgba(79,195,215,0.18)', 'border:1px solid rgba(79,195,215,0.5)',
      'color:#4FC3D7', 'font-size:10px', 'font-family:monospace',
      'padding:3px 8px', 'border-radius:4px', 'letter-spacing:1px',
      'pointer-events:none'
    ].join(';');
    document.body.appendChild(badge);
  }

  function updateBadge() {
    if (_boundSession) {
      badge.textContent = '● NET';
      badge.title = 'Firebase relay active — session ' + _boundSession;
      badge.style.opacity = '1';
    } else {
      badge.textContent = '● NET (standby)';
      badge.title = 'Firebase loaded — waiting for session';
      badge.style.opacity = '0.5';
    }
  }
  updateBadge();

  // ---- Auto-bind if session is already known ----
  var currentSession = Engine.getSession();
  if (currentSession && currentSession !== 'default') {
    bindSession(currentSession);
  }

  // ---- Watch for session changes ----
  // When startex.html creates a new session via Engine.setSession(), or
  // when the user clicks a launch link and opens trainer.html, the
  // session code becomes available. We poll Engine.getSession() briefly
  // to catch the transition. Also listen for engine:prelaunch which fires
  // after startex creates the session.
  if (!_boundSession) {
    var pollCount = 0;
    var pollTimer = setInterval(function () {
      pollCount++;
      var s = Engine.getSession();
      if (s && s !== 'default' && s !== _boundSession) {
        bindSession(s);
        clearInterval(pollTimer);
      }
      // Stop polling after 5 minutes — if no session by then, give up.
      if (pollCount > 300) clearInterval(pollTimer);
    }, 1000);

    // Also catch the prelaunch event (fired by startex after session is set)
    document.addEventListener('engine:prelaunch', function () {
      var s = Engine.getSession();
      if (s && s !== 'default' && s !== _boundSession) {
        bindSession(s);
        clearInterval(pollTimer);
      }
    });
  }

  // ---- Expose bindSession globally so startex can trigger it ----
  window.CCOFirebaseBind = bindSession;

  console.log('[firebase-storage] Adapter loaded. Hooks installed.' +
    (_boundSession ? ' Bound to ' + _boundSession + '.' : ' Waiting for session.'));

  } // end _initFirebase
})();
