class CecClient {
	// -------------------------------------------------------------------------- //
	// Example: basic.js
	// For more cec-events: http://www.cec-o-matic.com/
	// -------------------------------------------------------------------------- //
	constructor(){
		const nodecec = require( 'node-cec' );
		const NodeCec = nodecec.NodeCec;
		
		this.cectypes = nodecec.CEC;
		this.cec = new NodeCec( 'node-cec-monitor' );
		this.client;
		
		// -m  = start in monitor-mode
		// -d8 = set log level to 8 (=TRAFFIC) (-d 8)
		// -br = logical address set to `recording device`
		this.cecStart = ['cec-client', '-m', '-d', '8', '-b', 'r'];

		// -------------------------------------------------------------------------- //
		//- CEC EVENT HANDLING
		cec.once( 'ready', (client)=>this.onReady(client));
		
		// -------------------------------------------------------------------------- //
		//- START CEC CLIENT
		cec.start().apply(this, this.cecStart);
	}
	// -------------------------------------------------------------------------- //
	//- KILL CEC-CLIENT PROCESS ON EXIT
	killOnExit(){
		process.on( 'SIGINT', () =>this.killCec());
	}
	killCec(){
		if ( this.cec != null ) {
		  this.cec.stop();
		}
		process.exit();
	}

	onReady(client){
		console.log( ' -- READY -- ' );
		this.client = client;
		this.client.sendCommand( 0xf0, CEC.Opcode.GIVE_DEVICE_POWER_STATUS );
	}
}
