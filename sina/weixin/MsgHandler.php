<?php
include ADMIN_ROOT . './MsgText.php';
include ADMIN_ROOT . './MsgImg.php';
include ADMIN_ROOT . './MsgEvent.php';

class MsgHandler{
	private $fromUsername;
	private $toUsername ;
	private $content ;
	private $event;
	private $eventKey;
	private $picUrl;
	private $msgType;
	private $time;
	
	public function __construct($xml){
		$this -> fromUsername = $xml -> getProp("FromUserName");
		$this -> toUsername = $xml -> getProp("ToUserName");
		$this -> content = $xml -> getProp("Content");
		$this -> event = $xml -> getProp("Event");
		$this -> eventKey = $xml -> getProp("EventKey");
		$this -> picUrl = $xml -> getProp("PicUrl");
		$this -> msgType = $xml -> getProp("MsgType");
		$this -> time = time();
	}
	
	public function createResponse(){
		switch ($this->msgType){
			case Consts::$MSG_TEXT:
				$textMsg = new MsgText($this->fromUsername, $this->toUsername, $this->content);
				return $textMsg->getMsgContent();
			case Consts::$MSG_IMG:
				$imgMsg = new MsgImg($this->fromUsername,$this->toUsername, $this->picUrl);
				return $imgMsg->getMsgContent();
			case Consts::$MSG_EVENT:
				if(Consts::$EVENT_CLICK == $this->event){
					$eventMsg = new MsgEvent($this->fromUsername, $this->toUsername,$this->eventKey);
				}else{
					$eventMsg = new MsgEvent($this->fromUsername, $this->toUsername,$this->event);
				}
				return $eventMsg->getMsgContent();
			case Consts::$MSG_VOICE:
			case Consts::$MSG_VIDEO:
			default:
				return "";
		}
	}
}
?>