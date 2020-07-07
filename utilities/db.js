// musikult database has one table which contains lyrics from songs
/*
   ______________________ 
  |        lyrics        |
  |______________________|
  |  id   |    text      |
  |_______|______________|
                           
*/


const mysql = require("mysql");
const keys = require("./keys.js");

const happi = require("./happi.js");

const password = keys.getDBPassword();

// create connection with the database musikult
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: password,
    database: 'musikult'
});

// establish connection
con.connect(function(err) {

    if (err) throw err;
    else log("Connected to database!\n");

});


function insertLyrics(id,text) {

    var value = "";
    // this part swaps "'" with "§" to avoid errors and basic SQL injection
    for(var i = 0; i < text.length; i++) {    
        if(text[i] == "'") 
            value += '§';
        else 
            value += text[i];
    };

    var sql = "INSERT INTO lyrics (id, text) VALUES (" + id + ", '" + value + "')";
    con.query(sql, function (err, result) {
        if (err) {
            log(err.message);
            return err;
        }

        console.log("________________________________");
        log("Inserted 1 record");
        console.log("________________________________\n");

    });
    
}

exports.insertLyrics = function(id, text) { insertLyrics(id, text); }

exports.findLyrics = function(id, song_name, artist_name, callback) {

    log("Requesting lyrics for the song " + song_name + " by " + artist_name + 
                "; id: " + id + "\n");

    // get lyrics of the song with id :id
    var sql = "SELECT text FROM lyrics WHERE id = " + id;
    con.query(sql, function (err, result) {
        if (err) 
            log(err.message);      

        //id is unique so there is a max of one result
        //if lyrics are in the database, retrieve them
        if(result[0]) {
            log("Found a result in database\n");
            filterLyrics(result[0].text, function(filtered) {
                callback(filtered);
            })
        }

        // if nothing is found
        else {
            log("No result found in database");
            log("Requesting lyrics to Happi\n");

            // makes a lyrics request to happi
            happi.getSongInfo(song_name, artist_name, function(lyrics) {

                // if lyrics are found
                if(lyrics) {

                    log("Lyrics found");
                    log("Inserting data in the database\n");

                    // inserts lyrics in the database to make minimum amount of api calls
                    insertLyrics(id, lyrics);
                    log("Lyrics inserted in database\n");

                    filterLyrics(lyrics, function(filtered) {
                        callback(filtered);
                    });
                    
                }
                else {
                    log("Lyrics not found\n");
                    callback(null);
                }
            });
        }
    });
}

exports.insertLyricsAPI = function(id, text, callback) {

    err = insertLyrics(id, text);
    callback(err);
    
}

exports.getLyrics = function(id, callback) {

    // get lyrics of the song with id :id
    var sql = "SELECT text FROM lyrics WHERE id = " + id;
    con.query(sql, function (err, result) {
        if (err) {
            log(err.message);
        }

        // if found
        if(result[0]) {
            filterLyrics(result[0].text, function(filtered) {
                callback(filtered);
            })
        }

        // if nothing is found
        else {
            callback(null);
        }
    });
}

// swaps again all the '§' symbols with "'"
function filterLyrics(string, func) {

    var filtered = [""];
    var index = 0;
    for(var i = 0; i < string.length; i++) {
        if(string[i] == '\n') filtered[++index] = "";
        else if(string[i] == '§') filtered[index] += "'";
        else filtered[index] += string[i];
    }

    func(filtered);
}

function log(msg) {
    console.log("[DATABASE]: " + msg);
}