const stocks = [
    { id: 0, name: "Logifetch", icon: "images/stocks/logifetch.webp", price: 60, owned: 0, history: [] },
    { id: 1, name: "Coarseair", icon: "images/stocks/coarseair.webp", price: 60, owned: 0, history: [] },
    { id: 2, name: "Laser", icon: "images/stocks/laser.webp", price: 60, owned: 0, history: [] },
    { id: 3, name: "PlasticSeries", icon: "images/stocks/plasticseries.webp", price: 60, owned: 0, history: [] },
    { id: 4, name: "Megasoft", icon: "images/stocks/megasoft.webp", price: 60, owned: 0, history: [] },
    { id: 5, name: "Pineapple", icon: "images/stocks/pineapple.webp", price: 60, owned: 0, history: [] },
    { id: 6, name: "HP Sauce", icon: "images/stocks/hp-sauce.webp", price: 60, owned: 0, history: [] },
    { id: 7, name: "Smell", icon: "images/stocks/smell.webp", price: 60, owned: 0, history: [] },
    { id: 8, name: "AS IF", icon: "images/stocks/as-if.webp", price: 60, owned: 0, history: [] },
    { id: 9, name: "Cooler Blaster", icon: "images/stocks/cooler-blaster.webp", price: 60, owned: 0, history: [] }
];


const maxStockPrice = 200;
const minStockPrice = 1;
const averageStockPrice = 60;
const maxStockOwned = 100;

/**
 * 1 dollar = 60 seconds of keystroke passive income.
 * @param {*} dollars 
 * @returns 
 */
function dollarsToKeystrokes(dollars) {
    return dollars * getPassiveIncome() / Tickrate * 60;
}

function initStockMarket() {
    const stockMarket = document.getElementById("stock-market-container");
    stocks.forEach((stock, index) => {
        const stockElement = document.createElement("div");
        stockElement.classList.add("stock");
        stockElement.style.backgroundImage = `url(${stock.icon})`;
        stockElement.innerHTML = `
        <div class="stock-info">
            <h3>${stock.name}</h3>
            <p>Price: <span id="stock-price-${index}">$${stock.price}</span></p>
            <p>Owned: <span id="stock-owned-${index}">${stock.owned}/${maxStockOwned}</span></p>
            <div class="stock-buttons">
              <p>Buy:</p>
              <button id="stock-${index}-buy-1" onclick="buyStock(${index}, 1)" onmouseover="showStockBuyTooltip(this, 1, stocks[${index}])" onmouseout="hideTooltip()">1</button>
              <button id="stock-${index}-buy-10" onclick="buyStock(${index}, 10)" onmouseover="showStockBuyTooltip(this, 10, stocks[${index}])" onmouseout="hideTooltip()">10</button>
              <button id="stock-${index}-buy-100" onclick="buyStock(${index}, 100)" onmouseover="showStockBuyTooltip(this, 100, stocks[${index}])" onmouseout="hideTooltip()">100</button>
            </div>
            <div class="stock-buttons">
              <p>Sell:</p>
              <button id="stock-${index}-sell-1" onclick="sellStock(${index}, 1)" onmouseover="showStockSellTooltip(this, 1, stocks[${index}])" onmouseout="hideTooltip()">1</button>
              <button id="stock-${index}-sell-10" onclick="sellStock(${index}, 10)" onmouseover="showStockSellTooltip(this, 10, stocks[${index}])" onmouseout="hideTooltip()">10</button>
              <button id="stock-${index}-sell-100" onclick="sellStock(${index}, 100)" onmouseover="showStockSellTooltip(this, 100, stocks[${index}])" onmouseout="hideTooltip()">100</button>
            </div>
            <!-- Add a canvas for the Chart.js chart -->
            <div class="stock-chart-container">
              <canvas id="stock-chart-${index}" width="300" height="150"></canvas>
            </div>
        </div>
        `;
        stockMarket.appendChild(stockElement);
    });
    // After the elements are created, initialize the charts
    initStockCharts();
    fluctuateStockPrices();
    setInterval(fluctuateStockPrices, 1000 * 60); // Update every minute
}

let stockCharts = []; // will hold our Chart.js objects

