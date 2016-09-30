/*
 * jsCow - JavaScript Component Framework v2.0.5
 * https://github.com/jsCow/jscow
 * 
 * Released under the GNU GENERAL PUBLIC LICENSE
 * https://github.com/jsCow/jscow/blob/master/LICENSE
 */

/**
  * Core class for the jsCow framework.
  * @class jsCow
  * @constructor 
  */

$ = require('jquery');

jsCow = (function() {
	
	var jsCowBase = function() {
		
		/**
		  * Default core setup variables
		  * @property config
		  * @type Object
		  * @default "{
				version: '2.0.5',
				url: {
					base: ''
				},
				zIndex: 1
			}"
		  */
		this.config = {
			version: '2.0.5',
			url: {
				base: ''
			},
			zIndex: 1
		};
		
		/**
		  * List of all registered component instances
		  * @property componentsObjectList
		  * @type Object
		  * @default "[]"
		  */
		this.componentsObjectList = [];
		
		/**
		  * Object for all references to component resources
		  * @property res
		  * @type Object
		  * @default "{
				components: {},
				model: {},
				view: {},
				controller: {}
			}"
		  * @example
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
		 */
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
		
		/**
		  * Object for all registered events
		  * @property events
		  * @type Object
		  * @default "{}"
		  */
		this.events = {};
		
		/**
		  * Object for all registered cached objects or variables
		  * @property cache
		  * @type Object
		  * @default "{}"
		  */
		this.cache = {};
		
		/**
		  * Object with global debug settings
		  * @property debug
		  * @type Object
		  * @default "{
				events: false,
				controller: false,
				model: false,
				view: false
			}"
		  */
		this.debug = {
			events: false,
			controller: false,
			model: false,
			view: false
		};
		
	};
	
	jsCowBase.prototype = {
		
		/**
		  * Get the next higher z-index
		  * @method getNextZIndex
		  * @return {int} next higher z-index as an integer.
		  */
		nextZIndex: function() {
			this.config.zIndex++;
			return this.config.zIndex;
		},
		
		/**
		  * Get an cached object from the cache property or set a value to the cache property
		  * @method cache
		  * @param {String} index Index or name of the set value.
		  * @param {Object} value Value, which is to be stored.
		  * @return {Object} Returns the value for the defined index.  
		  * @chainable
		  */
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
		  * Remove a specific value within the cache property
		  * @method removeCache
		  * @param {String} index Defines the index of the cached value.
		  * @return {Object} Reference to the core instance of jsCow.
		  * @chainable
		  */
		removeCache: function(index) {
			delete this.cache[index];
			
			return this;
		},
		
		/**
		  * Get a new component instance
		  * @method get
		  * @param {String} cmp Reference to the component resource.
		  * @param {Object} preConfig Default configuration for the new component instance.
		  * @return {Object} Return the new component instance.
		  */
		get: function(cmp, preConfig) {
			return this.components.get(cmp, preConfig);
		},
		
		/**
		  * Find an registered component instance
		  * @method find
		  * @param {String} cmp Id of the component instance or instance object.
		  * @return {Object} Return the found component instance.
		  */
		find: function(cmp) {
			return this.components.find(cmp);
		}
		
	};
	
	return new jsCowBase();
	
})();

/* Module Export of the global jsCow object */
if (typeof module !== 'undefined' && !!module.exports) {
	var exports = module.exports = {
		"jsCow": jsCow
	};
}
