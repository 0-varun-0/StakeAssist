const ctx = document.getElementById('stockChart').getContext('2d');
const currentStockValueDisplay = document.getElementById('currentStockValue');

// Generate mock stock prices and high-low values
function generateStockPrices(basePrice, fluctuation, count) {
    const prices = [];
    for (let i = 0; i < count; i++) {
        const open = parseFloat((basePrice + Math.random() * fluctuation - fluctuation / 2).toFixed(2));
        const close = parseFloat((basePrice + Math.random() * fluctuation - fluctuation / 2).toFixed(2));
        const high = Math.max(open, close, basePrice + Math.random() * fluctuation);
        const low = Math.min(open, close, basePrice - Math.random() * fluctuation);
        prices.push({ open, close, high, low });
        basePrice = close; // Keep the closing price for the next base
    }
    return prices;
}

// Initialize stock data
let labels = Array.from({ length: 50 }, (_, i) => `${10 + Math.floor(i / 6)}:${(i % 6) * 10} AM`);
let prices = generateStockPrices(5000, 50, labels.length);

// Function to render the candlestick chart
function renderChart() {
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Stock Prices (INR)',
                data: prices.map((p) => (p.high + p.low) / 2), // For reference
                borderColor: '#00000000', // Transparent line
                backgroundColor: prices.map((p) =>
                    p.close > p.open ? '#00e676' : '#ff5252'
                ),
                borderWidth: 1,
                barPercentage: 0.7,
                categoryPercentage: 0.8,
            },
        ],
    };

    // Custom candlestick drawing
    const plugins = {
        id: 'candlestick',
        beforeDraw(chart) {
            const { ctx, chartArea, scales } = chart;
            const xScale = scales.x;
            const yScale = scales.y;
            const candlestickWidth = xScale.width / labels.length;

            prices.forEach((price, index) => {
                const x = xScale.getPixelForValue(index);
                const openY = yScale.getPixelForValue(price.open);
                const closeY = yScale.getPixelForValue(price.close);
                const highY = yScale.getPixelForValue(price.high);
                const lowY = yScale.getPixelForValue(price.low);

                // Draw high-low line
                ctx.strokeStyle = price.close > price.open ? '#00e676' : '#ff5252';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x, highY);
                ctx.lineTo(x, lowY);
                ctx.stroke();

                // Draw open-close rectangle
                ctx.fillStyle = price.close > price.open ? '#00e676' : '#ff5252';
                ctx.fillRect(
                    x - candlestickWidth / 4,
                    Math.min(openY, closeY),
                    candlestickWidth / 2,
                    Math.abs(openY - closeY)
                );
            });
        },
    };

    return new Chart(ctx, {
        type: 'bar', // Dummy bar chart
        data,
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
            },
            scales: {
                x: { title: { display: true, text: 'Time' }, grid: { display: false } },
                y: { title: { display: true, text: 'Price (INR)' } },
            },
        },
        plugins: [plugins],
    });
}

// Render initial chart
let stockChart = renderChart();

// Function to update stock data
function updateStockData() {
    prices.shift(); // Remove the oldest data
    labels.shift();

    const now = new Date();
    labels.push(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} AM`);
    const newPrice = generateStockPrices(prices[prices.length - 1].close, 50, 1)[0];
    prices.push(newPrice);

    stockChart.destroy();
    stockChart = renderChart();

    // Update current stock value
    currentStockValueDisplay.textContent = newPrice.close.toFixed(2);
}

// Update chart every 3 seconds
setInterval(updateStockData, 9000);


// Animated Text (Typewriter Effect)
const typewriterText = "Enhancing Decisions, One Approval at a Time...";
let index = 0;

function typeText() {
    const target = document.getElementById('typewriter');
    if (index < typewriterText.length) {
        target.textContent += typewriterText[index];
        index++;
        setTimeout(typeText, 100);
    }
}

typeText();

// Rest of the stock chart code from the previous version remains the same...
