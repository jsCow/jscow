<?php

// D:\dev.jscow.de\studio\js\lib\jscow\1.0.0>yuidoc . -o D:\dev.jscow.de\releases\jscow-release-1.0.0\jscow-yuidoc -T jscow -n

class releasePrepairer {

    private $log = false;

    private $project = false;
    private $s = false;

    private $developmentPath = false;
    private $yuiCompressor = false;

    private $jQueryVersion 		= "1.10.2";
    private $jQueryUIVersion 	= "1.10.3";
    private $jQueryUISuffix 	= ".custom";

    private $version                = "trunk";
    private $componentsPath         = "components";
    private $resDir                 = "res";
    private $appsPath               = "jscow-apps";

    private $studioPath 		= false;
    private $theme 			= false;
    private $releasePath		= false;
    private $examplesPath		= "/examples";

    private $CurrentApplication	= "scripts";

    private $includeComponentList = array();

    private $licenseFREE = "/*
-----BEGIN JSCOW FREE-TEST-LICENCE KEY BLOCK-----
mQENBFJaggsBCACLBsOnx3y0QByfw+e70BztXLvU4O3nMPXzfBbj413s98RiPdrI
1GtNV4W6uKlP0diw9sp3Jg0uLKer4kUwNvtbx9U3zBRNKA2y6FIbPZOOdx3zJbGh
BarErmp/We6AmAPU8x4l4iQgY1bXlHC5mUZi+WTZDsWYzD7eynnNEiDJm20u73d9
IxQbFWsX3yL22qYLQJAVd+aUFQXu5/NmK29iMSUtP5M4dLZaXsbPV6bifWMTkdf1
AQT0hFx2iqXOcX5eSzgNeWrV3zRpdkySD+QJ1zAlsGVujjUxpc75HLPTQH33X4br
9Ln+58wIdrGFmubMnyOAit4BNHVd/OFaKTRtABEBAAG0DGpzY293QGdteC5kZYkB
HAQQAQIABgUCUlqCCwAKCRD+bE9G7vRVnf54B/90AUehcd7Y/WFK9k6YLfuFY9PE
zQ8tJ+2/s6sh+prLXLrxFXExVWvlgF1r2mouX+H5uSMJCIntdHjt97jGEWA8OnpV
6PzZnJ+G/EjIng02/4iKDXMPslEZlY2YmsQeH+VVJCj6n2F6Uv4ltwuZBAcfYrbo
xfARlvKQ58+tQW4T9W5qGr2vNxdqPczOGIZne81YAylmD1slyzwT8NIlCzoABHUS
+qp/5hlFlChtdsilpSbSGvALSCXnx0tUM0WZoJRMRcnOCrNuVjhr73p+dOJJLzF3
UVMz5V9Avs8RR0xgSCp8gBovn52kp+JILOaTyrb90mZIoizyDPCsXBX8MeIL
=InMG
-----END JSCOW FREE-TEST-LICENCE KEY BLOCK-----
*/\n";
    
    private $licenseCOMMERCIAL = "/*
-----BEGIN JSCOW-1.0.0-LICENSE KEY BLOCK-----
mQENBFJee4IBCACGnCLIMjbOOUzs9EBUW3K8NZK+qR0RoYqQB16aKjNSnHuK78o7
OpQtzgSXbOB68/yNbSPiF92NASqV4PAH2GFtZSbafr3me6BqeZ8vU0kW1d4wC5Yf
7jRnkUxA8C0omVchnV5NyB0uxfbUfv78KwsQ2ITGvIGY86QR/6tFJIGZr55CZUXR
/c+zS26iWTCJfjzKgKI0MY3M21wVaC0z4MBuWst6MjY3SaR5DgcjKik7o2QZGFOm
tY9LNYnd6njBJAL7DYhABhkEZ1M6aAtfxPd+I1ETrSVs2y4GT+mmYEoFMfwlYUKW
0I1xYrcTcAGcMVErWPtjcyvlrUm1tkqBxSL9ABEBAAG0DGpzY293QGdteC5kZYkB
HAQQAQIABgUCUl57ggAKCRBDovORRvmwQc/zB/9HVDTakT9HOZUZeUememi29+do
vJ9mPfP3tTY8ThYXYjwkcFMXKRo3hKhbrMRhnBiH4+yWwh7nJHG+JA90FX0j4ojY
tdzLGnLiQnlzpByXQx87yqTOprhF48VpEHxBym56yRu+3OOh5IWOX6xGzWQDxMa1
ZD4hyCXUFqrlxuwBc/qA/dwPSoW8K8TyUqWRCPBzLrrGZrdAtjm3iQIxHq9rlMIA
nh8kgbe6GH4ayDlnlGF04XEiatcpQQeGyMlO1xEoWLRNQxi3Ser8la9leRBcZX/L
vjps9NOSp3b77s15IgyprSrrjJVqXQtJy+0lve9hSK45Q+CS05gOqgYq22kJ
=KXLW
-----END JSCOW-1.0.0-LICENSE KEY BLOCK-----
*/\n";
	
