// musikult database has one table which contains lyrics from songs
/*
   ______________________ 
  |        lyrics        |
  |______________________|
  |  id   |    text      |
  |_______|______________|
                           
*/


const mysql = require("mysql");

const happi = require("./happi.js");

require('dotenv').config();

const password  = process.env.DB_PASSWORD;
const DBNAME    = "musikultrc"; 

// create connection with the database musikult
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: password,
});

// establish connection
con.connect(function(err) {

    if (err) throw err;
    log("Connected to MySQL!\n");

    // create database if not created
    con.query("CREATE DATABASE " + DBNAME, function(err, result) {
        if (err && err.errno == 1007) log("Database found");
        else if (err) throw err;
        else log("Database created");            
    });

    // open database
    con.query("USE " + DBNAME, function(err, result) {
        if(err) throw err;
    });

    // create table if not created
    con.query("CREATE TABLE lyrics (id int NOT NULL, text varchar(10000), PRIMARY KEY (id))", function(err, result) {
        if (err && err.errno == 1050) log("Table found");
        else if (err) throw err;
        else log("Table created");         
    });
    
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
            callback(err);
        }

        else {

            console.log("--------------------------------");
            log("Inserted record with ID: " + id);
            console.log("------------------------------\n");

            callback(null);

        }

    });
    
}

exports.deleteLyrics = function(id, callback) {

    // delete lyrics of the song with id :id
    var sql = "DELETE FROM lyrics WHERE id = " + id;
    con.query(sql, function (err, result) {

        if (err) {
            log(err.message);
        }

        else {

            console.log("--------------------------------")
            log("Deleted record with ID: " + id);
            console.log("------------------------------\n");

            callback(null);

        }

    });

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