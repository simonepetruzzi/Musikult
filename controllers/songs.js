const express = require("express");
const bodyparser = require("body-parser");

const genius = require("../utilities/genius.js");
const db = require("../utilities/db.js");

var router = express.Router();

router.use(bodyparser.urlencoded({extended: false}));

router.get('/', function(req, res) {
    genius.getSongInfo(req.query.id, function(obj) {
        db.getLyrics(req.query.id, obj.title, obj.primary_artist.name, function(obj2) {
            console.log("rendering page");
            res.render('song', {info: obj, lyrics: obj2, token: req.query.access_token});
        })
    });
});

router.post('/submit', function(req, res) {
    
    db.insertLyrics(req.query.id, req.body.lyrics);
    res.render('thankPage', {id:req.query.id});
    
});

module.exports = router;