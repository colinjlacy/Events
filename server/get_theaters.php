<?php

$zip = $_GET['zip'];
$date = $_GET['date'];

$result = file_get_contents("http://207.200.75.22/movies/pox/closesttheaters.xml?zip=".$zip."&date=".$date."&count=10");
$result = str_replace(array("\n", "\r", "\t"), '', $result);
$result = trim(str_replace('"', "'", $result));
$simpleXml = simplexml_load_string($result);

print json_encode($simpleXml);