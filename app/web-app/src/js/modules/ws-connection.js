class wsConnection{
	constructor(){
		this.clientURL = 'ws://cec.casadev.net';
		this.clientProtocol = 'cec-protocol';
	
		this.client = new WebSocket(this.clientURL, this.clientProtocol);
		this.callbacks = {};
		this.client.addEventListener('message', (e)=>this.receiveMessage(e));
	}
	
	parseData(data){
		try{
			return JSON.parse(data)
		}catch(e){
			return undefined;
		}
	}

	onMessage(type, cb){
		this.callbacks[type] = cb;
	}

	receiveMessage(event){
		let msg = this.parseData(event.data)
		this.callbacks[msg.type](msg.data)
	}

	createMessage(action, data){
		return JSON.stringify({action, data});
	}

	cecAction(action, data){
		let msg = this.createMessage(action, data)
		this.client.send(msg)
	}
}

module.exports = new wsConnection()