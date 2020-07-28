const clearResources = () => {
  $('.display').empty();
};

const renderResource = (data) => {
  for (let item of data) {
    $('.display').append(createResourceElement(item));
  }
};

const createResourceElement = (item) => {
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
  $('.search-form').submit(function(e) {
    e.preventDefault();
    let input = $('.category-search').val();
    // console.log(input);
    $.ajax({
      url: "/display",
      data: { input },
      type: "POST"
    }).done(function() {
      // console.log('Done');
    });
  });

  const loadResources = () => {
    $.getJSON('/api/widgets/all', (response) => {
      console.log('success');
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

  loadResources();

  console.log('Done');
});