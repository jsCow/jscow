(function( $ ){

	var cmenu = {
	
		'init': function( options ) {
			
			// Update position of submenu
			var updatePosition = function(menu) {
		
				// Parent
				var parent = menu.prev();
				
				var newTop = 0;
				var newLeft = parent.outerWidth();
				
				// Menu
				var pos = parent.offset();
				var right = pos.left + newLeft + menu.outerWidth();
				var bottom = pos.top + menu.outerHeight();
				
				// Screen
				var screenWidth = $(window).width();
				var screenHeight = $(window).height();
				
				// Calculate new position
				if ( right > screenWidth ) {
					newLeft = - menu.outerWidth();
				}
				if ( bottom > screenHeight ) {
					var diff = bottom - screenHeight;
					newTop = - diff;
				}
				
				if ( newLeft < 0 ) {
					newLeft = - pos.left;
				}
				
				menu.css({ left: newLeft+'px', top: newTop+'px' });
				
			};
		
			// Recursion of create menu and update
			var update = function(cfg, list) {
				
				var result = $('<div/>').addClass(cfg.css.cmenu).css({zIndex:cfg.zIndex+1});
				
				var menu = $('<ul/>').appendTo(result);
				
				// Create menu items
				$.each( list, function(i, item) {
				
					// Item disabled
					if (!disabled) {
						if (typeof item.disabled == 'undefined') var disabled = false; else var disabled = item.disabled;
					}else{
						var disabled = true;
					}
					
					// Set sep
					if (item.separator) {
						var disabled = true;
						var link = $('<div/>').addClass(cfg.css.cmenuSeparator);
					}else{
						var link = $('<div/>').html(item.name).addClass(cfg.css.cmenuItem);
					}
					
					// Set icon for item
					if (item.icon) {
						link.css({
							'background-image': 'url('+cfg.imgPath+item.icon+')',
							'background-position': 'left center',
							'background-repeat': 'no-repeat'
						});
					}
					
					var li = $('<li/>').append(link).appendTo(menu);
					
					if (disabled) {

						link.addClass(cfg.css.cmenuDisabled);
						
					}else{
						
						link.removeClass(cfg.css.cmenuDisabled);
						
						// Click event for current item
						if (typeof item.action == 'function') {
							link.click((function (item) { 
								return function () {
									item.action();
									$('.'+cfg.css.cmenu).detach();
								}; 
							})(item));
						}
					}
					
					// Submenu
					if (item.items) {
						
						li.css({
							'background-image': 'url('+cfg.imgPath+'arrow.gif)',
							'background-position': 'right center',
							'background-repeat': 'no-repeat'
						});
						
						// Create submenu
						var submenu = update(cfg, item.items);
						
						if (!disabled) {
							// Mouseover of current item
							link.mouseover( function() {
								submenu.appendTo(li);
								window.setTimeout( function() {
									updatePosition(submenu);
								}, 0);
							} );
						}
						
					}
					
				});
				
				return result;	
				
			};
			
			// Selectet html elements
			return this.each( function() {
				
				$(this).data('cmenu', {
					css: {
						cmenu: 'cmenu',
						cmenuItem: 'cmenuItem',
						cmenuDisabled: 'cmenuDisabled',
						cmenuSeparator: 'cmenuSeparator'
					},
					items: {},
					zIndex: 9999,
					imgPath: 'img/'
				} );
				
				$.extend(true, $(this).data('cmenu'), options);
				var cfg = $(this).data('cmenu');
				
				// Update context menu list
				var menu = update(cfg, cfg.items);
				
				// Mouse - right click
				$(this).bind('contextmenu', function(e) {
					
					// Remove click handler for html
					var removeHandler = function() {
						$('.'+cfg.css.cmenu).detach();
						$(this).unbind('click', removeHandler);
					}
					$('html').click( removeHandler );
					
					// Remove of opened context menus
					$('.'+cfg.css.cmenu).detach();
					
					// Append contextmenu to body
					menu.appendTo('body');
					
					// Create new context menu container or set new position of this
					var top = e.pageY;
					var left = e.pageX;
					
					// Set new position if menu out of screen
					if ( (left + menu.outerWidth()) > $(window).width() ) left = ( $(window).width() - menu.outerWidth() );
					if ( (top + menu.outerHeight()) > $(window).height() ) top = ( $(window).height() - (menu.outerHeight()) );
					menu.css({ left: left+'px', top: top+'px' });
					
					// Show menu on right click
					menu.show();
					
					return false;
					
				});
				
			});
		}

	};

	$.fn.cmenu = function( method ) {
		if ( cmenu[method] ) {
			return cmenu[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return cmenu.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.cmenu' );
		}    
	};

})( jQuery );

/* Example - 1 */
$(function(){
	var cm1 = $('.cm1').cmenu({
		items: [
			{
				name: 'First Item',
				icon: 'icon1.gif'
			},
			{ 
				name: 'Other Item',
				icon: 'icon2.gif',
				disabled: true,
				items: [
					{
						name: 'SubItem 2'
					},
					{ 
						name: '* SubItem 3',
						icon: 'icon1.gif',
						action: function(){
							console.log('* SubItem 3');
						}
					}
				]
			},
			{ 
				name: '* Second Item',
				icon: 'icon1.gif',
				action: function(){
					console.log('* Second Item');
				}
			},
			{
				separator: true
			},
			{ 
				name: 'Item',
				icon: 'icon2.gif',
				disabled: false,
				items: [
					{
						name: 'SubItem 1',
						icon: 'icon1.gif'
					},
					{ 
						name: 'SubSubItem 1',
						icon: 'icon2.gif',
						disabled: false,
						items: [
							{
								name: 'SubSubIte mSubSubItem 2'
							},
							{ 
								name: '* SubSubItem 3',
								icon: 'icon1.gif',
								action: function(){
									console.log('* SubSubItem 3');
								}
							}
						]
					},
					{ 
						name: '* SubItem 3',
						disabled: true,
						action: function(){
							console.log('* SubItem 3');
						}
					},
					{
						name: 'SubItem 4'
					}
				]
			},
			{
				separator: true
			},
			{
				name: 'Last Item'
			}
		]
	});
});

/* Example - 2 */
$(function(){
	var cm2 = $('.cm2').cmenu({
		items: [
			{
				name: 'Example 2 :: First Item'
			},
			{
				separator: true
			},
			{ 
				name: 'Example 2 :: Item',
				icon: 'icon2.gif',
				disabled: false,
				items: [
					{
						name: 'Example 2 :: SubItem 1',
						icon: 'icon1.gif'
					}
				]
			}
		]
	});
	
	$('html').click( function() {
		console.log('CLICK');
	} );
		
});