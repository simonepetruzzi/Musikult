const express = require("express");
const genius = require("../utilities/genius.js");
const spotify = require("../utilities/spotify.js");

var router = express.Router();

router.get('/', function(req, res) {
    var token = req.query.access_token;
    genius.getArtistInfo(req.query.id, function(obj) {
        spotify.getRelatedArtists(token, obj.artist.name, function(obj2) {
            res.render('artist', {info: obj, related_artists: obj2});
        });
    });
});

module.exports = router;