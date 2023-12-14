<?php
class Weather
{
    private $key = $_ENV["APIKEY"];
    private $url = "http://api.weatherapi.com/v1/current.json";
    private $hashMapIcon = [
        "1000"=> "clear-day",
        "1003"=> "partly-cloudy-day",
        "1006"=> "cloudy",
        "1009"=> "overcast-day",
        "1030"=> "mist",
        "1063" => "overcast-day-rain",
        "1066" => "overcast-day-snow",
        "1069" => "partly-cloudy-day-snow",
        "1072" => "drizzle",
        "1087" => "thunderstorms-day-extreme",
        "1114" => "wind-snow",
        "1117" => "extreme-day-snow",
        "1135" => "fog-day",
        "1147" => "extreme-day-fog",
        "1150" => "overcast-drizzle",
        "1153" => "partly-cloudy-day-drizzle",
        "1168" => "extreme-day-drizzle",
        "1171" => "extreme-drizzle",
        "1180" => "partly-cloudy-day-rain",
        "1183" => "rain",
        "1186" => "overcast-day-rain",
        "1189" => "overcast-day-rain",
        "1192" => "extreme-day-rain",
        "1195" => "extreme-day-rain",
        "1198" => "rain",
        "1201" => "extreme-day-rain",
        "1204" => "sleet",
        "1207" => "extreme-sleet-day",
        "1210" => "overcast-snow-day",
        "1213" => "overcast-snow-day",
        "1216" => "snow",
        "1219" => "snow",
        "1222" => "extreme-day-snow",
        "1225" => "extreme-day-snow",
        "1237" => "hail",
        "1240" => "partly-cloudy-day-rain",
        "1243" => "extreme-day-rain",
        "1246" => "extreme-day-rain",
        "1249" => "overcast-day-sleet",
        "1252" => "extreme-day-sleet",
        "1255" => "overcast-day-snow",
        "1258" => "overcast-snow",
        "1261" => "overcast-day-hail",
        "1264" => "extreme-day-hail",
        "1273" => "thunderstorms-day-rain",
        "1276" => "thunderstorms-day-extreme-rain",
        "1279" => "thunderstorms-day-snow",
        "1282" => "thunderstorms-day-extreme-snow"
        // Possibilité d'améliorer en prenant en compte freezing
    ];
    

    /**
     * callAPI
     * Appelle l'API avec un paramètre (IP, VILLE, https://www.weatherapi.com/docs/#intro-request)
     * @param  string $param
     * @return bool
     */
    function callAPI(string $param)
    {
        $requestURL = $this->url . "?key=" . $this->key . "&q=" . $param."&days=7&aqi=yes&alerts=no";

        $ch = curl_init($requestURL);
        $fp = fopen("../data/weather/result" . $param . ".json", "w");

        curl_setopt($ch, CURLOPT_FILE, $fp);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_exec($ch);

        if (curl_errno($ch)) {
            echo 'Erreur Curl : ' . curl_error($ch);
            return false;
        }

        curl_close($ch);
        fclose($fp);

        return true;
    }

    function convertIconSVG(string $code, int $isDay)
    {
        $converted = isset($this->hashMapIcon[$code]) ? $this->hashMapIcon[$code] : null;
        
        // Si l'icone fait parti de notre tableau :
        if(isset($converted)) 
        {
            $moded = strpos($converted,"day");
            // Si l'icone possède un attribut day/night
            if($moded !== false) {
                // On remplace "day" par night si isDay vaut 0
                if($isDay == 0) $converted = str_replace("day","night",$converted);
            }
            return ($converted.".svg");
        }

        return "code-red.svg";
    }

    function convertDataToChartArray(array $forecast, string $param) {
        $arrayEpoch = $forecast["forecast"]["forecastday"][0]["hour"];
        
        $arrayTemps = [];
        foreach($arrayEpoch as $hour ) {
            $arrayTemps[] = $hour[$param];
        }

        return $arrayTemps;
    }
}
