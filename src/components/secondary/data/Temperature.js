import { getTemperatureColor } from "../../../utils/colorFunctions";

let width, height, gradient;


// Return a gradient for an array of temperatures based on the temperature colors from colorFunctions
function getGradientTemperature(ctx, chartArea, data) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    const pointval = 1/data.length;
    
    if (!gradient || width !== chartWidth || height !== chartHeight) {
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

        data.forEach((temperature, index) => {
          gradient.addColorStop(pointval*index, getTemperatureColor(temperature));
        });
    }

    return gradient;
}

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
            return getGradientTemperature(ctx, chartArea, data.datasets[0].data);
        },
      }
    ]
  }
