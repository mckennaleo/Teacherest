$(document).ready(function() {
  $('.login-form').submit(function(e) {
    e.preventDefault();
    let email = $('.email-field').val();
    let password = $('.pw-field').val();
    $.ajax({
      url: "/api/login",
      data: { email, password },
      type: "POST"
    }).then(
      console.log("all done!")
    );
  });
});