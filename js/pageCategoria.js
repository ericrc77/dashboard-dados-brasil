// Dados específicos por categoria e função utilitária para montar cards e gráfico
// Mantém consistência com o estilo existente do dashboard

import { setupUniqueLineChart } from './modules/charts.js';
import { animateCounters } from './modules/counter.js';

// Cada categoria agora possui configuração de tipo de gráfico distinto
// lib: 'chartjs' ou 'echarts'
const datasetsCategoria = {
  populacao: {
    titulo: 'População - Evolução',
    cards: [
      { label: 'População Total', valor: 203_100_000, detalhe: 'Estimativa IBGE' },
      { label: 'Crescimento Anual', valor: 0.52, sufixo: '%', detalhe: 'Variação 23/24' },
      { label: 'Expectativa de Vida', valor: 76.6, sufixo: ' anos', detalhe: 'Média nacional' },
  { label: 'Índice Urbano', valor: 87.2, sufixo: '%', detalhe: 'Áreas urbanas' },
  { label: 'Taxa Fecund.', valor: 1.63, detalhe: 'Filhos/mulher' },
  { label: 'Razão Dependência', valor: 44.8, sufixo: '%', detalhe: 'Pop. dependente' }
    ],
    chart: { lib: 'chartjs', type: 'line-continuous', serie: () => gerarSerieBase(100, 120, 60) }
  },
  economia: {
    titulo: 'Economia - Setores (Bar Empilhado)',
    cards: [
      { label: 'PIB (R$ Tri)', valor: 10.9, sufixo: ' T', detalhe: 'Preço corrente' },
      { label: 'Inflação 12m', valor: 4.27, sufixo: '%', detalhe: 'IPCA' },
      { label: 'Selic', valor: 10.50, sufixo: '%', detalhe: 'Meta' },
  { label: 'Dívida/PIB', valor: 75.8, sufixo: '%', detalhe: 'Bruta' },
  { label: 'Desemprego', valor: 7.2, sufixo: '%', detalhe: 'PNAD' },
  { label: 'Investimento', valor: 17.5, sufixo: '% PIB', detalhe: 'FBKF' }
    ],
    chart: { lib: 'chartjs', type: 'stacked-bar', data: gerarCategorias(['Agro','Indústria','Serviços','Impostos'], [18,25,42,15]) }
  },
  educacao: {
    titulo: 'Educação - Radar de Indicadores',
    cards: [
      { label: 'Matrícula', valor: 97.4, sufixo: '%', detalhe: 'Fundamental' },
      { label: 'IDEB', valor: 5.9, detalhe: 'Anos finais' },
      { label: 'Evasão', valor: 6.2, sufixo: '%', detalhe: 'Médio' },
  { label: 'Alfabetização', valor: 93.1, sufixo: '%', detalhe: '7-8 anos' },
  { label: 'Docentes Sup.', valor: 66.4, sufixo: '%', detalhe: 'Formação' },
  { label: 'Tempo Aula', valor: 4.2, sufixo: ' h/dia', detalhe: 'Fundamental' }
    ],
    chart: { lib: 'chartjs', type: 'radar', data: gerarCategorias(['Qualidade','Acesso','Infra','Docência','Tecnologia'], gerarSerieBase(60,100,5,0.2)) }
  },
  saude: {
    titulo: 'Saúde - Composição (Doughnut)',
    cards: [
      { label: 'Cobertura Vacinal', valor: 88.5, sufixo: '%', detalhe: 'Calendário' },
      { label: 'Mortalidade Infantil', valor: 12.6, sufixo: ' /mil', detalhe: 'Menores 1 ano' },
      { label: 'Leitos/1k', valor: 2.1, detalhe: 'Total' },
  { label: 'Gasto Saúde', valor: 9.6, sufixo: '% PIB', detalhe: 'Total' },
  { label: 'Cobertura ESF', valor: 64.3, sufixo: '%', detalhe: 'Atenção Básica' },
  { label: 'Médicos/1k', valor: 2.4, detalhe: 'Profissionais' }
    ],
    chart: { lib: 'chartjs', type: 'doughnut', data: gerarCategorias(['Preventiva','Hospitalar','Medicamentos','Gestão'], [32,41,15,12]) }
  },
  infraestrutura: {
    titulo: 'Infraestrutura - Polar Area',
    cards: [
      { label: 'Rodovias Pav.', valor: 14.3, sufixo: '%', detalhe: 'Malha' },
      { label: 'Saneamento', valor: 86.2, sufixo: '%', detalhe: 'Água' },
      { label: 'Esgoto', valor: 59.1, sufixo: '%', detalhe: 'Coleta' },
  { label: 'Banda Larga', valor: 110.5, sufixo: ' Mbps', detalhe: 'Média' },
  { label: 'Energia Elétrica', valor: 99.3, sufixo: '%', detalhe: 'Acesso' },
  { label: 'Habitação Adeq.', valor: 84.7, sufixo: '%', detalhe: 'Moradias' }
    ],
    chart: { lib: 'chartjs', type: 'polarArea', data: gerarCategorias(['Rodovias','Portos','Ferrovias','Aeroportos','Logística'], gerarSerieBase(20,100,5,0.5)) }
  },
  energia: {
    titulo: 'Energia - Barras Horizontais',
    cards: [
      { label: 'Renovável', valor: 46.2, sufixo: '%', detalhe: 'Matriz' },
      { label: 'Capacidade', valor: 194.3, sufixo: ' GW', detalhe: 'Instalada' },
      { label: 'Consumo pc', valor: 2.7, sufixo: ' MWh', detalhe: 'Ano' },
  { label: 'Perdas', valor: 14.1, sufixo: '%', detalhe: 'Distribuição' },
  { label: 'Fator Carga', valor: 57.8, sufixo: '%', detalhe: 'Sistema' },
  { label: 'Emissão/kWh', valor: 0.09, sufixo: ' t', detalhe: 'Carbono' }
    ],
    chart: { lib: 'chartjs', type: 'horizontal-bar', data: gerarCategorias(['Hídrica','Solar','Eólica','Térmica','Outras'], gerarSerieBase(10,80,5,0.6)) }
  },
  mobilidade: {
    titulo: 'Mobilidade - Linha Área Preenchida',
    cards: [
      { label: 'Usuários TP', valor: 27.5, sufixo: ' mi/dia', detalhe: 'Coletivo' },
      { label: 'Frota Veículos', valor: 115.2, sufixo: ' mi', detalhe: 'Registrados' },
      { label: 'Tempo Desloc.', valor: 38.4, sufixo: ' min', detalhe: 'Médio' },
  { label: 'Malha Metro', valor: 420, sufixo: ' km', detalhe: 'Operacional' },
  { label: 'Ônibus Elétricos', valor: 2.3, sufixo: ' mil', detalhe: 'Frota' },
  { label: 'Ciclovias', valor: 4680, sufixo: ' km', detalhe: 'Urbanas' }
    ],
    chart: { lib: 'chartjs', type: 'area-line', data: gerarCategorias(Array.from({length:12},(_,i)=>`M${i+1}`), gerarSerieBase(60,130,12,0.55)) }
  },
  'meio-ambiente': {
    titulo: 'Meio Ambiente - Pie (ECharts)',
    cards: [
      { label: 'Cobertura Florestal', valor: 59.4, sufixo: '%', detalhe: 'Território' },
      { label: 'CO₂ per capita', valor: 2.1, sufixo: ' t', detalhe: 'Ano' },
      { label: 'Áreas Protegidas', valor: 29.8, sufixo: '%', detalhe: 'Território' },
  { label: 'Reciclagem', valor: 4.5, sufixo: '%', detalhe: 'Resíduos' },
  { label: 'Desmatamento', valor: 8.1, sufixo: ' mil km²', detalhe: 'Ano' },
  { label: 'Qualidade Ar', valor: 92.5, sufixo: ' IQA', detalhe: 'Índice' }
    ],
    chart: { lib: 'echarts', type: 'pie-rose', data: [
      { value: 59.4, name: 'Florestas' },
      { value: 29.8, name: 'Protegidas' },
      { value: 10.8, name: 'Outros usos' },
      { value: 4.5, name: 'Reciclagem' }
    ] }
  }
};

