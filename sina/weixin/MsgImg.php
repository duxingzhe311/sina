<?php 
class MsgImg{
	private $fromUsername;
	private $toUsername ;
	private $picUrl ;
	private $time;
	
	public function __construct($fromUsername,$toUsername,$picUrl){
		$this -> fromUsername = $fromUsername;
		$this -> toUsername = $toUsername;
		$this -> picUrl = $picUrl;
		$this -> time = time();
	}
	
	public function getMsgContent(){
		return
			"<xml>"	 
			. "<ToUserName><![CDATA[" . $this->fromUsername . "]]></ToUserName>"
			. "<FromUserName><![CDATA[" . $this->toUsername . "]]></FromUserName>"
			. "<CreateTime>" .  $this->time . "</CreateTime>"
			. "<MsgType><![CDATA[news]]></MsgType>"
			. "<ArticleCount>1</ArticleCount>"
				. "<Articles>"
				. "<item>"
				. "<Title>瞧瞧你发的破图</Title>"
				. "<Description>你发的破图，怎么这么破，怎么这么破，怎么这么破，哈哈哈哈哈哈哈哈！</Description>"
				. "<PicUrl>" . $this -> picUrl . "</PicUrl>"
				. "<Url>http://rockets311.sinaapp.com</Url>"
				. "</item>"
				. "</Articles>"
			. "</xml>";
	}
}
?>