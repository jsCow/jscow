$(function(){
	
	console.time('all');
	
	toolbar = jsCow.get(jsCow.res.components.toolbar);
	toolbar.add(
		
		jsCow.get(jsCow.res.components.toolbargroup).add(
			jsCow.get(jsCow.res.components.button, {
				id: 'GlobalTriggerButton',
				model: {
					text: 'Trigger global event MUH',
				}
			}).on('click', function(e) {
				
				console.log(e.sender.id(), ' *** Trigger for local event ... click ... >>>');
				console.log('Trigger for global event ... MUH ... >>>');
				e.sender.trigger('MUH', { muh: 123 }, false);
				
			})
		).add(
			jsCow.get(jsCow.res.components.buttongroup).add([
				jsCow.get(jsCow.res.components.button, { text: 'Button 4' }),
				jsCow.get(jsCow.res.components.button, { text: 'Button 5' }),
				jsCow.get(jsCow.res.components.button, { text: 'Button 6' })
			])
		)
		
	).add([
		
		jsCow.get(jsCow.res.components.toolbargroup).add([
			jsCow.get(jsCow.res.components.button, { 
				text: 'Button 3',
				id: 'btn3'
			}).on('click', function(e) {
				
				console.log(e.sender.id(), ' *** Trigger for local event ... click ... >>>');
				
			}),
			jsCow.get(jsCow.res.components.button, { 
				text: 'Button', 
				icon: {
					name: 'user',
					direction: 'l'
				}
			}),
			jsCow.get(jsCow.res.components.button, { 
				text: 'Button', 
				icon: {
					name: 'user',
					direction: 'r'
				}
			})
		])
		
	]).add(
		jsCow.get(jsCow.res.components.text, {
			text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt'
		})
	);
	panel1 = jsCow.get(jsCow.res.components.panel, {
		title: 'Panel 1'
	})
	.add(
		jsCow.get(jsCow.res.components.button, {
			text: 'TEST'
		}).on('MUH', function() {
			console.log("MUHHHHHHHHHHHHHHHHHHH");
		}, false)
	)
	.add(
		
		jsCow.get(jsCow.res.components.button, { 
			text: 'Listener global event MUH',
			id: 'ListenerGlobalEventMUH'
		}).on('click', function(e) {
			
			console.log(e.sender.id(), ' *** Trigger for local event ... click ... >>>');
			
		}).on('MUH', function(e) {
			
			console.log(">>> Global event ... MUH ... triggert from", e.sender.id());
			jsCow.find('btn3').trigger('click', {});
			
		}, false)
		
	)
	.add([
		
		jsCow.get(jsCow.res.components.fieldset).add([
			
			jsCow.get(jsCow.res.components.toolbar).add([
				
				jsCow.get(jsCow.res.components.toolbargroup).add([
					jsCow.get(jsCow.res.components.button, { text: 'GroupButton' }),
					jsCow.get(jsCow.res.components.button, { 
						icon: {
							name: 'user',
							direction: 'r'
						} 
					}),
					jsCow.get(jsCow.res.components.button, { text: 'GroupButton' })
				]),
				jsCow.get(jsCow.res.components.toolbargroup).add([
					jsCow.get(jsCow.res.components.button, { text: 'Disable' }).on('click', function() {
						jsCow.find('testpanel').disable();
					}),
					jsCow.get(jsCow.res.components.button, { text: 'Enable' }).on('click', function() {
						jsCow.find('testpanel').enable();
					}),
				])
				
			]),
			
			jsCow.get(jsCow.res.components.panel).add([
				
				jsCow.get(jsCow.res.components.fieldset, { title: 'Fieldset Title' }).add([
					
					jsCow.get(jsCow.res.components.text, {
						text: [
							'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
						]
					}).on('localizations.update', function(e) {
						
						this.config({
							text: e.data.localizations.de_DE.key1
						});
						
					}, false),

					jsCow.get(jsCow.res.components.layout, {
						id: 'layout1'
					}).add([
						jsCow.get(jsCow.res.components.fieldset, { title: 'Fieldset Title' }).add(
							jsCow.get(jsCow.res.components.text, {
								text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
							})
						),
						jsCow.get(jsCow.res.components.fieldset, { title: 'Fieldset Title' }).add(
							jsCow.get(jsCow.res.components.text, {
								text: 'Sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr..'
							})
						),
						jsCow.get(jsCow.res.components.fieldset, { title: 'Fieldset Title' }).add(
							jsCow.get(jsCow.res.components.text, {
								text: 'Et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
							})
						),
						jsCow.get(jsCow.res.components.fieldset, { title: 'Fieldset Title' }).add(
							jsCow.get(jsCow.res.components.text, {
								text: 'Et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
							})
						),
						jsCow.get(jsCow.res.components.fieldset, { title: 'Fieldset Title' }).add(
							jsCow.get(jsCow.res.components.text, {
								text: 'Et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
							})
						),
						jsCow.get(jsCow.res.components.fieldset, { title: 'Fieldset Title' }).add(
							jsCow.get(jsCow.res.components.text, {
								text: 'Et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
							})
						)
					]),

					jsCow.get(jsCow.res.components.group).add([
						
						jsCow.get(jsCow.res.components.radio, {
							select: true,
							model: {
								label: 'Radio label'
							}
						}),

						jsCow.get(jsCow.res.components.radio, {
							model: {
								label: 'Radio label'
							}
						}),
						
						jsCow.get(jsCow.res.components.radio, {
							group: 'radiogroup1',
							model: {
								label: 'Radio label'
							}
						}),

						jsCow.get(jsCow.res.components.radio, {
							select: true,
							group: 'radiogroup1',
							model: {
								label: 'Radio label'
							}
						}),
						
						jsCow.get(jsCow.res.components.radio, {
							select: true,
							group: 'radiogroup2',
							model: {
								label: 'Radio label'
							}
						}),

						jsCow.get(jsCow.res.components.radio, {
							group: 'radiogroup2',
							model: {
								label: 'Radio label'
							}
						})
						
					]),

					jsCow.get(jsCow.res.components.checkbox, {
						id: 'checkbox1',
						model: {
							label: 'This is my checkbox1'
						}
					}),

					jsCow.get(jsCow.res.components.checkbox, {
						id: 'checkbox2',
						model: {
							label: 'This is my checkbox2'
						}
					})

				]),

				jsCow.get(jsCow.res.components.fieldset, {
					id: 'testpanel'
				})
				.add([
					
					jsCow.get(jsCow.res.components.textfield, { value: 'MUH SAGT DIE KUH...', id: 'input' }),
					jsCow.get(jsCow.res.components.textarea, { 
						disable: true,
						value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 
						id: 'textarea',
						cols: 15
					}).on('keyup', function(e) {
						jsCow.find('testOutput').text( e.data.value.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ '<br/>' +'$2') );
					}),
					
					jsCow.get(jsCow.res.components.button, { text: 'Info' }).on('click', function() {
						jsCow.find('input').info();
						jsCow.find('textarea').info();
					}),
					jsCow.get(jsCow.res.components.button, { text: 'Success' }).on('click', function() {
						jsCow.find('input').success();
						jsCow.find('textarea').success();
					}),
					jsCow.get(jsCow.res.components.button, { text: 'Warning' }).on('click', function() {
						jsCow.find('input').warning();
						jsCow.find('textarea').warning();
					}),
					jsCow.get(jsCow.res.components.button, { text: 'Danger' }).on('click', function() {
						jsCow.find('input').danger();
						jsCow.find('textarea').danger();
					}),
					jsCow.get(jsCow.res.components.button, { text: 'Default' }).on('click', function() {
						jsCow.find('input').standard();
						jsCow.find('textarea').standard();
						jsCow.find('localizations').load();
					})
					
				]),
				
				jsCow.get(jsCow.res.components.fieldset, { title: 'Fieldset Title' }).add(
					jsCow.get(jsCow.res.components.text, {
						id: 'testOutput',
						text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
					})
				)
				
			])
			
		])
		
	]);
	
	toolbar.run();
	panel1.run();
	
	localizations = jsCow.get(jsCow.res.components.localizations, { id: 'localizations' }).run();
	
	win1 = jsCow.get(jsCow.res.components.window, {
		title: 'My first window',
		model: {
			closable: true
		}
	}).add([
		
		jsCow.get(jsCow.res.components.toolbar).add([
			
			jsCow.get(jsCow.res.components.toolbargroup).add([
				jsCow.get(jsCow.res.components.button, { text: 'GroupButton' }),
				jsCow.get(jsCow.res.components.button, { 
					icon: {
						name: 'user',
						direction: 'r'
					} 
				}),
				jsCow.get(jsCow.res.components.button, { text: 'GroupButton' })
			]),
			jsCow.get(jsCow.res.components.toolbargroup).add([
				jsCow.get(jsCow.res.components.button, { text: 'Disable' }).on('click', function() {
					jsCow.find('testpanel').disable();
				}),
				jsCow.get(jsCow.res.components.button, { text: 'Enable' }).on('click', function() {
					jsCow.find('testpanel').enable();
				}),
			])
			
		])
		
	]);
	win1.run();
	/*
	win2 = jsCow.get(jsCow.res.components.window, {
		title: 'My second window'
	}).add([
		
		jsCow.get(jsCow.res.components.toolbar).add([
		])
		
	]);
	win2.run();
	*/
	
	console.timeEnd('all');
	console.log(jsCow.componentsObjectList.length, "components created...");
	
});
