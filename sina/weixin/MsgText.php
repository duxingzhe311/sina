<?php
class MsgText{
	private $fromUsername;
	private $toUsername ;
	private $content ;
	private $time;
	
	public function __construct($fromUsername,$toUsername,$content){
		$this -> fromUsername = $fromUsername;
		$this -> toUsername = $toUsername;
		$this -> content = $content;
		$this -> time = time();
	}
	
	function str_rev_gb($str){
	    $array=array();
	    //将字符串存入数组
	    $l=mb_strlen($str,'UTF-8');
	    for($i=0;$i<$l;$i++){
	       $array[]=mb_substr($str,$i,1,'UTF-8');
	    }
	    //反转字符串
	    krsort($array);
	    //拼接字符串
	    $string=implode($array);
	    return $string;
	}
	
	public function getMsgContent(){
		$resContent = $this->str_rev_gb($this ->content);
		return 
				"<?xml version='1.0' encoding='utf-8'?>
				<xml>
					<ToUserName>". $this->fromUsername . "</ToUserName>
					<FromUserName>". $this->toUsername . "</FromUserName>
					<CreateTime>". $this->time . "</CreateTime>
					<MsgType>text</MsgType>
					<Content>" . $resContent . "</Content>
				</xml>";
	}
}
?>