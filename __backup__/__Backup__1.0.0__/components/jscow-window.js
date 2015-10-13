/*
 * jsCow.res.components.window
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */
 
/**
Window-Komponente für die Darstellung eines typischen Windows.

@author Mario Linz
@class jsCow.res.components.window
@type Object
@module jsCow.res.components.window
@constructor 
*/
jsCow.res.components.window = function() {}
jsCow.res.components.window.prototype = {
	
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
		this.setModel(jsCow.res.model.window);
		// set view
		this.setView(jsCow.res.view.window);
		// set controller
		this.setController(jsCow.res.controller.window);

	},
	
	/**
	 * @description Set top position
	 */	
	/*
		@group Components
		@page Window
		@title setTop(<pixel>)
		@description Löst das Event "setTop" aus und setzt den Wert für die Top-Position der Window-Komponente.
		@examples cmp.window.setTop
	*/
	/*
	setTop: function(top) {
		this.globalEvents.trigger("setTop", {
			__top__: top
		}, this);
		
		return this;
	},
	*/
	
	/**
	 * @description Set left position
	 */	
	/*
		@group Components
		@page Window
		@title setLeft(<pixel>)
		@description Löst das Event "setLeft" aus und setzt den Wert für die Left-Position der Window-Komponente.
		@examples cmp.window.setLeft
	*/
	/*
	setLeft: function(left) {
		this.globalEvents.trigger("setLeft", {
			__left__: left
		}, this);
		
		return this;
	},
	*/
	
	/**
	 * @description Set z-index
	 */	
	/*
		@group Components
		@page Window
		@title setZIndex(<int>)
		@description Löst das Event "setZIndex" aus und setzt den Wert für die z-Index der Komponente.
		@examples cmp.window.setZIndex
	*/
	setZIndex: function(zindex) {
		this.globalEvents.trigger("setZIndex", {
			__zindex__: zindex
		}, this);
		
		return this;
	},

	/**
	 * @description Display the Window Close Button
	 */	
	/*
		@group Components
		@page Window
		@title showCloseButton()
		@description Löst das Event "showCloseButton" aus und blendet den Schließen-Button der Komponente ein.
		@examples cmp.window.showCloseButton
	*/
	showCloseButton: function() {
		this.globalEvents.trigger("showCloseButton", {}, this);
		
		return this;
	},
	
	/**
	 * @description Display the Window Close Button
	 */	
	/*
		@group Components
		@page Window
		@title hideCloseButton()
		@description Löst das Event "hideCloseButton" aus und versteckt den Schließen-Button der Komponente.
		@examples cmp.window.hideCloseButton
	*/
	hideCloseButton: function() {
		this.globalEvents.trigger("hideCloseButton", {}, this);
		
		return this;
	},

	/**
	 * @description Display the Window Maximize Button
	 */	
	/*
		@group Components
		@page Window
		@title showMaxButton()
		@description Löst das Event "showMaxButton" aus und blendet den Maximieren-Button der Komponente ein.
		@examples cmp.window.showMaxButton
	*/
	showMaxButton: function() {
		this.globalEvents.trigger("showMaxButton", {}, this);
		
		return this;
	},
	
	/**
	 * @description Display the Window Maximize Button
	 */	
	/*
		@group Components
		@page Window
		@title hideMaxButton()
		@description Löst das Event "hideMaxButton" aus und versteckt den Maximieren-Button der Komponente.
		@examples cmp.window.hideMaxButton
	*/
	hideMaxButton: function() {
		this.globalEvents.trigger("hideMaxButton", {}, this);
		
		return this;
	},

	/**
	 * @description Display the Window Minimize Button
	 */	
	/*
		@group Components
		@page Window
		@title showMinButton()
		@description Löst das Event "showMinButton" aus und blendet den Minimieren-Button der Komponente ein.
		@examples cmp.window.showMinButton
	*/
	showMinButton: function() {
		this.globalEvents.trigger("showMinButton", {}, this);
		
		return this;
	},
	
	/**
	 * @description Display the Window Minimize Button
	 */	
	/*
		@group Components
		@page Window
		@title hideMinButton()
		@description Löst das Event "hideMinButton" aus und blendet den Minimieren-Button der Komponente ein.
		@examples cmp.window.hideMinButton
	*/
	hideMinButton: function() {
		this.globalEvents.trigger("hideMinButton", {}, this);
		
		return this;
	},
	
	/**
	 * @description Trigger the event "close" for this component
	 */	
	/*
		@group Components
		@page Window
		@title close()
		@description Löst das Event "close" aus und schließt die Window-Komponente.
		Die Komponente wird vollständig entfernt.
		@examples cmp.window.close
	*/
	close: function() {
		this.globalEvents.trigger("close", {}, this);
		
		return this;
	}
	
}

/*
 * jsCow.res.model.window - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
 * @description Class structure of 'jsCow.res.core.mvc.modelHandler'
 */
