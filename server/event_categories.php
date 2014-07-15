<?php

$categories_xml = file_get_contents(
    'http://api.eventful.com/rest/categories/list'. // base URL
    '?app_key=pWDBS4hbDrHwCTMp' );

$categories_xml = str_replace(array("\n", "\r", "\t"), '', $categories_xml);
$categories_xml = trim(str_replace('"', "'", $categories_xml));
$categories = simplexml_load_string($categories_xml);

print json_encode($categories);
