$(function(){
	
	/* Initialize and configure of jsCow framework */
	jsCow.setup({
		url: {
			
		}
	});

	login = jsCow.applications.add('login').get();
		
		win = jsCow.components.get(jsCow.res.components.window).setID("loginDialog").setConfig({ title: 'Login' }).setPos("1%", "3%").setWidth("30%");
		win.add(
			jsCow.components.get(jsCow.res.components.fieldset).setTitle("Userdata").add(
				jsCow.components.get(jsCow.res.components.group).add(
					jsCow.components.get(jsCow.res.components.label).setLabel("E-Mail")
				).add(
					jsCow.components.get(jsCow.res.components.input).setAlign("center").setDefaultText("Your e-mail address")
				)
			).add(
				jsCow.components.get(jsCow.res.components.group).add(
					jsCow.components.get(jsCow.res.components.label).setLabel("Password")
				).add(
					jsCow.components.get(jsCow.res.components.input).setAlign("center").setDefaultText("Your password")
				)
			)
		).add(
			jsCow.components.get(jsCow.res.components.fieldset).setTitle("Application").setMainStyle({
				marginBottom: 70
			}).add(
				jsCow.components.get(jsCow.res.components.group).add(
					jsCow.components.get(jsCow.res.components.label).setLabel("Name of the application")
				).add(
					jsCow.components.get(jsCow.res.components.input).setAlign("center").setDefaultText("The application")
				)
			)
		).add(
			jsCow.components.get(jsCow.res.components.bar).setMainStyle({
				position: 'absolute',
				bottom: 0,
				width: '100%'
			}).add(
				jsCow.components.get(jsCow.res.components.button).setTitle("Submit").setMainStyle({
					margin: '5px 10px',
					padding: '5px 10px',
					float: 'right'
				})
			)
		);
		login.add(win);
		
	login.run();
	
	
	
	profile = jsCow.applications.add('profile').get();
		
		profileWindow = jsCow.components.get(jsCow.res.components.window).setConfig({ title: 'Profile' }).setPos("10%", "34%").setWidth(600).setHeight(450).add(
			jsCow.components.get(jsCow.res.components.splitter).setID("splitter").setSplitVertical().setSplitterConfig({
				resizer: [false, false],
				sizes: ["auto", 41]
			}).add(
				jsCow.components.get(jsCow.res.components.group).add(
					jsCow.components.get(jsCow.res.components.splitter).setID("splitter").setSplitHorizontal().setSplitterConfig({
						resizer: [true, false],
						sizes: [200, "auto"]
					}).add(
						jsCow.components.get(jsCow.res.components.group).add(
							jsCow.components.get(jsCow.res.components.panel).setTitle("Profile").open().add(
								jsCow.components.get(jsCow.res.components.button).setTitle("Account")
							).add(
								jsCow.components.get(jsCow.res.components.button).setTitle("E-Mail")
							).add(
								jsCow.components.get(jsCow.res.components.button).setTitle("Password")
							)
						).add(
							panel = jsCow.components.get(jsCow.res.components.panel).setTitle("Orders").open().add(
								jsCow.components.get(jsCow.res.components.label).setConfig({ label: 'No orders available.' })
							)
						).add(
							panel = jsCow.components.get(jsCow.res.components.panel).setTitle("Gift Certificates").collapse().add(
								jsCow.components.get(jsCow.res.components.label).setConfig({ label: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.' })
							)
						).add(
							panel = jsCow.components.get(jsCow.res.components.panel).setTitle("Panel 4").collapse().add(
								jsCow.components.get(jsCow.res.components.label).setConfig({ label: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.' })
							)
						).add(
							panel = jsCow.components.get(jsCow.res.components.panel).setTitle("Panel 5").collapse().add(
								jsCow.components.get(jsCow.res.components.label).setConfig({ label: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.' })
							)
						)
					).add(
						jsCow.components.get(jsCow.res.components.group).add(
							jsCow.components.get(jsCow.res.components.fieldset).setTitle("Account").add(
								jsCow.components.get(jsCow.res.components.group).add(
									jsCow.components.get(jsCow.res.components.label).setLabel("Name")
								).add(
									jsCow.components.get(jsCow.res.components.input).setAlign("center").setDefaultText("Name")
								).add(
									jsCow.components.get(jsCow.res.components.group).add(
										jsCow.components.get(jsCow.res.components.label).setLabel("First Name")
									).add(
										jsCow.components.get(jsCow.res.components.input).setAlign("center").setDefaultText("First Name")
									)
								).add(
									jsCow.components.get(jsCow.res.components.group).add(
										jsCow.components.get(jsCow.res.components.label).setLabel("Street")
									).add(
										jsCow.components.get(jsCow.res.components.input).setAlign("center").setDefaultText("Street")
									)
								).add(
									jsCow.components.get(jsCow.res.components.group).add(
										jsCow.components.get(jsCow.res.components.label).setLabel("ZIP")
									).add(
										jsCow.components.get(jsCow.res.components.input).setDefaultText("12345")
									)
								).add(
									jsCow.components.get(jsCow.res.components.group).add(
										jsCow.components.get(jsCow.res.components.label).setLabel("Tel")
									).add(
										jsCow.components.get(jsCow.res.components.input).setDefaultText("+49123456789")
									)
								).add(
									jsCow.components.get(jsCow.res.components.panel).setTitle("test").open().add(
										jsCow.components.get(jsCow.res.components.checkbox).setLabel("Newsletter")
									)
								).add(
									jsCow.components.get(jsCow.res.components.panel).open().add(
										jsCow.components.get(jsCow.res.components.checkbox).setLabel("Active")
									)
								)
							)
						)
					)
				)
			).add(
				jsCow.components.get(jsCow.res.components.group).add(
					jsCow.components.get(jsCow.res.components.bar).add(
						jsCow.components.get(jsCow.res.components.button).setTitle("Save Profile").setMainStyle({
							float: 'right'
						})
					)
				)
			)
		);
		
		profile.add(profileWindow);
	
	profile.run();
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*
	myTestApp = jsCow.applications.add('myTestAppId').get();
		
		win = jsCow.components.get(jsCow.res.components.window).setID("win").setConfig({ title: 'Window' }).setPos(50,200).setWidth(800).setHeight(500);
		
		winCnt = jsCow.components.get(jsCow.res.components.group);
		win.add(winCnt);
		
		bar = jsCow.components.get(jsCow.res.components.bar);
		bar.setPosition({
			position: 'absolute',
			bottom: 0
		});
		win.add(bar);
		
		button = jsCow.components.get(jsCow.res.components.button).setClickHandler(function() {
			win.append(
				jsCow.components.get(jsCow.res.components.window).setConfig({ title: 'Window' }).setPos(30,100).setWidth(300).setHeight(200).setID("StefanWindow")
			);
			
			this.disabled();
		});
		bar.add(
			jsCow.components.get(jsCow.res.components.radio).setLabel("Radio Radio ").setGroup("radiogroup")
		).add(
			jsCow.components.get(jsCow.res.components.radio).setLabel("Radio Radio ").setGroup("radiogroup")
		).add(
			jsCow.components.get(jsCow.res.components.radio).setLabel("Radio Radio ").setGroup("radiogroup")
		).add(
			jsCow.components.get(jsCow.res.components.radio).setLabel("Radio Radio ").setGroup("radiogroup")
		).add(button);
		
		button = jsCow.components.get(jsCow.res.components.button).setTitle("Button").setClickHandler(function() {
			jsCow.components.find("StefanWindow").append(
				jsCow.components.get(jsCow.res.components.panel).add(
					jsCow.components.get(jsCow.res.components.label).setLabel("Stefan is cool...")
				)
			);
		});
		bar.add(button).add(
			jsCow.components.get(jsCow.res.components.checkbox).setLabel("sdihfo sduibf")
		);

		button = jsCow.components.get(jsCow.res.components.button);
		bar.add(button);
		
		panel = jsCow.components.get(jsCow.res.components.panel).open();
			label = jsCow.components.get(jsCow.res.components.label);
			label.setConfig({ label: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' });
		panel.add(label).add(
			jsCow.components.get(jsCow.res.components.radio).setLabel("Radio Radio ").setGroup("radiogroup")
		).add(
			jsCow.components.get(jsCow.res.components.radio).setLabel("Radio Radio ").setGroup("radiogroup")
		).add(
			jsCow.components.get(jsCow.res.components.radio).setLabel("Radio Radio ").setGroup("radiogroup")
		).add(
			jsCow.components.get(jsCow.res.components.radio).setLabel("Radio Radio ").setGroup("radiogroup")
		);
		winCnt.add(panel);
		
		winCnt.add(
			jsCow.components.get(jsCow.res.components.panel).setTitle('Panel 2').collapse().disabled()
		);

		panel3 = jsCow.components.get(jsCow.res.components.panel).setTitle('Panel 3').collapse().add(
			jsCow.components.get(jsCow.res.components.label).setLabel("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
		);
		winCnt.add(panel3);
		
		panel4 = jsCow.components.get(jsCow.res.components.panel).setTitle('Panel 4').setMainStyle("margin-bottom: 40px;").open().add(
			jsCow.components.get(jsCow.res.components.label).setConfig({ label: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' })
		).add(
			jsCow.components.get(jsCow.res.components.radio).setLabel("Radio Radio ").setGroup("radiogroup1")
		).add(
			jsCow.components.get(jsCow.res.components.radio).setLabel("Radio Radio ").setGroup("radiogroup1")
		).add(
			jsCow.components.get(jsCow.res.components.radio).setLabel("Radio Radio ").setGroup("radiogroup1")
		).add(
			jsCow.components.get(jsCow.res.components.radio).setLabel("Radio Radio ").setGroup("radiogroup1")
		);
		panel.events.register("onchange", panel4, function(e) {
			console.log(e);
		});
		winCnt.add(panel4);
		
	myTestApp.add(win);	
	
		win2 = jsCow.components.get(jsCow.res.components.window).setID("win2").setConfig({ title: 'Window' }).setPos(80,550).setWidth(400).setHeight(400);
		fieldset1 = jsCow.components.get(jsCow.res.components.fieldset).setTitle("Fieldset").add(
			jsCow.components.get(jsCow.res.components.label).setLabel("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
		);
		win2.add( fieldset1 );
		
		win2.add( 
			jsCow.components.get(jsCow.res.components.bar).add(
				jsCow.components.get(jsCow.res.components.button).setTitle("Button") 
			)
		);

		fieldset2 = jsCow.components.get(jsCow.res.components.fieldset).setTitle("Fieldset").disabled().add(
			jsCow.components.get(jsCow.res.components.label).setLabel("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.")
		);
		win2.add( fieldset2 );
		
	myTestApp.add(win2);	
		
		win3 = jsCow.components.get(jsCow.res.components.window).setID("win3").setConfig({ title: 'Window' }).setPos(30,900).setWidth(400).setHeight(300);
			
			layout3 = jsCow.components.get(jsCow.res.components.splitter).setID("layout3").setSplitHorizontal().setSplitterConfig({
				resizer: [true],
				sizes: [100, "auto"]
			}).add(
				jsCow.components.get(jsCow.res.components.group)
			).add(
				jsCow.components.get(jsCow.res.components.group)
			);
			
			layout2 = jsCow.components.get(jsCow.res.components.splitter).setID("layout2").setSplitVertical().setSplitterConfig({
				resizer: [true, true],
				sizes: [100, "100", "auto"]
			}).add(
				jsCow.components.get(jsCow.res.components.group).add(
					layout3
				)
			).add(
				jsCow.components.get(jsCow.res.components.group)
			).add(
				jsCow.components.get(jsCow.res.components.group)
			);
			
			layout1 = jsCow.components.get(jsCow.res.components.splitter).setID("layout1").setSplitHorizontal().setSplitterConfig({
				resizer: [true, true],
				sizes: [100, "100", "auto"]
			}).add(
				jsCow.components.get(jsCow.res.components.group).add(
					panel = jsCow.components.get(jsCow.res.components.panel).setTitle("Panel Title").collapse().add(
						jsCow.components.get(jsCow.res.components.label).setConfig({ label: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' })
					)
				)
			).add(
				jsCow.components.get(jsCow.res.components.group)
			).add(
				jsCow.components.get(jsCow.res.components.group).add(
					layout2
				)
			);
			
		win3.add( layout1 );
		
	myTestApp.add(win3);
	
		win4 = jsCow.components.get(jsCow.res.components.window).setID("win4");
		win4.setConfig({ title: 'Window' }).setPos(120,800).setWidth(600).setHeight(400);
		win4.add(
			jsCow.components.get(jsCow.res.components.group).setMainStyle("jscow-padded").add(
				jsCow.components.get(jsCow.res.components.input).setID("input1").setValue("Input Field")
			)
		).add(
			jsCow.components.get(jsCow.res.components.group).setMainStyle("jscow-padded").add(
				jsCow.components.get(jsCow.res.components.input).disabled().setValue("Input Field").setAlign("none")
			)
		).add(
			jsCow.components.get(jsCow.res.components.group).setMainStyle("jscow-padded").add(
				jsCow.components.get(jsCow.res.components.input).setValue("Input Field").setAlign("right")
			)
		).add(
			jsCow.components.get(jsCow.res.components.group).setMainStyle("jscow-padded").add(
				jsCow.components.get(jsCow.res.components.checkbox).setLabel("Checkbox")
			).add(
				jsCow.components.get(jsCow.res.components.checkbox).setLabel("Checkbox").disabled()
			).add(
				jsCow.components.get(jsCow.res.components.checkbox).setLabel("Checkbox").checked()
			)
		).add(
			jsCow.components.get(jsCow.res.components.group).setMainStyle("jscow-padded").add(
				jsCow.components.get(jsCow.res.components.textarea).setValue("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
			)
		).add(
			jsCow.components.get(jsCow.res.components.group).setMainStyle("jscow-padded").add(
				jsCow.components.get(jsCow.res.components.textarea).disabled().setAlign("none").setValue("Lorem ipsum dolor sit amet, consetetur sadipscing elitr")
			)
		).add(
			jsCow.components.get(jsCow.res.components.group).setMainStyle("jscow-padded").add(
				jsCow.components.get(jsCow.res.components.textarea).setAlign("right").setValue("Lorem ipsum dolor sit amet, consetetur sadipscing elitr")
			)
		).add(
			jsCow.components.get(jsCow.res.components.group).setMainStyle("jscow-padded").add(
				jsCow.components.get(jsCow.res.components.radio).setLabel("Radio").setGroup("radiogroup").checked()
			).add(
				jsCow.components.get(jsCow.res.components.radio).setLabel("Radio").setGroup("radiogroup").disabled()
			).add(
				jsCow.components.get(jsCow.res.components.radio).setLabel("Radio").setGroup("radiogroup")
			)
		);
		
	myTestApp.add(win4);

	myTestApp.add(
		jsCow.components.get(jsCow.res.components.splitter).setSplitHorizontal().setSplitterConfig({
			resizer: [true],
			sizes: ["20%", "auto"]
		}).add(
			jsCow.components.get(jsCow.res.components.group).add(
				jsCow.components.get(jsCow.res.components.splitter).setSplitVertical().setSplitterConfig({
					resizer: [true],
					sizes: ["30%", "auto"]
				}).add(
					jsCow.components.get(jsCow.res.components.group).add(
						jsCow.components.get(jsCow.res.components.splitter).setSplitHorizontal().setSplitterConfig({
							resizer: [true],
							sizes: ["50%", "auto"]
						}).add(
							jsCow.components.get(jsCow.res.components.group)
						).add(
							jsCow.components.get(jsCow.res.components.group)
						)
					)
				).add(
					jsCow.components.get(jsCow.res.components.group)
				)
			)
		).add(
			jsCow.components.get(jsCow.res.components.group).add(
				jsCow.components.get(jsCow.res.components.splitter).setSplitVertical().setSplitterConfig({
					resizer: [true],
					sizes: ["70%", "auto"]
				}).add(
					jsCow.components.get(jsCow.res.components.group)
				).add(
					jsCow.components.get(jsCow.res.components.group)
				)
			)
		)
	);
	
	
	
	
	win4.events.register("onBeforeClose", win2, function(e) {
		console.log(this);
	});
	win4.events.register("onBeforeClose", win2, function(e) {
		
	});
	win4.events.register("onBeforeClose", win2, function(e) {
		
	});
	
	win4.events.register("onClose", win2, function(e) {
		e.sender.del();
	});
	
	


		stefan = jsCow.components.get(jsCow.res.components.window);
		stefan.setConfig({
			title: "Stefan's Fenster"
		}).setHeight(200).setWidth(400);

		stefan.events.register("onClose", stefan, function(e) {
			alert("muh...");
		});


	myTestApp.add(stefan);
	
	
	
	myTestApp.run();
	*/
	
});
