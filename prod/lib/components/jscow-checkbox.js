jsCow.res.components.checkbox=function(){},jsCow.res.components.checkbox.prototype={init:function(){return this},setDefaultMVC:function(){return this.setModel(jsCow.res.model.checkbox),this.setView(jsCow.res.view.checkbox),this.setController(jsCow.res.controller.checkbox),this},click:function(){return this.globalEvents.trigger("click",{},this),this},checked:function(){return this.globalEvents.trigger("checked",{},this),this},setValue:function(a){return this.globalEvents.trigger("setValue",{value:a},this),this},getValue:function(){return this.getModel().getConfig("value")},setLabel:function(a){return this.globalEvents.trigger("setLabel",{label:a},this),this}},jsCow.res.model.checkbox=function(){this.type="jsCow.res.model.checkbox",this.config={enabled:!0,checked:!1,checkboxGroup:!1,value:!1,label:!1}},jsCow.res.model.checkbox.prototype={init:function(){this.globalEvents.trigger("viewInit",this.getConfig(),this.getCmp())},click:function(){return this.isEnabled()&&(this.setConfig(this.getConfig("checked")?{checked:!1}:{checked:!0}),this.globalEvents.trigger("viewUpdate",this.getConfig(),this.getCmp())),this},checked:function(){return this.setConfig({checked:!1}),this.click(),this},setValue:function(a){return this.setConfig({value:a.data.value}),this},setLabel:function(a){return this.setConfig({label:a.data.label}),this.globalEvents.trigger("viewUpdate",this.getConfig(),this.getCmp()),this}},jsCow.res.view.checkbox=function(){this.execInit=!1,this.type="jsCow.res.view.checkbox",this.dom={},this.dom.main=$("<div/>").addClass("jscow-form-checkbox jscow-float-left jscow-cursor"),this.dom.box=$("<div/>").addClass("jscow-form-checkbox-box jscow-float-left").appendTo(this.dom.main),this.dom.check=$("<div/>").addClass("jscow-form-checkbox-check").appendTo(this.dom.box),this.dom.label=$("<div/>").addClass("jscow-form-checkbox-label jscow-float-left")},jsCow.res.view.checkbox.prototype={init:function(a){this.dom.main.click(function(a){return function(){a.click()}}(this)),this.update(a)},update:function(a){var a=a.data;return a&&(!a.enabled||a.globalDisabled?this.dom.main.addClass("jscow-form-checkbox-disabled").removeClass("jscow-form-checkbox jscow-cursor"):(this.dom.main.addClass("jscow-form-checkbox jscow-cursor").removeClass("jscow-form-checkbox-disabled"),this.dom.check.css(a.checked?{display:"block"}:{display:"none"}),a.label?(this.dom.label.html(a.label).css({display:"block"}),this.dom.box.after(this.dom.label)):this.dom.label.html(a.label).css({display:"none"}),a.hide?this.dom.main.addClass("jscow-hide"):this.dom.main.removeClass("jscow-hide"))),this},click:function(){return this.globalEvents.trigger("click",{},this.getCmp()),this},setFocus:function(){this.dom.main.addClass("jscow-focus")}},jsCow.res.controller.checkbox=function(){this.type="jsCow.res.controller.checkbox"},jsCow.res.controller.checkbox.prototype={init:function(){},handleClick:function(a){return this.isMethodExists(this.getModel().click)&&this.getModel().click(a),this},handleChecked:function(a){return this.isMethodExists(this.getModel().checked)&&this.getModel().checked(a),this},handleSetValue:function(a){return this.isMethodExists(this.getModel().setValue)&&this.getModel().setValue(a),this},handleSetLabel:function(a){return this.isMethodExists(this.getModel().setLabel)&&this.getModel().setLabel(a),this}};