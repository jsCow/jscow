/*
 * jsCow.res.components.button
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: August 18 21:00:00 2011
 */
 
/**
Button-Komponente zur Anwendung innerhalb einer administrativen Benutzeroberfläche.
Über verfügbare Events, kann von außen auf unterschiedliche Aktionen reagiert werden.

@author Mario Linz
@class jsCow.res.components.button
@type Object
@module jsCow.res.components.button
@constructor 
*/
jsCow.res.components.button = function() {}
jsCow.res.components.button.prototype = {
	
	/**
	Init-Methode, die in der Initialisierung der Komponente ausgeführt wird.
	
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
		this.setModel(jsCow.res.model.button);
		// set view
		this.setView(jsCow.res.view.button);
		// set controller
		this.setController(jsCow.res.controller.button);
		
		return this;
	},
	
	/**
	Setzt den Titel des Button.
	
	@method setTitle
	@param {String} Titel des Button.
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setTitle: function(t) {
		this.globalEvents.trigger("setTitle", {
			title: t
		}, this);
		
		return this;
	},

	/**
	Gibt den Titel des Button zurück.
	
	@method getTitle
	@return {Object} Instanz der jsCow-Komponente.
	**/
	getTitle: function() {
		return this.getModel().getConfig("title");
	},
	
	/**
	Triggert das Event "toggle" des Button.
	
	@method toggle
	@return {Object} Instanz der jsCow-Komponente.
	@event toggle
	**/
	toggle: function() {
		this.globalEvents.trigger("toggle", {}, this);
		
		return this;
	},
	
	/**
	Setzt die Handler-Methoden für die Toggle Status.
	
	@method setToggleHandler
	@param {Function} push Handler-Methode, wenn Button als Toggle-Button definiert ist und der Button Status "gedrückt" ist.
	@param {Function} push Handler-Methode, wenn Button als Toggle-Button definiert ist und der Button Status "nicht gedrück" ist.
	@event setToggleHandler
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setToggleHandler: function(push, pull) {
		this.globalEvents.trigger("setClickHandler", {
			pushHandler: push,
			pullHandler: pull,
			type: "toggle"
		}, this);
		
		return this;
	},
	
	/**
	Resetet den Button Status auf dessen Ausgangsstatus.
	
	@method reset
	@event reset
	@return {Object} Instanz der jsCow-Komponente.
	**/
	reset: function() {
		this.globalEvents.trigger("reset", {}, this);
		
		return this;
	},
	
	/**
	Setzt die Event-Handler Methode für den normalen Klick auf den Button.
	
	@method setClickHandler
	@param {Function} click Handler-Methode, wenn Button geklickt wird.
	@event setClickHandler
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setClickHandler: function(clickHandler) {
		this.globalEvents.trigger("setClickHandler", {
			clickHandler: clickHandler,
			type: "click"
		}, this);
		
		return this;
	},
	
	/**
	Triggert das Event "click"  für den Button.
	
	@method setClickHandler
	@event click
	@return {Object} Instanz der jsCow-Komponente.
	**/
	click: function() {
		this.globalEvents.trigger("click", {}, this);
		
		return this;
	},
	
	/**
	Setzt den Ausgangsstatus für den Toggle-Button. Ein aktiver Toogle-Button kann somit auch umgeschaltet werden.
	
	@method setToggleState
	@param {Boolean} state true|false
	@event setToggleState
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setToggleState: function(state) {
		if (state == undefined) var state = false;
		
		this.globalEvents.trigger("setToggleState", {
			state: state
		}, this);
		
		return this;
	},
	
	/**
	Setzt den Namen der Button Group, zu der der Button gehören soll.
	
	@method setButtonGroup
	@param {Boolean} group Name der Button-Group.
	@event setButtonGroup
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setButtonGroup: function(group) {
		this.globalEvents.trigger("setButtonGroup", {
			group: group
		}, this);

		return this;
	}
	
}

/*
 * jsCow.res.model.button - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
MVC-Model der Komponente jsCow.res.model.button

@author Mario Linz
@class jsCow.res.model.button
@type Object
@module jsCow.res.model.button
@constructor 
*/
jsCow.res.model.button = function() {
	
	/**
	Systemname oder Bezeichnung des Model.

	@property type
	@type String
	@default "jsCow.res.model.button"
	**/
	this.type = "jsCow.res.model.button";	// system variable
	
	/**
	Konfiguration des Model.

	@property config
	@type Object
	@default "{
		globalDisabled: false,
		enabled: true,
		title: "Button",
		toggle: false,
		pressed: false,
		clickHandler: function() {},
		pushHandler: function() {},
		pullHandler: function() {},
		toggleButtonGroup: false
	}"
	**/
	this.config = {
		globalDisabled: false,
		enabled: true,
		title: "Button",
		toggle: false,
		pressed: false,
		clickHandler: function() {},
		pushHandler: function() {},
		pullHandler: function() {},
		toggleButtonGroup: false
	};
	
	/**
	@property resetConfig
	@type Object
	@default "{}"
	**/
	this.resetConfig = {};
	
};
jsCow.res.model.button.prototype = {

	/**
	Wird bei Initialisierung des Komponenten-Model automatisch vom Framework ausgeführt.
	
	@method init
	**/
	init: function() {
		this.resetConfig = this.getConfig();
		
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
		
	},
		
	/**
	Handler-Methode zum setzen des Button-Title. Wird über das Event "setTitle" ausgeführt.
	
	@method init
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	setTitle: function(e) {	
		if (this.isEnabled()) {
			this.setConfig({ 
				lastTitle: this.getConfig("title"),
				title: e.data.title
			});
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	/**
	Methode zum setzen des Toggle Status.
	
	@method init
	@param {Boolean} pressed true|false zum 
	**/
	toggle: function(pressed) {
		if (this.isEnabled() && this.config.toggle) {
			var _this = this;
			
			if (this.getConfig("toggleButtonGroup")) {
				
				this.globalEvents.trigger("buttonGroupEvent", {
					activeButton: this.getCmp(),
					toggleButtonGroup: this.getConfig("toggleButtonGroup")
				});
				
			}else{
				
				if (!this.config.pressed) {
					
					this.setConfig({ pressed: true });
					
					// Execute push handler function
					if (typeof this.config.pushHandler == "function") {
						this.config.pushHandler.call(_this.getCmp());
					}
					
				}else{ 
					
					this.setConfig({ pressed: false });
					
					// Execute push handler function
					if (typeof this.config.pullHandler == "function") {
						this.config.pullHandler.call(_this.getCmp());
					}
					
				}
				
			}
			
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	/**
	Resetet den Button auf den Ausgangsstatus.
	
	@method reset
	**/
	reset: function() {
		if (this.isEnabled()) {
			this.setConfig(this.resetConfig);
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	/**
	Setzt den Click-Handler für den Klick auf den Button.
	
	@method setClickHandler
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	setClickHandler: function(e) {
		if (this.isEnabled()) {
			var _this = this;
			
			this.setConfig({ 
				clickHandler: e.data.clickHandler
			});
			
			if (typeof this.getConfig("clickHandler") === 'undefined') {
				
				e.data.element.unbind("click", this.getConfig("clickHandler"));
				this.setConfig({ 
					clickHandler: function() {} 
				});
				
			}else{
				
				e.data.element.bind("click", function() {
					_this.globalEvents.trigger("click", {
						element: e.data.element
					}, _this.getCmp());
				});
				
			}

			
		}
		
		return this;
	},
	
	/**
	Setzt die Handlermethoden Push- und Pull für den Klick auf den Button.
	
	@method setToggleHandler
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	setToggleHandler: function(e) {
		if (this.isEnabled()) {
			
			var _this = this;
			
			this.setConfig({ 
				pushHandler: e.data.pushHandler,
				pullHandler: e.data.pullHandler
			});
			
			e.data.element.bind("click", function() {
				_this.globalEvents.trigger("click", {
					element: e.data.element
				}, _this.getCmp());
			});
			
		}
		
		return this;
	},
	
	/**
	Führt den Click-Handler der Komponente aus.
	
	@method setToggleHandler
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	click: function(e) {
		if (this.isEnabled()) {
			
			if (this.getConfig("toggle")) {
				
				
				if (!this.getConfig("toggleButtonGroup")) {
					
					this.toggle();
					
				}else{
					
					if (!this.getConfig("pressed")) {
						this.globalEvents.trigger("buttonGroupEvent", {
							activeButton: this.getCmp(),
							toggleButtonGroup: this.getConfig("toggleButtonGroup")
						});
					}
					
				}
				
			}else{
				
				this.getConfig("clickHandler").call(this.getCmp());
				
			}
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
			
			// Trigger the "click" event...
			this.events.trigger("click", this.getConfig());
		}
		
		return this;
	},
	
	/**
	Setzt den Toggle Status der Komponente.
	
	@method setToggleHandler
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	setToggleState: function(e) {
		if (this.isEnabled()) {
			
			this.setConfig({
				toggle: e.data.state
			});
			
		}
		
		return this;
	},
	
	/**
	Setzt die Button-Group der Komponente.
	
	@method setToggleHandler
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	setButtonGroup: function(e) {
		if (this.isEnabled()) {
			
			if (e.data.group) {
				this.setConfig({
					toggleButtonGroup: e.data.group,
					toggle: true
				});
				
				this.globalEvents.register("buttonGroupEvent", this.getCmp());
				
			}else{
				
				this.setConfig({
					toggleButtonGroup: false,
					toggle: false
				});
				
				this.globalEvents.unregister("buttonGroupEvent", this.getCmp());
			}
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	/**
	Führt den jeweiligen Toggle-Hander (Push|Pull) der Komponente aus.
	
	@method buttonGroupEvent
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	buttonGroupEvent: function(e) {
		if (this.isEnabled() && this.config.toggle) {
			
			if ( (e.data.activeButton.getID() == this.getCmp().getID()) && (e.data.toggleButtonGroup == this.getConfig("toggleButtonGroup")) ) {
				
				if (!this.getConfig("pressed") && typeof this.config.pushHandler == "function") {
					this.config.pushHandler.call(this.getCmp());
				}
				
				this.setConfig({
					pressed: true
				});
				
			}else if(e.data.toggleButtonGroup == this.getConfig("toggleButtonGroup")) {
				
				if (typeof this.config.pullHandler == "function") {
					this.config.pullHandler.call(this.getCmp());
				}
				
				this.setConfig({
					pressed: false
				});
				
			}
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
			
		}
		
		return this;
	}
	
};

/*
 * jsCow.res.view.button - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
MVC-View der Komponente jsCow.res.view.button

@author Mario Linz
@class jsCow.res.view.button
@type Object
@module jsCow.res.view.button
@constructor 
*/
jsCow.res.view.button = function() {

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
	@default "jsCow.res.view.button"
	**/
	this.type = "jsCow.res.view.button";		// system variable
	
	/**
	Objekt für alle benötigten HTML-DOM Elemente der Komponente.
	
	@property dom
	@type Object
	@default "{}"
	**/
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jscow-btn jscow-float-left jscow-cursor');
	this.dom.content = $('<div/>').addClass('jscow-btn-content').appendTo(this.dom.main);
	this.dom.ico = $('<img/>');
	
	this.configCache = {};
	
};
jsCow.res.view.button.prototype = {
	
	/**
	Die init Methode des MVC-View wird meist über das Event "viewInit" in der init Methode des Model ausgeführt.
	Zu welchem Zeitpunkt dies passiert, ist dem Entwickler überlassen.
	(Es empfiehlt sich jedoch das Triggern der View-Initialisierung über die Init-Methode des Models auszuführen.)
	
	@example Model.init: function() {
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	}
	@method init
	**/
	init: function(cfg) {
		
		var self = this;
		
		this.dom.main.hover(
			function() {
				self.cssHover(true);
			}, function() {
				self.cssHover(false);
			}
		).mousedown(function() {
			self.cssMousedown();
		}).mouseup(function() {
			self.cssMouseup();
		}).mouseout(function() {
			self.cssMouseup();
		});
		/*
		.click(function() {
			self.getCmp().globalEvents.trigger("click", {}, self.getCmp());
		});
		*/
		this.update(cfg);
	},
	
	/**
	Über die Methode "update" wird standardmäßig ein Update des View ausgeführt.
	Dieses Update kann auch über das globale Event "update" ausgeführt werden.
	
	@method update
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	Wird die Methode aus dem View herraus direkt aufgerufen, so muss darauf geachtet werden, dass die zu übergebenen Parameter in der Event-Data Struktur übergeben werden.
	**/
	update: function(cfg) {
		var cfg = cfg.data;
		this.configCache = cfg;
		
		if (cfg) {
			
			// Disabled
			if (!cfg.enabled || cfg.globalDisabled) {
				
				this.dom.main.removeClass('jscow-btn jscow-cursor').addClass('jscow-btn-disabled');
			
			// Enabled
			}else{
				
				this.dom.main.addClass('jscow-btn jscow-cursor').removeClass('jscow-btn-disabled jscow-btn-hover');
				
				// Push / Pull
				if (cfg.pressed) {
					this.dom.main.addClass('jscow-btn-pressed jscow-cursor').removeClass('jscow-btn jscow-btn-disabled');
				}else{
					this.dom.main.addClass('jscow-btn jscow-cursor').removeClass('jscow-btn-pressed');
				}
				
				
				// Title
				if (cfg.title) {
					this.dom.content.html(cfg.title);
				}
				
				// Hide / Show
				if (cfg.hide) this.dom.main.addClass('jscow-hide'); else this.dom.main.removeClass('jscow-hide');
				
			}
			
		}
		
		return this;
	},
	
	/**
	Bindet die Click-Handler an das DOM-Element des Button.
	
	@method bindClickEvent
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	bindClickEvent: function(e) {
		
		switch(e.data.type) {
			case "click":
				this.globalEvents.trigger("bindClickEvent", {
					element: this.dom.main,
					clickHandler: e.data.clickHandler
				}, this.getCmp());
			break;
			case "toggle":
				this.globalEvents.trigger("setToggleHandler", {
					element: this.dom.main,
					pushHandler: e.data.pushHandler,
					pullHandler: e.data.pullHandler
				}, this.getCmp());
			break;
		}
		
		return this;
	},
	
	/**
	Setzt oder entfernt die CSS Hover Klasse.
	
	@method cssHover
	@param {Boolean} state true|false
	**/
	cssHover: function(state) {
		if (this.configCache.enabled || !this.configCache.globalDisabled) {
			if (state)
				this.dom.main.addClass('jscow-btn-hover');
			else
				this.dom.main.removeClass('jscow-btn-hover');
		}
		
		return this;
	},
	
	/**
	Setzt die CSS Press Klasse.
	
	@method cssMousedown
	**/
	cssMousedown: function() {
		if (this.configCache.enabled || !this.configCache.globalDisabled) {
			this.dom.main.addClass('jscow-btn-press');
		}
		
		return this;
	},
	
	/**
	Entfernt die CSS Press Klasse.
	
	@method cssMouseup
	**/
	cssMouseup: function() {
		if (this.configCache.enabled || !this.configCache.globalDisabled) {
			this.dom.main.removeClass('jscow-btn-press');
		}
		
		return this;
	}
	
};

/*
 * jsCow.res.controller.button - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
MVC-Controller der Komponente jsCow.res.controller.button

@author Mario Linz
@class jsCow.res.controller.button
@type Object
@module jsCow.res.controller.button
@constructor 
*/
jsCow.res.controller.button = function() {

	/**
	Systemname oder Bezeichnung des Controller.

	@property type
	@type String
	@default "jsCow.res.controller.button"
	**/
	this.type = "jsCow.res.controller.button";
	
};
jsCow.res.controller.button.prototype = {
	
	/**
	Die init Methode des MVC-Controller wird automatisch vom Framework ausgeführt, wenn der Controller Initialisiert wird.
	
	@method init
	**/
	init: function() {
		// ...
	},
	
	/**
	Nimmt das Event "setTitle" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetTitle
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleSetTitle: function(e) {
		if (this.isMethodExists(this.getModel().setTitle)) this.getModel().setTitle(e);
		
		return this;
	},
	
	/**
	Nimmt das Event "toggle" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleToggle
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleToggle: function() {
		if (this.isMethodExists(this.getModel().toggle)) this.getModel().toggle();

		return this;
	},
	
	/**
	Nimmt das Event "reset" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleReset
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleReset: function() {
		if (this.isMethodExists(this.getModel().reset)) this.getModel().reset();

		return this;
	},
	
	/**
	Nimmt das Event "setClickHandler" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetClickHandler
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleSetClickHandler: function(e) {
		this.getView().isMethodExistsExec("bindClickEvent", e);
		
		return this;
	},
	
	/**
	Nimmt das Event "bindClickEvent" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleBindClickEvent
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleBindClickEvent: function(e) {
		if (this.isMethodExists(this.getModel().setClickHandler)) this.getModel().setClickHandler(e);
		
		return this;
	},
	
	/**
	Nimmt das Event "setToggleHandler" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetToggleHandler
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleSetToggleHandler: function(e) {
		if (this.isMethodExists(this.getModel().setToggleHandler)) this.getModel().setToggleHandler(e);
		
		return this;
	},
	
	/**
	Nimmt das Event "click" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleClick
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleClick: function(e) {
		if (this.isMethodExists(this.getModel().click)) this.getModel().click(e);
		
		return this;
	},
	
	/**
	Nimmt das Event "setToggleState" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetToggleState
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleSetToggleState: function(e) {
		if (this.isMethodExists(this.getModel().setToggleState)) this.getModel().setToggleState(e);
		
		return this;
	},
	
	/**
	Nimmt das Event "setButtonGroup" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetButtonGroup
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleSetButtonGroup: function(e) {
		if (this.isMethodExists(this.getModel().setButtonGroup)) this.getModel().setButtonGroup(e);
		
		return this;
	},
	
	/**
	Nimmt das Event "buttonGroupEvent" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleButtonGroupEvent
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleButtonGroupEvent: function(e) {
		if (this.isMethodExists(this.getModel().buttonGroupEvent)) this.getModel().buttonGroupEvent(e);
		
		return this;
	}
	
};