    public function __construct($log = false) {
        $this->s = DIRECTORY_SEPARATOR;
        echo $this->log = $log;

        $this->setDefaultValues();
    }

    public function log($logMessage) {
        if ($this->log) {
                echo "<div>".$logMessage."</div>";
        }
    }

    /* ======================================= */
    /* SETTER */
    /* ======================================= */

    public function setDefaultValues() {
        $this->setProject("jscow");

        $this->setDevelopmentPath("D:");

        // Nicht in Verwendung...
        $this->setYuiCompressor("java.exe -jar C:".$this->s."yuicompressor".$this->s."YUICompressors".$this->s."yuicompressor-2.4.2.jar");

        $this->setTheme("base");		
        $this->setStudioPath("studio");

        if($this->version == "trunk")
            $this->setReleasePath("gen".$this->s."releases".$this->s.$this->project."-release");
        else
            $this->setReleasePath("gen".$this->s."releases".$this->s.$this->project."-release-".$this->version);

        $this->includeComponentList = array(
                "ajax",
                "bar",
                "button",
                "checkbox",
                "fieldset",
                "group",
                "input",
                "textarea",
                "label",
                "panel",
                "radio",
                "resizer",
                "splitter",
                "window",
                "videochat"
        );
        
    }

    public function setCurrentApplication($appName)	{
        $this->CurrentApplication = $appName;
    }

    public function setVersion($version) {
        $this->version = $version;
    }

    public function setDevelopmentPath($developmentPath) {
        $this->developmentPath = $developmentPath.$this->s.$this->project;
    }

    public function setJQueryVersion($version) {
        $this->jQueryVersion = $version;
    }

    public function setJQueryUIVersion($version) {
        $this->jQueryUIVersion = $version;
    }

    public function setYuiCompressor($yui) {
        $this->yuiCompressor = $yui;
    }

    public function setStudioPath($studioPath) {
        $this->studioPath = $studioPath;
    }

    public function setProject($project) {
        $this->project = $project;
    }

    public function setTheme($theme) {
        $this->theme = $theme;
    }

    public function setReleasePath($path) {
        $this->releasePath = $path;
    }

    public function setExamplesPath($path) {
        $this->examplesPath = $path;
    }

    /* ======================================= */
    /* GETTER */
    /* ======================================= */

    public function getCurrentApplication()	{
        return $this->CurrentApplication;
    }

    public function getIncludeComponentList() {
        return $this->includeComponentList;
    }

    public function getDevelopmentPath() {
        return $this->developmentPath;
    }

    private function getYuiCompressor() {
        return $this->yuiCompressor;
    }

    public function getTheme() {
        return $this->theme;
    }

    public function getThemeFileName() {
        if ($this->version == "trunk")
            return $this->project."-theme-".$this->theme.".css";
        else
            return $this->project."-".$this->version."-theme-".$this->theme.".css";
    }

    private function getThemeMinFileName() {
        if ($this->version == "trunk")
            return $this->project."-theme-".$this->theme."-min.css";
        else
            return $this->project."-".$this->version."-theme-".$this->theme."-min.css";
    }

    private function getDevelopmentCSSPath() {
        return $this->getReleaseDevelopmentPath().$this->s."css";
    }

    private function getCSSPath() {
        return $this->componentsPath.$this->s.$this->project.$this->s.$this->version.$this->s."css";
    }

    private function getProductionCSSPath() {
        return $this->getReleaseProductionPath().$this->s."css";
    }

    private function getMinFileName() {
        if ($this->version == "trunk")
            return $this->project."-min.js";
        else
            return $this->project."-".$this->version."-min.js";
    }

