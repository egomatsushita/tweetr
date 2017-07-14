/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function renderTweets(array_of_tweets) {
  let tweet;
  $(".tweet").remove();
  for (let tweetData of array_of_tweets) {
    tweet = createTweetElement(tweetData);
    $('#tweets-container').prepend(tweet);
  }
  return;
}

function createTweetElement(tweetData) {

  // Setup past time of a post in days
  const today = new Date();
  const post_date = tweetData.created_at;
  const day_in_miliseconds = 8.64e+7;
  const hour_in_miliseconds = 3.6e+6;
  const minute_in_miliseconds = 60000;
  let time_past = today.getTime() - post_date;
  let time_past_message = "";

  if (time_past < 3.6e+6) {
    time_past /= minute_in_miliseconds;
    time_past_message += `${Math.floor(time_past)} minute(s) ago`;
  } else if (time_past > 8.64e+7) {
    time_past /= day_in_miliseconds;
    time_past_message += `${Math.floor(time_past)} day(s) ago`;
  } else {
    time_past /= hour_in_miliseconds;
    time_past_message += `${Math.floor(time_past)} hour(s) ago`;
  }

  // Setup header
  const img = $("<img>").addClass("logo").attr('src', tweetData.user.avatars.small);
  const p = $("<p>").text(tweetData.user.name);
  const span = $("<span>").text(tweetData.user.handle);
  const header = $("<header>").append(img).append(p).append(span);
  let tweet = $("<article>").addClass("tweet");
  tweet.append(header);

  // Setup content
  const p1 = $("<p>").text(tweetData.content.text);
  const div = $("<div>").addClass("content");
  div.append(p1);
  tweet.append(div);

  // Setup footer
  const p2 = $("<p>").text(time_past_message);
  const icon1 = $("<span>").addClass("icon").append($("<i>").addClass("fa fa-flag"));
  const icon2 = $("<span>").addClass("icon").append($("<i>").addClass("fa fa-retweet"));
  const icon3 = $("<span>").addClass("icon").append($("<i>").addClass("fa fa-heart"));
  const footer = $("<footer>").append(p2).append(icon1).append(icon2).append(icon3);
  tweet.append(footer);

  return tweet;
}

function loadTweets() {
  $.ajax({
    url: "/tweets/",
    method: 'GET',
  }).then((jsonContent) => {renderTweets(jsonContent);});
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
    const warn_empty_message = $("<p>Cannot leave an empty message!</p>");
    const warn_over_140 = $("<p>Works only with up to 140 characters!</p>");

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

    const form = $(event.target);
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
