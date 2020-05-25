function unfollow(id,token) {
    var url = "https://api.spotify.com/v1/me/following?type=artist&ids=" + id + "&"+ "access_token=" + token;

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleResponse;
    httpRequest.open("DELETE",url,false);
    httpRequest.send();
   
};

function handleResponse(e){
    if (e.target.readyState == 4 && e.target.status == 200){
        $("#spotify-button").empty();
        $("#spotify-button").append('<button type="button" class="btn btn-success btn-lg" id="spotify-button"  onclick="follow(artistid,token)">Follow</button>');
    }    
}
