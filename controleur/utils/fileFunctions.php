<?php
function saveJSON($data, $type, $param) {

    $jsonString = json_encode($data, JSON_PRETTY_PRINT);

    $fp = fopen('../data/weather/'.$type.$param.'.json', 'w');
    fwrite($fp, $jsonString);
    fclose($fp);
}
 
?>