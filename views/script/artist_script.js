var url = new URL(window.location.href);
var token = url.searchParams.get("access_token");

$(document).ready(function() {
    $(".song-div").mouseenter(function(){
        $(this).css("background-color", "rgba(143, 143, 143, 0.199)");
    });
    $(".song-div").mouseleave(function(){
        $(this).css("background-color", "rgba(143, 143, 143, 0)");
    });

    $(".song-div").click(function() {
        if(token)
            window.location.href = "http://localhost:3000/songs?access_token=" + token + "&id=" + $(this).attr("id");
        else
            window.location.href = "http://localhost:3000/songs?id=" + $(this).attr("id");
    });
});

var body = document.body,
    html = document.documentElement;
var width = Math.max( body.offsetWidth, 
                      html.clientWidth, html.offsetWidth);

var n = 33;
var maxn = (parseInt($(".flex-row").attr("number")))*300 - width + 300;

$(document).ready(function() {
    $(".left").click(function() {
        if(n < 33) {
            n += 600;
            $(".related-artists-row").animate({
                left: n + "px",
            });
        }
    });
    $(".right").click(function() {
        if(n > -maxn + 33) {
            n -= 600;
            $(".related-artists-row").animate({
                left: n + "px",
            });
        }
    });

    $(".left").mouseenter(function() {
        $(this).css("background-color", "rgba(128, 128, 128, 0.750)");
        $(this).children("p").css("font-size", "34px");
        $(this).children("p").css("padding-top", "60px");
        $(this).children("p").css("color", "rgba(80, 80, 80, 0.8)");
    });
    $(".right").mouseenter(function() {
        $(this).css("background-color", "rgba(128, 128, 128, 0.750)");
        $(this).children("p").css("font-size", "34px");
        $(this).children("p").css("padding-top", "60px");
        $(this).children("p").css("color", "rgba(80, 80, 80, 0.8)");
    });
    $(".left").mouseleave(function() {
        $(this).css("background-color", "rgba(128, 128, 128, 0.550)");
        $(this).children("p").css("font-size", "30px");
        $(this).children("p").css("padding-top", "62px");
        $(this).children("p").css("color", "rgba(116, 116, 116, 0.6)");
    });
    $(".right").mouseleave(function() {
        $(this).css("background-color", "rgba(128, 128, 128, 0.550)");
        $(this).children("p").css("font-size", "30px");
        $(this).children("p").css("padding-top", "62px");
        $(this).children("p").css("color", "rgba(116, 116, 116, 0.6)");
    });

    $(".related-artist").mouseenter(function() {
        $(this).children(".related-artist-img").css({
            filter: "brightness(50%)",
        })
        $(this).children(".related-artist-text").show();
    });
    $(".related-artist").mouseleave(function() {
        $(this).children(".related-artist-img").css({
            filter: "brightness(100%)",
        })
        $(this).children(".related-artist-text").hide();
    });

    $(".related-artist").click(function() {
        window.location.href = "http://localhost:3000/artists" + "?access_token=" + token + "&" + "id=" + $(this).attr("id") + "s";
    });
    
});