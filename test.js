const request = require('request');
const querystring = require('querystring');
const happi = require('./utilities/happi');
const { reject } = require('async');
const { resolve } = require('path');

const API = "http://localhost:3000/api";

var testID;
var testLyrics;
var testArtist;
var testTrack;

function insert() {

    return new Promise((resolve, reject) => {
    
        console.log("Inserting lyrics with ID: " + testID) ;
    
        var formData = {
            url: API + '/lyrics',
            form: {
                id: testID,
                lyrics: testLyrics
            }
        }
        
        request.post(formData, function callback(error, response, body) {
        
            if (!error && response.statusCode == 201) {
                resolve();
            }
        
            else {
                console.log(response.statusCode + " " + response.statusMessage);
                reject();
            }
        
        });
    
    });

} 

function remove() { 

    return new Promise((resolve, reject) => {

        console.log("Deleting lyrics with ID: " + testID) ;
    
        var formData = {
            url: API + '/lyrics?id=' + testID,
        }
    
        request.delete(formData, function callback(error, response, body) {
    
            if (!error && response.statusCode == 200) {
                resolve();
            } 
    
            else {
                console.log(response.statusCode + " " + response.statusMessage);
                reject();
            }
    
        });
    
    });

}

function find() {

    return new Promise( (resolve, reject) => {

        console.log("Finding the track '" + testTrack + "' by " + testArtist);

        var formData = {
            url: API + '/tracks?track=' + testTrack + "&artist=" + testArtist,
        }
    
        request.get(formData, function callback(error, response, body) {
    
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body));
            } 
    
            else {
                console.log(response.statusCode + " " + response.statusMessage);
                reject();
            }
    
        });

    });

}

function findLyrics() { 

    return new Promise((resolve, reject) => {

        happi.getSongInfo(testTrack, testArtist, function(lyrics) {

            if(lyrics) {
                resolve(lyrics);
            }

            else {
                console.log("No lyrics where found");
                reject();
            }
        });

    });

}

function getLyrics() {

    return new Promise((resolve, reject) => {

        console.log("Getting lyrics of the track with ID: " + testID);

        var formData = {
            url: API + '/lyrics?id=' + testID,
        }
    
        request.get(formData, function callback(error, response, body) {
    
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body).lyrics);
            } 
    
            else {
                console.log(response.statusCode + " " + response.statusMessage);
                reject();
            }
    
        });

    });
}

/***********************************************************************************/

//testID = 1063;
//remove();

console.log("********************");
console.log("*       TEST       *");
console.log("********************");

/*-------------------------------------------*/  // TEST1

testID = 1;
testLyrics = "This is a test lyrics";

console.log("\nTEST 1:\n");

insert().then( () => {   

    return remove();

}).then( () => {

    console.log("\nSUCCESS\n");

}).catch( () => {

    console.log("\nFAILURE\n");

}).then( () => {

/*-------------------------------------------*/   // TEST2
console.log("--------------------------------------------");

    testTrack = "Bohemian Rhapsody";
    testArtist = "Queen";

    console.log("\nTEST 2:\n");

    return find();
}).then( (response) => {

    testID = response.id;
    console.log("Found track with ID: " + testID);

    return findLyrics();

}).then( (lyrics) => {

    testLyrics = lyrics;
    
    return insert();

}).then( () => {

    return getLyrics();

}).then( (lyrics) => {

    console.log("Database responded with these lyrics: \n");
    console.log(lyrics);

    console.log("\nSUCCESS\n");

}).catch( () => {

    console.log("\nFAILURE\n");
});

/*-------------------------------------------*/ 

