const express = require('express');
const request = require('request');

const APIt = "https://api.spotify.com/v1/me/top/tracks";
const APIa = "https://api.spotify.com/v1/me/top/artists";

exports.spotifyIDTracks=function(token,func){
    var options = {
        url: APIt,
        headers : {
            'Authorization': 'Bearer ' + token
        }
    };
    
    request.get(options, function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var x = tracksFilter(JSON.parse(body));
            func(x);
        }

        else 
            console.log(error);    
    });
};
exports.spotifyIDArtists=function(token,func){
    var options = {
        url: APIa,
        headers : {
            'Authorization': 'Bearer ' + token
        }
    };
    request.get(options, function callback(error, response, body) {		

        if (!error && response.statusCode == 200) {
            var y = artistFilter(JSON.parse(body));
            func(y);
        }

        else {
            console.log(error);
        }
            
    });
};
    
function artistFilter(info){
    var response;
    var x ={
        artisti : []
    }
    for(var i=0;i<6;i++){
        response = info.items[i];

        x.artisti.push({
            id : response.id,
            name : response.name,
            genere : response.genres,
            image : response.images[1]

        });
    
    }
    return x;

}

function tracksFilter(info1){
    var response1 ;
    var y ={
        tracks : []
    }
    for(var j =0 ; j<6;j++){
        response1 = info1.items[j];

        y.tracks.push({
            id : response1.album.id,
            image : response1.album.images[1].url,
            name : response1.album.name,
            idartist : response1.album.artists.id,
            nameartist : response1.album.artists.name
        })
    }
    return y
}