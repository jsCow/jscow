/*
 * jsCow - Events Manager Extension - JavaScript Component Framework
 * https://github.com/jsCow/jscow
 * 
 * Released under the GNU GENERAL PUBLIC LICENSE
 * https://github.com/jsCow/jscow/blob/master/LICENSE
 */

/**
  * Events manager class for the jsCow framework.
  * @class jsCow.res.core.events.eventsManager
  * @constructor 
  */

jsCow.res.core.events.eventsManager = function() {
	

	this.__cfg__ = false;
	
	/**
	  * Reference to a registered component instance
	  * @property __cmp__
	  * @type Object
	  * @default false
	  */
	this.__cmp__ = false;
	
	/**
	  * Reference to the current component instance
	  * @property parentClass
	  * @type Object
	  * @default false
	  */
	this.parentClass = false;
	
};
jsCow.res.core.events.eventsManager.prototype = {
	
	/**
	  * Get the current component instance
	  * @method cmp
	  * @param {Object} cmp Reference to the component instance.
	  * @return {Object} Returns the component instance.  
	  * @chainable
	  */
	cmp: function(cmp) {
		if (cmp !== undefined) {
			this.__cmp__ = cmp;
			return this;
		}else{
			return this.__cmp__;
		}
	},

	/**
	  * Returns true|false whether the current event is s local event or not.
	  * @method isNot
	  * @param {Boolean} local true|false 
	  * @return {Object} Returns true|false whether the current event is s local event or not.  
	  */
	isNot: function(local) {
		if (local) {
			return false;
		} else {
			return true;
		}
	},
	
	/**
	  * Get the reference to the current component instance.
	  * @method parent
	  * @param {Boolean} parentClass Reference to the current component instance to set the parent.
	  * @return {Object} Returns the reference to the current event handler.  
	  * @chainable
	  */
	parent: function(parentClass) {
		if (parentClass !== undefined) {
			this.parentClass = parentClass;
			return this;
		}else{
			return this.parentClass;
		}
	},
	
	/**
	  * Attach an event handler function for an event.
	  * @method on
	  * @param {String} event Defines the name of the attached event 
	  * @param {Function} h Defines the handler function for the attached event.
	  * @param {Boolean} l Defines the type (local or global) of the event.
	  * @return {Object} Returns the reference to the current event handler.  
	  * @chainable
	  */
	on: function(event, h, l) {
		
		var handler = h;
		var local = l;

		if (handler === undefined) {
			handler = false;
		}
		var sender = this.cmp();
		var parentClass = this.parentClass;
		if (typeof local === 'undefined' || local === true) {
			local = true; 
		} else { 
			local = false;
		}

		if (event !== undefined && sender) {
			
			if (typeof handler === "function") {
				
				if (jsCow.events[event] === undefined) {
					jsCow.events[event] = Array();
				}

				jsCow.events[event].push({
					event: event,
					handler: handler,
					sender: sender,
					that: parentClass,
					local: local
				});
				
			}else{
				if (jsCow.debug.events) {
					console.warn("There is not defined a handler method for event '" + event + "' in '"+this.cmp().id()+"'. The event trigger will be ignored!");
				}
			}
			
		}else{
			console.error("There have to be defined an event name for the event listener in '"+this.cmp().id()+"'!");
		}
		
		return this;
	},
	
	/**
	  * Detach an event of a component.
	  * @method off
	  * @param {String} event Defines the name of the attached event 
	  * @param {Object} cmp Reference to the component instance.  
	  * @chainable
	  */
	off: function(event, cmp) {
		if (jsCow.events[event]) {
			$.each(jsCow.events[event], function(i,evt) {
				if (jsCow.events[event][i].getID() === cmp.getID()) {
					jsCow.events[event][i].slice(i,1);
				}
			});
		}

		return this;
	},
	
	/**
	  * Trigger an attached event.
	  * @method trigger
	  * @param {String} event Defines the name of the attached event 
	  * @param {Object} d Defines the event data by trigger the attached event.
	  * @param {Boolean} l Defines the type (local or global) of the event.
	  * @return {Object} Returns the reference to the current event handler.  
	  * @chainable
	  */
	trigger: function (event, d, l) {
		
		var config = this.cmp().config();
		var data = d;
		var local = l;

		if (typeof d === 'undefined' || !d) {
			data = config;
		}else if (typeof d === 'object') {
			data = d;
		}else{
			data = {};
		}
		
		if (data) {
			
			var self = this;
			
			if (typeof local === 'undefined' || !local) {
				local = this.cmp(); 
			} else {
				local = false;
			}

			if (jsCow.events[event] !== undefined) {
				$.each(jsCow.events[event], (function(self, event, data, local) {
					return function (i, e) {
						
						if (typeof local === "object" && local.id() === e.sender.id() && e.local) {
							
							setTimeout(
								function() {
									
									if (jsCow.debug.events) {
										console.log("local :: trigger event ", "'"+e.event+"'", "from", "'"+self.cmp().id()+"' for '"+e.that.id()+"'.");
									}

									e.handler.apply(e.that, [{ 
										data: data,
										sender: self.cmp(),
										date: new Date()
									}]);
								}, 0
							);
							
						} else if (self.isNot(local) === e.local) {
							
							setTimeout(
								function() {
									
									if (jsCow.debug.events) {
										console.log("global :: trigger even", "'"+e.event+"'", "from", "'"+self.cmp().id()+"' for '"+e.that.id()+"'.");
									}

									e.handler.apply(e.that, [{ 
										data: data,
										sender: self.cmp(),
										date: new Date()
									}]);

								}, 0
							);
							
						}
						
					};
				})(self, event, data, local));
			}
			
		}
		
		return this;
	},
	
	/**
	  * Triggers an event bubbling upward in the component hirarchy. 
	  * @method bubbleOut
	  * @param {String} event Defines the name of the attached event 
	  * @param {Object} data Defines the event data by trigger the attached event.
	  * @param {Boolean} local Defines the type (local or global) of the event.
	  */
	bubbleOut: function (event, data, local) {
		
		// trigger event in current component
		var bubble = this.bubbleTrigger(event, data, local);
		
		// Next Event bubbling
		if (bubble) {
			if (this.cmp().parent()) { 
				this.cmp().parent().bubbleOut(event, data, local);
			}
		}
		
	},
	
	/**
	  * Triggers an event bubbling down into the component hirarchy. 
	  * @method bubbleIn
	  * @param {String} event Defines the name of the attached event 
	  * @param {Object} data Defines the event data by trigger the attached event.
	  * @param {Boolean} local Defines the type (local or global) of the event.
	  */
	bubbleIn: function (event, data, local) {
		
		// trigger event in current component
		var bubble = this.bubbleTrigger(event, data, local);
		
		// Next Event bubbling - down
		if (bubble) {
			if (this.cmp().children().length > 0) {
				var children = this.cmp().children();
				
				$.each(children, (function(self) {
					return function(i,c) {
						c.bubbleIn(event, data, local);
					};
				})(this));

			}
		}
		
	},

	/**
	  * Triggers an event bubbling upwards and also down into the component hirarchy. 
	  * @method bubble
	  * @param {String} event Defines the name of the attached event 
	  * @param {Object} data Defines the event data by trigger the attached event.
	  * @param {Boolean} local Defines the type (local or global) of the event.
	  */
	bubble: function (event, data, local) {
		
		// trigger event in current component
		var bubble = this.bubbleTrigger(event, data, local);
		
		if (bubble) {
			
			// Next Event bubbling - up
			this.bubbleOut(event, data, local);
			
			// Next Event bubbling - down
			this.bubbleIn(event, data, local);
			
		}
		
	},
	
	/**
	  * Triggers all event bubblings in the event handler. 
	  * @method bubbleTrigger
	  * @param {String} event Defines the name of the attached event 
	  * @param {Object} data Defines the event data by trigger the attached event.
	  * @param {Boolean} local Defines the type (local or global) of the event.
	  */
	bubbleTrigger: function (event, data, local) {
		var bubble = true;
		
		this.trigger(event, data, local);
		
		return bubble;
	}
	
};