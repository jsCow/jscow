$(function(){
	
	/* Initialize and configure of jsCow framework */
	jsCow.setup({
		url: {
			base: 'js/lib/jscow/',
			applications: 'js/lib/jscow/applications/',
			res: 'js/lib/jscow/res/'
		}
	});
	
	myTestApp = jsCow.applications.add('myTestAppId').get();
		
		win = jsCow.components.get(jsCow.res.components.window).setConfig({ title: 'My first jsCow application ...' }).setWidth(400).setPos(50, 200);
		
		bar = jsCow.components.get(jsCow.res.components.bar);
		win.add(bar);
		
		button = jsCow.components.get(jsCow.res.components.button).setTitle("Set Label text");
		button.setClickHandler(function() {
			label.setLabel('jsCow is very easy...!!!<br/>jsCow is very easy...!!!<br/>jsCow is very easy...!!!<br/>jsCow is very easy...!!!<br/><br/>jsCow is very easy...!!!<br/>jsCow is very easy...!!!');
		});
		bar.add(button);
		button = jsCow.components.get(jsCow.res.components.button).setTitle("Close - My Panel");
		button.setClickHandler(function() {
			panel.collapse();
		});
		bar.add(button);
		button = jsCow.components.get(jsCow.res.components.button).setTitle("Open - My Panel");
		button.setClickHandler(function() {
			panel.open();
		});
		bar.add(button);
		
		panel = jsCow.components.get(jsCow.res.components.panel);
		panel.setTitle('My Panel').open();
		win.add(panel);
		
		label = jsCow.components.get(jsCow.res.components.label);
		label.setConfig({ label: 'jsCow is cool...' });
		panel.add(label);
		
	myTestApp.add(win);	
	myTestApp.run();
	
});
