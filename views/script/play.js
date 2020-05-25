function play(id, token) {
    
    var body = {
        "uris": [ "spotify:track:" + id ]
    }
    var uris = "spotify:track:" + id ;
    var url = "https://api.spotify.com/v1/me/player/play?access_token=" + token;
    //fai set request header 
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleResponsePlay;
    httpRequest.open("PUT", url, true);
    httpRequest.send(JSON.stringify(body));

}

function handleResponsePlay(e) {
    if (e.target.readyState == 4 && e.target.status == 200) {
        console.log("play");
    }    
    else 
        console.log("Error: " + e.target.status + " " + e.target.statusText + " " + e.target.responseText);
}
