export const options = {
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        callback: function (value, index, ticks) {
          return value + ":00";
        }
      },
    },
    y: {
      // min: 20 * -1,
      // max: 40,
      display: false
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
  datasets: [
    {
      data: [],
      label: "Temperature",
      bool: null,
      tension: 0.4,
      borderColor: []
      // borderColor: function (context) {
      //   const chart = context.chart;
      //   const {
      //     ctx,
      //     chartArea
      //   } = chart;

      //   if (!chartArea) {
      //     return;
      //   }
      //   return getGradientTemperature(ctx, chartArea, data.datasets[0].data, data.datasets[0].bool);
      // },
    }
  ]
}
