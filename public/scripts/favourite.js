$(document).ready(function () {

  const $favouriteBtn = ('.favourite-button');

  $($favouriteBtn).on('click', function (event) {
    event.preventDefault();

    const resourceId = $(this).data("resource-id");

    $.ajax({
      url: `/resource/${resourceId}/favourite`,
      type: "POST",
      xhrFields: { withCredentials: true }
    }).done(function (response) {

      if (response.success) {
        $('.favourite-button').addClass('favourite-button-liked');

        // if ($(".success").first().is(":hidden")) {
        //   $(".success").slideDown("slow");
        // } else {
        //   $(".success").slideUp();
        // }

      } else {
        if ($(".error-1").first().is(":hidden")) {
          $(".error-1").slideDown("slow");
        } else {
          $(".error-1").slideUp();
        }
      }
    });
  })
});
