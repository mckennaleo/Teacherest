$(document).ready(function() {
  $('.search-form').submit(function(e) {
    e.preventDefault();
    let keyword = $('.keyword-searchbar').val();
    $.ajax({
      url: "/api/keyword",
      data: { keyword },
      type: "POST"
    }).fail(function() {
      alert("Invalid input. Please try again!")
    })
    .done(function(data) {
      console.log(data.search)
      clearResources();
      renderResource(data.search);
    });
  });
});