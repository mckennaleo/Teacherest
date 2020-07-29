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
  const $resource = `
  <article class='resource-box'>
  <a href="http://localhost:8080/resource/${item.id}">
  <div class="container">

    <img src="${item.screenshot}" alt="screenshot" class="image" style="width:100%">

    <div class="middle">
      <div class="title">${item.title}</div>
      <div class="description">${item.description}</div>
      <div class="time">${readableDate}</div>
      <button class="save-button">Save</button>
    </div>
    
  </div>
  </a>
  </article>`;

  return $resource;
};

$(document).ready(function() {

  const loadComments = () => {
    $.getJSON('/api/widgets/comments', (response) => {
      // console.log('success');
      //response.'data' because thats what the getter is returning
      renderResource(response.data);
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

  // console.log('Done');
});