const express = require("express");
const genius = require("../utilities/genius.js");
const happi = require("../utilities/happi.js");

var router = express.Router();

router.get('/', function(req, res) {
    genius.getSongInfo(req.query.id, function(obj) {
        happi.getSongInfo(obj.response.song.title, obj.response.song.primary_artist.name, function(obj2) {
            res.render('song', {info: obj.response.song, lyrics: obj2});
        })
    });
});

module.exports = router;