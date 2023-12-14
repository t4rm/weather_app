<?php
require_once "../modele/weatherAPI.php";
require_once "./utils/tempFunctions.php";
require_once "./utils/fileFunctions.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Définition des champs :
$currentDateTime = new DateTime('now');
$localization = '';
$date = "Today, " . $currentDateTime->format('M d');
$dayHour = $currentDateTime->format('h:H A');
// Appel à l'API :
$param = "Metz";
$api = new Weather();
// $api->callAPI($param);
$json = file_get_contents("../data/weather/result" . $param . ".json");
$result = json_decode($json, true);

// Définition des variables depuis l'API :
$status = $result["current"]["condition"]["text"];
$tempCelsius = $result["current"]["temp_c"];
$operator = $tempCelsius > 0 ? "+" : "-";
$feelsLikeCelsius =  round($result["current"]["feelslike_c"]);
$localization = $result["location"]["name"] . ", " . $result["location"]["country"];
$iconFile = $api->convertIconSVG($result["current"]["condition"]["code"], $result["current"]["is_day"]);
$icon = "../vue/assets/images/weather/" . $iconFile;
$uv = $result["current"]["uv"];
$windKph = $result["current"]["wind_kph"];
$windDir = $result["current"]["wind_dir"];
$humidity = $result["current"]["humidity"];
$pressureMb = $result["current"]["pressure_mb"];
$precipMm =  $result["current"]["precip_mm"] * 100;
$aqi = $result["current"]["air_quality"]["us-epa-index"];
// AQI :
$co = $result["current"]["air_quality"]["co"];
$no2 = $result["current"]["air_quality"]["no2"];
$o3 = $result["current"]["air_quality"]["o3"];
$so2 = $result["current"]["air_quality"]["so2"];
$pm2_5 = $result["current"]["air_quality"]["pm2_5"];
$pm10 = $result["current"]["air_quality"]["pm10"];
// ASTRO :
$sunrise = $result["forecast"]["forecastday"][0]["astro"]["sunrise"];
$sunset = $result["forecast"]["forecastday"][0]["astro"]["sunset"];
$moonrise = $result["forecast"]["forecastday"][0]["astro"]["moonrise"];
$moonset = $result["forecast"]["forecastday"][0]["astro"]["moonset"];
// ASTRO to TIME :
$sunsetTime = DateTime::createFromFormat("h:i A", $sunset);
$sunriseTime = DateTime::createFromFormat("h:i A", $sunrise);
// $sunTime = DateTime::createFromFormat("h:i A", $sunrise);
$sunsetHour = $sunsetTime->format('H');
$sunriseHour = $sunriseTime->format('H');
$currentHour = $currentDateTime->format('H');

// Définition des couleurs en fonction des variables :
$tempColor = getTemperatureColor($tempCelsius);
$windColor = getWindSpeedColor($windKph);
$humidityColor = getHumidityColor($humidity);
$aqiColor = getAirQualityColor($aqi);
$uvColor = getUVIndexColor($uv);
$pressureColor = getPressureColor($pressureMb);

$coColor = getCoColor($co);
$no2Color = getNo2Color($no2);
$o3Color = getO3Color($o3);
$so2Color = getSo2Color($so2);
$pm2_5Color = getPm2_5Color($pm2_5);
$pm10Color = getPm10Color($pm10);

$tempArray = $api->convertDataToChartArray($result, "temp_c");
$uvArray = $api->convertDataToChartArray($result, "uv");
$uvColorArray = array_map('getUVIndexColor', $uvArray);
$precipitationArray = $api->convertDataToChartArray($result, 'precip_mm');
// On enregistre ces données en JSON pour les exploiter dans nos scripts
// saveJSON($tempArray, "temp", $param);

// Génération des forecasts :
$forecastDay = [];
$forecastDayPath = $result["forecast"]["forecastday"];
// Pour chaque jour présents dans le forecast :
foreach ($forecastDayPath as $day) {
    // Définition de nos variables :
    $html = "";
    $maxTempC = round($day["day"]["maxtemp_c"]);
    $minTempC = round($day["day"]["mintemp_c"]);
    $weatherIcon = $api->convertIconSVG($day["day"]["condition"]["code"], 1);
    $weatherInfo = $day["day"]["condition"]["text"];
    // Si nos valeurs sont positives on leurs ajoute un "+"
    $minTempC = $minTempC > 0 ? "+".$minTempC : $minTempC;
    $maxTempC = $maxTempC > 0 ? "+".$maxTempC : $maxTempC;
    

    // On formate la date de notre fichier JSON pour obtenir une date qui nous convient :
    $dateDay = new DateTime($day["date"]);
    $htmlTitle = '<div class="flex-center"><span>' . $dateDay->format('D') . '</span><span class="forecast-month">' .     $dateDay->format('M d') . '</span></div>';
    // On forme notre premier composant, le titre de la "bulle"

    $container = '<div class="flex-col">'; // Le composant principal

    // Ici on génère le composant de la température (nuit et jour) :
    $tempContainer = '<div class="flex-row">';
    $temp = '<div class="flex-col"><div class="forecast-caption forecast-header"><span>'.$maxTempC.'</span></div></div>';
    $nightTemp = '<div class="flex-col"><img src="../vue/assets/images/weather/'.$weatherIcon.'" height="50px"></div>';
    $tempContainer .= $temp . $nightTemp . "</div>";

    // Ici on génère le composant de la météo :
    $weatherContainer = '<div class="flex-row">';
    $weather = '<div class="flex-col"><div class="forecast-night"><img src="../vue/assets/images/weather/clear-night.svg" height="30px" style="filter: grayscale(100%);"><span>'.$minTempC.'</span></div></div>';
    $weatherText = '<div class="flex-col"><div class="forecast-caption forecast-detail">'.$weatherInfo.'</div></div>';
    $weatherContainer .= $weather . $weatherText . "</div>";

    // On fusionne tous nos composants (embriquation)
    $container .= $tempContainer . $weatherContainer . "</div>";

    $html .= $htmlTitle;
    $html .= $container;

    // L'HTML obtenu est celui de la "bulle" du jour correspondant
    $forecastDay[] = $html;
}

require_once '../vue/index.php';
