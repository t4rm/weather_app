import React from 'react';
// eslint-disable-next-line
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2';

const CanvasChart = (props) => {
  return (
    <div className={props.class}>
      <h3>{props.name}{props.unit.length > 0 ? ", "+props.unit:""}</h3>
      <div className='chart-container' style={{ position: "relative", height: "19vh" }}>
        <Chart id={props.id}
          type={props.type}
          data={props.data}
          options={props.options}
        />
      </div>
    </div>
  );
};

export default CanvasChart;
