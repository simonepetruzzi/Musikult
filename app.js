const express = require('express')
const app = express()

app.use("/static",express.static('views'));

app.use(require('./controllers'));

app.listen(3000);

console.log("You are listening to port 3000");
