
$(function () {


	// SET some defaults
	var action = 'click';
	// this can be click, dblclick or hover, default is click
	var speed = '500';
	// speed of revealing is 500ms


	// Question handler
	$('li.q').on(action, function () {

		// It slides down the immediate next element (the answer, li.a) if it is hidden, or slides it up if it is visible. 
		$(this).next()
			.slideToggle(speed)
			.siblings('li.a')

			// It automatically slides up any other open answers on the page, ensuring only one answer stays open at a time.
			.slideUp();


		// Get image for active question
		var img = $(this).children('img');
		// Remove the 'rotate' class for all images except the active
		$('img').not(img).removeClass('rotate');
		// Toggle rotate class
		img.toggleClass('rotate');
	});


});