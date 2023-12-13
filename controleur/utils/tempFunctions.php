<?php
function interpolateColor($color1, $color2, $factor)
{
    list($r1, $g1, $b1) = sscanf($color1, "#%02x%02x%02x");
    list($r2, $g2, $b2) = sscanf($color2, "#%02x%02x%02x");

    $r = round($r1 + ($r2 - $r1) * $factor);
    $g = round($g1 + ($g2 - $g1) * $factor);
    $b = round($b1 + ($b2 - $b1) * $factor);

    return sprintf("#%02x%02x%02x", $r, $g, $b);
}

function factorise($intervals, $param) {
    // Trouver l'intervalle correspondant à la pression atmosphérique
    $intervalKeys = array_keys($intervals);

    $index = 0;
    while ($index < count($intervalKeys) - 1 && $param > $intervalKeys[$index + 1]) {
        $index++;
    }

    // Calculer le facteur d'interpolation entre les couleurs
    $factor = ($param - $intervalKeys[$index]) / ($intervalKeys[$index + 1] - $intervalKeys[$index]);

    // Interpoler entre les couleurs adjacentes
    return interpolateColor($intervals[$intervalKeys[$index]], $intervals[$intervalKeys[$index + 1]], $factor);
}

function getTemperatureColor($temperature)
{
    $temperatureInterval = [
       -20 =>  '#dbdbff', // Températures extrêmement froides (Bleu foncé)
       -10 =>  '#add6ff', // Températures très froides (Bleu clair)
       0 =>  '#a4b7ff', // Températures froides (Bleu moyen)
       10 => '#99ccff', // Températures fraîches (Bleu pastel)
       15 => '#99ff99', // Températures modérées (Vert clair)
       20 => '#66ff66', // Températures agréables (Vert moyen)
       25 => '#ffff66', // Températures chaudes (Jaune)
       30 => '#ff9900', // Températures très chaudes (Orange)
       40 => '#ff3300', // Températures extrêmement chaudes (Rouge)
    ];

    // Limiter la température aux plages définies
    $temperature = max(min($temperature, 40), -20);

    return factorise($temperatureInterval, $temperature);
}

function getWindSpeedColor($windSpeed)
{
    $windSpeedIntervals = [
        0 => '#AFCA07',     // Calme
        1 => '#ACC900',     // Léger
        5 => '#4DB201',     // Modéré
        10 => '#4CB400',    // Frais
        20 => '#FBD202',    // Fort
        30 => '#FFA500',    // Très fort (ajout d'une couleur orange pour plus de visibilité)
        40 => '#FF6347',    // Tempête (ajout d'une couleur rouge pour plus de visibilité)
        50 => '#8B0000',    // Violent
        60 => '#330033',    // Ouragan
    ];

    // Limiter la vitesse du vent aux plages définies
    $windSpeed = max(min($windSpeed, 70), 0);

    return factorise($windSpeedIntervals, $windSpeed);
}

function getHumidityColor($humidity)
{
    $humidityIntervals = [
        0 => '#8B4513',     // Très basse
        20 => '#FFD700',    // Basse
        40 => '#FFA500',    // Modérée
        60 => '#00BFFF',    // Élevée
        80 => '#1E90FF',    // Très élevée
        100 => '#4169E1',   // Extrêmement élevée
    ];

    // Limiter l'humidité aux plages définies
    $humidity = max(min($humidity, 100), 0);

    return factorise($humidityIntervals, $humidity);
}

function getAirQualityColor($airQualityIndex)
{
    $airQualityIntervals = [
        1 => '#00FF00',   // Good (Vert)
        2 => '#FFFF00',  // Moderate (Jaune)
        3 => '#FFA500', // Unhealthy for Sensitive Groups (Orange)
        4 => '#FF0000', // Unhealthy (Rouge)
        5 => '#800080', // Very Unhealthy (Violet)
        6 => '#800000', // Hazardous (Marron)
    ];

    // Limiter l'indice de qualité de l'air aux plages définies
    $airQualityIndex = max(min($airQualityIndex, 6), 0);

    return factorise($airQualityIntervals, $airQualityIndex);
}

function getUVIndexColor($uvIndex)
{
    $uvIndexIntervals = [
        0 => '#00FF00',   // Low (Vert)
        3 => '#FFFF00',   // Moderate (Jaune)
        6 => '#FFA500',   // High (Orange)
        8 => '#FF0000',   // Very High (Rouge)
        11 => '#800080',  // Extreme (Violet)
    ];

    // Limiter l'indice UV aux plages définies
    $uvIndex = max(min($uvIndex, 11), 0);

    return factorise($uvIndexIntervals, $uvIndex);
}

