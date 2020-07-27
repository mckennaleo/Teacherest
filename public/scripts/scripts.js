const renderResource = (data) => {
  for (let item of data) {
    $('.display').append(`<p>${item.title}</p>`); 
  }
};

$(document).ready(function () {
  $('.search-form').submit(function(e) {
    e.preventDefault();
    let input = $('.category-search').val();
    console.log(input)
    $.ajax({
      url: "/display",
      data: {input},
      type: "POST"
    }).done(function() {
      console.log('Done')
    })
  })

  const loadResources = () => {
    $.getJSON('/api/widgets/all', (response) => {
      console.log('success');
      console.log('what is this', response)
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

});