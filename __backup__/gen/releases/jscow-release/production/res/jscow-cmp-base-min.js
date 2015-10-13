/* jscow - Javascript Component Framework - Components Package trunk (base) - Mario Linz - http://www.jscow.de */
/* 
 * jsCow.res.components.ajax
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: August 18 10:30:00 2011
 */

/**
Komponente fï¿½r das Ajax-Request Handling. 
Ein Request wird technisch ï¿½ber die jQuery Ajax-Methode ausgefï¿½hrt.
ï¿½ber verschiedene verfï¿½gbare Events, kann von auï¿½en auf unterschiedliche Aktionen reagiert werden.

@author Mario Linz
@class jsCow.res.components.ajax
@type Object
@module jsCow.res.components.ajax
@constructor 
*/
jsCow.res.components.ajax = function() { }
jsCow.res.components.ajax.prototype = {
	
	/**
	Init-Methode, die in der Initialisierung der Komponente ausgefï¿½hrt wird.
	
	@method init
	@return {Object} Instanz der jsCow-Komponente.
	**/
	init: function() {
		
		return this;
	},
	
	/**
	Setzt die Standard-MVC Klassen (Model, View, Controller) fï¿½r die Komponente.
	Diese Methode hat keine Parameter, da sie automatisch bei der Initialisierung der Komponente vom Framework ausgefï¿½hrt wird.
	
	@method setDefaultMVC
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setDefaultMVC: function() {
		
		// set model
		this.setModel(jsCow.res.model.ajax);
		// set controller
		this.setController(jsCow.res.controller.ajax);
		
		return this;
	},
	
	/**
	Setzt eine Konfiguration an Parametern, die im Ajax-Request gesendet werden sollen.
	Je nach Typ (GET/POST) werden diese Parameter als GET oder POST Parameter gesendet.
	
	@method setData
	@param {Object} data Daten des Ajax-Request.
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setData: function(data) {
		this.globalEvents.trigger("setData", {
			data: data
		}, this);
		
		return this;
	},
	
	/**
	Setzt die Ajax-Request URL.
	
	@method setUrl
	@param {String} url URL des Ajax-Request.
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setUrl: function(url) {
		this.globalEvents.trigger("setUrl", {
			url: url
		}, this);
		
		return this;
	},
	
	/**
	Setzt den Response-Data-Type (z.B. "json" - default)
	
	@method setDataType
	@param {String} dataType URL des Ajax-Request.
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setDataType: function(dataType, jsonpCallback) {
		
		var eventData = {
			dataType: dataType
		};
		
		if (typeof jsonpCallback != "undefined") {
			if (jsonpCallback == "?") {
				// do nothing ...
			}else{
				eventData.jsonpCallback = jsonpCallback;
			}
		}
		
		this.globalEvents.trigger("setDataType", eventData, this);
		
		return this;
	},
	
	/**
	Setzt den jsonp - Callback Parametername (Default: "callback")
	
	@method jsonpCallbackParam
	@param {String} dataType URL des Ajax-Request.
	@return {Object} Instanz der jsCow-Komponente.
	**/
	jsonpCallbackParam: function(jsonpCallbackParam) {
		
		var eventData = {};
		
		if (typeof jsonpCallbackParam != "undefined") {
			eventData.jsonpCallbackParam = jsonpCallbackParam;
		}
		
		this.globalEvents.trigger("jsonpCallbackParam", eventData, this);
		
		return this;
	},
	
	/**
	Setzt den Typ des Ajax-Request.
	
	@method setRequestType
	@param {String} type Type (get|post) des Ajax-Request.
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setRequestType: function(type) {
		this.globalEvents.trigger("setRequestType", {
			type: type
		}, this);
		
		return this;
	},
	
	/**
	Setzt den Content-Typ des Ajax-Request. Default Content Typ ist der jQuery Ajax content type (z.B. "application/json").
	Default Wert ist hier "false". Die Verarbeitung dieses Wertes wird ï¿½ber jQuery durchgefï¿½hrt.
	
	@method setContentType
	@param {String} contentType Content-Type des Ajax-Request.
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setContentType: function(contentType) {
		this.globalEvents.trigger("setContentType", {
			contentType: contentType
		}, this);
		
		return this;
	},
	
	/**
	Lï¿½st das Event "exec" aus und fï¿½hrt somit den Ajax-Request aus.
	
	@method exec
	@return {Object} Instanz der jsCow-Komponente.
	**/
	exec: function() {
		this.globalEvents.trigger("exec", {}, this);
		
		return this;
	}
	
}