    private function getCmpMinFileName() {
        if ($this->version == "trunk")
            return $this->project."-cmp-".$this->theme."-min.js";
        else
            return $this->project."-".$this->version."-cmp-".$this->theme."-min.js";
    }

    private function getJQueryFileName() {
        return "jquery-".$this->jQueryVersion.".min.js";
    }

    public function getJQueryPath($file = true) {
        if ($file)
            return "lib".$this->s."jquery".$this->s.$this->jQueryVersion.$this->s.$this->getJQueryFileName();
        else
            return "lib".$this->s."jquery".$this->s.$this->jQueryVersion;
    }

    private function getJQueryUIFileName() {
        return "jquery-ui-".$this->jQueryUIVersion.$this->jQueryUISuffix.".min.js";
    }

    public function getJQueryUIPath() {
        return "lib".$this->s."jquery".$this->s.$this->jQueryVersion.$this->s.$this->getJQueryUIFileName();
    }

    private function getJQueryUICssFileName() {
        return "jquery-ui-".$this->jQueryUIVersion.$this->jQueryUISuffix.".css";
    }

    public function getJQueryUICssPath() {
        return "lib".$this->s."jquery".$this->s.$this->jQueryVersion.$this->s."ui-lightness".$this->s.$this->getJQueryUICssFileName();
    }

    private function getReleasePath() {
        return $this->releasePath;
    }

    private function getReleaseProductionPath() {
        return $this->releasePath.$this->s."production";
    }

    public function getReleaseDevelopmentPath() {
        return $this->releasePath.$this->s."development";
    }

    private function getGettingStartedProjectFileName() {
        if ($this->version == "trunk")
            return $this->project."-getting-started-package";
        else
            return $this->project."-".$this->version."-getting-started-package";
    }

    private function getProjectLibPath() {
        $path = "lib".$this->s."core";
        if ($this->version == "trunk") 
            $path .= $this->s."trunk";
        else
            $path .= $this->s.$this->version;

        return $path;
    }

    public function getDevelopmentCoreLibFileName() {
        return $this->project.".js";
    }

    public function getDevelopmentApplicationLibFileName() {
        return $this->project.".application.js";
    }

    public function getDevelopmentComponentsLibFileName() {
        return $this->project.".components.js";
    }

    public function getCSS() {
        return $this->componentsPath.$this->s.$this->project.$this->s.$this->version.$this->s."css".$this->s.$this->getThemeFileName();
    }

    private function getDevelopmentCoreLibPath() {
        return $this->studioPath.$this->s."js".$this->s."lib".$this->s.$this->project.$this->s.$this->version.$this->s.$this->getDevelopmentCoreLibFileName();
    }

    private function getDevelopmentApplicationLibPath() {
        return $this->studioPath.$this->s."js".$this->s."lib".$this->s.$this->project.$this->s.$this->version.$this->s.$this->getDevelopmentApplicationLibFileName();
    }

    private function getDevelopmentComponentsLibPath() {
        return $this->studioPath.$this->s."js".$this->s."lib".$this->s.$this->project.$this->s.$this->version.$this->s.$this->getDevelopmentComponentsLibFileName();
    }

    public function getProductionCoreLibPath() {
        return $this->getReleaseProductionPath().$this->s.$this->getMinFileName();
    }

    public function getProductionCmpLibPath() {
        return $this->getReleaseProductionPath().$this->s.$this->resDir.$this->s.$this->getCmpMinFileName();
    }

    public function getProductionCSS() {
        return $this->getReleaseProductionPath().$this->s."css".$this->s.$this->getThemeMinFileName();
    }

    private function getDocSamplePath() {
        return $this->studioPath.$this->s."php".$this->s.$this->project."-documentation-sample";
    }

    private function getProductionDocPath() {
        return $this->getReleaseProductionPath().$this->s.$this->project."-".$this->version."-documentation";
    }

    private function getProductionDocPagesPath() {
        return $this->getReleaseProductionPath().$this->s.$this->project."-".$this->version."-documentation".$this->s."pages";
    }

    public function getExamplesPath() {
        return $this->examplesPath;
    }

    public function getComponentList() {
        $componentsPath = $this->componentsPath.$this->s.$this->project.$this->s.$this->version.$this->s.$this->resDir.$this->s.$this->getTheme().$this->s;

        return $this->getComponentFiles( $componentsPath, true);
    }

