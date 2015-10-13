$(function(){
	
	eventsExampleApp = jsCow.applications.add('EventsTest').get();
		
		win1 = jsCow.components.get(jsCow.res.components.window).setConfig({ title: "Window 1" });
		win1.setWidth(300).setPos(30, 30);
		
		win1.add(
			jsCow.components.get(jsCow.res.components.bar).add(
				jsCow.components.get(jsCow.res.components.button).setID("btn1").setTitle("Button 1")
			).add(
				jsCow.components.get(jsCow.res.components.button).setID("btn2").setTitle("Button 2")
			).add(
				jsCow.components.get(jsCow.res.components.button).setID("btn3").setTitle("Button 3")
			)
		);
		
		win2 = jsCow.components.get(jsCow.res.components.window).setConfig({ title: "Window 2" })
		win2.setWidth("30%").setPos(30, 400).add(
			jsCow.components.get(jsCow.res.components.bar).add(
				jsCow.components.get(jsCow.res.components.button).setTitle("Register events").setClickHandler(function() {
					
					jsCow.components.find("output").setLabel("Events registered...");
					
					jsCow.components.find("btn1").events.register("click", jsCow.components.find("output"), function(e) {
						this.setLabel("Button '" + e.data.sender.getID() + "' clicked.");
					});
					jsCow.components.find("btn2").events.register("click", jsCow.components.find("output"), function(e) {
						this.setLabel("Button '" + e.data.sender.getID() + "' clicked.");
					});
					jsCow.components.find("btn3").events.register("click", jsCow.components.find("output"), function(e) {
						this.setLabel("Button '" + e.data.sender.getID() + "' clicked.");
					});
					
				})
			)
		).add(
			jsCow.components.get(jsCow.res.components.bar).add(
				jsCow.components.get(jsCow.res.components.button).setTitle("Trigger Click on Button 1").setClickHandler(function() {
					jsCow.components.find("btn1").click();
				})
			).add(
				jsCow.components.get(jsCow.res.components.button).setTitle("Trigger Click on Button 2").setClickHandler(function() {
					jsCow.components.find("btn2").click();
				})
			).add(
				jsCow.components.get(jsCow.res.components.button).setTitle("Trigger Click on Button 3").setClickHandler(function() {
					jsCow.components.find("btn3").click();
				})
			)
		).add(
			jsCow.components.get(jsCow.res.components.panel).open().add(
				jsCow.components.get(jsCow.res.components.label).setID("output").setLabel("...")
			)
		);
		
	eventsExampleApp.add(win1).add(win2);
	eventsExampleApp.run();
	
});