/*
 * jsCow.res.model.ajax - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
MVC-Model der Komponente jsCow.res.components.ajax

@author Mario Linz
@class jsCow.res.model.ajax
@type MVC-Model
@module jsCow.res.model.ajax
@constructor 
*/
jsCow.res.model.ajax = function() {
	
	/**
	Systemname oder Bezeichnung des Model.

	@property type
	@type String
	@default "jsCow.res.model.ajax"
	**/
	this.type = "jsCow.res.model.ajax";	// system variable
	
	/**
	Konfiguration des Model.

	@property config
	@type Object
	@default "{
		globalDisabled: false,
		enabled: true,
		header: {
			url: false,
			type: "POST",
			dataType: "json",
			contentType: false
		},
		data: {}
	}"
	**/
	this.config = {
		globalDisabled: false,
		enabled: true,
		header: {
			url: false,
			type: "POST",
			dataType: "json",
			contentType: false
		},
		data: {}
	}
	
};
jsCow.res.model.ajax.prototype = {
	
	/**
	Wird bei Initialisierung des Komponenten-Model automatisch vom Framework ausgefï¿½hrt.
	
	@method init
	**/
	init: function() {
		
	},
	
	/**
	Diese Event-Handler Methode des Model wird vom Controller aufgerufen, wenn ein entsprechendes Event gefeuert wurde.
	Ist die Komponente enabled, so werden die ï¿½bergebenen Event-Parameter in die Model-Konfiguration geschrieben.
	
	@method setData
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	setData: function(e) {
		if (this.isEnabled()) {
			$.extend(true, this.config.data, e.data.data);
		}
		
		return this;
	},
	
	/**
	Diese Event-Handler Methode des Model wird vom Controller aufgerufen, wenn ein entsprechendes Event gefeuert wurde.
	Ist die Komponente enabled, so wird der ï¿½bergebene Event-Parameter "url" in die Model-Konfiguration geschrieben.
	
	@method setUrl
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	setUrl: function(e) {
		if (this.isEnabled()) {
			this.config.header.url = e.data.url;
		}
		
		return this;
	},
	
	/**
	Diese Event-Handler Methode des Model wird vom Controller aufgerufen, wenn ein entsprechendes Event gefeuert wurde.
	Ist die Komponente enabled, so wird der ï¿½bergebene Event-Parameter "dataType" in die Model-Konfiguration geschrieben.
	
	@method setDataType
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	setDataType: function(e) {
		if (this.isEnabled()) {
			if (e.data.dataType.toLowerCase() === "json" || e.data.dataType.toLowerCase() === "xml" || e.data.dataType.toLowerCase() === "jsonp" ) {
				this.config.header.dataType = e.data.dataType;
				
				if (typeof e.data.jsonpCallback != "undefined") {
					this.config.header.jsonpCallback = e.data.jsonpCallback;
				}
			}
		}
		
		return this;
	},
	
	/**
	Diese Event-Handler Methode des Model wird vom Controller aufgerufen, wenn ein entsprechendes Event gefeuert wurde.
	Ist die Komponente enabled, so wird der ï¿½bergebene Event-Parameter "type" in die Model-Konfiguration geschrieben.
	
	@method setRequestType
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	setRequestType: function(e) {
		if (this.isEnabled()) {
			this.config.header.type = e.data.type;
		}
		
		return this;
	},
	
	/**
	Diese Event-Handler Methode des Model wird vom Controller aufgerufen, wenn ein entsprechendes Event gefeuert wurde.
	Ist die Komponente enabled, so wird der ï¿½bergebene Event-Parameter "contentType" in die Model-Konfiguration geschrieben.
	
	@method setContentType
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	setContentType: function(e) {
		if (this.isEnabled()) {
			this.config.header.contentType = e.data.contentType;
		}
		
		return this;
	},
	
	/**
	Diese Event-Handler Methode des Model wird vom Controller aufgerufen, wenn ein entsprechendes Event gefeuert wurde.
	Ist die Komponente enabled, so wird der ï¿½bergebene Event-Parameter "dataType" in die Model-Konfiguration geschrieben.
	
	@method getDataObject
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	getDataObject: function(data) {
		if (data != undefined) {
			if (this.config.header.dataType.toLowerCase() == "json") {
				return $.parseJSON(data);
			}else if (this.config.header.dataType.toLowerCase() == "jsonp") {
				// No parseJSON because jQuery $.ajax() will parse the json response
				return data;
			}else if (this.config.header.dataType.toLowerCase() == "xml") {
				return $.parseXML(data);
			}
		}
		
		return false;
	},
	
	/**
	Diese Event-Handler Methode des Model wird vom Controller aufgerufen, wenn ein entsprechendes Event gefeuert wurde.
	Ist die Komponente enabled, so wird der ï¿½bergebene Event-Parameter "jsonpCallbackParam" in die Model-Konfiguration geschrieben.
	
	@method jsonpCallbackParam
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	jsonpCallbackParam: function(e) {
		if (this.isEnabled()) {
			this.config.header.jsonpCallbackParam = e.data.jsonpCallbackParam;
		}
		
		return this;
	},
	
	/**
	Diese Event-Handler Methode des Model wird vom Controller aufgerufen, wenn ein entsprechendes Event gefeuert wurde.
	Ist die Komponente enabled, so wird der aktuell konfigurierte Ajax-Request ausgefï¿½hrt.
	
	@method exec
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	exec: function(e) {
		if (this.isEnabled()) {
			var self = this;
			
			var ajaxOptions = {
				type: this.config.header.type,
				url: this.config.header.url,
				data: this.config.data,
				error: function(data) {
					self.error(data);
				}
			};
			
			if (this.events.isEventExists("beforeSend")) {
				ajaxOptions.beforeSend = function(xhr) {
					self.beforeSend(xhr);
				}
			}
			
			if (this.events.isEventExists("dataFilter")) {
				ajaxOptions.dataFilter = function(data) {
					self.dataFilter(data);
				}
			}
			
			if (this.events.isEventExists("success")) {
				ajaxOptions.success = function(data) {
					self.success(data);
				}
			}

			if (this.events.isEventExists("complete")) {
				ajaxOptions.complete = function(data) {
					self.complete(data);
				}
			}
			
			ajaxOptions.data.header = this.config.header;
			ajaxOptions.data.header.time = Math.round(new Date().getTime() / 1000);
			
			if (this.config.header.contentType) {
				ajaxOptions.contentType = this.config.header.contentType;
			}else{
				delete(ajaxOptions.data.header.contentType);
			}
			
			// Set jsonp data
			if (this.config.header.dataType === 'jsonp') {
				ajaxOptions.dataType = this.config.header.dataType;
				
				// Set jsonp - Callback function name
				if (this.config.header.jsonpCallback !== undefined) {
					ajaxOptions.jsonpCallback = this.config.header.jsonpCallback;
				}
				// Set jsonp - Callback parameter name
				if (this.config.header.jsonpCallbackParam !== undefined) {
					ajaxOptions.jsonp = this.config.header.jsonpCallbackParam;
				}
				
			}
			
			$.ajax(ajaxOptions);
			
		}
		
		return this;
	},
	
	/**
	Event-Handler des Event "beforeSend" wird ausgefï¿½hrt, bevor der Ajax-Request ausgefï¿½hrt wird.
	Der Event-Handler wird nur dann ausgefï¿½hrt, wenn die Komponente enabled ist.
	
	@event beforeSend
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	beforeSend: function(xhr) {
		if (this.isEnabled()) {
			this.events.trigger("beforeSend", xhr);
		}
		
		return this;
	},
	
	/**
	Event-Handler des Event "success" wird ausgefï¿½hrt, wenn der Ajax-Request erfolgreich war.
	Der Event-Handler wird nur dann ausgefï¿½hrt, wenn die Komponente enabled ist.
	
	@event success
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	success: function(data) {
		if (this.isEnabled()) {
			this.events.trigger("success", this.getDataObject(data));
		}
		
		return this;
	},
	
	dataFilter : function(data) {
		if (this.isEnabled()) {
			this.events.trigger("dataFilter", this.getDataObject(data));
		}
		
		return this;
	},
	
	/**
	Event-Handler des Event "complete" wird ausgefï¿½hrt, wenn der Ajax-Request beendet ist.
	Der Event-Handler wird nur dann ausgefï¿½hrt, wenn die Komponente enabled ist.
	
	@event complete
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	complete : function(data) {
		if (this.isEnabled()) {
			this.events.trigger("complete", this.getDataObject(data));
		}
		
		return this;
	},
	
	/**
	Event-Handler des Event "error" wird ausgefï¿½hrt, wenn der Ajax-Request fehlerhaft ist.
	Der Event-Handler wird nur dann ausgefï¿½hrt, wenn die Komponente enabled ist.
	
	@event error
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	error: function(data) {
		if (this.isEnabled()) {
			this.events.trigger("error", data);
		}
		
		return this;
	}
	
};

/*
 * jsCow.res.controller.ajax - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
MVC-Controller der Komponente jsCow.res.components.ajax

@author Mario Linz
@class jsCow.res.controller.ajax
@type MVC-Controller
@module jsCow.res.controller.ajax
@constructor 
*/
jsCow.res.controller.ajax = function() {

	/**
	Systemname oder Bezeichnung des Controller.

	@property type
	@type String
	@default "jsCow.res.controller.ajax"
	**/
	this.type = "jsCow.res.controller.ajax";
	
};
jsCow.res.controller.ajax.prototype = {
	
	/**
	Die init Methode des MVC-Controller wird automatisch vom Framework ausgefï¿½hrt, wenn der Controller Initialisiert wird.
	
	@method init
	**/
	init: function() {
		// ...
	},
	
	/**
	Nimmt das Event "setData" entgegen und fï¿½hrt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetData
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	handleSetData: function(e) {
		if (this.isMethodExists(this.getModel().setData)) this.getModel().setData(e);
		
		return false;
	},
	
	/**
	Nimmt das Event "setUrl" entgegen und fï¿½hrt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetUrl
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	handleSetUrl: function(e) {
		if (this.isMethodExists(this.getModel().setUrl)) this.getModel().setUrl(e);
		
		return false;
	},
	
	/**
	Nimmt das Event "setDataType" entgegen und fï¿½hrt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetDataType
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	handleSetDataType: function(e) {
		if (this.isMethodExists(this.getModel().setDataType)) this.getModel().setDataType(e);
		
		return false;
	},
	
	/**
	Nimmt das Event "jsonpCallbackParam" entgegen und fï¿½hrt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleJsonpCallbackParam
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Boolean} false
	**/
	handleJsonpCallbackParam: function(e) {
		if (this.isMethodExists(this.getModel().jsonpCallbackParam)) this.getModel().jsonpCallbackParam(e);
		
		return false;
	},
	
	/**
	Nimmt das Event "setRequestType" entgegen und fï¿½hrt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetRequestType
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	handleSetRequestType: function(e) {
		if (this.isMethodExists(this.getModel().setRequestType)) this.getModel().setRequestType(e);
		
		return false;
	},
	
	/**
	Nimmt das Event "setContentType" entgegen und fï¿½hrt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetContentType
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	handleSetContentType: function(e) {
		if (this.isMethodExists(this.getModel().setContentType)) this.getModel().setContentType(e);
		
		return false;
	},
	
	/**
	Nimmt das Event "exec" entgegen und fï¿½hrt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleExec
	@param {Object} e Eventdaten des aktuell ausgefï¿½hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	handleExec: function(e) {
		if (this.isMethodExists(this.getModel().exec)) this.getModel().exec(e);
		
		return false;
	}
	
};
/* 
 * jsCow.res.components.bar
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: August 18 10:30:00 2011
 */
 
/**
BAR-Komponente zur Anwendung innerhalb einer administrativen Benutzeroberfläche.
Über verfügbare Events, kann von außen auf unterschiedliche Aktionen reagiert werden.

@author Mario Linz
@class jsCow.res.components.bar
@type Object
@module jsCow.res.components.bar
@constructor 
*/
jsCow.res.components.bar = function() { }
jsCow.res.components.bar.prototype = {

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
		this.setModel(jsCow.res.model.bar);
		// set view
		this.setView(jsCow.res.view.bar);
		// set controller
		this.setController(jsCow.res.controller.bar);
		
		return this;
	}
	
}

/*
 * jsCow.res.model.bar - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
MVC-Model der Komponente jsCow.res.model.bar

@author Mario Linz
@class jsCow.res.model.bar
@type MVC-Model
@module jsCow.res.model.bar
@constructor 
*/
jsCow.res.model.bar = function() {
	
	/**
	Systemname oder Bezeichnung des Model.

	@property type
	@type String
	@default "jsCow.res.model.bar"
	**/
	this.type = "jsCow.res.model.bar";	// system variable
	
	/**
	Konfiguration des Model.

	@property config
	@type Object
	@default "{
		enabled: true
	}"
	**/
	this.config = {
		enabled: true
	}
	
};
jsCow.res.model.bar.prototype = {

	/**
	Wird bei Initialisierung des Komponenten-Model automatisch vom Framework ausgeführt.
	
	@method init
	**/
	init: function() {
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	}
	
};

/*
 * jsCow.res.view.bar - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
MVC-View der Komponente jsCow.res.view.bar

@author Mario Linz
@class jsCow.res.view.bar
@type MVC-View
@module jsCow.res.view.bar
@constructor 
*/
jsCow.res.view.bar = function() {
	
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
	@default "jsCow.res.view.bar"
	**/
	this.type = "jsCow.res.view.bar";		// system variable
	
	/**
	Objekt für alle benötigten HTML-DOM Elemente der Komponente.
	
	@property dom
	@type Object
	@default "{}"
	**/
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jscow-bar clearfix');
	this.dom.content = $('<div/>').addClass('jscow-bar-content clearfix').appendTo(this.dom.main);
	
};
jsCow.res.view.bar.prototype = {
	
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
			// Disabled
			if (!cfg.enabled || cfg.globalDisabled) {
				
				this.dom.main.addClass('jscow-bar-disabled').removeClass('jscow-bar');
				
			// Enabled
			}else{
				
				this.dom.main.addClass('jscow-bar').removeClass('jscow-bar-disabled');
				
			}
			
			// Hide / Show
			if (cfg.hide) this.dom.main.addClass('jscow-hide'); else this.dom.main.removeClass('jscow-hide');
			
		}
		
		return this;
	}
	
};

