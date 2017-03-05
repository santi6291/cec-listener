const Helper = require('../../shared');

class CECcontroller extends Helper {
	// -------------------------------------------------------------------------- //
	// Example: basic.js
	// For more cec-events: http://www.cec-o-matic.com/
	// -------------------------------------------------------------------------- //
	constructor(){
		super('cec')
		const nodecec = require( 'node-cec' );
		const NodeCec = nodecec.NodeCec;
		
		this.cectypes = nodecec.CEC;
		this.cec = new NodeCec( 'node-cec-monitor' );
		this.client;
	
		// -------------------------------------------------------------------------- //
		//- CEC EVENT HANDLING
		this.cec.once( 'ready', (client)=>this.onReady(client));
		this.powerStatus();
		this.routeChange();
		
		// -------------------------------------------------------------------------- //
		// -m  = start in monitor-mode
		// -d8 = set log level to 8 (=TRAFFIC) (-d 8)
		// -br = logical address set to `recording device`
		this.cec.start('cec-client', '-m', '-d', '8', '-b', 'r')
	}
	
	// -------------------------------------------------------------------------- //
	//- KILL CEC-CLIENT PROCESS ON EXIT
	killOnExit(){
		process.on('SIGINT', () =>this.killCec());
	}

	killCec(){
		if ( this.cec != null ) {
		  this.cec.stop();
		}
		process.exit();
	}

	onReady(client){
		this.log( ' -- READY -- ' );
		this.client = client;
		this.client.sendCommand( 0xf0, this.cectypes.Opcode.GIVE_DEVICE_POWER_STATUS );
	}

	powerStatus(){
		cec.on( 'REPORT_POWER_STATUS', (packet, status) => this.powerStatusCallback(packet, status));
	}

	powerStatusCallback(){
		var keys = Object.keys( CEC.PowerStatus );

		for (var i = keys.length - 1; i >= 0; i--) {
			if (CEC.PowerStatus[keys[i]] == status) {
				this.emit('powerStatus', keys[i])
				break;
			}
		}
	}
	
	routeChange(){
		cec.on( 'ROUTING_CHANGE', (packet, fromSource, toSource)=>this.emit('routeChange', fromSource, toSource) );
	}
}
module.exports = new CECcontroller();