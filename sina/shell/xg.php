<?php
require_once ('XingeApp.php');
// $ACCESS_ID = 2100260958;
// $SECRET_KEY = "286aa7a5bd9005c6b2e1ba65c6f5261c";
$ACCESS_ID = 2100260860;
$SECRET_KEY = "ba58b338e25f045d8f7fdb911e965131";

$push = new XingeApp ( $ACCESS_ID, $SECRET_KEY );

$account = $_POST["account"];
$title =  $_POST["title"];
$content = $_POST["content"];

$message = new Message();
$message->setType(Message::TYPE_MESSAGE);
// $message->setType(Message::TYPE_NOTIFICATION);
$message->setExpireTime(86400);
$message->setTitle($title);
$message->setContent($content);
// $custom = array('url'=>'http://192.168.1.11:8080/hcc-web/wapMember/scan_pay?payType=wechat');
$message->setCustom($custom);

$res = $push->PushSingleAccount(XingeApp::DEVICE_ANDROID, $account, $message);

echo var_dump($res);
?>