/*
 * jsCow.res.controller.bar - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
MVC-Controller der Komponente jsCow.res.controller.bar

@author Mario Linz
@class jsCow.res.controller.bar
@type MVC-Controller
@module jsCow.res.controller.bar
@constructor 
*/
jsCow.res.controller.bar = function() {

	/**
	Systemname oder Bezeichnung des Controller.

	@property type
	@type String
	@default "jsCow.res.controller.bar"
	**/
	this.type = "jsCow.res.controller.bar";
	
};
jsCow.res.controller.bar.prototype = {
	
	/**
	Die init Methode des MVC-Controller wird automatisch vom Framework ausgeführt, wenn der Controller Initialisiert wird.
	
	@method init
	**/
	init: function() {
		// ...
	}
	
};
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

/*
 * jsCow.res.components.fieldset
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: August 18 10:30:00 2011
 */

/**
Die Fieldset-Komponente kann für das visuelle Gruppieren von beliebigen Komponenten verwendet werden.
Über verfügbare Events, kann von außen auf unterschiedliche Aktionen reagiert werden.

@author Mario Linz
@class jsCow.res.components.fieldset
@type Object
@module jsCow.res.components.fieldset
@constructor 
*/
jsCow.res.components.fieldset = function() { }
jsCow.res.components.fieldset.prototype = {

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
		this.setModel(jsCow.res.model.fieldset);
		// set view
		this.setView(jsCow.res.view.fieldset);
		// set controller
		this.setController(jsCow.res.controller.fieldset);
		
		return this;
	},
	
	/**
	Setzt den Titel/Legend der Fieldset Komponente.
	
	@method setTitle
	@return {Object} Instanz der jsCow-Komponente.
	@event setTitle
	**/
	setTitle: function(l) {
		this.globalEvents.trigger("setTitle", {
			legend: l
		}, this);
		
		return this;
	}
	
}

