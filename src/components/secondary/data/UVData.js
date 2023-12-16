export const options = {
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
}

export const data = {
    labels: [7,8,9,10,11,12,13,14,15,16,17,18],
    datasets: [{
        data: [],
        label: "UV",
        backgroundColor: []
    }]
}