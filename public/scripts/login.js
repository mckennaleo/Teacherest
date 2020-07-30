$(document).ready(function() {
  $('.login-form').submit(function(e) {
    e.preventDefault();
    let email = $('.email-field').val();
    let password = $('.pw-field').val();
    $.ajax({
      url: "/api/login",
      data: { email, password },
      type: "POST"
    }).fail(function() {
      alert("Wrong email/password combination. Please try again!");
    })
      .done(function(data) {
        $('.login').hide();
        $('.logout').show();
      });
  });
});