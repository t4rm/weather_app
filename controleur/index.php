<?php
require_once "../modele/weatherAPI.php";
require_once "./utils/tempFunctions.php";

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
$json = file_get_contents("../data/weather/result".$param.".json");
$result = json_decode($json, true);
// var_dump($result);

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
$humidity = $result["current"]["humidity"];
$pressureMb = $result["current"]["pressure_mb"];
$aqi = $result["current"]["air_quality"]["us-epa-index"];
$precipMm =  $result["current"]["precip_mm"]*100;

// Définition des couleurs en fonction des variables :
$tempColor = getTemperatureColor($tempCelsius);
$windColor = getWindSpeedColor($windKph); 
$humidityColor = getHumidityColor($humidity);
$aqiColor = getAirQualityColor($aqi);
$uvColor = getUVIndexColor($uv);
$pressureColor = getPressureColor($pressureMb);

require_once '../vue/index.php';
?>