import { animateCounters } from './modules/counter.js';
import { setupSidebar } from './modules/sidebar.js';
import { setupFilters } from './modules/filters.js';
// import { setupCharts } from './modules/charts.js';
import { setupParallax } from './modules/parallax.js';
import { setupExport } from './modules/export.js';

document.addEventListener('DOMContentLoaded', () => {
  setupSidebar();
  setupFilters();
  // setupCharts();
  setupParallax();
  setupExport();
  animateCounters();
});
