const express = require("express");
const mysql = require("mysql");

const happi = require("./happi.js");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12051998",
    database: 'musikult'
});

con.connect(function(err) {

    if (err) throw err;
    else console.log("Connected to database!\n");

});


function insertLyrics(id,text) {

    var value = "";
    for(var i = 0; i < text.length; i++) {     //cleans text
        if(text[i] == "'") 
            value += '§';
        else 
            value += text[i];
    };

    var sql = "INSERT INTO lyrics (id, text) VALUES (" + id + ", '" + value + "')";
    con.query(sql, function (err, result) {
        if (err) throw err;

        console.log("________________________________");
        console.log("Inserted 1 record");
        console.log("________________________________");
    });
    
}

exports.insertLyrics = function(id, text) { insertLyrics(id, text); }

exports.getLyrics = function(id, song_name, artist_name, callback) {

    console.log("\nRequestin lyrics for the song " + song_name + " by " + artist_name + 
                "; id: " + id + "\n");

    var sql = "SELECT text FROM lyrics WHERE id = " + id;
    con.query(sql, function (err, result) {
        if (err) throw err;

        if(result[0]) {
            console.log("Found a result in database\n");
            filterLyrics(result[0].text, function(filtered) {
                callback(filtered);
            })
        }
        else {
            console.log("No result found in database");
            console.log("Requesting lyrics to Happi\n");

            happi.getSongInfo(song_name, artist_name, function(lyrics) {

                if(lyrics) {

                    console.log("Lyrics found");
                    console.log("Inserting data in the database\n");

                    insertLyrics(id, lyrics);
                    console.log("Lyrics inserted in database\n");

                    filterLyrics(lyrics, function(filtered) {
                        callback(filtered);
                    });
                    
                }
                else {
                    console.log("Lyrics not found\n");
                    callback(null);
                }
            });
        }
    });
}

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
