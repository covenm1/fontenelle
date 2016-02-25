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
		  if (!error) {
		    res.json(tweets);
		  }
		});
	});

	app.get('/instagram', function(req, res) {
		Instagram.user_media_recent('299247338',  function(error, medias, pagination, remaining, limit) {
			if (!error) {
				res.json(medias);
			}
		});
	});

	app.get('/twistagrams', function(req, res) {
		var params = {screen_name: 'fontenelle4est'};
		client.get('statuses/user_timeline', params, function(error, tweets, response){

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
					  return new Date(b.time) - new Date(a.time);
					});

					res.json(formattedTwistagrams);
				});
			}
		});
	});

  app.get('/camps', function(req, res) {
    res.redirect('/post/2016-nature-discovery-day-camps');
	});

  app.get('/volunteer', function(req, res) {
    res.redirect('https://8913.blackbaudhosting.com/8913/tickets?tab=2&txobjid=f500c15a-5010-454b-8321-d865ca9a3542');
  });

  app.get('/renew', function(req, res) {
    res.redirect('/get-involved/membership');
	});

  app.get('/membership', function(req, res) {
    res.redirect('/get-involved/membership');
	});

  app.get('/guild', function(req, res) {
    res.redirect('/get-involved/guild');
	});

  app.get('/leaflet', function(req, res) {
    res.redirect('/post/from-the-leaflet-january-february-2016');
	});

  app.get('/feather', function(req, res) {
    res.redirect('https://8913.blackbaudhosting.com/8913/Feather-Our-Nest-2016');
	});

	app.get('*', function(req, res) {
	 	res.render('index');
	});
};
