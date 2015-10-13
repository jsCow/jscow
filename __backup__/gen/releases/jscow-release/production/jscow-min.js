/* jscow - Javascript Component Framework - Mario Linz - http://www.jscow.de */
/*
jsCow - JavaScript Library
http://www.gelight-tec.de/

Copyright 2011, Mario Linz
http://www.gelight-tec.de/gui/license
Date: Feb 21 21:00:00 2011
 */
 
/**
Basis Klassen des jsCow-Framework.

@class jsCow
@constructor 
*/
jsCow = (function() {
	
	var jsCowBase = function() {
		/*
		 @description default core setup variables
		 */
		this.config = {
		
			version: '1.0',
			
			url: {
				
				/* base url */
				base: '',
				
				/* path of template files */
				tpl: '',
				
				/* path of css files */
				css: '',
				
				/* path of ressources */
				res: ''
				
			},
			
			zIndex: 100000
			
		};
		
		/**
		Liste aller im Framework registrierten Applikationen.

		@property applications
		@type Object
		@default "{}"
		**/
		this.applications = {};

		/**
		Liste aller im Framework registrierten Komponenten.
		
		@property componentsObjectList
		@type Object
		@default "{}"
		**/
		this.componentsObjectList = [];
		
		/**
		Objekt in dem die einzelnen Komponenten-Klassen abgelegt werden k&ouml;nnen.
		
		@property res
		@type Object
		@default "{
			core : {
				mvc: {}
			},
			components : {},
			model : {},
			view : {},
			controller : {}
		}"
		@example
			jsCow.res.components.button = function() { ... }
			jsCow.res.components.button.prototype = { 
				... 
			}
			
			jsCow.res.model.button = function() { ... }
			jsCow.res.model.button.prototype = { 
				... 
			}
			
			jsCow.res.view.button = function() { ... }
			jsCow.res.view.button.prototype = { 
				... 
			}
			
			jsCow.res.controller.button = function() { ... }
			jsCow.res.controller.button.prototype = { 
				... 
			}
		**/
		this.res = {
			core : {
				mvc: {}
			},
			components : {},
			model : {},
			view : {},
			controller : {}
		};
		
		this.globalEvents = {};
		this.globalEventsManager = {};
		this.events = {};
		
		this.cache = {};
		
	};
	
	jsCowBase.prototype = {
		
		/**
		&Uuml;ber diese Methode k&ouml;nnen beliebige Konfigurationen direkt im Framework abgelegt werden.
		
		@method setup
		@param {Object} config Objekt mit allen Parametern.
		@return {Object} Referenz auf das das Framework-Object selbst.
		@chainable
		**/
		setup: function(config) {
			this.config = $.extend(this.config, config);
			
			return this;
		},
		
		/**
		Gibt eine spezifische Konfiguration zur&uuml;ck. 
		Wird kein Parameter angegeben, wird die gesamte Konfiguration zur&uuml;ckgegeben.
		
		@method getSetup
		@param {Object} param Objekt, welches abgelegt wurde.
		@return {Object} Referenz auf das das Framework-Object selbst.
		@chainable
		**/
		getSetup: function(param) {
			if (param == undefined) {
				return this.config;
			}else{
				if(this.config[param]) 
					return this.config[param];
				else
					return false;
			}
			
			return this;
		},
		
		setInstanceOfEvents: function(instance) {
			this.globalEvents = instance;
			
			return this;
		},
		
		getInstanceOfEvents: function() {
			return this.globalEvents;
		},
		
		setInstanceOfEventsManager: function(instance) {
			this.globalEventsManager = instance;
			
			return this;
		}, 
		
		getInstanceOfEventsManager: function() {
			return this.globalEventsManager;
		},
		
		/**
		Gibt den n&auml;chst h&ouml;heren z-Index als Zahl zur&uuml;ck.
		
		@method getNextZIndex
		@return {Int} H&ouml;chsten z-Index als Zahl.
		**/
		getNextZIndex: function() {
			this.config.zIndex++;
			return this.config.zIndex;
		},
		
		/**
		Speichert einen beliebigen Wert in einer Cache-Liste.
		
		@method setCache
		@param {String} index Index, unter welchem der Wert gespeichert werden soll.
		@param {Object} cache Wert, welcher gespeichert werden soll.
		@return {Object} Referenz auf das das Framework-Object selbst.
		@chainable
		**/
		setCache: function(index, cache) {
			if (this.cache[index] == undefined) this.cache[index] = false;
			this.cache[index] = cache;
			
			return this;
		},

		/**
		Gibt einen Wert aus der Cache-Liste zur&uuml;ck. Wird kein Parametert angegeben, so wird die gesamte Liste zur&uuml;ck gegeben.
		
		@method getCache
		@param {String} index Index, unter welchem der Wert gespeichert wurde.
		@return {Object} Referenz auf das das Framework-Object selbst.
		@chainable
		**/
		getCache: function(index) {
			if (!index)
				return this.cache;
			else if (this.cache[index]) 
				return this.cache[index];
				
			return false;
		},
		
		/**
		L&ouml;scht einen existierenden Wert aus der Cache-Liste.
		
		@method removeCache
		@param {String} index Index, unter welchem der Wert gespeichert wurde.
		@return {Object} Referenz auf das das Framework-Object selbst.
		@chainable
		**/
		removeCache: function(index) {
			delete this.cache[index];
			
			return this;
		},
		
		/**
		L&ouml;scht eine spezifische Komponente aus der globalen Komponenten-Liste von jsCow.
		Hierbei wird automatisch die Methode .del() der jeweiligen Komponente aufgerufen.
		
		@method del
		@param {Object} cmp Referenz auf die Instanz der zu l&ouml;schenden Komponente.
		@return {Object} Referenz auf das das Framework-Object selbst.
		@chainable
		**/
		del: function(cmp) {
			switch (cmp.getType()) {
				
				case "app":
					var list = this.applications.config.apps;
					$.each(list, function(i,app) {
						if (app != undefined && app.getID() == cmp.getID()) {
							
							$.each(app.getChildren(), function(i,c) {
								if (c != undefined) c.del();
							});
							
							list.splice(i,1);
						}
					});
				break;
				
				case "cmp":
					var list = this.componentsObjectList;
					$.each(list, function(i,c) {
						if (c != undefined && c.getID() == cmp.getID()) {
							c.getView().removeAll();
							list.splice(i,1);
						}
					});
				break;
				
			}
			
			return this;
		}
		
	};
	
	return new jsCowBase();
	
})();

/*
 jsCow.globalEvents - jsCow globalEvents extention - JavaScript Library
 http://www.gelight-tec.de/
 *
 Copyright 2011, Mario Linz
 http://www.gelight-tec.de/gui/license
 *
 Date: May 18 22:39:00 2011
 */
 
/**
Klasse der globalen Events.

@class globalEvents
@constructor 
*/
var globalEvents = function() {
	 
	/**
	Liste aller registrierten globalen Events.
	
	@property eventList
	@type Object
	@default "[]"
	**/
	this.eventList = [];
	
};
globalEvents.prototype = {
	
	register: function (event, object) {
		if (this.eventList[event] == undefined) this.eventList[event] = [];
		
		this.eventList[event].push({
			object: object,
			method: event
		});
		
	}, 
	
	unregister: function(event, object) {
		if (this.eventList[event]) {
			$.each(this.eventList[event], function(i,evt) {
				if (this.eventList[event][i].getID() == object.getID()) {
					this.eventList[event][i].slice(i,1);
				}
			});
		}
	},
	
	getHandleName: function(event) {
		return 'handle'+event[0].toUpperCase()+event.substr(1,event.length-1); // e.g. string 'event' to 'handleEvent'
	},
	
	trigger: function (event, data, list) {
		
		var self = this;
		var noEventBubbling = true;
		
		var objList = [];
		if (typeof list == 'object') objList.push(list);
		if(list instanceof Array) objList = list;
		
		if (list == undefined) var noEventBubbling = false;
		
		// No event bubbling - default
		if(noEventBubbling) {
			
			$.each(objList, function(i, obj) {
				
				var type = obj.getType();
				
				if (type) {
					switch (type) {
						case "app":
							
							var method = this.getHandleName(event);
							if (typeof obj[method] == 'function') {
								obj[method]({ 
									data: data 
								});
							}
							
						break;
						case "cmp":
							
							var cntrList = obj.getController().getControllerList();
							$.each(cntrList, (function(self) {
								return function (i, c) {
									
									var method = self.getHandleName(event);
									if (typeof c[method] == 'function') {
										c[method]({ 
											data: data 
										});
									}
									
								}
							})(self));
							
						break;
					}
				}
					
			});
			
		} 
		// No explicit event object
		else if (!noEventBubbling) {
			
			if (this.eventList[event] != undefined) {	
				$.each(this.eventList[event], (function(self) {
					return function (i, cmp) {
						
						self.trigger(cmp.method, data, cmp.object);
						
					}
				})(this));
			}
			
		}
		
		return this;
	},
	
	/**
	Pr&uuml;ft, ob ein Listener f&uuml;r ein spezifisches Event existiert.
	
	@method exists
	@param {String} event Name des Events.
	@return true | false
	**/
	exists: function(event) {
		
		if (this.eventList[event])
			return true
		else
			return false;
		
	}
	
};
jsCow.setInstanceOfEvents(new globalEvents());

/*
 jsCow.events - jsCow events extention - JavaScript Library
 http://www.gelight-tec.de/
 *
 Copyright 2011, Mario Linz
 http://www.gelight-tec.de/gui/license
 *
 Date: May 18 22:39:00 2011
 */

/**
Klasse der Standard-Events.

@class events
@constructor 
*/
jsCow.events = function() {
	
	/**
	Liste aller registrierten globalen Events.
	
	@property eventList
	@type Object
	@default "[]"
	**/
	this.eventList = [];

	/**
	Referenz auf die der Event-Instanz &uuml;bergeordneten Komponente.
	
	@property parent
	@type Object
	@default "false"
	**/
	this.parent = false;
	
}
jsCow.events.prototype = {
	
	setParent: function(parent) {
		this.parent = parent;
		
		return this;
	},

	getParent: function() {
		return this.parent;
	},
	
	/**
	Pr&uuml;ft, ob ein Listener auf ein spezifisches Event existiert.
	
	@method isEventExists
	@param {String} event Name des Events.
	@return true | false
	**/
	isEventExists: function(event) {
		if (this.eventList[event] != undefined) 
			return true;
		else
			return false;
	},
	
	/**
	Registriert einen Listener auf ein spezifisches Event einer Komponente.
	
	@method register
	@param {String} event Name des Events.
	@param {Object} sender Referenz auf die Komponente, f&uuml;r die das Event ausgef&uuml;hrt werden soll.
	@param {Function} handler Event-Handler, der ausgef&uuml;hrt werden soll.
	**/
	register: function(event, sender, handler) {
		
		if (sender == undefined) sender = false;
		if (handler == undefined) handler = false;
		
		if (event != undefined && sender) {
			if (this.eventList[event] == undefined) this.eventList[event] = Array();
			
			this.eventList[event].push({
				event: event,
				sender: sender,
				handler: handler
			});
		}
		
		return this;
	},

	/**
	L&ouml;st ein spezifisches Event aus und &uuml;bergibt die entsprechenden Event-Parameter.
	
	@method trigger
	@param {String} event Name des Events.
	@param {Object} data Objekt mit den Event-Daten.
	**/
	trigger: function(event, data) {
		
		var triggerReturnState = [];
		
		if (this.eventList[event] != undefined) {
			
			for (var i=0; i<this.eventList[event].length; i++) {
				var e = this.eventList[event][i];
				
				if (e.handler != undefined && typeof e.handler == "function") {
					var listenerReturnState = e.handler.apply(e.sender, [{
						event: e.event,
						sender: e.sender,
						handler: e.handler,
						data: data 
					}]);
					if (listenerReturnState == undefined || listenerReturnState === true) {
						triggerReturnState.push(true);
					}else{
						triggerReturnState.push(false);
					}
					
				}
				
				if (typeof e.handler == "string") {
					e.sender.globalEvents.trigger(e.handler, data, e.sender);
					triggerReturnState.push(true);
				}
				
			}
			
		}
		
		if (!triggerReturnState.length) {
			
			return true;
			
		}else{
			
			for (var i=0; i<triggerReturnState.length; i++) {
				if (triggerReturnState[i] === false) {
					return false;
				}
			};
			
			return true;
		}
		
	}
	
}

/*
 jsCow.globalEventsManager - jsCow globalEventsManager extention - JavaScript Library
 http://www.gelight-tec.de/
 Copyright 2011, Mario Linz
 http://www.gelight-tec.de/gui/license
 Date: Nov 25 00:39:00 2011
*/

