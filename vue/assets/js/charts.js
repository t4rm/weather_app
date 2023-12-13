// Création d'un graphique pour la température
const xValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const oddXValues = xValues.filter((num, i) => i % 2 === 1)

let width, height, gradient;

function getGradient(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, "#dbdbff");
        gradient.addColorStop(0.1, "#add6ff");
        gradient.addColorStop(0.3, "#a4b7ff");
        gradient.addColorStop(0.4, "#99ccff");
        gradient.addColorStop(0.5, "#99ff99");
        gradient.addColorStop(0.6, "#66ff66");
        gradient.addColorStop(0.7, "#ffff66");
        gradient.addColorStop(0.8, "#ff9900");
        gradient.addColorStop(1, "#ff3300");
    }

    return gradient;
}

new Chart("tempChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            data: yValues,
            label: "Temperature",
            tension: 0.4,
            borderColor: function (context) {
                const chart = context.chart;
                const {
                    ctx,
                    chartArea
                } = chart;

                if (!chartArea) {
                    return;
                }
                return getGradient(ctx, chartArea);
            },
        }],
    },
    options: {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, ticks) {
                        return value + ":00";
                    }
                },
            },
            y: {
                display: false
                // max: 11
            },
        },

        plugins: {
            legend: {
                display: false
            }
        },
        responsive: true,
        maintainAspectRatio: false
    },

});

// 

const tmp = xValues.splice(7,12);

new Chart("uvChart", {
    type: "bar",
    data: {
        labels: tmp,
        datasets: [{
            data: uvValues.splice(7, 12),
            label: "UV",
            backgroundColor: uvColorValues.splice(7, 12)
        }],
    },
    options: {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    beginAtZero: false,
                },

            },
            y: {
                display: false,
            },
        },

        plugins: {
            legend: {
                display: false
            }
        },
        maintainAspectRatio: false,
        responsive: true

    },
});


// 
let precipitationValuesPerc = (precipitationValues).map(function (num) {return num * 100})

new Chart("precipChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            data: precipitationValuesPerc,
            label: "Precipitation (%)",
            tension: 0.4,

        }],
    },
    options: {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false
                },

            },
            y: {
                display: false,
                // max: 11
            },
        },

        plugins: {
            legend: {
                display: false
            }
        },
        responsive: true,
        maintainAspectRatio: false
    },
});

// 
