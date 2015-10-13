/*
 * jsCow.res.components.label
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */
 
/**
Einfache Komponente zur Anzeige eines Textes.

@author Mario Linz
@class jsCow.res.components.label
@type Object
@module jsCow.res.components.label
@constructor 
*/
jsCow.res.components.label = function() {}
jsCow.res.components.label.prototype = {
	
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
		this.setModel(jsCow.res.model.label);
		// set view
		this.setView(jsCow.res.view.label);
		// set controller
		this.setController(jsCow.res.controller.label);
		
		return this;
	},
	
	/**
	Löst das Event "setLabel" aus und setzt den Text der Label-Komponente.
	
	@method setLabel
	@event setLabel
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setLabel: function(l) {
		this.globalEvents.trigger("setLabel", {
			label: l
		}, this);
		
		return this;
	},
	
	/**
	Gibt den Titel der Label-Komponente zurück.
	
	@method getLabel
	@event getLabel
	@return {String} Label der jsCow-Komponente.
	**/
	getLabel: function() {
		return this.getModel().getConfig("label");
	}
	
}

/*
 * jsCow.res.model.label - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
MVC-Model der Komponente jsCow.res.model.label

@author Mario Linz
@class jsCow.res.model.label
@type Object
@module jsCow.res.model.label
@constructor 
*/
jsCow.res.model.label = function() {
	
	/**
	Systemname oder Bezeichnung des Model.
	
	@property type
	@type String
	@default "jsCow.res.model.label"
	**/
	this.type = "jsCow.res.model.label";	// system variable

	/**
	Konfiguration des Model.

	@property config
	@type Object
	@default "{
		enabled: true,
		label: "",
		lastLabel: false,
		align: false
	}"
	**/
	this.config = {
		enabled: true,
		label: "",
		lastLabel: false,
		align: false
	};
	
};
jsCow.res.model.label.prototype = {

	/**
	Wird bei Initialisierung des Komponenten-Model automatisch vom Framework ausgeführt.
	
	@method init
	**/
	init: function() {
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	},
	
	/**
	Setzt den Label des der Komponente in der Model-Konfiguration und updatet den View.
	
	@method setValue
	**/
	setLabel: function(e) {	
		if (this.isEnabled()) {
			this.setConfig({ 
				lastLabel: this.getConfig("label"),
				label: e.data.label
			});
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	}
	
};

/*
 * jsCow.res.view.label - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
MVC-View der Komponente jsCow.res.view.label

@author Mario Linz
@class jsCow.res.view.label
@type Object
@module jsCow.res.view.label
@constructor 
*/
jsCow.res.view.label = function() {

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
	@default "jsCow.res.view.group"
	**/
	this.type = "jsCow.res.view.label";	// system variable
	
	/**
	Objekt für alle benötigten HTML-DOM Elemente der Komponente.
	
	@property dom
	@type Object
	@default "{}"
	**/
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jscow-label clearfix');
	this.dom.content = $('<div/>').addClass('jscow-label-content').appendTo(this.dom.main);
	
};
jsCow.res.view.label.prototype = {
	
	/**
	Die init Methode des MVC-View wird meist über das Event "viewInit" in der init Methode des Model ausgeführt.
	Zu welchem Zeitpunkt dies passiert, ist dem Entwickler überlassen.
	(Es empfiehlt sich jedoch das Triggern der View-Initialisierung über die Init-Methode des Models auszuführen.)
	
	@example Model.init: function() {
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	}
	@method init
	**/
	init: function(c) {
		var cfg = c.data;
		
		this.setAlign(cfg.align);
		this.dom.content.html(cfg.label);
		
		this.update(c);
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
				
				this.dom.main.addClass('jscow-label-disabled').removeClass('jscow-label');
				
			}else{
				
				this.dom.main.addClass('jscow-label').removeClass('jscow-label-disabled');
				
				this.setAlign(cfg.align);
				this.dom.content.html(cfg.label);
				
				// Hide / Show
				if (cfg.hide) this.dom.main.addClass('jscow-hide'); else this.dom.main.removeClass('jscow-hide');
				
			}
			
		}
		return this;
	},
	
	/**
	Setzt die Ausrichtung des Inputfeldes.
	
	@method setAlign
	@param {String} align left|right|fillup
	**/
	setAlign: function(align) {
		switch (align) {
			case "left":
				this.dom.main.css({'clear':'none','float':'left'});
			break;
			case "right":
				this.dom.main.css({'clear':'none','float':'right'});
			break;
			default:
				this.dom.main.css({'clear':'both'});
			break;
		}
	}
	
};

/*
 * jsCow.res.controller.label - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
MVC-Controller der Komponente jsCow.res.controller.label

@author Mario Linz
@class jsCow.res.controller.label
@type Object
@module jsCow.res.controller.label
@constructor 
*/
jsCow.res.controller.label = function() {

	/**
	Systemname oder Bezeichnung des Controller.

	@property type
	@type String
	@default "jsCow.res.controller.input"
	**/
	this.type = "jsCow.res.controller.label";	// system variable
	
};
jsCow.res.controller.label.prototype = {
	
	/**
	Die init Methode des MVC-Controller wird automatisch vom Framework ausgeführt, wenn der Controller Initialisiert wird.
	
	@method init
	**/
	init: function() {
		// ...
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