/**
MVC-Model der Komponente jsCow.res.model.checkbox

@author Mario Linz
@class jsCow.res.model.fieldset
@type Object
@module jsCow.res.model.fieldset
@constructor 
*/
jsCow.res.model.fieldset = function() {
	
	/**
	Systemname oder Bezeichnung des Model.
	
	@property type
	@type String
	@default "jsCow.res.model.checkbox"
	**/
	this.type = "jsCow.res.model.fieldset";	// system variable

	/**
	Konfiguration des Model.

	@property config
	@type Object
	@default "{
		globalDisabled: false,
		enabled: true,
		lastLegend: "",
		legend: ""
	}"
	**/
	this.config = {
		globalDisabled: false,
		enabled: true,
		lastLegend: "",
		legend: ""
	}
	
};
jsCow.res.model.fieldset.prototype = {

	/**
	Wird bei Initialisierung des Komponenten-Model automatisch vom Framework ausgeführt.
	
	@method init
	**/
	init: function() {
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	},
	
	/**
	Setzt den Titel des Fieldset und updatet den View.
	
	@method setTitle
	**/
	setTitle: function(e) {	
		if (this.isEnabled()) {
			this.setConfig({ 
				lastLegend: this.getConfig("legend"),
				legend: e.data.legend
			});
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	}
	
};

/**
MVC-View der Komponente jsCow.res.view.fieldset

@author Mario Linz
@class jsCow.res.view.fieldset
@type Object
@module jsCow.res.view.fieldset
@constructor 
*/
jsCow.res.view.fieldset = function() {

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
	@default "jsCow.res.view.fieldset"
	**/
	this.type = "jsCow.res.view.fieldset";		// system variable
	
	/**
	Objekt für alle benötigten HTML-DOM Elemente der Komponente.
	
	@property dom
	@type Object
	@default "{}"
	**/
	this.dom = {};
	this.dom.main = $('<fieldset/>').addClass('jscow-fieldset');
	this.dom.legend = $('<legend/>').addClass('jscow-fieldset-legend').appendTo(this.dom.main);
	this.dom.content = $('<div/>').addClass('jscow-fieldset-content clearfix').appendTo(this.dom.main);
	
};
jsCow.res.view.fieldset.prototype = {
	
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
		
		this.dom.legend.html(cfg.legend);
		
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
			
			// Disabled
			if (!cfg.enabled || cfg.globalDisabled) {
				
				this.dom.main.addClass('jscow-fieldset-disabled').removeClass('jscow-fieldset');
				
			// Enabled
			}else{
				
				this.dom.main.addClass('jscow-fieldset').removeClass('jscow-fieldset-disabled');
				
				this.dom.legend.html(cfg.legend);
				
				// Hide / Show
				if (cfg.hide) this.dom.main.addClass('jscow-hide'); else this.dom.main.removeClass('jscow-hide');
				
			}
			
		}
		
		return this;
	}
	
};

