$(function () {


  // Declare variables
  var totalWidth = 0; // combined width of all the images (large ones)
  var positions = new Array(); // deals with animation and margin

  $('#slides .slide').each(function (i) {
    // Get slider widths and store them in a variable and then append it to the width
    positions[i] = totalWidth;
    totalWidth += $(this).width();

    // Check if width is set, if not send an alert
    if (!$(this).width()) {
      alert('Please add a width to your images');
      return false;
    }
  });

  // Set width as the combined width of all slide images
  $('#slides').width(totalWidth);

  // Menu item click handler
  $('#menu ul li a').click(function (e, keepScroll) {
    // Remove active class and add inactive class
    $('li.product').removeClass('active').addClass('inactive');
    
    // Add active class to parent of the active li
    $(this).parent().addClass('active');

    var pos = $(this).parent().prevAll('.product').length;

    $('#slides').stop().animate({ marginLeft: -positions[pos] + 'px' }, 450);

    // Prevent default
    e.preventDefault();

    // Stop autoscroll
    if (!autoScroll) clearInterval(itvl);
  });

  // Make first image active
  $('#menu ul li.product:first').addClass('active').siblings().addClass('inactive');

  // Auto Scroll
  var current = 1;
  function autoScroll() {
    if (current == -1) return false;

    $('#menu ul li a').eq(current % $('#menu ul li a').length).trigger('click', [true]);
    current++;
  }

  // Duration for auto scroll
  var duration = 10;
  var itvl = setInterval(function () { autoScroll() }, duration * 1000);


});