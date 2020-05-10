const express = require('express');
const querystring = require('querystring');
const request = require('request');

const keys = require('./keys');

const app = express();

const client_id = keys.getGeniusClientId();
const client_secret = keys.getGeniusClientSecret();
const access_token = keys.getGeniusAccessToken();

const API = "https://api.genius.com/search?";

//Genius search
exports.geniusSearch = function(searchquery, func) {

    var options = {
        url: API + querystring.stringify({ q: searchquery }),
        headers: {
            'Authorization': 'Bearer ' + access_token
         }
	};

	//makes the request to Genius Api to obtain the research data
    request(options, function callback(error, response, body) {		

		if (!error && response.statusCode == 200) {
            var g = geniusFilter(JSON.parse(body));
            func(g);
        }
		
		else 
			console.log(error);

    });  
};

//This function filters data coming from Genius Api into a lighter JSON containing essential info
function geniusFilter(info) {					    //info is Genius JSON

	var x = {                               				//x is the result
		songs: [],
		artists: []
	}
	
	var hit;
	var ids = [];
	for(i = 0; i < info.response.hits.length; i++) {

		hit = info.response.hits[i];						

		x.songs.push({										
			name: hit.result.title,
			id: hit.result.id,
			artist: hit.result.primary_artist.name,
			photo: hit.result.song_art_image_thumbnail_url
		});

		var artist = {										//pushes artist only if it has not been 	
			name: hit.result.primary_artist.name,			//pushed yet
			id: hit.result.primary_artist.id,
			photo: hit.result.primary_artist.image_url
		};
		
		occ = false;
		if(!ids.includes(artist.id)) {
			x.artists.push(artist);
			ids.push(artist.id);
		}
	}
	return x;

}