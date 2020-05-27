// This code loads the IFrame Player API code asynchronously.

var video = $('#player').attr("video"); //video url
if(video) {

    var id = filterVideoId();
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            width: '100%',
            videoId: id,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // The API will call this function when the video player is ready.
    function onPlayerReady(event) { }

    // The API calls this function when the player's state changes.
    function onPlayerStateChange(event) { }

    // This function filters the youtube video ID from the URL
    function filterVideoId() {
        
        var copy = false;
        var id = "";
        for(var i = 0; i < video.length; i++) {
            if(copy) id += video[i];
            if(video[i] == '=') copy = true;
        };
        
        return id;
    }
}

