

jsCow.res.components.buttongroup = function() {};
jsCow.res.components.buttongroup.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.buttongroup);
		this.addModel(jsCow.res.model.buttongroup);
		this.addView(jsCow.res.view.buttongroup);
		
		return this;
	}
	
};

jsCow.res.model.buttongroup = function() {
	
};
jsCow.res.model.buttongroup.prototype = {
	
	init: function(e) {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.buttongroup = function() {
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-btngroup');
	this.dom.content = $('<div/>').addClass('jsc-btngroup-content').appendTo(this.dom.main);
	
};
jsCow.res.view.buttongroup.prototype = {
	
	init: function(e) {	
		
	},
	
	update: function(e) {	
		
	}
	
};

jsCow.res.controller.buttongroup = function() {};
jsCow.res.controller.buttongroup.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("update", this.update);
	},
	
	isModelReady: function() {
		this.trigger("view.init");
	},
	
	update: function(e) {
		this.trigger("view.update", this.cmp().config());
	}

};
