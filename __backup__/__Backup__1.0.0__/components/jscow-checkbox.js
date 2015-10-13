/*
 * jsCow.res.components.checkbox
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */
 
/**
Die Checkbox Komponente ist eine typische Formular-Komponente zum aktivieren oder deaktivieren eines Wertes.
Über verfügbare Events, kann von außen auf unterschiedliche Aktionen reagiert werden.

@author Mario Linz
@class jsCow.res.components.checkbox
@type Object
@module jsCow.res.components.checkbox
@constructor 
*/
jsCow.res.components.checkbox = function() {}
jsCow.res.components.checkbox.prototype = {
	
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
		this.setModel(jsCow.res.model.checkbox);
		// set view
		this.setView(jsCow.res.view.checkbox);
		// set controller
		this.setController(jsCow.res.controller.checkbox);
		
		return this;
	},
	
	/**
	Triggert das Event "click" des Button.
	
	@method click
	@return {Object} Instanz der jsCow-Komponente.
	@event click
	**/
	click: function() {
		this.globalEvents.trigger("click", {}, this);
		
		return this;
	},
	
	/**
	Triggert das Event "checked" des Button.
	
	@method checked
	@return {Object} Instanz der jsCow-Komponente.
	@event checked
	**/
	checked: function() {
		this.globalEvents.trigger("checked", {}, this);
		
		return this;
	},
	
	/**
	Triggert das Event "setValue" des Button.
	
	@method setValue
	@return {Object} Instanz der jsCow-Komponente.
	@event setValue
	**/
	setValue: function(value) {
		this.globalEvents.trigger("setValue", {
			value: value
		}, this);
		
		return this;
	},
	
	/**
	Triggert das Event "setValue" des Button.
	
	@method getValue
	@return {Object} Konfiguration aus Model-Config.
	**/
	getValue: function() {
		return this.getModel().getConfig("value");
	},
	
	/**
	Triggert das Event "setLabel" des Button.
	
	@method setLabel
	@return {Object} Instanz der jsCow-Komponente.
	@event setLabel
	**/
	setLabel: function(l) {
		this.globalEvents.trigger("setLabel", {
			label: l
		}, this);
		
		return this;
	}
	
}

