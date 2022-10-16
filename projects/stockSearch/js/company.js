const URLs =  window.location.search;
const sym4bol = window.location.search;
const urlParams = new URLSearchParams(URLs);
const symbol = urlParams.get('symbol')
const spinnerData = document.getElementById("spinnerData");
const spinnerChart = document.getElementById("spinnerChart");

const url_stock = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
const url_chart = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`

window.addEventListener('load', (event) => {
  updateChart();
  outToServer();
});

function outToServer() {
    spinnerData.classList.remove('d-none')
    spinnerChart.classList.remove('d-none')
    fetch(url_stock)
        .then(response => response.json())
        .then(data => {
          const d = data.profile; 
          let img = new Image();
          img.src = d.image;
          imageContainer.appendChild(img);
          img.setAttribute("id", "companyImage");
            img.innerHTML = companyImage;

            let companyName = document.getElementById("companyName");
            companyName.innerHTML = d.companyName;
            let stockPrice = document.getElementById("stockPrice");
            stockPrice.innerHTML = d.price;
            let sector = document.getElementById("sector");
            sector.innerHTML = d.sector;
            let description = document.getElementById("description");
            description.innerHTML = d.description;
            let companyLink = document.getElementById("companyLink");
            companyLink.innerHTML = d.website;
            let PricePChange = document.getElementById("changeValue");
            let colorChange = document.getElementById("changeValue");
          
            let profileChangesPercent = Number(d.changesPercentage);
            let changePs = profileChangesPercent.toFixed(2);
              if (changePs >= 0) {
                  colorChange.style.color = 'green'
            } else if (changePs < 0) {
                  colorChange.style.color = 'red';
            }

          PricePChange.innerHTML = `${changePs}%`;
          spinnerData.classList.add('d-none')
        })
}

function updateChart() {
  async function fetchData() {
        const response = await fetch(url_chart);
        const dataPoints = await response.json();
        myChart.config.data.label = `Historical Stock Price Of ${response['symbol']}`;
        return dataPoints;
    };
    fetchData().then(dataPoints => {
        const date = dataPoints.historical.map(function (index) {
            return index.date;
        })
        const close = dataPoints.historical.map(function (index) {
            return index.close;
        })
        myChart.config.data.labels = date.reverse();
        myChart.config.data.datasets[0].data = close.reverse();
        myChart.update();
        spinnerChart.classList.add('d-none')
})}
            const myLineChart = document.getElementById('myChart')
            const ctx = document.getElementById('myChart');
            const myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                datasets: [{
                  label: `Stock Price Chart`,
                  data: '',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  showLine: false,
                  tension: 0.4,
                  borderWidth: 0.6,
                }]
              },
              options: {
                scales: {  
                }
              }
            })

    





   






