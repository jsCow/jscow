/*
 * jsCow.res.components.radio
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
Typische Formular-Komponente für die Nutzung eines Radio-Group-Buttons.

@author Mario Linz
@class jsCow.res.components.radio
@type Object
@module jsCow.res.components.radio
@constructor 
*/
jsCow.res.components.radio = function() {}
jsCow.res.components.radio.prototype = {
	
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
		this.setModel(jsCow.res.model.radio);
		// set view
		this.setView(jsCow.res.view.radio);
		// set controller
		this.setController(jsCow.res.controller.radio);
		
		return this;
	},
	
	/**
	Löst das Event "click" der Radio-Komponente aus.
	Gibt es weitere Radio-Komponenten in der gleichen Gruppe, so werden Diese in Ihrem Status mit beeinflusst.
	
	@method click
	@event click
	@return {Object} Instanz der jsCow-Komponente.
	**/
	click: function() {
		this.globalEvents.trigger("click", {}, this);
		
		return this;
	},
	
	/**
	Löst das Event "setGroup" der aktuellen Radio-Komponente aus.
	Der Bezeichner der Gruppe wird als Event-Parameter übergeben.
	
	@method setGroup
	@event setGroup
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setGroup: function(group) {
		this.globalEvents.trigger("setGroup", {
			group: group
		}, this);
		
		return this;
	},
	
	/**
	Löst das Event "checked" der aktuellen Radio-Komponente aus und übergibt den Status "checked" als Event-Parameter.
	
	@method checked
	@event checked
	@return {Object} Instanz der jsCow-Komponente.
	**/
	checked: function() {
		this.globalEvents.trigger("checked", {}, this);
		
		return this;
	},
	
	/**
	Löst das Event "checked" der aktuellen Radio-Komponente aus und übergibt den Value als Event-Parameter.
	
	@method setValue
	@event setValue
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setValue: function(value) {
		this.globalEvents.trigger("setValue", {
			value: value
		}, this);
		
		return this;
	},
	
	/**
	Gibt den aktuellen Wert der Radio-Komponente zurück.
	
	@method getValue
	@return {Object} Instanz der jsCow-Komponente.
	**/
	getValue: function() {
		return this.getModel().getConfig("value");
	},
	
	/**
	Löst das Event "setLabel" der Komponente aus und übergibt die Label-Bezeichnung als Event-Parameter.
	
	@method setLabel
	@event setLabel
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setLabel: function(l) {
		this.globalEvents.trigger("setLabel", {
			label: l
		}, this);
		
		return this;
	}
	
}

/*
 * jsCow.res.model.radio - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
MVC-Model der Komponente jsCow.res.model.radio

@author Mario Linz
@class jsCow.res.model.radio
@type Object
@module jsCow.res.model.radio
@constructor 
*/
jsCow.res.model.radio = function() {
	
	/**
	Systemname oder Bezeichnung des Model.
	
	@property type
	@type String
	@default "jsCow.res.model.radio"
	**/
	this.type = "jsCow.res.model.radio";	// system variable

	/**
	Konfiguration des Model.

	@property config
	@type Object
	@default "{
		enabled: true,
		checked: false,
		radioGroup: false,
		value: false,
		label: false
	}"
	**/
	this.config = {
		enabled: true,
		checked: false,
		radioGroup: false,
		value: false,
		label: false
	};
	
};
jsCow.res.model.radio.prototype = {

	/**
	Wird bei Initialisierung des Komponenten-Model automatisch vom Framework ausgeführt.
	
	@method init
	**/
	init: function() {
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	},
	
	/**
	Steuert den Status der Komponente und triggert das Event "radioGroupEvent".
	Zum Schluss wird ein Update des View mit dem Event "viewUpdate" getriggert.
	
	@method click
	@event click
	**/
	click: function() {
		if (this.isEnabled()) {
			
			if (this.getConfig("checked")) {
				this.setConfig({checked: false});
			}else{
				this.setConfig({checked: true});
			}
			
			this.globalEvents.trigger("radioGroupEvent", {
				activeRadio: this.getCmp(),
				radioGroup: this.getConfig("radioGroup")
			});
			
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
		
	/**
	Steuert das Setzen des Radio-Group Bezeichner der Komponente und triggert das Event "radioGroupEvent".
	
	@method setGroup
	@event radioGroupEvent
	**/
	setGroup: function(e) {	
		if (this.isEnabled()) {
		
			if (e.data.group) {
				this.setConfig({radioGroup: e.data.group});
				this.globalEvents.register("radioGroupEvent", this.getCmp());
			}else{
				this.setConfig({radioGroup: false});
				this.globalEvents.unregister("radioGroupEvent", this.getCmp());
			}
			
		}
		
		return this;
	},
	
	/**
	Verarbeitet das Event "radioGroup" und steuert , ob die Komponente gecheckt wird oder nicht.
	Zum Schluss wird ein Update des View mit dem Event "viewUpdate" getriggert.
	
	@method radioGroupEvent
	@event radioGroupEvent
	**/
	radioGroupEvent: function(e) {	
		if (this.isEnabled()) {
			
			if ( (e.data.activeRadio.getID() == this.getCmp().getID()) && (e.data.radioGroup == this.getConfig("radioGroup")) ) {
				
				this.setConfig({checked: true});
				
			}else if(e.data.radioGroup == this.getConfig("radioGroup")) {
				
				this.setConfig({checked: false});
				
			}
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	/**
	Setzt den Status für "checked" und führt den Klick auf die Komponente aus.
	
	@method checked
	**/
	checked: function() {
		this.setConfig({checked: false});
		this.click();
		
		return this;
	},
	
	/**
	Setzt den Wert der Komponente.
	
	@method setValue
	**/
	setValue: function(e) {
		this.setConfig({value: e.data.value});
		
		return this;
	},
	
	/**
	Setzt den Label der Komponente und triggert das Event "viewUpdate" zum updaten des View.
	
	@method setLabel
	**/
	setLabel: function(e) {
		this.setConfig({label: e.data.label});
		this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		
		return this;
	}
	
};

/*
 * jsCow.res.view.radio - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
MVC-View der Komponente jsCow.res.view.radio

@author Mario Linz
@class jsCow.res.view.radio
@type Object
@module jsCow.res.view.radio
@constructor 
*/
jsCow.res.view.radio = function() {

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
	@default "jsCow.res.view.radio"
	**/
	this.type = "jsCow.res.view.radio";		// system variable
	
	/**
	Objekt für alle benötigten HTML-DOM Elemente der Komponente.
	
	@property dom
	@type Object
	@default "{}"
	**/
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jscow-form-radio jscow-float-left jscow-cursor');
	
	this.dom.box = $('<div/>').addClass('jscow-form-radio-box jscow-float-left').appendTo(this.dom.main);
	this.dom.check = $('<div/>').addClass('jscow-form-radio-check').appendTo(this.dom.box);
	this.dom.label = $('<div/>').addClass('jscow-form-radio-label jscow-float-left');
	
};
jsCow.res.view.radio.prototype = {
	
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
				
				this.dom.main.addClass('jscow-form-radio-disabled').removeClass('jscow-form-radio jscow-cursor');
				
			}else{
				
				this.dom.main.addClass('jscow-form-radio jscow-cursor').removeClass('jscow-form-radio-disabled');
				
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
	Löst das globale Event "click" für die aktuelle Komponente aus.
	
	@method click
	@event click
	**/
	click: function() {
		this.globalEvents.trigger("click", {}, this.getCmp());
		
		return this;
	},
	
	/**
	Setzt die Focus-CSS Klasse.
	
	@method setFocus
	@event setFocus
	**/
	setFocus: function(e) {
		this.dom.main.addClass("jscow-focus");
	}
	
};

/*
 * jsCow.res.controller.radio - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
MVC-Controller der Komponente jsCow.res.controller.radio

@author Mario Linz
@class jsCow.res.controller.radio
@type Object
@module jsCow.res.controller.radio
@constructor 
*/
jsCow.res.controller.radio = function() {

	/**
	Systemname oder Bezeichnung des Controller.

	@property type
	@type String
	@default "jsCow.res.controller.radio"
	**/
	this.type = "jsCow.res.controller.radio";	// system variable
	
};
jsCow.res.controller.radio.prototype = {
	
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
	Nimmt das Event "setGroup" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetGroup
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleSetGroup: function(e) {
		if (this.isMethodExists(this.getModel().setGroup)) this.getModel().setGroup(e);
		
		return this;
	},
	
	/**
	Nimmt das Event "radioGroupEvent" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleRadioGroupEvent
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleRadioGroupEvent: function(e) {
		if (this.isMethodExists(this.getModel().radioGroupEvent)) this.getModel().radioGroupEvent(e);
		
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

