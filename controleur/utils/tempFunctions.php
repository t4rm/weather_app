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

function getTemperatureColor($temperature)
{
    $colors = [
        '#dbdbff', // Températures extrêmement froides (Bleu foncé)
        '#add6ff', // Températures très froides (Bleu clair)
        '#a4b7ff', // Températures froides (Bleu moyen)
        '#99ccff', // Températures fraîches (Bleu pastel)
        '#99ff99', // Températures modérées (Vert clair)
        '#66ff66', // Températures agréables (Vert moyen)
        '#ffff66', // Températures chaudes (Jaune)
        '#ff9900', // Températures très chaudes (Orange)
        '#ff3300', // Températures extrêmement chaudes (Rouge)
    ];

    // Limiter la température aux plages définies
    $temperature = max(min($temperature, 40), -20);

    // Calculer la position relative dans l'intervalle
    $position = ($temperature + 20) / 60;

    // Calculer l'indice des couleurs adjacentes
    $index1 = floor($position * (count($colors) - 1));
    $index2 = min($index1 + 1, count($colors) - 1);

    // Calculer le facteur d'interpolation entre les couleurs
    $factor = ($position - $index1 / (count($colors) - 1)) * (count($colors) - 1);

    // Interpoler entre les couleurs adjacentes
    return interpolateColor($colors[$index1], $colors[$index2], $factor);
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

    // Trouver l'intervalle correspondant à la vitesse du vent
    $intervalKeys = array_keys($windSpeedIntervals);
    $index = 0;
    while ($index < count($intervalKeys) - 1 && $windSpeed > $intervalKeys[$index + 1]) {
        $index++;
    }

    // Calculer le facteur d'interpolation entre les couleurs
    $factor = ($windSpeed - $intervalKeys[$index]) / ($intervalKeys[$index + 1] - $intervalKeys[$index]);

    // Interpoler entre les couleurs adjacentes
    return interpolateColor($windSpeedIntervals[$intervalKeys[$index]], $windSpeedIntervals[$intervalKeys[$index + 1]], $factor);
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

    // Trouver l'intervalle correspondant à l'humidité
    $intervalKeys = array_keys($humidityIntervals);
    $index = 0;
    while ($index < count($intervalKeys) - 1 && $humidity > $intervalKeys[$index + 1]) {
        $index++;
    }

    // Calculer le facteur d'interpolation entre les couleurs
    $factor = ($humidity - $intervalKeys[$index]) / ($intervalKeys[$index + 1] - $intervalKeys[$index]);

    // Interpoler entre les couleurs adjacentes
    return interpolateColor($humidityIntervals[$intervalKeys[$index]], $humidityIntervals[$intervalKeys[$index + 1]], $factor);
}

function getAirQualityColor($airQualityIndex)
{
    $airQualityIntervals = [
        0 => '#00FF00',   // Good (Vert)
        51 => '#FFFF00',  // Moderate (Jaune)
        101 => '#FFA500', // Unhealthy for Sensitive Groups (Orange)
        151 => '#FF0000', // Unhealthy (Rouge)
        201 => '#800080', // Very Unhealthy (Violet)
        301 => '#800000', // Hazardous (Marron)
    ];

    // Limiter l'indice de qualité de l'air aux plages définies
    $airQualityIndex = max(min($airQualityIndex, 500), 0);

    // Trouver l'intervalle correspondant à l'indice de qualité de l'air
    $intervalKeys = array_keys($airQualityIntervals);
    $index = 0;
    while ($index < count($intervalKeys) - 1 && $airQualityIndex > $intervalKeys[$index + 1]) {
        $index++;
    }

    // Calculer le facteur d'interpolation entre les couleurs
    $factor = ($airQualityIndex - $intervalKeys[$index]) / ($intervalKeys[$index + 1] - $intervalKeys[$index]);

    // Interpoler entre les couleurs adjacentes
    return interpolateColor($airQualityIntervals[$intervalKeys[$index]], $airQualityIntervals[$intervalKeys[$index + 1]], $factor);
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

    // Trouver l'intervalle correspondant à l'indice UV
    $intervalKeys = array_keys($uvIndexIntervals);
    $index = 0;
    while ($index < count($intervalKeys) - 1 && $uvIndex > $intervalKeys[$index + 1]) {
        $index++;
    }

    // Calculer le facteur d'interpolation entre les couleurs
    $factor = ($uvIndex - $intervalKeys[$index]) / ($intervalKeys[$index + 1] - $intervalKeys[$index]);

    // Interpoler entre les couleurs adjacentes
    return interpolateColor($uvIndexIntervals[$intervalKeys[$index]], $uvIndexIntervals[$intervalKeys[$index + 1]], $factor);
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

    // Trouver l'intervalle correspondant à la pression atmosphérique
    $intervalKeys = array_keys($pressureIntervals);
    $index = 0;
    while ($index < count($intervalKeys) - 1 && $pressure > $intervalKeys[$index + 1]) {
        $index++;
    }

    // Calculer le facteur d'interpolation entre les couleurs
    $factor = ($pressure - $intervalKeys[$index]) / ($intervalKeys[$index + 1] - $intervalKeys[$index]);

    // Interpoler entre les couleurs adjacentes
    return interpolateColor($pressureIntervals[$intervalKeys[$index]], $pressureIntervals[$intervalKeys[$index + 1]], $factor);
}
