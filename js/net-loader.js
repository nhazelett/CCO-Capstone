/* ==========================================================================
   CCO CAPSTONE — Network mode loader  v0.2.13
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
  var netOn  = /[?&]net=1/.test(search) || /[&]net=1/.test(hash) || /[?]net=1/.test(hash);

  if (!netOn) return; // Local mode — do nothing.

  console.log('[net-loader] Network mode requested. Loading Firebase...');

  // Firebase compat SDK v10 (compat = works with firebase.database() etc.)
  var FIREBASE_VERSION = '10.12.2';
  var CDN = 'https://www.gstatic.com/firebasejs/' + FIREBASE_VERSION;

  var scripts = [
    CDN + '/firebase-app-compat.js',
    CDN + '/firebase-database-compat.js',
    'js/firebase-config.js',
    'js/firebase-storage.js'
  ];

  // Load scripts sequentially (each depends on the previous one).
  function loadNext(i) {
    if (i >= scripts.length) {
      console.log('[net-loader] All Firebase scripts loaded.');
      return;
    }
    var s = document.createElement('script');
    s.src = scripts[i];
    s.onload = function () { loadNext(i + 1); };
    s.onerror = function () {
      console.error('[net-loader] Failed to load: ' + scripts[i]);
      // Don't block the page — just log and stop loading the chain.
    };
    document.head.appendChild(s);
  }

  // Wait for Engine to be defined (it's in engine.js which loads before us).
  // In most cases it's already available; this is a safety net.
  if (window.Engine) {
    loadNext(0);
  } else {
    // Fallback: poll briefly in case engine.js is still evaluating.
    var tries = 0;
    var poll = setInterval(function () {
      tries++;
      if (window.Engine || tries > 50) {
        clearInterval(poll);
        loadNext(0);
      }
    }, 50);
  }
})();
