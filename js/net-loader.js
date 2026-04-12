/* ==========================================================================
   CCO CAPSTONE — Network mode loader  v0.2.14
   Checks if the URL contains ?net=1 (or &net=1). If yes, dynamically loads
   the Firebase SDK + config + storage adapter. If no, does nothing — the
   prototype runs in local-only mode exactly as before.

   Include this script tag on every HTML page AFTER engine.js:
     <script src="js/net-loader.js"></script>
   ========================================================================== */

(function () {
  'use strict';

  // Check for net=1 in query string OR hash (hash is easier to pass around
  // when the session code is already in the hash).
  var search = location.search || '';
  var hash   = location.hash   || '';
  var netOn  = /[?&]net=1/.test(search) || /[&?]net=1/.test(hash);

  if (!netOn) return; // Local mode — do nothing.

  console.log('[net-loader] Network mode requested. Loading Firebase...');

  // -- Immediate visual badge so we know net-loader ran --
  var badge = document.createElement('div');
  badge.id = 'cco-net-badge';
  badge.style.cssText = [
    'position:fixed', 'bottom:8px', 'right:8px', 'z-index:99999',
    'background:rgba(79,195,215,0.18)', 'border:1px solid rgba(79,195,215,0.5)',
    'color:#4FC3D7', 'font-size:10px', 'font-family:monospace',
    'padding:3px 8px', 'border-radius:4px', 'letter-spacing:1px',
    'pointer-events:none', 'opacity:0.5'
  ].join(';');
  badge.textContent = '● NET loading…';
  badge.title = 'net-loader detected ?net=1 — loading Firebase SDK';
  document.body.appendChild(badge);

  // Firebase compat SDK v10 (compat = works with firebase.database() etc.)
  var FIREBASE_VERSION = '10.12.2';
  var CDN = 'https://www.gstatic.com/firebasejs/' + FIREBASE_VERSION;

  var scripts = [
    { src: CDN + '/firebase-app-compat.js',      label: 'firebase-app' },
    { src: CDN + '/firebase-database-compat.js',  label: 'firebase-db' },
    { src: 'js/firebase-config.js',               label: 'firebase-config' },
    { src: 'js/firebase-storage.js',              label: 'firebase-storage' }
  ];

  // Load scripts sequentially (each depends on the previous one).
  function loadNext(i) {
    if (i >= scripts.length) {
      console.log('[net-loader] All Firebase scripts loaded.');
      // firebase-storage.js handles badge from here — update or remove ours
      // only if firebase-storage.js didn't create its own (it replaces ours).
      return;
    }
    badge.textContent = '● NET ' + scripts[i].label + '…';
    var s = document.createElement('script');
    s.src = scripts[i].src;
    s.onload = function () {
      console.log('[net-loader] Loaded: ' + scripts[i].label);
      loadNext(i + 1);
    };
    s.onerror = function () {
      console.error('[net-loader] FAILED to load: ' + scripts[i].src);
      badge.textContent = '✗ NET fail: ' + scripts[i].label;
      badge.style.borderColor = 'rgba(217, 85, 42, 0.7)';
      badge.style.color = '#D9552A';
      badge.style.background = 'rgba(217, 85, 42, 0.15)';
      badge.style.opacity = '1';
      // Stop the chain — can't proceed without dependencies.
    };
    document.head.appendChild(s);
  }

  // Wait for Engine to be defined (it's in engine.js which loads before us).
  if (window.Engine) {
    loadNext(0);
  } else {
    var tries = 0;
    var poll = setInterval(function () {
      tries++;
      if (window.Engine || tries > 50) {
        clearInterval(poll);
        if (!window.Engine) {
          console.error('[net-loader] Engine never appeared after 2.5s — loading anyway.');
        }
        loadNext(0);
      }
    }, 50);
  }
})();
