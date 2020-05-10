////////////////////////////////////////////////////////////////////////////
/********NAVBAR SCRIPT TO HANDLE WEB SOCKETS AND SEARCHING OF DATA*********/

if (!"WebSocket" in window) alert("WebSocket not supported by your browser");

var socket = new WebSocket('ws://localhost:4000/');

///////////////////////WEB SOCKET HANDLERS//////////////////////////////////

socket.onopen = function() {
    console.log('[WEBSOCKET] Connection with server established');
}

// When data is received
socket.onmessage = function(event) {
    console.log(JSON.parse(event.data));
    show(JSON.parse(event.data));  
}

// A connection could not be made
socket.onerror = function(event) {
    console.log(event);
}

// A connection was closed
socket.onclose = function(code, reason) {
    console.log(code, reason);
}

// Close the connection when the window is closed
window.addEventListener('beforeunload', function() {
    socket.close();
});

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////SEARCH FUNCTIONS/////////////////////////////////

var request_id = 0;
document.getElementById("search-field").addEventListener("input", searchEvent);

function searchEvent(id) {

    var id = ++request_id;

    if(document.getElementById("search-field").value == " ")   //does not allow to write spaces if
        document.getElementById("search-field").value = "";    //the form is empty

    var searchquery = document.getElementById("search-field").value;   

    if(searchquery == "") searchBox.hide();
    else {
        searchBox.show();

        setTimeout(() => {
            if(request_id == id) 
            socket.send(searchquery); //send data to server only if no other researches are made
        }, 1000);                     //in 1 second
    }
}

function show(result) {

    for(var i = 0; i < result.artists.length; i++) {
        var search_element = $("<div class='container row'></div>"); 
        search_element.append("<img class = 'col-4' id='thumbnail' src=" + result.artists[i].photo + ">");
        search_element.append("<p id='song-text'>" + result.artists[i].name + "</p>");
        searchBox.append(search_element);
        searchBox.append("<hr>");
    }

    for(i = 0; i < result.songs.length; i++) {
        var search_element = $("<div class='container row'></div>"); 
        search_element.append("<img class = 'col-4' id='thumbnail' src=" + result.songs[i].photo + ">");
        search_element.append("<p id='song-text'>" + result.songs[i].name + "<br>" + result.songs[i].artist + "</p>");
        searchBox.append(search_element);
        searchBox.append("<hr>");
    }
    

}

var searchBox = $(".search-box");

searchBox.hide();



