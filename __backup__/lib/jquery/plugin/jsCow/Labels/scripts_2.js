/*
	jQuery Labels/Tags Input Plugin
	Copyright (c) 2011 Intershop AG
	Author: Mario Linz
	Version: 1.0
	Date: 2011-03-09
	E-Mail: m.linz@intershop.de (work) / gelight@gmx.de (privat)
*/
(function( $ ){

	var l = {
			
		cfg : {
			inlineCursor: true,		// Allowed inline cursor between label items
			keyDelete: true,		// Allowed key delete to delete next label item
			keyBack: true,			// Allowed key backspace to delete previous label item
			uniqueItem: true,		// Item is only once occur
			caseSensitive: false,	// Case sensitive for label value
			
			// not yet in use
			// availableLabels: ['abc','def','ghi'],	// Available labels for this element
			//availableLabelsClass: 'is-available',
			
			// css classes of current labels editor
			hideClass: 'labels-hide',
			labelsClass: 'labels-container',
			inputClass: 'labels-input',
			inputCursorClass: 'labels-small-cursor',
			valueClass: 'labels-value',
			itemClass: 'labels-item',
			itemExistsClass: 'labels-itemexists',
			delitemClass: 'labels-delitem',
			clearClass: 'labels-clear'
		},
		
		'init' : function(options) {
			
			$.extend(true, l.cfg, options);
			
			this.each(function() {
				
				// Hide all selected elements
				var field = $(this).addClass(l.cfg.hideClass).attr('readonly','readonly');
				
				// Create new div container for labels
				var lc = $('<div/>').addClass(l.cfg.labelsClass);
				
				// Labels input field
				var input = $('<input/>').addClass(l.cfg.inputClass).keydown(function(e){
					
					var nextItemExists = $(this).next().length;
					var inputVal = $.trim( $(this).val() );
					
					// keys - comma, enter, space 
					if ( (e.which == 188 || e.which == 13 || e.which == 32) && (inputVal != '') ) {
						l._addItem( lc, inputVal.replace(',','') );
					}
					// key - backspace
					if( l.cfg.keyBack && e.which == 8) {
						if( inputVal == '' ) l.removePrevItem(lc);
						l._updateInputField( lc );
					}
					// key - delete (only if l.cfg.inlineCursor true and l.cfg.keyDelete true)
					if( l.cfg.inlineCursor && l.cfg.keyDelete && e.which == 46) {
						if( inputVal == '' ) l._removeNextItem(lc);
						l._updateInputField( lc );
						if (!$(this).next().length) $(this).removeClass(l.cfg.inputCursorClass);
					}
					
					// keys - left, right (only if l.cfg.inlineCursor true)
					if ( l.cfg.inlineCursor && (inputVal == '') && (e.which == 37 || e.which == 39) ) {
						if(e.which == 37) {
							$(this).prev().before( $(this) );
						}
						if(e.which == 39 && $(this).next().hasClass(l.cfg.itemClass) ) {
							$(this).next().after( $(this) );
						}
						
						// Set focus to form input field
						l._setFocus(this);
					}
					
					// Set inline style for input field
					l._inputCursorClass(lc);
					
				}).keyup(function() {
					
					// Highlight all existing label items with current input value
					var existingItems = l._itemExists(lc, $(this));
					var items = lc.find('.'+l.cfg.itemClass).removeClass(l.cfg.itemExistsClass);
					$.each( existingItems, function() {
						$(this).addClass(l.cfg.itemExistsClass);
					});
					
					// autoComplete - not yet in use
					/*window.setTimeout( function() {
						
						//console.log('input change');
						
					}, 100);*/
					// end - autoComplete - not yet in use
					
				}).appendTo(lc);
				
				// Init label items
				var fieldLabels = field.val().split(',');
				if (fieldLabels.length > 0 && fieldLabels[0] != '' ) {
					$.each( fieldLabels, function(i, value) {
						l._addItem( lc, $.trim(value) );
					});
				}

				// show labels edit container after current form field
				lc.insertAfter(this);

				// autoComplete - not yet in use
				// Create new UL container for available label list
				// Append available labels container to labels editor container and 
				// Set top/left position of available labels container
				/*
				var availableLabels = $('<ul/>').addClass(l.cfg.availableLabelsClass);
				$.each( l.cfg.availableLabels, function(i,label) {
					$('<li>'+label+'</li>').appendTo(availableLabels);
				});
				availableLabels.appendTo(lc);
				l._setAvailableLabelsPos(lc);
				*/
				// end - autoComplete - not yet in use
				
				// Append clear div to labels editor container
				$('<div/>').addClass(l.cfg.clearClass).appendTo(lc);
				
			});
			
			return this;
			
		},
		
		'_itemExists': function(c,input) {
			var list = c.find('.'+l.cfg.itemClass).find('.'+l.cfg.valueClass);
			
			var itemExists = [];
			list.each(function(){
				if (l.cfg.caseSensitive) {
					if( $(this).html() === input.val() ) { itemExists.push( $(this).closest('.'+l.cfg.itemClass) ); }
				}else{
					if( $(this).html().toLowerCase() == input.val().toLowerCase() ) { itemExists.push( $(this).closest('.'+l.cfg.itemClass) ); }
				}
			});
			
			return itemExists;
		},
		
		'_addItem' : function(c, value) {
			
			// Testing if item exists
			if ( l.cfg.uniqueItem ) {
				var itemExists = l._itemExists(c, c.find('.'+l.cfg.inputClass));
			}else{
				var itemExists = [];
			}
			
			// Only add item if item not exists
			if( !itemExists.length ) {
				var clear = $(c).find('.'+l.cfg.clearClass);
				
				// Create new item and set the click event for delete
				var item = $('<div/>').addClass(l.cfg.itemClass).delegate('.'+l.cfg.delitemClass, 'click', function(){
					item.remove();
					l._updateInputField( c );
				});
				
				var delItem = $('<span/>').addClass(l.cfg.delitemClass).appendTo(item);
				var val = $('<span/>').addClass(l.cfg.valueClass).html(value).appendTo(item);
				var input = $(c).find('.'+l.cfg.inputClass).val('');

				c.append(item);
				item.last().after(clear).after(input);
				
				// Set focus to form input field
				l._setFocus(input);
				
				// Update of the original form input field
				l._updateInputField(c);
			}
			
		},
		
		'_updateInputField': function(c) {
			var field = $(c).prev();
			var values = c.find('.'+l.cfg.valueClass);
			var str = '', comma = '';
			$.each( values, function(i,item) {
				str += comma + $.trim( $(item).html() );
				comma = ',';
			});
			field.val( str );
		},

		'removePrevItem' : function(c) {
		
			// Fill input with last removed item value
			var input = c.find('.'+l.cfg.inputClass);
			if (!$(input).next('.'+l.cfg.itemClass).length) {
				var itemValue = input.prev('.'+l.cfg.itemClass).find('.'+l.cfg.valueClass).html();
				input.val(itemValue+' ');
			}
			
			// Remove previous item
			c.find('.'+l.cfg.inputClass).prev('.'+l.cfg.itemClass).remove();
			
			l._inputCursorClass(c);
		},
		
		'_removeNextItem' : function(c) {
		
			var input = c.find('.'+l.cfg.inputClass);
			var itemValue = input.next('.'+l.cfg.itemClass).find('.'+l.cfg.valueClass).html();
			
			// Remove next item
			c.find('.'+l.cfg.inputClass).next('.'+l.cfg.itemClass).remove();
			
			// Fill input with last removed item value
			if (!$(input).next('.'+l.cfg.itemClass).length) {
				input.val(itemValue);
			}
			
			l._inputCursorClass(c);
		},
		
		'_setFocus': function(element){
			window.setTimeout( function() {
				element.focus();
			}, 30);
		},
		
		'_inputCursorClass': function(c){
			var input = $(c).find('.'+l.cfg.inputClass);
			
			if ($(input).next('.'+l.cfg.itemClass).length) {
				$(input).addClass(l.cfg.inputCursorClass);
			}else{
				$(input).removeClass(l.cfg.inputCursorClass);
			}
		},
		
		'add':function(value) {
			this.each(function() {
				l._addItem( $(this).next('.'+l.cfg.labelsClass), value );
			});
		},
		
		'remove':function(value) {
			this.each(function() {
			
				var self = this;
				
				// Remove previous item
				var item = $(this).next('.'+l.cfg.labelsClass).find('.'+l.cfg.valueClass);
				
				item.each(function(i,val) {
					if( $(val).html() == value ) {
						$(this).closest('.'+l.cfg.itemClass).remove();
						l._updateInputField( $(self).next('.'+l.cfg.labelsClass) );
					}
				});
				
			});
		},
		
		// autoComplete - not yet in use
		/*'_setAvailableLabelsPos': function(c) {

			var input = c.find('.'+l.cfg.inputClass);
			var offset = input.offset();
			
			c.find('.'+l.cfg.availableLabelsClass).css({ left:offset.left, top:(offset.top+input.outerHeight()) });
			
		}*/
		// end - autoComplete - not yet in use
		
	};
	
	$.fn.labels = function( method ) {
		if (l[method]) {
			return l[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}else if ( typeof method === 'object' || ! method ) {
			return l.init.apply( this, arguments );
		}else{
			$.error( 'Method ' +  method + ' does not exist on jQuery.labels' );
		}    
	};

})( jQuery );

$(function(){
	
	var input1 = $('.input1').labels();
	var input2 = $('.input2').labels();
	var textarea1 = $('.textarea1').labels();
	
	var textarea2 = $('.textarea2').labels({
		inlineCursor: true,
		keyDelete: true,
		keyBack: true,
		uniqueItem: true,
		caseSensitive: false
	});
	
	
	$('.add1').click(function(){
		textarea1.labels('add','TestTestTest');
	});
	$('.add2').click(function(){
		textarea2.labels('remove','TestTestTest');
		textarea2.labels('remove','Zwei');
	});
	
});
