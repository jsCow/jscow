jsCow.res.components.fieldset=function(){},jsCow.res.components.fieldset.prototype={init:function(){return this},setDefaultMVC:function(){return this.setModel(jsCow.res.model.fieldset),this.setView(jsCow.res.view.fieldset),this.setController(jsCow.res.controller.fieldset),this},setTitle:function(a){return this.globalEvents.trigger("setTitle",{legend:a},this),this}},jsCow.res.model.fieldset=function(){this.type="jsCow.res.model.fieldset",this.config={globalDisabled:!1,enabled:!0,lastLegend:"",legend:""}},jsCow.res.model.fieldset.prototype={init:function(){this.globalEvents.trigger("viewInit",this.getConfig(),this.getCmp())},setTitle:function(a){return this.isEnabled()&&(this.setConfig({lastLegend:this.getConfig("legend"),legend:a.data.legend}),this.globalEvents.trigger("viewUpdate",this.getConfig(),this.getCmp())),this}},jsCow.res.view.fieldset=function(){this.execInit=!1,this.type="jsCow.res.view.fieldset",this.dom={},this.dom.main=$("<fieldset/>").addClass("jscow-fieldset"),this.dom.legend=$("<legend/>").addClass("jscow-fieldset-legend").appendTo(this.dom.main),this.dom.content=$("<div/>").addClass("jscow-fieldset-content clearfix").appendTo(this.dom.main)},jsCow.res.view.fieldset.prototype={init:function(a){var b=a.data;this.dom.legend.html(b.legend),this.update(a)},update:function(a){var a=a.data;return a&&(!a.enabled||a.globalDisabled?this.dom.main.addClass("jscow-fieldset-disabled").removeClass("jscow-fieldset"):(this.dom.main.addClass("jscow-fieldset").removeClass("jscow-fieldset-disabled"),this.dom.legend.html(a.legend),a.hide?this.dom.main.addClass("jscow-hide"):this.dom.main.removeClass("jscow-hide"))),this}},jsCow.res.controller.fieldset=function(){this.type="jsCow.res.controller.fieldset"},jsCow.res.controller.fieldset.prototype={init:function(){},handleSetTitle:function(a){return this.isMethodExists(this.getModel().setTitle)&&this.getModel().setTitle(a),this}};