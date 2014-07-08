<?php

require_once "classes/Lists.php";

// get the information passed from the app via the POST method
$list_data = $_GET['google_id'];

$Lists = new \classes\Lists();

$lists = $Lists->get_lists($list_data);

echo $lists;