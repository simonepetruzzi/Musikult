const express = require('express');
const querystring = require('querystring');
const request = require('request');

const keys = require('./keys');

const app = express();

const key = keys.getHappiKey();

const API = "https://api.happi.dev/v1/music?";

//Happi API call to get a Song informations, this gives the info to then call the lyrics funciton
exports.getSongInfo = function(title, artist, func) {

	var options = {
		url: API + querystring.stringify({
            q: title + ' ' + artist,
            apikey: key,
            limit: 1,
            type: 'track',
        })
	};

	//request to happi API
	request(options, function callback(error, response, body) {

        if (!error && response.statusCode == 200) {
            if(JSON.parse(body).result[0].haslyrics)
                getLyrics((JSON.parse(body)).result[0].api_lyrics, func);
            else 
                func(null);
        }

		else {
            console.log(error);
            func(null);                   //if theres no lyrics the page will still be rendered
        }
	});

};

//Happi API call to get lyrics of a specific song
function getLyrics(lyrics_api, func) {

    var options = {
		url: lyrics_api + '?' + querystring.stringify({
            apikey: key,
        })
    };
    
    //request to happi API
    request(options, function callback(error, response, body) {

        if (!error && response.statusCode == 200) {
            func((JSON.parse(body)).result.lyrics);
        }

		else {
            console.log(error);
            func(null); 
        }
	});
}