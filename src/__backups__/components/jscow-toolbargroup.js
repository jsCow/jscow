
jsCow.res.components.toolbargroup = function() {};
jsCow.res.components.toolbargroup.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.toolbargroup);
		this.addModel(jsCow.res.model.toolbargroup);
		this.addView(jsCow.res.view.toolbargroup);
		
		return this;
	}
	
};

jsCow.res.model.toolbargroup = function() {
	
};
jsCow.res.model.toolbargroup.prototype = {
	
	init: function(e) {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.toolbargroup = function() {
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-toolbargroup');
	this.dom.content = $('<div/>').addClass('jsc-toolbargroup-content').appendTo(this.dom.main);
	
};
jsCow.res.view.toolbargroup.prototype = {
	
	init: function(e) {	
		
	},
	
	iupdate: function(e) {	
		
	}
	
};

jsCow.res.controller.toolbargroup = function() {};
jsCow.res.controller.toolbargroup.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
	},
	
	isModelReady: function() {
		this.trigger("view.init");
	}
	
};
