var express = require("express");
var request = require('request');

var app = express();

//Genius
var CLIENTID = "vDSCxp-uAMIxUs3viYuz9oK7-1l9BjmMZWHdQ6ckSwy6z2gwfXkvXCSzy4ejXRqW";
var CLIENTSECRET = "IEVi0recfI0wsCpuSAadiA8z9GEp8xsAS7lUekwo7HeQf2vVSWcuhWzBdo8FbcmMTLQD8qUYEBV1MddFDZviRw";
var accessToken= "kG91TrvmqYf06aeYAOpgxFTXcmUAJ0N0wRCtbn7m-tHXsfGVDWULJAGro3dbQWfS";
var API = "https://api.genius.com/search?q=house ";

//LastFM 
var LastFmKey = '36e40c0bdeda4b90b8b007257a8de61d';
function LastFmReq(method) {
	return 'http://ws.audioscrobbler.com/2.0/?method='+method+'&api_key='+ LastFmKey +'&format=json';
}

//LastFm getTopArtists
app.get('/', function(req, res){

	request(LastFmReq('chart.gettopartists'), function(error, response, body) {
		res.send(JSON.parse(body));
	});
		
});

//Genius search
app.get('/1', function(req, res){
    var options = {
        url: API,
        headers: {
            'Authorization': 'Bearer ' + accessToken
         }
    };
    request(options, function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
			var a=true;
			var i=1;
			var canzonononi = [];
			var artistononi = [];
			var artcheck = [];
			var song1 = info.response.hits[0];
			var fotosong1 = song1.result.song_art_image_url;
			var nomeartist1 = song1.result.primary_artist.name;
			var nomesong1 = song1.result.title;
			var idsong1 = song1.result.id;
			var idartist1 = song1.result.primary_artist.id;
			var artistphoto1 = song1.result.primary_artist.image_url;
			var jsonsong1 = {"name":nomesong1,"id":idsong1,"artist":nomeartist1,"photo":fotosong1};
			var jsonartist1 = {"name":nomeartist1,"id":idartist1,"photo":artistphoto1};
			artistononi.push(jsonartist1);
			canzonononi.push(jsonsong1);
			artcheck.push(idartist1);
			for (i;i<10;i++){
				var song = info.response.hits[i];
				var fotosong = song.result.song_art_image_url;
				var nomeartist = song.result.primary_artist.name;
				var nomesong = song.result.title;
				var idsong = song.result.id;
				var idartist = song.result.primary_artist.id;
				var artistphoto = song.result.primary_artist.image_url;
				var jsonsong = {"name":nomesong,"id":idsong,"artist":nomeartist,"photo":fotosong};
				var jsonartist = {"name":nomeartist,"id":idartist,"photo":artistphoto};
				canzonononi.push(jsonsong);
				for (var j=0;j<artcheck.length;j++){
					if(idartist==artcheck[j]) a=false;
				}
				if(a==true){
					artistononi.push(jsonartist);
					artcheck.push(idartist);
				}
				a=true;
				
			}
			var x = {
				"songs":canzonononi,
				"artists":artistononi
			}
			res.send(x);
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