function initStockCharts() {
    stocks.forEach((stock, index) => {
        const ctx = document.getElementById(`stock-chart-${index}`).getContext("2d");
        
        const chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: [], // filled dynamically
                datasets: [{
                    label: stock.name,
                    data: [],  // price history
                    borderColor: "rgb(255, 215, 0)",
                    backgroundColor: "rgba(255, 215, 0, 0.2)",
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                animation: false,
                scales: {
                    x: {
                        display: false  // Hide X-axis labels (or use time axis if you prefer)
                    },
                    y: {
                        min: 1,         // Set minimum value on Y-axis
                        max: 200,       // Set maximum value on Y-axis
                    }
                },
                plugins: {
                    legend: {
                        display: false // Hide legend if you only have one dataset
                    }
                }
            }
        });

        stockCharts.push(chart);

        // Add initial loaded data.
        const dataset = chart.data.datasets[0];
        stock.history.forEach(price => {
            dataset.data.push(price);
            chart.data.labels.push("");
        });
        
        chart.update();
    });
}




function displayStockMarket() {
    if(StockMarket.level > 0) {
        document.getElementById("stock-tab").style.display = "block";
    }
    document.getElementById("dollarCost").textContent = formatShortScale(dollarsToKeystrokes(1));
    document.getElementById("stockProfitDollars").textContent = formatShortScale(stockProfitDollars);
    document.getElementById("stockProfitKeystrokes").textContent = formatShortScale(stockProfitKeystrokes);
    stocks.forEach((stock, index) => {
        document.getElementById(`stock-price-${index}`).textContent = `$${stock.price.toFixed(2)}`;
        document.getElementById(`stock-owned-${index}`).textContent = `${stock.owned}/${maxStockOwned}`;
        
        const buy1Button = document.getElementById(`stock-${index}-buy-1`);
        const buy10Button = document.getElementById(`stock-${index}-buy-10`);
        const buy100Button = document.getElementById(`stock-${index}-buy-100`);
        const sell1Button = document.getElementById(`stock-${index}-sell-1`);
        const sell10Button = document.getElementById(`stock-${index}-sell-10`);
        const sell100Button = document.getElementById(`stock-${index}-sell-100`);
        
        buy1Button.disabled = keystrokesBank < dollarsToKeystrokes(stock.price);
        buy10Button.disabled = keystrokesBank < dollarsToKeystrokes(stock.price * 10);
        buy100Button.disabled = keystrokesBank < dollarsToKeystrokes(stock.price * 100);
        
        sell1Button.disabled = stock.owned < 1;
        sell10Button.disabled = stock.owned < 10;
        sell100Button.disabled = stock.owned < 100;
        
    });
}


function fluctuateStockPrices() {
    stocks.forEach((stock, index) => {
        const fluctuation = (Math.random() - 0.5) * 10; // Random fluctuation between -5 and +5
        stock.price = Math.max(minStockPrice, Math.min(maxStockPrice, stock.price + fluctuation));

        // Update the price history
        stock.history.push(stock.price);
        if (stock.history.length > 50) {   // keep only the last 50 points, for example
            stock.history.shift();
        }
        
        // Update the chart data
        const chart = stockCharts[index];
        const dataset = chart.data.datasets[0];
        
        // Add new data point
        dataset.data.push(stock.price);
        if (dataset.data.length > 50) {
            dataset.data.shift();
        }
        
        // Add a blank label or a time label
        chart.data.labels.push(""); 
        if (chart.data.labels.length > 50) {
            chart.data.labels.shift();
        }
        
        // Finally, update the chart
        chart.update();
    });
}

function buyStock(stockIndex, amount) {
    const stock = stocks[stockIndex];
    const cost = dollarsToKeystrokes(stock.price * amount);
    if (keystrokesBank >= cost && stock.owned + amount <= maxStockOwned) {
        stockProfitDollars -= stock.price * amount;
        stockProfitKeystrokes -= cost
        keystrokesBank -= cost;
        stock.owned += amount;
    }
}

function sellStock(stockIndex, amount) {
    const stock = stocks[stockIndex];
    if (stock.owned >= amount) {
        const revenue = dollarsToKeystrokes(stock.price * amount);
        stockProfitDollars += stock.price * amount;
        stockProfitKeystrokes += revenue;
        keystrokesBank += revenue;
        stock.owned -= amount;
    }
}
