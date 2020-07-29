const renderComment = (data) => {
  for (let item of data) {
    $('.comments').append(createCommentElement(item));
  }
};


const createCommentElement = (item) => {
  //posting date from database
  let dbDate = item.created_at;

  //calculation of relative time using moment.js
  let readableDate = moment(dbDate).fromNow();

  //html for posted resources
  const $postedComment = `
  <article class='comments-box'>
  
  <div class="container">

    <img src="${item.comment}" alt="screenshot" class="image" style="width:100%">

    <div class="middle">
      <div class="title">${item.user_id}</div>
      <div class="description"></div>
      <div class="time"></div>
      <button class="save-button">Save</button>
    </div>
    
  </div>
  </a>
  </article>`;

  return $postedComment;
};

$(document).ready(function() {
  const loadComments = () => {
    $.getJSON('/api/comments', (response) => {
      // console.log('success');
      //response.'data' because thats what the getter is returning
      console.log("COMMENTS???", response.data);
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

});
