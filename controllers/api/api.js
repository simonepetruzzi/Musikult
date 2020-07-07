const express = require("express");

const genius = require("../../utilities/genius.js");
const db = require("../../utilities/db.js");

var router = express.Router();

router.get('/', function(req, res) {
    res.sendFile('api.html', {root: __dirname });
});

router.get('/lyrics', function(req, res) {

    var id = req.query.id;
    if(isNaN(id)) 
        res.status(400).send("Invalid Parameters");

    else {
        db.getLyrics(id, function(lyrics) {
            if(!lyrics) 
                res.status(404).send("Not Found");
            else {
                res.status(200).json({
                    id: id,
                    lyrics: lyrics
                });
            }
        });
    }
});

router.post('/lyrics', function(req, res) {
    
    var id = req.body.id;
    var lyrics = req.body.lyrics;

    if(isNaN(id) || !lyrics) 
        res.status(400).send("Invalid Parameters");

    else {
        db.insertLyricsAPI(id, lyrics, function(err) {
            if(err) {
                console.log(err.code);
                res.status(409).send("Alredy exists");
            }
            else {
                res.status(201).send("Added");
            }
        });
    }
});

router.get('/tracks', function(res,req) {

    var track = req.query.track;
    var artist = req.query .artist;

    if(!track || !artist) 
        res.status(400).send("Invalid Parameters");

    else {
        genius.geniusSearch(track + " " + artist, function(result) {
            if(!result) 
                res.status(404).send("Not Found");
            else 
                res.status(200).json({
                    id: result.songs[0].id,
                    name: result.songs[0].name,
                    artist: result.songs[0].artist,
                    imgUrl: result.songs[0].photo
                });
        });
    }
});

module.exports = router;