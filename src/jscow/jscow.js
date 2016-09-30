/*
 * jsCow - JavaScript Component Framework v3.1.0
 * https://github.com/jsCow/jscow
 * 
 * Released under the GNU GENERAL PUBLIC LICENSE
 * https://github.com/jsCow/jscow/blob/master/LICENSE
 */

/**
Core class of the jsCow framework.

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

if (typeof module !== 'undefined' && !!module.exports) {
	var exports = module.exports = {
		"jsCow": jsCow
	};
}

( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jsCow requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {



});

(function (root, factory) {

	"use strict";
	
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['b'], function (b) {
            return (root.returnExportsGlobal = factory(b));
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('b'));
    } else {
        // Browser globals
        root.returnExportsGlobal = factory(root.b);
    }
}(this, function (b) {
    //use b in some fashion.

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));