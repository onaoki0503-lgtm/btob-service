'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const views = [...document.querySelectorAll('.page-view')];
  const menu = document.querySelector('#mobile-nav');
  const menuButton = document.querySelector('#menu-button');
  const video = document.querySelector('#hero-video');
  const videoToggle = document.querySelector('#video-toggle');
  const videoLabel = document.querySelector('#video-label');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeView = 'top';
  let motionWanted = !reducedMotion.matches && !navigator.connection?.saveData;
  let inViewport = true;
  function closeMenu(restoreFocus = false) {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'メニューを開く');
    document.body.classList.remove('menu-open');
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const opening = menu.hidden;
    menu.hidden = !opening;
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'メニューを閉じる' : 'メニューを開く');
    document.body.classList.toggle('menu-open', opening);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) closeMenu(true);
  });
  window.matchMedia('(min-width: 821px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
  function videoButtonText() {
    const playing = !video.paused;
    videoToggle.disabled = false;
    videoToggle.setAttribute('aria-label', playing ? '映像を一時停止' : '映像を再生');
    videoToggle.firstElementChild.textContent = playing ? 'Ⅱ' : '▶';
    videoLabel.textContent = playing ? '一時停止' : '再生';
  }
  function syncVideo() {
    if (motionWanted && activeView === 'top' && inViewport && !document.hidden) {
      if (!video.getAttribute('src')) { video.src = video.dataset.src; video.load(); }
      video.muted = true;
      video.play().catch(() => videoButtonText());
    } else {
      video.pause();
      videoButtonText();
    }
  }
  video.addEventListener('playing', videoButtonText);
  video.addEventListener('pause', videoButtonText);
  video.addEventListener('error', () => {
    videoLabel.textContent = '静止画で表示';
    videoToggle.disabled = true;
    videoToggle.setAttribute('aria-label', '映像を読み込めないため静止画で表示しています');
  });
  videoToggle.addEventListener('click', () => {
    motionWanted = video.paused;
    syncVideo();
  });
  reducedMotion.addEventListener('change', e => { motionWanted = !e.matches && !navigator.connection?.saveData; syncVideo(); });
  document.addEventListener('visibilitychange', syncVideo);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { inViewport = entries[0].isIntersecting; syncVideo(); }, {threshold: .05}).observe(video);
  }
  // The text scrolls normally; only its corresponding visual stays in view.
  const showcases = [...document.querySelectorAll('[data-showcase]')];
  function syncBusinessScenes() {
    showcases.forEach(root => {
      if (root.closest('.page-view')?.hidden) return;
      const stories = [...root.querySelectorAll('.showcase-story')];
      const anchor = Math.min(window.innerHeight * .5, 460);
      let current = stories[0];
      stories.forEach(story => { if (story.getBoundingClientRect().top <= anchor) current = story; });
      if (!current) return;
      root.querySelectorAll('[data-image]').forEach(scene => scene.classList.toggle('is-current', scene.dataset.image === current.dataset.scene));
      root.querySelectorAll('[data-progress]').forEach(item => item.classList.toggle('is-current', item.dataset.progress === current.dataset.scene));
    });
  }
  let sceneFrame = false;
  function scheduleSceneSync() {
    if (sceneFrame) return;
    sceneFrame = true;
    requestAnimationFrame(() => { sceneFrame = false; syncBusinessScenes(); });
  }
  window.addEventListener('scroll', scheduleSceneSync, {passive:true});
  window.addEventListener('resize', scheduleSceneSync);
  function businessTarget(sub) {
    const key = (sub || '').replace(/^biz-/,'');
    const aliases = {team:'service-note',accounting:'service-accounting',print:'service-print'};
    const target = document.getElementById(aliases[key] || `biz-${key}`);
    return target?.closest('.showcase-story') || target;
  }
  function route(moveFocus = false) {
    let hash = location.hash.slice(1);
    try { hash = decodeURIComponent(hash); } catch { hash = ''; }
    if (hash === 'home-news' || hash === 'main') return;
    let [view, sub] = hash.split('#');
    view = (view || 'view-top').replace(/^view-/, '');
    if (view.startsWith('biz-')) { sub = view; view = 'services'; }
    const aliases = {'about-philosophy':'about','about-message':'about','about-profile':'about','news-press':'news','news-info':'news','careers-culture':'careers','careers-jobs':'careers'};
    if (aliases[view]) { sub = view; view = aliases[view]; }
    if (!views.some(v => v.id === `view-${view}`)) view = 'top';
    activeView = view;
    views.forEach(v => { const selected = v.id === `view-${view}`; v.classList.toggle('active', selected); v.hidden = !selected; });
    document.querySelectorAll('.nav-link').forEach(a => {
      if (a.dataset.view === view) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
    if (view === 'contact' && sub?.startsWith('for-')) {
      const categories = {community:'コミュニティ運営ソフトについて',team:'チームノートについて',accounting:'チーム会計について',print:'Tシャツプリントについて',ai:'AIドリブン経営導入支援事業',pudding:'78°ぷりん事業'};
      const category = categories[sub.slice(4)];
      if (category) document.querySelector('#contact-category').value = category;
      if (sub === 'for-print') {
        const message = document.querySelector('#contact-message');
        const subject = document.querySelector('#contact-subject');
        if (!message.value.trim()) message.value = '用途・つくりたいイメージ：\n枚数：\nサイズの内訳：\n印刷する場所：\n希望日：\nご予算（未定でも可）：\nその他のご希望：';
        if (!subject.value.trim()) subject.value = 'Tシャツプリントの相談';
      }
    }
    document.querySelector('#contact-band').hidden = view === 'contact' || view === 'privacy';
    closeMenu();
    const names = {top:'',about:'会社概要',services:'事業内容',news:'お知らせ',careers:'採用情報',contact:'お問い合わせ',privacy:'プライバシーポリシー'};
    document.title = names[view] ? `${names[view]} | 摂取資源株式会社` : '摂取資源株式会社 | Intaking Resources Inc.';
    if (moveFocus) {
      const heading = (view === 'services' && sub ? businessTarget(sub)?.querySelector('h2,h3') : null) || document.querySelector(`#view-${view} h1`);
      heading?.setAttribute('tabindex','-1'); heading?.focus({preventScroll:true});
    }
    if (view === 'services' && sub && businessTarget(sub)) requestAnimationFrame(() => { businessTarget(sub).scrollIntoView({block:'start',behavior:'instant'}); syncBusinessScenes(); });
    else if (view === 'about' && sub === 'about-profile') document.querySelector('#about-profile').scrollIntoView();
    else window.scrollTo({top:0,behavior:'instant'});
    if (view === 'news' && sub === 'news-press') filterNews('press');
    else if (view === 'news') filterNews('all');
    syncVideo();
    scheduleSceneSync();
  }
  document.querySelectorAll('a[data-view]').forEach(link => {
    link.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      history.pushState(null, '', link.getAttribute('href'));
      route(true);
    });
  });
  function filterNews(type) {
    document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === type)));
    document.querySelectorAll('[data-news-type]').forEach(item => { item.hidden = type !== 'all' && item.dataset.newsType !== type; });
    document.querySelector('#news-empty').hidden = type !== 'press';
  }
  document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => filterNews(b.dataset.filter)));
  // Contact delivery: the public endpoint identifier hides the recipient address.
  const contactForm = document.querySelector('#contact-form');
  const submitButton = document.querySelector('#contact-submit');
  const contactStatus = document.querySelector('#contact-status');
  const successPanel = document.querySelector('#contact-success');
  let submitting = false;
  function contactError(message) {
    contactStatus.hidden = false;
    contactStatus.textContent = message;
    contactStatus.classList.add('is-error');
  }
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    if (submitting || !contactForm.reportValidity()) return;
    const values = Object.fromEntries(new FormData(contactForm).entries());
    for (const key of ['name','email','subject','message']) {
      if (!String(values[key] || '').trim()) {
        contactError('必須項目に内容を入力してください。');
        return;
      }
    }
    if (values._honey) { contactError('入力内容を確認してください。'); return; }
    submitting = true;
    submitButton.disabled = true;
    submitButton.textContent = '送信中…';
    contactStatus.hidden = false;
    contactStatus.classList.remove('is-error');
    contactStatus.textContent = '送信しています。しばらくお待ちください。';
    const reference = 'IR-' + crypto.randomUUID().slice(0,8).toUpperCase();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch('https://formsubmit.co/ajax/bb38c7edfd2f666e99dc5fc3deac4e98', {
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        signal: controller.signal,
        body: JSON.stringify({
          name: String(values.name).trim(),
          email: String(values.email).trim(),
          '会社・団体名': String(values.organization || '').trim(),
          '宛先': '摂取資源株式会社 岡本直樹',
          'ご相談項目': values.category,
          '件名': String(values.subject).trim(),
          message: String(values.message).trim(),
          '受付番号': reference,
          '個人情報の取り扱い': values.consent,
          _subject: '【摂取資源株式会社】' + String(values.subject).trim(),
          _template: 'table',
          _honey: values._honey || ''
        })
      });
      const result = await response.json();
      if (!response.ok || !(result.success === true || result.success === 'true')) {
        throw new Error('Delivery was not accepted');
      }
      contactForm.hidden = true;
      successPanel.hidden = false;
      document.querySelector('#contact-reference').textContent = '受付番号：' + reference;
      contactForm.reset();
      successPanel.focus({preventScroll:true});
      successPanel.scrollIntoView({behavior: reducedMotion.matches ? 'instant' : 'smooth',block:'center'});
    } catch (error) {
      contactError(error.name === 'AbortError'
        ? '送信結果を確認できませんでした。入力内容は残っています。時間をおいて再度お試しください。'
        : '送信できませんでした。入力内容は残っています。通信環境を確認して、再度お試しください。');
    } finally {
      clearTimeout(timeout);
      submitting = false;
      submitButton.disabled = false;
      submitButton.innerHTML = '送信する <span aria-hidden="true">→</span>';
    }
  });
  document.querySelector('#contact-again').addEventListener('click', () => {
    contactForm.hidden = false;
    successPanel.hidden = true;
    contactStatus.hidden = true;
    document.querySelector('#contact-name').focus();
  });
  window.addEventListener('hashchange', () => route(true));
  route();
});
