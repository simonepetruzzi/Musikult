const express = require("express");

const genius = require("../utilities/genius.js");
const spotify = require("../utilities/spotify.js");
const db = require("../utilities/db.js");

const router = express.Router();

router.get('/', function(req, res) {
    var token = req.query.access_token;
    var id = req.query.id;

    if(token) {
        genius.geniusToSpotifySongId(token, id, function(spotifyId) {
            genius.getSongInfo(id, function(songInfo) {
                db.getLyrics(id, songInfo.title, songInfo.primary_artist.name, function(lyrics) {
                    spotify.isInLibrary(token, spotifyId, function(isInLibrary) {
                        res.render('song', {
                            info: songInfo, 
                            lyrics: lyrics, 
                            token: token, 
                            addToLibrary: isInLibrary, 
                            spotifyId: spotifyId,
                            isLogged: true
                        });
                    });
                });
            });
        });
    }
    else {
        genius.getSongInfo(id, function(songInfo) {
            db.getLyrics(id, songInfo.title, songInfo.primary_artist.name, function(lyrics) {
                res.render('song', {
                    info: songInfo, 
                    lyrics: lyrics, 
                    token: null, 
                    addToLibrary: null,
                    isLogged: false
                });
            })
        });
    }    
});


module.exports = router;