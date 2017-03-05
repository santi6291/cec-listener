require('dotenv').config();

const wsCtrl = require('./lib/ws-controller');
const cecCtrl = require('./lib/cec-controller');

wsCtrl.on('onConnectionAccept', ()=>{
	wsCtrl.log('onConnectionAccept');
	wsCtrl.server.broadcast(cecCtrl.status)
});

// Handle client request for cec command
wsCtrl.on('onConnectionMessage', (message)=>{
	wsCtrl.log('onConnectionMessage')
	wsCtrl.server.broadcast(message.utf8Data)
});

cecCtrl.on('statusUpdate', ()=>{
	cecCtrl.log('statusUpdate')
	wsCtrl.server.broadcast(cecCtrl.status)
})

// broadcast route change
cecCtrl.on('routeChange', (fromSource, toSource)=>{
	cecCtrl.log('routeChange');
	let msg = JSON.stringify({fromSource, toSource});
	wsCtrl.server.broadcast(msg)
});

 
// @TODO maybe bind these event and execute whenever they happend
/*const OpcodeKeys = Object.keys(cecCtrl.cectypes.Opcode)
const opCodeExclusion = ['GIVE_PHYSICAL_ADDRESS', ];
for (let i=0; i < OpcodeKeys.length; i++) {
	if (opCodeExclusion.indexOf(OpcodeKeys[i]) != -1) {
		continue;
	}

	cecCtrl.cec.on( OpcodeKeys[i], function () {
		cecCtrl.log(OpcodeKeys[i], arguments);
	})
}*/