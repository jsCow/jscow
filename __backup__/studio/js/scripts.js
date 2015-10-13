$(function(){
	
	$("[data-action]").click(function() {
		var self = this;
		
		$.ajax({
			type: "POST",
			data: { 
				action: $(self).data("action"),
				value: $(self).data("action-value") 
			},
			url: "/services.php",
			error: function(data) {
				console.log(data);
			}
		});
		
	});

	$("[data-geturlcontent]").click(function() {
		var self = this;
		
		$.ajax({
			type: "POST",
			data: {
				url: $(self).data("geturlcontent")
			},
			url: "/url-content.php",
			success: function(data) {
				$(self).val(data);
			}
		});
		
	});
	
});