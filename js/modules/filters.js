const datasets = {
  populacao: {
    cards: [
      { title: 'População Total', value: 214326223, desc: 'Brasil, 2025' },
      { title: 'Crescimento Anual', value: 0.52, desc: 'em %' },
      { title: 'População Urbana', value: 178000000, desc: 'Estimativa IBGE' },
      { title: 'População Rural', value: 36326223, desc: 'Estimativa IBGE' }
    ],
    chart: {
      labels: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
      data: [18700000, 57000000, 16000000, 88000000, 31000000],
      label: 'População por Região'
    }
  },
  economia: {
    cards: [
      { title: 'PIB Total', value: 2200000000000, desc: 'R$ (2024)' },
      { title: 'PIB per capita', value: 10200, desc: 'R$ (2024)' },
      { title: 'Inflação', value: 4.2, desc: '% ao ano' },
      { title: 'Desemprego', value: 7.8, desc: '% (2025)' }
    ],
    chart: {
      labels: ['Agro', 'Indústria', 'Serviços', 'Impostos'],
      data: [400000000000, 600000000000, 1000000000000, 200000000000],
      label: 'PIB por Setor'
    }
  },
  educacao: {
    cards: [
      { title: 'Taxa de Alfabetização', value: 94.5, desc: '% adultos' },
      { title: 'Matrículas Ensino Básico', value: 38000000, desc: '2024' },
      { title: 'Universitários', value: 8600000, desc: '2024' },
      { title: 'Investimento em Educação', value: 6.2, desc: '% do PIB' }
    ],
    chart: {
      labels: ['Fundamental', 'Médio', 'Superior'],
      data: [25000000, 9000000, 8600000],
      label: 'Matrículas por Nível'
    }
  }
};

export function setupFilters() {
  const filters = document.querySelector('.filters');
  if (filters) {
    filters.innerHTML = `
      <label for="dataset-select">Dataset:</label>
      <select id="dataset-select" aria-label="Selecionar dataset">
        <option value="populacao">População</option>
        <option value="economia">Economia</option>
        <option value="educacao">Educação</option>
      </select>
    `;
    filters.style.opacity = 0;
    setTimeout(() => {
      filters.style.transition = 'opacity 0.5s';
      filters.style.opacity = 1;
    }, 200);
    document.getElementById('dataset-select').addEventListener('change', e => {
      renderDashboard(e.target.value);
    });
    renderDashboard('populacao');
  }
}

function renderDashboard(datasetKey) {
  const data = datasets[datasetKey];
  // Render cards
  const cardsSection = document.querySelector('.dashboard-cards');
  if (cardsSection) {
    cardsSection.innerHTML = data.cards.map(card => `
      <div class="card" tabindex="0" aria-label="${card.title}">
        <h2 class="card-title">${card.title}</h2>
        <div class="card-value" data-counter>${card.value}</div>
        <p class="card-desc">${card.desc}</p>
      </div>
    `).join('');
  }
  // Render chart
  const chartsSection = document.querySelector('.dashboard-charts');
  if (chartsSection) {
    chartsSection.innerHTML = `<canvas id="mainChart" aria-label="Gráfico principal" tabindex="0"></canvas>`;
    setTimeout(() => {
      import('./modules/charts.js').then(module => {
        module.setupCharts(data.chart);
      });
    }, 200);
  }
  // Reanimar contadores
  import('./modules/counter.js').then(module => {
    module.animateCounters();
  });
}
