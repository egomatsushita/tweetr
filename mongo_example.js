"use strict"

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  function getTweets(callback) {
    db.collection("tweets").find().toArray((err, tweets) => {
      if (err) {
        return callback(err);
      }
      callback(null, tweets);
    });
  }

  getTweets((err, tweets) => {
    if (err) throw err;

    console.log("Logging each tweet:");
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
  });

  // ==> We hava a connection to the "test-tweets" db,
  //     starting here.
  // console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==> In typical node-callback style, any program
  //     logic that needs to use the connection needs
  //     to be invoked from within here.
  //
  // Another way to say: this is an "entry point" for
  // a database-connected application!

  // db.collection("tweets").find().toArray((err, results) => {
    // if (err) throw err;

/*    console.log("find result: ", result);
    console.log("type fo find result: ", typeof result);*/

/*    console.log("for each item yielded by the cursor:");
    results.each((err, item) => console.log(" ", item));*/

    /*results.toArray((err, resultsArray) => {
      if (err) throw err;

      console.log("results.toArray: ", resultsArray);
    });*/

    // console.log("results array: ", results);

  // });
  // ==> At the end, we close the connection:
  // db.close();
});