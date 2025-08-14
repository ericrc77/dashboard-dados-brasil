export function setupSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  // Não sobrescreve conteúdo existente (evita perder categorias)
  // Apenas aplica pequenos efeitos aos links .nav-item
  const navItems = sidebar.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const baseTransform = getComputedStyle(item).transform === 'none' ? '' : getComputedStyle(item).transform;
    item.addEventListener('mouseenter', () => {
      item.style.transform = baseTransform + ' translateX(4px)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = baseTransform;
    });
  });
  // Flicker fix: adiciona classe 'ready' após primeira pintura
  requestAnimationFrame(() => sidebar.classList.add('ready'));
}
