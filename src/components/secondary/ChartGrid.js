import React, { useState, useEffect } from 'react';
import { useDataContext } from '../../context/DataContext';
import CanvasChart from "./CanvasChart.js";
import SunPath from "./SunPath.js"
import { data as dataTemperature, options as optionsTemperature } from "./data/Temperature.js";
import { data as dataUV, options as optionsUV } from "./data/UVData.js";
import { data as dataPrecipitation, options as optionsPrecipitation } from "./data/Precipitation.js";
import { convertForecastDataToChartArray } from '../../utils/dataManipulation.js';

const ChartGrid = () => {
  const { data, loading, option } = useDataContext();
  let [chartList, setChartList] = useState([])

  useEffect(() => {

    const forecastData = data.forecast;
    const temperatureChartData = convertForecastDataToChartArray(forecastData, "temp_" + option.mode);
    const UVChartData = convertForecastDataToChartArray(forecastData, "uv").splice(7, 12)
    const precipitationChartData = convertForecastDataToChartArray(forecastData, "precip_mm");

    dataUV["datasets"][0]["data"] = UVChartData;
    dataUV["datasets"][0]["backgroundColor"] = [];
    dataTemperature["datasets"][0]["data"] = temperatureChartData;
    dataPrecipitation["datasets"][0]["data"] = precipitationChartData.map((num) => { return num * 100 });

    setChartList([
      { id: "tempChart", name: "Temperature", unit: option.mode.toUpperCase(), class: "sec", type: "line", data: dataTemperature, options: optionsTemperature },
      { id: "uvChart", name: "UV Index", unit: "", class: "sec3", type: "bar", data: dataUV, options: optionsUV },
      { id: "precipChart", name: "Precipitation", unit: "%", class: "sec4", type: "line", data: dataPrecipitation, options: optionsPrecipitation }
    ])

  }, [data, option])

  if (loading) return;

  return (
    <>
      {chartList.map((chart) =>
        <CanvasChart key={chart.id} id={chart.id} name={chart.name} unit={chart.unit} class={chart.class} type={chart.type} data={chart.data} options={chart.options} mode={option.mode}/>
      )}
      <SunPath />
    </>
  );
};

export default ChartGrid;
