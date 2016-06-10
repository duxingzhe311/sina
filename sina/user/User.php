<?php
class User{
	private $id = 0;
	private $userName = "";
	private $password = "";
	private $realName = "";
	private $createTime = "";

	public function __construct($id,$userName,$password,$createTime){
		$this -> id = $id;
		$this -> userNname = $userName;
		$this -> password = $password;
		$this -> createTime = $createTime;
	}

	public function toString(){
		return "id : " . $this -> id . ", userNname : " . $this -> userNname 
			. ", password :" . $this -> password . ", createTime :" 
			.  $this -> createTime . "<br>";
	}
}
?>