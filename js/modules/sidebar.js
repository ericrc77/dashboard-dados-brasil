export function setupSidebar() {
  // Exemplo de animação de ícone SVG
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.innerHTML = `
      <button class="sidebar-btn" aria-label="Dashboard">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="4" width="24" height="24" rx="8" fill="url(#grad1)"/>
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stop-color="#6a82fb"/>
              <stop offset="1" stop-color="#fc5c7d"/>
            </linearGradient>
          </defs>
        </svg>
      </button>
    `;
    // Animação simples de hover
    sidebar.querySelectorAll('.sidebar-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.1)');
      btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');
    });
  }
}
