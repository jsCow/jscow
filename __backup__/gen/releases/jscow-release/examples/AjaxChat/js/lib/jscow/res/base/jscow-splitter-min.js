/* jscow - Javascript Component Framework - jscow-splitter-trunk - Mario Linz - http://www.jscow.de *//*
 * jsCow.res.components.splitter
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
Die Splitter-Komponente erzeugt eine horizontale- oder vertikale Layout-Teilung.

@author Mario Linz
@class jsCow.res.components.splitter
@type Object
@module jsCow.res.components.splitter
@constructor 
*/
jsCow.res.components.splitter = function() {}
jsCow.res.components.splitter.prototype = {
	
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
		this.setModel(jsCow.res.model.splitter);
		// set view
		this.setView(jsCow.res.view.splitter);
		// set controller
		this.setController(jsCow.res.controller.splitter);
		
		return this;
	},
	
	/**
	 * @description Set splitter type - horizontal
	 */	
	/*
		@group Components
		@page Splitter
		@title setSplitHorizontal
		@description Löst das Event "setDirection" aus und setzt dabei die Richtung, in der die Splitter-Komponente das Layout teilen soll auf "horizontal".
		@examples cmp.splitter.setSplitHorizontal
	*/
	setSplitHorizontal: function() {
		this.globalEvents.trigger("setDirection", {
			direction: "horizontal"
		}, this);
		
		return this;
	},
	
	/**
	 * @description Set splitter type - vertical
	 */	
	/*
		@group Components
		@page Splitter
		@title setSplitHorizontal
		@description Löst das Event "setDirection" aus und setzt dabei die Richtung, in der die Splitter-Komponente das Layout teilen soll auf "vertical".
		@examples cmp.splitter.setSplitVertical
	*/
	setSplitVertical: function() {
		this.globalEvents.trigger("setDirection", {
			direction: "vertical"
		}, this);
		
		return this;
	},
	
	/**
	 * @description Set splitter configuration
	 */	
	/*
		@group Components
		@page Splitter
		@title setSplitHorizontal({...})
		@description Löst das Event "setSplitterConfig" aus und setzt die Grundkonfiguration der Splitter-Komponente für das Initialisieren.
		@examples cmp.splitter.setSplitterConfig
	*/
	setSplitterConfig: function(c) {
		this.globalEvents.trigger("setSplitterConfig", c, this);
		
		return this;
	},

	/**
	 * @description Set sizes for all splitter childs (Array)
	 */	
	/*
		@group Components
		@page Splitter
		@title setSplitterSizes([...])
		@description Löst das Event "setSplitterSizes" aus und setzt die einzelnen Breiten oder Höhen der einzelnen Splitter-Gruppen.
		@examples cmp.splitter.setSplitterSizes
	*/
	setSplitterSizes: function(c) {
		this.globalEvents.trigger("setSplitterSizes", c, this);
		
		return this;
	},
	
	/**
	 * @description Get sizes of all splitter childs
	 */	
	/*
		@group Components
		@page Splitter
		@title getSplitterSizes()
		@description Gibt ein Array mit allen aktuellen Breiten oder Höhen der Splitter-Gruppen zurück.
		@examples cmp.splitter.getSplitterSizes
	*/
	getSplitterSizes: function() {
		var sizes = this.getModel().getConfig();
		var sizes = sizes.splitterConfiguration.sizes;
		
		return sizes;
	},
	
	/**
	 * @description Set resizer (Array)
	 */	
	/*
		@group Components
		@page Splitter
		@title setResizer([...])
		@description Löst das Event "setResizer" aus und definiert, für welche Splitter-Gruppe ein Rezizer gesetzt werden soll.
		@examples cmp.splitter.setResizer
	*/
	setResizer: function(r) {
		this.globalEvents.trigger("setResizer", r, this);
		
		return this;
	},
	
	/**
	 * @description Get resizer
	 */	
	/*
		@group Components
		@page Splitter
		@title getResizer([...])
		@description Gibt ein Array mit der Konfiguration über die aktiven Rezizer zurück.
		@examples cmp.splitter.getResizer
	*/
	getResizer: function() {
		var resizer = this.getModel().getConfig();
		var resizer = sizes.splitterConfiguration.resizer;
		
		return resizer;
	}
	
}

