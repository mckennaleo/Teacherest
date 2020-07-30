$(document).ready(function() {
  $('.my_resources_button').on('click', (function(e) {
    e.preventDefault();
    clearResources();
    $('.new-resource').hide();
    $.ajax({
      url: "/api/widgets/created_resources",
      type: "GET"
    })
      .done(function(data) {
        renderResource(data.data);
      });
    $.ajax({
      url: "/api/widgets/favored_resources",
      type: "GET"
    })
      .done(function(data) {
        renderResource(data.data);
      });
  }));
});


