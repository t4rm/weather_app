import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2';

const CanvasChart = (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {

      chart.data.datasets[0]["data"] = props.data.datasets[0]["data"]
      // chart.options.scales.y.max = 10
      // chart.options.scales.y.min = -10
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
