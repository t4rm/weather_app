// convert data from the Api to an Array used by ChartJS
export function convertForecastDataToChartArray(forecastData, key) {
    var hourlyData = forecastData["forecastday"][0]["hour"];
    var tmpArray = [];

    hourlyData.forEach(hour => {
        tmpArray.push(hour[key])
    });

    return tmpArray;
}