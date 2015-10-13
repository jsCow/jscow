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