/**
MVC-Constroller der Komponente jsCow.res.controller.fieldset

@author Mario Linz
@class jsCow.res.controller.fieldset
@type Object
@module jsCow.res.controller.fieldset
@constructor 
*/
jsCow.res.controller.fieldset = function() {

	/**
	Systemname oder Bezeichnung des Controller.

	@property type
	@type String
	@default "jsCow.res.controller.checkbox"
	**/
	this.type = "jsCow.res.controller.fieldset";
	
};
jsCow.res.controller.fieldset.prototype = {
	
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
	}
	
};
/*
 * jsCow.res.components.group
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: August 18 10:30:00 2011
 */

/**
Komponente zur Gruppierung von beliebigen Komponenten.
Die Group-Komponente hat neben den allgemeinen Komponenten-Methoden keine spezifischen Methoden.

@author Mario Linz
@class jsCow.res.components.group
@type Object
@module jsCow.res.components.group
@constructor 
*/
jsCow.res.components.group = function() {}
jsCow.res.components.group.prototype = {

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
		this.setModel(jsCow.res.model.group);
		// set view
		this.setView(jsCow.res.view.group);
		// set controller
		this.setController(jsCow.res.controller.group);
		
		return this;
	}
	
}

/*
 * jsCow.res.model.group - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
MVC-Model der Komponente jsCow.res.model.group

@author Mario Linz
@class jsCow.res.model.group
@type Object
@module jsCow.res.model.group
@constructor 
*/
jsCow.res.model.group = function() {
	
	/**
	Systemname oder Bezeichnung des Model.
	
	@property type
	@type String
	@default "jsCow.res.model.group"
	**/
	this.type = "jsCow.res.model.group";	// system variable
	
	/**
	Konfiguration des Model.

	@property config
	@type Object
	@default "{
		globalDisabled: false,
		enabled: true
	}"
	**/
	this.config = {
		globalDisabled: false,
		enabled: true
	}
	
};
jsCow.res.model.group.prototype = {

	/**
	Wird bei Initialisierung des Komponenten-Model automatisch vom Framework ausgeführt.
	
	@method init
	**/
	init: function() {
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	}
	
};