function getPressureColor($pressure)
{
    $pressureIntervals = [
        900 => '#0000FF',   // Très basse (Bleu)
        950 => '#008080',   // Basse (Teal)
        1000 => '#00FF00',  // Normale (Vert)
        1050 => '#FFFF00',  // Élevée (Jaune)
        1100 => '#FFA500',  // Très élevée (Orange)
    ];

    // Limiter la pression atmosphérique aux plages définies
    $pressure = max(min($pressure, 1100), 900);

    return factorise($pressureIntervals, $pressure);
}

function getCoColor($co)
{
    $coIntervals = [
        0 => '#1dcfff',   // Très basse (Bleu)
        1000 => '#008080',   // Basse (Teal)
        2000 => '#00FF00',  // Normale (Vert)
        10000 => '#FF0000',   // Very High (Rouge)
    ];

    // Limiter la pression atmosphérique aux plages définies
    $co = max(min($co, 10000), 0);

    return factorise($coIntervals, $co);
}

function getNo2Color($no2)
{
    $no2Intervals = [
        0 => '#1dcfff',   // Très Bon (Bleu)
        10 => '#008080',   // Bon (Teal)
        20 => '#00FF00',   // Acceptable (Vert)
        40 => '#FFFF00',   // Moyen (Jaune)
        60 => '#FFA500',  // Mauvais (Orange)
        100 => '#FF0000',  // Très Mauvais (Rouge)
        200 => '#800080', // Dangereux (Violet)
        1000 => '#000000', // Dangereux (Violet)
    ];

    // Limiter l'indice de qualité de l'air aux plages définies
    $no2 = max(min($no2, 1000), 0);

    return factorise($no2Intervals, $no2);
}

function getO3Color($o3)
{
    $ozoneIntervals = [
        0 => '#1dcfff',    // Très Bon (Bleu)
        50 => '#008080',    // Bon (Teal)
        100 => '#00FF00',   // Acceptable (Vert)
        150 => '#FFFF00',   // Moyen (Jaune)
        200 => '#FFA500',   // Mauvais (Orange)
        300 => '#FF0000',   // Très Mauvais (Rouge)
        400 => '#800080',   // Dangereux (Violet)
    ];

    // Limiter l'indice de qualité de l'air aux plages définies
    $o3 = max(min($o3, 400), 0);

    return factorise($ozoneIntervals, $o3);
}

function getSo2Color($so2)
{
    $so2Intervals = [
        0 => '#1dcfff',    // Très Bon (Bleu)
        20 => '#008080',    // Bon (Teal)
        50 => '#00FF00',   // Acceptable (Vert)
        100 => '#FFFF00',   // Moyen (Jaune)
        200 => '#FFA500',   // Mauvais (Orange)
        350 => '#FF0000',   // Très Mauvais (Rouge)
        500 => '#800080',   // Dangereux (Violet)
    ];

    // Limiter l'indice de qualité de l'air aux plages définies
    $so2 = max(min($so2, 500), 0);

    return factorise($so2Intervals, $so2);
}

function getPm2_5Color($pm25)
{
    $pm25Intervals = [
        0 => '#1dcfff',    // Très Bon (Bleu)
        10 => '#008080',   // Bon (Teal)
        20 => '#00FF00',   // Acceptable (Vert)
        25 => '#FFFF00',   // Moyen (Jaune)
        50 => '#FFA500',   // Mauvais (Orange)
        100 => '#FF4500',  // Très Mauvais (Rouge intense)
        150 => '#8B0000',  // Dangereux (Bordeaux intense)
    ];

    // Limiter l'indice de qualité de l'air aux plages définies
    $pm25 = max(min($pm25, 150), 0);

    return factorise($pm25Intervals, $pm25);
}

function getPm10Color($pm10)
{
    $pm10Intervals = [
        0 => '#1dcfff',   
        30 => '#00FF00',  
        40 => '#FFFF00',  
        50 => '#FF4500',
        80 => '#8B0000',  
    ];

    // Limiter l'indice de qualité de l'air aux plages définies
    $pm10 = max(min($pm10, 80), 0);
    return factorise($pm10Intervals, $pm10);
}