function gerarCategorias(labels, data) { return { labels, data }; }

function gerarSerieBase(min, max, n = 60, volatilidade = 0.5) {
  const arr = [];
  let atual = (min + max) / 2;
  for (let i = 0; i < n; i++) {
    const variacao = (Math.random() - 0.5) * (max - min) * 0.02 * (volatilidade * 2);
    atual = Math.min(max, Math.max(min, atual + variacao));
    arr.push(Number(atual.toFixed(2)));
  }
  return arr;
}

function montarCards(wrapper, cards) {
  wrapper.innerHTML = cards.map(c=>`
    <article class="card" data-value="${c.valor}" aria-label="${c.label}">
      <h3 class="card-title">${c.label}</h3>
      <p class="card-value">${c.valor}${c.sufixo || ''}</p>
      <span class="card-detail">${c.detalhe || ''}</span>
    </article>`).join('');
}

function montarGrafico(wrapper, chartCfg, titulo) {
  wrapper.innerHTML = `<div class="chart-block-broker">
    <div class="chart-header"><h2 class="chart-title">${titulo}</h2><div class="chart-tools" aria-label="Ferramentas do gráfico"></div></div>
    <div class="chart-unique-row"><canvas id="unique-line-chart" class="chart-surface" aria-label="Visualização gráfica"></canvas></div>
  </div>`;
  const container = wrapper.querySelector('.chart-block-broker');
  const tools = container.querySelector('.chart-tools');
  // Clona config para não mutar o original
  const state = { current: chartCfg, base: chartCfg };
  // Define variantes simples por tipo principal
  state.variants = gerarVariantes(chartCfg);
  const categoria = document.querySelector('.dashboard-cards')?.dataset?.categoria;
  // Tenta carregar tipo salvo
  if (categoria) {
    const savedType = localStorage.getItem('chartType_' + categoria);
    if (savedType) {
      const found = state.variants.find(v => v.type === savedType);
      if (found) state.current = found;
    }
  }
  if (state.variants.length) {
    const btn = document.createElement('button');
    btn.className = 'chart-tool-btn';
    btn.type = 'button';
    btn.textContent = labelTipo(state.current.type);
    btn.title = 'Alternar tipo de gráfico';
    btn.setAttribute('aria-label','Alternar tipo de gráfico');
    btn.addEventListener('click', () => {
      const idx = state.variants.indexOf(state.current);
      const next = state.variants[(idx + 1) % state.variants.length];
      state.current = next;
      // Limpa área
      const area = container.querySelector('.chart-unique-row');
      transitionSwap(area, () => {
        area.innerHTML = '<div class="chart-skeleton" aria-hidden="true"></div><canvas id="unique-line-chart" class="chart-surface fading-in" aria-label="Visualização gráfica"></canvas>';
        if (next.lib === 'chartjs') renderChartJs(container, next); else renderECharts(container, next);
        btn.textContent = labelTipo(next.type);
        if (categoria) localStorage.setItem('chartType_' + categoria, next.type);
      });
    });
    tools.appendChild(btn);
  }
  // Skeleton inicial
  const areaInit = container.querySelector('.chart-unique-row');
  areaInit.insertAdjacentHTML('afterbegin','<div class="chart-skeleton" aria-hidden="true"></div>');
  const initial = state.current;
  if (initial.lib === 'chartjs') renderChartJs(container, initial); else if (initial.lib === 'echarts') renderECharts(container, initial);
}