/*
 * jsCow.res.view.group - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
MVC-View der Komponente jsCow.res.view.group

@author Mario Linz
@class jsCow.res.view.group
@type Object
@module jsCow.res.view.group
@constructor 
*/
jsCow.res.view.group = function() {

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
	this.type = "jsCow.res.view.group";		// system variable
	
	/**
	Objekt für alle benötigten HTML-DOM Elemente der Komponente.
	
	@property dom
	@type Object
	@default "{}"
	**/
	this.dom = {};
	this.dom.main = $('<div/>').addClass('clearfix');
	this.dom.content = $('<div/>').appendTo(this.dom.main);
	
};
jsCow.res.view.group.prototype = {
	
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
		
		var cfg = cfg.data;
		
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
			
			// Disabled
			if (!cfg.enabled || cfg.globalDisabled) {
				
				
				
			// Enabled
			}else{
				
				// Hide / Show
				if (cfg.hide) this.dom.main.addClass('jscow-hide'); else this.dom.main.removeClass('jscow-hide');
				
			}
			
		}
		
		return this;
	}
	
};

/*
 * jsCow.res.controller.group - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: October 25 22:00:00 2011
 */

/**
MVC-Controller der Komponente jsCow.res.controller.group

@author Mario Linz
@class jsCow.res.controller.group
@type Object
@module jsCow.res.controller.group
@constructor 
*/
jsCow.res.controller.group = function() {

	/**
	Systemname oder Bezeichnung des Controller.

	@property type
	@type String
	@default "jsCow.res.controller.group"
	**/
	this.type = "jsCow.res.controller.group";
	
};
jsCow.res.controller.group.prototype = {
	
	/**
	Die init Methode des MVC-Controller wird automatisch vom Framework ausgeführt, wenn der Controller Initialisiert wird.
	
	@method init
	**/
	init: function() {
		// ...
	}
	
};
/*
 * jsCow.res.components.input
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */
 
/**
Typische Formular Komponente zur Nutzung eines einzeligen Eingabefeldes.

@author Mario Linz
@class jsCow.res.components.input
@type Object
@module jsCow.res.components.input
@constructor 
*/
jsCow.res.components.input = function() {}
jsCow.res.components.input.prototype = {
	
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
		this.setModel(jsCow.res.model.input);
		// set view
		this.setView(jsCow.res.view.input);
		// set controller
		this.setController(jsCow.res.controller.input);
		
		return this;
	},
	
	/**
	Setzt den Wert des Eingabefeldes und löst das Event "setValue" aus.
	
	@method setValue
	@event setValue
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setValue: function(v) {
		this.globalEvents.trigger("setValue", {
			input: v
		}, this);
		
		return this;
	},
	
	/**
	Gibt den Wert des Eingabefeldes zurück.
	
	@method getValue
	@return {Object} Instanz der jsCow-Komponente.
	**/
	getValue: function() {
		return this.getConfig("input");
	},
	
	/**
	Setzt die Ausrichtung des Eingabefeldes innerhalb seiner Umgebungskomponente.
	
	@method setAlign
	@event setAlign
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setAlign: function(align) {
		this.globalEvents.trigger("setAlign", {
			align: align
		}, this);
		
		return this;
	},
	
	/**
	Löst das Event "setDefaultText" aus und setzt den Default-Text des Eingabefeldes.
	
	@method setDefaultText
	@event setDefaultText
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setDefaultText: function(t) {
		this.globalEvents.trigger("setDefaultText", {
			placeholder: t
		}, this);
		
		return this;
	},
	
	/**
	Gibt den Value des Placeholder des Eingabefeldes zurück.
	
	@method getDefaultText
	@event getDefaultText
	@return {Object} Instanz der jsCow-Komponente.
	**/
	getDefaultText: function() {
		return this.getConfig("placeholder");
	}
	
}

