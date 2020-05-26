/******************************PLAY*********************************/

function play(id, token) {
    
    var body = {
        "uris": [ "spotify:track:" + id ]
    }

    var url = "https://api.spotify.com/v1/me/player/play?access_token=" + token;

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


/*****************************REMOVE********************************/

function removetrack(id,token) {
    var url = "https://api.spotify.com/v1/me/tracks?ids=" + id + "&"+ "access_token=" + token;

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleResponseRemove;
    httpRequest.open("DELETE", url, true);
    httpRequest.send();

}

function handleResponseRemove(e) {
    if (e.target.readyState == 4 && e.target.status == 200) {
        $("#add-to-library-button").empty();
        $("#add-to-library-button").append('<button type="button" class="btn btn-success btn-lg rounded-pill" onclick="addtrack(songid,token)">Add to library</button>');
    }    
}


/*******************************ADD*********************************/

function addtrack(id,token) {
    var url = "https://api.spotify.com/v1/me/tracks?ids=" + id + "&"+ "access_token=" + token;

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleResponseAdd;
    httpRequest.open("PUT", url, true);
    httpRequest.send();
   
}

function handleResponseAdd(e) {
    if (e.target.readyState == 4 && e.target.status == 200) {
        $("#add-to-library-button").empty();
        $("#add-to-library-button").append('<button type="button" class="btn btn-secondary btn-lg rounded-pill" onclick="removetrack(songid,token)">Remove from library</button>');
    }    
}