/*
 * jsCow.res.model.checkbox - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
MVC-Model der Komponente jsCow.res.model.checkbox

@author Mario Linz
@class jsCow.res.model.checkbox
@type Object
@module jsCow.res.model.checkbox
@constructor 
*/
jsCow.res.model.checkbox = function() {
	
	/**
	Systemname oder Bezeichnung des Model.
	
	@property type
	@type String
	@default "jsCow.res.model.checkbox"
	**/
	this.type = "jsCow.res.model.checkbox";	// system variable

	/**
	Konfiguration des Model.

	@property config
	@type Object
	@default "{
		enabled: true,
		checked: false,
		checkboxGroup: false,
		value: false,
		label: false
	}"
	**/
	this.config = {
		enabled: true,
		checked: false,
		checkboxGroup: false,
		value: false,
		label: false
	};
	
};
jsCow.res.model.checkbox.prototype = {

	/**
	Wird bei Initialisierung des Komponenten-Model automatisch vom Framework ausgeführt.
	
	@method init
	**/
	init: function() {
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	},
	
	/**
	Setzt den Status der Checkbox und updatet den View.
	
	@method click
	**/
	click: function() {
		if (this.isEnabled()) {
			
			if (this.getConfig("checked")) {
				this.setConfig({checked: false});
			}else{
				this.setConfig({checked: true});
			}
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	/**
	Setzt den Status der Checkbox auf "checked" und updatet den View.
	
	@method checked
	**/
	checked: function() {
		this.setConfig({checked: false});
		this.click();
		
		return this;
	},
	
	/**
	Setzt den Value der Checkbox.
	
	@method setValue
	**/
	setValue: function(e) {
		this.setConfig({value: e.data.value});
		
		return this;
	},
	
	/**
	Event-Handler Methode. Setzt den Label der Checkbox.
	
	@method setLabel
	**/
	setLabel: function(e) {
		this.setConfig({label: e.data.label});
		this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		
		return this;
	}
	
};

/*
 * jsCow.res.view.checkbox - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
MVC-View der Komponente jsCow.res.view.checkbox

@author Mario Linz
@class jsCow.res.view.checkbox
@type Object
@module jsCow.res.view.checkbox
@constructor 
*/
jsCow.res.view.checkbox = function() {

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
	this.type = "jsCow.res.view.checkbox";		// system variable
	
	/**
	Objekt für alle benötigten HTML-DOM Elemente der Komponente.
	
	@property dom
	@type Object
	@default "{}"
	**/
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jscow-form-checkbox jscow-float-left jscow-cursor');
	
	this.dom.box = $('<div/>').addClass('jscow-form-checkbox-box jscow-float-left').appendTo(this.dom.main);
	this.dom.check = $('<div/>').addClass('jscow-form-checkbox-check').appendTo(this.dom.box);
	this.dom.label = $('<div/>').addClass('jscow-form-checkbox-label jscow-float-left');
	
};
jsCow.res.view.checkbox.prototype = {
	
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
		
		this.dom.main.click((function(self) {
			return function() {
				self.click();
			}
		})(this));
		
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
		if (cfg) {
			
			if (!cfg.enabled || cfg.globalDisabled) {
				
				this.dom.main.addClass('jscow-form-checkbox-disabled').removeClass('jscow-form-checkbox jscow-cursor');
				
			}else{
				
				this.dom.main.addClass('jscow-form-checkbox jscow-cursor').removeClass('jscow-form-checkbox-disabled');
				
				if (cfg.checked) {
					this.dom.check.css({display:'block'});
				}else{
					this.dom.check.css({display:'none'});
				}
				
				if (cfg.label) {
					this.dom.label.html(cfg.label).css({display:'block'});
					this.dom.box.after(this.dom.label);
				}else{
					this.dom.label.html(cfg.label).css({display:'none'});
				}
				
				// Hide / Show
				if (cfg.hide) this.dom.main.addClass('jscow-hide'); else this.dom.main.removeClass('jscow-hide');
				
			}
			
		}
		return this;
	},
	
	/**
	Triggert das Event "click".
	
	@method click
	**/
	click: function() {
		this.globalEvents.trigger("click", {}, this.getCmp());
		
		return this;
	},
	
	/**
	Setzt die CSS Focus Klasse für die Komponente.
	
	@method setFocus
	**/
	setFocus: function(e) {
		this.dom.main.addClass("jscow-focus");
	}
	
};

/*
 * jsCow.res.controller.checkbox - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
MVC-Controller der Komponente jsCow.res.controller.checkbox

@author Mario Linz
@class jsCow.res.controller.checkbox
@type Object
@module jsCow.res.controller.checkbox
@constructor 
*/
jsCow.res.controller.checkbox = function() {

	/**
	Systemname oder Bezeichnung des Controller.

	@property type
	@type String
	@default "jsCow.res.controller.checkbox"
	**/
	this.type = "jsCow.res.controller.checkbox";	// system variable
	
};
jsCow.res.controller.checkbox.prototype = {
	
	/**
	Die init Methode des MVC-Controller wird automatisch vom Framework ausgeführt, wenn der Controller Initialisiert wird.
	
	@method init
	**/
	init: function() {
		// ...
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
	Nimmt das Event "checked" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleChecked
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleChecked: function(e) {
		if (this.isMethodExists(this.getModel().checked)) this.getModel().checked(e);
		
		return this;
	},
	
	/**
	Nimmt das Event "setValue" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetValue
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleSetValue: function(e) {
		if (this.isMethodExists(this.getModel().setValue)) this.getModel().setValue(e);
		
		return this;
	},
	
	/**
	Nimmt das Event "setLabel" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetLabel
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleSetLabel: function(e) {
		if (this.isMethodExists(this.getModel().setLabel)) this.getModel().setLabel(e);
		
		return this;
	}
	
};