    /* ======================================= */
    /* Misc */
    /* ======================================= */

    public function getOnlinePath($path) {
        return str_replace("\\", "/", $path);
    }
    
    public function getComponentFiles( $pfad, $rec = false ) 
    {
        $all_files = array();
        $pfad = $this->getOnlinePath($pfad);

        $verz = opendir ( $pfad );
        while ( $file = readdir( $verz ) ) 
        {
                if ( $file != ".." && $file != "." && $file != ".svn" ) 
                {

                        if( !is_dir( $pfad.$file ) && $rec )
                        {
                                $all_files[] = array( 
                                        "path" => $pfad, 
                                        "name" => $file 
                                );
                        }
                        else
                        {
                                $files = $this->getComponentFiles( $pfad.$file."/", $rec );
                                foreach ( $files as $file )
                                {
                                        $all_files[] = array( 
                                                "path" => $file["path"], 
                                                "name" => $file["name"] 
                                        );
                                }
                        }

                }
        }
        closedir( $verz );

        return $all_files;
    }

    private function setFileHeaderInfo($file, $info) {
        if (file_exists($file))
        {
            $code = file_get_contents($file);
            $handle = fopen($file, "w+");
            fwrite($handle, $info);
            fwrite($handle, $code);
            fclose($handle);
        }
    }

    /* ======================================= */
    /* Actions */
    /* ======================================= */

    public function prepairReleaseVersion() {

        // Create all neccesary root folders
        @mkdir("components\jscow\trunk\res\base", 0, true);
        @mkdir("lib\core", 0, true);
        @mkdir("gen", 0, true);
        // end - Create all neccesary root folders

        @mkdir($this->getReleasePath(), 0, true);

        @mkdir($this->getReleaseDevelopmentPath(), 0, true);
        @mkdir($this->getReleaseDevelopmentPath()."/res/".$this->getTheme(), 0, true);
        @mkdir($this->getDevelopmentCSSPath(), 0, true);

        @mkdir($this->getReleaseProductionPath(), 0, true);
        @mkdir($this->getReleaseProductionPath()."/res/".$this->getTheme(), 0, true);
        @mkdir($this->getProductionCSSPath(), 0, true);

        $componentsPath = $this->componentsPath.$this->s.$this->project.$this->s.$this->version.$this->s.$this->resDir.$this->s.$this->getTheme().$this->s;
        $jscow_cmp_base_files = $this->getComponentFiles( $componentsPath, true);

        // ===== Compress and copy component files =====
        $allBaseComponentsCode = "";
        foreach( $jscow_cmp_base_files as $file )
        {
            $pathSplit = explode("/", $file["path"]);
            $cmpDir = $pathSplit[count($pathSplit)-2];

            if (in_array($cmpDir, $this->includeComponentList)) 
            {
                $allBaseComponentsCode .= file_get_contents($file["path"].$file["name"]);

                $fileInfo = explode(".", $file["name"]);
                $minFileName = $fileInfo[0]."-min.".$fileInfo[1];
                $developmentMinFileNamePath = $this->getOnlinePath($this->getReleaseDevelopmentPath())."/".$this->resDir."/".$this->getTheme()."/".$file["name"];
                $productionMinFileNamePath = $this->getOnlinePath($this->getReleaseProductionPath())."/".$this->resDir."/".$this->getTheme()."/".$minFileName;

                $fromFile = $this->getOnlinePath($componentsPath.$cmpDir."/".$file["name"]);

                if (!file_exists($productionMinFileNamePath) OR (filemtime($fromFile) > filemtime($productionMinFileNamePath)) ) {

                    // Copy components into release development directory
                    copy($fromFile, $developmentMinFileNamePath);
                    $this->log("copy ".$fromFile." to ".$developmentMinFileNamePath);

                    // Copy component into release production directory and minimize
                    copy($fromFile, $productionMinFileNamePath);
                    $shellStr = $this->getYuiCompressor()." \"".realpath($productionMinFileNamePath)."\" -o \"".realpath($productionMinFileNamePath)."\"";
                    shell_exec($shellStr);
                    $this->setFileHeaderInfo($productionMinFileNamePath, "/* ".$this->project." - Javascript Component Framework - ".$fileInfo[0]."-".$this->version." - Mario Linz - http://www.jscow.de */");

                }
            }
        }

        $compressedComponentFile = $this->getReleaseProductionPath()."/res/".$this->getCmpMinFileName();
        $handle = fopen( $compressedComponentFile, "w");
        fwrite($handle, $allBaseComponentsCode);
        fclose($handle);
        shell_exec($this->getYuiCompressor().' '.realpath($this->getOnlinePath($compressedComponentFile)).' -o '.realpath($this->getOnlinePath($compressedComponentFile)));
        $this->setFileHeaderInfo($this->getOnlinePath($compressedComponentFile), "/* ".$this->project." - Javascript Component Framework - Components Package ".$this->version." (".$this->getTheme().") - Mario Linz - http://www.jscow.de */\n");

        // ===== end - Compress and copy component files =====


        // ===== Copy all core files into release development dir =====
        $this->updateCoreFiles();

        // ===== Copy css file into release development dir =====
        $this->updateCSSFile();

        // ===== Create the online products download file =====
        $this->createOnlineProductsDownloadFile();

    }

