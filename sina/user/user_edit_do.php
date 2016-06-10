<?php
define('ADMIN_ROOT', dirname(__FILE__).DIRECTORY_SEPARATOR);
include ADMIN_ROOT . '../db/DBUtil.php';

$userName = $_POST["UserName"];
$password = $_POST["Password"];
$realName = $_POST["RealName"];
$userId = isset($_POST["id"]) ? $_POST["id"] : 0;

$dbUtil = DBUtil::getInstance();
$con = $dbUtil -> getConn();
if(!$con){
	echo "创建数据库连接失败！";			
	return;
}

$sql = "";
$oper = "";
if(0 == $userId){
	$sql = "INSERT  INTO User (UserName, Password, RealName, CreateTime)"
	 	. "VALUES ('"  . $userName . "' , '" . $password 
	 	. "', '" . $realName . "'" . ", NOW());";
	$oper = "添加";
}
else {
	$sql = "UPDATE User set UserName='" . $userName 
		. "',Password='" . $password . "',RealName='" 
		. $realName . "' where Id = " . $userId;
	$oper = "修改";
}

if(!$dbUtil->excute($sql)){
	die('Error: ' . mysql_error());
	return;
}

echo "<a href='/index.php'>已" . $oper . "，点此返回列表！</a>";
?>