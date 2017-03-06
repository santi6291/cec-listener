require('dotenv').config();

const wsCtrl = require('./lib/ws-controller');
const cecCtrl = require('./lib/cec-controller');

// Connection trigger cec command
wsCtrl.on('onConnectionAccept', ()=>wsCtrl.broadcast('status', cecCtrl.status));
wsCtrl.on('onConnectionMessage', (message)=>cecCtrl.handleAction(message));

// CEC event brodcast to connections
cecCtrl.on('statusUpdate', ()=>wsCtrl.broadcast('status',cecCtrl.status));
cecCtrl.on('routeChange', (fromSource, toSource)=>wsCtrl.broadcast('routeChange', {fromSource, toSource}));

 
// @TODO maybe bind these event and execute whenever they happend
/*const OpcodeKeys = Object.keys(cecCtrl.cectypes.Opcode)
const opCodeExclusion = ['GIVE_PHYSICAL_ADDRESS'];
for (let i=0; i < OpcodeKeys.length; i++) {
	if (opCodeExclusion.indexOf(OpcodeKeys[i]) != -1) {
		continue;
	}

	cecCtrl.cec.on( OpcodeKeys[i], function () {
		cecCtrl.log(OpcodeKeys[i], arguments);
	})
}*/