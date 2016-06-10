<?php 
include ADMIN_ROOT . '../db/DBUtil.php';

class Log{
	private $info;
	
	public function __construct($info){
		$this->info = $info;
	}
	
	public function saveMe(){
		$dbUtil = DBUtil::getInstance();
		$con = $dbUtil -> getConn();
		if(!$con){
			return;
		}
		$sql = "INSERT INTO _log (RecordTime,Info)"
			 	. "VALUES (NOW(), '" .  $this->info . "');";
		$dbUtil->excute($sql);
	}
}
?>