/*
 * jsCow.res.components.panel
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: August 18 21:00:00 2011
 */

/**
Komponente zur visuellen Gruppierung von beliebigen Komponenten mit der Eigenschaft, dessen Inahlt ein- und auszublenden.

@author Mario Linz
@class jsCow.res.components.panel
@type Object
@module jsCow.res.components.panel
@constructor 
*/
jsCow.res.components.panel = function() {}
jsCow.res.components.panel.prototype = {
	
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
		this.setModel(jsCow.res.model.panel);
		// set view
		this.setView(jsCow.res.view.panel);
		// set controller
		this.setController(jsCow.res.controller.panel);
		
		return this;
	}, 

	/**
	Öffnet das Panel und blendet alle Kind-Komponenten ein.
	Löst das Event "open" aus und setzt den Text der Label-Komponente.
	
	@method open
	@event open
	@return {Object} Instanz der jsCow-Komponente.
	**/
	open: function() {
		this.globalEvents.trigger("open", {}, this);

		return this;
	},
	
	/**
	Schließt das Panel und blendet alle Kind-Komponenten aus.
	Löst das Event "collapse" aus und setzt den Text der Label-Komponente.
	
	@method collapse
	@event collapse
	@return {Object} Instanz der jsCow-Komponente.
	**/
	collapse: function() {
		this.globalEvents.trigger("collapse", {}, this);
		
		return this;
	},
	
	/**
	Setzt den Titel einer Panel-Komponente.
	Löst das Event "setTitle" aus und setzt den Text der Label-Komponente.
	
	@method setTitle
	@event setTitle
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setTitle: function(title) {
		this.globalEvents.trigger("setTitle", {
			title: title
		}, this);
		
		return this;
	}
	
}

/*
 * jsCow.res.model.panel - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
MVC-Model der Komponente jsCow.res.model.label

@author Mario Linz
@class jsCow.res.model.label
@type Object
@module jsCow.res.model.label
@constructor 
*/
jsCow.res.model.panel = function() {
	
	/**
	Systemname oder Bezeichnung des Model.
	
	@property type
	@type String
	@default "jsCow.res.model.panel"
	**/
	this.type = "jsCow.res.model.panel";	// system variable

	/**
	Konfiguration des Model.

	@property config
	@type Object
	@default "{
		enabled: true,
		collapsed: false,
		title: false,
		arrow: {
			open: "&#9660;",
			collapsed: "&#9658;"
		}
	}"
	**/
	this.config = {
		enabled: true,
		collapsed: false,
		title: false,
		arrow: {
			open: "&#9660;",
			collapsed: "&#9658;"
		}
	}
	
};
jsCow.res.model.panel.prototype = {

	/**
	Wird bei Initialisierung des Komponenten-Model automatisch vom Framework ausgeführt.
	
	@method init
	**/
	init: function() {
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	},

	/**
	Setzt die Model-Konfiguration zum Schließen des Panel-Contents und updatet den View.
	Zum Schluss wird das Event "collapse" gefeuert.
	
	@method collapse
	@event collapse
	**/
	collapse: function() {
		this.setConfig({ collapsed: true });
		this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		this.events.trigger("collapse", this.getConfig());
		
		return this;
	},
	
	/**
	Setzt die Model-Konfiguration zum Öffnen des Panel-Contents und updatet den View.
	Zum Schluss wird das Event "open" gefeuert.
	
	@method open
	@event open
	**/
	open: function() {
		this.setConfig({ collapsed: false });
		this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		this.events.trigger("open", this.getConfig());
		
		return this;
	},
	
	/**
	Setzt die Model-Konfiguration zum setzen des Titel und updatet den View.
	Zum Schluss wird das Event "onchange" gefeuert.
	
	@method setTitle
	@event onchange
	**/
	setTitle: function(e) {
		if (this.isEnabled()) {
			this.setConfig({ title: e.data.title });
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
			this.events.trigger("onchange", this.getConfig());
		}
		
		return this;
	}
	
};

