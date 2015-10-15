
jsCow.res.components.layout = function() { };
jsCow.res.components.layout.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.layout);
		this.addModel(jsCow.res.model.layout);
		this.addView(jsCow.res.view.layout);
		
		return this;
	}

};

jsCow.res.model.layout = function() {
	
	this.data = {
		enabled: true,
		visible: true
	};
	
};
jsCow.res.model.layout.prototype = {

	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.layout = function() {
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-layout clearfix');
	this.dom.content = $('<div/>').addClass('jsc-layout-content clearfix').appendTo(this.dom.main);
	
};
jsCow.res.view.layout.prototype = {
	
	init: function(e) {
		
	},
	
	update: function(e) {	
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-layout-disabled').addClass('jsc-layout');
			
			

			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-layout').addClass('jsc-layout-disabled');
			
		}
	}
	
};

jsCow.res.controller.layout = function() {};
jsCow.res.controller.layout.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
	},
	
	isModelReady: function() {
		this.trigger("view.init", this.cmp().config());
	}
	
};
