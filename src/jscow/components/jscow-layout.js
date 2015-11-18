
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
	},

	
	// Justify Content

	justifyContentStart: function() {

		this.trigger('justifycontent', {
			justifycontent: 'flex-start'
		});
		
		return this;
	},

	justifyContentEnd: function() {

		this.trigger('justifycontent', {
			justifycontent: 'flex-end'
		});
		
		return this;
	},
	justifyContentCenter: function() {

		this.trigger('justifycontent', {
			justifycontent: 'center'
		});
		
		return this;
	},
	justifyContentSpaceBetween: function() {

		this.trigger('justifycontent', {
			justifycontent: 'space-between'
		});
		
		return this;
	},

	justifyContentSpaceAround: function() {

		this.trigger('justifycontent', {
			justifycontent: 'space-around'
		});
		
		return this;
		
	},


	//
	// Align Items

	alignItemsStart: function() {

		this.trigger('alignitems', {
			alignitems: 'flex-start'
		});
		
		return this;
		
	},

	alignItemsEnd: function() {

		this.trigger('alignitems', {
			alignitems: 'flex-end'
		});
		
		return this;
		
	},

	alignItemsCenter: function() {

		this.trigger('alignitems', {
			alignitems: 'center'
		});
		
		return this;
		
	},

	alignItemsStretch: function() {

		this.trigger('alignitems', {
			alignitems: 'stretch'
		});
		
		return this;
		
	},

	alignItemsBaseline: function() {

		this.trigger('alignitems', {
			alignitems: 'baseline'
		});
		
		return this;
		
	},


	//
	// Align Content

	alignContentStart: function() {

		this.trigger('aligncontent', {
			alignitems: 'flex-start'
		});
		
		return this;
		
	},

	alignContentEnd: function() {

		this.trigger('aligncontent', {
			alignitems: 'flex-end'
		});
		
		return this;
		
	},

	alignContentCenter: function() {

		this.trigger('aligncontent', {
			alignitems: 'center'
		});
		
		return this;
		
	},

	alignContentStretch: function() {

		this.trigger('aligncontent', {
			alignitems: 'stretch'
		});
		
		return this;
		
	},

	alignContentSpaceBetween: function() {

		this.trigger('aligncontent', {
			alignitems: 'space-between'
		});
		
		return this;
		
	},

	alignContentSpaceAround: function() {

		this.trigger('aligncontent', {
			alignitems: 'space-around'
		});
		
		return this;
		
	},


	//
	// Order ( Item )

	order: function(index) {
		
		if (typeof index === 'number') {
			this.trigger('order', {
				order: index
			});
		}
		
		return this;
		
	},


	//
	// Grow ( Item )

	grow: function(value) {
		
		if (typeof value === 'number') {
			this.trigger('grow', {
				grow: value
			});
		}
		
		return this;
		
	},


	//
	// Shrink ( Item )

	shrink: function(value) {
		
		if (typeof value === 'number') {
			this.trigger('shrink', {
				shrink: value
			});
		}
		
		return this;
		
	},


	//
	// Basis ( Item )

	basis: function(value) {
		
		this.trigger('basis', {
			basis: value
		});
		
		return this;
		
	},


	//
	// Align Self ( Item )

	alignSelfAuto: function() {
		
		this.trigger('alignself', {
			alignself: 'auto'
		});
		
		return this;
		
	},

	alignSelfStart: function() {
		
		this.trigger('alignself', {
			alignself: 'flex-start'
		});
		
		return this;
		
	},

	alignSelfEnd: function() {
		
		this.trigger('alignself', {
			alignself: 'flex-end'
		});
		
		return this;
		
	},

	alignSelfCenter: function() {
		
		this.trigger('alignself', {
			alignself: 'center'
		});
		
		return this;
		
	},

	alignSelfBaseline: function() {
		
		this.trigger('alignself', {
			alignself: 'baseline'
		});
		
		return this;
		
	},

	alignSelfStretch: function() {
		
		this.trigger('alignself', {
			alignself: 'stretch'
		});
		
		return this;
		
	}

};

