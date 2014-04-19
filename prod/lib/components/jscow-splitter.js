jsCow.res.components.splitter=function(){},jsCow.res.components.splitter.prototype={init:function(){return this},setDefaultMVC:function(){return this.setModel(jsCow.res.model.splitter),this.setView(jsCow.res.view.splitter),this.setController(jsCow.res.controller.splitter),this},setSplitHorizontal:function(){return this.globalEvents.trigger("setDirection",{direction:"horizontal"},this),this},setSplitVertical:function(){return this.globalEvents.trigger("setDirection",{direction:"vertical"},this),this},setSplitterConfig:function(a){return this.globalEvents.trigger("setSplitterConfig",a,this),this},setSplitterSizes:function(a){return this.globalEvents.trigger("setSplitterSizes",a,this),this},getSplitterSizes:function(){var a=this.getModel().getConfig(),a=a.splitterConfiguration.sizes;return a},setResizer:function(a){return this.globalEvents.trigger("setResizer",a,this),this},getResizer:function(){var a=this.getModel().getConfig(),a=sizes.splitterConfiguration.resizer;return a}},jsCow.res.model.splitter=function(){this.type="jsCow.res.model.splitter",this.config={globalDisabled:!1,enabled:!0,direction:"vertical",splitterConfiguration:{},calculatedChildSizes:[]}},jsCow.res.model.splitter.prototype={init:function(){var a=this;this.getCmp().getApp().addWindowEvent({resize:function(b){a.globalEvents.trigger("windowResize",b)}}),this.globalEvents.trigger("viewInit",this.getConfig(),this.getCmp())},initialAppEvent:function(){return this.isEnabled()&&(this.setInnerWidth(this.getCmp().getParent().getInnerWidth(!0)),this.setInnerHeight(this.getCmp().getParent().getInnerHeight(!0)),this.getCmp().getView().call("setSplitterSizes",this.getConfig()),this.getCmp().getView().call("setOrientation",this.getConfig()),this.getCmp().getView().call("createSplitterResizer",this.getConfig()),this.getCmp().getView().call("calculateSizes",this.getConfig())),this},update:function(a){return this.isEnabled()&&this.windowResize(a),this},windowResize:function(){return this.isEnabled()&&(this.setInnerWidth(this.getCmp().getParent().getInnerWidth(!0)),this.setInnerHeight(this.getCmp().getParent().getInnerHeight(!0)),this.getCmp().getView().call("setSplitterSizes",this.getConfig()),this.getCmp().getView().call("calculateSizes",this.getConfig())),this},setDirection:function(a){return this.isEnabled()&&(this.setConfig({direction:a.data.direction}),this.globalEvents.trigger("viewUpdate",this.getConfig(),this.getCmp())),this},setSplitterConfig:function(a){return this.isEnabled()&&(this.setConfig({splitterConfiguration:a.data}),this.globalEvents.trigger("viewUpdate",this.getConfig(),this.getCmp())),this},setSplitterSizes:function(a){return this.isEnabled()&&(this.setConfig({splitterConfiguration:{sizes:a.data}}),this.update(a)),this},setResizer:function(a){return this.isEnabled()&&($.extend(this.config.splitterConfiguration.resizer,a.data),this.getCmp().getView().call("update",this.getConfig())),this},resizerDraggableStop:function(a){if(this.isEnabled()){var b=this,c=this.getConfig("direction"),d=this.getConfig("splitterConfiguration").sizes;$.each(this.getConfig("resizer"),function(e,f){if(f&&a.data.resizer.getID()==f.getID())if("horizontal"==c){var g=a.data.resizer.getView().getDomMain().prev().outerWidth(!0);if(a.data.clone.posX<a.data.org.posX)var h=a.data.org.posX-a.data.clone.posX,i=g-h;else var h=a.data.clone.posX-a.data.org.posX,i=g+h;0>i&&(i=1),d[e]=b.convertSize(d[e],i,b.getCmp().getInnerWidth())}else{var g=a.data.resizer.getView().getDomMain().prev().outerHeight(!0);if(a.data.clone.posY<a.data.org.posY)var h=a.data.org.posY-a.data.clone.posY,i=g-h;else var h=a.data.clone.posY-a.data.org.posY,i=g+h;0>i&&(i=1),d[e]=b.convertSize(d[e],i,b.getCmp().getInnerHeight())}}),this.update()}return this},convertSize:function(a,b,c){if(a&&b&&void 0!=a&&void 0!=b&&void 0!=c){var a=String(a),b=String(b),c=String(c);return a.indexOf("%")>0?parseInt(b/c*100)+"%":0==a.indexOf("px")||a.indexOf("px")>0?parseInt(b):"auto"==a?"auto":parseInt(b)}return"auto"}},jsCow.res.view.splitter=function(){this.execInit=!1,this.type="jsCow.res.view.splitter",this.dom={},this.dom.main=$("<div/>").addClass("jscow-splitter clearfix"),this.dom.content=$("<div/>").addClass("jscow-splitter-content clearfix").appendTo(this.dom.main),this.config={resizer:[]}},jsCow.res.view.splitter.prototype={init:function(a){var a=a.data,b=this;this.getCmp().getApp().addWindowEvent({resize:function(a){window.setTimeout(function(){b.getCmp().getApp().globalEvents.bubbleDown("windowResize",a)},0)}})},update:function(a){var a=a.data;return a&&(!a.enabled||a.globalDisabled?this.dom.main.addClass("jscow-splitter-disabled").removeClass("jscow-splitter"):(this.dom.main.addClass("jscow-splitter").removeClass("jscow-splitter-disabled"),this.setOrientation({data:a}),this.createSplitterResizer({data:a}),this.calculateSizes({data:a}),a.hide?this.dom.main.addClass("jscow-hide"):this.dom.main.removeClass("jscow-hide"))),this},createSplitterResizer:function(a){var b=this,c=a.data,d=this.getCmp().getChildren();d.length>1&&c.splitterConfiguration&&c.splitterConfiguration.resizer&&c.splitterConfiguration.resizer.length&&$.each(d,function(a,e){if(a<d.length-1){var f=e.getView().getViewList();$.each(f,function(){c.splitterConfiguration.resizer[a]?void 0!=b.config.resizer[a]&&b.config.resizer[a]?b.config.resizer[a]&&("horizontal"==c.direction?b.config.resizer[a].setHorizontalOrientation():b.config.resizer[a].setVerticalOrientation()):(b.config.resizer[a]="horizontal"==c.direction?jsCow.components.get(jsCow.res.components.resizer).setHorizontalOrientation():jsCow.components.get(jsCow.res.components.resizer).setVerticalOrientation(),b.config.resizer[a]=b.getCmp().appendAfterInner(b.config.resizer[a],e)):c.splitterConfiguration.resizer[a]||(b.config.resizer[a]&&b.config.resizer[a].del(),b.config.resizer[a]=!1)})}}),this.getCmp().getModel().setConfig({resizer:this.config.resizer})},size2Px:function(a,b){if(a&&void 0!=a&&void 0!=b){var a=String(a),b=String(b);if(a||(a="0px"),a.indexOf("%")>0){var a=a.replace("%","");return parseInt(b*a/100)}return parseInt(a.indexOf("px")>0?a:a)}return"0px"},setOrientation:function(a){var b=a.data,c=this.getCmp().getChildren();$.each(c,function(a,c){"horizontal"==b.direction?"jsCow.res.model.resizer"!=c.getModel().getType()?(c.getView().getDomMain().removeClass("clearfix"),c.getView().getDomMain().addClass("jscow-float-left jscow-splitter-crop")):"jsCow.res.model.resizer"==c.getModel().getType()&&c.setHorizontalOrientation():"jsCow.res.model.resizer"!=c.getModel().getType()?(c.getView().getDomMain().addClass("clearfix"),c.getView().getDomMain().removeClass("jscow-float-left jscow-splitter-crop")):"jsCow.res.model.resizer"==c.getModel().getType()&&c.setVerticalOrientation()})},setSplitterSizes:function(a){var b=a.data;this.getContent().width(b.__innerWidth__).height(b.__innerHeight__)},calculateSizes:function(a){if("object"==typeof this.getCmp().getParent()){var b=this,c=a.data,d=this.getCmp().getChildren(),e=0,f=0,g=[];void 0==c.splitterConfiguration.sizes&&(c.splitterConfiguration.sizes=[]),f="horizontal"==c.direction?this.getCmp().getInnerWidth():this.getCmp().getInnerHeight(),$.each(this.config.resizer,function(a,b){b&&(f-="horizontal"==c.direction?b.getView().getDomMain().outerWidth(!0):b.getView().getDomMain().outerHeight(!0))}),$.each(d,function(a,d){if(c.splitterConfiguration.sizes[a])if(c.splitterConfiguration.sizes[a]&&"auto"!=c.splitterConfiguration.sizes[a]){if(String(c.splitterConfiguration.sizes[a]).indexOf("%")>0)if("horizontal"==c.direction)var h=b.size2Px(c.splitterConfiguration.sizes[a],f);else var h=b.size2Px(c.splitterConfiguration.sizes[a],f);else var h=b.size2Px(c.splitterConfiguration.sizes[a],f);"horizontal"==c.direction?("jsCow.res.model.resizer"!=d.getModel().getType()&&(g[a]={width:h,height:b.getCmp().getInnerHeight()}),f=parseInt(f-h)):("jsCow.res.model.resizer"!=d.getModel().getType()&&(g[a]={width:b.getCmp().getInnerWidth(),height:h}),f=parseInt(f-h)),0>f&&(f=0)}else c.splitterConfiguration.sizes[a]&&e++}),$.each(d,function(a,d){c.splitterConfiguration.sizes[a]&&"auto"==c.splitterConfiguration.sizes[a]&&("horizontal"==c.direction?"jsCow.res.model.resizer"!=d.getModel().getType()&&(g[a]={width:f/e,height:b.getCmp().getInnerHeight()}):"jsCow.res.model.resizer"!=d.getModel().getType()&&(g[a]={width:b.getCmp().getInnerWidth(),height:f/e}))}),this.getCmp().getModel().setConfig({calculatedChildSizes:g}),this.dom.content.addClass("jscow-overflow-hidden"),$.each(d,function(a,b){c.splitterConfiguration.sizes[a]&&"jsCow.res.model.resizer"!=b.getModel().getType()&&(b.setWidth(g[a].width),b.setHeight(g[a].height),b.getView().getDomContent().width(Math.floor(g[a].width)),b.getView().getDomContent().height(Math.floor(g[a].height)),this.globalEvents.trigger("update",c,b)),"jsCow.res.model.resizer"==b.getModel().getType()&&this.globalEvents.trigger("update",c,b)}),this.dom.content.removeClass("jscow-overflow-hidden")}}},jsCow.res.controller.splitter=function(){this.type="jsCow.res.controller.splitter"},jsCow.res.controller.splitter.prototype={init:function(){},handleInitialAppEvent:function(a){return this.isMethodExists(this.getModel().initialAppEvent)&&this.getModel().initialAppEvent(a),this},handleSetDirection:function(a){return this.isMethodExists(this.getModel().setDirection)&&this.getModel().setDirection(a),this},handleWindowResize:function(a){return this.isMethodExists(this.getModel().windowResize)&&this.getModel().windowResize(a),this},handleSetSplitterConfig:function(a){return this.isMethodExists(this.getModel().setSplitterConfig)&&this.getModel().setSplitterConfig(a),this},handleSetSplitterSizes:function(a){return this.isMethodExists(this.getModel().setSplitterSizes)&&this.getModel().setSplitterSizes(a),this},handleSetResizer:function(a){return this.isMethodExists(this.getModel().setResizer)&&this.getModel().setResizer(a),this},handleResizerDraggableStop:function(a){return this.isMethodExists(this.getModel().resizerDraggableStop)&&this.getModel().resizerDraggableStop(a),!1}};