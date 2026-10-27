// jQuery code will be applied only when all of the document has finished loading
$(function () {

	// alert('Doc is loaded');


	// Set Options ------------
	var speed = 500;							// Slide to slide fade speed, in milliseconds
	var autoswitch = true;				// Auto slider options
	var autoswitchSpeed = 4000		// Auto slider speed




	// Add initial .active class to the first .slide --------------
	$('.slide').first().addClass('active');

	// Hide all other slides ---------------
	$('.slide').hide();

	// Immediately show/reveal first/only slide (that now has the '.active' class) ---------------
	$('.active').show();




	// Next Button Handler (on click runs the nextSlide function)
	// alert('Next button was clicked');
	$('#next').on('click', nextSlide);

	// Prev Button Handler (on click runs the prevSlide function)
	// alert('Prev button was clicked');
	$('#prev').on('click', prevSlide);




	// Auto Slider Handler (If autoswitch is true, this triggers the nextSlide function automatically every 4 seconds [4000 milliseconds]) --------------------
	if (autoswitch == true) {
		setInterval(nextSlide, autoswitchSpeed);
	}




	// Core function - The nextSlide() and prevSlide() functions use a temporary placeholder class called '.oldActive' to shift the active state seamlessly ---------------------

	// Switch to next slide
	function nextSlide() {
		// Remove .active from the current slide and mark it as .oldActive
		$('.active').removeClass('active').addClass('oldActive');

		// Check if the current slide is the last child. If yes, move the .active class back to the first slide. If it's not the last slide, select the next sequential sibling element and add .active
		if ($('.oldActive').is(':last-child')) {
			$('.slide').first().addClass('active');
		} else {
			$('.oldActive').next().addClass('active');
		}

		// Remove the temporary .oldActive class
		$('.oldActive').removeClass('oldActive');

		// Fade out the old slide and fade in the new active slide over 0.5 seconds[500 milliseconds].
		$('.slide').fadeOut(speed);
		$('.active').fadeIn(speed);
	}

	// Switch to prev slide
	function prevSlide() {
		// Remove .active from the current slide and mark it as .oldActive
		$('.active').removeClass('active').addClass('oldActive');

		// Check if the current slide is the first child. If yes, move the .active class back to the last slide. If it's not the first slide, select the previous sequential sibling element and add .active
		if ($('.oldActive').is(':first-child')) {
			$('.slide').last().addClass('active');
		} else {
			$('.oldActive').prev().addClass('active');
		}

		// Remove the temporary .oldActive class
		$('.oldActive').removeClass('oldActive');

		// Fade out the old slide and fade in the new active slide over 0.5 seconds[500 milliseconds].
		$('.slide').fadeOut(speed);
		$('.active').fadeIn(speed);
	}



});

