/*
 * jsCow.res.components.videochat
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: August 18 10:30:00 2011
 */

/**
VideoChat-Komponente für den Aufbau eines Video-Chats.

@author Mario Linz
@class jsCow.res.components.videochat
@type Object
@module jsCow.res.components.videochat
@constructor 
*/
jsCow.res.components.videochat = function() {}
jsCow.res.components.videochat.prototype = {

	/**
	Init-Methode, die bei der Initialisierung der Komponente ausgeführt wird.
	
	@method init
	@return {Object} Instanz der jsCow-Komponente.
	**/
	init: function() {
		
		return this;
	},

	/**
	Setzt die Standard-MVC Klassen (Model, View, Controller) für die Komponente.
	Diese Methode hat keine Parameter, da sie automatisch bei der Initialisierung der Komponente vom Framework ausgeführt wird.
	
	@method setDefaultMVC
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setDefaultMVC: function() {
		
		// set model
		this.setModel(jsCow.res.model.videochat);
		// set view
		this.setView(jsCow.res.view.videochat);
		// set controller
		this.setController(jsCow.res.controller.videochat);
		
		return this;
	},
	
	/**
	 * @description Reload component
	 */	
	reload: function() {
		this.globalEvents.trigger("reload", {}, this);
		
		return this;
	},
	
	/**
	 * @description Set chat type sender
	 */	
	setChatSender: function(url) {
		if (url) o = { chatSenderUrl: url }; else o = {};
		this.globalEvents.trigger("setChatSender", o, this);
		
		return this;
	},
	
	/**
	 * @description Set chat type view
	 */	
	setChatStream: function(url) {
		if (url) o = { chatStreamUrl: url }; else o = {};
		this.globalEvents.trigger("setChatStream", o, this);
		
		return this;
	}
}

/*
 * jsCow.res.model.videochat - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
 * @description Class structure of 'jsCow.res.model.videochat'
 */
jsCow.res.model.videochat = function() {
	
	this.config = {
		globalDisabled: false,
		enabled: true,
		
		chatSenderUrl: false,
		chatStreamUrl: false,
		
		chatType: 'SENDER',	// [ SENDER | STREAM ]
		
		host: '',
		id: '',
		logo: '',
		width: 640,
		height: 480,
		fsp: 25,
		keyFrameInterval: 15,
		quality: 80
	}
	
};
jsCow.res.model.videochat.prototype = {

	init: function() {
		this.reload({
			data: this.config
		});
		
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	},
	
	reload: function(e) {
		if (this.isEnabled()) {
			
			var self = this;
			
			this.setConfig(e.data);
			
			if (this.getConfig("chatSenderUrl") || this.getConfig("chatStreamUrl")) {
				
				if (this.getConfig("chatType") == "SENDER") {
					var url = this.getConfig("chatSenderUrl");
				}else{ 
					var url = this.getConfig("chatStreamUrl");
				}
				
				$.ajax({
					type: "POST",
					url: url,
					data: {
						video_host: this.getConfig("host"),
						video_id: this.getConfig("id"),
						video_logo: this.getConfig("logo"),
						video_width: this.getConfig("width"),
						video_height: this.getConfig("height"),
						video_fsp: this.getConfig("fsp"),
						video_keyFrameInterval: this.getConfig("keyFrameInterval"),
						video_quality: this.getConfig("quality")
					},
					
					success: function(data) {
						self.setConfig({
							request: data
						});
						self.globalEvents.trigger("viewUpdate", self.getConfig(), self.getCmp());
					}
					
				});
			
			}
			
		}
	},
	
	setChatType: function(e) {
		this.setConfig({
			chatType: e.data
		});
	}
	
};

/*
 * jsCow.res.view.videochat - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
 * @description Class structure of 'jsCow.res.view.videochat'
 */
jsCow.res.view.videochat = function() {

	this.execInit = false;					// system variable
	this.type = "jsCow.res.view.videochat";		// system variable
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jscow-videochat');
	
	this.dom.videoChatContainer = false;
	
};
jsCow.res.view.videochat.prototype = {
	
	init: function(cfg) {
		
		var cfg = cfg.data;
		var videoChatContainer = false;
		
	},
	
	update: function(cfg) {
		var cfg = cfg.data;
		if (cfg) {
			
			// Disabled
			if (!cfg.enabled || cfg.globalDisabled) {
				
				
				
			// Enabled
			}else{
				
				this.dom.main.find("*").remove();
				
				this.dom.main.append(cfg.request);
				
				// Hide / Show
				if (cfg.hide) this.dom.main.addClass('jscow-hide'); else this.dom.main.removeClass('jscow-hide');
				
			}
			
		}
		
		return this;
	}
	
};

/*
 * jsCow.res.controller.videochat - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
 * @description Class structure of 'jsCow.res.controller.videochat'
 */
jsCow.res.controller.videochat = function() {

	this.type = "jsCow.res.controller.videochat";
	
};
jsCow.res.controller.videochat.prototype = {
	
	init: function() {
		// ...
	},
	
	handleReload: function(e) {
		if (this.isMethodExists(this.getModel().reload)) this.getModel().reload(e);
	},
	
	handleSetChatSender: function(e) {
		this.getCmp().setConfig(e.data);
		if (this.isMethodExists(this.getModel().setChatType)) this.getModel().setChatType({ data: 'SENDER' });
	},
	
	handleSetChatStream: function(e) {
		this.getCmp().setConfig(e.data);
		if (this.isMethodExists(this.getModel().setChatType)) this.getModel().setChatType({ data: 'STREAM' });
	}
	
};
