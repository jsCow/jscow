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
