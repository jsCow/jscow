$(function(){
	
	console.time('all');
	

	maxLevel = 3;
	maxInnerCmp = 5;
	types = [
		{ name: 'toolbar', type: jsCow.res.components.toolbar },
		{ name: 'toolbargroup', type: jsCow.res.components.toolbargroup },
		{ name: 'panel', type: jsCow.res.components.panel }
	];
	
	function createNewComponent(level) {
		
		var level = level + 1;
		var type = types[Math.floor(Math.random() * types.length)].type;
		var preConfig = {  };
		var cmp = jsCow.get(type, preConfig);
		
		if (level <= maxLevel) {
			for (var x=0; x < maxInnerCmp; x++) {
				cmp.add( createNewComponent(level) );
			}
		}
		
		return cmp;
	}

	
	
	panel = jsCow.get(jsCow.res.components.panel);
	panel.add( createNewComponent(1) );
	panel.run();
	
	
	console.timeEnd('all');
	console.log(jsCow.componentsObjectList.length, "components created...");
	
});
