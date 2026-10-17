'use strict';
const guideMenu = document.getElementById('mobile-nav');
const guideMenuButton = document.getElementById('menu-button');
function closeGuideMenu(restoreFocus = false) {
  guideMenu.hidden = true;
  guideMenuButton.setAttribute('aria-expanded', 'false');
  guideMenuButton.setAttribute('aria-label', 'メニューを開く');
  document.body.classList.remove('menu-open');
  if (restoreFocus) guideMenuButton.focus();
}
guideMenuButton.addEventListener('click', () => {
  const opening = guideMenu.hidden;
  guideMenu.hidden = !opening;
  guideMenuButton.setAttribute('aria-expanded', String(opening));
  guideMenuButton.setAttribute('aria-label', opening ? 'メニューを閉じる' : 'メニューを開く');
  document.body.classList.toggle('menu-open', opening);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !guideMenu.hidden) closeGuideMenu(true);
});
window.matchMedia('(min-width: 821px)').addEventListener('change', event => {
  if (event.matches) closeGuideMenu();
});
guideMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeGuideMenu()));
