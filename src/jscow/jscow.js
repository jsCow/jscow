/*
jsCow - JavaScript Component Framework
http://www.jscow.de
Author: Mario Linz
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
			version: '2.0.0',
			url: {
				base: ''
			},
			zIndex: 1
		};
		
		/**
		Liste aller im Framework registrierten Komponenten.
		
		@property componentsObjectList
		@type Object
		@default "[]"
		**/
		this.componentsObjectList = [];
		
		/**
		Objekt in dem die einzelnen Komponenten-Klassen registriert und abgelegt werden k&ouml;nnen.
		
		@property res
		@type Object
		@default "{
			components: {},
			model: {},
			view: {},
			controller: {}
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
			core: {
				mvc: {},
				events: {}
			},
			components : {},
			model : {},
			view : {},
			controller : {}
		};
		
		this.events = {};
		this.cache = {};
		
		this.debug = {
			events: false,
			controller: false,
			model: false,
			view: false
		};
		
	};
	
	jsCowBase.prototype = {
		
		/**
		Gibt den n&auml;chst h&ouml;heren z-Index als Zahl zur&uuml;ck.
		
		@method getNextZIndex
		@return {Int} H&ouml;chsten z-Index als Zahl.
		**/
		nextZIndex: function() {
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
		cache: function(index, value) {
			
			if (index && value) {
			
				if (this.cache[index] === undefined) {
					this.cache[index] = false;
				}

				this.cache[index] = value;
				
			}else{
				if (!index) {
					return this.cache;
				} else if (this.cache[index]) {
					return this.cache[index];
				}
			}
			
			return this;
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
		...
		
		@method get
		@param {Object} ...
		@return {Object} ...
		@chainable
		**/
		get: function(cmp, preConfig) {
			return this.components.get(cmp, preConfig);
		},
		
		/**
		...
		
		@method find
		@param {Object} ...
		@return {Object} ...
		@chainable
		**/
		find: function(cmp) {
			return this.components.find(cmp);
		}
		
	};
	
	return new jsCowBase();
	
})();
