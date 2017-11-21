const Router = require('express').Router;
const Tweet = require('../models/Tweets.js');
const Profile = require('../models/Profile.js');

const apiRouter = Router();

function getAllUsers (req, res) {
  Profile
    .query()
    .eager('tweet')
    .then(data => res.json(data));
}

function createUser(req, res) {
  Profile
    .query()
    .insert(req.body)
    .then(newProfile => {
      return res.json(newProfile).status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}

function getAllTweets (req, res) {
  Tweet
    .query()
    .then(data => res.json(data));
}

function getTweetsById(req, res) {
  Tweet
    .query()
    .findById(req.params.id)
    .then(tweet => {
      return res.json(tweet).status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });

}

function createTweets(req, res) {
  Tweet
    .query()
    .insert(req.body)
    .then(newTweet => {
      return res.json(newTweet).status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}

function updateTweets(req, res) {
  Tweet
  .query()
  .updateAndFetchById(req.params.id, req.body)
  .then(tweetUpdated => {
    return res.json(tweetUpdated).status(200)
  })
  .catch(error => {
    return res.send(error).status(500);
  });
}

function deleteTweet(req, res) {
  Tweet
  .query()
  .deleteById(req.params.id)
  .then(tweetDeleted => {
    return res.json({
      rowsDeleted: tweetDeleted
    }).status(200)
  })
  .catch(error => {
    return res.send(error).status(500);
  });
}

apiRouter
  .get('/users', getAllUsers)
  .post('/users', createUser);

apiRouter
  .get('/tweets', getAllTweets)
  .get('/tweets/:id', getTweetsById)
  .post('/tweets', createTweets)
  .put('/tweets/:id', updateTweets)
  .delete('/tweets/:id', deleteTweet);

module.exports = apiRouter;
