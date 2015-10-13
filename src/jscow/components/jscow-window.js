
jsCow.res.components.window = function() {};
jsCow.res.components.window.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.window);
		this.addModel(jsCow.res.model.window);
		this.addView(jsCow.res.view.window);
		
		return this;
	},
	
	title: function(title) {
		this.trigger('title', {
			title: title
		});

		return this;
	},
	
	cloasable: function(cloasable) {
		
		if (typeof cloasable === 'undefined')
			var cloasable = true;
			
		this.trigger('cloasable', {
			cloasable: cloasable
		});
		
		return this;
	},
	
	maximizable: function(maximizable) {
		
		if (typeof maximizable === 'undefined')
			var maximizable = true;
			
		this.trigger('maximizable', {
			maximizable: maximizable
		});
		
		return this;
	},
	
	miniimizable: function(miniimizable) {
		
		if (typeof miniimizable === 'undefined')
			var miniimizable = true;
			
		this.trigger('miniimizable', {
			miniimizable: miniimizable
		});
		
		return this;
	}
	
};

jsCow.res.model.window = function() {
	
	this.data = {
		enabled: true,
		visible: true,
		title: "",
		top: 100,
		left: 300,
		width: 0,
		height: 0,
		cloasable: false,
		maximizable: false,
		minimizable: false,
		zindex: 0
	}

};
jsCow.res.model.window.prototype = {
	
	init: function(e) {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.view.window = function() {
	
	//
	// Visual dom elements
	this.dom = {};
	this.dom.main = $('<div/>').addClass('jsc-window');		
	
	//
	// Configurations for drag and drop of the window component
	this.dragstart = false;
	this.mousePosX = 0;
	this.mousePosY = 0;
	this.winPosX = 0;
	this.winPosY = 0;
	this.newWinPosX = 0;
	this.newWinPosY = 0;
	
	this.dom.titleContainer = $('<div/>').addClass('jsc-window-title').appendTo(this.dom.main);
		this.dom.icon = $('<div/>').addClass('jsc-window-title-ico').appendTo(this.dom.titleContainer);
		this.dom.title = $('<div/>').addClass('jsc-window-title-text').appendTo(this.dom.titleContainer);
	
	this.dom.content = $('<div/>').addClass('jsc-window-content').appendTo(this.dom.main);
	
	this.close = false;
	this.maximize = false;
	this.minimize = false;
	
};
jsCow.res.view.window.prototype = {
	
	init: function(e) {	
		
		//
		// Drag and drop for the window element
		
		this.dom.main.on('mousedown', (function(self, e) {	// Start Drag
			return function() {
				var offsetLeft = self.dom.main.offset().left;
				var offsetTop = self.dom.main.offset().top;
				self.mousePosX = document.all ? window.event.clientX : event.pageX;
				self.mousePosY = document.all ? window.event.clientY : event.pageY;
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
					self.mousePosX = document.all ? window.event.clientX : event.pageX;
					self.mousePosY = document.all ? window.event.clientY : event.pageY;
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
				.removeClass('jsc-window-disabled')
				.addClass('jsc-window');
			
			//
			// Close Button
			if (e.data.closable) {
				if (!this.close) {
					this.close = jsCow.get(jsCow.res.components.button, {
						icon: {
							name: 'times',
							direction: 'l'
						}
					});
					this.close.target(this.dom.titleContainer);
					this.close.on('click', (function(self) {
						return function(e) {
							self.trigger('close');
						}
					})(this));
					this.close.run();
				}
			} else {
				if (this.close) {
					this.close.hide();
				}
			}
			
			// Set title and icon
			if (e.data.title) this.dom.title.html(e.data.title);
			
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
				.removeClass('jsc-window')
				.addClass('jsc-window-disabled');
			
		}
		
	}

};

jsCow.res.controller.window = function() {};
jsCow.res.controller.window.prototype = {
	
	init: function(e) {
		this.on("model.ready", this.isModelReady);
		this.on("title", this.title);
		this.on("cloasable", this.cloasable);
		this.on("maximizable", this.maximizable);
		this.on("minimizable", this.minimizable);
		this.on("close", this.close);
	},
	
	isModelReady: function(e) {
		this.trigger("view.init", this.cmp().config());
	},
	
	title: function(e) {
		this.cmp().config({
			title: e.data.title
		});
	},
	
	cloasable: function(e) {
		this.cmp().config({
			cloasable: e.data.cloasable
		});
	},
	
	maximizable: function(e) {
		this.cmp().config({
			maximizable: e.data.maximizable
		});
	},
	
	minimizable: function(e) {
		this.cmp().config({
			minimizable: e.data.minimizable
		});
	},
	
	close: function(e) {
		this.cmp().del();
	}
	
};
