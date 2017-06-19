<?php
require_once ('XingeApp.php');
$ACCESS_ID = 2100260958;
$SECRET_KEY = "286aa7a5bd9005c6b2e1ba65c6f5261c";

$push = new XingeApp ( $ACCESS_ID, $SECRET_KEY );

$account = $_POST["account"];
$title =  $_POST["title"];
$content = $_POST["content"];

$message = new Message ();
$message->setType(Message::TYPE_MESSAGE);
$message->setExpireTime(86400);
$message->setTitle($title);
$message->setContent($content);

$res = $push->PushSingleAccount ( XingeApp::DEVICE_ANDROID, $account, $message );

echo var_dump($res);
?>