$(function(){
	
	jsCow.setup({
		url: {
			domain: 'http://dev.jscow.de',
			jsonp_test_php: '/jsonp-ajaxchat.php'
		}
	});
	
	AjaxChat = jsCow.applications.add('AjaxChat').get();
		
		chat = jsCow.components.get(jsCow.res.components.window).setID("chat").setConfig({ title: "Support Chat" });
		chat.setWidth(700).setHeight(450).setPos(100, 150);
		
		chat.add(
			jsCow.components.get(jsCow.res.components.splitter).setSplitVertical().setSplitterConfig({
				resizer: [false],
				sizes: [34, "auto"]
			}).add(
				jsCow.components.get(jsCow.res.components.group).add(
					jsCow.components.get(jsCow.res.components.bar).add(
						jsCow.components.get(jsCow.res.components.button).setTitle("Support rufen").setID("startChat").setClickHandler(function() {
							
							jsCow.components.find("startChat").hide().disabled();
							jsCow.components.find("closeChat").enabled().show();
							
							AjaxChatCommunication.setData({
								userID: 12345,
								callSupport: true
							}).exec();
							
						})
					).add(
						jsCow.components.get(jsCow.res.components.button).setTitle("Chat beenden").setID("closeChat").setClickHandler(function() {
							
							AjaxChatCommunication.setData({
								userID: 12345,
								closeChat: true
							}).exec();
							
						}).hide().disabled()
					)
				)
			).add(
				jsCow.components.get(jsCow.res.components.group).add(
					
					jsCow.components.get(jsCow.res.components.splitter).setSplitHorizontal().setSplitterConfig({
						resizer: [true],
						sizes: ["70%", "auto"]
					}).add(
						
						jsCow.components.get(jsCow.res.components.group).add(
							
							jsCow.components.get(jsCow.res.components.splitter).setSplitVertical().setSplitterConfig({
								sizes: ["auto", 100]
							}).add(
								jsCow.components.get(jsCow.res.components.group).add(
									jsCow.components.get(jsCow.res.components.group).setMainStyle({
										padding: '5px',
										backgroundColor: '#fff',
										height: '100%',
										overflow: 'auto'
									}).add(
										jsCow.components.get(jsCow.res.components.label).setID("chatLog")
									)
								)
							).add(
								jsCow.components.get(jsCow.res.components.group).add(
									jsCow.components.get(jsCow.res.components.group).add(
										jsCow.components.get(jsCow.res.components.textarea).setID('message').setAlign("fillup").setMainStyle({
											padding: '5px'
										}).disabled()
									).add(
										jsCow.components.get(jsCow.res.components.button).setID('sendMessage').setTitle("Nachricht senden").setMainStyle({
											padding: '5px',
											margin: '0 5px 0 0',
											float: 'right'
										}).setClickHandler(function() {
											
											var log = jsCow.components.find("chatLog").getLabel();
											var messageField = jsCow.components.find("message");
											var message = messageField.getValue();
											messageField.setValue("");
											
											if(message) 
												jsCow.components.find("chatLog").setLabel(log+"<br/>"+">> "+message)
											
										}).disabled()
									)
								)
							)
							
						)
						
					).add(
						
						jsCow.components.get(jsCow.res.components.group).add(
							jsCow.components.get(jsCow.res.components.splitter).setSplitVertical().setSplitterConfig({
								sizes: ["auto", "auto"]
							}).add(
								jsCow.components.get(jsCow.res.components.group).add(
									jsCow.components.get(jsCow.res.components.bar).setMainStyle({
										padding: '5px'
									}).add(
										jsCow.components.get(jsCow.res.components.label).setID("HostName").setLabel("...").setMainStyle({
											width: '100%',
											display: 'block',
											textAlign: 'center'
										})
									)
								)
							).add(
								jsCow.components.get(jsCow.res.components.group).add(
									jsCow.components.get(jsCow.res.components.bar).add(
										jsCow.components.get(jsCow.res.components.label).setID("ClientName").setLabel("...").setMainStyle({
											width: '100%',
											display: 'block',
											textAlign: 'center'
										})
									)
								)
							)
						)
						
					)
					
				)
			)
		);
		
	AjaxChat.add(chat);
	AjaxChat.run();
	
	AjaxChatCommunication = jsCow.components.get(jsCow.res.components.ajax);
	AjaxChatCommunication.setUrl(jsCow.getSetup().url.domain + jsCow.getSetup().url.jsonp_test_php);
	AjaxChatCommunication.setDataType("jsonp", "myCallback");
	AjaxChatCommunication.events.register("success", chat, function(e) {
		console.log("success:", e.data);
	});
	
});