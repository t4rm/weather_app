import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useDataContext } from '../../context/DataContext';

const SunPath = () => {
    const { data, loading } = useDataContext();
    const d3Container = useRef(null);


    const forecastData = data.forecast;
    const currentAstroForecast = forecastData["forecastday"][0]["astro"];

    const sunriseHour = currentAstroForecast["sunrise"]
    const sunsetHour = currentAstroForecast["sunset"]
    const moonriseHour = currentAstroForecast["moonrise"]
    const moonsetHour = currentAstroForecast["moonset"]
    let sunriseText = "Sunrise";
    let sunsetText = "Sunset";
    const currentTime = new Date().getHours();
    let sunriseHourNumber = new Date("01/01/1999 " + sunriseHour).getHours();
    let sunsetHourNumber = new Date("01/01/1999 " + sunsetHour).getHours();
    let moonriseHourNumber = new Date("01/01/1999 " + moonriseHour).getHours();
    let moonsetHourNumber = new Date("01/01/1999 " + moonsetHour).getHours();
    let sunPosition = (currentTime - sunriseHourNumber) / (sunsetHourNumber - sunriseHourNumber);

    let color = "orange";
    let day = "day";

    if (currentTime < sunriseHourNumber || currentTime > sunsetHourNumber) {
        sunPosition = (moonsetHourNumber - moonriseHourNumber) / (currentTime - moonriseHourNumber)
        // console.log(moonriseHourNumber, moonsetHourNumber, currentTime)
        color = "grey";
        day = "night";
        sunriseText = "Moonrise";
        sunsetText = "Moonset";
    }

    useEffect(() => {
        if (loading || !d3Container.current) {
            return;
        }

        // Clear previous svg (no overlapping)
        d3.selectAll("#d3SVG > *").remove();

        // Create the initial SVG
        let svg = d3.select(d3Container.current)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", "-5 -55 170 60")
            .attr("id","d3SVG")

        // Create a curve (https://yqnn.github.io/svg-path-editor/)
        let pathData = "m 0 0 q 74 -87 159 0";

        let path = svg.append("path")
            .attr("d", pathData)
            .attr("stroke", "transparent")
            .attr("fill", "transparent");

        // We divise the curve in 2 parts, one fully filled and one dashed : one for the previous position of the Sun/Moon and one for the upcoming positions
        svg.append("path")
            .attr("d", pathData)
            .attr("stroke", color)
            .attr("fill", "transparent")
            .attr("stroke-dasharray", function () {
                let pathLength = this.getTotalLength();
                return (sunPosition * pathLength) + " " + pathLength;
            });

        svg.append("path")
            .attr("d", pathData)
            .attr("stroke", color)
            .attr("fill", "transparent")
            .attr("stroke-dasharray", "5,5")
            .attr("stroke-dashoffset", function () {
                return this.getTotalLength() * sunPosition;
            });

        // Create a sun/moon :
        let sun = svg.append("image")
            .attr("href", "./assets/images/weather/clear-" + day + ".svg")
            .attr("width", 30)
            .attr("height", 30);

            // Two circles for the design
        let startCircle = svg.append("circle")
            .attr("r", 2)
            .attr("fill", color);

        let endCircle = svg.append("circle")
            .attr("r", 2)
            .attr("fill", color);

        // Update the Sun/Moon position
        let pathLength = path.node().getTotalLength();

        sun.attr("transform", function () {
            let point = path.node().getPointAtLength(sunPosition * pathLength);
            return "translate(" + (point.x - 15) + "," + (point.y - 15) + ")";
        });

        // Add these two circles
        [startCircle, endCircle].forEach(function (element, index) {
            element.attr("transform", function () {
                let point = path.node().getPointAtLength(index * pathLength);
                return "translate(" + point.x + "," + point.y + ")";
            });
        });
    }, [loading, data, day, color, sunPosition]);

    return (
        <div className='sec2'>
            <div className='sunpos-grid'>
                <h3>Sunposition (approx)</h3>
                <svg ref={d3Container} className='sunpath'></svg>
                <div className='astro'>
                    <span>{sunriseHour} {sunriseText}</span>
                    <span>{sunsetText} {sunsetHour}</span>
                </div>
            </div>
        </div>
    );
};

export default SunPath;
