import { setupSidebar } from './modules/sidebar.js';

function setupTickerContinuous() {
  const track = document.querySelector('.ticker-track');
  if (!track || track.dataset.cloned) return;
  track.innerHTML = track.innerHTML + track.innerHTML; // duplica para loop suave
  track.dataset.cloned = '1';
  // Atualização dinâmica de valores simulados
  const items = () => track.querySelectorAll('.ticker-item');
  setInterval(() => {
    items().forEach(span => {
      const txt = span.textContent;
      const match = txt.match(/([+-]?)(\d+\.\d+)%/);
      if (match) {
        const sinal = match[1] || '+';
        let val = parseFloat(match[2]);
        // pequena variação
        const delta = (Math.random() * 0.3);
        val = Math.max(0, (val + (Math.random() > 0.5 ? delta : -delta)));
        const novoSinal = val === 0 ? '' : (Math.random() > 0.48 ? '-' : '+');
        span.textContent = txt.replace(/([+-]?)(\d+\.\d+)%/, `${novoSinal}${val.toFixed(2)}%`);
        span.classList.toggle('up', !novoSinal.startsWith('-'));
        span.classList.toggle('down', novoSinal.startsWith('-'));
      }
    });
  }, 4000);
}

document.addEventListener('DOMContentLoaded', () => {
  setupSidebar();
  setupTickerContinuous();
});
