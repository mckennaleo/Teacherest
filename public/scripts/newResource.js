$(document).ready(function() {
  $('.new-resource').submit(function(e) {
    e.preventDefault();
    let link = $('.link').val();
    let title = $('.title').val();
    let description = $('.description').val();
    let category = $('.category').val();
    let screenshot = $('.screenshotUrl').val();
    $.ajax({
      url: "/api/newResource",
      data: { link, title, description, category, screenshot },
      type: "POST"
    })
      .done(function(data) {
        $('.new-resource').hide();
      });
  });
});