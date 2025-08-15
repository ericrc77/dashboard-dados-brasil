// Gerencia exibição e interação do menu mobile
export function setupMobileMenu() {
  const btn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;

  function applyVisibility() {
    if (window.innerWidth <= 640) {
      btn.style.display = 'flex';
      menu.style.display = 'flex';
    } else {
      btn.style.display = 'none';
      menu.style.display = 'none';
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  }

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('resize', applyVisibility);
  applyVisibility();
}
