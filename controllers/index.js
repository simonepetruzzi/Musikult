const express = require("express");
const fs = require("fs"); //permette di leggere il file system 
const path = require('path'); //fornisce metodi per lavorare su percorsi del file system 
const ws = require('../utilities/ws');
const spotify = require('../utilities/spotify');

const router = express.Router();

var projectPath = path.resolve('.');

router.get("/",(req,res) => {

	var token = req.query.access_token;

	if(!token) 
		res.render('home', { isLogged: false });
	
	else{
		spotify.spotifyIDArtists(token,function(obj){
			spotify.spotifyIDTracks(token,function(obj1){
				res.render('home', { isLogged: true , artist: obj,tracks: obj1});
			});
		});
	}

});

router.use("/spotifyAuth", require("./spotifyAuth"));
router.use("/songs", require("./songs"));

module.exports = router;
