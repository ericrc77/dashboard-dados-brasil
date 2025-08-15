// Inicialização dos gráficos da página principal (regionPieChart e stateBarChart)
// Depende de Chart.js já carregado via CDN no index.html
export function setupHomeCharts(){
  if(!window.Chart) return;
  const regCanvas = document.getElementById('regionPieChart');
  const stCanvas = document.getElementById('stateBarChart');
  if(regCanvas){
    const regCtx = regCanvas.getContext('2d');
    new window.Chart(regCtx,{
      type:'pie',
      data:{
        labels:['Norte','Nordeste','Sudeste','Sul','Centro-Oeste'],
        datasets:[{ data:[18,28,42,8,4], backgroundColor:['#34d399','#38bdf8','#fbbf24','#f472b6','#c084fc'] }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        plugins:{ legend:{ position:'bottom', labels:{ color:'#94a3b8' } } }
      }
    });
  }
  if(stCanvas){
    const stCtx = stCanvas.getContext('2d');
    new window.Chart(stCtx,{
      type:'bar',
      data:{
        labels:['SP','MG','RJ','BA','PR'],
        datasets:[{ label:'Pop (M)', data:[47.3,21.3,17.2,14.8,11.5], backgroundColor:'#5eead4' }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        scales:{
          x:{ ticks:{ display:false }, grid:{ color:'rgba(148,163,184,0.08)' } },
          y:{ ticks:{ display:false }, grid:{ color:'rgba(148,163,184,0.08)' } }
        },
        plugins:{ legend:{ display:false } }
      }
    });
  }
}

// Auto-execução somente se página marcada como dashboard
document.addEventListener('DOMContentLoaded',()=>{
  const page = document.body.getAttribute('data-page');
  if(page === 'dashboard') setupHomeCharts();
});
