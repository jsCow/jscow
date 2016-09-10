/**
  * jsCow buttongroup component is a reusable component used in client side jsCow applications. 
  * A buttongroup is a component to group multiple button components. 
  * 
  * @author Mario Linz <jscow@gmx.de>
  	@class jsCow.res.components.buttongroup
  * @type Class Provides the main class of the component
  * @constructor 
*/

jsCow.res.components.buttongroup = function() {};
jsCow.res.components.buttongroup.prototype = {

	/**
	  * The init method will be called by initializing the component. 
	  * The model, view and controller should be set within this method.
		
		this.addController(jsCow.res.controller.buttongroup);
		this.addModel(jsCow.res.model.buttongroup);
		this.addView(jsCow.res.view.buttongroup);
		
	  * @method init
	  * @public
	  * @return {Object} Instance of the component itself.
	  */
	
	init: function() {
		
		this.addController(jsCow.res.controller.buttongroup);
		this.addModel(jsCow.res.model.buttongroup);
		this.addView(jsCow.res.view.buttongroup);
		
		return this;
	}
	
};


/**
  * Represents the model class of the jsCow button component. 
  * 
  * @author Mario Linz <jscow@gmx.de>
  * @class jsCow.res.model.buttongroup
  * @type Class Provides the model class of the component
  * @constructor 
  */

jsCow.res.model.buttongroup = function() {
	
};
jsCow.res.model.buttongroup.prototype = {
	
	/**
	  * The model init method will only trigger the internal component event 'model.ready'.
	  * The event data are the model data.
	  * Default listener for this event is registered in the controller of the component. 
	  	
	  	this.trigger("model.ready", this.data);

	  * @method init
	  * @private
	  */
	
	init: function(e) {
		this.trigger(
			"model.ready", 
			this.data
		);
	}
	
};

/**
  * Represents the view class of the jsCow button component. 
  * 
  * @author Mario Linz <jscow@gmx.de>
  * @class jsCow.res.view.buttongroup
  * @type Class Provides the view class of the component
  * @constructor 
  */

jsCow.res.view.buttongroup = function() {
	
	/**
	  * Objekt for all needed HTML-DOM elements of the component.
	  * 
	  * @property dom
	  * @type Object
	  * @default {} Object
	**/
	this.dom = {};
	
	/**
	  * Represents the html main container of the component.
	  * 
	  * @property dom.main
	  * @type Object
	  * @default <div/> jQuery DIV object
	**/
	this.dom.main = $('<div/>').addClass('jsc-btngroup');
	
	/**
	  * Represents the inner html container of the component.
	  * 
	  * @property dom.content
	  * @type Object
	  * @default <div/> jQuery DIV object
	**/
	this.dom.content = $('<div/>').addClass('jsc-btngroup-content').appendTo(this.dom.main);
	
};
jsCow.res.view.buttongroup.prototype = {
	
	/**
	  * The view init method can used to set default view properties.
	  * By trigger the event 'model.ready' the controller will trigger the event 'view.init' to call this method.
	  * @method init Set all default view properties and trigger the component event 'view.update'.
	  */
	
	init: function(e) {	
		
	},
	
	/**
	  * The view update method will update the complete component view by trigger the event 'view.update' with all available model data.
	  * @method update
	  * @param {object} eventdata Contains all sent event data
	  */

	update: function(e) {	
		
	}
	
};


/**
  * Represents the controller class of the jsCow group component. 
  * 
  * @author Mario Linz <jscow@gmx.de>
  * @class jsCow.res.controller.buttongroup
  * @type Class Provides the controller class of the component
  * @constructor 
  */

jsCow.res.controller.buttongroup = function() {};
jsCow.res.controller.buttongroup.prototype = {
	
	/**
	  * The controller init method register all needed events within the controller and provides all related event handler.
		
	  	// Code examples
	  	this.on("model.ready", this.isModelReady);
		
	  * @method init
	  */

	init: function() {
		this.on(
			"model.ready", 
			this.isModelReady
		);
	},
	
	
	/**
	  * The controller isModelReady method is an event handler and will be triggert by the event 'model.ready' with all available model data.
	  * Is the model ready the 'view.init' event will triggert by this handler with all available model data again.
	  	
	  	this.trigger(
			"view.init", 
			e.data
		);

	  * @method isModelReady
	  * @param {object} eventdata Contains all sent event data
	  */

	isModelReady: function(e) {
		this.trigger(
			"view.init",
			e.data
		);
	}

};
