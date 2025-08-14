// Oculta o header ao rolar para baixo e mostra ao rolar para cima (mobile)
let lastScrollY = window.scrollY;
let ticking = false;
function onScroll() {
  if (window.innerWidth > 700) return;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 40) {
        document.body.classList.add('hide-header');
      } else {
        document.body.classList.remove('hide-header');
      }
      lastScrollY = currentY;
      ticking = false;
    });
    ticking = true;
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
