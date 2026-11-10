$(function () {


	
	// Set default active tab on load
	$('nav ul li:first-child').addClass('current');

	$('nav a').on('click', function (e) {
		e.preventDefault();

		// Current class assignment
		$('nav li.current').removeClass('current');
		$(this).parent().addClass('current');

		// Set heading text
		$('h1#heading').text($(this).text());

		// Get & filter link category name
		var category = $(this).text().toLowerCase().replace(/\s+/g, '-');

		// Filter gallery items
		if (category === 'all-projects') {
			$('ul#gallery li:hidden').stop(true, true).fadeIn('slow').removeClass('hidden');
		} else {
			$('ul#gallery li').each(function () {
				if (!$(this).hasClass(category)) {
					$(this).stop(true, true).fadeOut('fast').addClass('hidden');
				} else {
					$(this).stop(true, true).fadeIn('slow').removeClass('hidden');
				}
			});
		}
	});



	// Mouseenter Overlay Effect
	$('ul#gallery').on('mouseenter', 'li', function () {
		var $link = $(this).children('a');
		var title = $link.data('title') || '';
		var desc = $link.data('desc') || 'Click To Enlarge';

		// Remove existing overlay if present to avoid duplication
		$(this).find('.overlay').remove();

		// Append and fade in overlay
		var $overlay = $('<div class="overlay"><h3>' + title + '</h3><p>' + desc + '</p></div>');
		$(this).append($overlay);
		$overlay.stop(true, true).fadeIn(300);
	});



	// Mouseleave Overlay Effect
	$('ul#gallery').on('mouseleave', 'li', function () {
		// Fade out and remove the existing overlay
		$(this).children('.overlay').stop(true, true).fadeOut(200, function () {
			$(this).remove();
		});
	});














});