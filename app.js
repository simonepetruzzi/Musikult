const express = require('express')
const app = express()

app.use(express.static('views'));

app.use(require('./controllers'));

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});


