$(document).ready(function() {
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
