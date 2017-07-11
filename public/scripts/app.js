/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
var tweetData = {
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
}


$(document).ready(function() {

  function createTweetElement(tweet) {

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

    let $p2 = $("<p>").text("10 days ago");
    let $footer = $("<footer>");
    let $img1 = $("<img>").addClass("mini-logo").attr('src', '../images/bird.png');
    let $img2 = $("<img>").addClass("mini-logo").attr('src', '../images/bird.png');
    let $img3 = $("<img>").addClass("mini-logo").attr('src', '../images/bird.png');
    $footer.append($p2);
    $footer.append($img1);
    $footer.append($img2);
    $footer.append($img3);
    $tweet.append($footer);

    return $tweet;
  }

  var $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet);
});







