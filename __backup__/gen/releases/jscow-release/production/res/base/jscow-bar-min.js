/* jscow - Javascript Component Framework - jscow-bar-trunk - Mario Linz - http://www.jscow.de */jsCow.res.components.bar=function(){};jsCow.res.components.bar.prototype={init:function(){return this},setDefaultMVC:function(){this.setModel(jsCow.res.model.bar);this.setView(jsCow.res.view.bar);this.setController(jsCow.res.controller.bar);return this}};jsCow.res.model.bar=function(){this.type="jsCow.res.model.bar";this.config={enabled:true}};jsCow.res.model.bar.prototype={init:function(){this.globalEvents.trigger("viewInit",this.getConfig(),this.getCmp())}};jsCow.res.view.bar=function(){this.execInit=false;this.type="jsCow.res.view.bar";this.dom={};this.dom.main=$("<div/>").addClass("jscow-bar clearfix");this.dom.content=$("<div/>").addClass("jscow-bar-content clearfix").appendTo(this.dom.main)};jsCow.res.view.bar.prototype={init:function(b){var a=b.data;this.update(b)},update:function(a){var a=a.data;if(a){if(!a.enabled||a.globalDisabled){this.dom.main.addClass("jscow-bar-disabled").removeClass("jscow-bar")}else{this.dom.main.addClass("jscow-bar").removeClass("jscow-bar-disabled")}if(a.hide){this.dom.main.addClass("jscow-hide")}else{this.dom.main.removeClass("jscow-hide")}}return this}};jsCow.res.controller.bar=function(){this.type="jsCow.res.controller.bar"};jsCow.res.controller.bar.prototype={init:function(){}};