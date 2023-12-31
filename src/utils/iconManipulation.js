// Short function linking Weatherapi icons and https://github.com/basmilius/weather-icons/

const hashMapIcon = {
    "1000": "clear-day",
    "1003": "partly-cloudy-day",
    "1006": "cloudy",
    "1009": "overcast-day",
    "1030": "mist",
    "1063": "overcast-day-rain",
    "1066": "overcast-day-snow",
    "1069": "partly-cloudy-day-snow",
    "1072": "drizzle",
    "1087": "thunderstorms-day-extreme",
    "1114": "wind-snow",
    "1117": "extreme-day-snow",
    "1135": "fog-day",
    "1147": "extreme-day-fog",
    "1150": "overcast-drizzle",
    "1153": "partly-cloudy-day-drizzle",
    "1168": "extreme-day-drizzle",
    "1171": "extreme-drizzle",
    "1180": "partly-cloudy-day-rain",
    "1183": "rain",
    "1186": "overcast-day-rain",
    "1189": "overcast-day-rain",
    "1192": "extreme-day-rain",
    "1195": "extreme-day-rain",
    "1198": "rain",
    "1201": "extreme-day-rain",
    "1204": "sleet",
    "1207": "extreme-sleet-day",
    "1210": "overcast-snow-day",
    "1213": "overcast-snow-day",
    "1216": "snow",
    "1219": "snow",
    "1222": "extreme-day-snow",
    "1225": "extreme-day-snow",
    "1237": "hail",
    "1240": "partly-cloudy-day-rain",
    "1243": "extreme-day-rain",
    "1246": "extreme-day-rain",
    "1249": "overcast-day-sleet",
    "1252": "extreme-day-sleet",
    "1255": "overcast-day-snow",
    "1258": "overcast-snow",
    "1261": "overcast-day-hail",
    "1264": "extreme-day-hail",
    "1273": "thunderstorms-day-rain",
    "1276": "thunderstorms-day-extreme-rain",
    "1279": "thunderstorms-day-snow",
    "1282": "thunderstorms-day-extreme-snow"
};

export function convertIconSVG(code, isDay) {
    let converted = hashMapIcon[code] || null;

    // Si l'icône fait partie de notre tableau :
    if (converted !== null) {
        const moded = converted.includes("day");
        // Si l'icône possède un attribut day/night
        if (moded) {
            // On remplace "day" par "night" si isDay vaut 0
            if (isDay === 0) converted = converted.replace("day", "night");
        }

        return converted + ".svg";
    }

    return "code-red.svg";
}
