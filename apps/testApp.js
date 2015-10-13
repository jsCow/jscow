$(function(){
	
	/* Application Components */

	testApp = jsCow.applications.add('testApp').get();
	
	var group1 = jsCow.components.get( jsCow.res.components.group);
	
	singlebutton1 = jsCow.components.get( jsCow.res.components.button ).setID("singlebutton1").setTitle("Enabled");
	group1.add(singlebutton1);
	singlebutton2 = jsCow.components.get( jsCow.res.components.button ).setID("singlebutton2").setTitle("Disabled");
	singlebutton3 = jsCow.components.get( jsCow.res.components.button ).setID("singlebutton3").setTitle("Button").setClickHandler(function(){ 
		console.log("# Normal - Click", this.getID()); 
	});
	singlebutton1.setClickHandler(function(){ 
		console.log("# Normal - Click", this.getID()); 
		singlebutton3.enabled();
		button3.enabled();
	});
	singlebutton2.setClickHandler(function(){ 
		console.log("# Normal - Click", this.getID()); 
		singlebutton3.disabled();
		button3.disabled();
	});
	
	var button1 = jsCow.components.get( jsCow.res.components.button ).setID("button1").setTitle("Ein Muh-Drück 1").setToggleHandler(
		function() { console.log("# Push", this.getID()); },
		function() { console.log("# Pull", this.getID()); }
	).setClickHandler(function(){ 
		console.log("# Normal - Click", this.getID()); 
	}).setButtonGroup("btnGroup1");
	var button2 = jsCow.components.get( jsCow.res.components.button ).setID("button2").setTitle("Ein Muh-Drück 2").setToggleHandler(
		function() { console.log("# Push", this.getID()); },
		function() { console.log("# Pull", this.getID()); }
	).setClickHandler(function(){ 
		console.log("# Normal - Click", this.getID()); 
	}).setButtonGroup("btnGroup1");
	var button3 = jsCow.components.get( jsCow.res.components.button ).setID("button3").setTitle("Ein Muh-Drück 3").setToggleHandler(
		function() { console.log("# Push", this.getID()); },
		function() { console.log("# Pull", this.getID()); }
	).setClickHandler(function(){ 
		console.log("# Normal - Click", this.getID()); 
	}).setButtonGroup("btnGroup1");
	var button4 = jsCow.components.get( jsCow.res.components.button ).setID("button4").setTitle("Ein Muh-Drück 4").setToggleHandler(
		function() { console.log("# Push", this.getID()); },
		function() { console.log("# Pull", this.getID()); }
	).setClickHandler(function(){ 
		console.log("# Normal - Click", this.getID()); 
	}).setButtonGroup("btnGroup1");
	
	var togglebutton1 = jsCow.components.get( jsCow.res.components.button ).setID("togglebutton1").setTitle("Toggle(disabled)").setToggleHandler(
		function() { console.log("# Toggle - Push", this.getID()); },
		function() { console.log("# Toggle - Pull", this.getID()); }
	).setToggleState(true).disabled();
	var togglebutton2 = jsCow.components.get( jsCow.res.components.button ).setID("togglebutton2").setTitle("Toggle").setToggleHandler(
		function() { 
			console.log("# Toggle - Push", this.getID()); 
			button3.click(); 
		},
		function() { 
			console.log("# Toggle - Pull", this.getID()); 
			button2.click(); 
		}
	).setToggleState(true);
	
	var button11 = jsCow.components.get( jsCow.res.components.button ).setID("button11").setTitle("Ein Muh-Drück 11").setToggleHandler(
		function() { console.log("# Push", this.getID()); },
		function() { console.log("# Pull", this.getID()); }
	).setButtonGroup("btnGroup2");
	var button12 = jsCow.components.get( jsCow.res.components.button ).setID("button12").setTitle("Ein Muh-Drück 12").setToggleHandler(
		function() { console.log("# Push", this.getID()); },
		function() { console.log("# Pull", this.getID()); }
	).setButtonGroup("btnGroup2");
	var button13 = jsCow.components.get( jsCow.res.components.button ).setID("button13").setTitle("Ein Muh-Drück 13").setToggleHandler(
		function() { console.log("# Push", this.getID()); },
		function() { console.log("# Pull", this.getID()); }
	).setButtonGroup("btnGroup2");
	
	fieldset1 = jsCow.components.get( jsCow.res.components.fieldset ).setID("fieldset1").setConfig({legend:"Normaler Button"});
	fieldset2 = jsCow.components.get( jsCow.res.components.fieldset ).setID("fieldset2").setConfig({legend:"Eine coole Button Gruppe was?"});
	fieldset3 = jsCow.components.get( jsCow.res.components.fieldset ).setID("fieldset3").setConfig({legend:"Ein Toggle Button"});
	fieldset4 = jsCow.components.get( jsCow.res.components.fieldset ).setID("fieldset4").setConfig({legend:"Noch eine kleine coole Button Gruppe"});
	
	
	//myCmp = jsCow.components.get(jsCow.res.components.myComponent);
	//myCmp.setMyText("My text...");
	//fieldset1.add(myCmp);
	
	anim = null;
	var animation = jsCow.components.get( jsCow.res.components.button ).setID("animation").setTitle("start animation").setToggleHandler(
		function() { 
			this.setTitle("stop animation");
			anim = window.setInterval(function() {
				var index = Math.floor(0+(Math.random()*4))
				if (index == 0) { button1.click(); fieldset2.setTitle(button1.getConfig("title")); }
				if (index == 1) { button2.click(); fieldset2.setTitle(button2.getConfig("title")); }
				if (index == 2) { button3.click(); fieldset2.setTitle(button3.getConfig("title")); }
				if (index == 3) { button4.click(); fieldset2.setTitle(button4.getConfig("title")); }
			}, 10);
		},
		function() { 
			this.setTitle("start animation");
			window.clearInterval(anim);
		}
	).setToggleState(true);

	label1 = jsCow.components.get( jsCow.res.components.label).setID("label1").setConfig({
		label:"<b>TODO:</b><br/><br/>- List (Table)<br/>- Menu<br/>- Slider<br/>- Splitter<br/>- Window<br/>- Context Menü<br/>- Dark Layer PlugIn<br/>- Tree<br/>- Dropdwn/Multidropdown"
	});
	
	input1 = jsCow.components.get( jsCow.res.components.input ).setID("input1").setConfig({input:'muh input'}).setValue("muh...");	

	radio1 = jsCow.components.get( jsCow.res.components.radio ).setID("radio1").setGroup("radioGroup1");
	radio2 = jsCow.components.get( jsCow.res.components.radio ).setID("radio2").setGroup("radioGroup1").setLabel("Ein Label");	
	radio3 = jsCow.components.get( jsCow.res.components.radio ).setID("radio3").setGroup("radioGroup1").checked();
	radio4 = jsCow.components.get( jsCow.res.components.radio ).setID("radio4").setGroup("radioGroup1").setLabel("Ein Label");

	radio5 = jsCow.components.get( jsCow.res.components.radio ).setID("radio5").setGroup("radioGroup2").checked().setLabel("Ein Label");
	radio6 = jsCow.components.get( jsCow.res.components.radio ).setID("radio6").setGroup("radioGroup2");	
	radio7 = jsCow.components.get( jsCow.res.components.radio ).setID("radio7").setGroup("radioGroup2").setLabel("Ein Label");
	
	checkbox1 = jsCow.components.get( jsCow.res.components.checkbox ).setID("checkbox1").setLabel("Ein Label");
	checkbox2 = jsCow.components.get( jsCow.res.components.checkbox ).setID("checkbox2").setLabel("Ein Label");
	checkbox3 = jsCow.components.get( jsCow.res.components.checkbox ).setID("checkbox3").setLabel("Ein Label");
	checkbox4 = jsCow.components.get( jsCow.res.components.checkbox ).setID("checkbox4").setLabel("Ein Label");

	// end - Mario - Tests	
	
	// Chriz - Tests
		
		win = jsCow.components.get( jsCow.res.components.window ).setID("winTest").setConfig({title:'Christians Window Component - Ohne Children :)', icon: "http://www.mariowiki.com/images/1/1e/BabyYoshiSMW.PNG"});	
			var bar = jsCow.components.get( jsCow.res.components.bar );
			bar.append(animation);
		//win.add(bar);
		
		/* LIVE VIDEO CHAT
		var chatConfigChris = {
			// chatSenderUrl: 'http://dev.jscow.de/dev/php/Webcam/webcamHost/index.php',
			// chatStreamUrl: 'http://dev.jscow.de/dev/php/Webcam/webcamStreamView/index.php',
			host: 'rtmp://jscow.gelight-tec.de/oflaDemo',
			id: 'camStreamChris',
			logo: 'http://jscow.gelight-tec.de/skins/pixeled/images/jscow.png',
			width: 320,
			height: 240,
			fsp: 25,
			keyFrameInterval: 15,
			quality: 80
		};
		var chatConfigMario = {
			// chatSenderUrl: 'http://dev.jscow.de/dev/php/Webcam/webcamHost/index.php',
			// chatStreamUrl: 'http://dev.jscow.de/dev/php/Webcam/webcamStreamView/index.php',
			host: 'rtmp://jscow.gelight-tec.de/oflaDemo',
			id: 'camStreamMario',
			logo: 'http://jscow.gelight-tec.de/skins/pixeled/images/jscow.png',
			width: 320,
			height: 240,
			fsp: 25,
			keyFrameInterval: 15,
			quality: 80
		};
		

		chat1 = jsCow.components.get( jsCow.res.components.videochat).setConfig(chatConfigChris).setChatSender("http://dev.jscow.de/dev/php/Webcam/webcamHost/index.php");
		chat2 = jsCow.components.get( jsCow.res.components.videochat).setConfig(chatConfigMario).setChatStream("http://dev.jscow.de/dev/php/Webcam/webcamStreamView/index.php");
		win.add(chat1).add(chat2);
		
		var chatBtn1 = jsCow.components.get( jsCow.res.components.button ).setTitle("Chat Stream Reload").setClickHandler(function(){ 
			chat2.reload();
		});
		win.add(chatBtn1);
		*/
				
		fieldset1.add(group1);
		fieldset1.add(singlebutton2).add(singlebutton3).add(radio1).add(radio2).add(radio3).add(radio4);
		fieldset2.add(button1).add(button2).add(button3).add(button4).add(radio5).add(radio6).add(radio7);
		fieldset3.add(togglebutton1).add(togglebutton2).add(input1).add(checkbox1).add(checkbox2).add(checkbox3).add(checkbox4);
		fieldset4.add(button11).add(button12).add(button13);
		
	// end - Chriz Window - Tests

	var listTitleBtn = jsCow.components.get( jsCow.res.components.button ).setTitle("Cool was?").setClickHandler(function(){ 
		
		var muhbtn =  jsCow.components.get( jsCow.res.components.button ).setTitle("Ein Muh-Drück");
		console.log(muhbtn.getID());
		fieldset1.append(muhbtn);
		
	});

	
	/* Splitter */
	
	var splitterGroup1 = jsCow.components.get( jsCow.res.components.group).add(fieldset1);
	var splitterGroup2 = jsCow.components.get( jsCow.res.components.group).add(bar);
	var splitterGroup3 = jsCow.components.get( jsCow.res.components.group).add(fieldset2);
	var splitterGroup4 = jsCow.components.get( jsCow.res.components.group).add(fieldset3);
	var splitterGroup5 = jsCow.components.get( jsCow.res.components.group).add(fieldset4);

	
	
	
	
	input1 = jsCow.components.get( jsCow.res.components.input );
	splitterGroup2.add(input1);
	
	textarea1 = jsCow.components.get( jsCow.res.components.textarea);
	
	panel1 = jsCow.components.get( jsCow.res.components.panel).setTitle("My Title 1");
	panel1.add(textarea1);

	panel2 = jsCow.components.get( jsCow.res.components.panel).setTitle("My Title 2");
	panel2.add(panel1);
	
	splitterGroup2.add(panel2);
	
	
	
	
	splitter = jsCow.components.get( jsCow.res.components.splitter).setID("splitter");
	splitter.setSplitHorizontal();
	//splitter.setSplitVertical();
	splitter.setSplitterConfig({
		resizer: [true, true, true, true],
		//sizes: ["auto", 100, "30%", "auto",  "20%"]
		sizes: ["auto", 800, "20%", 100, "auto"]
	});
	splitter.add(splitterGroup1).add(splitterGroup2).add(splitterGroup3).add(splitterGroup4).add(splitterGroup5);
	//splitter.add(splitterGroup2);
	
	
	/* WINDOW */
	win = jsCow.components.get(jsCow.res.components.window).setConfig({ title: 'My first jsCow application ...' });

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
	splitterGroup2.add(win);
	/* end - WINDOW */
	
	
	//win.setHeight(300);
	//win.add(splitter);
	
	
	/* end - Splitter*/
	
	
	//testApp.setTarget( $('body') ).add(win).run();
	testApp.setTarget( $('body') ).add(splitter).run();

	
});