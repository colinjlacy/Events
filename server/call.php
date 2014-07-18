<?php

$start = $_GET['date_start'];
$stop = $_GET['date_stop'];
$page = $_GET['page'];
$category = $_GET['category'];
$sort = $_GET['sort'];

echo file_get_contents(
    'http://api.eventful.com/json/events/search'. // base URL
	'?location=New+Orleans'. // Location
	'&date='.$start.'-'.$stop. // Date Range
	'&page_size=25'. // Default data pull
	'&page_number='.$page. // What page are we on again?
	'&category='.$category. // if defined, list only this category
	'&include=categories'. // make sure everyone has a category
	'&sort_order='.$sort. // HULK SMASH
	'&after_start_date='.$start.
	'&app_key=pWDBS4hbDrHwCTMp' ); ?>