<?php
define('ADMIN_ROOT', dirname(__FILE__).DIRECTORY_SEPARATOR);
include ADMIN_ROOT . './Consts.php';
include ADMIN_ROOT . './XmlUtil.php';
include ADMIN_ROOT . './MsgHandler.php';
include ADMIN_ROOT . '../log/Log.php';


$echostr = $_GET["echostr"];
if($echostr){
	echo $echostr;
	return;
}
$postStr = file_get_contents("php://input");

//$postStr = "<xml><ToUserName><![CDATA[gh_86ec80d052a9]]></ToUserName><FromUserName><![CDATA[owU1CtyskLGCUae1ap6KY3I7JKy8]]></FromUserName><CreateTime>1409209803</CreateTime><MsgType><![CDATA[event]]></MsgType><Event><![CDATA[subscribe]]></Event><EventKey><![CDATA[]]></EventKey></xml>";
$log = new Log($postStr);
$log->saveMe();

$xmlUtil = new XmlUtil($postStr);
$msgHandler = new MsgHandler($xmlUtil);
$responseXml = $msgHandler->createResponse();

echo $responseXml;
?>