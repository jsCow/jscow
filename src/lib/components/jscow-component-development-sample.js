
/*
 * Component (Main) Class
 */

jsCow.res.components.myComponent = function() {}
jsCow.res.components.myComponent.prototype = {

	init: function() {
		
		return this;
	},

	setDefaultMVC: function() {
		
		// set model
		this.setModel(jsCow.res.model.myComponent);
		// set view
		this.setView(jsCow.res.view.myComponent);
		// set controller
		this.setController(jsCow.res.controller.myComponent);
		
		return this;
	}
	
}

/*
 * Model Class
 */

jsCow.res.model.myComponent = function() {
	
	this.type = "jsCow.res.model.myComponent";	// system variable
	
	this.config = {
		globalDisabled: false,
		enabled: true
	}
	
};
jsCow.res.model.myComponent.prototype = {

	init: function() {
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	}
	
};

/*
 * View Class
 */

jsCow.res.view.myComponent = function() {

	this.execInit = false;					// system variable
	
	this.type = "jsCow.res.view.myComponent";		// system variable
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('clearfix').css({ border: '1px solid #f00', margin: '10px' }).html('My Component');
	this.dom.content = $('<div/>').appendTo(this.dom.main);
	
};
jsCow.res.view.myComponent.prototype = {
	
	init: function(cfg) {
		
		var cfg = cfg.data;
		
	},
	
	update: function(cfg) {
		var cfg = cfg.data;
		if (cfg) {
			
			// Disabled
			if (!cfg.enabled || cfg.globalDisabled) {
				
				
				
			// Enabled
			}else{
				
				// Hide / Show
				if (cfg.hide) this.dom.main.addClass('jscow-hide'); else this.dom.main.removeClass('jscow-hide');
				
			}
			
		}
		
		return this;
	}
	
};

/*
 * Controller Class
 */

jsCow.res.controller.myComponent = function() {

	this.type = "jsCow.res.controller.myComponent";
	
};
jsCow.res.controller.myComponent.prototype = {
	
	init: function() {
		// ...
	}
	
};