function renderChartJs(container, cfg) {
  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  canvas.classList.add('fade-enter');
  if (cfg.type === 'line-continuous') {
    setupUniqueLineChart(ctx, { data: cfg.serie() });
    finalizeSkeleton(container, canvas);
    return;
  }
  const baseColors = ['#5eead4','#fbbf24','#38bdf8','#f472b6','#c084fc','#34d399'];
  let chartType = cfg.type;
  const dataObj = cfg.data;
  const chartJsConfig = { type: 'bar', data: {}, options: {} };
  const commonOpts = {
    responsive: true,
    maintainAspectRatio: false,
    animations: {
      tension: { duration: 1800, easing: 'easeInOutQuad', from:0.2, to:0.6, loop: true },
      colors: { type: 'color', duration: 2500, loop: true }
    },
    plugins: { legend: { display: cfg.type !== 'horizontal-bar' }, tooltip: { backgroundColor:'#1e293b', borderColor:'#5eead4', borderWidth:1, padding:12 } },
    layout: { padding: 8 },
    // Escalas serão sobrescritas abaixo conforme tipo, mas padrão remove ticks numéricos
    scales: {
      x: { ticks: { display:false }, grid:{ color:'rgba(148,163,184,0.08)' } },
      y: { ticks: { display:false }, grid:{ color:'rgba(148,163,184,0.08)' } }
    }
  };
  let dataset;
  switch(cfg.type){
    case 'stacked-bar':
      chartJsConfig.type='bar';
      chartJsConfig.data={ labels: dataObj.labels, datasets: [
        {label:'Participação', data: dataObj.data, backgroundColor: dataObj.labels.map((_,i)=>baseColors[i%baseColors.length])}
      ]};
  commonOpts.scales={ x:{ stacked:true, ticks:{ display:false }, grid:{ color:'rgba(148,163,184,0.08)' }}, y:{ stacked:true, ticks:{ display:false }, grid:{ color:'rgba(148,163,184,0.08)' }}};
      break;
    case 'radar':
      chartJsConfig.type='radar';
      chartJsConfig.data={ labels: dataObj.labels, datasets:[{ label:'Índice', data: dataObj.data, fill:true, backgroundColor:'rgba(94,234,212,0.25)', borderColor:'#5eead4', pointBackgroundColor:'#fbbf24', pointRadius:6, tension:0.4 }]};
      commonOpts.scales={ r:{ angleLines:{ color:'rgba(94,234,212,0.15)' }, grid:{ color:'rgba(94,234,212,0.12)' }, pointLabels:{ color:'#5eead4', font:{ weight:'600'} }, ticks:{ display:false } } };
      break;
    case 'doughnut':
      chartJsConfig.type='doughnut';
      chartJsConfig.data={ labels: dataObj.labels, datasets:[{ data: dataObj.data, backgroundColor: dataObj.labels.map((_,i)=>baseColors[i%baseColors.length]), borderWidth:2, hoverOffset:18 }]};
      commonOpts.cutout='55%';
      break;
    case 'polarArea':
      chartJsConfig.type='polarArea';
      chartJsConfig.data={ labels: dataObj.labels, datasets:[{ data:dataObj.data, backgroundColor:dataObj.labels.map((_,i)=>baseColors[i%baseColors.length]) }]};
      break;
    case 'horizontal-bar':
      chartJsConfig.type='bar';
      chartJsConfig.data={ labels: dataObj.labels, datasets:[{ label:'Capacidade', data:dataObj.data, backgroundColor:'#38bdf8' }]};
      commonOpts.indexAxis='y';
  commonOpts.scales={ x:{ ticks:{ display:false }, grid:{ color:'rgba(148,163,184,0.08)' }}, y:{ ticks:{ display:false }, grid:{ color:'rgba(148,163,184,0.08)' }}};
      break;
    case 'area-line':
      chartJsConfig.type='line';
      const gradient = ctx.createLinearGradient(0,0,0,360); gradient.addColorStop(0,'rgba(56,189,248,0.5)'); gradient.addColorStop(1,'rgba(56,189,248,0)');
      chartJsConfig.data={ labels: dataObj.labels, datasets:[{ label:'Fluxo', data:dataObj.data, borderColor:'#38bdf8', backgroundColor:gradient, fill:true, tension:0.45, pointRadius:4, pointHoverRadius:10 }]};
  commonOpts.scales={ x:{ ticks:{ display:false }, grid:{ color:'rgba(148,163,184,0.08)' }}, y:{ ticks:{ display:false }, grid:{ color:'rgba(148,163,184,0.08)' } } };
      break;
    default:
      chartJsConfig.type='bar';
  }
  chartJsConfig.options = commonOpts;
  new window.Chart(ctx, chartJsConfig);
  finalizeSkeleton(container, canvas);
}

