/**
 * Gerenciamento de gráficos com Chart.js
 */

let barChart, pieChart, barHorizontalChart, lineChart;

// Configuração comum para todos os gráficos
const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        }
    }
};

// Cria gráfico de barras para chamados por projeto
function createBarChart(data) {
    const ctx = document.getElementById('barChart').getContext('2d');
    
    const metrics = calculateSLAMetrics(data);
    const projetos = Object.keys(metrics.chamadosPorProjeto);
    const contagens = Object.values(metrics.chamadosPorProjeto);

    const chartData = {
        labels: projetos,
        datasets: [{
            label: 'Chamados por Projeto',
            data: contagens,
            backgroundColor: 'rgba(52, 152, 219, 0.5)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 1
        }]
    };

    if (barChart) {
        barChart.destroy();
    }

    barChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            ...commonOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Quantidade de Chamados'
                    }
                }
            }
        }
    });
}

// Cria gráfico de pizza para chamados por status
function createPieChart(data) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    
    const metrics = calculateSLAMetrics(data);
    const status = Object.keys(metrics.chamadosPorStatus);
    const contagens = Object.values(metrics.chamadosPorStatus);

    const chartData = {
        labels: status,
        datasets: [{
            data: contagens,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    if (pieChart) {
        pieChart.destroy();
    }

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: commonOptions
    });
}

// Cria gráfico de barras horizontais para chamados por squad
function createBarHorizontalChart(data) {
    const ctx = document.getElementById('barHorizontalChart').getContext('2d');
    
    const metrics = calculateSLAMetrics(data);
    const squads = Object.keys(metrics.chamadosPorSquad);
    const contagens = Object.values(metrics.chamadosPorSquad);

    const chartData = {
        labels: squads,
        datasets: [{
            label: 'Chamados por Squad',
            data: contagens,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    if (barHorizontalChart) {
        barHorizontalChart.destroy();
    }

    barHorizontalChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            ...commonOptions,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Quantidade de Chamados'
                    }
                }
            }
        }
    });
}

// Cria gráfico de linhas para chamados abertos/fechados por mês
function createLineChart(data) {
    const ctx = document.getElementById('lineChart').getContext('2d');
    
    const metrics = calculateSLAMetrics(data);
    const meses = Object.keys(metrics.chamadosPorMes).sort();
    const abertos = meses.map(mes => metrics.chamadosPorMes[mes].abertos);
    const fechados = meses.map(mes => metrics.chamadosPorMes[mes].fechados);

    const chartData = {
        labels: meses,
        datasets: [
            {
                label: 'Chamados Abertos',
                data: abertos,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.1
            },
            {
                label: 'Chamados Fechados',
                data: fechados,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.1
            }
        ]
    };

    if (lineChart) {
        lineChart.destroy();
    }

    lineChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            ...commonOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Quantidade de Chamados'
                    }
                }
            }
        }
    });
}

// Atualiza todos os gráficos
function updateCharts(data) {
    if (!data || data.length === 0) return;

    createBarChart(data);
    createPieChart(data);
    createBarHorizontalChart(data);
    createLineChart(data);
} 