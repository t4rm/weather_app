<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather</title>
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
    <link rel="stylesheet" href="../vue/assets/css/main.css">
</head>

<body>
    <!-- <div class="app full"> -->
    <!-- </div> -->

    <div class="app full">
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
                    <div class="state" style="color:<?=$tempColor?>">
                        <p class="operator"><?= $tempCelsius > 0 ? "+" : "-" ?></p>
                        <h1><?= $tempCelsius ?></h1>
                        <p class="degree">°C</p>
                    </div>
                    <span class="feels">Feels like <?= $feelsLikeCelsius > 0 ? "+" : "-" ?><?= $feelsLikeCelsius ?></span>
                </section>
                <aside class="statistics">
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
                            <circle cx="10" cy="10" r="7" fill="<?=$tempColor?>"></circle>
                        </svg><?= $windKph ?> km/h
                    </span>
                    <span>Humidity</span>
                    <span class="dot">
                        <svg height="20" width="20" style="display: block">
                            <circle cx="10" cy="10" r="7" fill="<?=$humidityColor?>"></circle>
                        </svg><?= $humidity ?>%
                    </span>
                    <span>Air Quality</span>
                    <span class="dot">
                        <svg height="20" width="20" style="display: block">
                            <circle cx="10" cy="10" r="7" fill="<?=$aqiColor?>"></circle>
                        </svg><?= $aqi ?> AQI (US-EPA)
                    </span>
                    <span>Pressure</span>
                    <span class="dot">
                        <svg height="20" width="20" style="display: block">
                            <circle cx="10" cy="10" r="7" fill="<?=$pressureColor?>"></circle>
                        </svg><?= $pressureMb ?> mb
                    </span>
                    <span>UV Index</span>
                    <span class="dot">
                        <svg height="20" width="20" style="display: block">
                            <circle cx="10" cy="10" r="7" fill="<?=$uvColor?>"></circle>
                        </svg><?= $uv ?>
                    </span>
                </aside>
            </div>
            <div class="sec"></div>
            <div class="sec2"></div>
            <div class="th"></div>
            <div class="th2"></div>
            <div class="sec3"></div>
            <div class="sec4"></div>
            <div class="th3"></div>
            <div class="th4"></div>
        </div>
    </div>
</body>

</html>