// Functions used to get colors from values (temperature, etc). These color "can" translate a risk.

// Interpolate Color Function with HEX Colors input
function interpolateColor(color1, color2, factor) {
    let result = [];
    for (let i = 0; i < 3; i++) {
        let c1 = parseInt(color1.slice(i * 2 + 1, i * 2 + 3), 16);
        let c2 = parseInt(color2.slice(i * 2 + 1, i * 2 + 3), 16);
        let color = Math.round(c1 + factor * (c2 - c1)).toString(16).padStart(2, '0');
        result.push(color);
    }
    return '#' + result.join('');
}

function factorise(intervals, param) {
    let intervalKeys = Object.keys(intervals);

    // Possible improvement : Binary Search
    let index = 0;
    while (index < intervalKeys.length - 1 && param > intervalKeys[index + 1]) {
        index++;
    }

    // Calculate the interpolation factor between the colors
    let factor = (param - intervalKeys[index]) / (intervalKeys[index + 1] - intervalKeys[index]);

    // Interpolate between the adjacent colors
    return interpolateColor(intervals[intervalKeys[index]], intervals[intervalKeys[index + 1]], factor);
}

function limitInterval(interval, number) {
    const intervalKeys = Object.keys(interval);
    const maxNumber = Math.max(...intervalKeys);
    const minNumber = Math.min(...intervalKeys);
    // Limit to the defined ranges
    return Math.max(Math.min(number, maxNumber), minNumber);
}

// Data used for color interpolation :
export function getTemperatureColor(temperature, mode) {
    var temperatureInterval = {
        "-20": '#dbdbff', // Extremely cold temperatures (Dark Blue)
        "-10": '#add6ff', // Very cold temperatures (Light Blue)
        "0": '#a4b7ff', // Cold temperatures (Medium Blue)
        "10": '#99ccff', // Cool temperatures (Pastel Blue)
        "15": '#99ff99', // Moderate temperatures (Light Green)
        "20": '#66ff66', // Pleasant temperatures (Medium Green)
        "25": '#ffff66', // Warm temperatures (Yellow)
        "30": '#ff9900', // Very hot temperatures (Orange)
        "40": '#ff3300', // Extremely hot temperatures (Red)
    };

    if (mode !== "c") {
        temperatureInterval = Object.fromEntries(
            Object.entries(temperatureInterval).map(([key, value]) => [parseInt(key, 10) * 9 / 5 + 32, value])
        );
    }

    return factorise(temperatureInterval, limitInterval(temperatureInterval, temperature));
}

export function getWindColor(windspeed) {
    const windSpeedIntervals = {
        0: '#AFCA07',     // Calm
        1: '#ACC900',     // Light
        5: '#4DB201',     // Moderate
        10: '#4CB400',    // Fresh
        20: '#FBD202',    // Strong
        30: '#FFA500',    // Very strong (added orange color for better visibility)
        40: '#FF6347',    // Storm (added red color for better visibility)
        50: '#8B0000',    // Violent
        60: '#330033',    // Hurricane
    };

    return factorise(windSpeedIntervals, limitInterval(windSpeedIntervals, windspeed));
}

export function getHumidityColor(humidity) {
    const humidityIntervals = {
        0: '#8B4513',     // Very low
        20: '#FFD700',    // Low
        40: '#FFA500',    // Moderate
        60: '#00BFFF',    // High
        80: '#1E90FF',    // Very high
        100: '#4169E1',   // Extremely high
    };

    return factorise(humidityIntervals, limitInterval(humidityIntervals, humidity));
}

export function getAirQualityColor(airQualityIndex) {
    const airQualityIntervals = {
        1: '#00FF00',   // Good (Green)
        2: '#FFFF00',   // Moderate (Yellow)
        3: '#FFA500',   // Unhealthy for Sensitive Groups (Orange)
        4: '#FF0000',   // Unhealthy (Red)
        5: '#800080',   // Very Unhealthy (Purple)
        6: '#800000',   // Hazardous (Brown)
    };

    return factorise(airQualityIntervals, limitInterval(airQualityIntervals, airQualityIndex));
}

