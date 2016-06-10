<?php
define('ADMIN_ROOT', dirname(__FILE__).DIRECTORY_SEPARATOR);
include ADMIN_ROOT . '../db/DBUtil.php';

$userId = isset($_GET["id"]) ? $_GET["id"] : 0;

$dbUtil = DBUtil::getInstance();
$con = $dbUtil -> getConn();
if(!$con){
	echo "创建数据库连接失败！";			
	return;
}

$sql = "delete from User where Id = " . $userId;

if(!$dbUtil->excute($sql)){
	die('Error: ' . mysql_error());
	return;
}

echo "<a href='/index.php'>已删除，点此返回列表！</a>";
?>