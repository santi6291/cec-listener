// const cecOpcode = require( 'node-cec' ).CEC.Opcode;
class wsServer {
	constructor(){	
		this.acceptedCon = 'cec-protocol';
		this.connection;
		this.config = {};
		this.config.httpServer;
		// You should not use autoAcceptConnections for production 
		// applications, as it defeats all standard cross-origin protection 
		// facilities built into the protocol and the browser.  You should 
		// *always* verify the connection's origin and decide whether or not 
		// to accept it. 
		this.config.autoAcceptConnections = false;
	}

	log(msg){
		console.log(`${new Date()} - wsServer - ${msg}`);
	}

	// This is the only fucntion related to http server and not websocket
	handleHttpResponse(request, response, port){
		this.log(`${port} - Received request for ${request.url}`)
		response.writeHead(404);
		response.end();
	}

	originIsAllowed(origin){
		// put logic here to detect whether the specified origin is allowed. 
		return true;
	}

	rejectRequest(request){
		// Make sure we only accept requests from an allowed origin 
		request.reject();
		this.log(`Connection ${request.origin} rejected.`)
		return;
	}
	
	onClose(reasonCode, description){
		this.log(`Peer ${this.connection.remoteAddress} disconnected.`)
	}

	onMessage(message){
		if (message.type === 'utf8') {
			this.log(`Received Message: ${message.utf8Data}`)
			this.connection.sendUTF(message.utf8Data);
		}
	}

	handleRequest(request){
		if (!this.originIsAllowed(request.origin)) {
		  return this.rejectRequest(request);
		}

		this.connection = request.accept(this.acceptedCon, request.origin);
		this.log(`${request.origin} accepted.`)
		
		// Handle connection message
		this.connection.on('message', (message) => this.onMessage(message));
		
		// handle when connection disconnected 
		this.connection.on('close', (reasonCode, description) => this.onClose(reasonCode, description));
	}
}

module.exports = new wsServer();