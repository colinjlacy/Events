<?php

$id = $_GET['id'];
$date = $_GET['date'];

$result = file_get_contents("http://207.200.75.22/movies/atom/closesttheaters.xml?id=".$id."&date=".$date."&count=20");
$result = str_replace(array("\n", "\r", "\t"), '', $result);
$result = trim(str_replace('"', "'", $result));
$simpleXml = simplexml_load_string($result);

print json_encode($simpleXml);
//print "COLIN!";