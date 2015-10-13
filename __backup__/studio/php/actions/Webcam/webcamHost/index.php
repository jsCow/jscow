<?php

include("class.Webcam.php");

$camHost = new webcamHost($_POST["video_host"],$_POST["video_id"]);
$camHost->setLogo($_POST["video_logo"]);
$camHost->setWidth($_POST["video_width"]);	
$camHost->setHeight($_POST["video_height"]);
$camHost->setFPS($_POST["video_fsp"]);
$camHost->setKeyFrameInterval($_POST["video_keyFrameInterval"]);
$camHost->setQuality($_POST["video_quality"]);	
$camHost->show();

?>