    private function updateCSSFile() {
        // Development
        shell_exec("xcopy ".realpath($this->getCSSPath())." ".realpath($this->getDevelopmentCSSPath())." /Y /E /I /C /H /R");

        // Production
        copy($this->getCSS(), $this->getProductionCSSPath().$this->s.$this->getThemeMinFileName());
        shell_exec($this->getYuiCompressor().' '.realpath($this->getProductionCSSPath().$this->s.$this->getThemeMinFileName()).' -o '.realpath($this->getProductionCSSPath().$this->s.$this->getThemeMinFileName()));
        $this->setFileHeaderInfo($this->getOnlinePath($this->getProductionCSSPath().$this->s.$this->getThemeMinFileName()), "/* ".$this->project." - Javascript Component Framework - Components Package ".$this->version." (".$this->getTheme().") - Mario Linz - http://www.jscow.de */\n");

        // COPY CSS IMAGES
        @mkdir($this->getReleaseProductionPath()."/css/img", 0, true);
        shell_exec("xcopy ".realpath($this->getCSSPath()."/img")." ".realpath($this->getReleaseProductionPath()."/css/img")." /Y /E /I /C /H /R");

    }

    private function updateCoreFiles() {
        if (
            !file_exists($this->getReleaseDevelopmentPath().$this->s.$this->getDevelopmentCoreLibFileName()) || 
            !file_exists($this->getDevelopmentApplicationLibFileName().$this->s.$this->getDevelopmentApplicationLibFileName()) || 
            !file_exists($this->getDevelopmentComponentsLibFileName().$this->s.$this->getDevelopmentComponentsLibFileName()) || 
            (filemtime($this->getProjectLibPath().$this->s.$this->getDevelopmentCoreLibFileName()) > filemtime($this->getReleaseDevelopmentPath().$this->s.$this->getDevelopmentCoreLibFileName())) ||
            (filemtime($this->getProjectLibPath().$this->s.$this->getDevelopmentApplicationLibFileName()) > filemtime($this->getReleaseDevelopmentPath().$this->s.$this->getDevelopmentApplicationLibFileName())) ||
            (filemtime($this->getProjectLibPath().$this->s.$this->getDevelopmentComponentsLibFileName()) > filemtime($this->getReleaseDevelopmentPath().$this->s.$this->getDevelopmentComponentsLibFileName()))
        ) {
            copy($this->getProjectLibPath().$this->s.$this->getDevelopmentCoreLibFileName(), $this->getReleaseDevelopmentPath().$this->s.$this->getDevelopmentCoreLibFileName());
            copy($this->getProjectLibPath().$this->s.$this->getDevelopmentApplicationLibFileName(), $this->getReleaseDevelopmentPath().$this->s.$this->getDevelopmentApplicationLibFileName());
            copy($this->getProjectLibPath().$this->s.$this->getDevelopmentComponentsLibFileName(), $this->getReleaseDevelopmentPath().$this->s.$this->getDevelopmentComponentsLibFileName());

            // Compress all core files into a "-min" file.
            $this->compressCoreMinFile();
        }
    }

