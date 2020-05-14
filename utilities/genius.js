const express = require('express');
const querystring = require('querystring');
const request = require('request');

const keys = require('./keys');

const app = express();

const client_id = keys.getGeniusClientId();
const client_secret = keys.getGeniusClientSecret();
const access_token = keys.getGeniusAccessToken();

const API = "https://api.genius.com";

//Genius getter for a specific song
exports.getSongInfo = function(id, func) {

	var options = {
		url: API + "/songs/" + id,          	/* https://api.genius.com/songs/:id */
		headers: {
			'Authorization' : 'Bearer ' + access_token
		}
	};

	//request to genius API
	request(options, function callback(error, response, body) {

		if (!error && response.statusCode == 200) {
			descriptionCleaning(JSON.parse(body).response.song, func);
		}

		else 
			console.log(error);
	});

};

// This function cleans the result of the API call as Genius returns a description of the track
// that is not easy to use in our scope
function descriptionCleaning(info, func) {
	var description = descriptionCleaningRecursive(info.description.dom);
	description = filterDescription(description);

	info.description = description;
	func(info);
}

function descriptionCleaningRecursive(element) {
	if(element.tag) {

		var desc = "";
		element.children.forEach(children => {
			desc += descriptionCleaningRecursive(children, false);
			if(element.tag == 'root') desc += '\n';
		}); 
		return desc;
	}
	else {
		return element;
	}
}

function filterDescription(string) {

    var filtered = [""];
    var index = 0;
    for(var i = 0; i < string.length; i++) {
        if(string[i] == '\n') filtered[++index] = "";
        else filtered[index] += string[i];
    }

    return filtered;
}

//Genius search
exports.geniusSearch = function(searchquery, func) {

    var options = {								/* https://api.genius.com/search?q=:query */
        url: API + "/search?" + querystring.stringify({ q: searchquery }), 
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