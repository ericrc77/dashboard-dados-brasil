export function setupExport() {
  const btn = document.querySelector('.export-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      const csv = 'coluna1,coluna2\nvalor1,valor2';
      const blob = new Blob([csv], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'dados.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}
