<?php
    require_once("designer/php/configuration.php");

    // cfg VERSION UPDATEN
    $cfg = new cfg();
    $cfg->setCurrentApplication("Test");
    
?>
<!DOCTYPE html>
<html>
    <head>
        <title>jsCow - Javascript Component Framework</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        
        <link type="text/css" rel="stylesheet" href="gen/production/css/theme-min.css" />
        
		<script type="text/javascript" src="node_modules/jquery/dist/jquery.min.js"></script>
        <script type="text/javascript" src="gen/production/jscow/jscow.min.js"></script>
        <?php 
            
            foreach( $cfg->getComponentList() as $file ) 
            {
                echo '<script type="text/javascript" src="'.$cfg->getOnlinePath($file["path"].$file["name"]).'"></script>';
            }

            echo '<script type="text/javascript" src="apps/'.$cfg->getCurrentApplication().'.js"></script>';

        ?>

    </head>
<body>
    
</body>
</html>