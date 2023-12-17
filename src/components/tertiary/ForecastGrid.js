import React, { useState } from 'react';
import { useDataContext } from '../../context/DataContext';
import ForecastDay from "./ForecastDay";
import { convertIconSVG } from "../../utils/iconManipulation";
import gsap from "gsap";

const ForecastGrid = () => {
    const { data, loading, option } = useDataContext();
    var tl = new gsap.timeline();
    const [seeMore, setSeeMore] = useState(false);
    const [seeMoreText, setSeeMoreText] = useState(false);
    if (loading) return;

    const handleSeeMore = () => {
        tl.add(function () { setSeeMoreText(!seeMore); })
        tl.fromTo(".small-glass", { opacity: 1, duration: 0.5 }, { opacity: 0, duration: 0.5 })
        tl.add(function () { setSeeMore(!seeMore); })
    };

    const forecastPath = data["forecast"]["forecastday"];
    const mode = option.mode;

    const forecastList = forecastPath.map((day, index) => {
        if (seeMore && index < 7) return null;
        if (!seeMore && index > 6) return null;

        return <ForecastDay
            key={day["date_epoch"]}
            id={index}
            max={day["day"]["maxtemp_" + mode]}
            min={day["day"]["mintemp_" + mode]}
            icon={convertIconSVG(day["day"]["condition"]["code"], 1)}
            info={day["day"]["condition"]["text"]}
            date={day["date"]}
        />
    }
    )

    return (
        <>
            {forecastList}
            <div className="see forecast-more flex-center" onClick={handleSeeMore} style={{ textAlign: "center" }}><span>{seeMoreText ? "See less" : "See more"}</span></div>
        </>
    );
};

export default ForecastGrid;
