//filters the resources by category using checkboxes
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

