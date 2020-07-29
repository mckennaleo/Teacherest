//AJAX post request to resource/id?
//if no like, post to add, if like post to remove


$(document).ready(function() {

  const $favouriteBtn = ('.favourite-button');

  $($favouriteBtn).on('submit', function(event) {
    event.preventDefault();
    //if no like what am i checking??? if like = true?
    $.ajax({
      url: "/resource/:id/favourite/add",
      type: "POST"
    }).done(function() {
    });

    //else
    $.ajax({
      url: "/resource/:id/favourite/remove",
      type: "POST"
    }).done(function() {
    });

  })

});
