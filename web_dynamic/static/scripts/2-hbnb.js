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
});
