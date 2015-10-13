
jsCow.res.components.checkbox = function() {};
jsCow.res.components.checkbox.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.checkbox);
		this.addModel(jsCow.res.model.checkbox);
		this.addView(jsCow.res.view.checkbox);
		
		return this;
	},
	
	checked: function() {
		this.trigger('checked');
	},
	
	unchecked: function() {
		this.trigger('unchecked');
	},
	
	toggle: function() {
		this.trigger('toggle');
	},
	
	isChecked: function() {
		var c = this.config();
		return c.checked;
	}
	
};

jsCow.res.model.checkbox = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		checked: false,
		value: false,
		label: false
	}

};
jsCow.res.model.checkbox.prototype = {
	
	init: function(e) {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.checkbox = function() {
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-form-checkbox');
	
	this.dom.box = $('<div/>').addClass('jsc-form-checkbox-box').appendTo(this.dom.main);
	this.dom.check = $('<div/>').addClass('jsc-form-checkbox-check').appendTo(this.dom.box);
	this.dom.label = $('<div/>').addClass('jsc-form-checkbox-label');
		
	this.dom.content = $('<div/>').addClass('jsc-form-checkbox-content').appendTo(this.dom.main);

};
jsCow.res.view.checkbox.prototype = {
	
	init: function(e) {	
		
		this.dom.main.click((function(self, e) {
			return function() {
				if (e.data.enabled) {
					self.trigger("toggle");
				}
			}
		})(this, e));
		
	},

	update: function(e) {
		
		if (e.data.enabled) {
			
			this.dom.main
				.removeClass('jsc-form-checkbox-disabled')
				.addClass('jsc-form-checkbox');

			if (e.data.label !== "") {
				this.dom.label.html(e.data.label).removeClass("hidden");
				this.dom.box.after(this.dom.label);
			} else {
				this.dom.label.html(e.data.label).addClass("hidden");
			}
			
			if (e.data.checked) {
				this.dom.check.css({display:'block'});
			} else {
				this.dom.check.css({display:'none'});
			}

			if (e.data.visible) {
				this.dom.main.show();
			} else {
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main
				.removeClass('jsc-form-checkbox')
				.addClass('jsc-form-checkbox-disabled');
			
		}
		
	}

};

jsCow.res.controller.checkbox = function() {};
jsCow.res.controller.checkbox.prototype = {
	
	init: function(e) {
		this.on("model.ready", this.isModelReady);
		this.on("checked", this.checked);
		this.on("unchecked", this.unchecked);
		this.on("toggle", this.toggle);
	},
	
	isModelReady: function(e) {
		this.trigger("view.init", this.cmp().config());
	},
	
	checked: function(e) {
		this.cmp().config({
			checked: true
		});
	},
	
	unchecked: function(e) {
		this.cmp().config({
			checked: false
		});
	},
	
	toggle: function(e) {
		
		var c = this.cmp().config();
		
		if ( c.checked ) {
			
			this.cmp().config({
				checked: false
			});
			
		} else {
			
			this.cmp().config({
				checked: true
			});
			
		}
		
	}

};
