import React from 'react';
import { useDataContext } from '../../context/DataContext';
import Stat from "../stats/Stat.js";
import { getAirQualityColor, getHumidityColor, getPressureColor, getUVIndexColor, getWindColor } from "../../utils/colorFunctions.js";

const Aside = () => {
    const { data, loading } = useDataContext();
    if (loading) return;

    const currentData = data.current;

    const stats = [
        { id: "precipitation", name: "Precipitation", data: currentData.precip_mm * 100, color: "", unit: "%" },
        { id: "wind", name: "Wind Speed", data: currentData.wind_kph, color: getWindColor(currentData.wind_kph), unit: `km/h ${currentData.wind_dir}` },
        { id: "humidity", name: "Humidity", data: currentData.humidity, color: getHumidityColor(currentData.humidity), unit: "%" },
        { id: "aqi", name: "Air Quality", data: currentData.air_quality['us-epa-index'], color: getAirQualityColor(currentData.air_quality['us-epa-index']), unit: "AQI (US-EPA)" },
        { id: "uv", name: "UV Index", data: currentData.uv, color: getUVIndexColor(currentData.uv), unit: "" },
        { id: "pressure", name: "Pressure", data: currentData.pressure_mb, color: getPressureColor(currentData.pressure_mb), unit: "mb" }
    ];


    const statListe = stats.map((stat) =>
        <Stat key={stat.id} id={stat.id} name={stat.name} color={stat.color} data={stat.data} unit={stat.unit} />
    )

    return (
        <aside className='statistics'>
            {statListe}
        </aside>
    );
};

export default Aside;
