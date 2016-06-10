<?php
class XmlUtil{
	private $xml;
	public function __construct($postObj){
		$this->xml = simplexml_load_string($postObj);
	}
	
	public function getProp($key){
		return $this->xml->$key;
	}
}
?>