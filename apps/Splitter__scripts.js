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
	testApp = jsCow.applications.add('testApp').get();
		
		btn = jsCow.components.get(jsCow.res.components.button).setID("btn").setTitle("All Auto").setClickHandler(function() {
			layout1.setSplitterSizes(["auto", "auto", "auto"]);
			layout2.setSplitterSizes(["auto", "auto", "auto"]);
			layout3.setSplitterSizes(["auto", "auto", "auto"]);
			layout4.setSplitterSizes(["auto", "auto", "auto"]);
		});
		
		layout4 = jsCow.components.get(jsCow.res.components.splitter).setID("layout4").setSplitVertical().setSplitterConfig({
			resizer: [true, true],
			sizes: [100, "30%", "auto"]
		}).add(
			jsCow.components.get(jsCow.res.components.group)
		).add(
			jsCow.components.get(jsCow.res.components.group).add(
				btn
			)
		).add(
			jsCow.components.get(jsCow.res.components.group)
		);
		
		layout3 = jsCow.components.get(jsCow.res.components.splitter).setID("layout3").setSplitHorizontal().setSplitterConfig({
			resizer: [true, true],
			sizes: [100, "30%", "auto"]
		}).add(
			jsCow.components.get(jsCow.res.components.group)
		).add(
			jsCow.components.get(jsCow.res.components.group).add(
				layout4
			)
		).add(
			jsCow.components.get(jsCow.res.components.group)
		);
		
		layout2 = jsCow.components.get(jsCow.res.components.splitter).setID("layout2").setSplitVertical().setSplitterConfig({
			resizer: [true, true],
			sizes: [100, "30%", "auto"]
		}).add(
			jsCow.components.get(jsCow.res.components.group)
		).add(
			jsCow.components.get(jsCow.res.components.group).add(
				layout3
			)
		).add(
			jsCow.components.get(jsCow.res.components.group)
		);
		
		layout1 = jsCow.components.get(jsCow.res.components.splitter).setID("layout1").setSplitHorizontal().setSplitterConfig({
			resizer: [true, true],
			sizes: [100, "30%", "auto"]
		}).add(
			jsCow.components.get(jsCow.res.components.group)
		).add(
			jsCow.components.get(jsCow.res.components.group).add(
				layout2
			)
		).add(
			jsCow.components.get(jsCow.res.components.group)
		);
		
		
	testApp.setTarget( $('body') ).add(layout1).run();
	
});