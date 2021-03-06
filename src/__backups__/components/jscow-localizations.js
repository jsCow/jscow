
jsCow.res.components.localizations = function() {};
jsCow.res.components.localizations.prototype = {

	init: function() {
		
		this.addController(jsCow.res.controller.localizations);
		this.addModel(jsCow.res.model.localizations);
		
		return this;
	},

	load: function() {
		this.trigger("load", {
			"de_DE": {
				key1: "Das ist der Lokalisierungs-Key Nummer 1",
				key2: "Ein 2ter Key mit einer Übersetzung",
				key3: "Key Nummer 3"
			},
			"en_EN": {
				key1: "This is the localiztion key number 1",
				key2: "Second key with a localization",
				key3: "Key number 3"
			}
		});
	}
	
};

jsCow.res.model.localizations = function() {
	
	this.data = {
		enabled: true,
		visible: true
	};
	
};
jsCow.res.model.localizations.prototype = {
	
	init: function(e) {
		this.trigger("model.ready", this.data);
	}
	
};

jsCow.res.controller.localizations = function() {};
jsCow.res.controller.localizations.prototype = {
	
	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("load", this.load);
	},
	
	isModelReady: function(e) {
		
		// ...
		
	},
	
	load: function(e) {
		this.cmp().config({
			localizations: e.data
		});
		
		this.trigger("localizations.update", this.cmp().config(), false);
	}
	
};