jsCow.res.model.window = function() {
	
	this.type = "jsCow.res.model.window";	// system variable
	
	this.config = {
		globalDisabled: false,
		enabled: true,
		__top__: null,
		__left__: null,
		__closeButton__: true,
		__maxButton__: true,
		__minButton__: true,
		zindex: 0
	}
	
};
jsCow.res.model.window.prototype = {
	
	init: function() {
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	},
	
	setTitle: function() {
		if (this.isEnabled()) {
			this.setConfig({title: ""});
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
			this.events.trigger("onTitleChange", this.getConfig());
		}
		
		return this;
	},
	
	showCloseButton: function(e) {
		if (this.isEnabled()) {
			this.setConfig({__closeButton__: true});
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	hideCloseButton: function(e) {
		if (this.isEnabled()) {
			this.setConfig({__closeButton__: false});
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	showMaxButton: function(e) {
		if (this.isEnabled()) {
			this.setConfig({__maxButton__: true});
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	hideMaxButton: function(e) {
		if (this.isEnabled()) {
			this.setConfig({__maxButton__: false});
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	showMinButton: function(e) {
		if (this.isEnabled()) {
			this.setConfig({__minButton__: false});
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	hideMinButton: function(e) {
		if (this.isEnabled()) {
			this.setConfig({__minButton__: false});
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	close: function(e) {
		if (this.isEnabled()) {
			if (this.getCmp().events.trigger("onBeforeClose", {})) {
				this.getCmp().del();
				this.getCmp().events.trigger("onClose", {});
			}
		}
		
		return this;
	}
	
};

/*
 * jsCow.res.view.window - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
 * @description Class structure of 'jsCow.res.core.mvc.modelHandler'
 */
jsCow.res.view.window = function() {

	this.execInit = false;					// system variable
	this.type = "jsCow.res.view.window";	// system variable

	this.maximized = false;
	this.minimized = false;
	
	// Variables of html dom elements - jquery objects
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jscow-window');	
	
	this.dom.button = {};
	this.dom.button.close = $('<div/>').addClass('jscow-window-button').append("&#215;").appendTo(this.dom.main);
	this.dom.button.max = $('<div/>').addClass('jscow-window-button').append("&equiv;").appendTo(this.dom.main);
	this.dom.button.min = $('<div/>').addClass('jscow-window-button').append("&#8230;").appendTo(this.dom.main);
	
	this.dom.title = $('<div/>').addClass('jscow-window-title jscow-cursor clearfix').appendTo(this.dom.main);
	
	this.dom.icon = $('<div/>').addClass('jscow-window-title-ico jscow-ico-16 jscow-float-left').appendTo(this.dom.title);
	this.dom.title.text = $('<div/>').addClass('jscow-window-title-text jscow-float-left').appendTo(this.dom.title);
	
	this.dom.content = $('<div/>').addClass('jscow-window-content').addClass('clearfix').appendTo(this.dom.main);
	
};
jsCow.res.view.window.prototype = {
	
	init: function(c) {
		
		var cfg = c.data;
		
		$("<div/>").addClass("clearfix").appendTo(this.dom.main);
		
		// Set title and icon
		if (cfg.title) this.dom.title.html(cfg.title);
		
		// zIndex
		this.dom.main.css({ zIndex: jsCow.getNextZIndex() });
		
		// set click handler		
		this.dom.title.click((function(self) {
			return function() {
				self.setTitle();
				self.setIcon();
			}
		})(this)).dblclick((function(self) {
			return function() {
				if (self.getCmp().getModel().getConfig("enabled") || !self.getCmp().getModel().getConfig("globalDisabled")) {
					self.setMaximized();
				}
			}
		})(this));
		
		// Click handler for close button
		this.dom.button.close.click((function(self) {
			return function() {
				if (self.getCmp().getModel().getConfig("enabled") || !self.getCmp().getModel().getConfig("globalDisabled")) {
					self.getCmp().globalEvents.trigger("close", {}, self.getCmp());
				}
			}
		})(this));

		// Click handler for maximize button
		this.dom.button.max.click((function(self) {
			return function() {
				if (self.getCmp().getModel().getConfig("enabled") || !self.getCmp().getModel().getConfig("globalDisabled")) {
					self.setMaximized();
				}
			}
		})(this));

		// Click handler for minimized button
		this.dom.button.min.click((function(self) {
			return function() {
				if (self.getCmp().getModel().getConfig("enabled") || !self.getCmp().getModel().getConfig("globalDisabled")) {
					self.setMinimized();
				}
			}
		})(this));
		
		// Draggable
		window.setTimeout((function(self) {
			return function() {
				self.dom.main.draggable({ 
					handle: self.dom.title,
					iframeFix: true,
					drag: function(ui) {
						self.dom.content.css('visibility', 'hidden');
					},
					stop: function(ui) {
						self.dom.content.css('visibility', 'visible');
						self.getCmp().setPos(self.dom.main.position().top, self.dom.main.position().left);
					}
				});
			}
		})(this), 0);
		
		this.update(c);
	},
	
	update: function(cfg) {
		var cfg = cfg.data;
		
		if (cfg)
		{
			
			// Disabled
			if (!cfg.enabled || cfg.globalDisabled) {
				
				this.dom.main.addClass('jscow-window-disabled').removeClass('jscow-window');
				
			// Enabled
			}else{
				
				this.dom.main.addClass('jscow-window').removeClass('jscow-window-disabled');
				
				// Show titel and icon if set
				if (cfg.title) this.dom.title.html(cfg.title);
				
				// Window Buttons
				if (cfg.__closeButton__) this.showCloseButton(); else this.hideCloseButton();
				if (cfg.__maxButton__) this.showMaxButton(); else this.hideMaxButton();
				if (cfg.__minButton__) this.showMinButton(); else this.hideMinButton();
				
				// Width and Height
				if (cfg.__width__) this.dom.main.width(cfg.__width__);
				if (cfg.__height__) this.dom.content.height(cfg.__height__);
				
				// Absolute position
				if (cfg.__top__) this.dom.main.css({top:cfg.__top__});
				if (cfg.__left__) this.dom.main.css({left:cfg.__left__});
				
				// z - Index
				if (cfg.__zindex__) this.dom.main.css({zindex:cfg.__zindex__});
				
				// Hide / Show
				if (cfg.hide) this.dom.main.addClass('jscow-hide'); else this.dom.main.removeClass('jscow-hide');
				
			}

		}
		
		return this;
	},
	
	setMaximized: function() {
		if (!this.maximized) {
			this.hideMinButton();
			this.dom.main.addClass("jscow-window-maximized");
			
			this.maximized = true;
		}else{
			this.showMinButton();
			this.dom.main.removeClass("jscow-window-maximized");
			
			this.maximized = false;
		}
		
		this.getCmp().events.trigger("onMaximized", {});
		
		this.getCmp().globalEvents.trigger("update", {}, this.getCmp().getChildren());
		
		return this;
	},
	
	setMinimized: function() {
		if (!this.minimized) {
			this.dom.content.hide();
			this.hideMaxButton();
			
			this.minimized = true;
		}else{
			this.dom.content.show();
			this.showMaxButton();
			
			this.minimized = false;
		}
		
		this.getCmp().events.trigger("onMinimized", {});
		
		this.getCmp().globalEvents.trigger("update", {}, this.getCmp().getChildren());
		
		return this;
	},
	
	setTitle: function() {
		this.globalEvents.trigger("setTitle", {}, this.getCmp());
		
		return this;
	},
	
	setIcon: function() {
		this.globalEvents.trigger("setIcon", {}, this.getCmp());
		
		return this;
	},
	
	setFocus: function(e) {
		this.dom.main.css({zIndex:jsCow.getNextZIndex()}).addClass("jscow-focus");
		
		return this;
	},
	
	showCloseButton: function(e) {
		this.dom.button.close.show();
		
		return this;
	},
	
	hideCloseButton: function(e) {
		this.dom.button.close.hide();
		
		return this;
	},
	
	showMaxButton: function(e) {
		this.dom.button.max.show();
		
		return this;
	},
	
	hideMaxButton: function(e) {
		this.dom.button.max.hide();
		
		return this;
	},
	
	showMinButton: function(e) {
		this.dom.button.min.show();
		
		return this;
	},
	
	hideMinButton: function(e) {
		this.dom.button.min.hide();
		
		return this;
	}
	
};

/*
 * jsCow.res.controller.window - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
 * @description Class structure of 'jsCow.res.core.mvc.modelHandler'
 */
jsCow.res.controller.window = function() {

	this.type = "jsCow.res.controller.window";	// system variable
	
};
jsCow.res.controller.window.prototype = {
	
	init: function() {
		// ...
	},
	
	handleSetTitle: function(e) {
		if (this.isMethodExists(this.getModel().setTitle)) this.getModel().setTitle(e);
		return true;
	},
	
	handleSetTop: function(e) {
		if (this.isMethodExists(this.getModel().setTop)) this.getModel().setTop(e);
		return true;
	},
	
	handleSetLeft: function(e) {
		if (this.isMethodExists(this.getModel().setLeft)) this.getModel().setLeft(e);
		return true;
	},
	
	handleShowCloseButton: function(e) {
		if (this.isMethodExists(this.getModel().showCloseButton)) this.getModel().showCloseButton(e);
		
		return true;
	},
	
	handleHideCloseButton: function(e) {
		if (this.isMethodExists(this.getModel().hideCloseButton)) this.getModel().hideCloseButton(e);
		
		return true;
	},
	
	handleShowMaxButton: function(e) {
		if (this.isMethodExists(this.getModel().showMaxButton)) this.getModel().showMaxButton(e);
		
		return true;
	},
	
	handleHideMaxButton: function(e) {
		if (this.isMethodExists(this.getModel().hideMaxButton)) this.getModel().hideMaxButton(e);
		
		return true;
	},
	
	handleShowMinButton: function(e) {
		if (this.isMethodExists(this.getModel().showMinButton)) this.getModel().showMinButton(e);
		
		return true;
	},
	
	handleHideMinButton: function(e) {
		if (this.isMethodExists(this.getModel().hideMinButton)) this.getModel().hideMinButton(e);
		
		return true;
	},
	
	handleClose: function(e) {
		if (this.isMethodExists(this.getModel().close)) this.getModel().close(e);
		
		return true;
	}
	
};
