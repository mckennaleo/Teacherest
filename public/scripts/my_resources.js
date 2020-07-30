$(document).ready(function() {
  $('.my_resources_button').on('click', (function(e) {
    e.preventDefault();
    $.ajax({
      url: "/api/widgets/created_resources",
      type: "GET"
    })
      .done(function(data) {
        $('.new-resource').hide();
        clearResources();
        renderResource(data.data);
      });
  }));
});
