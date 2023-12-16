import React from 'react';
import { useDataContext } from '../../context/DataContext';
import CanvasChart from "./CanvasChart.js";
import SunPath from "./SunPath.js"
import { data as dataTemperature, options as optionsTemperature } from "./data/Temperature.js";
import { data as dataUV, options as optionsUV } from "./data/UVData.js";
import { data as dataPrecipitation, options as optionsPrecipitation } from "./data/Precipitation.js";
import { convertForecastDataToChartArray } from '../../utils/dataManipulation.js';
import { getUVIndexColor } from "../../utils/colorFunctions.js";

const ChartGrid = () => {
  const { data, loading, option } = useDataContext();
  if (loading) return;

  const chartList = [
    { id: "tempChart", name: "Temperature", unit: option.mode.toUpperCase(), class: "sec", type: "line", data: dataTemperature, options: optionsTemperature },
    { id: "uvChart", name: "UV Index", unit: "", class: "sec3", type: "bar", data: dataUV, options: optionsUV },
    { id:"precipChart", name: "Precipitation", unit: "%", class: "sec4", type:"line", data: dataPrecipitation, options: optionsPrecipitation}
  ]

  const forecastData = data.forecast;

  const temperatureChartData = convertForecastDataToChartArray(forecastData, "temp_" + option.mode);
  dataTemperature["datasets"][0]["data"] = temperatureChartData;

  const UVChartData = convertForecastDataToChartArray(forecastData, "uv").splice(7, 12)
  const UVChartColors = UVChartData.map((uv) => {
    return getUVIndexColor(uv)
  });

  dataUV["datasets"][0]["data"] = UVChartData;
  dataUV["datasets"][0]["backgroundColor"] = UVChartColors;

  const precipitationChartData = convertForecastDataToChartArray(forecastData, "precip_mm");
  dataPrecipitation["datasets"][0]["data"] = precipitationChartData.map((num) => {return num*100});
  

  return (
    <>
      {chartList.map((chart) =>
        <CanvasChart key={chart.id} id={chart.id} name={chart.name} unit={chart.unit} class={chart.class} type={chart.type} data={chart.data} options={chart.options} />
      )}
      <SunPath/>
    </>
  );
};

export default ChartGrid;
