<?php
define('SAE_MYSQL_HOST_M', "127.0.0.1");
define('SAE_MYSQL_PORT', "3306");
define('SAE_MYSQL_USER', "root");
define('SAE_MYSQL_PASS', "cloud_angel");

class DBUtil{
	public static $DB_NAME = "test";

	private function __construct(){

	}
	private static $INS;

	public static function getInstance(){
		if(!(self::$INS instanceof self)){
			self::$INS = new self;
		}
		return self::$INS;
	}

	public function getConn(){
		return self::getConnByName(self::$DB_NAME);
	}

	public function getConnByName($dbName){
		$conn = mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS);
		if (!$conn){
			die('Could not connect: ' . mysql_error());
			return null;
		}
		if(mysql_select_db($dbName,$conn)){
			return $conn;
		}
		return null;
	}

	public function excute($query){
		if($result = mysql_query($query)){
			return $result;
		}
		return null;
	}
}
?>