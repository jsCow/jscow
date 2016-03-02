/*
 jsCow.res.view - jsCow extention - JavaScript Library
 http://www.jscow.de/
 Author: Mario Linz
 */

/**
Objektstuktur des View-Manager mit allen grundlegenden Methoden.

@class viewsManager
@constructor 
*/
jsCow.res.core.mvc.viewsManager = function() {
	
	/**
	Liste aller vorhandenen Views einer Komponente.

	@property viewList
	@type Array
	@default "[]"
	**/
	this.viewList = [];
	
};
jsCow.res.core.mvc.viewsManager.prototype = {
	
	init: function(config) {
		
		var cfg = config;
		var self = this;
		var viewList = this.list();
		
		$(viewList).each(function(i, view) {
			
			if (!view.isInit) {
				
				if (view.dom !== 'undefined' && view.dom.main !== 'undefined') {
					
					if (i === 0 && self.cmp().placeholder()) {
						self.cmp().placeholder().replaceWith( view.dom.main );
					}
					
					if (i > 0) {
						viewList[ i - 1 ].dom.main.after( view.dom.main );
					}
					
				}
				
				view.isInit = true;
				
			}
			
		}).promise().done(function() {
			self.cmp().trigger('view.ready');
		});
		
	},
	
	/**
	Gibt eine Liste aller vorhandenen Views einer Komponente zur&uuml;ck.
	
	@method list
	@return {Object} Liste aller registrierten Views.
	**/
	list: function() {
		return this.viewList;
	},
	
	/**
	Setzt den Default-View einer Komponente.
	
	@method addView
	@param {Object} v Referenz auf die im Framework registrierte View-Klasse.
	@return {Object} Gibt den registrierten View zur&uuml;ck.
	**/
	addView: function(v) {
		
		var self = this;
		var length = this.length();
		
		this.viewList[length] = new v();
		this.viewList[length].__cmp__ = this.cmp();
		this.viewList[length].__cfg__ = {};
		
		//
		// Set events manager
		
		var eventsManager = new jsCow.res.core.events.eventsManager();
		eventsManager.cmp(this.cmp());
		eventsManager.parent(this.viewList[length]);
		this.viewList[length].events = eventsManager;
		
		$.extend(true, this.viewList[length],  {
			
			cmp: function() {
				return this.__cmp__;
			},
			
			main: function() {
				return this.dom.main;
			},
			
			content: function() {
				if (this.dom.content) {
					return this.dom.content;
				} else {
					return false;
				}
			},
			
			appendToTarget: function() {
				$(this.dom.main).appendTo(this.cmp().target());
				
				return this;
			},
			
			appendAfter: function(target) {
				target.after(this.dom.main);
				
				return this;
			},
			
			cfg: function(param) {
				if (param === undefined) {
					
					return this.__cfg__;

				} else {

					if(this.__cfg__[param]) {
						return this.__cfg__[param];
					} else {
						return false;
					}

				}
			},
			
			id: function(id) {
				if (id) {
					this.__id__ = id;
					
					return this;
				} else {
					return this.__id__;
				}
			},
			
			focus: function(e) {	
				$(".jsc-focus").removeClass("jsc-focus");
				this.dom.main.addClass('jsc-focus');
			},
			
			on: function(event, handler, local) {
				this.events.on(event, handler, local);
				
				return this;
			},
			
			trigger: function(event, data, local) {
				this.events.trigger(event, data, local);
				
				return this;
			},
			
			bubbleIn: function(event, data, local) {
				this.events.bubbleIn(event, data, local);
				
				return this;
			},
			
			bubbleOut: function(event, data, local) {
				this.events.bubbleOut(event, data, local);
				
				return this;
			},
			
			bubble: function(event, data, local) {
				this.events.bubble(event, data, local);
				
				return this;
			}
			
		});
		
		this.viewList[length].id('v' + ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 18));
		
		//
		// Register default view events event
		
		this.viewList[length].on( "view.init",  this.viewList[length].init);
		this.viewList[length].on( "view.update",  this.viewList[length].update);
		this.viewList[length].on( "view.focus",  this.viewList[length].focus);
		
		// Set focus on component
		this.viewList[length].dom.main.mousedown( function(self, length) {
			return function(e) {
				e.stopPropagation();
				self.viewList[length].trigger('view.focus');
			};
		}(self, length));
		
		
		return this.viewList[length];
		
	},
	
	/**
	F&uuml;gt einen weiteren View einer Komponente hinzu.
	
	@method add
	@param {Object} v Referenz auf die im Framework registrierte View-Klasse.
	@return {Object} Gibt den registrierten View zur&uuml;ck.
	**/
	add: function(v) {
		this.addView(v);
		
		return this;
	},
	
	/**
	L&ouml;scht einen spezifischen View aus einer Komponente.
	
	@method del
	@param {Object} v Referenz auf die Instanz des zu l&ouml;schenden View.
	**/
	del: function(view) {
		
		var v = new view();
		var viewList = this.list();
		
		$.each(viewList, function(i, view) {
			if (v.id() === view.id()) {
				if (view.dom.main !== 'undefined') {
					view.dom.main.remove();
				}
				viewList.splice(i,1);
			}
		});
		
	},
	
	/**
	Ruft die Methode .update() f&uuml;r alle vorhandenen Views auf.
	
	@method update
	@param {Object} e Event-Parameter der Handler-Methode.
	**/
	update: function(e) {
		
		var self = this;
		var viewList = this.list();
		
		$.each(viewList, function(i, view) {
			
			self.cmp().trigger("view.update");
			
		});
		
	},
	
	/**
	Gibt die Anzahl der vorhandenen Views einer Komponente zur&uuml;ck.
	
	@method length
	@return {Int} Anzahl der registrierten Views.
	**/
	length: function() {
		return this.viewList.length;
	},
	
	/**
	Gibt den inneren Container (jQuery) der aktuellen Komponente zur&uuml;ck.
	
	@method content
	@param {Object} index Index eines spezifischen DOM-Elements.
	@return {Int} Inneren Container (jQuery) der aktuellen Komponente
	**/
	content: function(idx) {
		
		var index;

		if (idx === undefined) {
			index = 0; 
		} else {
			index = idx;
		}

		var self = this;
		var viewList = this.list();
		var content = false;
		
		$.each(viewList, function(i, view) {
			if (view.dom !== 'undefined' && view.dom.content !== 'undefined' && typeof (view.dom.content) === "object" && (view.dom.content instanceof Array)) {
				if (view.dom.content[index]) {
					content = view.dom.content[index];
				}
			}else if (view.dom !== undefined && view.dom.content !== undefined) {
				content = view.dom.content;
			}else{
				return self.main(index);
			}
		});
		
		return content;
	},
	
	/**
	Gibt den &auml;u&szlig;eren Container (jQuery) der aktuellen Komponente zur&uuml;ck.
	
	@method main
	@param {Object} index Index eines spezifischen DOM-Elements.
	@return {Int} &Auml;u&szlig;eren Container (jQuery) der aktuellen Komponente
	**/
	main: function(idx) {
		
		var index;

		if (idx === undefined) {
			index = 0; 
		} else {
			index = idx;
		}

		var self = this;
		var viewList = this.list();
		var main = false;
		
		$.each(viewList, function(i, view) {
			if (view.dom !== 'undefined' && view.dom.main !== 'undefined' && typeof (view.dom.main) === "object" && (view.dom.main instanceof Array)) {
				if (view.dom.main[index]) {
					main = view.dom.main[index];
				}
			}else if (view.dom !== 'undefined' && view.dom.main !== 'undefined') {
				main = view.dom.main;
			}else{
				main = false;
			}
		});
		
		return main;
	},
	
	/**
	Gibt eine Referenz auf die Instanz der aktuellen Komponente zur&uuml;ck.
	
	@method cmp
	@return {Object} Referenz auf die Instanz der aktuellen Komponente.
	**/
	cmp: function() {
		return this.__cmp__;
	},
	
	/**
	F&uuml;gt den &auml;u&szlig;eren Container der Komponente in ein neues DOM-Target Element ein.
	
	@method appendTo
	@param {Object} target jQuery DOM-Element.
	@return {Object} Referenz auf die Instanz der aktuellen Komponente.
	**/
	appendTo: function(target) {
		
		var self = this;
		var viewList = this.list();
		
		$.each(viewList, function(i, view) {
			view.main().appendTo(target);
			self.cmp().target(target);
		});
		
		return this;
	},
	
	/**
	Entfernt alle Views einer Komponente.
	
	@method removeAll
	@return {Object} Referenz auf die Instanz der aktuellen Komponente.
	**/
	removeAll: function() {
		var viewList = this.list();
		$.each(viewList, function(i, view) {
			if (view.dom.main !== 'undefined') {
				view.dom.main.remove();
			}
		});
		
		return this.cmp();
	},
	
	/**
	Tauscht einen existierenden View mit einem Anderen.
	
	@method replace
	@param {Object} o Instanz des View, welcher ersetzt werden soll.
	@param {Object} n Referenz auf die im Framework registrierte View-Klasse.
	**/
	replace: function(o, n) {
		
		var oV = new o();
		var _this = this;
		
		var viewList = this.list();
		$.each(viewList, function(i, view) {
			if (view.id() === oV.id()) {
				_this.addView(n).appendAfter(view.main());
				_this.del(o);
			}
		});
		
	},
	
	/**
	Setzt einen CSS-Style f&uuml;r den &auml;u&szlig;eren Container der Komponente.
	
	@method style
	@param {String} style CSS Styles
	**/
	style: function(css) {
		var style = css;
		var _this = this;
		var viewList = this.list();
		
		$.each(viewList, function(i, view) {
			if (typeof style === "object") {
				view.main().css(style);
			}else if (typeof style === "string") {
				view.main().addClass(style);
			}
		});
		
	}

};
