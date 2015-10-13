
jsCow.res.components.textarea = function() {};
jsCow.res.components.textarea.prototype = {
	
	init: function() {
		
		this.addController(jsCow.res.controller.textarea);
		this.addModel(jsCow.res.model.textarea);
		this.addView(jsCow.res.view.textarea);
		
		return this;
	},
	
	value: function(value) {
		
		if ( typeof value !== 'undefined' ) {
			
			this.trigger('value', {
				value: value
			});
			
		} else {
			
			var cfg = this.config();
			return cfg.value;
			
		}
		
		return this;
	},
	
	info: function() {
		
		this.trigger('state', {
			state: 'info'
		});
		
		return this;
	},
	
	success: function() {
		
		this.trigger('state', {
			state: 'success'
		});
		
		return this;
	},
	
	warning: function() {
		
		this.trigger('state', {
			state: 'warning'
		});
		
		return this;
	},
	
	danger: function() {
		
		this.trigger('state', {
			state: 'danger'
		});
		
		return this;
	},
	
	standard: function() {
		
		this.trigger('state', {
			state: false
		});
		
		return this;
	},
	
	cols: function(cols) {
		
		this.trigger('cols', {
			cols: cols
		});
		
		return this;
	}
	
};

jsCow.res.model.textarea = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		value: "",
		type: "text",
		state: false,
		cols: 5
	};
	
};
jsCow.res.model.textarea.prototype = {
	
	init: function(e) {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.textarea = function() {
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-form-textarea');
	this.dom.field = $('<textarea/>').addClass('jsc-form-textarea-field').appendTo(this.dom.main);
	
	// Not neded fpr this component
	// this.dom.content = $('<div/>').addClass('jsc-textarea-content').appendTo(this.dom.main);
	
};
jsCow.res.view.textarea.prototype = {
	
	init: function(e) {	
		
		this.dom.main.keyup(
			
			(function(self, e) {
				return function() {
					if (e.data.enabled) {
						self.trigger("keyup", {
							value: self.dom.field.val()
						});
					}
				}
			})(this, e)
			
		).keydown(
			
			(function(self, e) {
				return function() {
					if (e.data.enabled) {
						self.trigger("keydown", {
							value: self.dom.field.val()
						});
					}
				}
			})(this, e)
			
		);
		
	},
	
	update: function(e) {	
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-form-textarea-disabled');
			this.dom.field.prop('disabled', false);
			
			this.dom.field
				.attr('cols', e.data.cols)
				.val(e.data.value);
				
			if (e.data.state === 'info' || 
				e.data.state === 'success' || 
				e.data.state === 'warning' || 
				e.data.state === 'danger' ) {
				this.dom.main.removeClass('jsc-form-textarea-info jsc-form-textarea-success jsc-form-textarea-warning jsc-form-textarea-danger');
				this.dom.main.addClass('jsc-form-textarea-'+e.data.state);
			} else {
				this.dom.main.removeClass('jsc-form-textarea-info jsc-form-textarea-success jsc-form-textarea-warning jsc-form-textarea-danger');
			}
			
			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.addClass('jsc-form-textarea-disabled');
			this.dom.field.prop('disabled', true);
			
		}
		
	}
	
};

jsCow.res.controller.textarea = function() {};
jsCow.res.controller.textarea.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("value", this.value);
		this.on("state", this.state);
		this.on("change", this.change);
		this.on("keyup", this.change);
		this.on("keydown", this.change);
		this.on("cols", this.cols);
	},
	
	isModelReady: function() {
		this.trigger("view.init", this.cmp().config());
	},
	
	value: function(e) {
		this.cmp().config({
			value: e.data.value
		});
	},
	
	state: function(e) {
		this.cmp().config({
			state: e.data.state
		});
	},
	
	change: function(e) {
		this.cmp().config({
			value: e.data.value
		});
	},
	
	cols: function(e) {
		this.cmp().config({
			cols: e.data.cols
		});
	}
	
};
