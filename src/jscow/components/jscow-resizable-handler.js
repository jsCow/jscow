
jsCow.res.components.resizablehandler = function() {};
jsCow.res.components.resizablehandler.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.resizablehandler);
		this.addModel(jsCow.res.model.resizablehandler);
		this.addView(jsCow.res.view.resizablehandler);
		
		return this;
	}
	
};

jsCow.res.model.resizablehandler = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		top: 100,
		left: 300,
		width: 0,
		height: 0,
		zindex: 0
	}

};
jsCow.res.model.resizablehandler.prototype = {
	
	init: function(e) {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.resizablehandler = function() {
	
	//
	// Visual dom elements
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-resizablehandler');		
	//this.dom.content = $('<div/>').addClass('jsc-resizablehandler-content').appendTo(this.dom.main);
	
	//
	// Resizer
	this.dom.resizerN = $('<div/>').addClass('jsc-resizablehandler-resizer-n').appendTo(this.dom.main);
	this.dom.resizerE = $('<div/>').addClass('jsc-resizablehandler-resizer-e').appendTo(this.dom.main);
	this.dom.resizerS = $('<div/>').addClass('jsc-resizablehandler-resizer-s').appendTo(this.dom.main);
	this.dom.resizerW = $('<div/>').addClass('jsc-resizablehandler-resizer-w').appendTo(this.dom.main);
	this.dom.resizerNW = $('<div/>').addClass('jsc-resizablehandler-resizer-nw').appendTo(this.dom.main);
	this.dom.resizerNE = $('<div/>').addClass('jsc-resizablehandler-resizer-ne').appendTo(this.dom.main);
	this.dom.resizerSE = $('<div/>').addClass('jsc-resizablehandler-resizer-se').appendTo(this.dom.main);
	this.dom.resizerSW = $('<div/>').addClass('jsc-resizablehandler-resizer-sw').appendTo(this.dom.main);
	
};
jsCow.res.view.resizablehandler.prototype = {
	
	init: function(e) {	
		
		//
		// Drag and drop for the resizablehandler element
		
		this.dom.main.on('mousedown', (function(self, e) {	// Start Drag
			return function() {
				var offsetLeft = self.dom.main.offset().left;
				var offsetTop = self.dom.main.offset().top;
				self.mousePosX = document.all ? resizablehandler.event.clientX : event.pageX;
				self.mousePosY = document.all ? resizablehandler.event.clientY : event.pageY;
				self.winPosX = self.mousePosX - offsetLeft;
  				self.winPosY = self.mousePosY - offsetTop;
				self.dragstart = true;
			}
		})(this, e)).on('mouseup', (function(self, e) {		// Stop Drag
			return function() {
				self.dragstart = false;
				self.trigger("model.update", {
					top: self.newWinPosY,
					left: self.newWinPosX
				});
			}
		})(this, e));
		
		$(document).on('mousemove', (function(self, e) {	// Drag
			return function(event) {
				if (self.dragstart) {
					self.mousePosX = document.all ? resizablehandler.event.clientX : event.pageX;
					self.mousePosY = document.all ? resizablehandler.event.clientY : event.pageY;
					self.newWinPosX = self.mousePosX - self.winPosX;
					self.newWinPosY = self.mousePosY - self.winPosY;
					self.dom.main.css('left', self.newWinPosX );
					self.dom.main.css('top', self.newWinPosY );
				}
			}
		})(this, e));
		
	},

	update: function(e) {
		
		if (e.data.enabled) {
			
			this.dom.main
				.removeClass('jsc-resizablehandler-disabled')
				.addClass('jsc-resizablehandler');
			
			// Width and Height
			if (e.data.width) this.dom.main.width( e.data.width );
			if (e.data.height) this.dom.content.height( e.data.height );
			
			// Fixed position in browser
			if (e.data.top) this.dom.main.css({ 
				top:e.data.top
			});
			if (e.data.left) this.dom.main.css({ 
				left: e.data.left
			});
			
			// z - Index
			if (e.data.zindex) this.dom.main.css({ 
				zindex:e.data.zindex
			});
			
			if (e.data.visible) {
				this.dom.main.show();
			} else {
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main
				.removeClass('jsc-resizablehandler')
				.addClass('jsc-resizablehandler-disabled');
			
		}
		
	}

};

jsCow.res.controller.resizablehandler = function() {};
jsCow.res.controller.resizablehandler.prototype = {
	
	init: function(e) {
		this.on("model.ready", this.isModelReady);
		this.on("title", this.title);
	},
	
	isModelReady: function(e) {
		this.trigger("view.init", this.cmp().config());
	}
	
};
