/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];



$(document).ready(function() {

  function renderTweets(array_of_tweets) {

    let $tweet;

    for (let tweetData of array_of_tweets) {
      $tweet = createTweetElement(tweetData);
      $('#tweets-container').append($tweet);
    }

    return;
  }

  function createTweetElement(tweetData) {

    let today = new Date();
    let post_date = new Date(tweetData.created_at);
    let day_in_miliseconds = 8.64e+7;
    let days_past = today.getTime() - post_date.getTime();
    days_past /= day_in_miliseconds;

    let $tweet = $("<article>").addClass("tweet");
    let $header = $("<header>");
    let $img = $("<img>").addClass("logo").attr('src', tweetData.user.avatars.small);
    let $p = $("<p>").text(tweetData.user.name);
    let $span = $("<span>").text(tweetData.user.handle);
    $header.append($img);
    $header.append($p);
    $header.append($span);
    $tweet.append($header);

    let $p1 = $("<p>").text(tweetData.content.text);
    let $div = $("<div>").addClass("content");
    $div.append($p1);
    $tweet.append($div);

    let $p2 = $("<p>").text(`${Math.floor(days_past)} days ago`);
    let $footer = $("<footer>");
    let $icon1 = $("<span>").addClass("icon").append($("<i>").addClass("fa fa-flag"));
    let $icon2 = $("<span>").addClass("icon").append($("<i>").addClass("fa fa-retweet"));
    let $icon3 = $("<span>").addClass("icon").append($("<i>").addClass("fa fa-heart"));

    $footer.append($p2);
    $footer.append($icon1);
    $footer.append($icon2);
    $footer.append($icon3);
    $tweet.append($footer);

    return $tweet;
  }

  renderTweets(data);
});
