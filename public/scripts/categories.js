$(document).ready(function() {
  $('.container-checkmark').click(function() {
    let categories = [];
    $("input:checkbox[name='categories']:checked").each(function() {
      categories.push($(this).val());
    });
    $.ajax({
      url: "/api/widgets/filter",
      data: { categories },
      type: "GET"
    })
      .done(function(data) {
        clearResources();
        renderResource(data.data);
      });
  });
});


/* //get the ressource by categories
$(document).ready(function() {
  $('.search-form').submit(function(e) {
    e.preventDefault();
    let input = $('.category-search').val();
    $.ajax({
      url: "/api/categories/search",
      data: { s: input },
      type: "GET"
    }).done(function(data) {
      //prepend or whatever
      console.log('Done', data);
    });
  });
}); */

//toggle the search menu when clicked
$(document).ready(function() {
  /* $('#nav-products .dropdown ul').width(0); */
  $('#search').on("click", function() {
    const searchBox = $("ul#search-container");
    if (searchBox.is(":hidden")) {
      searchBox.show().animate({
        'width': '180px'
      }, 175);
    } else if (searchBox.is(":visible")) {
      searchBox.hide();
    }
  });
});

