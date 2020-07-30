const clearComments = () => {
  $('.posted-comments').empty();
};

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
            <img src="${item.avatar ? item.avatar : 'https://i.ibb.co/N31Xt3k/profile-placeholder.jpg'}" alt="profile picture" width="35" height="35">
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

$(document).ready(function () {
  const resourceId = $("body").data("resource-id");

  const loadComments = () => {
    $.getJSON('/resource/' + resourceId + '/comments', (response) => {
      //response.'data' because thats what the getter is returning
      renderComment(response.data);
    })
      .done(function () {
        // console.log("second success");
      })
      .fail(function () {
        // console.log("error");
      })
      .always(function () {
        // console.log("complete");
      });
  };

  loadComments();

  $('#post-comment').on('submit', function (event) {

    event.preventDefault();

    const $userComment = $(this).find('input').val();

    console.log("REALLY INPUT", $userComment)

    if ($userComment.length < 1) {
      //error for no comment
      $(".error-1").slideDown("slow");
    } else {
      //escapes unsafe characters
      // $('#post-comment').val($("<form>").text($userComment).html());

      $.ajax({
        url: `/resource/${resourceId}/comments`,
        type: "POST",
        data: { text: $userComment }
      }).done(function (data) {
        if (data) {
          clearComments();
          loadComments();
          $('form').trigger('reset');
        } else {
          if ($(".error-1").first().is(":hidden")) {
            $(".error-1").slideDown("slow");
          } else {
            $(".error-1").slideUp();
          }
        }

      });

    }

  })

});
