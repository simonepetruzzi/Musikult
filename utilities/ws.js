const WebSocketServer = require('ws').Server;

const global = require('./global');
const genius = require('./genius');

const wss = new WebSocketServer({ port: global.getWSPort() });

wss.on('connection', function(socket) {

    //when client is connected
    console.log('[WEBSOCKET] Connection established');

    // When data is received
    socket.on('message', (data) => {
        console.log('[WEBSOCKET] Received: ' + data);

        var res;
        genius.geniusSearch(data, function(res) {
            socket.send(JSON.stringify(res));
        });
            
    });

    // The connection was closed
    socket.on('close', () => {
        console.log('[WEBSOCKET] Connection closed');
    });

});


