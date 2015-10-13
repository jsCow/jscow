<?php
    require_once("studio/php/config.php");

    // RELEASE VERSION UPDATEN
    $release = new releasePrepairer();
    $release->setCurrentApplication("AjaxChat");
    $release->prepairReleaseVersion();
?>
<!DOCTYPE html>
<html>
    <head>
        <title>jsCow - GUI Component Framework</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 

        <link type="text/css" rel="stylesheet" href="<?php echo $release->getOnlinePath($release->getJQueryUICssPath()); ?>" />
        <script type="text/javascript" src="<?php echo $release->getOnlinePath($release->getJQueryPath()); ?>"></script>
        <script type="text/javascript" src="<?php echo $release->getOnlinePath($release->getJQueryUIPath()); ?>"></script>

        <?php 
        if (isset($_GET["env"]) && $_GET["env"] == "development") { 

            echo '<link type="text/css" rel="stylesheet" href="'.$release->getOnlinePath($release->getReleaseDevelopmentPath()."/css/".$release->getThemeFileName()).'" />';
            echo '<script type="text/javascript" src="'.$release->getOnlinePath($release->getReleaseDevelopmentPath()."/".$release->getDevelopmentCoreLibFileName()).'"></script>';
            echo '<script type="text/javascript" src="'.$release->getOnlinePath($release->getReleaseDevelopmentPath()."/".$release->getDevelopmentApplicationLibFileName()).'"></script>';
            echo '<script type="text/javascript" src="'.$release->getOnlinePath($release->getReleaseDevelopmentPath()."/".$release->getDevelopmentComponentsLibFileName()).'"></script>';

            $files = $release->getComponentList();
            foreach( $files as $file ){
                echo '<script type="text/javascript" src="'.$release->getOnlinePath($release->getReleaseDevelopmentPath()."/res/".$release->getTheme()."/".$file["name"]).'"></script>';
            }

        }else{ 
            echo '<link type="text/css" rel="stylesheet" href="'.$release->getOnlinePath($release->getProductionCSS()).'" />';
            echo '<script type="text/javascript" src="'.$release->getOnlinePath($release->getProductionCoreLibPath()).'"></script>';
            echo '<script type="text/javascript" src="'.$release->getOnlinePath($release->getProductionCmpLibPath()).'"></script>';
        } 

        echo '<script type="text/javascript" src="jsCow-apps/'.$release->getCurrentApplication().'.js"></script>';
        ?>

        <script type="text/javascript" src="studio/js/scripts.js"></script>

        <style type="text/css">
            .studio-bar {
                background: #ddd;
                border-bottom: 1px solid #666;
            }
            .btn {
                padding: 5px 10px;
                margin: 10px;
            }
        </style>

    </head>
<body>
    <div class="studio-bar">
        <input class="btn btn-create-demo" type="button"
            data-action="create-demo-folder" 
            data-action-value="<?php echo $release->getCurrentApplication(); ?>" value="Create Example - <?php echo $release->getCurrentApplication(); ?>" />
    </div>
</body>
</html>