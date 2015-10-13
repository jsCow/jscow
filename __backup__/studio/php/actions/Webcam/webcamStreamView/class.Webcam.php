<?php

/* webcam host klasse */
class webcamHost 
{
	/* object vars*/
	private $width = 640;
	private $height = 480;
	private $fps = 10;
	private $keyframeinterval = 15;
	private $quality = 90;
	private $swffile = "WebcamChat.swf";
	private $logoURL = "";
	private $streamingServerURL = "";
	private $streamFilename = "";
	private $flashVars = array();
	
	
	
	/* constructor */
	public function webcamHost($streamingServerURL, $streamFilename)
	{
		if($streamingServerURL != "" && $streamFilename != "")
		{
			$this->swffile = "dev/php/Webcam/webcamStreamView/".$this->swffile;
			$this->streamingServerURL = $streamingServerURL;
			$this->streamFilename = $streamFilename;
			
			$this->addFlashVar("red5url", $this->streamingServerURL);
			$this->addFlashVar("streamfilename", $this->streamFilename);
		}
	}
	
	
	/* setter methods */
	public function setLogo($value)
	{
		$this->logoURL = $value;
		$this->addFlashVar("logoURL", $this->logoURL);
	}
	public function setWidth($value)
	{
		$this->width = $value;
		$this->addFlashVar("width", $this->width);
	}	
	public function setHeight($value)
	{
		$this->height = $value;
		$this->addFlashVar("height", $this->height);
	}	
	public function setFPS($value)
	{
		$this->fps = $value;
		$this->addFlashVar("fps", $this->fps);
	}
	public function setKeyFrameInterval($value)
	{
		$this->keyframeinterval = $value;
		$this->addFlashVar("keyframeinterval", $this->keyframeinterval);
	}
	public function setQuality($value)
	{
		$this->quality = $value;
		$this->addFlashVar("quality", $this->quality);
	}
	
	
	
	/* add flash var */
	private function addFlashVar($var, $value)
	{
		$this->flashVars[$var] = $value;
	}
	
	
	/* show flashscript */
	public function show()
	{
		echo '<div id="flashContent">';
		echo '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'.$this->width.'" height="'.$this->height.'" id="WebcamChat" align="middle">';
			echo '<param name="movie" value="'.$this->swffile.'" />';
			echo '<param name="FlashVars" value="';
		
					/* write flash vars */
					$separator = "";
					foreach ($this->flashVars as $index => $value)
					{
						echo $separator.$index."=".$value;
						$separator = "&";
					}
		
		echo '">';
		echo '<param name="quality" value="high" />';
		echo '<param name="bgcolor" value="#ffffff" />';
		echo '<param name="play" value="true" />';
		echo '<param name="loop" value="true" />';
		echo '<param name="wmode" value="window" />';
		echo '<param name="scale" value="showall" />';
		echo '<param name="menu" value="true" />';
		echo '<param name="devicefont" value="false" />';
		echo '<param name="salign" value="" />';
		echo '<param name="allowScriptAccess" value="sameDomain" />';
		
		echo '<!--[if !IE]>-->';
		echo '<object type="application/x-shockwave-flash" data="'.$this->swffile.'" width="'.$this->width.'" height="'.$this->height.'">';
			echo '<param name="movie" value="WebcamChat.swf" />';		
			echo '<param name="FlashVars" value="';
			
				/* write flash vars */
				$separator = "";
				foreach ($this->flashVars as $index => $value)
				{
					echo $separator.$index."=".$value;
					$separator = "&";
				}
			
		echo '">';
		echo '<param name="quality" value="high" />';
		echo '<param name="bgcolor" value="#ffffff" />';
		echo '<param name="play" value="true" />';
		echo '<param name="loop" value="true" />';
		echo '<param name="wmode" value="window" />';
		echo '<param name="scale" value="showall" />';
		echo '<param name="menu" value="true" />';
		echo '<param name="devicefont" value="false" />';
		echo '<param name="salign" value="" />';
		echo '<param name="allowScriptAccess" value="sameDomain" />';
		echo '<!--<![endif]-->';
		echo '<a href="http://www.adobe.com/go/getflash">';
		echo '<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash Player" />';
		echo '</a>';
		echo '<!--[if !IE]>-->';
		echo '</object>';
		echo '<!--<![endif]-->';
		echo '</object>';
		echo '</div>';
	}
}

?>