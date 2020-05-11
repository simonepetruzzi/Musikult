const express = require("express");
const fs = require("fs"); //permette di leggere il file system 
const path = require('path'); //fornisce metodi per lavorare su percorsi del file system 
const ws = require('../utilities/ws');

const router = express.Router();

var projectPath = path.resolve('.');

router.get("/",(req,res) => {

	var token = req.query.access_token;

	if(!token) 
		res.render('home', { isLogged: false });
	
	else 
		res.render('home', { isLogged: true });

});

router.use("/spotifyAuth", require("./spotifyAuth"));
router.use("/songs", require("./songs"));

module.exports = router;
