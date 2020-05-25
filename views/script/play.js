function addtrack(id,token) {
    
    var url = "https://api.spotify.com/v1/me/player/play" + "&" + +id +"]}" + "&"+ "access_token=" + token;
    //fai set request header 
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleResponse;
    httpRequest.open("PUT",url,false);
    httpRequest.send();
   
};

function handleResponse(e){
    if (e.target.readyState == 4 && e.target.status == 200){
    }    
}
