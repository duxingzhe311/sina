<?php
require_once ('XingeApp.php');
$ACCESS_ID = 2100260860;
$SECRET_KEY = "ba58b338e25f045d8f7fdb911e965131";

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