/*
 * jsCow.res.view.panel - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
MVC-View der Komponente jsCow.res.view.panel

@author Mario Linz
@class jsCow.res.view.panel
@type Object
@module jsCow.res.view.panel
@constructor 
*/
jsCow.res.view.panel = function() {

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
	@default "jsCow.res.view.panel"
	**/
	this.type = "jsCow.res.view.panel";		// system variable
	
	/**
	Objekt für alle benötigten HTML-DOM Elemente der Komponente.
	
	@property dom
	@type Object
	@default "{}"
	**/
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jscow-panel clearfix');
	
	this.dom.title = $('<div/>').addClass('jscow-panel-title jscow-cursor clearfix');
	this.dom.title.arrow = $('<div/>').addClass("jscow-panel-title-arrow jscow-float-left").appendTo(this.dom.title);
	this.dom.title.text = $('<div/>').addClass('jscow-panel-title-text jscow-float-left').appendTo(this.dom.title);
	
	this.dom.content = $('<div/>').addClass('jscow-panel-content clearfix');
	
	this.configCache = {};
	
};
jsCow.res.view.panel.prototype = {
	
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
		this.configCache = cfg;
		
		// Append html elements
		if (cfg.title != undefined && cfg.title) {
			this.dom.title.arrow.html(cfg.arrow.open);
			this.dom.title.text.html(cfg.title);
			this.dom.title.appendTo(this.dom.main);
		}
		this.dom.content.appendTo(this.dom.main);
		
		// Set click handler
		this.dom.title.click((function(self) {
			return function() {
				if (self.configCache.collapsed) {
					self.open();
				}else{ 
					self.collapse();
				}
			}
		})(this));
		
		if (cfg.collapsed) this.collapse();
		
		if (cfg.collapsed) {
			this.dom.title.arrow.html(cfg.arrow.collapsed);
			this.dom.content.hide();
		}else{
			this.dom.title.arrow.html(cfg.arrow.open);
			this.dom.content.show();
		}
		
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
		this.configCache = cfg;
		
		if (cfg) {
		
			if (!cfg.enabled || cfg.globalDisabled) {
				
				this.dom.main.addClass('jscow-panel-disabled').removeClass('jscow-panel');
				
			}else{
			
				this.dom.main.addClass('jscow-panel').removeClass('jscow-panel-disabled');
				
				if (cfg.collapsed) {
					this.dom.title.arrow.html(cfg.arrow.collapsed);
					this.dom.content.hide();
				}else{
					this.dom.title.arrow.html(cfg.arrow.open);
					this.dom.content.show();
				}
				
				// Hide / Show
				if (cfg.hide) this.dom.main.addClass('jscow-hide'); else this.dom.main.removeClass('jscow-hide');
				
			}
			
		}
		
		return this;
	},
	
	/**
	Löst das globale Event "collapse" aus.
	
	@method open
	@event open
	**/
	open: function() {
		this.globalEvents.trigger("open", {}, this.getCmp());
		
		return this;
	},

	/**
	Löst das globale Event "collapse" aus.
	
	@method collapse
	@event collapse
	**/
	collapse: function() {
		this.globalEvents.trigger("collapse", {}, this.getCmp());
		
		return this;
	}
	
};

/*
 * jsCow.res.controller.panel - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
MVC-Controller der Komponente jsCow.res.controller.panel

@author Mario Linz
@class jsCow.res.controller.panel
@type Object
@module jsCow.res.controller.panel
@constructor 
*/
jsCow.res.controller.panel = function() {

	/**
	Systemname oder Bezeichnung des Controller.

	@property type
	@type String
	@default "jsCow.res.controller.panel"
	**/
	this.type = "jsCow.res.controller.panel";
	
};
jsCow.res.controller.panel.prototype = {
	
	/**
	Die init Methode des MVC-Controller wird automatisch vom Framework ausgeführt, wenn der Controller Initialisiert wird.
	
	@method init
	**/
	init: function() {
		// ...
	},
	
	/**
	Nimmt das Event "open" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleOpen
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleOpen : function(e) {
		if (this.isMethodExists(this.getModel().open)) this.getModel().open(e);
		
		return true;
	},
	
	/**
	Nimmt das Event "collapse" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleCollapse
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleCollapse : function(e) {
		if (this.isMethodExists(this.getModel().collapse)) this.getModel().collapse(e);
		
		return true;
	},
	
	/**
	Nimmt das Event "setTitle" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetTitle
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleSetTitle : function(e) {
		if (this.isMethodExists(this.getModel().setTitle)) this.getModel().setTitle(e);
		
		return true;
	}
	
};
