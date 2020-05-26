// We use web sockets to receive asyncronous search requests from the search bar

const WebSocketServer = require('ws').Server;

const global = require('./global');
const genius = require('./genius');

const wss = new WebSocketServer({ port: global.getWSPort() });

wss.on('connection', function(socket) {

    // When data is received
    socket.on('message', (data) => {

        var res;
        genius.geniusSearch(data, function(res) {
            socket.send(JSON.stringify(res));
        });
            
    });

});


