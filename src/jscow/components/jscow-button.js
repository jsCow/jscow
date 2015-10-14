
jsCow.res.components.button = function() {};
jsCow.res.components.button.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.button);
		this.addModel(jsCow.res.model.button);
		this.addView(jsCow.res.view.button);
		
		return this;
	},
	
	text: function(text) {
		
		if (typeof text !== 'undefined' && typeof text === 'string') {
			this.trigger('text', {
				text: text
			});
		}
		
		return this;
	},
	
	collapse: function() {
		
		this.trigger('collapse');
		
		return this;
	},
	
	open: function() {
		
		this.trigger('open');
		
		return this;
	},
	
	toggle: function() {
		
		this.trigger('toggle');
		
		return this;
	},
	
	icon: function(o) {
		
		var options;

		if ( typeof o === 'undefined') {

			options = false;

		} else if ( typeof o === 'object') {

			options = $.extend(true, {
				direction: 'l',
				name: 'user',
				prefix: 'fa fa-'
			}, o);

		}

		this.trigger('icon', {
			icon: options
		});
		
		return this;
	}
	
};

jsCow.res.model.button = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		text: "",
		collapsed: false
	};
	
};
jsCow.res.model.button.prototype = {

	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.button = function() {
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-btn');

	// not needed for buttons
	//this.dom.content = $('<div/>').addClass('jsc-btn-content clearfix').appendTo(this.dom.main);
	
};
jsCow.res.view.button.prototype = {
	
	init: function(e) {
		
		// Hover
		this.dom.main.hover(
			
			(function(self, e) {
				return function() {
					if (e.data.enabled) {
						self.dom.main.addClass('jsc-btn-hover');
						self.trigger("mouseover");
					}
				};
			})(this, e),
			
			(function(self, e) {
				return function() {
					if (e.data.enabled) {
						self.dom.main.removeClass('jsc-btn-hover');
						self.trigger("mouseout");
					}
				};
			})(this, e)
			
		).mousedown( 
			
			(function(self, e) {
				return function() {
					if (e.data.enabled) {
						self.dom.main.addClass('jsc-btn-press');
						self.trigger("press");
					}
				};
			})(this, e)
			
		).mouseup( 
			
			(function(self, e) {
				return function() {
					if (e.data.enabled) {
						self.dom.main.removeClass('jsc-btn-press');
						self.trigger("pressed");
					}
				};
			})(this, e)
			
		).click( 
			
			(function(self, e) {
				return function() {
					if (e.data.enabled) {
						self.dom.main.removeClass('jsc-btn-press');
						self.trigger("click");
					}
				};
			})(this, e)
			
		);
		
		this.dom.text = $('<span/>').appendTo( this.dom.main );
		this.dom.icon = $('<i/>');

		this.trigger("view.update", e.data);
	},
	
	update: function(e) {	
		
		if (e.data.enabled) {
			
			this.dom.main
				.removeClass('jsc-btn-disabled')
				.addClass('jsc-btn');
			
			if (!e.data.text || e.data.text === '') {
				this.dom.text
					.addClass('hidden');
			} else {
				this.dom.text
					.html(e.data.text)
					.removeClass('hidden')
					.show();
			}
			
			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
			if (e.data.icon) {
				this.dom.icon
					.addClass(e.data.icon.prefix+''+e.data.icon.name);
				
				switch (e.data.icon.direction) {
					
					case 'l':
						this.dom.text.before(this.dom.icon);
						break;
					case 'r':
						this.dom.text.after(this.dom.icon);
						break;
						
					default:
						this.dom.text.before(this.dom.icon);
						break;

				}

			}else{
				
			}
			
		}else{
			
			this.dom.main
				.removeClass('jsc-btn')
				.addClass('jsc-btn-disabled');
			
		}
	}
	
};

jsCow.res.controller.button = function() {};
jsCow.res.controller.button.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("text", this.text);
		this.on("icon", this.icon);
	},
	
	isModelReady: function() {
		this.trigger(
			"view.init", 
			this.cmp().config()
		);
	},
	
	text: function(e) {
		this.cmp().config({
			text: e.data.text
		});
	},
	
	icon: function(e) {
		this.cmp().config({
			icon: e.data.icon
		});
	}
	
};
