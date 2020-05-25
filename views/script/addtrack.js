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
