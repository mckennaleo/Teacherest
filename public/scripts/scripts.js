const renderResource = (data) => {
  for (let item of data) {
    $('.display').append(createResourceElement(item));
  }
};

const createResourceElement = (item) => {
  //tweet posting date from database
  let dbDate = item.created_at;

  //calculation of relative time using moment.js
  let readableDate = moment(dbDate).fromNow();

  //html for posted tweets
  const $resource = `
  <article class='article-tweet'>
      <header class='article-tweet-header'>
        <span class='tweet-profile'>
          <span class='tweet-profile-pic'>
            <img src="${item.screenshot}" alt="profile picture" width="35" height="35">
              </span>
              <span class='tweet-profile-name'>
                  ${item.title}
            </span>
        </span> 
              <span class='tweet-handle'>
              ${item.title}
            </span>
      </header>
        <div class="tweet-content">
          <p>${item.description}</p>
        </div>
        <footer class='article-tweet-footer'>
          <span class='tweet-date'>
            ${readableDate}
            </span>
          <span class='tweet-icons'>
            <img src="/images/flag-icon.png" alt="flag-icon" width="10" height="10">
            <img src="/images/retweet-icon.png" alt="retweet-icon" width="10" height="10">
            <img src="/images/heart-icon.png" alt="heart-icon" width="10" height="10">
          </span>
        </footer>
  </article>`;

  return $resource;
};


$(document).ready(function() {
  $('.search-form').submit(function(e) {
    e.preventDefault();
    let input = $('.category-search').val();
    console.log(input)
    $.ajax({
      url: "/display",
      data: { input },
      type: "POST"
    }).done(function() {
      console.log('Done')
    })
  })

  const loadResources = () => {
    $.getJSON('/api/widgets/all', (response) => {
      console.log('success');
      //response.data because thats what the getter is returning
      renderResource(response.data);
    })
      .done(function() {
        console.log("second success");
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });
  };

  loadResources();

  console.log('Done');
});