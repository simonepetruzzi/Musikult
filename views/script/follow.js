

function follow(id,token) {

    var url = "https://api.spotify.com/v1/me/following?type=artist&ids=" + id + "&"+ "access_token=" + token;
       
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleResponse;
    httpRequest.open("PUT",url,false);
    httpRequest.send();
   
};

function handleResponse(e){
    if (e.target.readyState == 4 && e.target.status == 200){
        var id =JSON.parse(e.target.responseText)//.response.hits[0].result.id;
        
        id=id.response.hits[0].result.id;
        window.location.href = "http://localhost:3000/songs?id=" + id + "&" +"access_token=" + token;
    }
}
