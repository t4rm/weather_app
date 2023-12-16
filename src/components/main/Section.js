import React from 'react';
import { useDataContext } from '../../context/DataContext';
import { convertIconSVG } from '../../utils/iconManipulation';
import { getTemperatureColor } from "../../utils/colorFunctions";
const Section = () => {
  const { data, loading, option } = useDataContext();
  if (loading) return;

  const mode = option.mode;
  const currentDay = new Date();
  const currentData = data.current;
  const currentHour = currentDay.toLocaleTimeString('en-us', { hour: "numeric", minute: "numeric" })
  const currentWeatherStatus = currentData.condition.text;
  const currentWeatherIconCode = currentData.condition.code;
  const currentIsDay = currentData.is_day;

  let iconSVG = convertIconSVG(currentWeatherIconCode, currentIsDay);
  iconSVG = "assets/images/weather/" + iconSVG;

  let currentTemp; let currentFeels;
  if (mode === "c") {
    currentTemp = currentData.temp_c;
    currentFeels = currentData.feelslike_c;
  } else {
    currentTemp = currentData.temp_f;
    currentFeels = currentData.feelslike_c;
  }

  const currentTempColor = getTemperatureColor(currentTemp, mode);

  // Short data processing to get colors indication from numbers :

  return (
    <section className='weather'>
      <h3>{currentHour}</h3>
      <figure className='icon'>
        <img src={iconSVG} alt='Weather icon' />
        <figcaption>{currentWeatherStatus}</figcaption>
      </figure>
      <div className='state' style={{ color: currentTempColor }}>
        <p className='operator'>{currentTemp < 0 ? "-" : "+"}</p>
        <h1>{currentTemp}</h1>
        <p className='degree'>°{mode.toUpperCase()}</p>
      </div>
      <span className='feels'>Feels like {currentFeels < 0 ? "-" : "+"} {currentFeels}</span>
    </section>
  );
};

export default Section;
