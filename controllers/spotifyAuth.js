var express = require("express");
var request = require("request");
var querystring = require("querystring");
var keys = require('../utilities/keys');

var router = express.Router();

const spotify_client_id = keys.getSpotifyClientID();
const spotify_client_secret = keys.getSpotifyClientSecret();

router.get('/', function(req, res) {
  
	// requests authorization
	var scope = 'user-read-private user-read-email user-top-read';
	res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
		response_type: 'code',
		client_id: spotify_client_id,
		scope: scope,
		redirect_uri: "http://localhost:3000/spotifyAuth/callback"
	}));
});

router.get('/callback', function(req, res) {

	// requests refresh and access tokens

	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		form: {
			code: req.query.code,
			redirect_uri: "http://localhost:3000/spotifyAuth/callback",
			client_id: spotify_client_id,
			client_secret: spotify_client_secret,
			grant_type: 'authorization_code'
		},
		json:true
	}
	
	var url = 'https://accounts.spotify.com/api/token';
	var formData = {
		code: req.query.code,
		redirect_uri: "http://localhost:3000/",
		client_id: spotify_client_id,
		client_secret: spotify_client_secret,
		grant_type: 'authorization_code'
	};
  
	request.post(authOptions, function(error, response, body) {
		if (!error && response.statusCode === 200) {
  
		  	var access_token = body.access_token,
			refresh_token = body.refresh_token;
  
		 	var options = {
				url: 'https://api.spotify.com/v1/me',
				headers: { 'Authorization': 'Bearer ' + access_token },
				json: true
		  	};
  
		  	// use the access token to access the Spotify Web API
		  	request.get(options, function(error, response, body) {
				console.log(body);
			});
  
			res.redirect("http://localhost:3000" + "?access_token=" + access_token);
		  	// we can also pass the token to the browser to make requests from there
		  	/*res.redirect('/#' +
			querystring.stringify({
			  	access_token: access_token,
			  	refresh_token: refresh_token
			}));*/
		} else {
		  	res.redirect('/#' +
			querystring.stringify({
			  	error: 'invalid_token'
			}));
		}
	});
});

module.exports = router;
