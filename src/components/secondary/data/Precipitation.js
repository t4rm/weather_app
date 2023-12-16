export const options = {
    scales: {
        x: {
            grid: {
                display: false
            },

        },
        y: {
            display: false,
            max: 100
        },
    },

    plugins: {
        legend: {
            display: false
        }
    },
    responsive: true,
    maintainAspectRatio: false
}

export const data = {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    datasets: [{
        data: [],
        label: "Precipitation (%)",
        tension: 0.4,
    }]
}