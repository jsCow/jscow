
jsCow.res.components.radio = function() {};
jsCow.res.components.radio.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.radio);
		this.addModel(jsCow.res.model.radio);
		this.addView(jsCow.res.view.radio);
		
		return this;
	},
	
	select: function() {
		this.trigger('select');

		return this;
	},
	
	group: function(radioGroup) {
		this.trigger('group', {
			radioGroup: radioGroup
		});

		return this;
	},
	
	isSelected: function() {
		var c = this.config();
		return c.selected;
	}
	
};

jsCow.res.model.radio = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		selected: false,
		value: false,
		radioGroup: false,
		label: false
	};

};
jsCow.res.model.radio.prototype = {
	
	init: function(e) {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.radio = function() {
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-form-radio');
	
	this.dom.box = $('<div/>').addClass('jsc-form-radio-box').appendTo(this.dom.main);
	this.dom.check = $('<div/>').addClass('jsc-form-radio-check').appendTo(this.dom.box);
	this.dom.label = $('<div/>').addClass('jsc-form-radio-label');
		
	this.dom.content = $('<div/>').addClass('jsc-form-radio-content').appendTo(this.dom.main);

};
jsCow.res.view.radio.prototype = {
	
	init: function(e) {	
		
		this.dom.main.click((function(self, e) {
			return function() {
				if (e.data.enabled) {
					self.trigger("select");
				}
			};
		})(this, e));
		
	},

	update: function(e) {
		
		if (e.data.enabled) {
			
			this.dom.main
				.removeClass('jsc-form-radio-disabled')
				.addClass('jsc-form-radio');

			if (e.data.label !== "") {
				this.dom.label.html(e.data.label).removeClass("hidden");
				this.dom.box.after(this.dom.label);
			} else {
				this.dom.label.html(e.data.label).addClass("hidden");
			}
			
			if (e.data.selected) {
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
				.removeClass('jsc-form-radio')
				.addClass('jsc-form-radio-disabled');
			
		}
		
	}

};

jsCow.res.controller.radio = function() {};
jsCow.res.controller.radio.prototype = {
	
	init: function(e) {
		this.on("model.ready", this.isModelReady);
		this.on("select", this.select);
		this.on("group", this.group);
		this.on("radio.selected", this.radioSelected, false);
	},
	
	isModelReady: function(e) {
		this.trigger("view.init", this.cmp().config());
	},
	
	group: function(e) {
		this.cmp().config({
			radioGroup: e.data.radioGroup
		});
	},
	
	select: function(e) {
		this.cmp().config({
			selected: true
		});
		
		this.trigger("radio.selected", this.cmp().config(), false);
	},
	
	radioSelected: function(e) {
		
		var localCfg = this.cmp().config();
		var senderCfg = e.sender.config();
		
		if ( (e.sender.id() !== this.cmp().id()) && (localCfg.radioGroup === senderCfg.radioGroup) ) {
			this.cmp().config({
				selected: false
			});
		}
		
	}
	
};