/*
 * jsCow.res.model.input - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
MVC-Model der Komponente jsCow.res.model.input

@author Mario Linz
@class jsCow.res.model.input
@type Object
@module jsCow.res.model.input
@constructor 
*/
jsCow.res.model.input = function() {
	
	/**
	Systemname oder Bezeichnung des Model.
	
	@property type
	@type String
	@default "jsCow.res.model.checkbox"
	**/
	this.type = "jsCow.res.model.input";	// system variable

	/**
	Konfiguration des Model.

	@property config
	@type Object
	@default "{
		enabled: true,
		input: "",
		align: "left",
		placeholder: "..."
	}"
	**/
	this.config = {
		enabled: true,
		input: "",
		align: "left",
		placeholder: "..."
	};
	
};
jsCow.res.model.input.prototype = {

	/**
	Wird bei Initialisierung des Komponenten-Model automatisch vom Framework ausgeführt.
	
	@method init
	**/
	init: function() {
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	},
	
	/**
	Setzt den Value des Eingabefeldes, speichert ihn in der Model-Konfiguration und updatet den View.
	
	@method setValue
	**/
	setValue: function(e) {	
		if (this.isEnabled()) {
			this.setConfig({ 
				input: e.data.input
			});
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	/**
	Setzt den Default-Text des Eingabefeldes, speichert ihn in der Model-Konfiguration und updatet den View.
	
	@method setDefaultText
	**/
	setDefaultText: function(e) {
		if (this.isEnabled()) {
			this.setConfig({ 
				placeholder: e.data.placeholder
			});
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	/**
	Setzt die Ausrichtung des Eingabefeldes, speichert ihn in der Model-Konfiguration und updatet den View.
	
	@method setAlign
	**/
	setAlign: function(e) {	
		this.setConfig({ 
			align: e.data.align
		});
		
		this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		
		return this;
	}
	
};

/*
 * jsCow.res.view.input - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
MVC-View der Komponente jsCow.res.view.input

@author Mario Linz
@class jsCow.res.view.input
@type Object
@module jsCow.res.view.input
@constructor 
*/
jsCow.res.view.input = function() {

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
	this.type = "jsCow.res.view.input";	// system variable
	
	/**
	Objekt für alle benötigten HTML-DOM Elemente der Komponente.
	
	@property dom
	@type Object
	@default "{}"
	**/
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jscow-form-input clearfix');
	this.dom.input = $('<input/>').addClass('jscow-form-input-field').appendTo(this.dom.main);
	
};
jsCow.res.view.input.prototype = {
	
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
		
		var self = this.getCmp();
		var view = this;
		
		this.dom.input.val(cfg.input).keyup(function() {
			
			self.globalEvents.trigger("setValue", {
				input: view.dom.input.val()
			}, self);
			
		}).attr({
			placeholder: cfg.placeholder}
		);
		
		this.setAlign(cfg.align);
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
				
				this.dom.main.addClass('jscow-form-input-disabled').removeClass('jscow-form-input');
				this.dom.input.attr("readonly","readonly");
				
			}else{
				
				this.dom.main.addClass('jscow-form-input').removeClass('jscow-form-input-disabled');
				this.dom.input.removeAttr("readonly");
				
				this.dom.input.val(cfg.input);
				this.dom.input.attr({placeholder: cfg.placeholder});
				
				this.setAlign(cfg.align);
				
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
				this.dom.main.removeClass("jscow-align-none jscow-align-right").addClass("jscow-align-left");
			break;
			case "right":
				this.dom.main.removeClass("jscow-align-none jscow-align-left").addClass("jscow-align-right");
			break;
			case "fillup":
				this.dom.main.removeClass("jscow-align-left jscow-align-right").addClass("jscow-align-none");
			break;
			default:
				this.dom.main.removeClass("jscow-align-left jscow-align-right").addClass("jscow-align-none");
			break;
		}
	},
	
	/**
	Setzt die Focus CSS Klasse.
	
	@method setFocus
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	setFocus: function(e) {
		this.dom.main.addClass("jscow-focus");
	}
	
};

/*
 * jsCow.res.controller.input - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
MVC-Controller der Komponente jsCow.res.controller.input

@author Mario Linz
@class jsCow.res.controller.input
@type Object
@module jsCow.res.controller.input
@constructor 
*/
jsCow.res.controller.input = function() {

	/**
	Systemname oder Bezeichnung des Controller.

	@property type
	@type String
	@default "jsCow.res.controller.input"
	**/
	this.type = "jsCow.res.controller.input";	// system variable
	
};
jsCow.res.controller.input.prototype = {
	
	/**
	Die init Methode des MVC-Controller wird automatisch vom Framework ausgeführt, wenn der Controller Initialisiert wird.
	
	@method init
	**/
	init: function() {
		// ...
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
	Nimmt das Event "setDefaultText" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetDefaultText
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleSetDefaultText: function(e) {
		if (this.isMethodExists(this.getModel().setDefaultText)) this.getModel().setDefaultText(e);
		
		return this;
	},
	
	/**
	Nimmt das Event "setAlign" entgegen und führt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetAlign
	@param {Object} e Event-Parameter, die an die Methode übergeben werden. 
	**/
	handleSetAlign: function(e) {
		if (this.isMethodExists(this.getModel().setAlign)) this.getModel().setAlign(e);
		
		return this;
	}
	
};

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

/*
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

/*
 * jsCow.res.components.textarea
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
Formular-Komponente für ein mehrzeiliges Textfeld.

@author Mario Linz
@class jsCow.res.components.textarea
@type Object
@module jsCow.res.components.textarea
@constructor 
*/
jsCow.res.components.textarea = function() {}
jsCow.res.components.textarea.prototype = {
	
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
		this.setModel(jsCow.res.model.textarea);
		// set view
		this.setView(jsCow.res.view.textarea);
		// set controller
		this.setController(jsCow.res.controller.textarea);
		
		return this;
	},
	
	/**
	 * @description Set value
	 */	
	/*
		@group Components
		@page Textarea
		@title setValue(<string>)
		@description Löst das Event "setValue" aus und setzt den Text-Inhalt der Textarea.
		@examples cmp.textarea.setValue
	*/
	setValue: function(v) {
		this.globalEvents.trigger("setValue", {
			input: v
		}, this);
		
		return this;
	},
	
	/**
	 * @description Get value
	 */	
	/*
		@group Components
		@page Textarea
		@title getValue()
		@description Gibt den Text-Inhalt der Textarea zurück.
		@examples cmp.textarea.getValue
	*/
	getValue: function() {
		return this.getConfig("input");
	},
	
	/**
	 * @description Set align
	 */	
	/*
		@group Components
		@page Textarea
		@title setAlign(<left|fillup|right>)
		@description Löst das Event "setAlign" aus und setzt die Aurichtung der Textarea Komponente innerhalb dessen übergeordneten Komponente.
		@examples cmp.textarea.setAlign
	*/
	setAlign: function(align) {
		this.globalEvents.trigger("setAlign", {
			align: align
		}, this);
		
		return this;
	},
	
	/**
	 * @description Set default text
	 */	
	/*
		@group Components
		@page Textarea
		@title setDefaultText(<string>)
		@description Löst das Event "setDefaultText" aus und setzt den Default-Text der Textarea.
		@examples cmp.textarea.setDefaultText
	*/	
	setDefaultText: function(t) {
		this.globalEvents.trigger("setDefaultText", {
			placeholder: t
		}, this);
		
		return this;
	},
	
	/**
	 * @description Get default text
	 */	
	/*
		@group Components
		@page Textarea
		@title getDefaultText()
		@description Gibt den Default-Text der Textarea zurück.
		@examples cmp.textarea.getDefaultText
	*/	
	getDefaultText: function() {
		return this.getConfig("placeholder");
	}
	
}

/*
 * jsCow.res.model.textarea - jsCow extention - JavaScript Library
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
jsCow.res.model.textarea = function() {
	
	this.type = "jsCow.res.model.textarea";	// system variable

	this.config = {
		globalDisabled: false,
		enabled: true,
		input: "",
		align: "left",
		placeholder: "..."
	};
	
};
jsCow.res.model.textarea.prototype = {

	init: function() {
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	},
	
	setValue: function(e) {	
		
		if (this.isEnabled()) {
			this.setConfig({ 
				input: e.data.input
			});
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	setDefaultText: function(e) {	
		if (this.isEnabled()) {
			this.setConfig({ 
				placeholder: e.data.placeholder
			});
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	setAlign: function(e) {	
		this.setConfig({ 
			align: e.data.align
		});
		
		this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
	
		return this;
	}
	
};

/**
 * @description Class structure of 'jsCow.res.view.textarea'
 */
jsCow.res.view.textarea = function() {

	this.execInit = false;					// system variable
	this.type = "jsCow.res.view.textarea";	// system variable
	
	// Variables of html dom elements - jquery objects
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jscow-form-textarea clearfix');
	this.dom.textarea = $('<textarea/>').addClass('jscow-form-textarea-field').appendTo(this.dom.main);
	
};
jsCow.res.view.textarea.prototype = {
	
	init: function(c) {
		var cfg = c.data;
		
		var self = this.getCmp();
		var view = this;
		
		this.dom.textarea.val(cfg.input).keyup(function() {
			
			self.globalEvents.trigger("setValue", {
				input: view.dom.textarea.val()
			}, self);
			
		}).attr({
			placeholder: cfg.placeholder
		});
		
		this.setAlign(cfg.align);
		this.update(c);
	},
	
	update: function(cfg) {
		var cfg = cfg.data;
		if (cfg) {
			
			if (!cfg.enabled || cfg.globalDisabled) {
				
				this.dom.main.addClass('jscow-form-textarea-disabled').removeClass('jscow-form-textarea');
				this.dom.textarea.attr("readonly","readonly");
				
			}else{
				
				this.dom.main.addClass('jscow-form-textarea').removeClass('jscow-form-textarea-disabled');
				this.dom.textarea.removeAttr("readonly");
				this.dom.textarea.attr({placeholder: cfg.placeholder});
				
				this.dom.textarea.val(cfg.input);
				this.setAlign(cfg.align);
				
				// Hide / Show
				if (cfg.hide) this.dom.main.addClass('jscow-hide'); else this.dom.main.removeClass('jscow-hide');
				
			}
			
		}
		return this;
	},
	
	setAlign: function(align) {
		switch (align) {
			case "left":
				this.dom.main.removeClass("jscow-align-none jscow-align-right").addClass("jscow-align-left");
			break;
			case "right":
				this.dom.main.removeClass("jscow-align-none jscow-align-left").addClass("jscow-align-right");
			break;
			case "fillup":
				this.dom.main.removeClass("jscow-align-left jscow-align-right").addClass("jscow-align-none");
			break;
			default:
				this.dom.main.removeClass("jscow-align-left jscow-align-right").addClass("jscow-align-none");
			break;
		}
	}
	
};

/*
 * jsCow.res.controller.textarea - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
 * @description Class structure of 'jsCow.res.controller.textarea'
 */
jsCow.res.controller.textarea = function() {

	this.type = "jsCow.res.controller.textarea";	// system variable
	
};
jsCow.res.controller.textarea.prototype = {
	
	init: function() {
		// ...
	},
	
	/**
	 * @description Set value
	 */	
	handleSetValue: function(e) {
		if (this.isMethodExists(this.getModel().setValue)) this.getModel().setValue(e);
		
		return this;
	},
	
	/**
	 * @description Set default text
	 */
	handleSetDefaultText: function(e) {
		if (this.isMethodExists(this.getModel().setDefaultText)) this.getModel().setDefaultText(e);
		
		return this;
	},
	
	/**
	 * @description Set default text
	 */
	handleSetAlign: function(e) {
		if (this.isMethodExists(this.getModel().setAlign)) this.getModel().setAlign(e);
		
		return this;
	}
	
};

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
