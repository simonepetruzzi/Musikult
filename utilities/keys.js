/************** KEYS *******************/
//Genius
const GENIUS_CLIENT_ID      = "vDSCxp-uAMIxUs3viYuz9oK7-1l9BjmMZWHdQ6ckSwy6z2gwfXkvXCSzy4ejXRqW";
const GENIUS_CLIENT_SECRET  = "IEVi0recfI0wsCpuSAadiA8z9GEp8xsAS7lUekwo7HeQf2vVSWcuhWzBdo8FbcmMTLQD8qUYEBV1MddFDZviRw";
const GENIUS_ACCESS_TOKEN   = "kG91TrvmqYf06aeYAOpgxFTXcmUAJ0N0wRCtbn7m-tHXsfGVDWULJAGro3dbQWfS";

//Spotify
const SPOTIFY_CLIENT_ID     = 'f57702fc8f5f4deca9cd5517c8f520a8';
const SPOTIFY_CLIENT_SECRET = '9a55bd0d2fac417e86b1a915c132bcad';

//Happi
const HAPPY_KEY 			= '4ac2bb0MtAJfh11gpj6Nq31FmtEgbk6DfVqMsBev5tdFJi3vCdVHEpme';

//LastFM 
const LastFmKey = '36e40c0bdeda4b90b8b007257a8de61d';
/****************************************/

/************** METHODS *******************/
//Genius
exports.getGeniusClientId       = function() { return GENIUS_CLIENT_ID }
exports.getGeniusClientSecret   = function() { return GENIUS_CLIENT_SECRET }
exports.getGeniusAccessToken    = function() { return GENIUS_ACCESS_TOKEN }

//Spotify
exports.getSpotifyClientID      = function() { return SPOTIFY_CLIENT_ID }
exports.getSpotifyClientSecret  = function() { return SPOTIFY_CLIENT_SECRET }

//Happi
exports.getHappiKey				= function() { return HAPPY_KEY }

//LastFM
exports.getLastFmKey            = function() { return LastFmKey }
function LastFmReq(method) {
	return 'http://ws.audioscrobbler.com/2.0/?method='+method+'&api_key='+ LastFmKey +'&format=json';
}
/******************************************/
