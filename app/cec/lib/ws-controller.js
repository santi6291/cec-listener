const Helper = require('../../shared');
const wsServer = require('websocket').server;
const http = require('http');

class websocketController extends Helper{
	constructor(){	
		super('Web Socket Controller');
		this._config = this.setConfigs();
		this.server = this.initServer();
	}
	
	/**
	 * Set Default Configurations
	 */
	setConfigs(){
		this.log('setConfigs');
		let configs = {};
		
		configs.port = process.env.WS_PORT;
		configs.allowedProtocol = 'cec-protocol';

		configs.ws = {};
		// You should not use autoAcceptConnections for production 
		// applications, as it defeats all standard cross-origin protection 
		// facilities built into the protocol and the browser.  You should 
		// *always* verify the connection's origin and decide whether or not 
		// to accept it. 
		configs.ws.autoAcceptConnections = false
		configs.ws.httpServer = this.makeHttpServer(configs.port)
	
		return configs;
	}

	/**
	 * Make Https server, needed by Websocket
	 * @param  {Number} port Set via .env
	 * @return http Server
	 */
	makeHttpServer(port){
		this.log('makeHttpServer on', port);
		const server = http.createServer(this.handleHttpResponse);
		server.listen(port, ()=>this.log(`listening ws://localhost:${port}`));
		return server
	}

	/**
	 * Handle http connection to port
	 * @param  {Object} request  
	 * @param  {Object} response
	 * @return {Response.end}
	 */
	handleHttpResponse(request, response){
		this.log('handleHttpResponse', `Received ${request.url}`)
		response.writeHead(404);
		return response.end();
	}

	initServer(){
		this.log('initServer');
		this.server =  new wsServer(this._config.ws);
		return this.server.on('request', (request)=>this.wsRequest(request))
	}

	wsRequest(request){
		if (!this.originIsAllowed(request.origin)) {
		  return this.rejectRequest(request);
		}

		let connection = request.accept(this._config.allowedProtocol, request.origin);
		this.log(`${request.origin} accepted.`);
		this.emit('onConnectionAccept')

		// Handle connection message
		connection.on('message', (message) => this.emit('onConnectionMessage', message));
		
		// handle when connection disconnected 
		connection.on('close', (reasonCode, description) => this.onClose(reasonCode, description, connection));
	}

	originIsAllowed(origin){
		this.log('wsRequest');
		// put logic here to detect whether the specified origin is allowed. 
		return true;
	}

	rejectRequest(request){
		this.log(`Connection ${request.origin} rejected.`)
		// Make sure we only accept requests from an allowed origin 
		return request.reject();
	}
	
	onClose(reasonCode, description, connection){
		this.log(`disconnected: ${connection.remoteAddress}`);
	}
}

module.exports = new websocketController();