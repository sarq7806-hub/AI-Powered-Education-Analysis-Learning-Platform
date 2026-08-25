// Function to load example data
function loadExampleData() {
  document.getElementById('skill1').value = 70;
  document.getElementById('skill2').value = 80;
  document.getElementById('skill3').value = 60;
  document.getElementById('skill4').value = 50;
}

// Generate charts based on input data
function generateCharts() {
  const dataPoints = [
    parseInt(document.getElementById('skill1').value),
    parseInt(document.getElementById('skill2').value),
    parseInt(document.getElementById('skill3').value),
    parseInt(document.getElementById('skill4').value)
  ];

  // Calculate average for summary
  const total = dataPoints.reduce((a, b) => a + b, 0);
  const avg = (total / dataPoints.length).toFixed(1);

  document.getElementById('summary').innerText = `Your average skill score is ${avg}%. Keep improving!`;

  // Doughnut Chart: Performance Breakdown
  if(window.doughnutChartInstance) {
    window.doughnutChartInstance.destroy();
  }
  const ctx1 = document.getElementById('doughnutChart').getContext('2d');
  window.doughnutChartInstance = new Chart(ctx1, {
    type: 'doughnut',
    data: {
      labels: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4'],
      datasets: [{
        data: dataPoints,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ],
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });

  // Bar Chart: Skills Comparison
  if(window.barChartInstance) {
    window.barChartInstance.destroy();
  }
  const ctx2 = document.getElementById('barChart').getContext('2d');
  window.barChartInstance = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4'],
      datasets: [{
        label: 'Score',
        data: dataPoints,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}