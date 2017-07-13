// Document is ready
$(document).ready(function() {
  const counter_start = $(".new-tweet").find(".counter").text();

  // Event start when user is typing in the text area
  $(".new-tweet").on('keyup', "textarea", function() {
    const message_length = $(this).val().length;
    let counter = $(this).closest(".new-tweet").find(".counter");
    let counter_length = +counter.text();

    counter.text(counter_start - message_length);

    // If message contains more than 140 characters,
    // Change the color of the counter to red when it's negative,
    // Otherwise keep it black.
    if (counter.text() < 0) {
      counter.css({'color': 'red'});
    } else {
      counter.css({'color': 'black'})
    }
  })
});