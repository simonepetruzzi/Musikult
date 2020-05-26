const express = require("express");
const bodyparser = require("body-parser");

const db = require("../utilities/db.js");

var router = express.Router();

// Used to take data from the form
router.use(bodyparser.urlencoded({extended: false}));
 
router.post('/', function(req, res) {
    var token = req.query.access_token;

    if(token) {
        db.insertLyrics(req.query.id, req.body.lyrics);
        res.render('thankPage', {
            id:req.query.id,
            isLogged:true
        });
    }
    else {
        db.insertLyrics(req.query.id, req.body.lyrics);
        res.render('thankPage', {
            id:req.query.id, 
            isLogged:false
        });
    }

});

module.exports = router;