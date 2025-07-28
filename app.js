// Netflix India Expansion Presentation App
class NetflixPresentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 7;
        this.charts = {};
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateSlideCounter();
        this.updateNavigationButtons();
        // Initialize charts for the first slide if needed
        setTimeout(() => {
            this.initializeSlideCharts(1);
        }, 100);
    }
    
    setupEventListeners() {
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentSlide > 1) {
                this.previousSlide();
            }
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentSlide < this.totalSlides) {
                this.nextSlide();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && this.currentSlide > 1) {
                this.previousSlide();
            }
            if (e.key === 'ArrowRight' && this.currentSlide < this.totalSlides) {
                this.nextSlide();
            }
        });
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    goToSlide(slideNumber) {
        // Validate slide number
        if (slideNumber < 1 || slideNumber > this.totalSlides) {
            return;
        }
        
        // Hide current slide
        const currentSlideEl = document.getElementById(`slide-${this.currentSlide}`);
        if (currentSlideEl) {
            currentSlideEl.classList.remove('active');
        }
        
        // Show new slide
        const newSlideEl = document.getElementById(`slide-${slideNumber}`);
        if (newSlideEl) {
            newSlideEl.classList.add('active');
        }
        
        this.currentSlide = slideNumber;
        this.updateSlideCounter();
        this.updateNavigationButtons();
        
        // Initialize charts for the current slide with a small delay
        setTimeout(() => {
            this.initializeSlideCharts(slideNumber);
        }, 50);
    }
    
    updateSlideCounter() {
        const counter = document.getElementById('slideCounter');
        if (counter) {
            counter.textContent = `${this.currentSlide} / ${this.totalSlides}`;
        }
    }
    
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        
        if (prevBtn) {
            if (this.currentSlide === 1) {
                prevBtn.disabled = true;
                prevBtn.style.opacity = '0.5';
                prevBtn.style.cursor = 'not-allowed';
            } else {
                prevBtn.disabled = false;
                prevBtn.style.opacity = '1';
                prevBtn.style.cursor = 'pointer';
            }
        }
        
        if (nextBtn) {
            if (this.currentSlide === this.totalSlides) {
                nextBtn.disabled = true;
                nextBtn.style.opacity = '0.5';
                nextBtn.style.cursor = 'not-allowed';
            } else {
                nextBtn.disabled = false;
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
            }
        }
    }
    
    initializeSlideCharts(slideNumber) {
        switch(slideNumber) {
            case 2:
                this.initBCGMatrix();
                break;
            case 4:
                this.initPricingChart();
                break;
            case 5:
                this.initContentROIChart();
                break;
            case 6:
                this.initScenarioChart();
                break;
        }
    }
    
    initBCGMatrix() {
        const ctx = document.getElementById('bcgMatrix');
        if (!ctx) return;
        
        // Destroy existing chart if it exists
        if (this.charts.bcgMatrix) {
            this.charts.bcgMatrix.destroy();
        }
        
        this.charts.bcgMatrix = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'India',
                    data: [{x: 85, y: 5}], // High growth, low market share
                    backgroundColor: '#1FB8CD',
                    borderColor: '#1FB8CD',
                    pointRadius: 20,
                    pointHoverRadius: 25
                }, {
                    label: 'Brazil',
                    data: [{x: 40, y: 15}], // Medium growth, medium market share
                    backgroundColor: '#FFC185',
                    borderColor: '#FFC185',
                    pointRadius: 15,
                    pointHoverRadius: 20
                }, {
                    label: 'Germany',
                    data: [{x: 10, y: 25}], // Low growth, high market share
                    backgroundColor: '#B4413C',
                    borderColor: '#B4413C',
                    pointRadius: 12,
                    pointHoverRadius: 17
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Market Growth vs Netflix Penetration',
                        font: { size: 16 }
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Market Growth Potential →'
                        },
                        min: 0,
                        max: 100
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Netflix Market Penetration (%) →'
                        },
                        min: 0,
                        max: 30
                    }
                },
                elements: {
                    point: {
                        hoverBorderWidth: 3
                    }
                }
            }
        });
    }
    
    initPricingChart() {
        const ctx = document.getElementById('pricingChart');
        if (!ctx) return;
        
        // Destroy existing chart if it exists
        if (this.charts.pricingChart) {
            this.charts.pricingChart.destroy();
        }
        
        this.charts.pricingChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['India', 'Brazil', 'Germany'],
                datasets: [{
                    label: 'Average Subscription Price ($)',
                    data: [4, 7, 12],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 2
                }, {
                    label: 'ARPU ($)',
                    data: [5, 8, 13],
                    backgroundColor: ['rgba(31, 184, 205, 0.5)', 'rgba(255, 193, 133, 0.5)', 'rgba(180, 65, 60, 0.5)'],
                    borderColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Pricing Strategy Comparison',
                        font: { size: 16 }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Price (USD) →'
                        }
                    }
                }
            }
        });
    }
    
    initContentROIChart() {
        const ctx = document.getElementById('contentROIChart');
        if (!ctx) return;
        
        // Destroy existing chart if it exists
        if (this.charts.contentROIChart) {
            this.charts.contentROIChart.destroy();
        }
        
        this.charts.contentROIChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['India ROI', 'Brazil ROI', 'Germany ROI'],
                datasets: [{
                    data: [3000, 2500, 2000],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 3,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Content ROI Comparison (%)',
                        font: { size: 16 }
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    initScenarioChart() {
        const ctx = document.getElementById('scenarioChart');
        if (!ctx) return;
        
        // Destroy existing chart if it exists
        if (this.charts.scenarioChart) {
            this.charts.scenarioChart.destroy();
        }
        
        // Generate projection data
        const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
        const bullCase = [100, 300, 600, 1200, 2000];
        const baseCase = [50, 200, 400, 800, 1400];
        const bearCase = [25, 100, 250, 500, 900];
        
        this.charts.scenarioChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Bull Case',
                    data: bullCase,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: false,
                    tension: 0.4,
                    borderWidth: 3
                }, {
                    label: 'Base Case',
                    data: baseCase,
                    borderColor: '#FFC185',
                    backgroundColor: 'rgba(255, 193, 133, 0.1)',
                    fill: false,
                    tension: 0.4,
                    borderWidth: 3
                }, {
                    label: 'Bear Case',
                    data: bearCase,
                    borderColor: '#B4413C',
                    backgroundColor: 'rgba(180, 65, 60, 0.1)',
                    fill: false,
                    tension: 0.4,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Revenue Projections by Scenario',
                        font: { size: 16 }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Revenue (USD Millions) →'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Timeline →'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
    
    // Cleanup method
    destroy() {
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.destroy();
            }
        });
        this.charts = {};
    }
}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        window.presentation = new NetflixPresentation();
        
        // Add some smooth transitions
        const slides = document.querySelectorAll('.slide');
        slides.forEach(slide => {
            slide.style.transition = 'opacity 0.3s ease-in-out';
        });
        
        // Handle resize events for charts
        window.addEventListener('resize', () => {
            if (window.presentation && window.presentation.charts) {
                Object.values(window.presentation.charts).forEach(chart => {
                    if (chart && typeof chart.resize === 'function') {
                        chart.resize();
                    }
                });
            }
        });
    }, 100);
});

// Export for potential external use
window.NetflixPresentation = NetflixPresentation;