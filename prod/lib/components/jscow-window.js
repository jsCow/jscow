jsCow.res.components.window=function(){},jsCow.res.components.window.prototype={init:function(){return this},setDefaultMVC:function(){this.setModel(jsCow.res.model.window),this.setView(jsCow.res.view.window),this.setController(jsCow.res.controller.window)},setZIndex:function(a){return this.globalEvents.trigger("setZIndex",{__zindex__:a},this),this},showCloseButton:function(){return this.globalEvents.trigger("showCloseButton",{},this),this},hideCloseButton:function(){return this.globalEvents.trigger("hideCloseButton",{},this),this},showMaxButton:function(){return this.globalEvents.trigger("showMaxButton",{},this),this},hideMaxButton:function(){return this.globalEvents.trigger("hideMaxButton",{},this),this},showMinButton:function(){return this.globalEvents.trigger("showMinButton",{},this),this},hideMinButton:function(){return this.globalEvents.trigger("hideMinButton",{},this),this},close:function(){return this.globalEvents.trigger("close",{},this),this}},jsCow.res.model.window=function(){this.type="jsCow.res.model.window",this.config={globalDisabled:!1,enabled:!0,__top__:null,__left__:null,__closeButton__:!0,__maxButton__:!0,__minButton__:!0,zindex:0}},jsCow.res.model.window.prototype={init:function(){this.globalEvents.trigger("viewInit",this.getConfig(),this.getCmp())},setTitle:function(){return this.isEnabled()&&(this.setConfig({title:""}),this.globalEvents.trigger("viewUpdate",this.getConfig(),this.getCmp()),this.events.trigger("onTitleChange",this.getConfig())),this},showCloseButton:function(){return this.isEnabled()&&(this.setConfig({__closeButton__:!0}),this.globalEvents.trigger("viewUpdate",this.getConfig(),this.getCmp())),this},hideCloseButton:function(){return this.isEnabled()&&(this.setConfig({__closeButton__:!1}),this.globalEvents.trigger("viewUpdate",this.getConfig(),this.getCmp())),this},showMaxButton:function(){return this.isEnabled()&&(this.setConfig({__maxButton__:!0}),this.globalEvents.trigger("viewUpdate",this.getConfig(),this.getCmp())),this},hideMaxButton:function(){return this.isEnabled()&&(this.setConfig({__maxButton__:!1}),this.globalEvents.trigger("viewUpdate",this.getConfig(),this.getCmp())),this},showMinButton:function(){return this.isEnabled()&&(this.setConfig({__minButton__:!1}),this.globalEvents.trigger("viewUpdate",this.getConfig(),this.getCmp())),this},hideMinButton:function(){return this.isEnabled()&&(this.setConfig({__minButton__:!1}),this.globalEvents.trigger("viewUpdate",this.getConfig(),this.getCmp())),this},close:function(){return this.isEnabled()&&this.getCmp().events.trigger("onBeforeClose",{})&&(this.getCmp().del(),this.getCmp().events.trigger("onClose",{})),this}},jsCow.res.view.window=function(){this.execInit=!1,this.type="jsCow.res.view.window",this.maximized=!1,this.minimized=!1,this.dom={},this.dom.main=$("<div/>").addClass("jscow-window"),this.dom.button={},this.dom.button.close=$("<div/>").addClass("jscow-window-button").append("&#215;").appendTo(this.dom.main),this.dom.button.max=$("<div/>").addClass("jscow-window-button").append("&equiv;").appendTo(this.dom.main),this.dom.button.min=$("<div/>").addClass("jscow-window-button").append("&#8230;").appendTo(this.dom.main),this.dom.title=$("<div/>").addClass("jscow-window-title jscow-cursor clearfix").appendTo(this.dom.main),this.dom.icon=$("<div/>").addClass("jscow-window-title-ico jscow-ico-16 jscow-float-left").appendTo(this.dom.title),this.dom.title.text=$("<div/>").addClass("jscow-window-title-text jscow-float-left").appendTo(this.dom.title),this.dom.content=$("<div/>").addClass("jscow-window-content").addClass("clearfix").appendTo(this.dom.main)},jsCow.res.view.window.prototype={init:function(a){var b=a.data;$("<div/>").addClass("clearfix").appendTo(this.dom.main),b.title&&this.dom.title.html(b.title),this.dom.main.css({zIndex:jsCow.getNextZIndex()}),this.dom.title.click(function(a){return function(){a.setTitle(),a.setIcon()}}(this)).dblclick(function(a){return function(){(a.getCmp().getModel().getConfig("enabled")||!a.getCmp().getModel().getConfig("globalDisabled"))&&a.setMaximized()}}(this)),this.dom.button.close.click(function(a){return function(){(a.getCmp().getModel().getConfig("enabled")||!a.getCmp().getModel().getConfig("globalDisabled"))&&a.getCmp().globalEvents.trigger("close",{},a.getCmp())}}(this)),this.dom.button.max.click(function(a){return function(){(a.getCmp().getModel().getConfig("enabled")||!a.getCmp().getModel().getConfig("globalDisabled"))&&a.setMaximized()}}(this)),this.dom.button.min.click(function(a){return function(){(a.getCmp().getModel().getConfig("enabled")||!a.getCmp().getModel().getConfig("globalDisabled"))&&a.setMinimized()}}(this)),window.setTimeout(function(a){return function(){a.dom.main.draggable({handle:a.dom.title,iframeFix:!0,drag:function(){a.dom.content.css("visibility","hidden")},stop:function(){a.dom.content.css("visibility","visible"),a.getCmp().setPos(a.dom.main.position().top,a.dom.main.position().left)}})}}(this),0),this.update(a)},update:function(a){var a=a.data;return a&&(!a.enabled||a.globalDisabled?this.dom.main.addClass("jscow-window-disabled").removeClass("jscow-window"):(this.dom.main.addClass("jscow-window").removeClass("jscow-window-disabled"),a.title&&this.dom.title.html(a.title),a.__closeButton__?this.showCloseButton():this.hideCloseButton(),a.__maxButton__?this.showMaxButton():this.hideMaxButton(),a.__minButton__?this.showMinButton():this.hideMinButton(),a.__width__&&this.dom.main.width(a.__width__),a.__height__&&this.dom.content.height(a.__height__),a.__top__&&this.dom.main.css({top:a.__top__}),a.__left__&&this.dom.main.css({left:a.__left__}),a.__zindex__&&this.dom.main.css({zindex:a.__zindex__}),a.hide?this.dom.main.addClass("jscow-hide"):this.dom.main.removeClass("jscow-hide"))),this},setMaximized:function(){return this.maximized?(this.showMinButton(),this.dom.main.removeClass("jscow-window-maximized"),this.maximized=!1):(this.hideMinButton(),this.dom.main.addClass("jscow-window-maximized"),this.maximized=!0),this.getCmp().events.trigger("onMaximized",{}),this.getCmp().globalEvents.trigger("update",{},this.getCmp().getChildren()),this},setMinimized:function(){return this.minimized?(this.dom.content.show(),this.showMaxButton(),this.minimized=!1):(this.dom.content.hide(),this.hideMaxButton(),this.minimized=!0),this.getCmp().events.trigger("onMinimized",{}),this.getCmp().globalEvents.trigger("update",{},this.getCmp().getChildren()),this},setTitle:function(){return this.globalEvents.trigger("setTitle",{},this.getCmp()),this},setIcon:function(){return this.globalEvents.trigger("setIcon",{},this.getCmp()),this},setFocus:function(){return this.dom.main.css({zIndex:jsCow.getNextZIndex()}).addClass("jscow-focus"),this},showCloseButton:function(){return this.dom.button.close.show(),this},hideCloseButton:function(){return this.dom.button.close.hide(),this},showMaxButton:function(){return this.dom.button.max.show(),this},hideMaxButton:function(){return this.dom.button.max.hide(),this},showMinButton:function(){return this.dom.button.min.show(),this},hideMinButton:function(){return this.dom.button.min.hide(),this}},jsCow.res.controller.window=function(){this.type="jsCow.res.controller.window"},jsCow.res.controller.window.prototype={init:function(){},handleSetTitle:function(a){return this.isMethodExists(this.getModel().setTitle)&&this.getModel().setTitle(a),!0},handleSetTop:function(a){return this.isMethodExists(this.getModel().setTop)&&this.getModel().setTop(a),!0},handleSetLeft:function(a){return this.isMethodExists(this.getModel().setLeft)&&this.getModel().setLeft(a),!0},handleShowCloseButton:function(a){return this.isMethodExists(this.getModel().showCloseButton)&&this.getModel().showCloseButton(a),!0},handleHideCloseButton:function(a){return this.isMethodExists(this.getModel().hideCloseButton)&&this.getModel().hideCloseButton(a),!0},handleShowMaxButton:function(a){return this.isMethodExists(this.getModel().showMaxButton)&&this.getModel().showMaxButton(a),!0},handleHideMaxButton:function(a){return this.isMethodExists(this.getModel().hideMaxButton)&&this.getModel().hideMaxButton(a),!0},handleShowMinButton:function(a){return this.isMethodExists(this.getModel().showMinButton)&&this.getModel().showMinButton(a),!0},handleHideMinButton:function(a){return this.isMethodExists(this.getModel().hideMinButton)&&this.getModel().hideMinButton(a),!0},handleClose:function(a){return this.isMethodExists(this.getModel().close)&&this.getModel().close(a),!0}};