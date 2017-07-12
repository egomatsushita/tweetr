/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var data = [
  // {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": {
  //       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //     },
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // },
  // {
  //   "user": {
  //     "name": "Descartes",
  //     "avatars": {
  //       "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
  //       "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
  //       "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
  //     },
  //     "handle": "@rd" },
  //   "content": {
  //     "text": "Je pense , donc je suis"
  //   },
  //   "created_at": 1461113959088
  // },
  // {
  //   "user": {
  //     "name": "Johann von Goethe",
  //     "avatars": {
  //       "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
  //       "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
  //       "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
  //     },
  //     "handle": "@johann49"
  //   },
  //   "content": {
  //     "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
  //   },
  //   "created_at": 1461113796368
  // }
];

function renderTweets(array_of_tweets) {

  let $tweet;

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
  }).then(function(jsonContent) {
    renderTweets(jsonContent);
  });
}




// When document is ready
$(document).ready(function() {

  $(".new-tweet").find("form").on("submit", function(event) {
    event.preventDefault();

    let textarea = $(this).find("textarea").val();
    let $warn_empty_message = $("<p>Cannot leave an empty message!</p>");
    let $warn_over_140 = $("<p>Only with up to 140 characters works!</p>");

    // Remove a previous message if there is one.
    if ($(this).find("p")) {
      $(this).find("p").remove();
    }

    // Warn empty and over 140 characters message
    if (textarea === "") {
      return $(this).append($warn_empty_message);
    } else if (textarea.length > 140) {
      return $(this).append($warn_over_140);
    }


    let form = $(event.target);
    $.ajax({
      url: form.attr("action"),
      data: form .serialize(),
      type: "POST"
    }).done(function() {
      loadTweets();
    });
  });

});
