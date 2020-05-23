const express = require("express");
const bodyparser = require("body-parser");

const genius = require("../utilities/genius.js");
const spotify = require("../utilities/spotify.js");
const db = require("../utilities/db.js");

var router = express.Router();

router.use(bodyparser.urlencoded({extended: false}));

router.get('/', function(req, res) {

    if(req.query.access_token) {
        genius.getSongInfo(req.query.id, function(obj) {
            db.getLyrics(req.query.id, obj.title, obj.primary_artist.name, function(obj2) {
                spotify.getAddToLibrary(req.query.access_token, obj.title, function(obj3) {
                    res.render('song', {info: obj, lyrics: obj2, token: req.query.access_token, addToLibrary: obj3});
                });
            });
        });
    }
    else {
        genius.getSongInfo(req.query.id, function(obj) {
            db.getLyrics(req.query.id, obj.title, obj.primary_artist.name, function(obj2) {
                res.render('song', {info: obj, lyrics: obj2, token: req.query.access_token, addToLibrary: null});
            })
        });
    }
    
});


module.exports = router;