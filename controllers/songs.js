const express = require("express");
const genius = require("../utilities/genius.js");

var router = express.Router();

router.get('/', function(req, res) {
    genius.getSongInfo(req.query.id, function(obj) {
        res.render('song', {info: obj.response.song});
        console.log(obj.response.song);
    });
});

module.exports = router;