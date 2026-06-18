(function () {
  'use strict';

  function getPagina() {
    var path = window.location.pathname;
    var page = path.substring(path.lastIndexOf('/') + 1);
    return page || 'index.html';
  }

  function track(eventName, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params || {});
  }

  function initClickTracking() {
    document.addEventListener('click', function (e) {
      // Bottoni/link con data-ga-event dedicato (CTA, menu mobile, Partiamo!)
      var tagged = e.target.closest('[data-ga-event]');
      if (tagged) {
        var eventName = tagged.getAttribute('data-ga-event');
        var params = { pagina: getPagina() };
        var voce = tagged.getAttribute('data-ga-voce');
        if (voce) params.voce = voce;
        if (eventName === 'click_partiamo_typeform') {
          // Garantisce l'invio dell'evento via Beacon API prima che il browser
          // navighi verso il Typeform esterno.
          params.transport_type = 'beacon';
        }
        track(eventName, params);
        return;
      }

      // Icone social del footer (Instagram, Facebook, TikTok, YouTube, WhatsApp)
      var social = e.target.closest('.social-icon-btn');
      if (social) {
        var label = (social.getAttribute('aria-label') || '').toLowerCase();
        track('click_social', { piattaforma: label, pagina: getPagina() });
        return;
      }

      // Bottone WhatsApp "Hai bisogno di aiuto?" nel menu mobile
      var waMenu = e.target.closest('.mobile-whatsapp');
      if (waMenu) {
        track('click_whatsapp_menu', { pagina: getPagina() });
      }
    });
  }

  function initVideoTracking() {
    var video = document.getElementById('ctaVideo');
    if (!video) return;

    var pagina = getPagina();
    var milestones = { 25: false, 50: false, 75: false };
    var completed = false;

    video.addEventListener('play', function () {
      track('video_play', { pagina: pagina });
    });

    video.addEventListener('pause', function () {
      if (!video.ended) {
        track('video_pause', { pagina: pagina });
      }
    });

    video.addEventListener('timeupdate', function () {
      if (!video.duration) return;
      var pct = (video.currentTime / video.duration) * 100;
      [25, 50, 75].forEach(function (m) {
        if (pct >= m && !milestones[m]) {
          milestones[m] = true;
          track('video_progress_' + m, { pagina: pagina });
        }
      });
    });

    video.addEventListener('ended', function () {
      if (!completed) {
        completed = true;
        track('video_complete', { pagina: pagina });
      }
    });
  }

  function init() {
    initClickTracking();
    initVideoTracking();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
