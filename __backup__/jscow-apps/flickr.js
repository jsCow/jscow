$(function(){
	
	/* Initialize and configure of jsCow framework */
	jsCow.setup({
		
	});
	
	flickr = jsCow.components.get(jsCow.res.components.ajax).setUrl("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?").setData({
		format: "json",
		tagmode: "any",
		tags: "*"
	}).setDataType("jsonp");
	
	myTestApp = jsCow.applications.add('myTestAppId').get();
		
		checkbox = jsCow.components.get(jsCow.res.components.checkbox).setLabel("Checkbox here");
		win = jsCow.components.get(jsCow.res.components.window).setConfig({ title: 'Image List' }).setWidth(500).setHeight(200).setPos(50, 50).setID("WindowImageList");
		win.add(
			checkbox
		);
		bar = jsCow.components.get(jsCow.res.components.bar);
		
		button = jsCow.components.get(jsCow.res.components.button).setTitle("Load new images from flickr");
		button.setClickHandler(function() {
			win.deleteChildren();
			flickr.exec();
		});
		bar.add(button);
		
		input = jsCow.components.get(jsCow.res.components.input);
		button.events.register("click", input, function(e) {
			this.setValue(e.data.sender.getTitle());
		});
		bar.add(input);
		
	myTestApp.add(bar).add(win);	
	myTestApp.run();
	
	/*
	flickr.events.register("success", button, function(e) {
		console.log(e);
	});
	*/
	
	
	/*
	$.getJSON( "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
		tags: "*",
		tagmode: "any",
		format: "json"
	}).done(function(data){
		
		var WindowImageList = jsCow.components.find("WindowImageList");
		
		$.each(data.items, function(i, item) {
			WindowImageList.add(
				jsCow.components.get(jsCow.res.components.panel).setTitle(item.title).setID("panel"+i).collapse().append(
					jsCow.components.get(jsCow.res.components.button).setTitle('Detail').setClickHandler(function(){
						var win = jsCow.components.get(jsCow.res.components.window).setConfig({ title: 'Details' }).setWidth(300).setHeight(200).setPos(50, 500);
						myTestApp.add(win);
					})
				).append(
					jsCow.components.get(jsCow.res.components.label).setLabel('Link to flickr: <a href="'+ item.link +'" target="_blank">'+ item.link +'</a>')
				).append(
					jsCow.components.get(jsCow.res.components.label).setLabel('Preview:<br/><img src="'+item.media.m+'" alt="" />')
				)
			);
			if (i === 3) return false;
		});
		
	});
	*/

});
