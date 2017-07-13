/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function renderTweets(array_of_tweets) {
  let $tweet;
  $(".tweet").remove();
  for (let tweetData of array_of_tweets) {
    $tweet = createTweetElement(tweetData);
    $('#tweets-container').prepend($tweet);
  }
  return;
}

function createTweetElement(tweetData) {

  // Setup past time of a post in days
  let today = new Date();
  let post_date = new Date(tweetData.created_at);
  let day_in_miliseconds = 8.64e+7;
  let days_past = today.getTime() - post_date.getTime();
  days_past /= day_in_miliseconds;

  // Setup header
  let $img = $("<img>").addClass("logo").attr('src', tweetData.user.avatars.small);
  let $p = $("<p>").text(tweetData.user.name);
  let $span = $("<span>").text(tweetData.user.handle);
  let $header = $("<header>").append($img).append($p).append($span);
  let $tweet = $("<article>").addClass("tweet");
  $tweet.append($header);

  // Setup content
  let $p1 = $("<p>").text(tweetData.content.text);
  let $div = $("<div>").addClass("content");
  $div.append($p1);
  $tweet.append($div);

  // Setup footer
  let $p2 = $("<p>").text(`${Math.floor(days_past)} days ago`);
  let $icon1 = $("<span>").addClass("icon").append($("<i>").addClass("fa fa-flag"));
  let $icon2 = $("<span>").addClass("icon").append($("<i>").addClass("fa fa-retweet"));
  let $icon3 = $("<span>").addClass("icon").append($("<i>").addClass("fa fa-heart"));
  let $footer = $("<footer>").append($p2).append($icon1).append($icon2).append($icon3);
  $tweet.append($footer);

  return $tweet;
}

function loadTweets() {
  $.ajax({
    url: "/tweets/",
    method: 'GET',
  }).then(jsonContent => { renderTweets(jsonContent); });
}

// When document is ready
$(document).ready(() => {

  loadTweets();

  $("#nav-bar").find(".button").on('click', () => {
    $(".new-tweet").slideToggle();
    $(".new-tweet").find("textarea").focus();
  });

  // When user submit the form
  $(".new-tweet").find("form").on("submit", function(event) {
    event.preventDefault();

    let textarea = $(this).find("textarea");
    let warn_empty_message = $("<p>Cannot leave an empty message!</p>");
    let warn_over_140 = $("<p>Works only with up to 140 characters!</p>");

    // Remove a previous message if there is one.
    if ($(this).find("p")) {
      $(this).find("p").remove();
    }

    // Warn if there is an empty message or a message that contains over 140 characters
    if (textarea.val() === "") {
      return $(this).append(warn_empty_message);
    } else if (textarea.val().length > 140) {
      return $(this).append(warn_over_140);
    }

    let form = $(event.target);
    $.ajax({
      url: form.attr("action"),
      data: form .serialize(),
      method: "POST"
    }).done(() => {
      textarea.val("");
      $(this).find(".counter").text(140);
      loadTweets();
    });
  });
});
