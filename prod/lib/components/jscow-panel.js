jsCow.res.components.panel=function(){},jsCow.res.components.panel.prototype={init:function(){return this},setDefaultMVC:function(){return this.setModel(jsCow.res.model.panel),this.setView(jsCow.res.view.panel),this.setController(jsCow.res.controller.panel),this},open:function(){return this.globalEvents.trigger("open",{},this),this},collapse:function(){return this.globalEvents.trigger("collapse",{},this),this},setTitle:function(a){return this.globalEvents.trigger("setTitle",{title:a},this),this}},jsCow.res.model.panel=function(){this.type="jsCow.res.model.panel",this.config={enabled:!0,collapsed:!1,title:!1,arrow:{open:"&#9660;",collapsed:"&#9658;"}}},jsCow.res.model.panel.prototype={init:function(){this.globalEvents.trigger("viewInit",this.getConfig(),this.getCmp())},collapse:function(){return this.setConfig({collapsed:!0}),this.globalEvents.trigger("viewUpdate",this.getConfig(),this.getCmp()),this.events.trigger("collapse",this.getConfig()),this},open:function(){return this.setConfig({collapsed:!1}),this.globalEvents.trigger("viewUpdate",this.getConfig(),this.getCmp()),this.events.trigger("open",this.getConfig()),this},setTitle:function(a){return this.isEnabled()&&(this.setConfig({title:a.data.title}),this.globalEvents.trigger("viewUpdate",this.getConfig(),this.getCmp()),this.events.trigger("onchange",this.getConfig())),this}},jsCow.res.view.panel=function(){this.execInit=!1,this.type="jsCow.res.view.panel",this.dom={},this.dom.main=$("<div/>").addClass("jscow-panel clearfix"),this.dom.title=$("<div/>").addClass("jscow-panel-title jscow-cursor clearfix"),this.dom.title.arrow=$("<div/>").addClass("jscow-panel-title-arrow jscow-float-left").appendTo(this.dom.title),this.dom.title.text=$("<div/>").addClass("jscow-panel-title-text jscow-float-left").appendTo(this.dom.title),this.dom.content=$("<div/>").addClass("jscow-panel-content clearfix"),this.configCache={}},jsCow.res.view.panel.prototype={init:function(a){var b=a.data;this.configCache=b,void 0!=b.title&&b.title&&(this.dom.title.arrow.html(b.arrow.open),this.dom.title.text.html(b.title),this.dom.title.appendTo(this.dom.main)),this.dom.content.appendTo(this.dom.main),this.dom.title.click(function(a){return function(){a.configCache.collapsed?a.open():a.collapse()}}(this)),b.collapsed&&this.collapse(),b.collapsed?(this.dom.title.arrow.html(b.arrow.collapsed),this.dom.content.hide()):(this.dom.title.arrow.html(b.arrow.open),this.dom.content.show()),this.update(a)},update:function(a){var a=a.data;return this.configCache=a,a&&(!a.enabled||a.globalDisabled?this.dom.main.addClass("jscow-panel-disabled").removeClass("jscow-panel"):(this.dom.main.addClass("jscow-panel").removeClass("jscow-panel-disabled"),a.collapsed?(this.dom.title.arrow.html(a.arrow.collapsed),this.dom.content.hide()):(this.dom.title.arrow.html(a.arrow.open),this.dom.content.show()),a.hide?this.dom.main.addClass("jscow-hide"):this.dom.main.removeClass("jscow-hide"))),this},open:function(){return this.globalEvents.trigger("open",{},this.getCmp()),this},collapse:function(){return this.globalEvents.trigger("collapse",{},this.getCmp()),this}},jsCow.res.controller.panel=function(){this.type="jsCow.res.controller.panel"},jsCow.res.controller.panel.prototype={init:function(){},handleOpen:function(a){return this.isMethodExists(this.getModel().open)&&this.getModel().open(a),!0},handleCollapse:function(a){return this.isMethodExists(this.getModel().collapse)&&this.getModel().collapse(a),!0},handleSetTitle:function(a){return this.isMethodExists(this.getModel().setTitle)&&this.getModel().setTitle(a),!0}};