export function getUVIndexColor(uvIndex) {
    const uvIndexIntervals = {
        0: '#00FF00',   // Low (Green)
        3: '#FFFF00',   // Moderate (Yellow)
        6: '#FFA500',   // High (Orange)
        8: '#FF0000',   // Very High (Red)
        11: '#800080',  // Extreme (Purple)
    };

    return factorise(uvIndexIntervals, limitInterval(uvIndexIntervals, uvIndex));
}

export function getPressureColor(pressure) {
    const pressureIntervals = {
        900: '#0000FF',   // Very low (Blue)
        950: '#008080',   // Low (Teal)
        1000: '#00FF00',  // Normal (Green)
        1050: '#FFFF00',  // High (Yellow)
        1100: '#FFA500',  // Very high (Orange)
    };

    return factorise(pressureIntervals, limitInterval(pressureIntervals, pressure));
}
export function getCOColor(coLevel) {
    const coIntervals = {
        0: '#1dcfff',    // Very low (Blue)
        1000: '#008080',  // Low (Teal)
        2000: '#00FF00',  // Normal (Green)
        10000: '#FF0000', // Very High (Red)
    };

    return factorise(coIntervals, limitInterval(coIntervals, coLevel));
}

export function getNO2Color(no2Level) {
    const no2Intervals = {
        0: '#1dcfff',    // Very Good (Blue)
        10: '#008080',    // Good (Teal)
        20: '#00FF00',    // Acceptable (Green)
        40: '#FFFF00',    // Moderate (Yellow)
        60: '#FFA500',    // Poor (Orange)
        100: '#FF0000',   // Very Poor (Red)
        200: '#800080',   // Hazardous (Purple)
        1000: '#000000',  // Hazardous (Black)
    };

    return factorise(no2Intervals, limitInterval(no2Intervals, no2Level));
}

export function getOzoneColor(ozoneLevel) {
    const ozoneIntervals = {
        0: '#1dcfff',    // Very Good (Blue)
        50: '#008080',    // Good (Teal)
        100: '#00FF00',   // Acceptable (Green)
        150: '#FFFF00',   // Moderate (Yellow)
        200: '#FFA500',   // Poor (Orange)
        300: '#FF0000',   // Very Poor (Red)
        400: '#800080',   // Hazardous (Purple)
    };

    return factorise(ozoneIntervals, limitInterval(ozoneIntervals, ozoneLevel));
}
export function getSO2Color(so2Level) {
    const so2Intervals = {
        0: '#1dcfff',    // Very Good (Blue)
        20: '#008080',    // Good (Teal)
        50: '#00FF00',   // Acceptable (Green)
        100: '#FFFF00',   // Moderate (Yellow)
        200: '#FFA500',   // Poor (Orange)
        350: '#FF0000',   // Very Poor (Red)
        500: '#800080',   // Hazardous (Purple)
    };

    return factorise(so2Intervals, limitInterval(so2Intervals, so2Level));
}
export function getPM25Color(pm25Level) {
    const pm25Intervals = {
        0: '#1dcfff',    // Very Good (Blue)
        10: '#008080',   // Good (Teal)
        20: '#00FF00',   // Acceptable (Green)
        25: '#FFFF00',   // Moderate (Yellow)
        50: '#FFA500',   // Poor (Orange)
        100: '#FF4500',  // Very Poor (Intense Red)
        150: '#8B0000',  // Hazardous (Intense Bordeaux)
    };

    return factorise(pm25Intervals, limitInterval(pm25Intervals, pm25Level));
}

export function getPM10Color(pm10Level) {
    const pm10Intervals = {
        0: '#1dcfff',    // Very Good (Blue)
        30: '#00FF00',   // Acceptable (Green)
        40: '#FFFF00',   // Moderate (Yellow)
        50: '#FF4500',   // Poor (Red)
        80: '#8B0000',   // Hazardous (Bordeaux)
    };

    return factorise(pm10Intervals, limitInterval(pm10Intervals, pm10Level));
}
