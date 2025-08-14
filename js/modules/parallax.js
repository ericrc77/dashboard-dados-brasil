export function setupParallax() {
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
      header.style.boxShadow = window.scrollY > 10 ? '0 4px 32px 0 rgba(106,130,251,0.25)' : '0 2px 16px 0 rgba(108,99,255,0.2)';
    }
    document.querySelectorAll('.card').forEach(card => {
      card.style.transform = `translateY(${window.scrollY * 0.05}px)`;
    });
  });
}
