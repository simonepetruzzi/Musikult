const express = require("express");
const bodyparser = require("body-parser");

const db = require("../utilities/db.js");

var router = express.Router();

router.use(bodyparser.urlencoded({extended: false}));

router.post('/', function(req, res) {
    
    db.insertLyrics(req.query.id, req.body.lyrics);
    res.render('thankPage', {id:req.query.id});
    
});

module.exports = router;