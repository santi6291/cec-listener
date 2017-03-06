const Helper = require('../../shared');
// cec types
// node-cec/lib/lib/cectypes.js
class CECcontroller extends Helper {
	// -------------------------------------------------------------------------- //
	// Example: basic.js
	// For more cec-events: http://www.cec-o-matic.com/
	// -------------------------------------------------------------------------- //
	constructor(){
		super('cec')
		const nodecec = require('node-cec');
		const NodeCec = nodecec.NodeCec;
		this.scanInterval;
		this.busInfo;
		
		this.cectypes = nodecec.CEC;
		this.cec = new NodeCec('node-cec-monitor');
		this.status = {
			on: false,
			devices: [],
		}
	
		// cec ready event
		this.cec.once('ready', (client)=>this.onReady(client));
		
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
			this.log('killCec');
			this.cec.stop();
		}
		process.exit();
	}

	onReady(client){
		this.log('onReady');
		
		this.cec.sendCommand( 0xf0, this.cectypes.Opcode.GIVE_DEVICE_POWER_STATUS );
		
		this.initBind();

		// scan devices every 30 minutes
		this.scanInterval = setInterval(()=>this.cec.send('scan'), 1.8e+9);
		// adding some delay as on ready is not accurate
		setTimeout(()=>this.cec.send('scan'), 2000);
	}

	initBind(){
		this.log('initBind');
		// stdoud line event
		this.cec.on('line', (lineBuffer)=>this.onLine(lineBuffer));
		this.cec.on('REPORT_POWER_STATUS', (packet, status) => this.onReportPowerStatus(packet, status));
		this.cec.on('ACTIVE_SOURCE', (packet, source) => this.onActiveSource(packet, source));
		this.cec.on('STANDBY', (packet, source) => this.onStandby(packet, source));
		this.cec.on('ROUTING_CHANGE', (packet, fromSource, toSource)=>this.onRoutingChange(fromSource, toSource));
	}

	onLine(lineBuffer){
		let line = lineBuffer.toString();
		// fucntion below scan stdout 
		this.scanDevices(line);
	}

	scanDevices(line){
		this.busInfo = (/CEC bus information/.test(line)) ? 0 : this.busInfo;

		if (typeof this.busInfo != 'undefined') {
			this.storeDeviceLine(line)
		}

		if (/currently active source:/.test(line)) {
			this.log('Stop Device Scan');
			this.busInfo = undefined;
		}
	}

	storeDeviceLine(line){
		let deviceDetails = ['address','active source','vendor','osd string','CEC version','power status','language'];
		
		deviceDetails.forEach((detail, index)=>{
			// append Object to devices array 
			let regex = new RegExp(`^${detail}:\\s(.*)$`);
			let match = line.match(regex);
			let detaiLKey = detail.replace(/ /g, '_');

			if (match) {
				this.status.devices[this.busInfo] = this.status.devices[this.busInfo] || {};
				this.status.devices[this.busInfo][detaiLKey] = match[1].trim();
				this.busInfo = (detaiLKey == 'language') ? this.busInfo+1 : this.busInfo;
				return false;
			}
		})
	}

	onStandby(packet, source){
		this.log('onStandby');
		this.status.on = false;
		this.emit('standby', packet, source);
	}

	onActiveSource(packet, source){
		this.log('onActiveSource');
		this.status.on = true;
		this.emit('activeSource', packet, source);
	}

	onReportPowerStatus(packet, status){
		this.log('onReportPowerStatus');
		this.status.on = !Boolean(status);

		this.emit('reportPowerStatus');
	}
	
	onRoutingChange(fromSource, toSource){
		this.log('onRoutingChange');
		this.emit('routeChange', fromSource, toSource)
	}

	eventHandler(eventName){
		this.log('eventName', eventName);
		this.on('toggle-power', ()=>this.togglePower());
	}

	togglePower(){
		let command = (this.status.on) ? this.cectypes.Opcode.STANDBY : this.cectypes.Opcode.IMAGE_VIEW_ON;
		return this.cec.sendCommand(0xf0, command);
	}
}
module.exports = new CECcontroller();