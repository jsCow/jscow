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
	
	this.__cmp__ = false;
	this.events = false;
	
};
jsCow.res.core.mvc.controllerHandler.prototype = {

	/**
	Gibt eine liste aller vorhandenen Controller einer Komponente zur&uuml;ck.
	
	@method controllers
	@return {Object} Liste aller registrierten Controller.
	**/
	controllers: function() {
		return this.controllerList;
	},
	
	/**
	Setzt den Default-Controller einer Komponente.
	
	@method add
	@param {Object} c Referenz auf die im Framework registrierte Controller-Klasse.
	@return {Object} Gibt den registrierten Controller zur&uuml;ck.
	@chainable
	**/
	add: function(c) {
		
		/**
		Objektstuktur eines Controller mit allen grundlegenden Methoden.
		
		@class controller
		@constructor 
		*/
		$.extend(true, c.prototype,  {
			
			/**
			Gibt eine Referenz auf das Model zur&uuml;ck.
			
			@method model
			**/
			model: function() {
				return this.__model__;
			},
			
			/**
			Gibt eine Referenz auf den View-Manager der Komponente zur&uuml;ck.
			
			@method view
			**/
			view: function() {
				return this.__view__;
			},
			
			/**
			...
			
			@method cmp
			@return {Object} ...
			**/
			cmp: function() {
				return this.__cmp__;
			},
			
			/**
			...
			
			@method cmp
			@return {Object} ...
			**/
			__update__: function(e) {
				
				this.trigger("view.update", 
					this.cmp().config()
				);
				
				this.trigger("updated",
					this.cmp().config() 
				);
				
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
			
			/**
			...
			
			@method enabled
			@return {Object} ...
			**/
			enable: function(e) {
				
				var c = this.cmp().config();
				
				if ( (c.enabled === false || typeof c.enabled === 'undefined') && 
					 (!this.cmp().parent() || (this.cmp().parent() && this.cmp().parent().isEnabled())) ) {
					
					this.cmp().config({
						enabled: true
					});

					this.trigger("enabled",
						this.cmp().config(e.data) 
					);
					
					$.each(this.cmp().children(), (function(self) {
						return function(i, c) {
							
							var cfg = c.config();
							
							if ( typeof cfg.__forcedEnable__ === 'undefined' || !cfg.__forcedEnable__ ) {
								e.data.__forcedEnable__ = false;
								c.trigger("enable", e.data);
							}
							
						};
					})(this));
					
				}
				
				return this;
			},
			
			/**
			...
			
			@method disabled
			@return {Object} ...
			**/
			disable: function(e) {
				
				var c = this.cmp().config();
				
				if ( c.enabled === true && typeof c.enabled !== 'undefined' ) {
					
					this.cmp().config({
						enabled: false
					});

					this.trigger("disabled",
						this.cmp().config(e.data) 
					);
					
					$.each(this.cmp().children(), (function(self) {
						return function(i, c) {
							
							e.data.__forcedEnable__ = false;
							c.trigger("disable", e.data);
							
						};
					})(this));
					
				}
				
				return this;
			},
			
			/**
			...
			
			@method show
			@return {Object} ...
			**/
			show: function(e) {
				
				this.cmp().config({
					visible: true
				});

				this.trigger("showed",
					this.cmp().config() 
				);
				
				return this;
			},
			
			/**
			...
			
			@method hide
			@return {Object} ...
			**/
			hide: function(e) {
				
				this.cmp().config({
					visible: false
				});
				
				this.trigger("hidden",
					this.cmp().config() 
				);
				
				return this;
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

		var length = this.length();
		
		this.controllerList[length] = new c;
		this.controllerList[length].__view__ = this.cmp().view();
		this.controllerList[length].__model__ = this.cmp().model();
		this.controllerList[length].__cmp__ = this.cmp();
		this.controllerList[length].id('c' + ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 18));
		
		//
		// Set events manager
		
		var eventsManager = new jsCow.res.core.events.eventsManager;
		eventsManager.cmp(this.cmp());
		eventsManager.parent(this.controllerList[length]);
		this.controllerList[length].events = eventsManager;
		
		//
		// Register init event
		this.controllerList[length].on( "controller.init",  this.controllerList[length].init, true);
		this.controllerList[length].on( "controller.update",  this.controllerList[length].update, true);
		
		this.controllerList[length].on( "show", this.controllerList[length].show);
		this.controllerList[length].on( "hide", this.controllerList[length].hide);
		
		this.controllerList[length].on( "enable", this.controllerList[length].enable);
		this.controllerList[length].on( "disable", this.controllerList[length].disable);
		
		this.controllerList[length].on( "update", this.controllerList[length].__update__);
		
		return this;
	},
	
	/**
	Gibt die Anzahl der angelegten Controller einer Komponente zur&uuml;ck.
	
	@method length
	@for controllerHandler
	@return {Object} Anzahl der registrierten Controller zur&uuml;ck.
	**/
	length: function() {
		return this.controllerList.length;
	},
	
	/**
	...
	
	@method cmp
	@return {Object} ...
	**/
	cmp: function() {
		return this.__cmp__;
	},
	
	/**
	Entfernt einen spezifischen Controller einer Komponente.
	
	@method del
	@param {Object} c Referenz auf die Instanz des Controller.
	**/
	del: function(c) {
		
		var c = new c;
		var controllerList = this.controllers();
		
		$.each(controllerList, function(i, controller) {
			
			if (c.id() === controller.id()) {
				controllerList.splice(i,1);
			}
			
		});
		
		delete c;
		
	}
	
};
