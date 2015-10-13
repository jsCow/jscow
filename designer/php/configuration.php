<?php

class cfg {

    private $log = false;

    private $s = false;
    private $srcPath = "src";
    private $appsPath = "apps";

    private $currentApplication = "getting-startet-project";
    private $components = array();

    public function __construct($log = false) {
        $this->s = DIRECTORY_SEPARATOR;
        $this->log = $log;
        
        $this->setDefaultValues();
    }

	public function log($logMessage) {
		if ($this->log) {
			echo "<div>".$logMessage."</div>";
		}
	}

    public function setDefaultValues() {
        $this->components = $this->getFiles("gen/production/jscow/components/");
    }

    public function setCurrentApplication($app) {
        $this->currentApplication = $app;
    }
	
	public function getCurrentApplication() {
        return $this->currentApplication;
    }

	public function getComponentList() {
        return $this->components;
    }
    
    public function getFiles( $pfad, $rec = false ) 
    {
        $all_files = array();
        $pfad = $this->getOnlinePath($pfad);

        $verz = opendir ( $pfad );
        while ( $file = readdir( $verz ) ) 
        {
        	if ( $file != ".." && $file != "." && $file != ".svn" ) 
            {
            	$all_files[] = array( 
					"path" => $pfad, 
					"name" => $file 
                );
            }
        }
        closedir( $verz );
        
        return $all_files;
    }
    
    public function getOnlinePath($path) {
        return str_replace("\\", "/", $path);
    }

}

?>