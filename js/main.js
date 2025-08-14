import { animateCounters } from './modules/counter.js';
// Marca item ativo na sidebar conforme URL
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.endsWith(path)) {
      a.classList.add('active');
    } else if (!path && href === 'index.html') {
      a.classList.add('active');
    }
  });
});
// import { setupCharts } from './modules/charts.js';
import { setupParallax } from './modules/parallax.js';
import { setupExport } from './modules/export.js';
import { setupExportImage } from './modules/exportImage.js';

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar e ticker contínuo agora em common.js
  // setupCharts();
  setupParallax();
  setupExport();
  animateCounters();
  setupExportImage();
  montarDashboardPrincipal();
});

function montarDashboardPrincipal(){
  const cardsWrapper = document.querySelector('.dashboard-cards');
  const chartsWrapper = document.querySelector('.dashboard-charts');
  if(!cardsWrapper || !chartsWrapper) return;
  // Evita recriar se já houver conteúdo
  if(cardsWrapper.children.length) return;
  // KPI cards removidos conforme solicitação
  cardsWrapper.style.display = 'none';
  // Montar gráfico contínuo principal
  // Novos gráficos: crescimento trimestral do PIB e participação por setor
  chartsWrapper.innerHTML = `
    <div class="charts-row">
      <div class="chart-block">
        <div class="chart-header"><h2 class="chart-title">Crescimento Trimestral do PIB</h2></div>
        <canvas id="gdpBarChart" class="chart-surface" aria-label="Crescimento trimestral do PIB"></canvas>
      </div>
      <div class="chart-block">
        <div class="chart-header"><h2 class="chart-title">Participação por Setor</h2></div>
        <canvas id="sectorPieChart" class="chart-surface" aria-label="Participação setorial"></canvas>
      </div>
    </div>`;
  // Dataset trimestral simulado
  const gdpCtx = chartsWrapper.querySelector('#gdpBarChart').getContext('2d');
  const quarters = ['Q1-22','Q2-22','Q3-22','Q4-22','Q1-23','Q2-23','Q3-23','Q4-23'];
  const gdpValues = quarters.map((_,i)=> Number((Math.random()*3+0.5).toFixed(2)));
  new window.Chart(gdpCtx, { type:'bar', data:{ labels:quarters, datasets:[{ label:'Crescimento %', data:gdpValues, backgroundColor:'#5eead4' }]}, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ display:false }}, scales:{ x:{ ticks:{ color:'#94a3b8' }}, y:{ ticks:{ color:'#94a3b8' } } } }});
  // Gráfico pizza de setores
  const pieCtx = chartsWrapper.querySelector('#sectorPieChart').getContext('2d');
  const sectors = ['Agro','Indústria','Serviços'];
  const sectorData = [5,25,70];
  new window.Chart(pieCtx, { type:'pie', data:{ labels:sectors, datasets:[{ data:sectorData, backgroundColor:['#34d399','#38bdf8','#fbbf24'] }]}, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom', labels:{ color:'#94a3b8' }}, tooltip:{ backgroundColor:'#1e293b' } } } });
  animateCounters();
  // animação entrada
  requestAnimationFrame(()=>{
    document.querySelectorAll('.kpi-card').forEach(el=> el.classList.add('enter'));
  });
}

function gerarSerie(n=100,min=80,max=120){
  const arr=[]; let cur=(min+max)/2; for(let i=0;i<n;i++){ const v=(Math.random()-0.5)*(max-min)*0.04; cur=Math.min(max,Math.max(min,cur+v)); arr.push(Number(cur.toFixed(2))); } return arr;
}

function gerarSparklineSerie(n=12,min=60,max=140){
  const arr=[]; let cur=(min+max)/2; for(let i=0;i<n;i++){ const v=(Math.random()-0.5)*(max-min)*0.18; cur=Math.min(max,Math.max(min,cur+v)); arr.push(Number(cur.toFixed(0))); } return arr;
}

function sparklinePath(data,width=120,height=38,padding=2){
  const min=Math.min(...data), max=Math.max(...data); const span=max-min||1; const step=(width- padding*2)/(data.length-1);
  return data.map((v,i)=>{
    const x= (padding + i*step).toFixed(2);
    const y= (height - padding - ((v-min)/span)*(height-padding*2)).toFixed(2);
    return (i? 'L':'M')+x+','+y;
  }).join(' ');
}

function montarPainelTendencias(){
  const el=document.getElementById('trendsList'); if(!el) return;
  const itens=[
    { label:'Atividade Econômica' },
    { label:'Produção Industrial' },
    { label:'Serviços' },
    { label:'Vendas Varejo' },
    { label:'Emprego Formal' },
    { label:'Arrecadação' }
  ];
  el.innerHTML = itens.map(it=>{
    const serie=gerarSparklineSerie(); const path=sparklinePath(serie); const diff=serie.at(-1)-serie[0];
    const trendClass = diff>0? 'up': (diff<0? 'down':'flat');
    return `<div class="trend-item ${trendClass}" role="listitem">
      <div class="t-meta"><span class="t-label">${it.label}</span><span class="t-diff">${diff>0?'+':''}${diff}</span></div>
      <svg class="spark" viewBox="0 0 120 38" preserveAspectRatio="none"><path d="${path}" /></svg>
    </div>`; }).join('');
}

function montarRankingIndicadores(){
  const el=document.getElementById('rankingList'); if(!el) return;
  const dados=[
    { label:'Exportações', valor:76 },
    { label:'Investimento', valor:63 },
    { label:'Consumo Famílias', valor:58 },
    { label:'Construção', valor:41 },
    { label:'Crédito', valor:35 }
  ];
  const max=Math.max(...dados.map(d=>d.valor));
  el.innerHTML = dados.map((d,i)=>{
    const w=(d.valor/max*100).toFixed(1);
    return `<li class="rank-item"><span class="rank-pos">${i+1}</span><span class="rank-label">${d.label}</span><div class="rank-bar-wrap"><div class="rank-bar" style="--w:${w}%"></div></div><span class="rank-val">${d.valor}</span></li>`;
  }).join('');
}
