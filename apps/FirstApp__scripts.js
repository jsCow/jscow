$(function(){
	
	/* Initialize and configure of jsCow framework */
	jsCow.setup({
		url: {
			base: 'js/lib/jsCow/',
			applications: 'js/lib/jsCow/applications/',
			res: 'js/lib/jsCow/res/'
		}
	});
	
	myTestApp = jsCow.applications.add('myTestAppId').get();
		
		win = jsCow.components.get(jsCow.res.components.window).setConfig({ title: 'My first jsCow application ...' }).setWidth(400);
		
		bar = jsCow.components.get(jsCow.res.components.bar);
		win.add(bar);
		
		button = jsCow.components.get(jsCow.res.components.button);
		button.setClickHandler(function() {
			label.setLabel('jsCow is very easy...!!!<br/>jsCow is very easy...!!!<br/>jsCow is very easy...!!!<br/>jsCow is very easy...!!!<br/>');
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
