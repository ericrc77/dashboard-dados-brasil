import html2canvas from 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm';

export function setupExportImage() {
  const btn = document.querySelector('.export-img-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      const dashboard = document.querySelector('.main-content');
      html2canvas(dashboard, {backgroundColor: null}).then(canvas => {
        const link = document.createElement('a');
        link.download = 'dashboard.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    });
  }
}
