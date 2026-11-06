/* Баннер согласия на cookie. Счётчики и рекламные пиксели подключаются ТОЛЬКО через
   CookieConsent.onAccept(function(){ ... }) - они запустятся после нажатия «Принять». */
(function () {
  var KEY = 'cookie_consent_v1';
  var queue = [];
  var accepted = false;

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function run() { accepted = true; while (queue.length) { try { queue.shift()(); } catch (e) {} } }

  window.CookieConsent = {
    onAccept: function (fn) { if (accepted) { try { fn(); } catch (e) {} } else { queue.push(fn); } },
    reset: function () { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); },
    open: function () { show(); }
  };

  var bar;
  function hide() { if (bar) { bar.remove(); bar = null; } }

  function show() {
    if (bar) return;
    bar = document.createElement('div');
    bar.className = 'cc-bar';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Согласие на использование файлов cookie');
    bar.innerHTML =
      '<div class="cc-text">Мы используем файлы cookie, чтобы сайт работал, а также для аналитики и рекламы. ' +
      'Подробнее - в <a href="cookie.html">Политике использования файлов cookie</a> и ' +
      '<a href="privacy.html">Политике обработки персональных данных</a>. ' +
      'Нажимая «Принять», вы соглашаетесь на использование всех cookie.</div>' +
      '<div class="cc-btns"><button type="button" class="cc-yes">Принять</button>' +
      '<button type="button" class="cc-no">Только необходимые</button></div>';
    document.body.appendChild(bar);
    bar.querySelector('.cc-yes').addEventListener('click', function () { write('all'); hide(); run(); });
    bar.querySelector('.cc-no').addEventListener('click', function () { write('necessary'); hide(); });
  }

  function init() {
    var v = read();
    if (v === 'all') run(); else if (v !== 'necessary') show();
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-cookie-settings]');
      if (t) { e.preventDefault(); try { localStorage.removeItem(KEY); } catch (er) {} show(); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

/* Счётчики: запускаются только после согласия на cookie ("Принять"). */
CookieConsent.onAccept(function () {
  /* Яндекс Метрика */
  (function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
    k = e.createElement(t); a = e.getElementsByTagName(t)[0]; k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=114110225', 'ym');
  window.dataLayer = window.dataLayer || [];
  ym(114110225, 'init', { ssr: true, webvisor: true, trackHash: true, clickmap: true, ecommerce: 'dataLayer', referrer: document.referrer, url: location.href, accurateTrackBounce: true, trackLinks: true });

  /* Top.Mail.Ru (VK) */
  var _tmr = window._tmr || (window._tmr = []);
  _tmr.push({ id: '3812241', type: 'pageView', start: (new Date()).getTime() });
  (function (d, w, id) {
    if (d.getElementById(id)) return;
    var ts = d.createElement('script'); ts.type = 'text/javascript'; ts.async = true; ts.id = id;
    ts.src = 'https://top-fwz1.mail.ru/js/code.js';
    var f = function () { var s = d.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ts, s); };
    if (w.opera == '[object Opera]') { d.addEventListener('DOMContentLoaded', f, false); } else { f(); }
  })(document, window, 'tmr-code');
});
