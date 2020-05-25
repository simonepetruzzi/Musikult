function unfollow(id,token) {
    var url = "https://api.spotify.com/v1/me/following?type=artist&ids=" + id + "&"+ "access_token=" + token;

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleResponseUnfollow;
    httpRequest.open("DELETE",url,true);
    httpRequest.send();

};

function handleResponseUnfollow(e){
    
    if (e.target.readyState == 4 && (e.target.status == 200 || e.target.status == 204)){
        $("#spotify-button").empty();
        $("#spotify-button").append('<button type="button" class="btn btn-success btn-lg rounded-pill" onclick="follow(artistid,token)">Follow</button>');
    }    
}
