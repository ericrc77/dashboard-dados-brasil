
export function setupCharts(chartData) {
  const ctx = document.getElementById('mainChart').getContext('2d');
  const colors = [
    'rgba(58,60,90,0.7)',
    'rgba(131,96,195,0.7)',
    'rgba(60,180,200,0.7)',
    'rgba(100,115,201,0.7)',
    'rgba(80,80,120,0.7)'
  ];
  new window.Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData.labels,
      datasets: [{
        label: chartData.label,
        data: chartData.data,
        backgroundColor: colors.slice(0, chartData.data.length),
        borderRadius: 8,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#23243a',
          titleColor: '#3a3d5c',
          bodyColor: '#f3f4f6',
          borderColor: '#3a3d5c',
          borderWidth: 1
        }
      },
      animation: {
        onComplete: () => {},
        delay: (context) => context.dataIndex * 180
      }
    }
  });
}
