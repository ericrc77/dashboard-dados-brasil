// Gráfico único, largo, animado estilo bolsa
export function setupUniqueLineChart(ctxOrData, maybeData) {
  // Permite chamadas como setupUniqueLineChart(ctx, data) ou setupUniqueLineChart({data,labels})
  let ctx, chartData;
  if (ctxOrData && ctxOrData.canvas) {
    ctx = ctxOrData;
    chartData = maybeData;
  } else {
    const canvasId = 'mainChartUnique';
    ctx = document.getElementById(canvasId).getContext('2d');
    chartData = ctxOrData;
  }
  // Gera dados animados para simular "bolsa"
  let base = chartData && chartData.data ? [...chartData.data] : [100, 120, 110, 130, 125, 140, 135, 150, 145, 160, 155];
  let labels = chartData && chartData.labels ? [...chartData.labels] : Array.from({length: base.length}, (_,i)=>`T${i+1}`);
  let chart = new window.Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: chartData && chartData.label ? chartData.label : 'Evolução',
        data: base,
        backgroundColor: ctx.createLinearGradient(0, 0, 0, 400),
        borderColor: '#5eead4',
        borderWidth: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#5eead4',
        pointRadius: 6,
        pointHoverRadius: 12,
        pointHoverBackgroundColor: '#fbbf24',
        fill: true,
        tension: 0.45,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#23243a',
          titleColor: '#fbbf24',
          bodyColor: '#5eead4',
          borderColor: '#5eead4',
          borderWidth: 2,
          padding: 16,
          caretSize: 8,
          displayColors: false,
        },
        datalabels: { display: false }
      },
      animation: {
        duration: 1200,
        easing: 'easeInOutQuart',
      },
      hover: {
        mode: 'nearest',
        intersect: true,
        onHover: function(e, activeEls) {
          e.native.target.style.cursor = activeEls.length > 0 ? 'pointer' : 'default';
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(94,234,212,0.1)' },
          ticks: { color: '#5eead4', font: { weight: 'bold' } }
        },
        y: {
          grid: { color: 'rgba(94,234,212,0.1)' },
          ticks: { color: '#5eead4', font: { weight: 'bold' } }
        }
      }
    }
  });
  // Animação contínua de bolsa
  setInterval(() => {
    // Simula novo valor
    let last = chart.data.datasets[0].data[chart.data.datasets[0].data.length-1];
    let next = Math.max(0, last + (Math.random()-0.5)*10);
    chart.data.datasets[0].data.push(next);
    chart.data.labels.push(`T${chart.data.labels.length+1}`);
    if (chart.data.datasets[0].data.length > 20) {
      chart.data.datasets[0].data.shift();
      chart.data.labels.shift();
    }
    chart.update('active');
  }, 1200);
}

export function setupCharts(chartData, canvasId = 'mainChart') {
  const ctx = document.getElementById(canvasId).getContext('2d');
  const colors = [
    'rgba(58,60,90,0.7)',
    'rgba(131,96,195,0.7)',
    'rgba(60,180,200,0.7)',
    'rgba(100,115,201,0.7)',
    'rgba(80,80,120,0.7)'
  ];
  const isLine = chartData.type === 'line';
  // Gradiente animado para linha
  let gradient = null;
  if (isLine) {
    gradient = ctx.createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, 'rgba(94,234,212,0.7)');
    gradient.addColorStop(1, 'rgba(94,234,212,0.05)');
  }
  new window.Chart(ctx, {
    type: isLine ? 'line' : 'bar',
    data: {
      labels: chartData.labels,
      datasets: [{
        label: chartData.label,
        data: chartData.data,
        backgroundColor: isLine ? gradient : colors.slice(0, chartData.data.length),
        borderColor: isLine ? '#5eead4' : colors.slice(0, chartData.data.length),
        borderWidth: isLine ? 4 : 0,
        pointBackgroundColor: isLine ? '#fff' : undefined,
        pointBorderColor: isLine ? '#5eead4' : undefined,
        pointRadius: isLine ? 7 : undefined,
        pointHoverRadius: isLine ? 12 : undefined,
        pointHoverBackgroundColor: isLine ? '#fbbf24' : undefined,
        fill: isLine,
        tension: isLine ? 0.45 : undefined,
        borderRadius: isLine ? undefined : 12,
        hoverBackgroundColor: isLine ? undefined : colors.map(c => c.replace('0.7','1')),
        hoverBorderColor: isLine ? undefined : '#fbbf24',
        hoverBorderWidth: isLine ? undefined : 3,
        datalabels: {
          anchor: 'end',
          align: 'top',
          color: isLine ? '#fbbf24' : '#fff',
          font: { weight: 'bold', size: 14 },
          formatter: function(value) { return value; }
        }
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#23243a',
          titleColor: '#fbbf24',
          bodyColor: '#5eead4',
          borderColor: '#5eead4',
          borderWidth: 2,
          padding: 16,
          caretSize: 8,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.formattedValue}`;
            }
          }
        },
        datalabels: {
          display: true,
          color: isLine ? '#fbbf24' : '#fff',
          font: { weight: 'bold', size: 14 },
          anchor: 'end',
          align: 'top',
          formatter: function(value) { return value; }
        }
      },
      animation: {
        duration: 1200,
        easing: 'easeInOutQuart',
        onProgress: function(animation) {
          if (isLine && animation.currentStep % 2 === 0) ctx.shadowBlur = 16;
        },
        onComplete: () => { ctx.shadowBlur = 0; },
        delay: (context) => context.dataIndex * 120
      },
      hover: {
        mode: 'nearest',
        intersect: true,
        onHover: function(e, activeEls) {
          if (activeEls.length > 0) {
            e.native.target.style.cursor = 'pointer';
          } else {
            e.native.target.style.cursor = 'default';
          }
        }
      },
      scales: isLine ? {
        x: {
          grid: { color: 'rgba(94,234,212,0.1)' },
          ticks: { color: '#5eead4', font: { weight: 'bold' } }
        },
        y: {
          grid: { color: 'rgba(94,234,212,0.1)' },
          ticks: { color: '#5eead4', font: { weight: 'bold' } }
        }
      } : {
        x: { grid: { color: 'rgba(94,234,212,0.05)' }, ticks: { color: '#fff' } },
        y: { grid: { color: 'rgba(94,234,212,0.05)' }, ticks: { color: '#fff' } }
      }
    },
    plugins: [window.ChartDataLabels]
  });
}
