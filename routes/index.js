var util = require("util");
var moment = require("moment");

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var Instagram = require('instagram-node').instagram();

Instagram.use({
	access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
	client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
});

module.exports = function(app) {

	app.get('/', function(req, res) {
		  res.render('index');
	});


	app.get('/twitter', function(req, res) {
		var params = {screen_name: 'fontenelle4est'};
		client.get('statuses/user_timeline', params, function(error, tweets, response){
			console.log("tweets: " + tweets.length);
		  if (!error) {
		    res.json(tweets);
		  }
		});
	});

	app.get('/instagram', function(req, res) {
		Instagram.user_media_recent('299247338',  function(error, medias, pagination, remaining, limit) {
			console.log("instagrams: " + medias.length);
			if (!error) {
				res.json(medias);
			}
		});
	});

	app.get('/twistagrams', function(req, res) {
		var params = {screen_name: 'fontenelle4est'};
		client.get('statuses/user_timeline', params, function(error, tweets, response){
			console.log("tweets: " + tweets.length);

			var formattedTweets = tweets.map(function(obj){
				var created_at = obj.created_at;
				 var rObj = {
					 type: "tweet",
					 time: moment(created_at, 'dd MMM DD HH:mm:ss ZZ YYYY'),
					 content: obj
				 };
				 return rObj;
			});

			if (!error) {
				Instagram.user_media_recent('299247338',  function(error, instagrams, pagination, remaining, limit) {
					console.log("instagrams: " + instagrams.length);

					var formattedInstagrams = instagrams.map(function(obj){
						var created_time = moment.unix(obj.created_time);
						 var rObj = {
							 type: "instagram",
							 time: created_time,
							 content: obj
						 };
						 return rObj;
					});
					var twistagrams = formattedTweets.concat(formattedInstagrams);
					var formattedTwistagrams = twistagrams.sort(function(a,b){
					  // Turn your strings into dates, and then subtract them
					  // to get a value that is either negative, positive, or zero.
					  return new Date(b.time) - new Date(a.time);
					});

					res.json(formattedTwistagrams);
				});
			}
		});
	});


	app.get('*', function(req, res) {
	 	res.render('index');
	});
};
