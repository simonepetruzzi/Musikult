function follow(id,token) {
    var url = "https://api.spotify.com/v1/me/following?type=artist&ids=" + id + "&"+ "access_token=" + token;

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleResponse;
    httpRequest.open("PUT",url,false);
    httpRequest.send();
   
};

function handleResponse(e){
    if (e.target.readyState == 4 && e.target.status == 200){
        $("#spotify-button").empty();
        $("#spotify-button").append('<button type="button" class="btn btn-secondary btn-lg" id="spotify-button" onclick="unfollow(artistid,token)">Unfollow</button>');
    }    
}
