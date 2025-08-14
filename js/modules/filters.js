const datasets = {
  populacao: {
    cards: [
      { title: 'População Total', value: 214326223, desc: 'Brasil, 2025', badge: 'IBGE' },
      { title: 'Crescimento Anual', value: 0.52, desc: 'em %', badge: '2025' },
      { title: 'População Urbana', value: 178000000, desc: 'Estimativa IBGE', badge: 'Urbana' },
      { title: 'População Rural', value: 36326223, desc: 'Estimativa IBGE', badge: 'Rural' },
      { title: 'Expectativa de Vida', value: 76.8, desc: 'anos', badge: 'Saúde' },
      { title: 'Densidade Demográfica', value: 25.0, desc: 'hab/km²', badge: '2025' }
    ],
    chart: {
      labels: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
      data: [18700000, 57000000, 16000000, 88000000, 31000000],
      label: 'População por Região'
    },
    chart2: {
      labels: ['0-14 anos', '15-64 anos', '65+ anos'],
      data: [48000000, 140000000, 26326223],
      label: 'Faixa Etária'
    },
    chartLine: {
      type: 'line',
      labels: ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],
      data: [204000000, 206000000, 208000000, 210000000, 211000000, 212000000, 213000000, 213500000, 214000000, 214200000, 214326223],
      label: 'População Total (2015-2025)'
    }
  },
  economia: {
    cards: [
      { title: 'PIB Total', value: 2200000000000, desc: 'R$ (2024)', badge: 'PIB' },
      { title: 'PIB per capita', value: 10200, desc: 'R$ (2024)', badge: 'PIB' },
      { title: 'Inflação', value: 4.2, desc: '% ao ano', badge: 'IPCA' },
      { title: 'Desemprego', value: 7.8, desc: '% (2025)', badge: 'IBGE' },
      { title: 'Exportações', value: 335000000000, desc: 'US$ (2024)', badge: 'Comex' },
      { title: 'Reservas Internacionais', value: 340000000000, desc: 'US$ (2024)', badge: 'Banco Central' }
    ],
    chart: {
      labels: ['Agro', 'Indústria', 'Serviços', 'Impostos'],
      data: [400000000000, 600000000000, 1000000000000, 200000000000],
      label: 'PIB por Setor'
    },
    chart2: {
      labels: ['Exportações', 'Importações'],
      data: [335000000000, 270000000000],
      label: 'Balança Comercial'
    },
    chartLine: {
      type: 'line',
      labels: ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],
      data: [1800000000000, 1850000000000, 1900000000000, 1950000000000, 2000000000000, 2050000000000, 2100000000000, 2150000000000, 2180000000000, 2190000000000, 2200000000000],
      label: 'PIB Total (2015-2025)'
    }
  },
  educacao: {
    cards: [
      { title: 'Taxa de Alfabetização', value: 94.5, desc: '% adultos', badge: 'IBGE' },
      { title: 'Matrículas Ensino Básico', value: 38000000, desc: '2024', badge: 'Básico' },
      { title: 'Universitários', value: 8600000, desc: '2024', badge: 'Superior' },
      { title: 'Investimento em Educação', value: 6.2, desc: '% do PIB', badge: 'Governo' },
      { title: 'Escolas Públicas', value: 145000, desc: '2024', badge: 'Rede Pública' },
      { title: 'Docentes', value: 2100000, desc: '2024', badge: 'Professores' }
    ],
    chart: {
      labels: ['Fundamental', 'Médio', 'Superior'],
      data: [25000000, 9000000, 8600000],
      label: 'Matrículas por Nível'
    },
    chart2: {
      labels: ['Pública', 'Privada'],
      data: [32000000, 6000000],
      label: 'Rede de Ensino'
    },
    chartLine: {
      type: 'line',
      labels: ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],
      data: [32000000, 32500000, 33000000, 33500000, 34000000, 34500000, 35000000, 36000000, 37000000, 37500000, 38000000],
      label: 'Matrículas Ensino Básico (2015-2025)'
    }
  }
};

export function setupFilters() {
  // Sem filtros: carrega dataset padrão
  renderDashboard('populacao');
}

function renderDashboard(datasetKey) {
  const data = datasets[datasetKey];
  // Render cards
  const cardsSection = document.querySelector('.dashboard-cards');
  if (cardsSection) {
    cardsSection.innerHTML = data.cards.map(card => {
      const val = (typeof card.value === 'number' && !isNaN(card.value)) ? card.value : 0;
      return `
      <div class="card" tabindex="0" aria-label="${card.title}">
        <h2 class="card-title">${card.title} ${card.badge ? `<span class='badge'>${card.badge}</span>` : ''}</h2>
        <div class="card-value" data-counter data-value="${val}">0</div>
        <p class="card-desc">${card.desc}</p>
      </div>`;
    }).join('');
  }
  // Render chart
  const chartsSection = document.querySelector('.dashboard-charts');
  if (chartsSection) {
    const chartData = data.chartLine || data.chart || data.chart2;
    chartsSection.innerHTML = `
      <div class="chart-block-broker">
        <div class="chart-block-header">
          <h2 class="chart-block-title">${chartData.label || 'Evolução dos Dados'}</h2>
          <span class="chart-block-ticker">BRASIL • ${new Date().getFullYear()}</span>
        </div>
        <div class="chart-unique-row">
          <canvas id="mainChartUnique" aria-label="Gráfico contínuo" tabindex="0"></canvas>
        </div>
      </div>
    `;
    setTimeout(() => {
      import('./charts.js').then(module => {
        module.setupUniqueLineChart(chartData, 'mainChartUnique');
      });
    }, 200);
  }
  // Reanimar contadores
  import('./counter.js').then(module => {
    module.animateCounters();
  });
}