    private function compressCoreMinFile() {

        $minFile = $this->getOnlinePath($this->getReleaseProductionPath())."/".$this->getMinFileName();

        $handle = fopen($minFile, "w");
        fwrite($handle, file_get_contents($this->getReleaseDevelopmentPath().$this->s.$this->getDevelopmentCoreLibFileName()) );
        fwrite($handle, file_get_contents($this->getReleaseDevelopmentPath().$this->s.$this->getDevelopmentApplicationLibFileName()) );
        fwrite($handle, file_get_contents($this->getReleaseDevelopmentPath().$this->s.$this->getDevelopmentComponentsLibFileName()) );
        fclose($handle);


        //echo $this->getYuiCompressor().' '.realpath($minFile).' -o '.realpath($minFile);
        shell_exec($this->getYuiCompressor().' '.realpath($minFile).' -o '.realpath($minFile));
        $this->log("compress &gt;&gt;&gt; ".$this->getMinFileName());

        $this->setFileHeaderInfo($minFile, "/* ".$this->project." - Javascript Component Framework - Mario Linz - http://www.jscow.de */\n");

    }

    private function createOnlineProductsDownloadFile() {
        if ($this->version == "trunk")
            $packagePath = $this->getReleasePath()."/product-".$this->project."-release-download";
        else
            $packagePath = $this->getReleasePath()."/product-".$this->project."-".$this->version."-release-download";

        if (file_exists($packagePath)) shell_exec("rmdir /s /q ".realpath($packagePath));

        @mkdir($packagePath, 0, true);
        @mkdir($packagePath."/production", 0, true);
        @mkdir($packagePath."/development/res/".$this->getTheme(), 0, true);

        // Copy directory "production/" into the package dir
        shell_exec("xcopy ".realpath($this->getReleaseProductionPath())." ".realpath($packagePath."/production")." /Y /E /I /C /H /R");

        // Copy components directory into package "development/" directory
        shell_exec("xcopy ".realpath($this->getReleaseDevelopmentPath()."/res/".$this->getTheme())." ".realpath($packagePath."/development/res/".$this->getTheme())." /Y /E /I /C /H /R");

        // Add the commercial key block into jsCow file
        $this->setFileHeaderInfo($packagePath."/production/".$this->getMinFileName(), $this->licenseCOMMERCIAL);

        // Copy license file into package dir
        copy($this->studioPath."/php/license.info", $packagePath."/license.info");

        // Create the package RAR
        require_once("PclZip.php");

        if ($this->version == "trunk")
        {
            $removePath = "gen\\releases\\".$this->project."-release\\product-".$this->project."-release-download";
            $archive = new PclZip($packagePath."/product-".$this->project."-release-download.zip");
        }
        else
        {
            $removePath = "gen\\releases\\".$this->project."-release-".$this->version."\\product-".$this->project."-".$this->version."-release-download";
            $archive = new PclZip($packagePath."/product-".$this->project."-".$this->version."-release-download.zip");
        }

        $v_list = $archive->add($packagePath, PCLZIP_OPT_REMOVE_PATH, $removePath);
    }

