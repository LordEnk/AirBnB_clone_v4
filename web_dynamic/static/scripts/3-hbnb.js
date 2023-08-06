$(document).ready(function() {
  var apiUrl = 'http://0.0.0.0:5001/api/v1/status/';

  $.get(apiUrl, function(data) {
    var apiStatusDiv = $('#api_status');

    if (data.status === 'OK') {
      apiStatusDiv.addClass('available');
    } else {
      apiStatusDiv.removeClass('available');
    }
  }).fail(function(error) {
    console.error('Error fetching API status:', error);
  });

  // Setting interval to update API status every few seconds
  setInterval(function() {
    $.get(apiUrl, function(data) {
      var apiStatusDiv = $('#api_status');

      if (data.status === 'OK') {
        apiStatusDiv.addClass('available');
      } else {
        apiStatusDiv.removeClass('available');
      }
    }).fail(function(error) {
      console.error('Error fetching API status:', error);
    });
  }, 5000); // Update every 5 seconds

  // Existing amenities functionality
  var selectedAmenities = {};

  $('.amenities input[type="checkbox"]').change(function() {
    var amenityId = $(this).data('id');
    var amenityName = $(this).data('name');

    if ($(this).prop('checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    var selectedAmenitiesList = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(selectedAmenitiesList);
  });
  //fetching and displaying places function
  function fetchAndDisplayPlaces() {
    var placesurl = apiUrl + 'places_search/';

     $.ajax({
      type: 'POST',
      url: placesUrl,
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function(data) {
        var placesSection = $('.places');
        placeaSection.empty(); //clears the existing articles
        data.forEach(function(place) {
          var article = $('<article>').appendTo(placesSection);
          var titleBox = $('<div>').addClass('title_box').appendTo(article);

          $('<h2>').text(place.name).appendTo(titleBox);
          $('<div>').addClass('price_by_night').text('$' + place.price_by_night).appendTo(titleBox);

          var information = $('<div>').addClass('information').appendTo(article);
          $('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '')).appendTo(information);
          $('<div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '')).appendTo(information);
          $('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')).appendTo(information);
        });
      },
      error:function(error) {
        console.error(error);
      }
    });
  }
  fetchAndDisplayPlaces();

  setInterval(fetchAndDispalyPlaces, 10000);
});
