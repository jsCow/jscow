$(function(){
	
	/* Initialize and configure of jsCow framework */
	jsCow.setup({
		url: {
			base: 'dev/js/lib/jsCow/1.0.0/',
			applications: 'dev/js/lib/jsCow/1.0.0/applications/',
			res: 'dev/js/lib/jsCow/1.0.0/res/'
		}
	});
	
	/* Application Components */
	
	themeApp = jsCow.applications.add('themeApp').get();
	
		bodySplitter = jsCow.components.get(jsCow.res.components.splitter).setSplitHorizontal();
		bodySplitter.setSplitterConfig({
			resizer: [true],
			sizes: ["20%","auto"]
		});
		bodySplitter.add(
			jsCow.components.get(jsCow.res.components.group).add(
				jsCow.components.get(jsCow.res.components.splitter).setSplitVertical().setSplitterConfig({
					resizer: [true],
					sizes: ["300px","auto"]
				}).add(
					jsCow.components.get(jsCow.res.components.group).add(
						jsCow.components.get(jsCow.res.components.panel).add(
							jsCow.components.get(jsCow.res.components.button).setTitle("Button")
						).add(
							jsCow.components.get(jsCow.res.components.input).setValue("Input Value...")
						).add(
							jsCow.components.get(jsCow.res.components.input).setConfig({enabled: false})
						).add(
							jsCow.components.get(jsCow.res.components.group).add(
								jsCow.components.get(jsCow.res.components.textarea)
							).add(
								jsCow.components.get(jsCow.res.components.textarea).setConfig({enabled: false, placeholder: "This is a textarea text ..."})
							)
						).add(
							jsCow.components.get(jsCow.res.components.panel).setTitle("Panel Title").add(
								jsCow.components.get(jsCow.res.components.textarea)
							).add(
								jsCow.components.get(jsCow.res.components.textarea).setConfig({enabled: false, placeholder: "This is a textarea text ..."})
							).add(
								jsCow.components.get(jsCow.res.components.input).setConfig({enabled: false})
							)
						)
					)
				).add(
					jsCow.components.get(jsCow.res.components.group).add(
						jsCow.components.get(jsCow.res.components.window).setConfig({ title: "Window Title", enabled: false}).add(
							jsCow.components.get(jsCow.res.components.bar).add(
								jsCow.components.get(jsCow.res.components.button).setTitle("Button")
							).add(
								jsCow.components.get(jsCow.res.components.button).setTitle("Button")
							).add(
								jsCow.components.get(jsCow.res.components.button).setTitle("Button").disabled()
							).add(
								jsCow.components.get(jsCow.res.components.input)
							).add(
								jsCow.components.get(jsCow.res.components.button).setTitle("Button").toggle()
							).add(
								jsCow.components.get(jsCow.res.components.checkbox).setLabel("Checkbox Label").setConfig({enabled: false})
							).add(
								jsCow.components.get(jsCow.res.components.input)
							).add(
								jsCow.components.get(jsCow.res.components.radio).setLabel("Radio Label")
							)
						).add(
							jsCow.components.get(jsCow.res.components.panel).setTitle("Panel Title").add(
								jsCow.components.get(jsCow.res.components.textarea)
							)
						)
					)
				)
			)
		).add(
			jsCow.components.get(jsCow.res.components.group).add(
				jsCow.components.get(jsCow.res.components.window).setConfig({ title: "Window Title"}).setWidth(500).add(
					jsCow.components.get(jsCow.res.components.panel).setTitle("Panel Title").add(
						jsCow.components.get(jsCow.res.components.button).setTitle("Button")
					)
				)
			).add(
				jsCow.components.get(jsCow.res.components.window).setConfig({ title: "Window Title"}).add(
					jsCow.components.get(jsCow.res.components.bar).add(
						jsCow.components.get(jsCow.res.components.button).setTitle("Button")
					).add(
						jsCow.components.get(jsCow.res.components.button).setTitle("Button")
					).add(
						jsCow.components.get(jsCow.res.components.button).setTitle("Button").disabled()
					).add(
						jsCow.components.get(jsCow.res.components.input)
					).add(
						jsCow.components.get(jsCow.res.components.button).setTitle("Button").setTitle("Toggle Button").setToggleHandler(
							function() {},
							function() {}
						).setToggleState(true).toggle()
					).add(
						jsCow.components.get(jsCow.res.components.checkbox).setLabel("Checkbox Label")
					).add(
						jsCow.components.get(jsCow.res.components.input).setConfig({enabled: false})
					).add(
						jsCow.components.get(jsCow.res.components.radio).setLabel("Radio Label")
					)
				).add(
					jsCow.components.get(jsCow.res.components.label).setLabel("Label Text ...")
				).add(
					jsCow.components.get(jsCow.res.components.checkbox).setLabel("Checkbox Label")
				).add(
					jsCow.components.get(jsCow.res.components.panel).setTitle("Panel Title").open().add(
						jsCow.components.get(jsCow.res.components.label).setLabel("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
					).add(
						jsCow.components.get(jsCow.res.components.panel).setTitle("Panel Title").open().add(
							jsCow.components.get(jsCow.res.components.button).setTitle("Button")
						).add(
							jsCow.components.get(jsCow.res.components.label).setLabel("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
						).add(
							jsCow.components.get(jsCow.res.components.panel).setTitle("Panel Title").open().add(
								jsCow.components.get(jsCow.res.components.group).add(
									jsCow.components.get(jsCow.res.components.button).setTitle("Button")
								)
							).add(
								jsCow.components.get(jsCow.res.components.fieldset).setConfig({legend:"Fieldset Title", enabled: true}).add(
									jsCow.components.get(jsCow.res.components.label).setLabel("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
								)
							)
						)
					)
				).add(
					jsCow.components.get(jsCow.res.components.panel).setTitle("Panel Title").open().add(
						jsCow.components.get(jsCow.res.components.button).setTitle("Button")
					)
				).add(
					jsCow.components.get(jsCow.res.components.fieldset).setConfig({legend:"Fieldset Title"}).add(
						jsCow.components.get(jsCow.res.components.label).setLabel("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
					)
				)
			)
		)
		
		freeWin1 = jsCow.components.get(jsCow.res.components.window).setConfig({ title: "FREE - Window Title"}).setWidth(500).setHeight(300).add(
			jsCow.components.get(jsCow.res.components.bar).add(
				jsCow.components.get(jsCow.res.components.button).setTitle("Button")
			).add(
				jsCow.components.get(jsCow.res.components.button).setTitle("Button")
			).add(
				jsCow.components.get(jsCow.res.components.button).setTitle("Button").disabled()
			).add(
				jsCow.components.get(jsCow.res.components.input)
			).add(
				jsCow.components.get(jsCow.res.components.button).setTitle("Button").setToggleState(true).toggle()
			).add(
				jsCow.components.get(jsCow.res.components.checkbox).setLabel("Checkbox Label")
			).add(
				jsCow.components.get(jsCow.res.components.input)
			).add(
				jsCow.components.get(jsCow.res.components.radio).setLabel("Radio Label")
			)
		).add(
			jsCow.components.get(jsCow.res.components.panel).add(
				jsCow.components.get(jsCow.res.components.textarea)
			)
		);
		
	themeApp.setTarget( $('body') ).add(bodySplitter).run();

	
});