    public function createExample($id = false) {

        $examplePath = $this->getReleasePath().$this->getExamplesPath()."/".$id;
        $exampleName = $this->project."-".$this->version."-".$id;

        $releaseExamplePath = $this->getReleasePath().$this->getExamplesPath()."/".$exampleName;

        $jsPath = $examplePath."/js";
        $libPath = $examplePath."/js/lib/".$this->project;
        $resPath = $examplePath."/js/lib/".$this->project."/res";
        $cssPath = $examplePath."/js/lib/".$this->project."/css";
        $applicationsPath = $examplePath."/js/lib/".$this->project."/applications";

        $jqueryPath = $examplePath."/js/lib/jquery/".$this->jQueryVersion;

        //Remove old example directory
        if (file_exists($releaseExamplePath)) shell_exec("rmdir /s /q ".realpath($releaseExamplePath));

        @mkdir($examplePath, 0, true);

        @mkdir($resPath, 0, true);
        @mkdir($cssPath, 0, true);
        @mkdir($applicationsPath, 0, true);
        @mkdir($jqueryPath, 0, true);

        @copy($this->getOnlinePath($this->getProductionCSS()), $cssPath."/".$this->getThemeMinFileName());
        @copy($this->getOnlinePath($this->getProductionCoreLibPath()), $libPath."/".$this->getMinFileName());
        @copy($this->getOnlinePath($this->getProductionCmpLibPath()), $resPath."/".$this->getCmpMinFileName());

        shell_exec("xcopy ".realpath($this->getJQueryPath(false))." ".realpath($jqueryPath)." /Y /E /I /C /H /R");

        $handle = fopen( $examplePath."/index.html", "w");
        fwrite($handle, '<!DOCTYPE html><html><head>
                <title>jsCow - Component Framework - Example - '.$id.'</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 

                <link type="text/css" rel="stylesheet" href="js/lib/jquery/'.$this->jQueryVersion.'/ui-lightness/'.$this->getJQueryUICssFileName().'" />
                <script type="text/javascript" src="js/lib/jquery/'.$this->jQueryVersion.'/'.$this->getJQueryFileName().'"></script>
                <script type="text/javascript" src="js/lib/jquery/'.$this->jQueryVersion.'/'.$this->getJQueryUIFileName().'"></script>

                <link type="text/css" rel="stylesheet" href="js/lib/'.$this->project.'/css/'.$this->getThemeMinFileName().'" />
                <script type="text/javascript" src="js/lib/'.$this->project.'/'.$this->getMinFileName().'"></script>
                <script type="text/javascript" src="js/lib/'.$this->project.'/res/'.$this->getCmpMinFileName().'"></script>

                <script type="text/javascript" src="js/scripts.js"></script>

        </head>
        <body></body></html>');
        fclose($handle);

        $handle = fopen( $jsPath."/scripts.js", "w");
        fwrite($handle, file_get_contents($this->getOnlinePath($this->appsPath.$this->s.$id.".js")) );
        fclose($handle);

        @rename($examplePath, $releaseExamplePath);

        require_once("PclZip.php");
        $removePath = "releases\\".$this->project."-release-".$this->version."\\examples";
        $archive = new PclZip($releaseExamplePath.'.zip');
        $v_list = $archive->add($releaseExamplePath, PCLZIP_OPT_REMOVE_PATH, $removePath);

        @rename($releaseExamplePath.'.zip', $releaseExamplePath."/".$exampleName.'.zip');

    }
    
    public function createDemoFolder($demoID) {

        $demoDir = "examples";
        $demoPath = $this->getOnlinePath($this->getReleasePath()."/".$demoDir."/".$demoID);

        $jqueryPath = $demoPath."/js/lib/jquery";
        $jscowPath = $demoPath."/js/lib/jscow";

        //Remove old documentation directory
        if (file_exists($demoPath)) shell_exec("rmdir /s /q ".realpath($demoPath));
        @mkdir($demoPath, 0, true);

        // INDEX
        $handle = fopen($demoPath."/index.html", "w+");
        fwrite($handle, '<!DOCTYPE html><html><head><title>jsCow - GUI Component Framework - Demo - '.$demoID.'</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
        	
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
            <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>

            <link type="text/css" rel="stylesheet" href="js/lib/'.$this->project.'/css/'.$this->getThemeMinFileName().'" />
            <script type="text/javascript" src="js/lib/'.$this->project.'/'.$this->getMinFileName().'"></script>
            <script type="text/javascript" src="js/lib/'.$this->project.'/res/'.$this->getCmpMinFileName().'"></script>

            <script type="text/javascript" src="js/scripts.js"></script>

        ');
        fwrite($handle, '</head><body></body></html>');
        fclose($handle);

        // JS
        @mkdir($jqueryPath."/".$this->jQueryVersion, 0, true);
        @mkdir($jscowPath, 0, true);

        // COPY JSCOW
        shell_exec("xcopy ".realpath($this->getReleaseProductionPath())." ".realpath($demoPath."/js/lib/jscow")." /Y /E /I /C /H /R");

        // COPY JQUERY
        shell_exec("xcopy ".realpath($this->getJQueryPath(false))." ".realpath($jqueryPath."/".$this->jQueryVersion)." /Y /E /I /C /H /R");

        // JSCOW SCRIPTS
        $handle = fopen( $demoPath."/js/scripts.js", "w");
        fwrite($handle, file_get_contents($this->getOnlinePath($this->appsPath.$this->s.$demoID.".js")) );
        fclose($handle);

        // TEST LICENCE
        $this->setFileHeaderInfo($demoPath."/js/lib/jscow/jscow-".$this->version."-min.js", $this->licenseFREE);

        require_once("PclZip.php");
        $removePath = "gen\\releases\\".$this->project."-release\\examples\\".$demoID;
        $archive = new PclZip($demoPath.'/'.$demoID.'.zip');
        $v_list = $archive->add($demoPath, PCLZIP_OPT_REMOVE_PATH, $removePath);

    }

}

?>