jsCow.res.model.layout = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		display: 'flex',
		direction: 'row',
		wrap: 'nowrap',
		justifycontent: 'flex-start',
		alignitems: 'stretch',
		aligncontent: 'stretch',
		order: 0,
		grow: 0,
		shrink: 0,
		basis: 'auto',
		alignself: 'auto'
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
	this.dom.content = $('<div/>').addClass('jsc-layout-content').appendTo(this.dom.main);
	
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
			this.dom.content.addClass('jsc-layout-direction-' + e.data.direction);

			//
			// Wrap
			this.dom.content.removeClass('jsc-layout-wrap-wrap jsc-layout-wrap-nowrap jsc-layout-wrap-wrap-reverse');
			this.dom.content.addClass('jsc-layout-wrap-' + e.data.wrap);

			//
			// Justify Content
			this.dom.content.removeClass('jsc-layout-justify-content-flex-start jsc-layout-justify-content-flex-end jsc-layout-justify-content-center jsc-layout-justify-content-space-between jsc-layout-justify-content-space-around');
			this.dom.content.addClass('jsc-layout-justify-content-' + e.data.justifycontent);
			
			//
			// Align Items
			this.dom.content.removeClass('jsc-layout-align-items-flex-start jsc-layout-align-items-flex-end jsc-layout-align-items-center jsc-layout-align-items-stretch jsc-layout-align-items-baseline');
			this.dom.content.addClass('jsc-layout-align-items-' + e.data.alignitems);

			//
			// Align Content
			this.dom.content.removeClass('jsc-layout-align-content-flex-start jsc-layout-align-content-flex-end jsc-layout-align-content-center jsc-layout-align-content-stretch jsc-layout-align-content-baseline');
			this.dom.content.addClass('jsc-layout-align-content-' + e.data.aligncontent);
			
			//
			// Order
			this.dom.main.css( {
				order: e.data.order
			});
			
			//
			// Grow
			this.dom.main.css( this.flexGrowStyles(e.data.grow) );

			//
			// Shrink
			this.dom.main.css( this.flexShrinkStyles(e.data.shrink) );
			
			//
			// Align Self
			this.dom.content.removeClass('jsc-layout-align-self-auto jsc-layout-align-self-flex-start jsc-layout-align-self-flex-end  jsc-layout-align-self-center  jsc-layout-align-self-baseline  jsc-layout-align-self-stretch');
			this.dom.content.addClass('jsc-layout-align-self-' + e.data.alignself);
			

			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-layout').addClass('jsc-layout-disabled');
			
		}
	},

	flexGrowStyles: function(value) {

		var css;

		if (typeof value === 'number') {
			css = {
				"-webkit-flex-grow": value,
		     	"-moz-flex-grow": value,
		      	"-ms-flex-grow": value,
				"flex-grow": value
			};
		} else {
			css = {};
		}

		return css;

	},

	flexShrinkStyles: function(value) {

		var css;

		if (typeof value === 'number') {
			css = {
				"-webkit-flex-shrink": value,
		     	"-moz-flex-shrink": value,
		      	"-ms-flex-shrink": value,
				"flex-shrink": value
			};
		} else {
			css = {};
		}

		return css;

	}

};

jsCow.res.controller.layout = function() {};
jsCow.res.controller.layout.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("direction", this.direction);
		this.on("wrap", this.wrap);
		this.on('justifycontent', this.justifycontent);
		this.on('alignitems', this.alignitems);
		this.on('aligncontent', this.aligncontent);
		this.on('order', this.order);
		this.on('grow', this.grow);
		this.on('shrink', this.shrink);
		this.on('basis', this.basis);
		this.on('alignself', this.alignself);
	},
	
	isModelReady: function() {
		this.trigger("view.init", this.cmp().config());
	},
	
	direction: function(e) {
		this.cmp().config({
			direction: e.data.direction
		});
	},
	
	wrap: function(e) {
		this.cmp().config({
			wrap: e.data.wrap
		});
	},
	
	justifycontent: function(e) {
		this.cmp().config({
			justifycontent: e.data.justifycontent
		});
	},
	
	alignitems: function(e) {
		this.cmp().config({
			alignitems: e.data.alignitems
		});
	},
	
	aligncontent: function(e) {
		this.cmp().config({
			aligncontent: e.data.aligncontent
		});
	},
	
	order: function(e) {
		this.cmp().config({
			order: e.data.order
		});
	},
	
	grow: function(e) {
		this.cmp().config({
			grow: e.data.grow
		});
	},
	
	shrink: function(e) {
		this.cmp().config({
			shrink: e.data.shrink
		});
	},
	
	basis: function(e) {
		this.cmp().config({
			basis: e.data.basis
		});
	},
	
	alignself: function(e) {
		this.cmp().config({
			alignself: e.data.alignself
		});
	}
	
};