var globalEventsManager = function() {

	this.parent = false;
	this.globalEventsReference = false;
	
};
globalEventsManager.prototype = {
	
	/**
	Registriert einen Listener auf ein spezifisches globales Event f&uuml;r eine Komponente.
	
	@method register
	@for globalEvents
	@param {String} event Name des Events.
	@param {Object} object Referenz auf die entsprechende Komponente.
	**/
	register: function (event, object) {
		this.globalEventsReference.register(event, object);
	}, 
	
	/**
	Entfernt einen Listener auf ein spezifisches globales Event einer spezifischen Komponente.
	
	@method unregister
	@param {String} event Name des Events.
	@param {Object} object Referenz auf die entsprechende Komponente.
	**/
	unregister: function(event, object) {
		this.globalEventsReference.unregister(event, object);
	},
	
	/**
	L&ouml;st ein spezifisches Event aus.
	
	@method trigger
	@param {String} event Name des Events.
	@param {Object} data Event-Parameter, die &uuml;bergeben werden.
	@param {Object} obj Referenz auf eine entsprechende Komponente oder einer Liste an Komponenten.
	**/
	trigger: function (event, data, obj) {
		
		// Set reference to sender component into event-data object.
		data.sender = this.getParent();
		
		this.globalEventsReference.trigger(event, data, obj);
		
		return this;
	},

	/**
	L&ouml;st ein globales BubbleUp-Event aus einer Komponente herraus aus.
	
	@method bubbleUp
	@param {String} event Name des Events.
	@param {Object} data Event-Parameter, die &uuml;bergeben werden.
	**/
	bubbleUp: function (event, data) {
		// trigger event in current component
		var bubble = this.bubbleTrigger(event, data);
		
		// Next Event bubbling
		if (bubble) {
			if (this.getParent().config.parent) { 
				this.getParent().config.parent.globalEvents.bubbleUp(event, data);
			}
		}
		
	},

	/**
	L&ouml;st ein globales BubbleDown-Event aus einer Komponente herraus aus.
	
	@method bubbleDown
	@param {String} event Name des Events.
	@param {Object} data Event-Parameter, die &uuml;bergeben werden.
	**/
	bubbleDown: function (event, data) {
		
		// trigger event in current component
		var bubble = this.bubbleTrigger(event, data);
		
		// Next Event bubbling - down
		if (bubble) {
			if (this.getParent().getChildren()) {
				var children = this.getParent().getChildren();
				$.each(children, (function(self) {
					return function(i,c) {
						
						if (c != undefined) {
							if (c.getType() == 'cmp') {
								if (c.getModel().isEnabled(true) || event == 'delete') c.globalEvents.bubbleDown(event, data);
							}
							if (c.getType() == 'app') {
								c.globalEvents.bubbleDown(event, data);
							}
						}
						
					}
				})(this));
			}
		}
		
	},

	/**
	L&ouml;st ein globales BubbleBoth-Event aus einer Komponente herraus aus.
	
	@method bubbleBoth
	@param {String} event Name des Events.
	@param {Object} data Event-Parameter, die &uuml;bergeben werden.
	**/
	bubbleBoth: function (event, data) {
		
		// trigger event in current component
		var bubble = this.bubbleTrigger(event, data);
		
		if (bubble) {
			
			// Next Event bubbling - up
			this.bubbleUp(event, data);
			
			// Next Event bubbling - down
			this.bubbleDown(event, data);
			
		}
		
	},
	
	bubbleTrigger: function (event, data) {
		var bubble = true;
		
		// trigger event in current component
		switch (this.getParent().getType()) {
			case "app":
				
				var method = this.globalEventsReference.getHandleName(event);
				if (typeof this.getParent()[method] == 'function') {
					if (!this.getParent()[method]({data: data})) bubble = false;
				}
				
			break;
			case "cmp":
				var cntrList = this.getParent().getController().getControllerList();
				
				$.each(cntrList, (function(self) {
					return function (i, c) {
						var method = self.globalEventsReference.getHandleName(event);
						
						if (typeof c[method] == 'function') {
							if (!c[method]({data: data})) bubble = false;
						}
					}
				})(this));
				
			break;
		}
		
		return bubble;
		
	},
	
	setParent: function(parent) {
		this.parent = parent;
	},

	getParent: function() {
		return this.parent;
	},
	
	setEventsReference: function(globalEvents) {
		this.globalEventsReference = globalEvents;
	}
	
}
jsCow.setInstanceOfEventsManager(new globalEventsManager());

/*
 jsCow.res.view - jsCow extention - JavaScript Library
 http://www.gelight-tec.de/
 Copyright 2011, Mario Linz
 http://www.gelight-tec.de/gui/license
 Date: April 04 22:00:00 2011
 */

/**
Objektstuktur des View-Manager mit allen grundlegenden Methoden.

@class viewHandler
@constructor 
*/
jsCow.res.core.mvc.viewHandler = function() {
	
	/**
	Liste aller vorhandenen Views einer Komponente.

	@property viewList
	@type Array
	@default "[]"
	**/
	this.viewList = [];
	
};
jsCow.res.core.mvc.viewHandler.prototype = {
	
	init: function(cfg) {
		var cfg = cfg;
		var self = this;
		var viewList = this.getViewList();
		
		$.each(viewList, function(i, view) {
			if (!view.isInit) {
				if (view.dom != undefined && view.dom.main != undefined) {
					
					if (i==0 && self.getCmp().getPlaceholder()) {
						self.getCmp().getPlaceholder().replaceWith( view.dom.main );						
					}
					
					if (i>0) {
						viewList[i-1].dom.main.after( view.dom.main );
					}
					
				}
				
				view.init(cfg);
				
				// Set focus - event
				view.dom.main.click(function(e) {
					e.stopPropagation();
					$(".jscow-focus").removeClass("jscow-focus");
					view.getCmp().globalEvents.bubbleUp("setFocus", {});
				});
				
				view.isInit = true;
			}
		});
	},
	
	/**
	Gibt eine Liste aller vorhandenen Views einer Komponente zur&uuml;ck.
	
	@method getViewList
	@return {Object} Liste aller registrierten Views.
	**/
	getViewList: function() {
		return this.viewList;
	},
	
	/**
	Setzt den Default-View einer Komponente.
	
	@method setView
	@param {Object} v Referenz auf die im Framework registrierte View-Klasse.
	@return {Object} Gibt den registrierten View zur&uuml;ck.
	**/
	setView: function(v) {
		var length = this.getViewListLength();
		this.viewList[length] = new v;
		this.viewList[length].__cmp__ = this.getCmp();
		this.viewList[length].globalEvents = this.getCmp().globalEvents;
		
		$.extend(true, this.viewList[length],  {
			
			getCmp: function() {
				return this.__cmp__;
			},
			getMain: function() {
				return this.dom.main;
			},
			getContent: function() {
				if (this.dom.content)
					return this.dom.content;
				else
					return false;
			},
			appendToTarget: function() {
				this.dom.main.appendTo(this.getCmp().getTarget());
				
				return this;
			},
			appendToSamePos: function(target) {
				target.after(this.dom.main);
				
				return this;
			},
			getConfig: function(param) {
				if (param == undefined) {
					return this.config;
				}else{
					if(this.config[param]) 
						return this.config[param];
					else
						return false;
				}
			},
			getModelConfig: function(param) {
				if (param == undefined) {
					return this.getCmp().getModel().config;
				}else{
					if(this.getCmp().getModel().config[param]) 
						return this.getCmp().getModel().config[param];
					else
						return false;
				}
			}
			
		});
		
		return this.viewList[length];
		
	},
	
	/**
	F&uuml;gt einen weiteren View einer Komponente hinzu.
	
	@method add
	@param {Object} v Referenz auf die im Framework registrierte View-Klasse.
	@return {Object} Gibt den registrierten View zur&uuml;ck.
	**/
	add: function(v) {
		this.setView(v).appendToTarget();
		
		return this;
	},
	
	/**
	L&ouml;scht einen spezifischen View aus einer Komponente.
	
	@method del
	@param {Object} v Referenz auf die Instanz des zu l&ouml;schenden View.
	**/
	del: function(v) {
		
		var v = new v;
		var viewList = this.getViewList();
		
		$.each(viewList, function(i, view) {
			if (v.type == view.type) {
				if (view.dom.main != undefined) view.dom.main.remove();
				viewList.splice(i,1);
			}
		});
		
		delete v;
		
	},
	
	/**
	Ruft die Methode .update() f&uuml;r alle vorhandenen Views auf.
	
	@method update
	@param {Object} e Event-Parameter der Handler-Methode.
	**/
	update: function(e) {
		var viewList = this.getViewList();
		
		$.each(viewList, function(i, view) {
			if (typeof view.update == "function" ) view.update(e);
		});
		
	},
	
	/**
	Ruft eine spezifische Methode in allen vorhandenen Views einer Komponente auf.
	
	@method call
	@param {String} functionName Name der aufzurufenden Funktion.
	@param {Object} args Argumente mit der die Funktion aufgerufen wird.
	**/
	call: function(functionName, args) {
		
		if (arguments == undefined) {
			var args = {data: {}};
		}else if (arguments.data == undefined) {
			var args = {data: args};
		}
		
		var viewList = this.getViewList();
		
		$.each(viewList, function(i, view) {
			if (typeof view[functionName] == "function" ) view[functionName](args);
		});
		
	},
	
	/**
	Pr&uuml;ft, ob eine Methode im View vorhanden ist und ruft diese mit den angegebenen Parametern auf.
	
	@method isMethodExistsExec
	@param {String} functionName Name der Funktion.
	@param {Object} e Argumente mit der die Funktion aufgerufen wird.
	**/
	isMethodExistsExec: function(method, e) {
		var e = e;
		var viewList = this.getViewList();
		
		$.each(viewList, function(i, view) {
			if (typeof view[method] == "function" ) view[method](e);
		});
		
	},
	
	/**
	Gibt die Anzahl der vorhandenen Views einer Komponente zur&uuml;ck.
	
	@method getViewListLength
	@return {Int} Anzahl der registrierten Views.
	**/
	getViewListLength: function() {
		return this.viewList.length;
	},
	
	/**
	Gibt den inneren Container (jQuery) der aktuellen Komponente zur&uuml;ck.
	
	@method getDomContent
	@param {Object} index Index eines spezifischen DOM-Elements.
	@return {Int} Inneren Container (jQuery) der aktuellen Komponente
	**/
	getDomContent: function(index) {
		
		if (index == undefined) var index = 0; else var index = index;
		
		var self = this;
		var viewList = this.getViewList();
		var content = false;
		
		$.each(viewList, function(i, view) {
			if (view.dom != undefined && view.dom.content != undefined && typeof (view.dom.content) === "object" && (view.dom.content instanceof Array)) {
				if (view.dom.content[index]) content = view.dom.content[index];
			}else if (view.dom != undefined && view.dom.content != undefined) {
				content = view.dom.content;
			}else{
				return self.getDomMain(index);
			}
		});
		
		return content;
	},
	
	/**
	Gibt den &auml;u&szlig;eren Container (jQuery) der aktuellen Komponente zur&uuml;ck.
	
	@method getDomMain
	@param {Object} index Index eines spezifischen DOM-Elements.
	@return {Int} &Auml;u&szlig;eren Container (jQuery) der aktuellen Komponente
	**/
	getDomMain: function(index) {
		if (index == undefined) var index = 0; else var index = index;
		
		var self = this;
		var viewList = this.getViewList();
		var main = false;
		
		$.each(viewList, function(i, view) {
			if (view.dom != undefined && view.dom.main != undefined && typeof (view.dom.main) === "object" && (view.dom.main instanceof Array)) {
				if (view.dom.main[index]) main = view.dom.main[index];
			}else if (view.dom != undefined && view.dom.main != undefined) {
				main = view.dom.main;
			}else{
				main = false;
			}
		});
		
		return main;
	},
	
	/**
	Gibt eine Referenz auf die Instanz der aktuellen Komponente zur&uuml;ck.
	
	@method getCmp
	@return {Object} Referenz auf die Instanz der aktuellen Komponente.
	**/
	getCmp: function() {
		return this.__cmp__;
	},
	
	/**
	F&uuml;gt den &auml;u&szlig;eren Container der Komponente in ein neues DOM-Target Element ein.
	
	@method appendTo
	@param {Object} target jQuery DOM-Element.
	@return {Object} Referenz auf die Instanz der aktuellen Komponente.
	**/
	appendTo: function(target) {
		
		var viewList = this.getViewList();
		$.each(viewList, function(i, view) {
			
			view.dom.main.appendTo(target);
			
		});
		
		return this;
	},
	
	/**
	Entfernt alle Views einer Komponente.
	
	@method removeAll
	@return {Object} Referenz auf die Instanz der aktuellen Komponente.
	**/
	removeAll: function() {
		var viewList = this.getViewList();
		$.each(viewList, function(i, view) {
			if (view.dom.main != undefined) view.dom.main.remove();
		});
		
		return this.getCmp();
	},
	
	/**
	Tauscht einen existierenden View mit einem Anderen.
	
	@method replace
	@param {Object} o Instanz des View, welcher ersetzt werden soll.
	@param {Object} n Referenz auf die im Framework registrierte View-Klasse.
	**/
	replace: function(o, n) {
		
		var oV = new o;
		var _this = this;
		
		var viewList = this.getViewList();
		$.each(viewList, function(i, view) {
			if (view.type == oV.type) {
				_this.setView(n).appendToSamePos(view.getMain());
				_this.del(o);
			}
		});
		
	},
	
	/**
	Setzt einen CSS-Style f&uuml;r den &auml;u&szlig;eren Container der Komponente.
	
	@method setMainStyle
	@param {String} style CSS Styles
	**/
	setMainStyle: function(style) {
		var mainStyle = style;
		var _this = this;
		
		var viewList = this.getViewList();
		
		
		$.each(viewList, function(i, view) {
			if (typeof mainStyle == "object") {
				view.getMain().css(mainStyle);
			}else if (typeof mainStyle == "string") {
				view.getMain().addClass(mainStyle);
			}
		});
		
	}

};

