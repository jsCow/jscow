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
