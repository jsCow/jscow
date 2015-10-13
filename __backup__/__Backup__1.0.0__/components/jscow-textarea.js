/*
 * jsCow.res.components.textarea
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
Formular-Komponente für ein mehrzeiliges Textfeld.

@author Mario Linz
@class jsCow.res.components.textarea
@type Object
@module jsCow.res.components.textarea
@constructor 
*/
jsCow.res.components.textarea = function() {}
jsCow.res.components.textarea.prototype = {
	
	/**
	Init-Methode, die bei der Initialisierung der Komponente ausgeführt wird.
	
	@method init
	@return {Object} Instanz der jsCow-Komponente.
	**/
	init: function() {
		
		return this;
	},

	/**
	Setzt die Standard-MVC Klassen (Model, View, Controller) für die Komponente.
	Diese Methode hat keine Parameter, da sie automatisch bei der Initialisierung der Komponente vom Framework ausgeführt wird.
	
	@method setDefaultMVC
	@return {Object} Instanz der jsCow-Komponente.
	**/
	setDefaultMVC: function() {
		
		// set model
		this.setModel(jsCow.res.model.textarea);
		// set view
		this.setView(jsCow.res.view.textarea);
		// set controller
		this.setController(jsCow.res.controller.textarea);
		
		return this;
	},
	
	/**
	 * @description Set value
	 */	
	/*
		@group Components
		@page Textarea
		@title setValue(<string>)
		@description Löst das Event "setValue" aus und setzt den Text-Inhalt der Textarea.
		@examples cmp.textarea.setValue
	*/
	setValue: function(v) {
		this.globalEvents.trigger("setValue", {
			input: v
		}, this);
		
		return this;
	},
	
	/**
	 * @description Get value
	 */	
	/*
		@group Components
		@page Textarea
		@title getValue()
		@description Gibt den Text-Inhalt der Textarea zurück.
		@examples cmp.textarea.getValue
	*/
	getValue: function() {
		return this.getConfig("input");
	},
	
	/**
	 * @description Set align
	 */	
	/*
		@group Components
		@page Textarea
		@title setAlign(<left|fillup|right>)
		@description Löst das Event "setAlign" aus und setzt die Aurichtung der Textarea Komponente innerhalb dessen übergeordneten Komponente.
		@examples cmp.textarea.setAlign
	*/
	setAlign: function(align) {
		this.globalEvents.trigger("setAlign", {
			align: align
		}, this);
		
		return this;
	},
	
	/**
	 * @description Set default text
	 */	
	/*
		@group Components
		@page Textarea
		@title setDefaultText(<string>)
		@description Löst das Event "setDefaultText" aus und setzt den Default-Text der Textarea.
		@examples cmp.textarea.setDefaultText
	*/	
	setDefaultText: function(t) {
		this.globalEvents.trigger("setDefaultText", {
			placeholder: t
		}, this);
		
		return this;
	},
	
	/**
	 * @description Get default text
	 */	
	/*
		@group Components
		@page Textarea
		@title getDefaultText()
		@description Gibt den Default-Text der Textarea zurück.
		@examples cmp.textarea.getDefaultText
	*/	
	getDefaultText: function() {
		return this.getConfig("placeholder");
	}
	
}

/*
 * jsCow.res.model.textarea - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
 * @description Class structure of 'jsCow.res.core.mvc.modelHandler'
 */