/*
 * jsCow.res.model.splitter - jsCow extention - JavaScript Library
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
jsCow.res.model.splitter = function() {
	
	this.type = "jsCow.res.model.splitter";
	
	this.config = {
		globalDisabled: false,
		enabled: true,
		direction: 'vertical',
		splitterConfiguration: {},
		calculatedChildSizes: []
	};
	
};
jsCow.res.model.splitter.prototype = {

	init: function() {
		
		var self = this;
		
		this.getCmp().getApp().addWindowEvent({
			resize: function(e) {
				self.globalEvents.trigger('windowResize', e);
			}
		});
		
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	},
	
	initialAppEvent: function(e) {
		if (this.isEnabled()) {
			
			// Set splitter sizes in config
			this.setInnerWidth(this.getCmp().getParent().getInnerWidth(true));
			this.setInnerHeight(this.getCmp().getParent().getInnerHeight(true));
			
			// Update splitter sizes
			this.getCmp().getView().call("setSplitterSizes", this.getConfig());
			
			// Set orientations
			this.getCmp().getView().call("setOrientation", this.getConfig());
			
			// Create / Update resizer
			this.getCmp().getView().call("createSplitterResizer", this.getConfig());
			
			// Calculate sizes
			this.getCmp().getView().call("calculateSizes", this.getConfig());
			
		}
		
		return this;
	},
	
	update: function(e) {
		if (this.isEnabled()) {
			this.windowResize(e);
		}
		
		return this;
	},
	
	windowResize: function(e) {	
		if (this.isEnabled()) {
			
			// Set splitter sizes in config
			this.setInnerWidth(this.getCmp().getParent().getInnerWidth(true));
			this.setInnerHeight(this.getCmp().getParent().getInnerHeight(true));
						
			// Update splitter sizes
			this.getCmp().getView().call("setSplitterSizes", this.getConfig());
			
			// Calculate sizes
			this.getCmp().getView().call("calculateSizes", this.getConfig());
			
		}
		
		return this;
	},
	
	setDirection: function(e) {	
		if (this.isEnabled()) {
			
			this.setConfig({ 
				direction:e.data.direction
			});
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	setSplitterConfig: function(e) {	
		if (this.isEnabled()) {
			this.setConfig({ splitterConfiguration:e.data });
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	setSplitterSizes: function(e) {	
		if (this.isEnabled()) {
			this.setConfig({ 
				splitterConfiguration: { sizes: e.data } 
			});
			
			this.update(e);
		}
		
		return this;
	},
	
	setResizer: function(e) {	
		if (this.isEnabled()) {
			
			$.extend(this.config.splitterConfiguration.resizer, e.data);
			
			// Create / Update resizer
			this.getCmp().getView().call("update", this.getConfig());
			
		}
		
		return this;
	},
	
	resizerDraggableStop: function(e) {	
		if (this.isEnabled()) {
			
			var self = this;
			var direction = this.getConfig("direction");
			var sizes = this.getConfig("splitterConfiguration").sizes;
			
			$.each(this.getConfig("resizer"), function(i, r) {
				if (r && e.data.resizer.getID() == r.getID()) {
					if (direction == "horizontal") {
						
						var size = e.data.resizer.getView().getDomMain().prev().outerWidth(true);
						if (e.data.clone.posX < e.data.org.posX) {
							var diff = e.data.org.posX - e.data.clone.posX;
							var newSize = size - diff;
						}else{
							var diff = e.data.clone.posX - e.data.org.posX;
							var newSize = size + diff;
						}
						
						if (newSize < 0) newSize = 1;
						
						sizes[i] = self.convertSize(sizes[i], newSize, self.getCmp().getInnerWidth());
						
					}else{
						
						var size = e.data.resizer.getView().getDomMain().prev().outerHeight(true);
						if (e.data.clone.posY < e.data.org.posY) {
							var diff = e.data.org.posY - e.data.clone.posY;
							var newSize = size - diff;
						}else{
							var diff = e.data.clone.posY - e.data.org.posY;
							var newSize = size + diff;
						}
						
						if (newSize < 0) newSize = 1;
						
						sizes[i] = self.convertSize(sizes[i], newSize, self.getCmp().getInnerHeight());
					}
				}
			});
			
			this.update();
		}
		
		return this;
	},
	
	convertSize: function(org, value, target) {
		
		if (org && value && org != undefined && value != undefined && target != undefined) {
			
			var org = String(org);
			var value = String(value);
			var target = String(target);
			
			if (org.indexOf('%') > 0) {
				return parseInt((value / target) * 100)+"%";
			}else if (org.indexOf('px') == 0 || org.indexOf('px') > 0) {
				return parseInt(value);
			}else if (org == "auto") {
				return "auto";
			}else{
				return parseInt(value);
			}
			
		}else{
			
			return "auto";
			
		}
		
	}
	
};

/*
 * jsCow.res.view.splitter - jsCow extention - JavaScript Library
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
jsCow.res.view.splitter = function() {

	this.execInit = false;					// system variable
	this.type = "jsCow.res.view.splitter";	// system variable
	
	// Variables of html dom elements - jquery objects
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jscow-splitter clearfix');
	this.dom.content = $('<div/>').addClass('jscow-splitter-content clearfix').appendTo(this.dom.main);
	
	this.config = {
		resizer: []
	}
};
jsCow.res.view.splitter.prototype = {
	
	init: function(cfg) {
		var cfg = cfg.data;
		var self = this;
		
		this.getCmp().getApp().addWindowEvent({ "resize": function(e) {
			window.setTimeout( function() {
				self.getCmp().getApp().globalEvents.bubbleDown("windowResize", e);
			}, 0);
		} });
		
	},
	
	update: function(cfg) {
		var cfg = cfg.data;
		if (cfg) {
			
			if (!cfg.enabled || cfg.globalDisabled) {
				
				this.dom.main.addClass('jscow-splitter-disabled').removeClass('jscow-splitter');
				
			}else{
				
				this.dom.main.addClass('jscow-splitter').removeClass('jscow-splitter-disabled');
				
				// Set or remove floating css class into children components
				this.setOrientation({ data: cfg });
				
				// Create splitter resizer
				this.createSplitterResizer({ data: cfg });
				
				// Calculate sizes
				this.calculateSizes({ data: cfg });
				
				// Hide / Show
				if (cfg.hide) this.dom.main.addClass('jscow-hide'); else this.dom.main.removeClass('jscow-hide');
				
			}
			
		}
		return this;
	},
	
	/* 
	 * Create splitter resizer
	 */
	createSplitterResizer: function(e) {
		var self = this;
		var cfg = e.data;
		var children = this.getCmp().getChildren();
		
		if (children.length > 1 && cfg.splitterConfiguration && cfg.splitterConfiguration.resizer && cfg.splitterConfiguration.resizer.length) {
			
			// Only between first and last children
			$.each(children, function(i, c) {
				if (i < children.length-1) {
					var viewlist = c.getView().getViewList();
					$.each(viewlist, function(viewIndex, view) {
						
						// Create resizer
						if (cfg.splitterConfiguration.resizer[i]) {
							
							if (self.config.resizer[i] == undefined || !self.config.resizer[i]) {
								
								if (cfg.direction == "horizontal") {
									self.config.resizer[i] = jsCow.components.get(jsCow.res.components.resizer).setHorizontalOrientation();
								}else{
									self.config.resizer[i] = jsCow.components.get(jsCow.res.components.resizer).setVerticalOrientation();
								}
								
								self.config.resizer[i] = self.getCmp().appendAfterInner(self.config.resizer[i], c);
								
							}else if (self.config.resizer[i]) {
								
								if (cfg.direction == "horizontal") {
									self.config.resizer[i].setHorizontalOrientation();
								}else{
									self.config.resizer[i].setVerticalOrientation();
								}
								
							}
							
						}else{ // Remove reiszer
							
							if (!cfg.splitterConfiguration.resizer[i]) {
								if (self.config.resizer[i]) {
									self.config.resizer[i].del();
								}
								self.config.resizer[i] = false;
							}
							
						}
						
					});
					
				}
				
			});
			
		}
		
		this.getCmp().getModel().setConfig({
			resizer: this.config.resizer
		});
		
	},
	
	/* 
	 * Get size as pixel
	 */
	size2Px: function(value, target) {
		
		if (value && value != undefined && target != undefined) {
			
			var value = String(value);
			var target = String(target);
			
			if (!value) value = '0px';
			
			if (value.indexOf('%') > 0) {
				var value = value.replace('%','');
				return parseInt((target * value) / 100);
			}else if (value.indexOf('px') > 0) {
				return parseInt(value);
			}else{
				return parseInt(value);
			}
			
		}else{
			
			return '0px';
			
		}
	},
	
	/* 
	 * Set or remove floating css class into children components
	 */
	setOrientation: function(e) {
		/*
		var cfg = e.data;
		var children = this.getCmp().getChildren();
		
		$.each(children, function(i, child) {
			if (cfg.direction == "horizontal") {
				if (child.getModel().getType() != "jsCow.res.model.resizer") {
					child.getView().getDomMain().removeClass("clearfix");
					child.getView().getDomMain().addClass("jscow-float-left jscow-splitter-crop");
				}else if (child.getModel().getType() == "jsCow.res.model.resizer") {
					child.setHorizontalOrientation();
				}
			}else{
				if (child.getModel().getType() != "jsCow.res.model.resizer") {
					child.getView().getDomMain().addClass("clearfix");
					child.getView().getDomMain().removeClass("jscow-float-left jscow-splitter-crop");
				}else if (child.getModel().getType() == "jsCow.res.model.resizer") {
					child.setVerticalOrientation();
				}
			}
		});
		*/
	},
	
	/* 
	 * Set sizes of splitter content container
	 */
	setSplitterSizes: function(e) {
		
		var cfg = e.data;
		this.getContent().width(cfg.__innerWidth__).height(cfg.__innerHeight__);
		
	},
	
	/* 
	 * Calculate sizes
	 */
	calculateSizes: function(e) {
		
		if (typeof this.getCmp().getParent() == "object") {
			
			var self = this;
			var cfg = e.data;
			var children = this.getCmp().getChildren();
			var autoCount = 0;
			var rest = 0;
			var calculatedSizes = [];
			
			if (cfg.splitterConfiguration.sizes == undefined) cfg.splitterConfiguration.sizes = [];
					
			// Get full width
			if (cfg.direction == "horizontal") {
				rest = this.getCmp().getInnerWidth(); 
			}else{
				rest = this.getCmp().getInnerHeight();
			}
			
			// Calculate sizes of all resizers
			$.each(this.config.resizer, function(i, r) {
				if (r) {
					if (cfg.direction == "horizontal") {
						rest = rest - r.getView().getDomMain().outerWidth(true);
					}else{
						rest = rest - r.getView().getDomMain().outerHeight(true);
					}
				}
			});
			
			// Set all children widthout "auto"
			$.each(children, function(i, c) {
				
				if (cfg.splitterConfiguration.sizes[i]) {
				
					if (cfg.splitterConfiguration.sizes[i] && cfg.splitterConfiguration.sizes[i] != "auto") {
						
						if (String(cfg.splitterConfiguration.sizes[i]).indexOf('%') > 0) {
							if (cfg.direction == "horizontal") {
								var size = self.size2Px(cfg.splitterConfiguration.sizes[i], rest);
							}else{
								var size = self.size2Px(cfg.splitterConfiguration.sizes[i], rest);
							}
						}else{
							var size = self.size2Px(cfg.splitterConfiguration.sizes[i], rest);
						}
						
						if (cfg.direction == "horizontal") {
							if (c.getModel().getType() != "jsCow.res.model.resizer") {
								
								calculatedSizes[i] = {
									width: size,
									height: self.getCmp().getInnerHeight()
								};
								
							}
							rest = parseInt(rest - size);
						}else{
							if (c.getModel().getType() != "jsCow.res.model.resizer") {
								
								calculatedSizes[i] = {
									width: self.getCmp().getInnerWidth(),
									height: size
								};

							}
							rest = parseInt(rest - size);
						}
						
						if (rest < 0) rest = 0;
						
					}else{
						
						if (cfg.splitterConfiguration.sizes[i]) {
							autoCount++;
						}
						
					}
					
				}
				
			});
			
			// Set all children whether size == "auto"
			$.each(children, function(i, c) {
				if (cfg.splitterConfiguration.sizes[i] && cfg.splitterConfiguration.sizes[i] == "auto") {
					
					if (cfg.direction == "horizontal") {
						if (c.getModel().getType() != "jsCow.res.model.resizer") {
							
							calculatedSizes[i] = {
								width: (rest/autoCount),
								height: self.getCmp().getInnerHeight()
							};

						}
					}else{
						if (c.getModel().getType() != "jsCow.res.model.resizer") {
							
							calculatedSizes[i] = {
								width: self.getCmp().getInnerWidth(),
								height: (rest/autoCount)
							};

						}
					}
					
				}
				
			});
			
			this.getCmp().getModel().setConfig({
				calculatedChildSizes: calculatedSizes
			});
			
			// Set child sizes
			this.dom.content.addClass("jscow-overflow-hidden");
			$.each(children, function(i, c) {
				if (cfg.splitterConfiguration.sizes[i]) {
					if (c.getModel().getType() != "jsCow.res.model.resizer") {
						
						c.setWidth(calculatedSizes[i].width);
						c.setHeight(calculatedSizes[i].height);
						
						c.getView().getDomContent().width(Math.floor(calculatedSizes[i].width));
						c.getView().getDomContent().height(Math.floor(calculatedSizes[i].height));
						
						this.globalEvents.trigger("update", cfg, c);

					}
					
				}
				
				// Update resizer sizes
				if (c.getModel().getType() == "jsCow.res.model.resizer") {
					
					this.globalEvents.trigger("update", cfg, c);
					
				}
				
			});
			this.dom.content.removeClass("jscow-overflow-hidden");
		}
		
	}
	
};

