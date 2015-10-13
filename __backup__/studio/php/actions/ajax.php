<?php

class jsCowService
{
	private $requestData = false;
	
	private $header = Array();
	private $data = Array();
	
	private $json = Array();
	private $xml = Array();
	private $html = Array();
	
	// CONSTRUCTOR ...
	
	public function __construct($requestData) {
		$this->requestData = $requestData;
	}
	
	// PUBLIC METHODS ...
	
	public function getResponse() {
		$method = "get".ucfirst($this->requestData["header"]["dataType"]);
		
		if (method_exists($this, $method)) {
			echo $this->$method();
		}
	}
	
	public function addData($data) {
		$this->data[] = $data;
	}
	
	// PRIVATE METHODS ...
	
	private function getHtml() {
		
		print_r($this->data);
		
		return "";
		
	}

	private function getJson() {
		
		$this->json = array(
			"request" => $this->requestData,
			"header" => $this->getHeader(),
			"response" => $this->data
		);
		
		return json_encode($this->json);
		
	}

	private function getXml() {
		
		$this->xml = array( 
			"xml" => array(
				"request" => $this->requestData,
				"header" => $this->getHeader(),
				"response" => $this->data
			)
		);
		
		return $this->xml_encode($this->xml);
		
	}
	
	private function getHeader() {
		
		$phpHeaderData = array(
			"REQUEST_TIME",
			"HTTP_HOST",
			"SERVER_NAME",
			"REQUEST_METHOD",
			"HTTP_REFERER",
			"HTTPS",
			"SERVER_PORT",
			"REQUEST_URI",
			"SERVER_PROTOCOL"
		);
		
		foreach( $phpHeaderData as $data )
		{
			if (isset($_SERVER[$data])) $this->header[strtolower($data)] = $_SERVER[$data];
		}
		
		return $this->header;
	}
	
	private function xml_encode($mixed, $domElement=null, $DOMDocument=null) {
		if(is_null($DOMDocument)){
			$DOMDocument=new DOMDocument;
			$DOMDocument->formatOutput=true;
			$this->xml_encode($mixed,$DOMDocument,$DOMDocument);
			return $DOMDocument->saveXML();
		}
		else{
			if(is_array($mixed)){
				foreach($mixed as $index=>$mixedElement){
					if(is_int($index)){
						if($index==0){
							$node=$domElement;
						}
						else{
							$node=$DOMDocument->createElement($domElement->tagName);
							$domElement->parentNode->appendChild($node);
						}
					}
					else{
						$plural=$DOMDocument->createElement($index);
						$domElement->appendChild($plural);
						$node=$plural;
						if(rtrim($index,'s')!==$index){
							$singular=$DOMDocument->createElement(rtrim($index,'s'));
							$plural->appendChild($singular);
							$node=$singular;
						}
					}
					$this->xml_encode($mixedElement,$node,$DOMDocument);
				}
			}
			else{
				$domElement->appendChild($DOMDocument->createTextNode($mixed));
			}
		}
	}
	
}

// Misc functions
function getFiles( $pfad, $rec = false ) 
{
	$all_files = array();
	
	$verz = opendir ( $pfad );
	if ($verz) {
		while ( $file = readdir( $verz ) ) 
		{
			if ( $file != ".." && $file != "." ) 
			{
				
				if( !is_dir( $pfad.$file ) )
				{
					$all_files[] = array( 
						"path" => $pfad, 
						"file" => $file, 
						"name" => basename($file, ".js")
					);
				}
				else
				{
					if ($rec) {
						$files = getFiles( $pfad.$file."/", $rec );
						foreach ( $files as $file )
						{
							$all_files[] = array( 
								"path" => $file["path"], 
								"file" => $file["name"],
								"name" => basename($file["name"], ".js")
							);
						}
					}
				}
				
			}
		}
		closedir( $verz );
	}
	
	return $all_files;
}

$files = getFiles("studio/js/jscow-apps/");
$service = new jsCowService($_POST);
foreach ($files as $file) {
	$service->addData($file);
}
echo $service->getResponse();

?>