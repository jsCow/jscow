<?php

class AjaxChat {
	
	private $data = false;
	private $json = "";
	
	private $ChatLog = false;
	private $ChatConfig = "ChatConfig";
	private $ChatConfigData = array();
	
	public function __construct($data) 
	{
		$this->data = $data;
		$this->json["header"] = $this->data["header"];
		
		$this->ChatConfig = "ChatConfig-".$this->data["userID"].".json";
		$this->ChatLog = "Chat-".$this->data["userID"].".log";
		
		if (isset($this->data["callSupport"]))
		{
			$this->readChatConfig();
			$this->json = array_merge($this->ChatConfigData, $this->json);
			
			echo "<pre>"; print_r($this->ChatConfigData); echo "</pre>";
		}
		else
		{
			$this->updateChatLog();
		}
		
	}
	
	private function readChatConfig()
	{
		// Solange keine Config existiert, automatisch eine Neue Datei erzeugen und anlegen.
		// ...
		
		// Config einlesen
		$json = file_get_contents($this->ChatConfig);
		$this->ChatConfigData = json_decode($json);
	}
	
	public function updateChatLog() 
	{
		$log = file_get_contents($this->ChatLog);
		file_put_contents($this->ChatLog, $log.$this->data["message"]."\r\n");
		
		$this->json["message"] = $this->data["message"];
		
	}
	
	public function getResponse() 
	{
		
		if ($this->data["header"]["dataType"] == "jsonp")
		{
			header('Access-Control-Allow-Origin: *');
			$callback = isset($_GET['callback']) ? preg_replace('/[^a-z0-9$_]/si', '', $_GET['callback']) : false;
			header('Content-Type: ' . ($callback ? 'application/javascript' : 'application/json') . ';charset=UTF-8');
			
			$cb = $this->data["header"]["jsonpCallback"];
			echo ($cb ? $cb.'(' : '').json_encode($this->json).($cb ? ');' : '');
		}
		else
		{
			echo json_encode($this->json, JSON_FORCE_OBJECT);
		}
		
	}
	
}

$AjaxChat = new AjaxChat($_POST);
$AjaxChat->getResponse();

?>