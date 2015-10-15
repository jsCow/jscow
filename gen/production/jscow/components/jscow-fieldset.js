
jsCow.res.components.fieldset = function() { };
jsCow.res.components.fieldset.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.fieldset);
		this.addModel(jsCow.res.model.fieldset);
		this.addView(jsCow.res.view.fieldset);
		
		return this;
	},
	
	title: function(title) {
		
		if (typeof title !== 'undefined' && typeof title === 'string') {
			this.trigger('title', {
				title: title
			});
		}
		
		return this;
	}

};

jsCow.res.model.fieldset = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		title: ""
	};
	
};
jsCow.res.model.fieldset.prototype = {

	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.fieldset = function() {
	
	this.dom = {};
	this.dom.main = $('<fieldset/>').addClass('jsc-fieldset clearfix');
	this.dom.title = $('<legend/>').addClass('jsc-fieldset-legend clearfix');
	this.dom.content = $('<div/>').addClass('jsc-fieldset-content clearfix').appendTo(this.dom.main);
	
};
jsCow.res.view.fieldset.prototype = {
	
	init: function(e) {
		
		this.trigger("view.update", e.data);
		
		if (e.data.title !== "") {
			this.dom.title.show();
		} else {
			this.dom.title.hide();
		}
		
	},
	
	update: function(e) {	
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-fieldset-disabled').addClass('jsc-fieldset');
			
			if (e.data.title !== "") {
				this.dom.title.html(e.data.title).show();
			} else {
				this.dom.title.html(e.data.title).hide();
			}
			
			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-fieldset').addClass('jsc-fieldset-disabled');
			
		}
		
	}
	
};

jsCow.res.controller.fieldset = function() {};
jsCow.res.controller.fieldset.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("title", this.title);
	},
	
	isModelReady: function() {
		this.trigger(
			"view.init", 
			this.cmp().config()
		);
	},
	
	title: function(e) {
		this.cmp().config({
			title: e.data.title
		});
	}
	
};
