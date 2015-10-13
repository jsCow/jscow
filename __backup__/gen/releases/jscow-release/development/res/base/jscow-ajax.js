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
Komponente f�r das Ajax-Request Handling. 
Ein Request wird technisch �ber die jQuery Ajax-Methode ausgef�hrt.
�ber verschiedene verf�gbare Events, kann von au�en auf unterschiedliche Aktionen reagiert werden.

@author Mario Linz
@class jsCow.res.components.ajax
@type Object
@module jsCow.res.components.ajax
@constructor 
*/
jsCow.res.components.ajax = function() { }
jsCow.res.components.ajax.prototype = {
	
	/**
	Init-Methode, die in der Initialisierung der Komponente ausgef�hrt wird.
	
	@method init
	@return {Object} Instanz der jsCow-Komponente.
	**/
	init: function() {
		
		return this;
	},
	
	/**
	Setzt die Standard-MVC Klassen (Model, View, Controller) f�r die Komponente.
	Diese Methode hat keine Parameter, da sie automatisch bei der Initialisierung der Komponente vom Framework ausgef�hrt wird.
	
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
	Default Wert ist hier "false". Die Verarbeitung dieses Wertes wird �ber jQuery durchgef�hrt.
	
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
	L�st das Event "exec" aus und f�hrt somit den Ajax-Request aus.
	
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
	Wird bei Initialisierung des Komponenten-Model automatisch vom Framework ausgef�hrt.
	
	@method init
	**/
	init: function() {
		
	},
	
	/**
	Diese Event-Handler Methode des Model wird vom Controller aufgerufen, wenn ein entsprechendes Event gefeuert wurde.
	Ist die Komponente enabled, so werden die �bergebenen Event-Parameter in die Model-Konfiguration geschrieben.
	
	@method setData
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
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
	Ist die Komponente enabled, so wird der �bergebene Event-Parameter "url" in die Model-Konfiguration geschrieben.
	
	@method setUrl
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
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
	Ist die Komponente enabled, so wird der �bergebene Event-Parameter "dataType" in die Model-Konfiguration geschrieben.
	
	@method setDataType
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
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
	Ist die Komponente enabled, so wird der �bergebene Event-Parameter "type" in die Model-Konfiguration geschrieben.
	
	@method setRequestType
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
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
	Ist die Komponente enabled, so wird der �bergebene Event-Parameter "contentType" in die Model-Konfiguration geschrieben.
	
	@method setContentType
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
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
	Ist die Komponente enabled, so wird der �bergebene Event-Parameter "dataType" in die Model-Konfiguration geschrieben.
	
	@method getDataObject
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
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
	Ist die Komponente enabled, so wird der �bergebene Event-Parameter "jsonpCallbackParam" in die Model-Konfiguration geschrieben.
	
	@method jsonpCallbackParam
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
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
	Ist die Komponente enabled, so wird der aktuell konfigurierte Ajax-Request ausgef�hrt.
	
	@method exec
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
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
	Event-Handler des Event "beforeSend" wird ausgef�hrt, bevor der Ajax-Request ausgef�hrt wird.
	Der Event-Handler wird nur dann ausgef�hrt, wenn die Komponente enabled ist.
	
	@event beforeSend
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	beforeSend: function(xhr) {
		if (this.isEnabled()) {
			this.events.trigger("beforeSend", xhr);
		}
		
		return this;
	},
	
	/**
	Event-Handler des Event "success" wird ausgef�hrt, wenn der Ajax-Request erfolgreich war.
	Der Event-Handler wird nur dann ausgef�hrt, wenn die Komponente enabled ist.
	
	@event success
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
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
	Event-Handler des Event "complete" wird ausgef�hrt, wenn der Ajax-Request beendet ist.
	Der Event-Handler wird nur dann ausgef�hrt, wenn die Komponente enabled ist.
	
	@event complete
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	complete : function(data) {
		if (this.isEnabled()) {
			this.events.trigger("complete", this.getDataObject(data));
		}
		
		return this;
	},
	
	/**
	Event-Handler des Event "error" wird ausgef�hrt, wenn der Ajax-Request fehlerhaft ist.
	Der Event-Handler wird nur dann ausgef�hrt, wenn die Komponente enabled ist.
	
	@event error
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
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
	Die init Methode des MVC-Controller wird automatisch vom Framework ausgef�hrt, wenn der Controller Initialisiert wird.
	
	@method init
	**/
	init: function() {
		// ...
	},
	
	/**
	Nimmt das Event "setData" entgegen und f�hrt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetData
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	handleSetData: function(e) {
		if (this.isMethodExists(this.getModel().setData)) this.getModel().setData(e);
		
		return false;
	},
	
	/**
	Nimmt das Event "setUrl" entgegen und f�hrt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetUrl
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	handleSetUrl: function(e) {
		if (this.isMethodExists(this.getModel().setUrl)) this.getModel().setUrl(e);
		
		return false;
	},
	
	/**
	Nimmt das Event "setDataType" entgegen und f�hrt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetDataType
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	handleSetDataType: function(e) {
		if (this.isMethodExists(this.getModel().setDataType)) this.getModel().setDataType(e);
		
		return false;
	},
	
	/**
	Nimmt das Event "jsonpCallbackParam" entgegen und f�hrt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleJsonpCallbackParam
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
	@return {Boolean} false
	**/
	handleJsonpCallbackParam: function(e) {
		if (this.isMethodExists(this.getModel().jsonpCallbackParam)) this.getModel().jsonpCallbackParam(e);
		
		return false;
	},
	
	/**
	Nimmt das Event "setRequestType" entgegen und f�hrt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetRequestType
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	handleSetRequestType: function(e) {
		if (this.isMethodExists(this.getModel().setRequestType)) this.getModel().setRequestType(e);
		
		return false;
	},
	
	/**
	Nimmt das Event "setContentType" entgegen und f�hrt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleSetContentType
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	handleSetContentType: function(e) {
		if (this.isMethodExists(this.getModel().setContentType)) this.getModel().setContentType(e);
		
		return false;
	},
	
	/**
	Nimmt das Event "exec" entgegen und f�hrt sofern diese existiert, eine entsprechende Handler-Methode im Model aus.
	
	@method handleExec
	@param {Object} e Eventdaten des aktuell ausgef�hrten Event.
	@return {Object} Instanz des Model der Komponente.
	**/
	handleExec: function(e) {
		if (this.isMethodExists(this.getModel().exec)) this.getModel().exec(e);
		
		return false;
	}
	
};