/*
 jsCow.res.controller - jsCow extention - JavaScript Library
 http://www.gelight-tec.de/
 Copyright 2011, Mario Linz
 http://www.gelight-tec.de/gui/license
 Date: April 04 22:00:00 2011
 */

/**
Objektstuktur des Controller-Manager mit allen grundlegenden Methoden.

@class controllerHandler
@constructor 
*/
jsCow.res.core.mvc.controllerHandler = function() {
	
	/**
	Liste aller vorhandenen Controller einer Komponente.

	@property controllerList
	@type Array
	@default "[]"
	**/
	this.controllerList = [];
	
};
jsCow.res.core.mvc.controllerHandler.prototype = {

	/**
	Gibt eine liste aller vorhandenen Controller einer Komponente zur&uuml;ck.
	
	@method getControllerList
	@return {Object} Liste aller registrierten Controller.
	**/
	getControllerList: function() {
		return this.controllerList;
	},
	
	/**
	Setzt den Default-Controller einer Komponente.
	
	@method setController
	@param {Object} c Referenz auf die im Framework registrierte Controller-Klasse.
	@return {Object} Gibt den registrierten Controller zur&uuml;ck.
	@chainable
	**/
	setController: function(c) {
		
		/**
		Objektstuktur eines Controller mit allen grundlegenden Methoden.
		
		@class controller
		@constructor 
		*/
		$.extend(true, c.prototype,  {
			
			/**
			Gibt eine Referenz auf die Instanz der aktuellen Komponente zur&uuml;ck.
			
			@method getCmp
			@return {Object} Referenz auf die aktuelle Komponente.
			**/
			getCmp: function() {
				return this.__cmp__;
			},
			
			/**
			Gibt eine Referenz auf das Model zur&uuml;ck.
			
			@method getModel
			**/
			getModel: function() {
				return this.__model__;
			},
			
			/**
			Gibt eine Referenz auf den View-Manager der Komponente zur&uuml;ck.
			
			@method getView
			**/
			getView: function() {
				return this.__view__;
			},
			
			/**
			Pr&uuml;ft, ob eine Methode im Model der Komponente existiert.
			
			@method isMethodExists
			@return true | false
			**/
			isMethodExists: function(method) {
				if (typeof method == "function" ) return true; else return false;
			},
			
			handleViewInit: function(e) {
				this.getView().init(e);
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die Update-Methode aller Views der Komponente ausgef&uuml;hrt wird.
			
			@method handleViewUpdate
			@return {Boolean} true
			**/
			handleViewUpdate: function(e) {
				this.getView().update(e);
				
				return true;
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die Model-Methode .setGlobalDisabled() der Komponente ausgef&uuml;hrt wird.
			
			@method handleGlobalDisabled
			@return {Boolean} true
			**/
			handleGlobalDisabled: function(e) {
				if (this.isMethodExists(this.getModel().setGlobalDisabled)) this.getModel().setGlobalDisabled(e);
				
				return true;
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die Model-Methode .disabled() der Komponente ausgef&uuml;hrt wird.
			
			@method handleDisabled
			@return {Boolean} true
			**/
			handleDisabled: function(e) {
				if (this.isMethodExists(this.getModel().disabled)) this.getModel().disabled(e);
				
				return true;
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die Model-Methode .enabled() der Komponente ausgef&uuml;hrt wird.
			
			@method handleEnabled
			@return {Boolean} true
			**/
			handleEnabled: function(e) {
				if (this.isMethodExists(this.getModel().enabled)) this.getModel().enabled(e);
				
				return true;
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die aktuelle Komponente gel&ouml;scht wird.
			
			@method handleDelete
			@return {Boolean} true
			**/
			handleDelete: function(e) {
				jsCow.del(this.getCmp());
				
				return true;
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die Model-Methode .hide() der Komponente ausgef&uuml;hrt wird.
			
			@method handleHide
			@return {Boolean} true
			**/
			handleHide: function(e) {
				if (this.isMethodExists(this.getModel().hide)) this.getModel().hide(e);
				
				return true;
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die Model-Methode .show() der Komponente ausgef&uuml;hrt wird.
			
			@method handleShow
			@return {Boolean} true
			**/
			handleShow: function(e) {
				if (this.isMethodExists(this.getModel().show)) this.getModel().show(e);
				
				return true;
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die Model-Methode .setWidth() der Komponente ausgef&uuml;hrt wird.
			
			@method handleSetWidth
			@return {Boolean} true
			**/
			handleSetWidth: function(e) {
				if (this.isMethodExists(this.getModel().setWidth)) this.getModel().setWidth(e);
				
				return true;
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die Model-Methode .setHeight() der Komponente ausgef&uuml;hrt wird.
			
			@method handleSetHeight
			@return {Boolean} true
			**/
			handleSetHeight: function(e) {
				if (this.isMethodExists(this.getModel().setHeight)) this.getModel().setHeight(e);
				
				return true;
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die Model-Methode .setInnerWidth() der Komponente ausgef&uuml;hrt wird.
			
			@method handleSetInnerWidth
			@return {Boolean} true
			**/
			handleSetInnerWidth: function(e) {
				if (this.isMethodExists(this.getModel().setInnerWidth)) this.getModel().setInnerWidth(e);
				
				return true;
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die Model-Methode .setInnerHeight() der Komponente ausgef&uuml;hrt wird.
			
			@method handleSetInnerHeight
			@return {Boolean} true
			**/
			handleSetInnerHeight: function(e) {
				if (this.isMethodExists(this.getModel().setInnerHeight)) this.getModel().setInnerHeight(e);
				
				return true;
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die Model-Methode .setOuterWidth() der Komponente ausgef&uuml;hrt wird.
			
			@method handleSetOuterWidth
			@return {Boolean} true
			**/
			handleSetOuterWidth: function(e) {
				if (this.isMethodExists(this.getModel().setOuterWidth)) this.getModel().setOuterWidth(e);
				
				return true;
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die Model-Methode .setOuterHeight() der Komponente ausgef&uuml;hrt wird.
			
			@method handleSetOuterHeight
			@return {Boolean} true
			**/
			handleSetOuterHeight: function(e) {
				if (this.isMethodExists(this.getModel().setOuterHeight)) this.getModel().setOuterHeight(e);
				
				return true;
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die Model-Methode .update() der Komponente ausgef&uuml;hrt wird.
			
			@method handleUpdate
			@return {Boolean} true
			**/
			handleUpdate: function(e) {
				if (this.isMethodExists(this.getModel().update)) this.getModel().update(e);
				
				return true;
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die Model-Methode .setPos() der Komponente ausgef&uuml;hrt wird.
			
			@method handleSetPos
			@return {Boolean} true
			**/
			handleSetPos: function(e) {
				if (this.isMethodExists(this.getModel().setPos)) this.getModel().setPos(e);
				
				return true;
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die Model-Methode .setMainStyle() der Komponente ausgef&uuml;hrt wird.
			
			@method handleSetMainStyle
			@return {Boolean} true
			**/
			handleSetMainStyle: function(e) {
				if (this.isMethodExists(this.getModel().setMainStyle)) this.getModel().setMainStyle(e);
				
				return true;
			},
			
			/**
			Event-Handler Methode, &uuml;ber die die Model-Methode .setFocus() der Komponente ausgef&uuml;hrt wird.
			
			@method handleSetFocus
			@return {Boolean} true
			**/
			handleSetFocus: function(e) {
				if (this.isMethodExists(this.getModel().setFocus)) this.getModel().setFocus(e);
				
				return true;
			}
			
		});

		var length = this.getControllerListLength();
		this.controllerList[length] = new c;
		this.controllerList[length].__view__ = this.getCmp().getView();
		this.controllerList[length].__model__ = this.getCmp().getModel();
		this.controllerList[length].__cmp__ = this.getCmp();
		this.controllerList[length].init();
		
		return this;
	},
	
	/**
	Gibt die Anzahl der angelegten Controller einer Komponente zur&uuml;ck.
	
	@method getControllerListLength
	@for controllerHandler
	@return {Object} Anzahl der registrierten Controller zur&uuml;ck.
	**/
	getControllerListLength: function() {
		return this.controllerList.length;
	},
	
	/**
	Gibt die Instanz der aktuellen Komponente zur&uuml;ck.
	
	@method getCmp
	@return {Object} Instanz der aktuellen Komponente.
	**/
	getCmp: function() {
		return this.__cmp__;
	},
	
	/**
	Entfernt einen spezifischen Controller einer Komponente.
	
	@method del
	@param {Object} c Referenz auf die Instanz des Controller.
	**/
	del: function(c) {
		
		var c = new c;
		var controllerList = this.getControllerList();
		
		$.each(controllerList, function(i, controller) {
			if (c.type == controller.type) {
				controllerList.splice(i,1);
			}
		});
		
		delete c;
		
	},
	
	/**
	Tauscht einen existierenden Controller mit einem Anderen.
	
	@method replace
	@param {Object} o Instanz des Controller, welcher ersetzt werden soll.
	@param {Object} n Referenz auf die im Framework registrierte Controller-Klasse.
	**/
	replace: function(o, n) {
		
		var oC = new o;
		var _this = this;
		var controllerList = this.getControllerList();
		
		$.each(controllerList, function(i, controller) {
			if (controller.type == oC.type) {
				delete controllerList[i];
				controllerList.splice(i,1);
				
				_this.setController(n);
			}
		});
		
	}

};
/*
 * jsCow.application - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: Feb 21 21:00:00 2011
 */

/**
&Uuml;ber das Object "application" wird eine neue Instanz einer Applikation registriert oder erzeugt.

@class application
@constructor 
*/
var application = function() {
	
	this.config = {};
	this.config.apps = [];
	this.children = false;
	
};

application.prototype = {
	
	/**
	Registriert eine neue Applikation im Framework und gibt dessen Instanz als Object zur&uuml;ck.
	
	@method add
	@param {String} id ID der zu erstellenden Applikation.
	@return {Object} Instanz der neuen Applikation
	**/
	add: function(id) {

		if (!this.children) this.children = [];
		
		/**
		Objektstuktur einer Applikation mit all seinen Methoden.
		
		@class app
		@constructor 
		*/
		var app = function() {
			
			/**
			Konfiguration der Applikation.

			@property config
			@type Object
			@default "{}"
			**/
			this.config = {
				id: false
			};
			this.config.parent = false;
			
			/**
			Liste der Kind-Komponenten der Applikation.

			@property children
			@type Array
			@default "false"
			**/
			this.children = false;
			
			this.config.isInit = [];
			this.config.isShow = [];

			/**
			Liste der Kind-Komponenten der Applikation.
			
			@property config.type
			@type String
			@default "app"
			**/
			this.config.type = 'app';
			
			/**
			Objekt f&Uuml;r alle ben&ouml;tigten HTML-DOM Elemente der Komponente.
			
			@property dom
			@type Object
			@default "{}"
			**/
			this.config.dom = {};
			this.config.dom.content = $('body');
			
			this.config.layerindex = 0;
			
			this.config.initialEvent = false;
			
			/**
			Objekt aller Methoden, die die Applikation erweitert.
			
			@property extension
			@type Object
			@default "false"
			**/
			this.extension = false;
			
		}
		app.prototype = {

			/**
			Gibt die ID der aktuellen Applikation zur&uuml;ck.
			
			@method getID
			@return {String} Id der aktuellen Applikation.
			**/
			getID: function() {
				return this.config.id;
			},
			
			/**
			Setzt eine spezifische ID f&uuml;r die aktuelle Applikation.
			
			@method setID
			@param {String} id Name der ID.
			@return {Object} Referenz auf die Instanz der aktuellen Applikation.
			@chainable
			**/
			setID: function(id) {
				this.config.id = id;
				
				return this;
			},
			
			/**
			Setzt einen Wert in der Konfiguration der aktuellen Applikation.
			
			@method setConfig
			@param {Object|string|number|...} config Objekt mit allen Eigeschaften, die gespeichert werden sollen. Die 
			@return {Object} Referenz auf die Instanz der aktuellen Applikation.
			@chainable
			**/
			setConfig: function(config) {
				$.extend(true, this.config, config);
				
				return this;
			},
			
			get: function() {
				return this;
			},
			
			/**
			Gibt den Typ der aktuellen Aplikation zur&uuml;ck.
			
			@method getType
			@return {String} Name des Typs.
			**/
			getType: function() {
				return this.config.type;
			},
			
			/**
			Gibt eine Liste aller Kind-Komponenten der Applikation zur&uuml;ck.
			
			@method getChildren
			@return {Array} Liste aller Kind-Komponenten.
			**/
			getChildren: function() {
				return this.children;
			},
			
			/**
			Gibt das DOM-Target der aktuellen Applikation zur&uuml;ck.
			
			@method getTarget
			@return {jQuery} Referenz auf das aktuelle jQuery-DOM-Objekt der aktuellen Applikation.
			**/
			getTarget: function() {
				return this.config.target;
			},
			
			/**
			Gibt die Eltern-Komponente der aktuellen Applikation zur&uuml;ck. Eine solche Komponente kann auch eine ganz normale Komponente sein.
			
			@method getParent
			@return {Object} Referenz auf die &uuml;bergeordnete Komponente.
			**/
			getParent: function() {
				return this.config.parent;
			},
			
			/**
			Gibt die Breite der &uuml;bergeordneten Komponente der aktuellen Applikation zur&uuml;ck.
			Ist keine Komponente vorhanden, wird die Breite des DOM-Target Elements zur&uuml;ckgegeben.
			
			@method getMainWidth
			@return {Int} Breite in Pixel.
			**/
			getMainWidth: function() {
				
				var parent = this.getParent();
				if (parent) {
					var width = this.getParent().getMainWidth();
				}else{
					var width = this.getTarget().innerWidth();
				}
				
				return width;
			},
			
			/**
			Gibt die innere Breite der &uuml;bergeordneten Komponente der aktuellen Applikation zur&uuml;ck.
			Ist keine Komponente vorhanden, wird die Breite des DOM-Target Elements zur&uuml;ckgegeben.
			
			@method getInnerWidth
			@return {Int} Breite in Pixel.
			**/
			getInnerWidth: function() {
				
				var parent = this.getParent();
				if (parent) {
					var width = this.getParent().getInnerWidth();
				}else{
					var width = this.getTarget().innerWidth();
				}
				
				return width;
			},
			
			/**
			Gibt die H&ouml;he der &uuml;bergeordneten Komponente der aktuellen Applikation zur&uuml;ck.
			Ist keine Komponente vorhanden, wird die H&ouml;he des DOM-Target Elements zur&uuml;ckgegeben.
			
			@method getMainHeight
			@return {Int} H&ouml;he in Pixel.
			**/
			getMainHeight: function() {
				
				var parent = this.getParent();
				if (parent) {
					var width = this.getParent().getMainHeight();
				}else{
					var width = this.getTarget().innerHeight();
				}
				
				return width;
			},
			
			/**
			Gibt die innere H&ouml;he der &uuml;bergeordneten Komponente der aktuellen Applikation zur&uuml;ck.
			Ist keine Komponente vorhanden, wird die H&ouml;he des DOM-Target Elements zur&uuml;ckgegeben.
			
			@method getInnerHeight
			@return {Int} H&ouml;he in Pixel.
			**/
			getInnerHeight: function() {
				
				var parent = this.getParent();
				if (parent) {
					var height = this.getParent().getInnerHeight();
				}else{
					var height = this.getTarget().innerHeight();
				}
				
				return height;
			},
			
			/**
			Gibt die &Auml;uﬂere Breite der &uuml;bergeordneten Komponente der aktuellen Applikation zur&uuml;ck.
			Ist keine Komponente vorhanden, wird die Breite des DOM-Target Elements zur&uuml;ckgegeben.
			
			@method getOuterWidth
			@return {Int} Breite in Pixel.
			**/
			getOuterWidth: function() {
				
				var parent = this.getParent();
				if (parent) {
					var width = this.getParent().getOuterWidth();
				}else{
					var width = this.getTarget().innerWidth();
				}
				
				return width;
			},
			
			/**
			Gibt die &Auml;uﬂere H&ouml;he der &uuml;bergeordneten Komponente der aktuellen Applikation zur&uuml;ck.
			Ist keine Komponente vorhanden, wird die H&ouml;he des DOM-Target Elements zur&uuml;ckgegeben.
			
			@method getOuterHeight
			@return {Int} H&ouml;he in Pixel.
			**/
			getOuterHeight: function() {
				
				var parent = this.getParent();
				if (parent) {
					var height = this.getParent().getOuterHeight();
				}else{
					var height = this.getTarget().innerHeight();
				}
				
				return height;
			},
			
			/**
			Setzt das DOM-Target, in der die aktuelle Applikation gerendert werden soll.
			
			@method setTarget
			@return {Object} Referenz der aktuellen Applikation.
			@chainable
			**/
			setTarget: function(target, ph) {
				this.config.target = target;
				this.config.dom.content = target;
				
				if (ph == undefined) var ph = false; else var ph = ph;
				
				// New target for application children and move its placeholder
				if (this.children.length) {
					$.each(this.children, function(i,child){
						if (ph) child.config.placeholder.appendTo(target);
						child.setTarget(target);
					});
				}
				
				return this;
			},
			
			/**
			Setzt eine Referenz auf die &uuml;bergeordnete Komponente aktuellen Applikation.
			
			@method setParent
			@return {Object} Referenz der aktuellen Applikation.
			@chainable
			**/
			setParent: function(parent) {
				this.config.parent = parent;
				
				return this;
			},

			setReadyToShow: function(c) {
				this.config.isInit.push(c);
				
				return this;
			},

			setShowComplete: function(c) {
				this.config.isShow.push(c);
				
				return this;
			},
			
			setEventsManager: function(globalEventsManager) {
				globalEventsManager.setParent(this);
				this.globalEvents = globalEventsManager;
				
			},
			
			/**
			F&uuml;gt der aktuellen Applikation eine Komponente als Kind-Komponente hinzu.
			
			@method add
			@param {Object} child Referenz auf Komponente.
			@return {Object} Referenz der aktuellen Applikation.
			@chainable
			**/
			add: function(child) {
				
				if (!this.children) this.children = [];
				if (!this.config.isInit) this.config.isInit = [];
				if (!this.config.isShow) this.config.isShow = [];
				
				var index = this.children.length;
				
				if (typeof child == 'object') {
					
					child.config.layerindex = index;
					child.setParent(this);
					if (this.getTarget() == undefined) this.setTarget(this.config.dom.content, true);
					child.setTarget(this.getTarget());
					
					// Create placeholder of child
					var placeholder = $('<div class="ph-'+index+' '+child.getID()+'"></div>');
					this.config.dom.content.append(placeholder);
					
					//child.config.placeholder = placeholder;
					child.setPlaceholder(placeholder);
					
					this.children[index] = child;
					
				}
				
				return this;
			},
			
			/**
			Initialisiert die aktuelle Applikation mit allen Komponenten-Instanzen darin.
			
			@method run
			**/
			run: function() {
				
				this.__init();
			},
			
			/**
			L&ouml;scht die gesamte Applikation.
			
			@method del
			**/
			del: function() {
				if (this.getParent() != undefined && this.getParent()) 
					this.getParent().deleteChild(this);
				
				this.globalEvents.bubbleDown("delete", {});
			},
			
			/**
			L&ouml;scht eine spezifische Kind-Komponenten innerhalb der aktuellen Applikation.
			
			@method deleteChild
			@param cmp Referenz auf die zu l&ouml;schende Komponente.
			@return {Object} Referenz der aktuellen Applikation.
			@chainable
			**/
			deleteChild: function(cmp) {
				
				var self = this;
				var list = this.children;
				
				if (list.length > 0) {
					$(list).each(function(i,c) {
						if (typeof c != 'undefined' && typeof cmp == 'object' && typeof cmp != 'undefined' && c.getID() == cmp.getID()) {
							self.children.splice(i,1);
							c.del();
						}
					});
				}
				
				return this;
			},
			
			/**
			L&ouml;scht alle Komponenten innerhalb der aktuellen Applikation.
			
			@method deleteChildren
			@return {Object} Referenz der aktuellen Applikation.
			@chainable
			**/
			deleteChildren: function() {
				
				var self = this;
				var list = this.children;
				
				if (list.length > 0) {
					$(list).each(function(i,c) {
						if (typeof c != 'undefined') {
							self.children.splice(i,1);
							c.del();
						}
					});
				}
				
				return this;
			},
			
			/**
			Verschiebt die aktuelle Applikation in ein neues DOM-Target Element.
			
			@method moveTo
			@return {Object} Referenz der aktuellen Applikation.
			@chainable
			**/
			moveTo: function(target) {
				
				if (target != undefined && typeof target == 'object') {
					
					var tar = target.getView().getDomContent();
					$.each(this.getChildren(), function(i,c) {
						c.getView().appendTo(tar);
					});
					
					this.setTarget(tar);
					
					if (this.getParent() != undefined && typeof this.getParent() == "objects") {
						this.getParent().deleteChildren(this);
					}
					
					this.setParent(target);
					
					target.children.push(this);
				}
				
				return this;
			},
			
			__init: function() {
				
				// init state - completed
				this.setReadyToShow(this);
				
				// Show methode of developer
				if (this.init) this.init();
				
				// Execute this show or init of childrens
				if (this.children.length) {
					var self = this;
					$.each(this.children, function(i, c) {
						c.setApp(self);
						c.__init();
					});
				}else{
					this.__show(true);
				};
				
			},
			
			__show: function(showNow) {
				
				// Set show state
				this.setShowComplete(this);
				
				// Execute show
				if (showNow || (this.config.isShow.length == this.children.length)) {
					
					// Show methode of developer
					if (this.show) this.show();		// User Method
				
					// Trigger initial application event
					this.globalEvents.bubbleDown('initialAppEvent', {})
					
				}
				
			},
			
			/**
			Erweitert die aktuelle Applikation und reichert Diese mit den definierten neuen Methoden an.
			
			@method extend
			@param {Object} method Objekt mit allen hinzuzuf&uuml;genden Methoden.
			@param {Boolean} root "true" - Erweiterung der Applikation als Extension. "false" - Erweiterung des Objekts der Applikation.
			Wird root als "true" definiert, so werden alle Methoden als Extension angelegt, ohne bestehende Standard-Methoden zu &uuml;berschreiben. 
			Muss eine neue Methode den gleichen Namen einer Standard-Methode haben, so kann Dies &uuml;ber eine solche Extension genutzt werden. 
			Innerhalb einer solchen Extension-Methode steht "this" im Scope der Haupt-Klasse der aktuellen Applikation.
			@return {Object} Referenz der aktuellen Applikation.
			@chainable
			**/
			extend: function(method, root) {
				
				if (root == undefined) {
					
					$.extend(true, this, method);
					
				}else{
					
					var _this = this;
					
					if (!this.extension) {
						
						var ext = function() {};
						
						var methodList = {};
						$.each(method, function(i, m) {
							
							methodList[i] = (function( _super, m, i ) {
								m._super = typeof _super[i] === 'function' ? _super[i] : function(){};
								return function() {
									m.apply( _super, arguments);
								};
							})( _this, m, i );
							
						});
						
						$.extend(true, ext.prototype, methodList);
						
						this.extension = new ext;
						
					}else{
						
						var methodList = {};
						$.each(method, function(i, m) {
							
							methodList[i] = (function( _super, m, i ) {
								m._super = typeof _super[i] === 'function' ? _super[i] : function(){};
								return function() {
									m.apply( _super, arguments);
								};
							})( _this, m, i );
							
						});
						$.extend(true, this.extension, methodList);
						
					}
				}
				
				return this;
			},
			
			handleDelete: function(e) {
				jsCow.del(this);
				
				return this;
			},
			
			/**
			Registriert ein neues Window-Event. (jQuery.bind())
			
			@method addWindowEvent
			@param {Function} evt Handler-Methode f&uuml;r Window Event &uuml;ber jQuery.bind().
			@return {Object} Referenz der aktuellen Applikation.
			@chainable
			**/
			addWindowEvent: function(evt) {
				$(window).bind(evt);
				
				return this;
			},
			
			__update: function(){},
			
			/**
			Gibt eine spezifische oder die vollst&Auml;ndige Konfiguration der Applikation zur&uuml;ck.
			
			@method getConfig
			@param {String} param Index des Konfigurations-Parameter.
			@return {Object} Referenz der aktuellen Applikation.
			**/
			getConfig: function(param) {
				if (param == undefined) {
					return this.getParent().config;
				}else{
					if(this.getParent().config[param]) 
						return this.getParent().config[param];
					else
						return false;
				}
			}
			
		}
		
		/** Create new instance of application and return this */
		var newApp = new app(id);
		var copyOfglobalEventsManager = $.extend(true, {}, jsCow.globalEventsManager);
		copyOfglobalEventsManager.setEventsReference(jsCow.globalEvents);
		newApp.setEventsManager(copyOfglobalEventsManager);
		
		this.config.apps.push(newApp);
		
		return newApp;
	},
	
	/**
	Gibt die Referenz auf eine existierende Instanz einer Applikation zur&uuml;ck.
	Existiert die Applikation nicht, so wird "false" zur&uuml;ck gegeben.

	@for application
	@method get
	@return {Object} Instanz der neuen Applikation
	**/
	get: function(id) {
		
		if (id) {
			
			var appObj = false;
			
			$.each( this.config.apps, function(i, app ) {
				if (app.getID() == id) {
					appObj = app;
					return false;
				}
			});
			
			return appObj;
			
		}else{
		
			return this.config.apps;
			
		}
		
	}
	
}

jsCow.applications = new application();
/*
 * jsCow.components - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: April 04 22:00:00 2011
 */

/**
&Uuml;ber das Object "component" kann eine neue Instanz einer registrierten Komponente geholt bzw. erzeugt werden.

@class component
@constructor 
*/
var component = function() {};
component.prototype = {
	
	/**
	Gibt eine neue Instanz einer im Framework registrierten Komponente zur&uuml;ck.
	Das Model, der View, sowie der Controller der entsprechenden Komponente werden mit Standard-Methoden angereichert.
	
	@method get
	@param {Object} c Referenz auf die im Framework registrierte Komponenten-Klasse.
	@return {Object} Referenz auf die Instanz der neuen Komponente
	**/
	get: function(c) {
		if (c != undefined && c.prototype != undefined) {
			
			/**
			Objektstuktur einer Komponente mit allen grundlegenden Methoden.
			
			@class cmp
			@constructor 
			*/
			
			/**
			Registrierte Controller der Komponente

			@property __controller__
			@type Object
			@default "false"
			**/
			c.prototype.__controller__ = false;
			
			/**
			Registrierte Views der Komponente

			@property __view__
			@type Object
			@default "false"
			**/
			c.prototype.__view__ = false;
			
			/**
			Registriertes Model der Komponente

			@property __model__
			@type Object
			@default "false"
			**/
			c.prototype.__model__ = false;
			
			/**
			Konfiguration der Komponente.

			@property config.
			@type Object
			@default "false"
			**/
			c.prototype.config = false;
			
			c.prototype.config.apps = false;
			
			/**
			Referenz auf die &uuml;bergeordnete Komponente.

			@property config.parent
			@type Object
			@default "false"
			**/
			c.prototype.config.parent = false;
			
			/**
			Objekt f&uuml;r alle ben&ouml;tigten HTML-DOM Elemente der Komponente.
			
			@property config.dom
			@type Object
			@default "false"
			**/
			c.prototype.config.dom = false;
			
			/**
			Typ der Komponente.

			@property type
			@type String
			@default "cmp"
			**/
			c.prototype.type = "cmp";
			c.prototype.config.layerindex = 0;
			c.prototype.config.layerindexCounter = false;
			c.prototype.config.isInit = false;
			c.prototype.config.execInit = false;
			c.prototype.config.isShow = false;
			c.prototype.config.placeholder = false;
			
			/**
			DOM-Target der Komponente.

			@property config.target
			@type Object
			@default "false"
			**/
			c.prototype.config.target = false;
			c.prototype.config.targetOriginal = false;
			
			/**
			Referenz auf die Applikation, der die Komponente zugeordnet ist.

			@property app
			@type Object
			@default "false"
			**/
			c.prototype.app = false;
			
			/**
			Liste aller Kind-Komponenten der aktuellen Komponente.

			@property children
			@type Array
			@default "false"
			**/
			c.prototype.children = false;
			
			/**
			Objekt aller Methoden, die die Komponente erweitert.
			
			@property extension
			@type Object
			@default "false"
			**/
			c.prototype.extension = false;
			
			// Extend component
			$.extend(true, c.prototype,  {
				
				/**
				F&uuml;gt eine neue Kind-Komponente der aktuellen Komponente hinzu.
				Die hinzuzuf&uuml;gende Komponente existiert in diesem Fall noch nicht als Instanz.
				
				@method add
				@param {Object} child Referenz auf die im Framework registrierte Komponenten-Klasse.
				@return {Object} child Referenz auf die aktuelle Komponente selbst.
				@chainable
				**/
				add: function(child) {
					
					var child = child;
					
					// Variables
					this.defineVariables();
					
					// Get layer index counter
					var index = this.config.layerindexCounter;
					
					// Create placeholder dom object (jQuery)
					var placeholder = this.getNewPlaceholder(index);
				
					// Append placeholder of child into self content container
					var target = this.getView().getDomContent();
					if (target) {
						target.append(placeholder); 
					}else{ 
						target = this.getTarget();
					}
					
					if (typeof child == 'object' && !child.config.execInit)	{
						
						child.config.layerindex = index;
						child.setPlaceholder(placeholder);
						
						child.app = this.app;
						child.setParent(this);
						child.setTarget(target);
						
						if (child.getType() == "cmp")
							this.children.push(child);
						else
							this.config.apps.push(child);
						
					}
					
					/*
					if (typeof child == 'string') {
						var self = this;
						
						// Split url to app
						var app = child.split('/');
						var app = app[app.length-1];
						var app = app.split('.');
						var app = app[0];
						
						this.config.placeholder = placeholder;
						
						var appPath = jsCow.config.url.applications;
						if (appPath.substr(appPath.length-1, 1) != "/") appPath = appPath + "/";
						
						$.ajax({
							url: appPath + child,
							dataType: 'script',
							error: function(jqXHR, textStatus, errorThrown) {
								console.debug(jqXHR, textStatus, errorThrown);
							},
							success: function(data) {
								
								if (window[app].getType() == "app") {
								
									//window[app].config.layerindex = index;
									//window[app].setParent(self);
									//window[app].setTarget(target);
									
									//var appsIndex = self.config.apps.length;
									
									//self.config.apps[appsIndex] = window[app];
									//self.config.apps[appsIndex].run();
									console.log(target);
									
									window[app].setTarget( $('body') ).run();
								}
								
								if (window[app].getType() == "cmp") {
									
									window[app].setApp(self.getApp());
									window[app].setParent(self);
									window[app].setTarget(target);
									
									self.append(window[app]);
									
								}
								
							}
						});
					
					}
					*/
					
					this.config.layerindexCounter++;
						
					return this;
				},
				
				defineVariables: function() {
					
					if(!this.app) this.app = {};
					if(!this.children) this.children = [];

					if(!this.extension) this.extension = {};
					
					if(!this.config.execInit) this.config.execInit = false;
					if(!this.config.apps) this.config.apps = [];
					if(!this.config.parent) this.config.parent = {};
					if(!this.config.dom) this.config.dom = {};
					if(!this.config.isInit) this.config.isInit = [];
					if(!this.config.isShow) this.config.isShow = [];
					if(!this.config.layerindexCounter) this.config.layerindexCounter = 0;
					if(!this.config.placeholder) this.config.placeholder = false;

					if(!this.config.target) this.config.target = false;
					if(!this.config.targetOriginal) this.config.targetOriginal = false;

					if(!this.__controller__) this.__controller__ = [];
					if(!this.__view__) this.__view__ = [];
					if(!this.__model__) this.__model__ = {};
					
				},
				
				/**
				F&uuml;gt eine neue Kind-Komponente der aktuellen Komponente hinzu.
				Die hinzuzuf&uuml;gende Komponente muss bereits als Instanz vorliegen.
				
				@method append
				@param {Object} child Referenz auf die Instanz der hinzuzuf&uuml;genden Komponente.
				@return {Object} child Referenz auf die aktuelle Komponente selbst.
				@chainable
				**/
				append: function(child) {
					window.setTimeout((function(self) {
						return function() {
							if (!child.config.execInit && typeof child == 'object') {
								self.add(child);
								child.__init();
							}
						}
					}(this)), 0);
					
					return this;
				},
				
				/**
				F&uuml;gt der aktuellen Komponente eine neue Kind-Komponente zur Laufzeit hinzu.
				Anwendungsgebiet hier kann beispielsweise die Verwendung von ben&ouml;tigten Komponenten innerhalb eines Viewss sein, 
				welche wiederum von der Komponente selbst gesteuert werden soll.
				
				@method appendInner
				@param {Object} child Referenz auf die im Framework registrierte Komponenten-Klasse.
				@param {Object} target DOM-Target Element (jQuery), in welchem zu erstellende Komponente gerendert werden soll.
				@return {Object} child Referenz auf neu erzeugte Komponente.
				**/
				appendInner: function(child, target) {
						
					window.setTimeout((function(self) {
						return function() {
							
							self.defineVariables();
							
							if (target && !child.config.execInit && typeof child == 'object') {
								
								var placeholder = self.getNewPlaceholder();
								target.append(placeholder);

								child.setApp(self.getApp());
								child.setParent(self);
								child.setPlaceholder(placeholder);
								child.setTarget(target);
								
								self.children.push(child);
								
								child.__init();
								
							}
						}
					}(this)), 0);
					
					return child;
				},
				
				/**
				F&uuml;gt der aktuellen Komponente eine neue Kind-Komponente zur Laufzeit hinzu und positioniert die neue Komponente nach einer existierenden Kind-Komponente.
				
				@method appendAfterInner
				@param {Object} child Referenz auf die Komponente, die eingef&uuml;gt werden soll.
				@param {Object} target Referenz auf die Komponente, hinter der die neue Komponente eingef&uuml;gt werden soll.
				@return {Object} child Referenz auf eingef&uuml;gte Komponente.
				**/
				appendAfterInner: function(child, target) {
					
					child.defineVariables();
					
					if (target && !child.config.execInit && typeof child == 'object') {
						
						child.setParent(this);
						child.setApp(this.getApp());
						child.setTarget(this.getTarget());
						child.setPlaceholder(false);
						
						target.getView().getDomMain().after(child.getView().getDomMain());
						
						this.children.push(child);
						
						child.__init();
					
					}
					
					return child;
				},
				
				getNewPlaceholder: function(index) {
					if (index == undefined) var index = this.config.layerindexCounter++;
					return $('<div class="ph-'+index+'"></div>');
				},
				
				/**
				L&ouml;scht die aktuelle Komponente inklusive aller zugewiesenen Kind-Komponenten.
				
				@method del
				@return {Object} Referenz auf die aktuelle Komponente.
				@chainable
				**/
				del: function() {	
					if (typeof this.getParent() != 'undefined' && this.getParent()) 
						this.getParent().deleteChild(this);
						
					this.globalEvents.bubbleDown("delete", {});
					
					return this;
				},
				
				/**
				L&ouml;scht eine spezifische Kind-Komponente inklusive aller zugewiesenen Kind-Komponenten.
				
				@method deleteChild
				@param {Object} cmp Referenz auf die Instanz der zu l&ouml;schenden Komponente.
				@return {Object} Referenz auf die aktuelle Komponente.
				@chainable
				**/
				deleteChild: function(cmp) {
					
					var self = this;
					var list = this.children;
					
					if (list.length > 0) {
						$(list).each(function(i,c) {
							if (typeof c != 'undefined' && typeof cmp == 'object' && typeof cmp != 'undefined' && c.getID() == cmp.getID()) {
								self.children.splice(i,1);
								c.del();
							}
						});
					}
					
					return this;
				},
				
				/**
				L&ouml;scht alle Kind-Komponenten der aktuellen Komponente.
				
				@method deleteChildren
				@return {Object} Referenz auf die aktuelle Komponente.
				@chainable
				**/
				deleteChildren: function() {
					
					var self = this;
					var list = this.children;
					
					if (list.length > 0) {
						$(list).each(function(i,c) {
							if (typeof c != 'undefined') {
								self.children.splice(i,1);
								c.del();
							}
						});
					}
					
					return this;
				},
				
				__init: function() {
					
					var self = this;
					
					// init state - completed
					this.setReadyToShow(this);
					
					// Show methode of developer
					if (this.extension.init && typeof this.extension.init == "function") this.extension.init();	// User method
					
					// Execute this show or init of childrens
					if (this.children.length) {
						var app = this.app;
						$.each(this.children, function(i, c) {
							
							// ??? ... ob gebraucht :)
							//if (c.getTarget() == undefined) c.setTarget(self.getTarget());
							
							c.setApp(app);
							c.__init();
						});
					}else{
						this.__show(true);
					};
					
					this.config.execInit = true;
					
					this.events.trigger("onInit", {});
					
				},
				
				__show: function(showNow) {
					
					// Set show state
					this.setShowComplete(this);
					
					// Execute show
					if (showNow || (this.config.isShow.length == this.children.length)) {
						
						// Init all views
						var model = this.getModel();
						if (model) this.getModel().init();

						// show state - completed
						if (this.getParent()) this.getParent().__show();
					}
					
				},
				
				/**
				Erweitert die aktuelle Komponente und reichert sie mit den definierten neuen Methoden an.
				
				@method extend
				@param {Object} method Objekt mit allen hinzuzuf&uuml;genden Methoden.
				@param {Boolean} root Wird root als "true" definiert, werden alle Methoden als Extension angelegt, ohne bestehende Standard-Methoden zu &uuml;berschreiben. 
				Muss eine neue Methode den gleichen Namen einer Standard-Methode haben, kann Dies &uuml;ber eine solche Extension genutzt werden. 
				Innerhalb einer solchen Extension-Methode steht "this" im Scope der Haupt-Klasse der aktuellen Komponente.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				extend: function(method, root) {
					
					if (root == true) {
						
						$.extend(true, this, method);
						
					}else{
						
						var _this = this;
						
						if (!this.extension) {
							
							var ext = function() {};
							
							var methodList = {};
							
							$.each(method, function(i, m) {
								
								methodList[i] = (function( _super, m, i ) {
									m._super = typeof _super[i] === 'function' ? _super[i] : function(){};
									return function() {
										m.apply( _super, arguments);
									};
								})( _this, m, i );
								
							});
							

							$.extend(true, ext.prototype, methodList);
							
							this.extension = new ext;
							
						}else{
							
							var methodList = {};
							$.each(method, function(i, m) {
								
								methodList[i] = (function( _super, m, i ) {
									m._super = typeof _super[i] === 'function' ? _super[i] : function(){};
									return function() {
										m.apply( _super, arguments);
									};
								})( _this, m, i );
								
							});
							$.extend(true, this.extension, methodList);
							
						}
					}
					
					return this;
				},

				/**
				L&ouml;st das globale Event "disabled" f&uuml;r die aktuelle Komponente aus.
				
				@method disabled
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				disabled: function() {
					this.globalEvents.trigger("disabled", {}, this);
					
					return this;
				},
				
				/**
				L&ouml;st das globale Event "enabled" f&uuml;r die aktuelle Komponente aus.
				
				@method enabled
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				enabled: function() {
					this.globalEvents.trigger("enabled", {}, this);
					
					return this;
				},
				
				/**
				Verschiebt die aktuelle Komponente in ein neues DOM-Target.
				
				@method moveTo
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				moveTo: function(target) {
					
					if (target != undefined && typeof target == 'object') {
						
						this.setApp(target.getApp());
						
						var tar = target.getView().getDomContent();
						this.getView().appendTo(tar);
						this.setTarget(tar);
						this.setConfig({ contentIndex: false })
						
						this.getParent().deleteChildren(this);
						this.setParent(target);
						
						target.children.push(this);
					}
					
					return this;
				},
				
				/**
				L&ouml;st das globale Event "hide" f&uuml;r die aktuelle Komponente aus.
				
				@method hide
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				hide: function() {
					this.globalEvents.trigger("hide", {}, this);
					
					return this;
				},
				
				/**
				L&ouml;st das globale Event "show" f&uuml;r die aktuelle Komponente aus.
				
				@method show
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				show: function() {
					this.globalEvents.trigger("show", {}, this);
					
					return this;
				},
				
				/**
				L&ouml;st das globale Event "setWidth" f&uuml;r die aktuelle Komponente aus und &uuml;bergibt die angegebene Breite als Event-Parameter.
				
				@method setWidth
				@param {int} width Breite in Pixel.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				setWidth: function(width) {
					this.globalEvents.trigger("setWidth", {
						"width": width
					}, this);
					
					return this;
				},
				
				/**
				L&ouml;st das globale Event "setHeight" f&uuml;r die aktuelle Komponente aus und &uuml;bergibt die angegebene H&ouml;he als Event-Parameter.
				
				@method setHeight
				@param {int} height H&ouml;he in Pixel.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				setHeight: function(height) {
					this.globalEvents.trigger("setHeight", {
						"height": height
					}, this);
					
					return this;
				},
				
				/**
				L&ouml;st das globale Event "setInnerWidth" f&uuml;r die aktuelle Komponente aus und &uuml;bergibt den angegebenen Wert als Event-Parameter.
				
				@method setInnerWidth
				@param {int} innerWidth Innere Breite in Pixel.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				setInnerWidth: function(innerWidth) {
					this.globalEvents.trigger("setInnerWidth", {
						"__innerWidth__": innerWidth
					}, this);
					
					return this;
				},
				
				/**
				L&ouml;st das globale Event "setInnerHeight" f&uuml;r die aktuelle Komponente aus und &uuml;bergibt den angegebenen Wert als Event-Parameter.
				
				@method setInnerWidth
				@param {int} innerHeight Innere H&ouml;he in Pixel.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				setInnerHeight: function(innerHeight) {
					this.globalEvents.trigger("setInnerHeight", {
						"__innerHeight__": innerHeight
					}, this);
					
					return this;
				},
				
				/**
				L&ouml;st das globale Event "setOuterWidth" f&uuml;r die aktuelle Komponente aus und &uuml;bergibt den angegebenen Wert als Event-Parameter.
				
				@method setOuterWidth
				@param {int} outerWidth &Auml;u&szlig;ere Breite in Pixel.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				setOuterWidth: function(outerWidth) {
					this.globalEvents.trigger("setOuterWidth", {
						"__outerWidth__": outerWidth
					}, this);
					
					return this;
				},
				
				/**
				L&ouml;st das globale Event "setOuterHeight" f&uuml;r die aktuelle Komponente aus und &uuml;bergibt den angegebenen Wert als Event-Parameter.
				
				@method setOuterHeight
				@param {int} outerHeight &Auml;u&szlig;ere H&ouml;he in Pixel.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				setOuterHeight: function(outerHeight) {
					this.globalEvents.trigger("setInnerHeight", {
						"__outerHeight__": outerHeight
					}, this);
					
					return this;
				},
				
				/**
				Gibt die innere Breite der aktuellen Komponente zur&uuml;ck.
				
				@method getInnerWidth
				@param {Boolean} update Wird als Parameter "true" definiert, wird die aktuelle Breite erneut per jQuery DOM Operation ausgelesen.
				Bei "false" wird die aktuelle Breite aus der Konfiguration der Komponente gelesen und zur&uuml;ck gegeben.
				
				@return {Int} Breite in Pixel.
				**/
				getInnerWidth: function(update) {
					var width = this.getConfig("__innerWidth__");
					if (!width || update) {
						
						var cnt = this.getView().getDomContent();
						if (cnt) {
							//var width = cnt.innerWidth();
							var width = cnt.width();
						}else{
							var width = this.getTarget().width();
						}
						
						this.setConfig({ "__innerWidth__": width });
					}
					return width;
				},
				
				/**
				Gibt die innere H&ouml;he der aktuellen Komponente zur&uuml;ck.
				
				@method getInnerHeight
				@param {Boolean} update Wird als Parameter "true" definiert, wird die aktuelle H&ouml;he erneut per jQuery DOM Operation ausgelesen.
				Bei "false" wird die aktuelle H&ouml;he aus der Konfiguration der Komponente gelesen und zur&uuml;ck gegeben.
				
				@return {Int} H&ouml;he in Pixel.
				**/
				getInnerHeight: function(update) {
					var height = this.getConfig("__innerHeight__");
					
					if (!height || update) {
						
						var cnt = this.getView().getDomContent();
						if (cnt) {
							//var height = cnt.innerHeight();
							var height = cnt.height();
						}else{
							var height = this.getTarget().height();
						}
						
						this.setConfig({ "__innerHeight__": height });
					}
					
					return height;
				},
				
				/**
				Gibt die Breite des &auml;u&szlig;eren Container der aktuellen Komponente zur&uuml;ck.
				
				@method getMainWidth
				@param {Boolean} update Wird als Parameter "true" definiert, wird die aktuelle Breite erneut per jQuery DOM Operation ausgelesen.
				Bei "false" wird die aktuelle Breite aus der Konfiguration der Komponente gelesen und zur&uuml;ck gegeben.
				
				@return {Int} Breite in Pixel.
				**/
				getMainWidth: function(update) {
					var width = this.getConfig("__mainWidth__");
					
					if (!width || update) {
						
						var main = this.getView().getDomMain();
						
						if (main) {
							var width = main.outerWidth();
						}else{
							var width = this.getTarget().innerWidth();
						}
						
						this.setConfig({ "__mainWidth__": width });
					}
					
					return width;
				},
				
				/**
				Gibt die Breite des &auml;u&szlig;eren Container der aktuellen Komponente zur&uuml;ck.
				
				@method getOuterWidth
				@param {Boolean} update Wird als Parameter "true" definiert, wird die aktuelle Breite erneut per jQuery DOM Operation ausgelesen.
				Bei "false" wird die aktuelle Breite aus der Konfiguration der Komponente gelesen und zur&uuml;ck gegeben.
				
				@return {Int} Breite in Pixel.
				**/
				getOuterWidth: function(update) {
					var width = this.getConfig("__outerWidth__");
					
					if (!width || update) {
						
						var cnt = this.getView().getDomContent();
						
						if (cnt) {
							var width = cnt.outerWidth(true);
						}else{
							var width = this.getTarget().innerWidth();
						}
						
						this.setConfig({ "__outerWidth__": width });
					}
					
					return width;
				},
				
				/**
				Gibt die H&ouml;he des &auml;u&szlig;eren Container der aktuellen Komponente zur&uuml;ck.
				
				@method getMainHeight
				@param {Boolean} update Wird als Parameter "true" definiert, wird die aktuelle H&ouml;he erneut per jQuery DOM Operation ausgelesen.
				Bei "false" wird die aktuelle H&ouml;he aus der Konfiguration der Komponente gelesen und zur&uuml;ck gegeben.
				
				@return {Int} H&ouml;he in Pixel.
				**/
				getMainHeight: function(update) {
					var height = this.getConfig("__mainHeight__");
					
					if (!height || update) {
						
						var main = this.getView().getDomMain();
						
						if (main) {
							var height = main.outerHeight();
						}else{
							var height = this.getTarget().innerWidth();
						}
						
						this.setConfig({ "__mainHeight__": height });
					}
					
					return height;
				},
				
				/**
				Gibt die &auml;u&szlig;ere H&ouml;he des inneren Container der aktuellen Komponente zur&uuml;ck.
				
				@method getOuterHeight
				@param {Boolean} update Wird als Parameter "true" definiert, wird die aktuelle H&ouml;he erneut per jQuery DOM Operation ausgelesen.
				Bei "false" wird die aktuelle H&ouml;he aus der Konfiguration der Komponente gelesen und zur&uuml;ck gegeben.
				
				@return {Int} H&ouml;he in Pixel.
				**/
				getOuterHeight: function(update) {
					var height = this.getConfig("__outerHeight__");
					
					if (!height || update) {
						
						var cnt = this.getView().getDomContent();
						if (cnt) {
							var height = cnt.outerHeight(true);
						}else{
							var height = this.getTarget().innerHeight();
						}
						
						this.setConfig({ "__outerHeight__": height });
					}
					
					return height;
				},
				
				/**
				Gibt eine Referenz zur Applikation, der die Komponente zugewiesen wurde zur&uuml;ck.
				
				@method getApp
				@return {Object} Referenz zur Applikation, der die Komponente zugewiesen wurde.
				**/
				getApp: function() {
					return this.app;
				},
				
				/**
				Gibt ID der Komponente zur&uuml;ck.
				
				@method getID
				@return {String} ID der Komponente.
				**/
				getID: function() {
					return this.config.id;
				},
				
				/**
				Gibt eine Liste der Kind-Komponenten der Komponente zur&uuml;ck.
				
				@method getChildren
				@return {Array} Liste aller Kind-Komponenten.
				**/
				getChildren: function() {
					return this.children;
				},
				
				/**
				Gibt das DOM-Target der Komponente zur&uuml;ck.
				
				@method getTarget
				@return {Object} Referenz auf das DOM-Target (jQuery) der Komponente.
				**/
				getTarget: function() {
					return this.config.target;
				},
				
				/**
				Gibt Typ der Komponente zur&uuml;ck.
				
				@method getType
				@return {String} Typ der Komponente. (Default: cmp)
				**/
				getType: function() {
					if (this.type) return this.type; else return false;
				},
				
				/**
				Gibt eine spezifische oder die vollst&auml;ndige Konfiguration einer Komponente zur&uuml;ck.
				
				@method getConfig
				@param {String} Index der abzurufenden Konfiguration.
				@return {Object} Konfiguration der Komponente.
				**/
				getConfig: function(param) {
					if (param == undefined) {
						return this.getModel().config;
					}else{
						if(this.getModel().config[param]) 
							return this.getModel().config[param];
						else
							return false;
					}
				},
				
				/**
				Gibt die &uuml;bergeordnete Komponente der aktuellen Komponente zur&uuml;ck.
				
				@method getParent
				@return {Object} Referenz auf die &uuml;bergeordnete Komponente.
				**/
				getParent: function() {
					return this.config.parent;
				},
				
				getPlaceholder: function() {
					return this.config.placeholder;
				},
				
				/**
				Gibt das aktuelle Model der Komponente zur&uuml;ck.
				
				@method getModel
				@return {Object} Referenz auf das Model der Komponente.
				**/
				getModel: function() {
					if (this.__model__ == undefined || !this.__model__) {
						
						console.log("Model not found for component! - ", this.getType());
						
						return false;
					}else{
						return this.__model__;
					}
				},
				
				/**
				Gibt eine Referenz auf den View-Manager der Komponente zur&uuml;ck.
				(Das Nutzen von mehr als einem View ist noch in einer fr&uuml;hen Entwicklungsphase und sollte bei Bedarf getestet werden)
				
				@method getView
				@return {Object} Referenz auf den View der Komponente.
				**/
				getView: function() {
					if (this.__view__ == undefined)
						return false;
					else
						return this.__view__;
				},
				
				/**
				Gibt eine Referenz auf den Controller-Manager der aktuellen Komponente zur&uuml;ck.
				Damit auch Event-Handler Methoden eines Controllers wiederverwendet werden k&ouml;nnen, ist es m&ouml;glich mehr als einen Controller in einer Komponente zu gegistrieren.
				
				@method getController
				@return {Object} Referenz auf den Controller-Manager der Komponente.
				**/
				getController: function() {
					if (this.__controller__ == undefined)
						return false;
					else
						return this.__controller__;
				},
				
				/**
				Gibt die aktuelle absolute und relative Position des &auml;u&szlig;eren Container einer Komponente zur&uuml;ck.
				(Der parameter "options" ist noch in einer Experimentierphase und wird sp&auml;ter ausf&uuml;hrlicher beschrieben.)
				
				@method getPosition
				@param {Object} options Angaben zur Position.
				@return {Object} Konfigurationsobjekt der Komponente mit allen Positions-Parametern.
				**/
				getPosition: function(options) {
					
					// If position object available then set the default position object
					if (this.getModel().config.position == undefined) {
						
						var offset = $(this.getView().getDomMain()).offset();
						var pos = $(this.getView().getDomMain()).position();
						
						position = {
							x: pos.left,
							y: pos.top,
							offset: {
								x: offset.left,
								y: offset.top
							}
						};
						
						this.getModel().setConfig({ position: position });
					}
					
					var position = this.getModel().getConfig("position");
					var curPos = { 
						x: 0, 
						y: 0, 
						offset: {
							x: 0, 
							y: 0 
						}
					};
					
					// Set the own coordinates
					if (options != undefined && options.my) {
						
						if (options.my == "left top") curPos = { 
							x: position.x, 
							y: position.y,
							offset: { 
								x: position.offset.x, 
								y: position.offset.y 
							} 
						};
						if (options.my == "center top") curPos = { 
							x: Math.floor(position.x + this.getMainWidth(true) / 2), 
							y: position.y,
							offset: { 
								x: Math.floor(position.offset.x + this.getMainWidth(true) / 2), 
								y: position.offset.y 
							} 
						};
						if (options.my == "right top") curPos = { 
							x: Math.floor(position.x + this.getMainWidth(true)),
							y: position.y,
							offset: { 
								x: Math.floor(position.offset.x + this.getMainWidth(true)), 
								y: position.offset.y 
							} 
						};
						
						if (options.my == "left center") curPos = { 
							x: position.x, 
							y: Math.floor(position.y + this.getMainHeight(true) / 2),
							offset: { 
								x: position.offset.x, 
								y: Math.floor(position.offset.y + this.getMainHeight(true) / 2) 
							} 
						};
						if (options.my == "center center" || options.my == "center") curPos = { 
							x: Math.floor(position.x + Math.floor(this.getMainWidth(true) / 2)), 
							y: Math.floor(position.y + this.getMainHeight(true) / 2), 
							offset: { 
								x: Math.floor(position.offset.x + Math.floor(this.getMainWidth(true) / 2)), 
								y: Math.floor(position.offset.y + this.getMainHeight(true) / 2) 
							} 
						};
						if (options.my == "right center") curPos = { 
							x: Math.floor(position.x + this.getMainWidth(true)), 
							y: Math.floor(position.y + this.getMainHeight(true) / 2), 
							offset: { 
								x: Math.floor(position.offset.x + this.getMainWidth(true)), 
								y: Math.floor(position.offset.y + this.getMainHeight(true) / 2) 
							} 
						};
						
						if (options.my == "left bottom") curPos = { 
							x: position.x, 
							y: Math.floor(position.y + this.getMainHeight(true)), 
							offset: { 
								x: position.offset.x, 
								y: Math.floor(position.offset.y + this.getMainHeight(true)) 
							} 
						};
						if (options.my == "center bottom") curPos = { 
							x: Math.floor(position.x + Math.floor(this.getMainWidth(true) / 2)), 
							y: Math.floor(position.y + this.getMainHeight(true)), 
							offset: { 
								x: Math.floor(position.offset.x + Math.floor(this.getMainWidth(true) / 2)), 
								y: Math.floor(position.offset.y + this.getMainHeight(true)) 
							} 
						};
						if (options.my == "right bottom") curPos = { 
							x: Math.floor(position.x + this.getMainWidth(true)), 
							y: Math.floor(position.y + this.getMainHeight(true)), 
							offset: { 
								x: Math.floor(position.offset.x + this.getMainWidth(true)), 
								y: Math.floor(position.offset.y + this.getMainHeight(true)) 
							} 
						};
						
						// Calculate positions with offset
						if (options.offset) {
							var newOffset = options.offset.split(" ");
							
							// Offset coordinates
							if (newOffset[0]) curPos.offset.x = Math.floor((curPos.offset.x + parseInt(newOffset[0])));
							if (newOffset[1]) curPos.offset.y = Math.floor((curPos.offset.y + parseInt(newOffset[1])));
							
							// Relative coordinates
							if (newOffset[0]) curPos.x = Math.floor((curPos.x + parseInt(newOffset[0])));
							if (newOffset[1]) curPos.y = Math.floor((curPos.y + parseInt(newOffset[1])));
						}
						
						return curPos;
					}
					
					return this.getModel().getConfig("position");
				},
				
				/**
				Setzt die Referenz auf eine existierende Applikation, der die Komponente zugewiesen werden soll.
				
				@method setApp
				@param {Object} app Referenz auf die Instanz einer existierenden Applikation.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				setApp: function(app) {
					this.app = app;
					
					return this;
				},
				
				/**
				Setzt die ID der Komponente.
				
				@method setID
				@param {String} id ID der Komponente.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				setID: function(id) {
					this.config.id = id;
					
					return this;
				},
				
				/**
				Setzt das DOM-Target (jQuery) der Komponente.
				
				@method setTarget
				@param {Object} target DOM-Target der Komponente.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				setTarget: function(target) {
					
					if (this.config.target == undefined || !this.config.target) {
						this.config.targetOriginal = target;
					}
					
					this.config.target = target;
					if (this.config.target) this.getView().appendTo(target);
					
					return this;
				},
				
				/**
				Setzt eine beliebige Konfiguration im Model der der Komponente.
				
				@method setConfig
				@param {Object} config Objekt mit Konfigurations-Parametern.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				setConfig: function(config) {
					$.extend(true, this.getModel().config, config);
					
					return this;
				},
				
				/**
				Setzt die Referenz auf die &uuml;bergeordnete Komponente.
				
				@method setParent
				@param {Object} parent Referenz auf die &uuml;bergeordnete Komponente.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				setParent: function(parent) {
					this.config.parent = parent;
					
					return this;
				},
				
				setReadyToShow: function(c) {
					if (!this.config.isInit) this.config.isInit = [];
					this.config.isInit.push(c);
					
					return this;
				},

				setShowComplete: function(c) {
					if (!this.config.isShow) this.config.isShow = [];
					this.config.isShow.push(c);
					
					return this;
				},
				
				setPlaceholder: function(placeholder) {
					this.config.placeholder = placeholder;
				},
				
				setEventsManager: function(globalEventsManager) {
					globalEventsManager.setParent(this);
					this.globalEvents = globalEventsManager;
					
				},
				
				/**
				Registriert das Model f&uuml;r die aktuelle Komponente und reichert es mit allen ben&ouml;tigten Methoden an.
				
				@method setModel
				@param {Object} m Referenz auf die im Framework registrierte Model-Klasse.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				setModel: function(m) {
					
					
					/**
					Objektstuktur eines Model mit allen grundlegenden Methoden.
					
					@class model
					@constructor 
					*/
					this.__model__ = new m;
					this.__model__.__cmp__ = this;
					this.__model__.globalEvents = this.globalEvents;
					this.__model__.events = this.events;
					
					$.extend(true, this.__model__,  {
						
						/**
						Gibt die Referenz auf das aktuell registrierte Model der Komponente zur&uuml;ck.
						
						@method getCmp
						@return {Object} Referenz auf das aktuell registrierte Model der Komponente.
						**/
						getCmp: function() {
							return this.__cmp__;
						},
						
						/**
						Setzt eine beliebige Konfiguration im Model der aktuellen Komponente.
						
						@method setConfig
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						setConfig: function(config) {
							$.extend(true, this.config, config);
							
							return this;
						},
						
						/**
						Gibt eine spezifische oder die vollst&auml;ndige Konfiguration einer Komponente zur&uuml;ck.
						
						@method getConfig
						@param {String} param der abzurufenden Konfiguration.
						@return {Object} Konfiguration der Komponente.
						**/
						getConfig: function(param) {
							if (param == undefined) {
								return this.config;
							}else{
								if(this.config[param]) 
									return this.config[param];
								else
									return false;
							}
						},
						
						/**
						Gibt zur&uuml;ck, ob die aktuelle Komponente enabled ist.
						
						@method isEnabled
						@param {Boolean} param (Default: false) - Wird als Parameter true &uuml;bergeben, wird nur gepr&uuml;ft, ob die Komponente selbst enabled ist. Bei false wird zus&auml;tzlich gepr&uuml;ft, ob die Komponente evtl. &uuml;ber eine &uuml;bergeordnete Komponente disabled wurde.
						@return {Boolean} true|false
						**/
						isEnabled:function(param) {
							if (param == undefined) var param = false;
							
							if (param) {
								if (this.getConfig("enabled")) 
									return true; 
								else 
									return false;
							}else{
								if (this.getConfig("enabled") && !this.getConfig("globalDisabled")) 
									return true; 
								else 
									return false;
							}
							
						},
						
						/**
						L&ouml;st das globale Event "viewUpdate" f&uuml;r die aktuelle Komponente aus und setzt den Konfigurationsparameter "globalDisabled" auf "true". 
						Die aktualisierte Konfiguration wird als Event-Parameter gesendet.
						Da diese Methode &uuml;ber Eventhandler-Methoden im Controller aufgerufen wird, werden als &Uuml;bergabeparameter nur Event-Parameter erwartet.
						
						@method setGlobalDisabled
						@param {Object} e Event-Parameter der Handler-Methode.
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						setGlobalDisabled: function(e) {
							if (e.data.globalDisabled == undefined) var state = false; else var state = e.data.globalDisabled;
							this.setConfig({ globalDisabled: state });
							
							this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
							
							return this;
						},
						
						/**
						L&ouml;st das globale Event "disabled" als BubbleDown-Event f&uuml;r die aktuelle Komponente aus und &uuml;bergibt den Event-Parameter "globalDisabled" mit dem Wert "true". 
						Da diese Methode &uuml;ber Eventhandler-Methoden im Controller aufgerufen wird, werden als &Uuml;bergabeparameter nur Event-Parameter erwartet.
						
						@method disabled
						@param {Object} e Event-Parameter der Handler-Methode.
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						disabled: function(e) {
							this.setConfig({ enabled:false });
							
							// Event bubbling - DOWN
							this.globalEvents.bubbleDown("globalDisabled", { globalDisabled: true });
							
							return this;
						},
						
						/**
						Setzt den Konfigurationsparameter enabled auf true und l&ouml;st das globale Event "enabled" als BubbleDown-Event f&uuml;r die aktuelle Komponente aus und &uuml;bergibt den Event-Parameter "globalDisabled" mit dem Wert "false". 
						Da diese Methode &uuml;ber Eventhandler-Methoden im Controller aufgerufen wird, werden als &Uuml;bergabeparameter nur Event-Parameter erwartet.
						
						@method enabled
						@param {Object} e Event-Parameter der Handler-Methode.
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						enabled: function(e) {
							this.setConfig({ enabled:true });
							
							// Event bubbling - DOWN
							this.globalEvents.bubbleDown("globalDisabled", { globalDisabled: false });
						
							return this;
						},
						
						/**
						Setzt den Konfigurationsparameter hide auf true und l&ouml;st das globale Event "hide" f&uuml;r die aktuelle Komponente aus. 
						
						@method hide
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						hide: function() {
							this.setConfig({ hide: true });
							this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
							
							return this;
						},
						
						/**
						Setzt den Konfigurationsparameter hide auf false und l&ouml;st das globale Event "viewUpdate" f&uuml;r die aktuelle Komponente aus. 
						Die aktualisierte Konfiguration wird als Event-Parameter gesendet.
						Da diese Methode &uuml;ber Eventhandler-Methoden im Controller aufgerufen wird, werden als &Uuml;bergabeparameter nur Event-Parameter erwartet.
						
						@method show
						@param {Object} e Event-Parameter der Handler-Methode.
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						show: function(e) {
							this.setConfig({ hide: false });
							this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
							
							return this;
						},
						
						/**
						Setzt den Konfigurationsparameter f&uuml;r die Breite der Komponente und l&ouml;st das globale Event "viewUpdate" f&uuml;r die aktuelle Komponente aus. 
						Die aktualisierte Konfiguration wird als Event-Parameter gesendet.
						Da diese Methode &uuml;ber Eventhandler-Methoden im Controller aufgerufen wird, werden als &Uuml;bergabeparameter nur Event-Parameter erwartet.
						
						@method setWidth
						@param {Object} e Event-Parameter der Handler-Methode.
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						setWidth: function(e) {
							this.setConfig({ __width__: e.data.width });
							this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
							
							return this;
						},
						
						/**
						Setzt den Konfigurationsparameter f&uuml;r die H&ouml;he der Komponente und l&ouml;st das globale Event "viewUpdate" f&uuml;r die aktuelle Komponente aus. 
						Die aktualisierte Konfiguration wird als Event-Parameter gesendet.
						Da diese Methode &uuml;ber Eventhandler-Methoden im Controller aufgerufen wird, werden als &Uuml;bergabeparameter nur Event-Parameter erwartet.
						
						@method setHeight
						@param {Object} e Event-Parameter der Handler-Methode.
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						setHeight: function(e) {
							this.setConfig({ __height__: e.data.height });
							this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
							
							return this;
						},
						
						/**
						Setzt den Konfigurationsparameter f&uuml;r die innere Breite der Komponente
						
						@method setInnerWidth
						@param {Object} width Breite in Pixel.
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						setInnerWidth: function(width) {
							this.setConfig({ "__innerWidth__": width });
							
							return this;
						},
						
						/**
						Setzt den Konfigurationsparameter f&uuml;r die innere H&ouml;he der Komponente
						
						@method setInnerHeight
						@param {Object} height Height in Pixel.
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						setInnerHeight: function(height) {
							this.setConfig({ "__innerHeight__": height });
							
							return this;
						},
						
						/**
						Setzt den Konfigurationsparameter f&uuml;r die &auml;u&szlig;ere Breite der Komponente
						
						@method setOuterWidth
						@param {Object} width Breite in Pixel.
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						setOuterWidth: function(width) {
							this.setConfig({ "__outerWidth__": width });
							
							return this;
						},
						
						/**
						Setzt den Konfigurationsparameter f&uuml;r die &auml;u&szlig;ere H&ouml;he der Komponente
						
						@method setOuterHeight
						@param {Object} height H&ouml;he in Pixel.
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						setOuterHeight: function(height) {
							this.setConfig({ "__outerHeight__": height });
							
							return this;
						},

						/**
						Gibt den Typ des Model zur&uuml;ck;
						
						@method getType
						@return {String} Typ des Model.
						**/
						getType: function() {
							if (this.type) {
								return this.type;
							}else{
								console.log("Type doesn't exists in model of component", this.getCmp());
								return false;
							}
						},
						
						/**
						Setzt den Konfigurationsparameter f&uuml;r den z-Index der Komponente und l&ouml;st das globale Event "viewUpdate" f&uuml;r die aktuelle Komponente aus. 
						Die aktualisierte Konfiguration wird als Event-Parameter gesendet.
						Da diese Methode &uuml;ber Eventhandler-Methoden im Controller aufgerufen wird, werden als &Uuml;bergabeparameter nur Event-Parameter erwartet.
						
						@method setZIndex
						@param {Object} e Event-Parameter der Handler-Methode.
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						setZIndex: function(e) {
							if (this.isEnabled()) {
								this.setConfig({__zindex__: e.data.__zindex__});
								this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
							}
							
							return this;
						},
						
						/**
						Setzt den Konfigurationsparameter f&uuml;r top-Position der Komponente und l&ouml;st das globale Event "viewUpdate" f&uuml;r die aktuelle Komponente aus. 
						Die aktualisierte Konfiguration wird als Event-Parameter gesendet.
						Da diese Methode &uuml;ber Eventhandler-Methoden im Controller aufgerufen wird, werden als &Uuml;bergabeparameter nur Event-Parameter erwartet.
						
						@method setTop
						@param {Object} e Event-Parameter der Handler-Methode.
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						setTop: function(e) {
							if (this.isEnabled()) {
								this.setConfig({__top__: e.data.__top__});
								
								this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
							}
							
							return this;
						},

						/**
						Setzt den Konfigurationsparameter f&uuml;r left-Position der Komponente und l&ouml;st das globale Event "viewUpdate" f&uuml;r die aktuelle Komponente aus. 
						Die aktualisierte Konfiguration wird als Event-Parameter gesendet.
						Da diese Methode &uuml;ber Eventhandler-Methoden im Controller aufgerufen wird, werden als &Uuml;bergabeparameter nur Event-Parameter erwartet.
						
						@method setLeft
						@param {Object} e Event-Parameter der Handler-Methode.
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						setLeft: function(e) {
							if (this.isEnabled()) {
								this.setConfig({__left__: e.data.__left__});
								
								this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
							}
							
							return this;
						},

						/**
						Setzt die Konfigurationsparameter f&uuml;r die top- und left-Position der Komponente und l&ouml;st das globale Event "viewUpdate" f&uuml;r die aktuelle Komponente aus. 
						Die aktualisierte Konfiguration wird als Event-Parameter gesendet.
						Da diese Methode &uuml;ber Eventhandler-Methoden im Controller aufgerufen wird, werden als &Uuml;bergabeparameter nur Event-Parameter erwartet.
						
						@method setPos
						@param {Object} e Event-Parameter der Handler-Methode.
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						setPos: function(e) {
							if (this.isEnabled()) {
								this.setConfig({
									__left__: e.data.__left__,
									__top__: e.data.__top__
								});
								
								this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
							}
							
							return this;
						},

						/**
						Setzt den Konfigurationsparameter f&uuml;r einen CSS-Style der Komponente f&uuml;r den &auml;u&szlig;eren Container und l&ouml;st das globale Event "viewUpdate" f&uuml;r die aktuelle Komponente aus. 
						Die aktualisierte Konfiguration wird als Event-Parameter gesendet.
						Da diese Methode &uuml;ber Eventhandler-Methoden im Controller aufgerufen wird, werden als &Uuml;bergabeparameter nur Event-Parameter erwartet.
						
						@method setMainStyle
						@param {Object} e Event-Parameter der Handler-Methode.
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						setMainStyle: function(e) {
							if (this.isEnabled()) {
								
								this.setConfig({
									__mainStyle__: e.data.__mainStyle__
								});
								
								this.getCmp().getView().setMainStyle(this.getConfig("__mainStyle__"));
								
								this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
							}
							
							return this;
						},

						/**
						Ruft die View-Methode "setFocus" im View der aktuellen Komponente auf.
						Da diese Methode &uuml;ber Eventhandler-Methoden im Controller aufgerufen wird, werden als &Uuml;bergabeparameter nur Event-Parameter erwartet.
						
						@method setFocus
						@param {Object} e Event-Parameter der Handler-Methode.
						@return {Object} Referenz auf das Model der Komponente.
						@chainable
						**/
						setFocus: function(e) {
							if (this.isEnabled()) {
								this.getCmp().getView().call("setFocus", e);
							}
							
							return this;
						}
						
					});
					
					return this;
				},
				
				/**
				Registriert den Default-View f&uuml;r die aktuelle Komponente.
				
				@method setView
				@for cmp
				@param {Object} v Referenz auf den im Framework registrierte View-Klasse.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				setView: function(v) {
					this.__view__.setView(v);
					
					return this;
				},
				
				/**
				L&ouml;scht einen spezifischen View einer Komponente. 
				
				@method deleteView
				@param {Object} v Referenz auf den registrierten View der Komponente.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				deleteView: function(v) {
					this.__view__.del(v);
					
					return this;
				},
				
				/**
				F&uuml;gt einen weiteren View der Komponente hinzu.
				
				@method addView
				@param {Object} v Referenz auf eine im Framework registrierte View-Klasse.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				addView: function(v) {
					this.__view__.add(v);
					
					return this;
				},
				
				/**
				F&uuml;gt einen weiteren View der Komponente hinzu.
				
				@method deleteController
				@param {Object} c Referenz die zu l&ouml;schende Controller-Instanz.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				deleteController: function(c) {
					this.__controller__.del(c);
					
					return this;
				},
				
				/**
				Tauscht einen bestehenden Controller mit einem Anderen.
				
				@method replaceController
				@param {Object} o Referenz den zu ersetzenden Controller.
				@param {Object} n Referenz auf eine im Framework registrierte Controller-Klasse.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				replaceController: function(o, n) {
					this.__controller__.replace(o, n);
					
					return this;
				},

				/**
				Setzt den Default-Controller f&uuml;r die Komponente.
				
				@method setController
				@param {Object} c Referenz auf die im Framework registrierte Controller-Klasse.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				setController: function(c) {
					this.__controller__.setController(c);
					
					return this;
				},
				
				/**
				Ersetzt einen bestehenden View mit einem Anderen.
				
				@method replaceView
				@param {Object} o Referenz den zu ersetzenden View.
				@param {Object} n Referenz auf eine im Framework registrierte View-Klasse.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				replaceView: function(o, n) {
					this.__view__.replace(o, n);
					
					return this;
				},
				
				/**
				Gibt die im Parameter angegebenen Daten als Event-Parameter Object zur&uuml;ck.
				
				@method eventDataStructure
				@param {Object} args Objekt mit allen zu &uuml;bergebenden Parametern.
				@return {Object} Event-Parameter Object.
				**/
				eventDataStructure: function(args) {
					if (arguments == undefined) {
						var args = {data: {}};
					}else if (arguments.data == undefined) {
						var args = {data: args};
					}
					
					return args;
				},
				
				/**
				L&ouml;st das globale Event "update" f&uuml;r die aktuelle Komponente aus.
				
				@method update
				@param {Object} e Event-Parameter Objekt.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				update: function(e) {
					this.globalEvents.trigger("update", e, this);
					
					return this;
				},
				
				/**
				L&ouml;st das globale Event "setPos" f&uuml;r die aktuelle Komponente aus.
				
				@method setPos
				@param {Object} top Event-Parameter "top" f&uuml;r die Position von oben.
				@param {Object} left Event-Parameter "left" f&uuml;r die Position von links.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				setPos: function(top, left) {
					this.globalEvents.trigger("setPos", {
						__left__: left,
						__top__: top
					}, this);
					
					return this;
				},
				
				/**
				L&ouml;st das globale Event "setMainStyle" f&uuml;r die aktuelle Komponente aus.
				
				@method setMainStyle
				@param {Object} style Als Parameter werden hier CSS-Styles erwartet.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				setMainStyle: function(style) {
					this.globalEvents.trigger("setMainStyle", {
						__mainStyle__: style
					}, this);
					
					return this;
				},
				
				setPosition: function(options) {
					
					if (options.position == 'absolute') {
						
						options.width = '100%';
						options.zIndex = 1;
						
					}
					
					this.setMainStyle(options);
					
					return this;
				}
				
			});
			
			
			// add event object
			var cIndex = jsCow.componentsObjectList.length; 
			
			var new_c = new c;
			if (!new_c.config) new_c.config = {};
			
			jsCow.componentsObjectList[cIndex] = new_c;
			
			
			// Set globalEvents manager
			var copyOfglobalEventsManager = $.extend(true, {}, jsCow.globalEventsManager);
			copyOfglobalEventsManager.setEventsReference(jsCow.globalEvents);
			jsCow.componentsObjectList[cIndex].setEventsManager(copyOfglobalEventsManager);
			
			// Set the event bind manager instance
			var events = new jsCow.events();
			events.setParent(new_c);
			jsCow.componentsObjectList[cIndex].events = events;
			
			// Insert mvc classes into component
			var controllerHandler = new jsCow.res.core.mvc.controllerHandler;
			controllerHandler.__cmp__ = new_c;
			controllerHandler.globalEvents = new_c.globalEvents;
			jsCow.componentsObjectList[cIndex].__controller__ = controllerHandler;
			
			var viewHandler = new jsCow.res.core.mvc.viewHandler;
			viewHandler.__cmp__ = new_c;
			jsCow.componentsObjectList[cIndex].__view__ = viewHandler;
			
			
			
			// Set default mvc objects
			if (jsCow.componentsObjectList[cIndex].setDefaultMVC && typeof jsCow.componentsObjectList[cIndex].setDefaultMVC == "function") {
				jsCow.componentsObjectList[cIndex].setDefaultMVC();
			}
			
			// default :: set unique id of current component
			jsCow.componentsObjectList[cIndex].setID( 'c' + ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 18) );
			
			return jsCow.componentsObjectList[cIndex];
		}else{
			console.log("The ressource of a component does not exists!");
			return {};
		}
	},
	
	/**
	Sucht eine Komponente anhand der angegebenen Komponenten-ID und gibt bei Erfolg die Instanz der gesuchten Komponente zur&uuml;ck.
	
	@method find
	@for component
	@param {String} cid ID der gesuchten Komponente.
	@return {Object} Referenz auf die gesuchte Instanz der Komponente. Wird keine Komponente gefunden, wird false zur&uuml;ckgegeben.
	**/
	find: function(cid) {
		var foundCmp = false;
		$.each(jsCow.componentsObjectList, function(i, c) {
			if (c.getID() == cid) {
				foundCmp = c;
			}
		});
		
		return foundCmp;
	}
	
}

jsCow.components = new component();
