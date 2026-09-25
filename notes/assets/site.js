/* ============================================================================
   site.js —— 语言切换 / 筛选搜索 / 阅读进度 / 目录高亮 / 图放大 / 复制引用
   无依赖、无构建，直接放 GitHub Pages 即可。
   ========================================================================== */
(function () {
  var html = document.documentElement;

  /* ---------- 语言：默认中文，选择记在 localStorage，页面间保持一致 ---------- */
  var KEY = 'notes-lang';
  function setLang(v) {
    html.setAttribute('data-lang', v);
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-selected', b.dataset.v === v ? 'true' : 'false');
    });
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }
  var saved = 'zh';
  try { saved = localStorage.getItem(KEY) || 'zh'; } catch (e) {}
  setLang(saved);
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.v); });
  });

  /* ---------- 顶部导航吸顶阴影 + 阅读进度 ---------- */
  var top = document.querySelector('.ntop');
  var prog = document.getElementById('prog');
  function onScroll() {
    var y = window.scrollY || 0;
    if (top) top.classList.toggle('stuck', y > 6);
    if (prog) {
      var max = document.body.scrollHeight - window.innerHeight;
      prog.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 目录页：标签筛选 + 关键词搜索 ---------- */
  var chips = document.querySelectorAll('.chip[data-tag]');
  var cards = document.querySelectorAll('[data-card]');
  var input = document.querySelector('.search input');
  var empty = document.querySelector('.noresult');
  var tag = 'all';
  function apply() {
    var q = (input && input.value || '').trim().toLowerCase();
    var shown = 0;
    cards.forEach(function (c) {
      var tags = (c.dataset.tags || '').split(/\s+/);
      var okTag = tag === 'all' || tags.indexOf(tag) > -1;
      var okQ = !q || (c.dataset.text || '').toLowerCase().indexOf(q) > -1;
      var show = okTag && okQ;
      c.style.display = show ? '' : 'none';
      if (show) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      tag = c.dataset.tag;
      chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
      apply();
    });
  });
  if (input) input.addEventListener('input', apply);
  if (chips.length) apply();

  /* ---------- 文章页：右侧目录高亮 ---------- */
  var tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var heads = Array.prototype.filter.call(document.querySelectorAll('.prose h2[id], .prose h2[id]'), Boolean);
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        tocLinks.forEach(function (a) { a.classList.remove('on'); });
        var a = map[e.target.id];
        if (a) a.classList.add('on');
      });
    }, { rootMargin: '-84px 0px -70% 0px', threshold: 0 });
    heads.forEach(function (h) { io.observe(h); });
  }

  /* ---------- 图放大 ---------- */
  var zoom = document.createElement('div');
  zoom.className = 'zoom';
  var zimg = document.createElement('img');
  zoom.appendChild(zimg);
  document.body.appendChild(zoom);
  document.querySelectorAll('figure img').forEach(function (img) {
    img.addEventListener('click', function () {
      zimg.src = img.src;
      zimg.alt = img.alt || '';
      zoom.classList.add('on');
    });
  });
  zoom.addEventListener('click', function () { zoom.classList.remove('on'); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') zoom.classList.remove('on');
  });

  /* ---------- 复制引用 ---------- */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var el = document.querySelector(btn.dataset.copy);
      if (!el) return;
      var text = el.innerText.trim();
      var done = function () {
        var old = btn.textContent;
        btn.textContent = btn.dataset.doneLabel || 'Copied ✓';
        setTimeout(function () { btn.textContent = old; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else if (window.getSelection) {
        var r = document.createRange();
        r.selectNode(el);
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
        try { document.execCommand('copy'); } catch (e) {}
        done();
      }
    });
  });
})();
