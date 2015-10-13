$(function(){
	
	/* Initialize and configure of jsCow framework */
	jsCow.setup({
		
	});
	
	myTestApp = jsCow.applications.add('myTestAppId').get();
		
		var x = 25;
		var y = 5;
		var maxOffsetX = 250;
		var maxOffsetY = 20;
		
		for (var i = 1; i <= x; i++) {
			for (var j = 1; j <= y; j++) {
				
				var offsetX = Math.floor(Math.random() * (maxOffsetX - 0)) + 0;
				var offsetY = Math.floor(Math.random() * (maxOffsetY - 0)) + 0;
				
				var top = 0+(j*20) + offsetY;
				var left = 0+(i*20) + offsetX;
				
				myTestApp.add(
					jsCow.components.get(jsCow.res.components.window).setConfig({ title: 'Window ' + i +", "+ j }).setWidth(200).setHeight(100).setPos(top, left).add(
						jsCow.components.get(jsCow.res.components.label).setLabel("Window component number: "+(i*j))
					)
				);
			}
		}
		
	myTestApp.run();
	
});
