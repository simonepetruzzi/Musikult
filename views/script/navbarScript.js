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

    if(searchquery == "") hideBox();
    else {
        searchBox.empty();
        searchBox.append(spinner);
        showBox();

        setTimeout(() => {
            if(request_id == id) {
                searchBox.empty();
                socket.send(searchquery);  //send data to server only if no other researches are made
                                           //in 1 second
            } 
                                    
        }, 1000);                        
    }
}

function show(result) {

    for(i = 0; i < result.songs.length; i++) {
        var search_element = $("<div class='row tab song' type='song' id='" + result.songs[i].id + "'></div>"); 
        search_element.append("<img class = 'col-4' id='thumbnail' src=" + result.songs[i].photo + ">");
        search_element.append("<p class='lead' id='song-text'>" + result.songs[i].name + "<br>" + result.songs[i].artist + "</p>");
        searchBox.append(search_element);
        searchBox.append("<hr>");
    }

    for(var i = 0; i < result.artists.length; i++) {
        var search_element = $("<div class='row tab' type='artist' id='" + result.artists[i].id + "'></div>"); 
        search_element.append("<img class = 'col-4' id='thumbnail' src=" + result.artists[i].photo + ">");
        search_element.append("<p class='lead' id='song-text'>" + result.artists[i].name + "</p>");
        searchBox.append(search_element);
        searchBox.append("<hr>");
    }

    $(document).ready(function(){
        $(".tab").mouseenter(function(){
            $(this).css("background-color", "rgba(143, 143, 143, 0.199)");
        });
        $(".tab").mouseleave(function(){
            $(this).css("background-color", "white");
        });

        $(".tab").click(function() {
            if($(this).attr("type") == "song") 
                window.location.href = "http://localhost:3000/songs?id=" + $(this).attr("id");
            else if($(this).attr("type") == "artist")
                window.location.href = "http://localhost:3000/artists?id=" + $(this).attr("id");
        });
    });
    
    
}

var searchBox = $(".search-box");
var spinner = $("<div class='row justify-content-center' style='padding-top: 160px;'>" +
                "<div class='loading-spinner'><div class='ldio-q2cfxhasjgq'>" +
                "<div></div></div></div></div>");

searchBox.hide();

function hideBox() {
    if(searchBox.is(":visible")) {
        searchBox.empty();
        searchBox.css({top: '0px'});
        searchBox.animate({
            opacity: 0.25,
            top: '-=400px'
            //height: "toggle"
        }, 400, function() {
            searchBox.hide();
        });
    }
}
function showBox() {
    if(!searchBox.is(":visible")) {
        searchBox.css({top: '-400px'});
        searchBox.show();
        searchBox.animate({
            opacity: 1,
            top: '+=400px'
        }, 400);
    }
}

$(document).mouseup(function(e) {
    var container = $(".search-box");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0 && !($('#search-field').is(e.target))) 
    {
        hideBox();

    }
});



