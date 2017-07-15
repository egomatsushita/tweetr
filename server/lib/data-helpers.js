"use strict";

const ObjectID = require('mongodb').ObjectID;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection("tweets").find().toArray((err, results) => {
        callback(null, results.sort(sortNewestFirst));
      });
    },

    // Update likes
    updateLikes: function(tweet, callback) {
      const id = tweet.id;
      const likes = +(tweet.likes);
      const isLiked = tweet.isLiked === 'true' ? true : false;

      db.collection("tweets").updateOne(
        { _id: ObjectID(id) },
        { $set: {"likes": likes, "isLiked": isLiked} },
        (err, result) => {
          if (err) {
            return callback(err);
          }
          callback(null, true);
        }
      );
    }
  }
}
