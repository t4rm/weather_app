import React from 'react';
import { useDataContext } from '../../context/DataContext';
import Stat from "./Stat";
import { getCOColor, getNO2Color, getOzoneColor, getPM10Color, getPM25Color, getSO2Color } from '../../utils/colorFunctions';

const AQIStats = () => {
    const { data, loading } = useDataContext();
    if (loading) return;

    const currentData = data.current;
    const currentAirQuality = currentData.air_quality

    const statsAQI = [
        { name: "co", data: currentAirQuality.co, color: getCOColor(currentAirQuality.co), unit: "µg/m³" },
        { name: "no2", data: currentAirQuality.no2, color: getNO2Color(currentAirQuality.no2), unit: "µg/m³" },
        { name: "o3", data: currentAirQuality.o3, color: getOzoneColor(currentAirQuality.o3), unit: "µg/m³" },
        { name: "so2", data: currentAirQuality.so2, color: getSO2Color(currentAirQuality.so2), unit: "µg/m³" },
        { name: "pm2_5", data: currentAirQuality.pm2_5, color: getPM25Color(currentAirQuality.pm2_5), unit: "µg/m³" },
        { name: "pm10", data: currentAirQuality.pm10, color: getPM10Color(currentAirQuality.pm10), unit: "µg/m³" }
    ]

    return (
        <div className='aqi-container'>
            <div className='aqi-stats glass noblur'>
                {statsAQI.map((stat) =>
                    <Stat key={stat.name} name={stat.name.toUpperCase()} color={stat.color} data={stat.data} unit={stat.unit} />
                )}
            </div>
        </div>
    );
};

export default AQIStats;
