const express = require("express");
const genius = require("../utilities/genius.js");
const spotify = require("../utilities/spotify.js");

var router = express.Router();

router.get('/', function(req, res) {

    var token = req.query.access_token;
    var id = req.query.id;
    var ids= id.slice(0,id.length -1);

    if(id.charAt(id.length - 1) == 's') { //if id is from spotify converts it
        
        id = id.substring(0, id.length-1);
        
        spotify.spotifyfollow(token,ids,function(obj3){
            genius.spotifyToGeniusArtistId(token, id, function(new_id) {
                genius.getArtistInfo(new_id, function(obj) {
                    if(token) {
                        spotify.getRelatedArtistsWithId(token, id, function(obj2) {
                            res.render('artist', {info: obj, related_artists: obj2,follow: obj3,id :ids});
                        });
                    }
                    else res.render('artist', {info: obj, related_artists: null});
                }); 
            });
        });
    }
    else {

        genius.getArtistInfo(id, function(obj) {
            if(token) {
                spotify.getRelatedArtistsWithoutId(token, obj.artist.name, function(obj2) {
                    spotify.spotifyfollow(token,ids,function(obj3){
                        res.render('artist', {info: obj, related_artists: obj2, follow: obj3});
                    });
                });
            }
            else res.render('artist', {info: obj, related_artists: null, follow: null});
        });
    }
});

module.exports = router;