const express = require('express')
const app = express()

app.use(express.static('views'));

app.use(require('./controllers'));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});


