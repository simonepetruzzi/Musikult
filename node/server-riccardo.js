var express = require("express");
var request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var app = express();
var httpRequest = new XMLHttpRequest();

var CLIENTID = "vDSCxp-uAMIxUs3viYuz9oK7-1l9BjmMZWHdQ6ckSwy6z2gwfXkvXCSzy4ejXRqW";
var CLIENTSECRET = "IEVi0recfI0wsCpuSAadiA8z9GEp8xsAS7lUekwo7HeQf2vVSWcuhWzBdo8FbcmMTLQD8qUYEBV1MddFDZviRw";
var accessToken= "kG91TrvmqYf06aeYAOpgxFTXcmUAJ0N0wRCtbn7m-tHXsfGVDWULJAGro3dbQWfS";
var API = "https://api.genius.com/search?q=Kendrick%20Lamar";


app.get('/', function(req, res){
    res.send("ciao");
    /*
    var options = {
        url: API,
        headers: {
            'Authorization': 'Bearer ' + accessToken
         }
    };
    request(options, function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info);
            res.send(info);
        }
        else {
            console.log(error);
         }
    });
  */
});

app.get('/search', function(req, res) {
    res.send("search done");
})

httpRequest.onreadystatechange = statechanged;

function statechanged(e) {
    console.log("something happened");
}
  
app.listen(3000);
