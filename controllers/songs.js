const express = require("express");
const bodyparser = require("body-parser");

const genius = require("../utilities/genius.js");
const spotify = require("../utilities/spotify.js");
const db = require("../utilities/db.js");

var router = express.Router();

router.use(bodyparser.urlencoded({extended: false}));

router.get('/', function(req, res) {
    var token = req.query.access_token;
    var id = req.query.id;

    if(token) {
        genius.geniusToSpotifySongId(token, id, function(spotifyId) {
            genius.getSongInfo(req.query.id, function(obj) {
                db.getLyrics(req.query.id, obj.title, obj.primary_artist.name, function(obj2) {
                    spotify.getAddToLibrary(token, spotifyId, function(obj3) {
                        res.render('song', {
                            info: obj, 
                            lyrics: obj2, 
                            token: token, 
                            addToLibrary: obj3, 
                            spotifyId: spotifyId,
                            isLogged: true
                        });
                    });
                });
            });
        });
    }
    else {
        genius.getSongInfo(req.query.id, function(obj) {
            db.getLyrics(req.query.id, obj.title, obj.primary_artist.name, function(obj2) {
                res.render('song', {
                    info: obj, 
                    lyrics: obj2, 
                    token: null, 
                    addToLibrary: null,
                    isLogged: false
                });
            })
        });
    }
    
});


module.exports = router;