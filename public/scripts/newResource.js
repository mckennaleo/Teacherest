$(document).ready(function() {
  $('.new-resource').submit(function(e) {
    e.preventDefault();
    let link = $('.link-input').val();
    let title = $('.title-input').val();
    let description = $('.description-input').val();
    let category = $('.category-input').val();
    let screenshot = $('.screenshotUrl-input').val();
    $.ajax({
      url: "/api/newResource",
      data: { link, title, description, category, screenshot },
      type: "POST"
    })
      .done(function(data) {
        $('.new-resource').hide();
      })
      .success(location.reload);
  });
});