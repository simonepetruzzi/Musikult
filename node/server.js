/************** IMPORTS *******************/
var express = require("express");
var request = require('request');

var querystring = require('querystring');
/******************************************/

/************** LOCAL VARIABLES *******************/
var app = express();
var PORT = 3000;

//Genius
var CLIENTID = "vDSCxp-uAMIxUs3viYuz9oK7-1l9BjmMZWHdQ6ckSwy6z2gwfXkvXCSzy4ejXRqW";
var CLIENTSECRET = "IEVi0recfI0wsCpuSAadiA8z9GEp8xsAS7lUekwo7HeQf2vVSWcuhWzBdo8FbcmMTLQD8qUYEBV1MddFDZviRw";
var accessToken= "kG91TrvmqYf06aeYAOpgxFTXcmUAJ0N0wRCtbn7m-tHXsfGVDWULJAGro3dbQWfS";
var API = "https://api.genius.com/search?q=kendrick%20lamar";

//LastFM 
var LastFmKey = '36e40c0bdeda4b90b8b007257a8de61d';
function LastFmReq(method) {
	return 'http://ws.audioscrobbler.com/2.0/?method='+method+'&api_key='+ LastFmKey +'&format=json';
}

//Spotify
var spotify_client_id = 'f57702fc8f5f4deca9cd5517c8f520a8';
var spotify_client_secret = '9a55bd0d2fac417e86b1a915c132bcad';
/***************************************************/

//LastFm getTopTracks
app.get('/1', function(req, res){

	request(LastFmReq('chart.gettoptracks'), function(error, response, body) {
		res.send(JSON.parse(body));
	});
		
});

//Genius search
app.get('/', function(req, res){

    var options = {
        url: API,
        headers: {
            'Authorization': 'Bearer ' + accessToken
         }
	};

	//makes the request to Genius Api to obtain the research data
    request(options, function callback(error, response, body) {		

		if (!error && response.statusCode == 200) 
			res.send(JSON.parse(body));
			//res.send(geniusFilter(JSON.parse(body)));
		
		else 
			console.log(error);

    });  
});

//This function filters data coming from Genius Api into a lighter JSON containing essential info
function geniusFilter(info) {								//info is Genius JSON

	var x = {                               				//x is the result
		"songs": [],
		"artists": []
	}
	
	var hit;
	var ids = [];
	for(i = 0; i < info.response.hits.length; i++) {

		hit = info.response.hits[i];						

		x.songs.push({										
			"name": hit.result.title,
			"id": hit.result.id,
			"artist": hit.result.primary_artist.name,
			"photo": hit.result.song_art_image_url
		});

		var artist = {										//pushes artist only if it has not been 	
			"name": hit.result.primary_artist.name,			//pushed yet
			"id": hit.result.primary_artist.id,
			"photo": hit.result.primary_artist.image_url
		};
		
		occ = false;
		if(!ids.includes(artist.id)) {
			x.artists.push(artist);
			ids.push(artist.id);
		}
	}

	return x;

}



//spotify oAuth
app.get('/loginSpotify', function(req, res) {
  
	// your application requests authorization
	var scope = 'user-read-private user-read-email';
	res.redirect('https://accounts.spotify.com/authorize?' +
	  querystring.stringify({
		response_type: 'code',
		client_id: spotify_client_id,
		scope: scope,
		redirect_uri: "http://localhost:3000/callback"
	  }));
  });

app.get('/callback', function(req, res) {

	// application requests refresh and access tokens

	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		form: {
			code: req.query.code,
			redirect_uri: "http://localhost:3000/callback",
			client_id: spotify_client_id,
			client_secret: spotify_client_secret,
			grant_type: 'authorization_code'
		},
		json:true
	}
	
	var url = 'https://accounts.spotify.com/api/token';
	var formData = {
		code: req.query.code,
		redirect_uri: "http://localhost:3000/2",
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
  
			res.redirect('/2');
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

app.get('/2',function(req,res) {
	
})
  
////////////////////////////////////////////////
app.listen(PORT, function() {
	console.log("Server listening on port " + PORT);
});
////////////////////////////////////////////////