function renderECharts(container, cfg){
  const canvas = container.querySelector('canvas');
  // Troca canvas por div root ECharts
  const div = document.createElement('div');
  div.style.width='100%';
  div.style.height='100%';
  canvas.parentElement.replaceChild(div, canvas);
  const load = () => {
    const chart = window.echarts.init(div);
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger:'item' },
      series: [{
        name: 'Composição',
        type: 'pie',
        roseType: 'radius',
        radius: ['15%','70%'],
        center: ['50%','50%'],
        itemStyle:{ borderRadius:10, borderColor:'#0f172a', borderWidth:2 },
        label:{ color:'#e2e8f0', fontFamily:'Inter', fontWeight:600 },
        data: cfg.data,
        animationType:'scale',
        animationEasing:'elasticOut',
        animationDuration: 1800
      }]
    });
    // animação pulsante leve
  setInterval(()=>{
      chart.dispatchAction({ type:'highlight', seriesIndex:0, dataIndex: Math.floor(Math.random()*cfg.data.length)});
    },3000);
  finalizeSkeleton(container, div);
  };
  if (!window.echarts) {
    const s = document.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js';
    s.onload=load; document.head.appendChild(s);
    // Fallback após timeout caso CDN falhe
    setTimeout(()=>{
      if (!window.echarts) {
        const area = container.querySelector('.chart-unique-row');
        area.innerHTML = '<canvas id="unique-line-chart" class="chart-surface" aria-label="Fallback"></canvas>';
        renderChartJs(container, { lib:'chartjs', type:'doughnut', data: { labels: cfg.data.map(d=>d.name), data: cfg.data.map(d=>d.value) } });
      }
    }, 5500);
  } else load();
}

