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
        console.log((data));
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
    console.log("clicked");
    const searchBox = $("ul#search-container");
    console.log(searchBox);
    if (searchBox.is(":hidden")) {
      console.log('IM hidden');
      searchBox.show().animate({
        'width': '180px'
      }, 175);
    } else if (searchBox.is(":visible")) {
      console.log('IM visible');
      searchBox.hide();
    }
  });
});

