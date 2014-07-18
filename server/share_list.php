<?php

// get the information passed from the app via the POST method
$_POST = json_decode(file_get_contents("php://input"), true);

$recipients = $_POST['listShare'];
$message = $_POST['message'];
$list_id = $_POST['list_id'];
$creator_id = $_POST['creator_id'];
$creator_display = $_POST['creator_display'];

// get the Share class
require "classes/Share.php";
$Share = new \classes\Share();

foreach($recipients as $recipient) {

    $exist_test = $Share->user_exists($recipient);

}

echo $exist_test;

//echo "FART";