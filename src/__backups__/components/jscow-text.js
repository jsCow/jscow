
jsCow.res.components.text = function() { };
jsCow.res.components.text.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.text);
		this.addModel(jsCow.res.model.text);
		this.addView(jsCow.res.view.text);
		
		return this;
	},
	
	text: function(text, wrapper) {
		
		if (typeof text !== 'undefined' && typeof text === 'string') {
			
			if (typeof wrapper === 'undefined') {
				wrapper = false;
			}
			
			this.trigger('text', {
				text: text,
				wrapper: wrapper
			});
			
		}
		
		return this;
	}
	
};

jsCow.res.model.text = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		text: "",
		wrapper: false
	};
	
};
jsCow.res.model.text.prototype = {

	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.text = function() {
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-text clearfix');
	this.dom.text = $('<div/>').appendTo(this.dom.main);

	//
	// Content not needed for this component
	//this.dom.content = $('<div/>').addClass('jsc-text-content clearfix').appendTo(this.dom.main);
	
};
jsCow.res.view.text.prototype = {
	
	init: function(e) {
		this.trigger("view.update", e.data);
	},
	
	update: function(e) {	
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-text-disabled').addClass('jsc-text');
			
			if (!e.data.wrapper) {
				this.dom.text.html(e.data.text);
			}else{
				this.dom.text.html('<'+e.data.wrapper+'>' + e.data.text + '</'+e.data.wrapper+'>');
			}
			
			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-text').addClass('jsc-text-disabled');
			
		}
		
	}
	
};

jsCow.res.controller.text = function() {};
jsCow.res.controller.text.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("text", this.text);
	},
	
	isModelReady: function() {
		this.trigger(
			"view.init", 
			this.cmp().config()
		);
	},
	
	text: function(e) {
		
		this.cmp().config({
			text: e.data.text,
			wrapper: e.data.wrapper
		});
		
	}
	
};
