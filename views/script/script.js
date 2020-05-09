
document.getElementById("search-field").addEventListener("input", searchEvent);

function spotifyLogin() {
    window.location.href = "http://localhost:3000/spotifyAuth/";
}

function searchEvent() {
    console.log(document.getElementById("search-field").value);

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleResponse;
    httpRequest.open("GET", "http://localhost:3000/search=" + document.getElementById("search-field").value, true);
    httpRequest.send();
}

function handleResponse(e) {
    if(e.target.readyState == 4 && e.target.status == 200) {
        console.log("response received");
    }
}





