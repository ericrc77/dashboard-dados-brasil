export function animateCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const raw = el.getAttribute('data-value');
    if (!raw) return;
    const isFloat = /[\.,]/.test(raw);
    const end = Number(raw.replace(',', '.'));
    if (isNaN(end)) return;
    const duration = 1.6 + Math.min(1, end / 1_000_000_000); // leve variação
    // Usar objeto intermediário para evitar depender de propriedades do elemento
    const tweenState = { val: 0 };
    window.gsap.to(tweenState, {
      val: end,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = formatNumber(tweenState.val, isFloat);
      },
      onComplete: () => {
        el.textContent = formatNumber(end, isFloat);
      }
    });
  });
}

function formatNumber(num, isFloat) {
  if (num == null || isNaN(num)) return '0';
  const abs = Math.abs(num);
  const format = (n, suf) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + suf;
  if (abs >= 1_000_000_000) return format(num / 1_000_000_000, 'B');
  if (abs >= 1_000_000) return format(num / 1_000_000, 'M');
  if (abs >= 1_000) return format(num / 1_000, 'K');
  return isFloat
    ? Number(num).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : Math.round(num).toLocaleString('pt-BR');
}
