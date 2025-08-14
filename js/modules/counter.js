

export function animateCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const end = parseInt(el.textContent, 10) || 1000;
    window.gsap.fromTo(el, { innerText: 0 }, {
      innerText: end,
      duration: 2,
      ease: 'power1.out',
      snap: { innerText: 1 },
      onUpdate: function() {
        el.textContent = Math.floor(el.innerText);
      }
    });
  });
}
