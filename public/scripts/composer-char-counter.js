$(document).ready(function() {

  let counter_start = $(".new-tweet").find(".counter").text();

  $(".new-tweet").on('keyup', "textarea", function() {

    let compose_length = $(this).val().length;
    let counter = $(this).closest(".new-tweet").find(".counter");
    let counter_length = +counter.text();

    counter.text(counter_start - compose_length);
    if (counter.text() < 0) {
      counter.css({'color': 'red'});
    } else {
      counter.css({'color': 'black'})
    }
  })
});