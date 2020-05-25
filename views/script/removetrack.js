function removetrack(id,token) {
    var url = "https://api.spotify.com/v1/me/tracks?ids=" + id + "&"+ "access_token=" + token;

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleResponseRemove;
    httpRequest.open("DELETE", url, false);
    httpRequest.send();

}

function handleResponseRemove(e) {
    if (e.target.readyState == 4 && e.target.status == 200) {
        $("#add-to-library-button").empty();
        $("#add-to-library-button").append('<button type="button" class="btn btn-success btn-lg" id="spotify-button" onclick="addtrack(songid,token)">Add to library</button>');
    }    
}
