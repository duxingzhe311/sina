<?php
include ADMIN_ROOT . './TwItem.php';
class MsgEvent{
	private $fromUsername;
	private $toUsername ;
	private $time;
	private $event;
	
	public function __construct($fromUsername,$toUsername,$event){
		$this -> fromUsername = $fromUsername;
		$this -> toUsername = $toUsername;
		$this ->event = $event;
		$this -> time = time();
	}
	
	public function getMsgContent(){
		$resContent = "";
		
		switch ($this->event){
			case Consts::$EVENT_SUBSCRIBE:
				$resContent = "！吼吼！果效啥看看片图发以可也！呗试试你，来过转倒字文的发你把能我！号阅订的我阅订迎欢";
				
				$tiOne = new TwItem("欢迎关注我0", "我能把你发的文字倒转过来，试试吧！你也可以发图片哦！先给你来个美女，吼吼！",
				Consts::$IMG_MN_PREFIX . 0 . Consts::$IMG_MN_TAIL, Consts::$IMG_JUMP_URL . 0);
				$tiTwo = new TwItem("欢迎关注我1", "我能把你发的文字倒转过来，试试吧！你也可以发图片哦！先给你来个美女，吼吼！",
				 Consts::$IMG_MN_PREFIX . 1 . Consts::$IMG_MN_TAIL, Consts::$IMG_JUMP_URL . 1);
				$tiThree = new TwItem("欢迎关注我2", "我能把你发的文字倒转过来，试试吧！你也可以发图片哦！先给你来个美女，吼吼！",
				 Consts::$IMG_MN_PREFIX . 2 . Consts::$IMG_MN_TAIL, Consts::$IMG_JUMP_URL . 2);
				$tiFour = new TwItem("欢迎关注我3", "我能把你发的文字倒转过来，试试吧！你也可以发图片哦！先给你来个美女，吼吼！",
				 Consts::$IMG_MN_PREFIX . 3 . Consts::$IMG_MN_TAIL, Consts::$IMG_JUMP_URL . 3);
				$tiFive = new TwItem("欢迎关注我4", "我能把你发的文字倒转过来，试试吧！你也可以发图片哦！先给你来个美女，吼吼！",
				 Consts::$IMG_MN_PREFIX . 4 . Consts::$IMG_MN_TAIL, Consts::$IMG_JUMP_URL . 4);
				$tiSix = new TwItem("欢迎关注我5", "我能把你发的文字倒转过来，试试吧！你也可以发图片哦！先给你来个美女，吼吼！",
				 Consts::$IMG_MN_PREFIX . 5 . Consts::$IMG_MN_TAIL, Consts::$IMG_JUMP_URL . 5);
				$tiSeven = new TwItem("欢迎关注我6", "我能把你发的文字倒转过来，试试吧！你也可以发图片哦！先给你来个美女，吼吼！",
				 Consts::$IMG_MN_PREFIX . 6 . Consts::$IMG_MN_TAIL, Consts::$IMG_JUMP_URL . 6);
				$tiEight = new TwItem("欢迎关注我7", "我能把你发的文字倒转过来，试试吧！你也可以发图片哦！先给你来个美女，吼吼！",
				 Consts::$IMG_MN_PREFIX . 7 . Consts::$IMG_MN_TAIL, Consts::$IMG_JUMP_URL . 7);
				$tiNine = new TwItem("欢迎关注我8", "我能把你发的文字倒转过来，试试吧！你也可以发图片哦！先给你来个美女，吼吼！",
				 Consts::$IMG_MN_PREFIX . 8 . Consts::$IMG_MN_TAIL, Consts::$IMG_JUMP_URL . 8);
				$tiTen = new TwItem("欢迎关注我9", "我能把你发的文字倒转过来，试试吧！你也可以发图片哦！先给你来个美女，吼吼！",
				 Consts::$IMG_MN_PREFIX . 9 . Consts::$IMG_MN_TAIL, Consts::$IMG_JUMP_URL . 9);
				
				return
					"<xml>"	 
					. "<ToUserName><![CDATA[" . $this->fromUsername . "]]></ToUserName>"
					. "<FromUserName><![CDATA[" . $this->toUsername . "]]></FromUserName>"
					. "<CreateTime>" .  $this->time . "</CreateTime>"
					. "<MsgType><![CDATA[news]]></MsgType>"
					. "<ArticleCount>10</ArticleCount>"
						. "<Articles>"
						. $tiOne->createMsg()
						. $tiTwo->createMsg()
						. $tiThree->createMsg()
						. $tiFour->createMsg()
						. $tiFive->createMsg()
						. $tiSix->createMsg()
						. $tiSeven->createMsg()
						. $tiEight->createMsg()
						. $tiNine->createMsg()
						. $tiTen->createMsg()
						. "</Articles>"
					. "</xml>";
			case Consts::$EVENT_CLOUD:
			case Consts::$EVENT_MFTY:
				$num = rand(0,10);
				$tiOne = new TwItem("欢迎关注我" . $num, "我能把你发的文字倒转过来，试试吧！你也可以发图片哦！先给你来个美女，吼吼！",
				Consts::$IMG_MN_PREFIX . $num . Consts::$IMG_MN_TAIL, Consts::$IMG_JUMP_URL . $num);
				$num = rand(0,10);
				$tiTwo = new TwItem("欢迎关注我" . $num, "我能把你发的文字倒转过来，试试吧！你也可以发图片哦！先给你来个美女，吼吼！",
				Consts::$IMG_MN_PREFIX . $num . Consts::$IMG_MN_TAIL, Consts::$IMG_JUMP_URL . $num);
				return
					"<xml>"	 
					. "<ToUserName><![CDATA[" . $this->fromUsername . "]]></ToUserName>"
					. "<FromUserName><![CDATA[" . $this->toUsername . "]]></FromUserName>"
					. "<CreateTime>" .  $this->time . "</CreateTime>"
					. "<MsgType><![CDATA[news]]></MsgType>"
					. "<ArticleCount>2</ArticleCount>"
						. "<Articles>"
						. $tiOne->createMsg()
						. $tiTwo->createMsg()
						. "</Articles>"
					. "</xml>";
			case Consts::$EVENT_UNSUBSCRIBE:
			default:
				break;
		}
		return 
				"<xml>"
					. "<ToUserName>". $this->fromUsername . "</ToUserName>"
					. "<FromUserName>". $this->toUsername . "</FromUserName>"
					. "<CreateTime>". $this->time . "</CreateTime>"
					. "<MsgType>text</MsgType>"
					. "<Content>" . $resContent . "</Content>"
				. "</xml>";
	}
}
?>