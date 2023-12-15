<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather</title>
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js" integrity="sha512-M7nHCiNUOwFt6Us3r8alutZLm9qMt4s9951uo8jqO4UwJ1hziseL6O3ndFyigx6+LREfZqnhHxYjKRJ8ZQ69DQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        // Envoie de valeurs statics depuis PHP
        const yValues = <?= json_encode($tempArray) ?>;
        const uvValues = <?= json_encode($uvArray) ?>;
        const uvColorValues = <?= json_encode($uvColorArray) ?>;
        const precipitationValues = <?= json_encode($precipitationArray) ?>;
        let currentTime = <?=$currentHour?>;
        let sunrise = <?=$sunriseHour?>;
        let sunset = <?=$sunsetHour?>;
        let moonrise = <?=$moonriseHour?>;
        let moonset = <?=$moonsetHour?>;
        // A modifier en AJAX
    </script>
    <link rel="stylesheet" href="../vue/assets/css/main.css">
</head>

<body>
    <div class="app-container">
        <div class="app">
            <div class="container fill">
                <div class="main">
                    <header>
                        <span><?= $localization ?></span>
                        <span><?= $date ?></span>
                    </header>
                    <section class="weather">
                        <h3><?= $dayHour ?></h3>
                        <figure class="icon">
                            <img src="<?= $icon ?>">
                            <figcaption><?= $status ?></figcaption>
                        </figure>
                        <div class="state" style="color:<?= $tempColor ?>">
                            <p class="operator"><?= $tempCelsius > 0 ? "+" : "-" ?></p>
                            <h1><?= $tempCelsius ?></h1>
                            <p class="degree">°C</p>
                        </div>
                        <span class="feels">Feels like <?= $feelsLikeCelsius > 0 ? "+" : "-" ?><?= $feelsLikeCelsius ?></span>
                    </section>
                    <aside class="statistics" >
                        <span>Precipitation</span>
                        <span class="dot">
                            <svg class="visible" fill="#9AE0FD" height="20" width="20" viewBox="0 0 300 300" preserveAspectRatio="none">
                                <g transform="translate(40)">
                                    <path d="M 243.44676,222.01677 C 243.44676,288.9638 189.17548,343.23508 122.22845,343.23508 C 55.281426,343.23508 1.0101458,288.9638 1.0101458,222.01677 C 1.0101458,155.06975 40.150976,142.95572 122.22845,0.79337431 C 203.60619,141.74374 243.44676,155.06975 243.44676,222.01677 z"></path>
                                </g> 
                            </svg>

                            <?= $precipMm ?>%
                        </span>
                        <span>Wind Speed</span>
                        <span class="dot">
                            <svg height="20" width="20" style="display: block">
                                <circle cx="10" cy="10" r="7" fill="<?= $tempColor ?>"></circle>
                            </svg><?= $windKph ?> km/h <?=$windDir?>
                        </span>
                        <span>Humidity</span>
                        <span class="dot">
                            <svg height="20" width="20" style="display: block">
                                <circle cx="10" cy="10" r="7" fill="<?= $humidityColor ?>"></circle>
                            </svg><?= $humidity ?>%
                        </span>
                        <span>Air Quality</span>
                        <span class="dot aqi">
                            <svg height="20" width="20" style="display: block">
                                <circle cx="10" cy="10" r="7" fill="<?= $aqiColor ?>"></circle>
                            </svg><?= $aqi ?> AQI (US-EPA)
                            <div class="aqi-container">
                                <div class="aqi-stats glass noblur">
                                    <span>CO</span>
                                    <span class="dot">
                                        <svg height="20" width="20" style="display: block">
                                            <circle cx="10" cy="10" r="7" fill="<?= $coColor ?>"></circle>
                                        </svg><?= $co ?> μg/m3
                                    </span>

                                    <span>NO2</span>
                                    <span class="dot">
                                        <svg height="20" width="20" style="display: block">
                                            <circle cx="10" cy="10" r="7" fill="<?= $no2Color ?>"></circle>
                                        </svg><?= $no2 ?> μg/m3
                                    </span>

                                    <span>O3</span>
                                    <span class="dot">
                                        <svg height="20" width="20" style="display: block">
                                            <circle cx="10" cy="10" r="7" fill="<?= $o3Color ?>"></circle>
                                        </svg><?= $o3 ?> μg/m3
                                    </span>

                                    <span>SO2</span>
                                    <span class="dot">
                                        <svg height="20" width="20" style="display: block">
                                            <circle cx="10" cy="10" r="7" fill="<?= $so2Color ?>"></circle>
                                        </svg><?= $so2 ?> μg/m3
                                    </span>

                                    <span>PM2.5</span>
                                    <span class="dot">
                                        <svg height="20" width="20" style="display: block">
                                            <circle cx="10" cy="10" r="7" fill="<?= $pm2_5Color ?>"></circle>
                                        </svg><?= $pm2_5 ?> μg/m3
                                    </span>

                                    <span>PM10</span>
                                    <span class="dot">
                                        <svg height="20" width="20" style="display: block">
                                            <circle cx="10" cy="10" r="7" fill="<?= $pm10Color ?>"></circle>
                                        </svg><?= $pm10 ?> μg/m3
                                    </span>
                                </div>
                            </div>
                        </span>

                        <span>Pressure</span>
                        <span class="dot">
                            <svg height="20" width="20" style="display: block">
                                <circle cx="10" cy="10" r="7" fill="<?= $pressureColor ?>"></circle>
                            </svg><?= $pressureMb ?> mb
                        </span>
                        <span>UV Index</span>
                        <span class="dot">
                            <svg height="20" width="20" style="display: block">
                                <circle cx="10" cy="10" r="7" fill="<?= $uvColor ?>"></circle>
                            </svg><?= $uv ?>
                        </span>
                    </aside>
                </div>
                <div class="sec">
                    <h3>Temperature, °C</h3>
                    <div class="chart-container" style="position: relative; height:19vh;">
                        <canvas id="tempChart"></canvas>
                    </div>
                </div>
                <div class="sec2">
                    <div class="sunpos-grid">
                        <h3 >Sunposition (approx)</h3>
                        <div class="sunpath"></div>
                        <div class="astro">
                            <span><?= $sunrise ?> Sunrise</span>
                            <span>Sunset <?= $sunset ?></span>
                        </div>
                    </div>
                </div>

                <div class="sec3">
                    <h3>UV Index</h3>
                    <div class="chart-container" style="position: relative; height:19vh;">
                        <canvas id="uvChart"></canvas>
                    </div>
                </div>
                <div class="sec4">
                    <h3>Precipitation, %</h3>
                    <div class="chart-container" style="position: relative; height:19vh;">
                        <canvas id="precipChart"></canvas>
                    </div>
                </div>
                <!-- Affichage des prévisions météo pour les jours suivants : -->
                <div class="th small-glass" style="text-align: center;"><?=$forecastDay[0]?></div>
                <div class="th2 small-glass" style="text-align: center;"><?=$forecastDay[1]?></div>
                <div class="th3 small-glass" style="text-align: center;"><?=$forecastDay[2]?></div>
                <div class="th4 small-glass" style="text-align: center;"><?=$forecastDay[3]?></div>
                <div class="th5 small-glass" style="text-align: center;"><?=$forecastDay[4]?></div>
                <div class="th6 small-glass" style="text-align: center;"><?=$forecastDay[5]?></div>
                <div class="th7 small-glass" style="text-align: center;"><?=$forecastDay[6]?></div>
                <div class="th8 forecast-more flex-center" style="text-align: center;"><span>See month</span></div>
            </div>
        </div>
    </div>
    <script src="../vue/assets/js/charts.js" type="module"></script>
    <script src="../vue/assets/js/sunpos.js" type="module"></script>
    <script src="../vue/assets/js/simplebar.js" type="module"></script>

</body>

</html>