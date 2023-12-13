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
$date = "Today, ".$currentDateTime->format('M d');
$dayHour = '';
// Appel à l'API :
$param = "Metz";
$api = new Weather();
// $api->callAPI($param);
$json = file_get_contents("../data/weather/forecast".$param.".json");
$result = json_decode($json, true);

// Définition des variables depuis l'API :
$status = $result["current"]["condition"]["text"];
$tempCelsius = $result["current"]["temp_c"];
$operator = $tempCelsius > 0 ? "+":"-";
$feelsLikeCelsius =  $result["current"]["feelslike_c"];
$localization = $result["location"]["name"].", ".$result["location"]["country"];
$iconFile = $api->convertIconSVG($result["current"]["condition"]["code"], $result["current"]["is_day"]);
$icon = "../vue/assets/images/weather/".$iconFile;
$uv = $result["current"]["uv"];
$windKph = $result["current"]["wind_kph"];
$windDir = $result["current"]["wind_dir"];
$humidity = $result["current"]["humidity"];
$pressureMb = $result["current"]["pressure_mb"];
$precipMm =  $result["current"]["precip_mm"]*100;
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
$precipitationArray = $api->convertDataToChartArray($result,'precip_mm');
// On enregistre ces données en JSON pour les exploiter dans nos scripts
// saveJSON($tempArray, "temp", $param);

require_once '../vue/index.php';
?>