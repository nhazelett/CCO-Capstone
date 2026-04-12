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

  // Guard: only run if Firebase SDK + config + Engine are all present.
  if (!window.firebase || !window.firebase.database) {
    console.warn('[firebase-storage] Firebase SDK not loaded — skipping.');
    return;
  }
  if (!window.CCOFirebaseConfig || window.CCOFirebaseConfig.apiKey === 'PASTE_YOUR_API_KEY') {
    console.warn('[firebase-storage] Firebase config not set — skipping. Edit js/firebase-config.js.');
    return;
  }
  if (!window.Engine || !Engine.setNetworkHooks) {
    console.warn('[firebase-storage] Engine not loaded or missing v0.2.13 hooks — skipping.');
    return;
  }

  // ---- Initialize Firebase ----
  const app = firebase.initializeApp(window.CCOFirebaseConfig);
  const db  = firebase.database();

  const session = Engine.getSession();
  if (!session || session === 'default') {
    console.warn('[firebase-storage] No session code set — network relay inactive. Open via a session link or set a session first.');
    return;
  }

  console.log(`[firebase-storage] Connected to Firebase. Session: ${session}`);

  // ---- Ref helpers ----
  function stateRef()                { return db.ref(`sessions/${session}/state`); }
  function outboxRef()               { return db.ref(`sessions/${session}/outbox`); }
  function presenceRef(clientId)     { return db.ref(`sessions/${session}/presence/${clientId}`); }
  function presenceRootRef()         { return db.ref(`sessions/${session}/presence`); }
  function configRef()               { return db.ref(`sessions/${session}/config`); }

  // ---- Timestamp tracking to ignore own echoes ----
  // Firebase on('value') fires for local writes too. We track the last
  // _lastUpdate timestamp we wrote so we can skip the inbound callback when
  // it's just our own echo.
  let _lastWrittenUpdate = 0;

  // ---- Outbound hooks (engine → Firebase) ----

  Engine.setNetworkHooks({

    onStateWrite: function (sessionCode, snap) {
      _lastWrittenUpdate = snap._lastUpdate || Date.now();
      stateRef().set(snap).catch(function (e) {
        console.warn('[firebase-storage] state write failed:', e);
      });
    },

    onOutboxWrite: function (sessionCode, list) {
      outboxRef().set(list).catch(function (e) {
        console.warn('[firebase-storage] outbox write failed:', e);
      });
    },

    onPresenceWrite: function (sessionCode, clientId, payload) {
      var ref = presenceRef(clientId);
      ref.set(payload).catch(function (e) {
        console.warn('[firebase-storage] presence write failed:', e);
      });
      // Register onDisconnect cleanup so Firebase removes this entry when
      // the client's connection drops — no heartbeat polling needed.
      ref.onDisconnect().remove().catch(function () {});
    },

    onPresenceStop: function (sessionCode, clientId) {
      presenceRef(clientId).remove().catch(function () {});
    }

  });

  // ---- Inbound listeners (Firebase → engine) ----

  // State: when another device writes state, apply it locally.
  stateRef().on('value', function (snapshot) {
    var val = snapshot.val();
    if (!val) return;
    // Skip if this is an echo of our own write.
    if (val._lastUpdate && val._lastUpdate === _lastWrittenUpdate) return;
    // Apply to engine (writes localStorage, loads state, dispatches sync).
    Engine.applyRemoteState(val);
  });

  // Outbox: when a student on another device writes outbox entries, the
  // trainer's engine should drain them.
  outboxRef().on('value', function (snapshot) {
    var val = snapshot.val();
    if (!val || !Array.isArray(val) || val.length === 0) return;
    Engine.applyRemoteOutbox(val);
    // Clear the Firebase outbox after draining (trainer is the consumer).
    // Only do this if the engine isn't read-only (i.e., this window is the trainer).
    if (!Engine.getState().readOnly) {
      outboxRef().set([]).catch(function () {});
    }
  });

  // Presence: mirror all remote presence entries to localStorage so
  // Engine.listPresence() works unchanged (it scans localStorage keys).
  // Also handle disconnects — when a child is removed, clean up the
  // corresponding localStorage key.
  presenceRootRef().on('child_added', function (snap) {
    var payload = snap.val();
    if (!payload || !payload.clientId) return;
    Engine.applyRemotePresence(payload.clientId, payload);
  });
  presenceRootRef().on('child_changed', function (snap) {
    var payload = snap.val();
    if (!payload || !payload.clientId) return;
    Engine.applyRemotePresence(payload.clientId, payload);
  });
  presenceRootRef().on('child_removed', function (snap) {
    var payload = snap.val();
    if (!payload || !payload.clientId) return;
    Engine.removeRemotePresence(payload.clientId);
  });

  // ---- Initial state sync ----
  // If this is a new window joining an existing session, load the current
  // state from Firebase (which may be newer than anything in localStorage).
  stateRef().once('value').then(function (snapshot) {
    var val = snapshot.val();
    if (val && val._lastUpdate) {
      // Compare with local state — take whichever is newer.
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

  // ---- Seed config to Firebase ----
  // The trainer writes config to localStorage during launch. Mirror it to
  // Firebase so remote windows can read it.
  var localConfig = null;
  try {
    var configKey = 'cco-capstone-config:' + session;
    var raw = localStorage.getItem(configKey) || localStorage.getItem('cco-capstone-config');
    if (raw) localConfig = JSON.parse(raw);
  } catch (e) {}
  if (localConfig) {
    configRef().set(localConfig).catch(function (e) {
      console.warn('[firebase-storage] config seed failed:', e);
    });
  }

  // Also listen for config from Firebase (remote window might have written it).
  configRef().on('value', function (snapshot) {
    var val = snapshot.val();
    if (!val) return;
    // Write to both legacy and session-scoped localStorage keys so all
    // view JS files can find the config regardless of which key they check.
    try {
      var json = JSON.stringify(val);
      localStorage.setItem('cco-capstone-config', json);
      localStorage.setItem('cco-capstone-config:' + session, json);
    } catch (e) {}
  });

  // ---- Visual indicator ----
  // Add a small "NETWORKED" badge to the page so the user knows Firebase is
  // active. This helps distinguish online-mode testing from local-mode.
  var badge = document.createElement('div');
  badge.textContent = '● NET';
  badge.title = 'Firebase relay active — session ' + session;
  badge.style.cssText = [
    'position:fixed', 'bottom:8px', 'right:8px', 'z-index:99999',
    'background:rgba(79,195,215,0.18)', 'border:1px solid rgba(79,195,215,0.5)',
    'color:#4FC3D7', 'font-size:10px', 'font-family:monospace',
    'padding:3px 8px', 'border-radius:4px', 'letter-spacing:1px',
    'pointer-events:none'
  ].join(';');
  document.body.appendChild(badge);

  console.log('[firebase-storage] Adapter active. Hooks installed. Listeners bound.');

})();
