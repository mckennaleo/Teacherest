const clearComments = () => {
  $('.posted-comments').empty();
};

const renderComment = (data) => {
  for (let item of data.reverse()) {
    $('.posted-comments').prepend(createCommentElement(item));
  }
};

const createCommentElement = (item) => {
  let dbDate = item.created_at;

  let readableDate = moment(dbDate).fromNow();

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
    $.getJSON(`/resource/${resourceId}/comments`, (response) => {
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

  $('.error-comment').hide();
  loadComments();

  $('#post-comment').on('submit', function (event) {
    event.preventDefault();

    const $userComment = $(this).find('input').val();

    if ($userComment.length < 1) {
      if ($(".error-comment").first().is(":hidden")) {
        $(".error-comment").slideDown("slow");
      } else {
        $(".error-comment").slideUp();
      }
    } else {
      $.ajax({
        url: `/resource/${resourceId}/comments`,
        type: "POST",
        xhrFields: { withCredentials: true },
        data: { text: $userComment }
      }).done(function (data) {
        if (data) {
          if (!data) {
            $(".error-login").slideDown("slow");
          } else {
            $('.error-comment').hide();
            $('.error-login').hide();
            clearComments();
            loadComments();
            $('form').trigger('reset');
          }
        } else {
          if ($(".error-comment").first().is(":hidden")) {
            $(".error-comment").slideDown("slow");
          } else {
            $(".error-comment").slideUp();
          }
        }

      });

    }

  });

});