function iniciarCategoria() {
  const cardsEl = document.querySelector('.dashboard-cards');
  const chartsEl = document.querySelector('.dashboard-charts');
  if (!cardsEl || !chartsEl) return;
  const categoria = cardsEl.dataset.categoria;
  const data = datasetsCategoria[categoria];
  if (!data) return;
  montarCards(cardsEl, data.cards);
  montarGrafico(chartsEl, data.chart, data.titulo);
  animateCounters();
}

function gerarVariantes(baseCfg) {
  const variants = [baseCfg];
  if (baseCfg.lib === 'chartjs') {
    switch(baseCfg.type){
      case 'line-continuous':
        variants.push({ ...baseCfg, type:'area-line', lib:'chartjs', data: { labels: Array.from({length:12},(_,i)=>`M${i+1}`), data: gerarSerieBase(80,140,12,0.5) } });
        break;
      case 'stacked-bar':
        variants.push({ ...baseCfg, type:'horizontal-bar' });
        break;
      case 'radar':
        variants.push({ ...baseCfg, type:'polarArea' });
        break;
      case 'doughnut':
        variants.push({ ...baseCfg, type:'polarArea' });
        break;
      case 'polarArea':
        variants.push({ ...baseCfg, type:'doughnut' });
        break;
      case 'horizontal-bar':
        variants.push({ ...baseCfg, type:'stacked-bar' });
        break;
      case 'area-line':
        variants.push({ ...baseCfg, type:'line-continuous', serie: ()=>gerarSerieBase(90,130,60,0.4) });
        break;
    }
  } else if (baseCfg.lib === 'echarts') {
    variants.push({ ...baseCfg, type:'doughnut', lib:'chartjs', data: { labels: baseCfg.data.map(d=>d.name), data: baseCfg.data.map(d=>d.value) } });
  }
  return variants;
}

function labelTipo(t) {
  const map = {
    'line-continuous':'Linha',
    'area-line':'Área',
    'stacked-bar':'Barras',
    'horizontal-bar':'Barras H',
    'radar':'Radar',
    'polarArea':'Polar',
    'doughnut':'Rosca',
    'pie-rose':'Pie',
  };
  return map[t] || 'Tipo';
}

function transitionSwap(container, fn) {
  container.classList.add('fade-out');
  setTimeout(()=>{
    fn();
    container.classList.remove('fade-out');
  },180);
}

function finalizeSkeleton(container, el) {
  const skeleton = container.querySelector('.chart-skeleton');
  if (skeleton) skeleton.remove();
  requestAnimationFrame(()=>{
    el.classList.add('fade-in-active');
    setTimeout(()=> el.classList.remove('fade-enter','fade-in-active'),600);
  });
}

document.addEventListener('DOMContentLoaded', iniciarCategoria);
