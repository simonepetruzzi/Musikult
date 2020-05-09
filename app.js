const express = require('express');
const app = express();

// import global variables
const global = require('../Musikult/modules/global');

app.use(express.static('views'));

app.use(require('./controllers'));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.listen(global.getServerPort(), () => {
    console.log("Server listening on port " + global.getServerPort());
});


