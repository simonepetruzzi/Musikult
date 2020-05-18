
const client_id = "vDSCxp-uAMIxUs3viYuz9oK7-1l9BjmMZWHdQ6ckSwy6z2gwfXkvXCSzy4ejXRqW";
const client_secret = "IEVi0recfI0wsCpuSAadiA8z9GEp8xsAS7lUekwo7HeQf2vVSWcuhWzBdo8FbcmMTLQD8qUYEBV1MddFDZviRw";
const access_token = "kG91TrvmqYf06aeYAOpgxFTXcmUAJ0N0wRCtbn7m-tHXsfGVDWULJAGro3dbQWfS";
const API = "https://api.genius.com";

function geniusRef(artist,song) {
    for(let i=0;i<song.length;i++){
        if(song[i]=="(" || song[i] == "-"){
            song = song.slice(0,i)
        }
    }
    console.log(song);
    artist = artist.replace(" ","%20");
    song = song.replace(" ","%20");

    var url = API + "/search?q=" + artist + "%20" + song + "&"+ "access_token=" + access_token;/* https://api.genius.com/search?q=:query */
       
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleResponse;
    httpRequest.open("GET",url,false);
    httpRequest.send();
   
};

function handleResponse(e){
    if (e.target.readyState == 4 && e.target.status == 200){
        var id =JSON.parse(e.target.responseText)//.response.hits[0].result.id;
        
        id=id.response.hits[0].result.id;
        window.location.href = "http://localhost:3000/songs?id=" + id + "&" +"access_token=" + token;
    }
}


