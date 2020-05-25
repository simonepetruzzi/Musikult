const express = require('express');
const request = require('request');
const querystring = require('querystring');

const APIt = "https://api.spotify.com/v1/me/top/tracks";
const APIa = "https://api.spotify.com/v1/me/top/artists";

exports.getRelatedArtistsWithId = function(token, id, func) {

    var options = {
        url: "https://api.spotify.com/v1/artists/" + id + "/related-artists",
        headers : {
            'Authorization': 'Bearer ' + token
        }
    };
    
    request.get(options, function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            func(JSON.parse(body).artists);
        }

        else 
            console.log(error);
    });
}

exports.getRelatedArtistsWithoutId = function(token, artist, func) {

    searchArtist(token, artist, function(id) {

        var options = {
            url: "https://api.spotify.com/v1/artists/" + id + "/related-artists",
            headers : {
                'Authorization': 'Bearer ' + token
            }
        };
        
        request.get(options, function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                func(JSON.parse(body).artists);
            }
    
            else 
                console.log(error);
        });
    })
}

exports.getAddToLibrary = function(token, song, func) {

    searchSong(token, song, function(id) {

        var options = {
            url: "https://api.spotify.com/v1/me/tracks/contains?ids=" + id,
            headers : {
                'Authorization': 'Bearer ' + token
            }
        };
        
        request.get(options, function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                func(JSON.parse(body));
            }
    
            else 
                console.log("Error in add to library: " + response.statusCode + " " + response.statusMessage);
        });
    })
}

exports.getBestSong = function(token, id, func) {

    var options = {
        url: "https://api.spotify.com/v1/artists/" + id + "/top-tracks?country=US",
        headers : {
            'Authorization': 'Bearer ' + token
        }
    };
    
    request.get(options, function callback(error, response, body) {
        if (!error && response.statusCode == 200) {

            var tracks = JSON.parse(body).tracks;
            for(var i = 0; i < tracks.length; i++) {
                if(tracks[i].artists[0].id == id) {
                    func(tracks[i].name, tracks[i].artists[0].name);
                    break;
                }
            };
        }

        else 
            console.log(error);
    });
    
}

function searchArtist(token, artist, func) {

    var options = {
        url: "https://api.spotify.com/v1/search?type=artist&q="+artist,
        headers : {
            'Authorization': 'Bearer ' + token
        }
    };
    
    request.get(options, function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            func(JSON.parse(body).artists.items[0].id);
        }

        else 
            console.log(error);
    });

}

function searchSong(token, song, func) {

    var options = {
        url: "https://api.spotify.com/v1/search?type=track&" + querystring.stringify({ q: song }),
        headers : {
            'Authorization': 'Bearer ' + token
        }
    };
    
    request.get(options, function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            func(JSON.parse(body).tracks.items[0].id);
        }

        else 
            console.log("Error in search song: " + response.statusCode + " " + response.statusMessage);
    });

}

exports.spotifyIDTracks=function(token,func){
    var options = {
        url: APIt,
        headers : {
            'Authorization': 'Bearer ' + token
        }
    };
    
    request.get(options, function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var b = JSON.parse(body);
            //console.log(b);
            if(b.total !=0){
                var x = tracksFilter(JSON.parse(body));
                func(x);
            }
            else{
                func(null);
            }
            
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
            var a = JSON.parse(body)
            if(a.total != 0){
                var y = artistFilter(JSON.parse(body));
                func(y);
            }
            else{
                func(null);
            }
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
            name : response1.name,
            idartist : response1.artists[0].id,
            nameartist : response1.artists[0].name
        });
    }
    return y
}
exports.spotifyUserInformation=function(token,func){
    var options = {
        url: "https://api.spotify.com/v1/me",
        headers : {
            'Authorization': 'Bearer ' + token
        }
    };
    
    request.get(options, function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var z = informationFilter(JSON.parse(body));
            func(z);
        }

        else 
            console.log(error);    
    });
}

function informationFilter(info2){ 
    var z ={
        information: []
    }

    var image = null;
    if(info2.images[0]) image = info2.images[0].url; 

    z.information.push({
        country : info2.country,
        name : info2.display_name,
        image : image
    });
    return z;
    
}
exports.spotifyfollow=function(token,id,func){
    var options = {
        url: "https://api.spotify.com/v1/me/following/contains?type=artist&ids=" + id,
        headers : {
            'Authorization': 'Bearer ' + token,
        }
    };
    request.get(options, function callback(error, response, body) {		
        if (!error && response.statusCode == 200) {
            func(JSON.parse(body));
        }

        else {
            console.log(error);
        }
    });
}

exports.getNewReleases = function(token, func) {

    var options = {
        url: "https://api.spotify.com/v1/browse/new-releases?country=US",
        headers : {
            'Authorization': 'Bearer ' + token,
        }
    };
    request.get(options, function callback(error, response, body) {		
        if (!error && response.statusCode == 200) {
            var singles = [];
            var items = JSON.parse(body).albums.items;
            for(var i = 0; i < items.length; i++) {
                if(items[i].album_type == 'single') {
                    singles.push(items[i]);
                    if(singles.length >= 5) break; 
                }       
            }
            func(singles);
        }

        else {
            console.log(error);
        }
    });
    
}

exports.searchArtist = function(token, artist, func) {
    searchArtist(token, artist, func);
}
exports.searchSong = function(token, song, func) {
    searchSong(token, song, func);
}