/*
 * jsCow.res.controller.splitter - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *-.
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
 * @description Class structure of 'jsCow.res.core.mvc.modelHandler'
 */
jsCow.res.controller.splitter = function() {

	this.type = "jsCow.res.controller.splitter";	// system variable
	
};
jsCow.res.controller.splitter.prototype = {
	
	init: function() {
		// ...
	},
	
	/**
	 * @description Start initial application event
	 */	
	handleInitialAppEvent: function(e) {
		if (this.isMethodExists(this.getModel().initialAppEvent)) this.getModel().initialAppEvent(e);
		
		return this;
	},
	
	/**
	 * @description Set splitter type
	 */	
	handleSetDirection: function(e) {
		if (this.isMethodExists(this.getModel().setDirection)) this.getModel().setDirection(e);
		
		return this;
	},
	
	/**
	 * @description Set splitter sizes
	 */	
	handleWindowResize: function(e) {
		if (this.isMethodExists(this.getModel().windowResize)) this.getModel().windowResize(e);
		
		return this;
	},
	
	/**
	 * @description Set splitter configuration
	 */	
	handleSetSplitterConfig: function(e) {
		if (this.isMethodExists(this.getModel().setSplitterConfig)) this.getModel().setSplitterConfig(e);
		
		return this;
	},

	/**
	 * @description Set sizes for all splitter childs
	 */	
	handleSetSplitterSizes: function(e) {
		if (this.isMethodExists(this.getModel().setSplitterSizes)) this.getModel().setSplitterSizes(e);
		
		return this;
	},
	
	/**
	 * @description Set resizer
	 */	
	handleSetResizer: function(e) {
		if (this.isMethodExists(this.getModel().setResizer)) this.getModel().setResizer(e);
		
		return this;
	},
	
	/**
	 * @description Resizer stop after drag
	 */	
	handleResizerDraggableStop: function(e) {
		if (this.isMethodExists(this.getModel().resizerDraggableStop)) this.getModel().resizerDraggableStop(e);
		
		return false;
	}
	
};

