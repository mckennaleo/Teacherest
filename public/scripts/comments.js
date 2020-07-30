const renderComment = (data) => {
  for (let item of data) {
    $('.posted-comments').append(createCommentElement(item));
  }
};


const createCommentElement = (item) => {
  //posting date from database
  let dbDate = item.created_at;

  //calculation of relative time using moment.js
  let readableDate = moment(dbDate).fromNow();

  //html for posted resources
  const $postedComment = `

  <article class='article-comment'>
      <header class='article-comment-header'>
        <span class='comment-profile'>
          <span class='comment-profile-pic'>
            <img src="${item.avatar}" alt="profile picture" width="35" height="35">
              </span>
              <span class='comment-profile-name'>
              ${item.name}
            </span>
        </span> 
              <span class='comment-date'>
              ${readableDate}
            </span>
      </header>
        <div class="comment-content">
          <p>${item.comment}</p>
        </div>
  </article>`;

  return $postedComment;
};

$(document).ready(function() {
  //meta tag in head section
  //use jquery to query the meta tag as with onclick
  const loadComments = () => {
    $.getJSON('/resource/'+window.location.pathname.split('/')[2]+'/comments', (response) => {
      //response.'data' because thats what the getter is returning
      renderComment(response.data);
    })
      .done(function() {
        // console.log("second success");
      })
      .fail(function() {
        // console.log("error");
      })
      .always(function() {
        // console.log("complete");
      });
  };

  loadComments();


  //submits tweet and loads updated page without refresh
  $('#post-comment').on('submit', function(event) {

    event.preventDefault();

    //variable to assess contents of tweet form input
    const $userComment = $(this).find('input').val();
    console.log($userComment)

    if ($userComment.length < 1) {
      //$(".error-1").slideDown("slow");

    } else if ($userComment.length > 140) {
      //$(".error-2").slideDown("slow");

    } else {
      //passed validation, hides error messages for submission
      // $('.error-1').slideUp();
      // $('.error-2').slideUp();

      //escapes unsafe characters
      $('#post-comment').val($("<div>").text($userComment).html());

      //empties tweet-container and reloads tweet database with new tweet
      $.post("/resource/:id/comments", $(this).serialize(), function(result) {
        //$('#tweet-container').empty();
        loadComments();
      });

      //clears tweet form once posted
      $('form').trigger('reset');
      
      

    }

    
   })

  // });

});
