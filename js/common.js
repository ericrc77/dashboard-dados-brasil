import { setupSidebar } from './modules/sidebar.js';

function setupTickerContinuous() {
  const track = document.querySelector('.ticker-track');
  if (!track || track.dataset.cloned) return;
  // Duplica conteúdo apenas uma vez para loop
  track.innerHTML += track.innerHTML;
  track.dataset.cloned = '1';
  const spans = Array.from(track.querySelectorAll('.ticker-item'));
  let lastUpdate = performance.now();
  const intervalMs = 4000;
  function update(now){
    if (now - lastUpdate >= intervalMs) {
      for (const span of spans) {
        const txt = span.textContent;
        const match = /([+-]?)(\d+\.\d+)%/.exec(txt);
        if (!match) continue;
        let val = parseFloat(match[2]);
        const delta = (Math.random()*0.28);
        val = Math.max(0, val + (Math.random()>0.5? delta : -delta));
        const negativo = Math.random() > 0.52;
        const sinal = negativo? '-' : '+';
        span.textContent = txt.replace(/([+-]?)(\d+\.\d+)%/, `${sinal}${val.toFixed(2)}%`);
        span.classList.toggle('ticker-up', !negativo);
        span.classList.toggle('ticker-down', negativo);
      }
      lastUpdate = now;
    }
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', () => {
  setupSidebar();
  setupTickerContinuous();
});
