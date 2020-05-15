const express = require("express");
const genius = require("../utilities/genius.js");

var router = express.Router();

router.get('/', function(req, res) {
    genius.getArtistInfo(req.query.id, function(obj) {
        res.render('artist', {info: obj});
    });
});

module.exports = router;