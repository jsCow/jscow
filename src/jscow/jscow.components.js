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
	get: function(c, preConfig) {
		
		var c = new c;
		
		if (typeof c === 'object') {
			
			
			/**
			...
			
			@property preConfig
			*/
			if (typeof preConfig !== 'undefined') {
				c.__preConfig__ = preConfig;
			}else{
				c.__preConfig__ = {};
			}

			/**
			Objektstuktur einer Komponente mit allen grundlegenden Methoden.
			
			@class cmp
			@constructor 
			*/
			
			c.events = false;
			
			/**
			Registriertes Model der Komponente

			@property __model__
			@type Object
			@default "false"
			**/
			c.__model__ = false;
			
			/**
			Registrierte Views der Komponente

			@property __view__
			@type Object
			@default "false"
			**/
			c.__view__ = false;
			
			/**
			Registrierte Controller der Komponente

			@property __controller__
			@type Object
			@default "false"
			**/
			c.__controller__ = false;
			
			/**
			Konfiguration der Komponente.

			@property config.
			@type Object
			@default "{}"
			**/
			c.__cfg__ = {};
			
			/**
			Referenz auf die &uuml;bergeordnete Komponente.

			@property config.parent
			@type Object
			@default "false"
			**/
			c.__cfg__.parent = false;
			
			/**
			Objekt f&uuml;r alle ben&ouml;tigten HTML-DOM Elemente der Komponente.
			
			@property config.dom
			@type Object
			@default "false"
			**/
			c.__cfg__.dom = false;
			
			c.__cfg__.layerindex = 0;
			c.__cfg__.initialized = [];
			c.__cfg__.__execInit__ = false;
			c.__cfg__.rendered = false;
			c.__cfg__.placeholder = false;
			c.__cfg__.id = false;
			
			/**
			DOM-Target der Komponente.

			@property config.target
			@type Object
			@default "false"
			**/
			c.__cfg__.target = false;
			
			/**
			Liste aller Kind-Komponenten der aktuellen Komponente.

			@property children
			@type Array
			@default "[]"
			**/
			c.__children__ = [];
			
			/**
			Objekt aller Methoden, die die Komponente erweitert.
			
			@property extension
			@type Object
			@default "false"
			**/
			c.extension = false;
			
			// Extend component with all standard methods
			c = $.extend(true, c,  {
				
				/**
				F&uuml;gt eine neue Kind-Komponente der aktuellen Komponente hinzu.
				Die hinzuzuf&uuml;gende Komponente existiert in diesem Fall noch nicht als Instanz.
				
				@method add
				@param {Object} child Referenz auf die im Framework registrierte Komponenten-Klasse.
				@return {Object} child Referenz auf die aktuelle Komponente selbst.
				@chainable
				**/
				add: function(childs) {
					
					var list = [];
					
					if ( childs instanceof Array ) {
						list = childs;
					} else {
						list.push(childs);
					}
					
					$.each(list, (function(self) {
						return function(i, child) {
							
							if (typeof child === 'object' && !child.__cfg__.__execInit__)	{
								
								var content = self.view().content();
								
								if ( content ) {
									content.append( child.placeholder() );
								} else { 
									var content = self.placeholder();
								}
								
								child.parent(self);
								child.target(content);
								
								self.__children__.push(child);
								
							}
							
						}
					})(this));
					
					return this;
				},
				
				createPlaceholder: function(index) {

					var ph = $('<div class="jsc-ph-'+index+'"></div>');
					this.placeholder( ph );
					
					return ph;
				},
				
				placeholder: function(placeholder) {
					if ( placeholder ) {
						
						this.__cfg__.placeholder = placeholder;
						this.__cfg__.placeholder.appendTo(this.target())

						return this;

					} else {

						return this.__cfg__.placeholder;

					}
				},
				
				/**
				Setzt das DOM-Target (jQuery) der Komponente.
				
				@method target
				@param {Object} target DOM-Target der Komponente.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				target: function(target) {
					
					var target = target;
					
					if (typeof target === 'undefined') {
						
						if (!this.__cfg__.target) {
							this.__cfg__.target = $('body');
						}
						
						return this.__cfg__.target;
						
					}else{
						
						if (!this.parent() && typeof target === 'undefined') {

							this.__cfg__.target = $('body');
							target = this.__cfg__.target;

						}else{
							
							this.__cfg__.target = target;
							this.placeholder().appendTo(this.__cfg__.target);

						}

						if (this.children.length) {
							$.each(this.children, function(i,child){
								child.target(target);
							});
						}
						
						return this;
						
					}
					
				},
				
				defineVariables: function() {
					
					if(!this.__preConfig__) this.__preConfig__ = {};
					
					if(!this.__children__) this.__children__ = [];
					if(!this.extension) this.extension = {};
					
					if(!this.__cfg__) this.__cfg__ = {};
					if(!this.__cfg__.__execInit__) this.__cfg__.__execInit__ = false;
					if(!this.__cfg__.apps) this.__cfg__.apps = [];
					if(!this.__cfg__.parent) this.__cfg__.parent = false;
					if(!this.__cfg__.dom) this.__cfg__.dom = {};
					if(!this.__cfg__.rendered) this.__cfg__.rendered = [];
					if(!this.__cfg__.placeholder) this.__cfg__.placeholder = false;
					if(!this.__cfg__.initialized) this.__cfg__.initialized = [];
					if(!this.__cfg__.target) this.__cfg__.target = false;
					
					if(!this.events) this.events = false;
					
					if(!this.__model__) this.__model__ = {};
					if(!this.__view__) this.__view__ = [];
					if(!this.__controller__) this.__controller__ = [];
					
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
					window.setTimeout((function(self, child) {
						return function() {
							if (!child.config.__execInit__ && typeof child == 'object') {
								self.add(child);
								child.__init();
							}
						}
					}(this, child)), 0);
					
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
							
							if (target && !child.config.__execInit__ && typeof child == 'object') {
								
								var placeholder = self.createPlaceholder();
								target.append(placeholder);
								
								child.parent(self);
								child.placeholder(placeholder);
								child.target(target);
								
								self.__children__.push(child);
								
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
					
					if (target && !child.config.__execInit__ && typeof child == 'object') {
						
						child.parent(this);
						child.target(this.target());
						child.placeholder(false);
						
						target.view().getDomMain().after(child.view().getDomMain());
						
						this.__children__.push(child);
						
						child.__init();
					
					}
					
					return child;
				},
				
				/**
				L&ouml;scht die aktuelle Komponente inklusive aller zugewiesenen Kind-Komponenten.
				
				@method del
				@return {Object} Referenz auf die aktuelle Komponente.
				@chainable
				**/
				del: function() {	
					debugger;
					
					if (typeof this.parent() != 'undefined' && this.parent()) {
						this.parent().remove(this);
					}
					
					var list = this.__children__;
					
					if (list.length > 0) {
						$(list).each(function(i,c) {
							c.del();
						});
					}
					
					return this;
				},
				
				/**
				L&ouml;scht eine spezifische Kind-Komponente inklusive aller zugewiesenen Kind-Komponenten.
				
				@method remove
				@param {Object} cmp Referenz auf die Instanz der zu l&ouml;schenden Komponente.
				@return {Object} Referenz auf die aktuelle Komponente.
				@chainable
				**/
				remove: function(cmp) {
					
					var self = this;
					var list = this.__children__;
					
					if (typeof cmp != 'undefined') {
						
						// Delete a specific child component
						if (list.length > 0) {
							$(list).each(function(i,c) {
								if (typeof c != 'undefined' && typeof cmp == 'object' && typeof cmp != 'undefined' && c.id() == cmp.id()) {
									self.__children__.splice(i,1);
									c.del();
								}
							});
						}
						
					}else if (typeof cmp != 'string' && cmp == '*') {
						
						// Delete all child components
						if (list.length > 0) {
							$(list).each(function(i,c) {
								if (typeof c != 'undefined') {
									self.__children__.splice(i,1);
									c.del();
								}
							});
						}
						
					}
					
					return this;
				},
				
				run: function() {
					this.__init();
				},
				
				__init: function() {
					
					// init state - completed
					this.readyToShow(this);
					
					// If exists the customized init method will be executed
					if (this.extension.init && typeof this.extension.init == "function") {
						this.extension.init();
					}
					
					// Execute this show or init of childrens
					if (this.__children__.length) {
						$.each(this.__children__, function(i, c) {
							c.__init();
						});
					}else{
						this.__show(true);
					};
					
					this.__cfg__.__execInit__ = true;
					
					// Trigger local event "init"
					this.events.trigger("init");
					
				},
				
				__show: function(showNow) {
					
					// Set show state
					this.showComplete(this);
					
					// Execute show
					if (showNow || (this.__cfg__.rendered.length == this.__children__.length)) {
						
						this.view().init();
						
						// Trigger controller init method
						this.events.trigger("controller.init");
						
						// show state - completed
						if (this.parent()) this.parent().__show();
						
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
				Verschiebt die aktuelle Komponente in ein neues DOM-Target.
				
				@method move
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				move: function(target) {
					
					if (target != 'undefined' && typeof target == 'object') {
						
						var targetViewContent = target.view().content();
						
						this.view().appendTo(targetViewContent);
						
						if (this.parent()) {
							var parentChildIndex = this.parent().children().indexOf(this);
							this.parent().children().splice(parentChildIndex, 1);
							this.parent(target);
						}
						
						target.__children__.push(this);
					}
					
					return this;
				},
				
				/**
				...
				
				@method id
				@param {String} ...
				@return {String} ID der Komponente.
				**/
				id: function(id) {
					if(id) {
						this.__cfg__.id = id;
						
						this.trigger("update.id", {
							id: id
						});
						
						return this;
					}else{
						return this.__cfg__.id;
					}
				},
				
				/**
				Gibt eine Liste der Kind-Komponenten der Komponente zur&uuml;ck.
				
				@method children
				@return {Array} Liste aller Kind-Komponenten.
				**/
				children: function() {
					return this.__children__;
				},
				
				/**
				Gibt das aktuelle Model der Komponente zur&uuml;ck.
				
				@method model
				@return {Object} Referenz auf das Model der Komponente.
				**/
				model: function() {
					
					if (this.__model__ == 'undefined' || !this.__model__) {
						return false;
					}else{
						return this.__model__;
					}
					
				},
				
				/**
				Gibt eine Referenz auf den View-Manager der Komponente zur&uuml;ck.
				(Das Nutzen von mehr als einem View ist noch in einer fr&uuml;hen Entwicklungsphase und sollte bei Bedarf getestet werden)
				
				@method view
				@return {Object} Referenz auf den View der Komponente.
				**/
				view: function() {
					if (this.__view__ == undefined)
						return false;
					else
						return this.__view__;
				},
				
				/**
				Gibt eine Referenz auf den Controller-Manager der aktuellen Komponente zur&uuml;ck.
				Damit auch Event-Handler Methoden eines Controllers wiederverwendet werden k&ouml;nnen, ist es m&ouml;glich mehr als einen Controller in einer Komponente zu gegistrieren.
				
				@method controller
				@return {Object} Referenz auf den Controller-Manager der Komponente.
				**/
				controller: function() {
					if (this.__controller__ == undefined)
						return false;
					else
						return this.__controller__;
				},
				
				/**
				Setzt eine beliebige Konfiguration im Model der der Komponente.
				
				@method config
				@param {Object} config Objekt mit Konfigurations-Parametern.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				config: function(config, value) {
					
					if (config && value) {
						
						this.model().data[config] = value;
						this.trigger("update", this.config());
						
					}else{
						
						if (config) {
							
							$.extend(true, this.model().data, config);
							this.trigger("update", this.config());
						
						} else {
							
							return this.model().data;
							
						}
						
					}
					
					return this;
				},
				
				/**
				Setzt die Referenz auf die &uuml;bergeordnete Komponente.
				
				@method parent
				@param {Object} parent Referenz auf die &uuml;bergeordnete Komponente.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				parent: function(parent) {
					
					if (parent) {
						this.__cfg__.parent = parent;
						return this;
					}else{
						return this.__cfg__.parent;
					}
					
				},
				
				readyToShow: function(c) {
					if(this.__cfg__.initialized) this.__cfg__.initialized = [];
					this.__cfg__.initialized.push(c);
					
					return this;
				},

				showComplete: function(c) {
					if (!this.__cfg__.rendered) this.__cfg__.rendered = [];
					this.__cfg__.rendered.push(c);
					
					return this;
				},
				
				eventsManager: function(eventsManager) {
					eventsManager.cmp(this);
					this.events = eventsManager;
				},
				
				/**
				...
				
				@method addModel
				@param {Object} m ...
				@return {Object} ...
				@chainable
				**/
				addModel: function(m) {
					
					this.__model__ = new m;
					this.__model__.__controller__ = this.__controller__;
					if (typeof this.__model__.data === 'undefined') 
						this.__model__.data = {};
					
					//
					// Set events manager
					
					var eventsManager = new jsCow.res.core.events.eventsManager;
					eventsManager.cmp(this);
					eventsManager.parent(this.__model__);
					this.__model__.events = eventsManager;

					$.extend(true, this.__model__,  {
						
						reset: function(index) {
							
							if (index) {
								
								if (this.data[index]) {
									if (typeof this.data[index] === 'object') this.data[index] = {};
									if (typeof this.data[index] === 'string') this.data[index] = "";
									if (this.data[index] instanceof Array) this.data[index] = [];
								}
								
							}else{
								
								if (typeof this.data === 'object') this.data = {};
								if (typeof this.data === 'string') this.data = "";
								if (this.data instanceof Array) this.data = [];
								
							}
							
							return this;
						},
						
						update: function(e) {
							
							this.data = $.extend(true, this.data, e.data);
							this.trigger("update", this.data);
							
							return this;
							
						},
						
						/**
						...
						
						@method id
						@return {Object} ...
						**/
						id: function(id) {
							if (id) {
								this.__id__ = id;
								
								return this;
							}else{
								return this.__id__;
							}
						},
						
						on: function(event, handler, local) {
							this.events.on(event, handler, local);
							
							return this;
						},
						
						trigger: function(event, data, local) {
							this.events.trigger(event, data, local);
							
							return this;
						},
						
						bubbleIn: function(event, data, local) {
							this.events.bubbleIn(event, data, local);
							
							return this;
						},
						
						bubbleOut: function(event, data, local) {
							this.events.bubbleOut(event, data, local);
							
							return this;
						},
						
						bubble: function(event, data, local) {
							this.events.bubble(event, data, local);
							
							return this;
						}
						
					});
					
					this.__model__.id('m' + ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 18));
					
					//
					// The init method will be called the model init method by event 
					
					this.__model__.on( "controller.init",  this.__model__.init);
					this.__model__.on( "model.update",  this.__model__.update);
					
					
					return this;
				},
				
				/**
				Registriert den Default-View f&uuml;r die aktuelle Komponente.
				
				@method addView
				@for cmp
				@param {Object} v Referenz auf den im Framework registrierte View-Klasse.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				addView: function(v) {
					this.__view__.add(v);
					
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
				
				@method addController
				@param {Object} c Referenz auf die im Framework registrierte Controller-Klasse.
				@return {Object} Referenz der aktuellen Komponente.
				@chainable
				**/
				addController: function(c) {
					this.__controller__.add(c);
					
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
					
				cfg: function(option, value) {
					
					if (option && value) {
						
						// Set value by option
						if (this.__cfg__[option] == undefined) this.__cfg__[option] = false;
						this.__cfg__[option] = value;
						
						return this;
						
					}else if (option && !value) {
						
						if (typeof option == 'object') {
							$.extend(true, this.__cfg__, option);
						}
						
						return this;
						
					}else{
						return this.__cfg__;
					}
					
				},
				
				on: function(event, handler, local) {
					
					if (typeof this.events.on !== 'undefined') {
						this.events.on(event, handler, local);
					}
					
					return this;
				},
				
				trigger: function(event, data, local) {
					
					if (typeof this.events.trigger !== 'undefined') {
						this.events.trigger(event, data, local);
					}
					
					return this;
				},
				
				bubbleIn: function(event, data, local) {
					
					if (typeof this.events.bubbleIn !== 'undefined') {
						this.events.bubbleIn(event, data, local);
					}

					return this;
				},
				
				bubbleOut: function(event, data, local) {
					
					if (typeof this.events.bubbleOut !== 'undefined') {
						this.events.bubbleOut(event, data, local);
					}

					return this;
				},
				
				bubble: function(event, data, local) {
					
					if (typeof this.events.bubble !== 'undefined') {
						this.events.bubble(event, data, local);
					}

					return this;
				},
				
				// 
				// ===== Methods to trigger component actions manually =====
				
				/**
				...
				
				@method isEnabled
				@return {Boolean} ...
				**/
				isEnabled: function() {

					var c = this.config();
					
					if ( c.enabled === false || typeof c.enabled === 'undefined' ) {
						return false;
					} else {
						return true;
					}

				},

				/**
				...
				
				@method disable
				@return {Object} ...
				@chainable
				**/
				disable: function(bubble) {
					
					if ( typeof bubble !== 'undefined' && bubble ) {
						this.bubbleIn("disable", {
							__forcedEnable__: true
						});
					} else {
						this.trigger("disable", {
							__forcedEnable__: true
						});
					}
					
					return this;
				},
				
				/**
				...
				
				@method enable
				@return {Object} ...
				@chainable
				**/
				enable: function(bubble) {
					
					if ( typeof bubble !== 'undefined' && bubble ) {
						this.bubbleIn("enable", {
							__forcedEnable__: true
						});
					} else {
						this.trigger("enable", {
							__forcedEnable__: true
						});
					}
					
					return this;
				},
				
				/**
				...
				
				@method show
				@return {Object} ...
				@chainable
				**/
				show: function() {
					
					this.config({
						visible: true
					});
					
					return this;
				},
				
				/**
				...
				
				@method hide
				@return {Object} ...
				@chainable
				**/
				hide: function() {
					
					this.config({
						visible: false
					});
					
					return this;
				},
				
				/**
				...
				
				@method update
				@return {Object} ...
				@chainable
				**/
				update: function() {
					
					this.trigger("update");
					
					return this;
				},
				
				/**
				...
				
				@method focus
				@return {Object} ...
				@chainable
				**/
				focus: function() {
					
					this.events.trigger("focus");
					
					return this;
				}
				
			});
				
			//
			// Predefine default variables
			c.defineVariables();
		
			
			// 
			// Current object index
			var cIndex = jsCow.componentsObjectList.length; 
			

			//
			// Set a unique id for the new component
			
			c.id( 'c_' + cIndex + "_" + ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 18) );
			

			//
			// Set events manager
			
			var eventsManager = new jsCow.res.core.events.eventsManager;
			eventsManager.cmp(c);
			eventsManager.parent(c);
			c.events = eventsManager;
			

			//
			// Set all predefined component configuration parameter
			c.on("model.ready", function(e) {
				
				//
				// Set predefined model data
				if ( !$.isEmptyObject( e.sender.__preConfig__.model ) ) {
					e.sender.config( e.sender.__preConfig__.model );
				}
				
				//
				// Call predefined component methods
				$.each(this.__preConfig__, (function(self) {
					return function(i, args) {
						if ( typeof self[i] !== 'undefined' ) {
							
							if ( i !== 'model' ) {
								
								if (args instanceof Array) {
									self[i].apply(self, args);
								}else{
									self[i].apply(self, [args]);
								}
								
							}
							
						} else if ( i !== 'model' ) {
							
							console.warn("Configuration parameter could not be set. The method '"+ i +"' doesn't exists for component '"+self.id()+"'!");

						}
						
					};
				})(this));
				
			});
			
			
			//
			// Set controller handler
			
			var controllerHandler = new jsCow.res.core.mvc.controllerHandler;
			controllerHandler.events = c.events;
			controllerHandler.__cmp__ = c;
			c.__controller__ = controllerHandler;
			
			
			//
			// Set view handler
			
			var viewsManager = new jsCow.res.core.mvc.viewsManager;
			viewsManager.__cmp__ = c;
			c.__view__ = viewsManager;
			
			
			//
			// Create new placeholder
			c.createPlaceholder(cIndex);
			
			
			//
			// Component initialization
			c.init();
			
			
			jsCow.componentsObjectList[cIndex] = c;
			
			c = null;
			delete c;
			
			return jsCow.componentsObjectList[cIndex];
			
		} else {
			
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
		if (typeof cid === 'object') var cid = cid.id();
		
		var foundCmp = false;
		$.each(jsCow.componentsObjectList, function(i, c) {
			if (c.id() == cid) {
				foundCmp = c;
			}
		});
		
		return foundCmp;
	}
	
}

jsCow.components = new component();
