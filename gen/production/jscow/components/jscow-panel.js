
jsCow.res.components.panel = function() { };
jsCow.res.components.panel.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.panel);
		this.addModel(jsCow.res.model.panel);
		this.addView(jsCow.res.view.panel);
		
		return this;
	},
	
	title: function(title) {
		
		if (typeof title !== 'undefined' && typeof title === 'string') {
			this.trigger('title', {
				title: title
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
	}
	
};

jsCow.res.model.panel = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		title: "",
		collapsed: false
	};
	
};
jsCow.res.model.panel.prototype = {

	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.panel = function() {
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-panel clearfix');
	this.dom.content = $('<div/>').addClass('jsc-panel-content clearfix').appendTo(this.dom.main);
	
};
jsCow.res.view.panel.prototype = {
	
	init: function(e) {
		
		// Title with arrow
		this.dom.titlebar = $('<div/>').addClass('jsc-panel-titlebar').click((function(self, e) {
			return function() {
				if (e.data.enabled) {
					self.trigger("toggle");
				}
			};
		})(this, e));
		
		this.dom.arrow = $('<i/>').addClass('fa fa-arrow-left').appendTo( this.dom.titlebar );
		this.dom.title = $('<span/>').appendTo( this.dom.titlebar );
		this.dom.main.prepend( this.dom.titlebar );
		
		this.trigger("view.update", e.data);
	},
	
	update: function(e) {	
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-panel-disabled').addClass('jsc-panel');
			
			this.dom.title.html(e.data.title);
			
			if (e.data.collapsed) {
				this.dom.content.hide();
				this.dom.arrow.removeClass('fa-arrow-down').addClass('fa-arrow-left');
			}else{
				this.dom.content.show();
				this.dom.arrow.removeClass('fa-arrow-left').addClass('fa-arrow-down');
			}
			
			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-panel').addClass('jsc-panel-disabled');
			
		}
	}
	
};

jsCow.res.controller.panel = function() {};
jsCow.res.controller.panel.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("title", this.title);
		this.on("collapse", this.collapse);
		this.on("open", this.open);
		this.on("toggle", this.toggle);
	},
	
	isModelReady: function() {
		this.trigger("view.init", this.cmp().config());
	},
	
	title: function(e) {
		this.cmp().config({
			title: e.data.title
		});
	},
	
	collapse: function(e) {
		this.cmp().config({
			collapsed: true
		});
	},
	
	open: function(e) {
		this.cmp().config({
			collapsed: false
		});
	},
	
	toggle: function(e) {
		
		var config = this.cmp().config();
		
		if (config.collapsed === true) {
			this.cmp().config({
				collapsed: false
			});
		}else{
			this.cmp().config({
				collapsed: true
			});
		}
		
	}
	
};