jsCow.res.model.textarea = function() {
	
	this.type = "jsCow.res.model.textarea";	// system variable

	this.config = {
		globalDisabled: false,
		enabled: true,
		input: "",
		align: "left",
		placeholder: "..."
	};
	
};
jsCow.res.model.textarea.prototype = {

	init: function() {
		this.globalEvents.trigger("viewInit", this.getConfig(), this.getCmp());
	},
	
	setValue: function(e) {	
		
		if (this.isEnabled()) {
			this.setConfig({ 
				input: e.data.input
			});
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	setDefaultText: function(e) {	
		if (this.isEnabled()) {
			this.setConfig({ 
				placeholder: e.data.placeholder
			});
			
			this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
		}
		
		return this;
	},
	
	setAlign: function(e) {	
		this.setConfig({ 
			align: e.data.align
		});
		
		this.globalEvents.trigger("viewUpdate", this.getConfig(), this.getCmp());
	
		return this;
	}
	
};

/**
 * @description Class structure of 'jsCow.res.view.textarea'
 */
jsCow.res.view.textarea = function() {

	this.execInit = false;					// system variable
	this.type = "jsCow.res.view.textarea";	// system variable
	
	// Variables of html dom elements - jquery objects
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jscow-form-textarea clearfix');
	this.dom.textarea = $('<textarea/>').addClass('jscow-form-textarea-field').appendTo(this.dom.main);
	
};
jsCow.res.view.textarea.prototype = {
	
	init: function(c) {
		var cfg = c.data;
		
		var self = this.getCmp();
		var view = this;
		
		this.dom.textarea.val(cfg.input).keyup(function() {
			
			self.globalEvents.trigger("setValue", {
				input: view.dom.textarea.val()
			}, self);
			
		}).attr({
			placeholder: cfg.placeholder
		});
		
		this.setAlign(cfg.align);
		this.update(c);
	},
	
	update: function(cfg) {
		var cfg = cfg.data;
		if (cfg) {
			
			if (!cfg.enabled || cfg.globalDisabled) {
				
				this.dom.main.addClass('jscow-form-textarea-disabled').removeClass('jscow-form-textarea');
				this.dom.textarea.attr("readonly","readonly");
				
			}else{
				
				this.dom.main.addClass('jscow-form-textarea').removeClass('jscow-form-textarea-disabled');
				this.dom.textarea.removeAttr("readonly");
				this.dom.textarea.attr({placeholder: cfg.placeholder});
				
				this.dom.textarea.val(cfg.input);
				this.setAlign(cfg.align);
				
				// Hide / Show
				if (cfg.hide) this.dom.main.addClass('jscow-hide'); else this.dom.main.removeClass('jscow-hide');
				
			}
			
		}
		return this;
	},
	
	setAlign: function(align) {
		switch (align) {
			case "left":
				this.dom.main.removeClass("jscow-align-none jscow-align-right").addClass("jscow-align-left");
			break;
			case "right":
				this.dom.main.removeClass("jscow-align-none jscow-align-left").addClass("jscow-align-right");
			break;
			case "fillup":
				this.dom.main.removeClass("jscow-align-left jscow-align-right").addClass("jscow-align-none");
			break;
			default:
				this.dom.main.removeClass("jscow-align-left jscow-align-right").addClass("jscow-align-none");
			break;
		}
	}
	
};

/*
 * jsCow.res.controller.textarea - jsCow extention - JavaScript Library
 * http://www.gelight-tec.de/
 *
 * Copyright 2011, Mario Linz
 * http://www.gelight-tec.de/gui/license
 *
 * Date: November 08 20:00:00 2011
 */

/**
 * @description Class structure of 'jsCow.res.controller.textarea'
 */
jsCow.res.controller.textarea = function() {

	this.type = "jsCow.res.controller.textarea";	// system variable
	
};
jsCow.res.controller.textarea.prototype = {
	
	init: function() {
		// ...
	},
	
	/**
	 * @description Set value
	 */	
	handleSetValue: function(e) {
		if (this.isMethodExists(this.getModel().setValue)) this.getModel().setValue(e);
		
		return this;
	},
	
	/**
	 * @description Set default text
	 */
	handleSetDefaultText: function(e) {
		if (this.isMethodExists(this.getModel().setDefaultText)) this.getModel().setDefaultText(e);
		
		return this;
	},
	
	/**
	 * @description Set default text
	 */
	handleSetAlign: function(e) {
		if (this.isMethodExists(this.getModel().setAlign)) this.getModel().setAlign(e);
		
		return this;
	}
	
};

