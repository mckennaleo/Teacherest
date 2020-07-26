$(document).ready(function () {
  $('.search-form').submit(function(e) {
    e.preventDefault();
    let input = $('.category-search').val();
    console.log(input)
    $.ajax({
      url: "/display",
      context: input,
      method: "POST"
    }).done(function() {
      console.log('Done')
    })
  })
});