/*
 * jsCow.res.components.resizer
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
Die Resizer-Komponente ist eine Teil-Komponente der Splitter-Komponente und steuert das 

@author Mario Linz
@class jsCow.res.components.resizer
@type Object
@module jsCow.res.components.resizer
@constructor 
*/
jsCow.res.components.resizer = function() {}
jsCow.res.components.resizer.prototype = {
	
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
		this.setModel(jsCow.res.model.resizer);
		// set view
		this.setView(jsCow.res.view.resizer);
		// set controller
		this.setController(jsCow.res.controller.resizer);
		
		return this;
	},
	
	/**
	Setzt die Orientierung der Komponente auf "horizontal".
	Löst das Event "setHorizontalOrientation" aus und setzt die Orientierung der Komponente.
	
	@method setHorizontalOrientation
	@event setHorizontalOrientation
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setHorizontalOrientation: function() {
		this.globalEvents.trigger("setDirection", {
			direction: "horizontal"
		}, this);
		
		return this;
	},
	
	/**
	Setzt die Orientierung der Komponente auf "vertical".
	Löst das Event "setVerticalOrientation" aus und setzt die Orientierung der Komponente.
	
	@method setVerticalOrientation
	@event setVerticalOrientation
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setVerticalOrientation: function() {
		this.globalEvents.trigger("setDirection", {
			direction: "vertical"
		}, this);
		
		return this;
	}
	
}

/*
 * jsCow.res.model.resizer - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
MVC-Model der Komponente jsCow.res.model.resizer

@author Mario Linz
@class jsCow.res.model.resizer
@type Object
@module jsCow.res.model.resizer
@constructor 
*/
jsCow.res.model.resizer = function() {
	
	/**
	Systemname oder Bezeichnung des Model.
	
	@property type
	@type String
	@default "jsCow.res.model.resizer"
	**/
	this.type = "jsCow.res.model.resizer";	// system variable

	/**
	Konfiguration des Model.

	@property config
	@type Object
	@default "{
		globalDisabled: false,
		enabled: true,
		direction: 'vertical'
	}"
	**/
	this.config = {
		globalDisabled: false,
		enabled: true,
		direction: 'vertical'
	};
	
};
jsCow.res.model.resizer.prototype = {

	/**
	Wird bei Initialisierung des Komponenten-Model automatisch vom Framework ausgeführt.
	
	@method init
	**/
	init: function() {
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	},
	
	/**
	Ist die Applikation vollständig initialisiert, so wird das Event "initialAppEvent" getriggert und im 
	View der Komponente die Methode "setDraggableEvent()" aufgerufen.
	Als Methoden-Parameter wird die aktuelle Model-Konfiguration übergeben.
	
	@method initialAppEvent
	**/
	initialAppEvent: function(e) {
		if (this.isEnabled()) {
			
			// Set draggable event
			this.getCmp().getView().call("setDraggableEvent", this.getConfig());
			
		}
		
		return this;
	},
	
	/**
	Setzt die aktuelle Ausrichtung der Resizer-Komponente.
	Dies wird normalerweise von der Splitter-Komponente aus gesteuert.
	
	@method setDirection
	**/
	setDirection: function(e) { 
		if (this.isEnabled()) {
			this.setConfig({ direction:e.data.direction });
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	/**
	Setzt die aktuelle Ausrichtung der Resizer-Komponente.
	Dies wird normalerweise von der Splitter-Komponente aus gesteuert.
	
	@method setDirection
	**/
	update: function(e) { 
		if (this.isEnabled()) {
			this.getCmp().getView().call("setSizes", this.getConfig());
		}
		
		return this;
	}
	
};

/*
 * jsCow.res.view.resizer - jsCow extention - JavaScript Library
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
jsCow.res.view.resizer = function() {

	/**
	Systemvariable des View. Wird vom Framework benötigt.

	@property execInit
	@type Boolean
	@default "false"
	**/
	this.execInit = false;					// system variable
	
	/**
	Systemname oder Bezeichnung des View.

	@property type
	@type String
	@default "jsCow.res.view.resizer"
	**/
	this.type = "jsCow.res.view.resizer";	// system variable
	
	/**
	Objekt für alle benötigten HTML-DOM Elemente der Komponente.
	
	@property dom
	@type Object
	@default "{}"
	**/
	this.dom = {};
	this.dom.main = $('<div/>').width(0).height(0);
	
	this.config = {};
	this.isDraggable = false;
	
};
jsCow.res.view.resizer.prototype = {
	
	/**
	Die init Methode des MVC-View wird meist über das Event "viewInit" in der init Methode des Model ausgeführt.
	Zu welchem Zeitpunkt dies passiert, ist dem Entwickler überlassen.
	(Es empfiehlt sich jedoch das Triggern der View-Initialisierung über die Init-Methode des Models auszuführen.)
	
	@method init
	**/
	init: function(cfg) {
		
		// Set or remove floating css class into children components
		this.setDirectionClass(cfg);
		
	},
	
	update: function(cfg) {
		var cfg = cfg.data;
		if (cfg) {
			
			if (!cfg.enabled || cfg.globalDisabled) {
				
				this.dom.main.addClass('jscow-resizer-disabled');
				
			}else{
				
				this.dom.main.removeClass('jscow-resizer-disabled');
				
				// Set or remove floating css class into children components
				this.setDirectionClass(cfg);
				this.setSizes(cfg);
				
				// Hide / Show
				if (cfg.hide) this.dom.main.addClass('jscow-hide'); else this.dom.main.removeClass('jscow-hide');
				
			}
			
		}
		return this;
	},
	
	setDirectionClass: function(cfg) {
		if (cfg) {
			
			this.dom.main.removeAttr("style");
			
			switch(cfg.direction) {
				case "horizontal":
					this.dom.main.removeClass("clearfix");
					this.dom.main.addClass("jscow-resizer-horizontal");
					this.dom.main.removeClass("jscow-resizer-vertical");
				break;
				case "vertical":
					this.dom.main.addClass("clearfix");
					this.dom.main.addClass("jscow-resizer-vertical");
					this.dom.main.removeClass("jscow-resizer-horizontal");
				break;
			}
			
			this.setSizes(cfg);
		}
	},
	
	setSizes: function(e) {
		
		var cfg = e.data;
		var parent = this.getCmp().getParent();
		
		if (cfg && parent) {
			
			this.dom.main.removeAttr("style");
			
			if (cfg.direction == "horizontal") {
				this.dom.main.height(parent.getInnerHeight());
			}else{
				this.dom.main.width(parent.getInnerWidth());
			}
			
			window.setTimeout((function(self){ 
				return function(){
					if (cfg.direction == "horizontal") var axis = "x"; else var axis = "y";
					
					self.isDraggable = $(self.dom.main).draggable({ 
						axis: axis, 
						helper: "clone",
						containment: "parent",
						stop: function (ev, ui) {
							var pos = $(ui.helper).position();
							self.globalEvents.bubbleUp("resizerDraggableStop", {
								resizer: self.getCmp(),
								clone: { 
									posX: pos.left,
									posY: pos.top
								},
								org: { 
									posX: $(this).position().left,
									posY: $(this).position().top
								}
							});
						}
					});
					
				}
			})(this), 0);
			
		}
		
	}
	
};

/*
 * jsCow.res.controller.resizer - jsCow extention - JavaScript Library
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
jsCow.res.controller.resizer = function() {

	this.type = "jsCow.res.controller.resizer";	// system variable
	
};
jsCow.res.controller.resizer.prototype = {
	
	init: function() {
		// ...
	},
	
	/**
	 * @description Set resizer type
	 */	
	handleSetDirection: function(e) {
		if (this.isMethodExists(this.getModel().setDirection)) this.getModel().setDirection(e);
		
		return this;
	},
	
	/**
	 * @description Set splitter configuration
	 */	
	handleUpdate: function(e) {
		if (this.isMethodExists(this.getModel().update)) this.getModel().update(e);
		
		return false;
	}
	
};

