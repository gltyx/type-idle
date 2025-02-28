const stocks = [
    { id: 0, name: "Logifetch", nameref: "Logitech", icon: "/images/stocks/logifetch.webp", price: 60, owned: 0, history: [] },
    { id: 1, name: "Coarseair", nameref: "Corsair", icon: "/images/stocks/coarseair.webp", price: 60, owned: 0, history: [] },
    { id: 2, name: "Laser", nameref: "Razer", icon: "/images/stocks/laser.webp", price: 60, owned: 0, history: [] },
    { id: 3, name: "PlasticSeries", nameref: "SteelSeries", icon: "/images/stocks/plasticseries.webp", price: 60, owned: 0, history: [] },
    { id: 4, name: "Megasoft", nameref: "Microsoft", icon: "/images/stocks/megasoft.webp", price: 60, owned: 0, history: [] },
    { id: 5, name: "Pineapple", nameref: "Apple", icon: "/images/stocks/pineapple.webp", price: 60, owned: 0, history: [] },
    { id: 6, name: "HP Sauce", nameref: "HP", icon: "/images/stocks/hp-sauce.webp", price: 60, owned: 0, history: [] },
    { id: 7, name: "Smell", nameref: "Dell", icon: "/images/stocks/smell.webp", price: 60, owned: 0, history: [] },
    { id: 8, name: "AS IF", nameref: "Asus", icon: "/images/stocks/as-if.webp", price: 60, owned: 0, history: [] },
    { id: 9, name: "Cooler Blaster", nameref: "Cooler Master", icon: "/images/stocks/cooler-blaster.webp", price: 60, owned: 0, history: [] }
];

// New transaction history array
const transactionHistory = [];

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
    return dollars * getPassiveIncomeWithoutTempBoosts();
}

function keystrokesToDollars(keystrokes) {
    return keystrokes / getPassiveIncomeWithoutTempBoosts();
}

