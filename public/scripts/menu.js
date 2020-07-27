$(document).ready(function() {
  $(".menu").click(function() {
    if ($("#nav-products.sidebar").is(":visible")) {
      $("#nav-products.sidebar").slideUp();
    } else {
      $("#nav-products.sidebar").slideDown();
    }
  });
});
