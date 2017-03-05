require('dotenv').config();

const wsCtrl = require('./lib/ws-controller');
const cecCtrl = require('./lib/cec-controller');

const wsServer = require('./lib/ws-server');

// http server, nedded for websocket
const server = http.createServer((request, response)=>wsServer.handleHttpResponse(request, response, process.env.WS_PORT));
server.listen(process.env.WS_PORT, ()=>wsServer.log(`listening ws://localhost:${process.env.WS_PORT}`));

wsServer.config.httpServer = server;
const wsInstance = new WebSocketServer(wsServer.config);

// handle request
wsInstance.on('request', (request)=>wsServer.handleRequest(request))