function initStockMarket() {
    const stockMarket = document.getElementById("stock-market-container");
    stocks.forEach((stock, index) => {
        const stockElement = document.createElement("div");
        stockElement.classList.add("stock");
        //<span class="stock-reference">${stock.nameref}</span>
        stockElement.innerHTML = `
        <div class="stock-header" style="background-image: url(${stock.icon})">
            <h3>${stock.name}</h3>
        </div>
        <div class="stock-info" id="stock-${index}">
            <div class="stock-price-container">
                <p class="stock-price-label">Current Price:</p>
                <p class="stock-price"><span id="stock-price-${index}">$${stock.price.toFixed(2)}</span></p>
                <p class="stock-change"><span id="stock-change-${index}">0.00%</span> <span id="stock-arrow-${index}">◆</span></p>
            </div>
            <p class="stock-holdings">Owned: <span id="stock-owned-${index}">${stock.owned}/${maxStockOwned}</span></p>
            <div class="stock-chart-container">
              <canvas id="stock-chart-${index}" width="300" height="150"></canvas>
            </div>
            <div class="stock-controls">
                <div class="stock-action-group">
                    <p>Buy:</p>
                    <div class="stock-buttons">
                        <button id="stock-${index}-buy-1" onclick="buyStock(${index}, 1)" onmouseover="showStockBuyTooltip(document.getElementById('stock-${index}'), 1, stocks[${index}])" onmouseout="hideTooltip()">1</button>
                        <button id="stock-${index}-buy-10" onclick="buyStock(${index}, 10)" onmouseover="showStockBuyTooltip(document.getElementById('stock-${index}'), 10, stocks[${index}])" onmouseout="hideTooltip()">10</button>
                        <button id="stock-${index}-buy-100" onclick="buyStock(${index}, 100)" onmouseover="showStockBuyTooltip(document.getElementById('stock-${index}'), 100, stocks[${index}])" onmouseout="hideTooltip()">100</button>
                    </div>
                </div>
                <div class="stock-action-group">
                    <p>Sell:</p>
                    <div class="stock-buttons">
                        <button id="stock-${index}-sell-1" onclick="sellStock(${index}, 1)" onmouseover="showStockSellTooltip(document.getElementById('stock-${index}'), 1, stocks[${index}])" onmouseout="hideTooltip()">1</button>
                        <button id="stock-${index}-sell-10" onclick="sellStock(${index}, 10)" onmouseover="showStockSellTooltip(document.getElementById('stock-${index}'), 10, stocks[${index}])" onmouseout="hideTooltip()">10</button>
                        <button id="stock-${index}-sell-100" onclick="sellStock(${index}, 100)" onmouseover="showStockSellTooltip(document.getElementById('stock-${index}'), 100, stocks[${index}])" onmouseout="hideTooltip()">100</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        stockMarket.appendChild(stockElement);
    });
    
    // Create transaction history section
    const stockPage = document.getElementById("stockPage");
    const transactionSection = document.createElement("div");
    transactionSection.id = "transaction-history-section";
    transactionSection.innerHTML = `
        <h2>Transaction History</h2>
        <div class="transaction-filters">
            <button id="filter-all-transactions" class="active" onclick="filterTransactions('all')">All</button>
            <button id="filter-buy-transactions" onclick="filterTransactions('buy')">Buy</button>
            <button id="filter-sell-transactions" onclick="filterTransactions('sell')">Sell</button>
        </div>
        <div class="transaction-list" id="transaction-list"></div>
    `;
    stockPage.appendChild(transactionSection);
    
    // After the elements are created, initialize the charts
    initStockCharts();
    fluctuateStockPrices();
    setInterval(fluctuateStockPrices, 1000 * 60); // Update every minute
    
    // Initialize transaction history
    displayTransactionHistory();
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
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                scales: {
                    x: {
                        display: false  // Hide X-axis labels (or use time axis if you prefer)
                    },
                    y: {
                        min: 1,         // Set minimum value on Y-axis
                        max: 200        // Set maximum value on Y-axis
                    }
                },
                plugins: {
                    legend: {
                        display: false // Hide legend if you only have one dataset
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
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
        document.getElementById("stock-tab").disabled = false;
    }
    document.getElementById("dollarCost").textContent = formatShortScale(dollarsToKeystrokes(1));
    document.getElementById("stockCurrentKeystrokes").textContent = formatShortScale(keystrokesBank);
    document.getElementById("stockCurrentDollars").textContent = formatShortScale(keystrokesToDollars(keystrokesBank));
    document.getElementById("stockProfitDollars").textContent = formatShortScale(stockProfitDollars);
    document.getElementById("stockProfitKeystrokes").textContent = formatShortScale(stockProfitKeystrokes);
    stocks.forEach((stock, index) => {
        document.getElementById(`stock-price-${index}`).textContent = `$${stock.price.toFixed(2)}`;
        document.getElementById(`stock-owned-${index}`).textContent = `${stock.owned}/${maxStockOwned}`;
        
        // Update price change indicator
        if (stock.history.length >= 2) {
            const currentPrice = stock.price;
            const previousPrice = stock.history[stock.history.length - 2] || currentPrice;
            const priceChange = currentPrice - previousPrice;
            const priceChangePercent = (priceChange / previousPrice) * 100;
            
            const changeElement = document.getElementById(`stock-change-${index}`);
            const arrowElement = document.getElementById(`stock-arrow-${index}`);
            
            changeElement.textContent = `${Math.abs(priceChangePercent).toFixed(2)}%`;
            
            if (priceChange > 0) {
                changeElement.classList.remove('negative');
                changeElement.classList.add('positive');
                arrowElement.textContent = '▲';
                arrowElement.classList.remove('negative');
                arrowElement.classList.add('positive');
            } else if (priceChange < 0) {
                changeElement.classList.remove('positive');
                changeElement.classList.add('negative');
                arrowElement.textContent = '▼';
                arrowElement.classList.remove('positive');
                arrowElement.classList.add('negative');
            } else {
                changeElement.classList.remove('positive', 'negative');
                arrowElement.textContent = '◆';
                arrowElement.classList.remove('positive', 'negative');
            }
        }
        
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
        const previousPrice = stock.price;
        const fluctuation = (Math.random() - 0.5) * 10; // Random fluctuation between -5 and +5
        stock.price = Math.max(minStockPrice, Math.min(maxStockPrice, stock.price + fluctuation));

        // Update the price history
        stock.history.push(stock.price);
        if (stock.history.length > 50) {   // keep only the last 50 points
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
    playClickSound();
    const stock = stocks[stockIndex];
    const cost = dollarsToKeystrokes(stock.price * amount);
    if (keystrokesBank >= cost && stock.owned + amount <= maxStockOwned) {
        stockProfitDollars -= stock.price * amount;
        stockProfitKeystrokes -= cost
        keystrokesBank -= cost;
        stock.owned += amount;
        
        // Record transaction
        addTransaction('buy', stock, amount, stock.price, cost);
        
        displayTransactionHistory();
    }
}

function sellStock(stockIndex, amount) {
    playClickSound();
    const stock = stocks[stockIndex];
    if (stock.owned >= amount) {
        const revenue = dollarsToKeystrokes(stock.price * amount);
        stockProfitDollars += stock.price * amount;
        stockProfitKeystrokes += revenue;
        keystrokesBank += revenue;
        stock.owned -= amount;
        
        // Record transaction
        addTransaction('sell', stock, amount, stock.price, revenue);
        
        displayTransactionHistory();
    }
}

// Transaction history functions
function addTransaction(type, stock, amount, price, keystrokesValue) {
    const transaction = {
        id: transactionHistory.length,
        type: type,
        stockId: stock.id,
        stockName: stock.name,
        amount: amount,
        price: price,
        totalDollars: price * amount,
        totalKeystrokes: keystrokesValue,
        timestamp: Date.now()
    };
    
    transactionHistory.unshift(transaction); // Add to beginning of array
    
    // Limit history size to prevent memory issues
    if (transactionHistory.length > 100) {
        transactionHistory.pop();
    }
}

function displayTransactionHistory(filter = 'all') {
    const transactionList = document.getElementById('transaction-list');
    if (!transactionList) return;
    
    transactionList.innerHTML = '';
    
    if (transactionHistory.length === 0) {
        transactionList.innerHTML = '<div class="no-transactions">No transactions recorded yet</div>';
        return;
    }
    
    const filteredTransactions = filter === 'all' 
        ? transactionHistory 
        : transactionHistory.filter(t => t.type === filter);
        
    filteredTransactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.classList.add('transaction-item', transaction.type);
        
        const date = new Date(transaction.timestamp);
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        
        transactionItem.innerHTML = `
            <div class="transaction-icon ${transaction.type}"></div>
            <div class="transaction-details">
                <div class="transaction-header">
                    <span class="transaction-stock">${transaction.stockName}</span>
                    <span class="transaction-date">${formattedDate}</span>
                </div>
                <div class="transaction-info">
                    <span class="transaction-type">${transaction.type === 'buy' ? 'Purchased' : 'Sold'} ${transaction.amount} shares</span>
                    <span class="transaction-price">@ $${transaction.price.toFixed(2)}</span>
                </div>
                <div class="transaction-total">
                    <span>Total: $${transaction.totalDollars.toFixed(2)}</span>
                    <span>(${formatShortScale(transaction.totalKeystrokes)} keystrokes)</span>
                </div>
            </div>
        `;
        
        transactionList.appendChild(transactionItem);
    });
}

function filterTransactions(filter) {
    // Update active button
    document.getElementById('filter-all-transactions').classList.remove('active');
    document.getElementById('filter-buy-transactions').classList.remove('active');
    document.getElementById('filter-sell-transactions').classList.remove('active');
    document.getElementById(`filter-${filter}-transactions`).classList.add('active');
    
    // Display filtered transactions
    displayTransactionHistory(filter);
}

// Add this to the save.js loadGame function
function loadTransactionHistory(savedTransactions) {
    if (savedTransactions) {
        transactionHistory.length = 0; // Clear existing
        savedTransactions.forEach(transaction => transactionHistory.push(transaction));
    }
}
