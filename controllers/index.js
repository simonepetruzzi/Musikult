const express = require("express")
const fs = require("fs") //permette di leggere il file system 
const path = require('path') //fornisce metodi per lavorare su percorsi del file system 
const router = express.Router()

var projectPath = path.resolve('.')

router.get("/",(req,res) => {
	res.sendFile(projectPath + '/views/home.html');
});

module.exports = router
