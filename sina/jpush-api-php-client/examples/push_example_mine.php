<?php
ini_set("display_errors", "On");
error_reporting(E_ALL | E_STRICT);
require_once("../src/JPush/JPush.php");

$app_key = '65520383c04639ea0b16f1e2';
$master_secret = 'b0d6a5e37cb86009918add31';

// 初始化
$client = new JPush($app_key, $master_secret);

$account = $_POST["account"];
$title =  $_POST["title"];
$content = $_POST["content"];

// 简单推送示例
$result = $client->push ()
	->setPlatform ( 'android' )
	->setMessage($content,$title,`String`,null)
	->addAlias($account)
	->send ();
    
echo 'Result=' . json_encode($result);