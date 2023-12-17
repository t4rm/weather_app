import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2';
import { getTemperatureColor } from "../../utils/colorFunctions";

// Return a gradient for an array of temperatures based on the temperature colors from colorFunctions
function getGradientTemperature(chart, data, mode) {
  const { ctx, chartArea } = chart;
  if (!chartArea) return;
  const pointval = 1 / data.length;
  let gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);


  const sortedData = [...data].sort(function (a, b) {
    return a - b;
  });

  sortedData.forEach((temperature, index) => {
    gradient.addColorStop(pointval * index, getTemperatureColor(temperature, mode));
  });

  return gradient;
}


const CanvasChart = (props) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.data.datasets[0]["data"] = props.data.datasets[0]["data"]
      // Upon each update of the Temperature chart, we update the colors accordingly :
      if (chart.data.datasets[0].label === "Temperature") {
        chart.data.datasets[0]["borderColor"] = getGradientTemperature(chart, props.data.datasets[0]["data"], props.mode)
      }

      chart.update()
    }
  }, [props]);

  return (
    <div className={props.class}>
      <h3>{props.name}{props.unit.length > 0 ? ", " + props.unit : ""}</h3>
      <div className='chart-container' style={{ position: "relative", height: "19vh" }}>
        <Chart id={props.id}
          type={props.type}
          data={props.data}
          options={props.options}
          ref={chartRef}
        />
      </div>
    </div>
  );
};

export default CanvasChart;
