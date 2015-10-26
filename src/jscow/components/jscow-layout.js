
jsCow.res.components.layout = function() { };
jsCow.res.components.layout.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.layout);
		this.addModel(jsCow.res.model.layout);
		this.addView(jsCow.res.view.layout);
		
		return this;
	},

	// Direction

	row: function() {

		this.trigger('direction', {
			direction: 'row'
		});
		
		return this;
	},

	rowReverse: function() {

		this.trigger('direction', {
			direction: 'row-reverse'
		});
		
		return this;
	},

	column: function() {

		this.trigger('direction', {
			direction: 'column'
		});
		
		return this;
	},

	columnReverse: function() {

		this.trigger('direction', {
			direction: 'column-reverse'
		});
		
		return this;
	},


	// Wrap

	wrap: function() {

		this.trigger('wrap', {
			wrap: 'wrap'
		});
		
		return this;
	},

	nowrap: function() {

		this.trigger('wrap', {
			wrap: 'nowrap'
		});
		
		return this;
	},

	wrapReverse: function() {

		this.trigger('wrap', {
			wrap: 'wrap-reverse'
		});
		
		return this;
	}

};

jsCow.res.model.layout = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		flex: {
			display: 'flex',
			direction: 'row',
			wrap: 'nowrap'
		}
	};
	
};
jsCow.res.model.layout.prototype = {

	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.layout = function() {
	
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-layout');
	this.dom.content = $('<div/>').addClass('jsc-layout-content jsc-layout-direction-row').appendTo(this.dom.main);
	
};
jsCow.res.view.layout.prototype = {
	
	init: function(e) {
		
	},
	
	update: function(e) {	
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-layout-disabled').addClass('jsc-layout');

			//
			// Set layout properties for flexbox
			
			// Direction (row | row-reverse | column | column | column-reserve)
			this.dom.content.removeClass('jsc-layout-direction-row jsc-layout-direction-row-reverse jsc-layout-direction-column jsc-layout-direction-column-reverse');
			this.dom.content.addClass('jsc-layout-direction-' + e.data.flex.direction);

			//
			// Wrap
			this.dom.content.removeClass('jsc-layout-wrap-wrap jsc-layout-wrap-nowrap jsc-layout-wrap-wrap-reverse');
			this.dom.content.addClass('jsc-layout-wrap-' + e.data.flex.wrap);


			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-layout').addClass('jsc-layout-disabled');
			
		}
	},

	//
	// Misc functions - flexbox - display

	display: function(display) {

		var value;

		if (typeof display === 'undefinex') {
			value = '';
		} else {
			value = display;
		}

		return	"display: ~-webkit-"+value+"; " +
				"display: ~-moz-"+value+"; " +
				"display: ~-ms-"+value+"box; " +
				"display: ~-ms-"+value+"; " +
				"display: "+value+";";

	},

	//
	// Misc functions - flexbox - direction

	direction: function(direction) {

		var value,
			string;

		if (typeof direction === 'undefined') {
			value = '';
		} else {
			value = direction;
		}
		
		string ="-webkit-flex-direction: "+value+"; " + 
				"-moz-flex-direction: "+value+"; " + 
				"-ms-flex-direction: "+value+"; " + 
				"flex-direction: "+value+";";
		
		return string;

	}

};

jsCow.res.controller.layout = function() {};
jsCow.res.controller.layout.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("direction", this.direction);
		this.on("wrap", this.wrap);
	},
	
	isModelReady: function() {
		this.trigger("view.init", this.cmp().config());
	},
	
	direction: function(e) {
		this.cmp().config({
			flex: {
				direction: e.data.direction
			}
		});
	},
	
	wrap: function(e) {
		this.cmp().config({
			flex: {
				wrap: e.data.wrap
			}
		});
	}

};
