jsCow.res.core.events.eventsManager = function() {
	
	this.__cfg__ = false;
	this.__cmp__ = false;
	this.parentClass = false;
	
};
jsCow.res.core.events.eventsManager.prototype = {
	
	cmp: function(cmp) {
		if (cmp !== undefined) {
			this.__cmp__ = cmp;
			return this;
		}else{
			return this.__cmp__;
		}
	},

	isNot: function(local) {
		if (local) {
			return false;
		} else {
			return true;
		}
	},
	
	parent: function(parentClass) {
		if (parentClass !== undefined) {
			this.parentClass = parentClass;
			return this;
		}else{
			return this.parentClass;
		}
	},
	
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
	
	off: function(event, cmp) {
		if (jsCow.events[event]) {
			$.each(jsCow.events[event], function(i,evt) {
				if (jsCow.events[event][i].getID() === cmp.getID()) {
					jsCow.events[event][i].slice(i,1);
				}
			});
		}
	},
	
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
	
	bubbleTrigger: function (event, data, local) {
		var bubble = true;
		
		this.trigger(event, data, local);
		
		return bubble;
	}
	
};