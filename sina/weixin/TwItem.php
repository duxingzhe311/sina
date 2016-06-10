<?php 
class TwItem{
	private $title;
	private $description ;
	private $url;
	private $picUrl ;
	
	public function __construct($title,$description,$picUrl,$url){
		$this -> title = $title;
		$this -> description = $description;
		$this -> picUrl = $picUrl;
		$this -> url = $url;
	}
	
	public function createMsg(){
			return "<item>"
			. "<Title><![CDATA[" . $this -> title . "]]></Title>"
			. "<Description><![CDATA[" . $this -> description . "]]></Description>"
			. "<PicUrl><![CDATA[" . $this -> picUrl . "]]></PicUrl>"
			. "<Url><![CDATA[" . $this -> url . "]]></Url>"
			. "</item>";
	}
}
?>