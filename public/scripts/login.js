$(document).ready(function() {
  $(".btn2").click(function() {
    if ($(".login-form").is(":visible")) {
      $(".login-form").slideUp();
    } else {
      $(".login-form").slideDown();
    }
  });
});


$(document).ready(function() {
  $('.login-form').submit(function(e) {
    e.preventDefault();
    let email = $('.email-field').val();
    let password = $('.pw-field').val();
    $.ajax({
      url: "/api/login",
      data: { email, password },
      type: "POST"
    }).done(function(data) {
      //prepend or whatever
      console.log('Done', data);
    });
  });
});