//AJAX post request to resource/id?
//if no like, post to add, if like post to remove

$(document).ready(function() {

  const $favouriteBtn = ('.favourite-button');

  $($favouriteBtn).on('click', function(event) {
    event.preventDefault();
    //sconsole.log("BUTTON CLICKED", $( this ).data("resource-id"))
    const resourceId = $( this ).data("resource-id");
    //if no like what am i checking??? if like = true?
    $.ajax({
      url: `/resource/${resourceId}/favourite`,
      type: "POST"
    }).done(function() {
    });

    // const userLiked = JSON.parse(JSON.stringify(data));
    //   if (userLiked.command === 'INSERT') {
    //     console.log("this happened")
    // $favouriteBtn.addClass('.favourite-button-liked');

  })

});
