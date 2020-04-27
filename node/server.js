var express = require("express");
var request = require('request');

var app = express();

var CLIENTID = "vDSCxp-uAMIxUs3viYuz9oK7-1l9BjmMZWHdQ6ckSwy6z2gwfXkvXCSzy4ejXRqW";
var CLIENTSECRET = "IEVi0recfI0wsCpuSAadiA8z9GEp8xsAS7lUekwo7HeQf2vVSWcuhWzBdo8FbcmMTLQD8qUYEBV1MddFDZviRw";
var accessToken= "?access_token=Y-vG4Ti-HW11OiSj-rMRM5LsN1Gt_hhfY6v9_Fz_gOS3qZEAD9BgeXAzmjq_XDlU";
var API = "https://api.genius.com/search?q=Kendrick%20Lamar";


app.get('/', function(req, res){
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
  
});
  

/*
app.get('/', function(req, res) {
    console.log("code taken");
    // res.send('the access token is: ' + req.query.code);
  
    var formData = {

        code: req.query.code,
        client_id: "vDSCxp-uAMIxUs3viYuz9oK7-1l9BjmMZWHdQ6ckSwy6z2gwfXkvXCSzy4ejXRqW",
        client_secret: "IEVi0recfI0wsCpuSAadiA8z9GEp8xsAS7lUekwo7HeQf2vVSWcuhWzBdo8FbcmMTLQD8qUYEBV1MddFDZviRw",
        redirect_uri: "http://localhost:3000",
        response_type: "code",
        grant_type: "authorization_code"

    }
 
  
    request.post({url:'https://www.googleapis.com/oauth2/v4/token', form: formData}, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
         }
        console.log('Upload successful!  Server responded with:', body);
        var info = JSON.parse(body);
        res.send("Got the token "+ info.access_token);
        a_t = info.access_token;a_t = info.access_token;
    });

});
*/
app.listen(3000);