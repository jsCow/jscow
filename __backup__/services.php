<?php 
	error_reporting(E_ALL);
	require_once("studio/php/config.php");
	
	$release = new releasePrepairer(false);
	$release->prepairReleaseVersion();
	
	// jsCow - Development - Services
	if (isset($_POST["action"]) && !empty($_POST["action"]) &&
		file_exists("studio/php/actions/".$_POST["action"].".php")) 
		require_once("studio/php/actions/".$_POST["action"].".php");
	
?>