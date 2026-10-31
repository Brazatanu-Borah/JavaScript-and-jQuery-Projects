// Searchbar Animation using jQuery animate() function ---------------------------
$(function () {

  var searchField = $('#query');
  var icon = $('#search-btn');

  // Focus Event Handler (width increases)
  $(searchField).on('focus', function () {
    $(this).animate({
      width: '100%'
    }, 400);
    $(icon).animate({
      right: '10px'
    }, 400);
  });

  // Blur Event Handler (width goes back to normal)
  $(searchField).on('blur', function () {
    if (searchField.val() == '') {
      $(searchField).animate({
        width: '45%'
      }, 400, function () { });
      $(icon).animate({
        right: '360px'
      }, 400, function () { });
    }
  });

  // Prevent the default functionality of the form to submit the form data (we need the submit button to get the data from YouTube and display the results, using search())
  $('#search-form').submit(function (e) {
    e.preventDefault();
    search();
  });


  // Activate Fancybox plugin to play videos, without redirecting the user to actual YouTube site
  $().fancybox({
    selector: '[data-fancybox="gallery"]',
    // options go here
  });

});



// API Functionality -------------------------------------------------------------
/*
  Youtube Data API v3 links
    https://developers.google.com/youtube/data/reference/rest/v3/search/list

    We wil use these parameters
      part, q, type and key

    Also these (for the buttons at the botoom of our results)
      nextPageToken
      prevPageToken

*/

function search() {
  // Get Form Input and remove any stray whitespace
  var q = $('#query').val().trim();

  // If the query is empty, clicking the search icon will produce no results
  if (q === '') {

    /* 📝 TODO: CHANGE SIMPLE ALERT MSG TO A NICE UI ELEMENT (simple span tag with text) */
    alert('Please enter a search term!');
    return;
  }

  // Set #results and #buttons div to empty strings
  $('#results').html('');
  $('#buttons').html('');


  // Run GET Request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
    part: 'snippet, id',
    q: q,
    type: 'video',

    // Set our API key variable
    // this is not good, exposing our api key in the frontend js. we can (1) restrict the api key, (2) rotate the key (3) move to backend (node.js, php etc)
    key: 'AIzaSyB9z3c4rmwnRX2w9OmvZGSSZC-8QMErvu5'
    // 😄 This is fake api, use your personal youtube data api instead and it will start working!!
  },
    function (data) {
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;

      // Log Data
      console.log(data);

      // Loop through search results and append to DOM
      $.each(data.items, function (i, item) {
        var output = getOutput(item);
        $('#results').append(output);
      });

      // Generate and append pagination buttons (passing q)
      var buttons = getButtons(prevPageToken, nextPageToken, q);
      $('#buttons').append(buttons);
    }
  );
}


// Next Page Function
function nextPage() {
  var token = $('#next-button').data('token');
  var q = $('#next-button').data('query'); // Retrieved safely from dataset

  // Clear Results
  $('#results').html('');
  $('#buttons').html('');

  // Run GET Request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
    part: 'snippet, id',
    q: q,
    pageToken: token,
    type: 'video',
    key: 'AIzaSyCd8y4m1slvpMZ0tNlrYGSSZC-1ORBfqt4'
  },
    function (data) {
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;

      console.log(data);

      $.each(data.items, function (i, item) {
        var output = getOutput(item);
        $('#results').append(output);
      });

      var buttons = getButtons(prevPageToken, nextPageToken, q);
      $('#buttons').append(buttons);
    }
  );
}


// Prev Page Function
function prevPage() {
  var token = $('#prev-button').data('token');
  var q = $('#prev-button').data('query'); // just like before

  // Clear Results
  $('#results').html('');
  $('#buttons').html('');

  // Run GET Request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
    part: 'snippet, id',
    q: q,
    pageToken: token,
    type: 'video',
    key: 'AIzaSyCd8y4m1slvpMZ0tNlrYGSSZC-1ORBfqt4'
  },
    function (data) {
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;

      console.log(data);

      $.each(data.items, function (i, item) {
        var output = getOutput(item);
        $('#results').append(output);
      });

      var buttons = getButtons(prevPageToken, nextPageToken, q);
      $('#buttons').append(buttons);
    }
  );
}


// Build Output
function getOutput(item) {
  // Safety check in case the item doesn't have a video ID
  if (!item.id || !item.id.videoId) return '';

  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  // Build Output String
  var output = '<li>' +
    '<div class="list-left">' +
    '<img src="' + thumb + '">' +
    '</div>' +
    '<div class="list-right">' +
    '<h3><a data-fancybox="gallery" href="https://www.youtube.com/watch?v=' + videoId + '">' + title + '</a></h3>' +
    '<small>By <span class="cTitle">' + channelTitle + '</span> on ' + videoDate + '</small>' +
    '<p>' + description + '</p>' +
    '</div>' +
    '</li>' +
    '<div class="clr"></div>' +
    '';
  return output;
}


// Build the buttons
function getButtons(prevPageToken, nextPageToken, q) {
  var btnoutput = '';

  if (!prevPageToken) {
    btnoutput = '<div class="button-container">' +
      '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '" onclick="nextPage();">Next Page</button>' +
      '</div>';
  } else {
    btnoutput = '<div class="button-container">' +
      '<button id="prev-button" class="paging-button" data-token="' + prevPageToken + '" data-query="' + q + '" onclick="prevPage();">Prev Page</button>' +
      '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '" onclick="nextPage();">Next Page</button>' +
      '</div>';
  }

  return btnoutput;
}
