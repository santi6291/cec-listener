require('dotenv').config();

const wsCtrl = require('./lib/ws-controller');
const cecCtrl = require('./lib/cec-controller');

// Handle client request for cec command
wsCtrl.on('onConnectionMessage', (message)=>wsCtrl.server.broadcastUTF(message.utf8Data));

// broadcast route change
cecCtrl.on('routeChange', (fromSource, toSource)=>{
	let msg = JSON.stringify({fromSource, toSource});
	wsCtrl.server.broadcastUTF(msg)
});

// broadcast power status
cecCtrl.on('powerStatus', (status)=>wsCtrl.server.broadcastUTF(status));


/* 
@TODO maybe bind these event and execute whenever they happend
const OpcodeKeys = Object.keys(cecCtrl.cectypes.Opcode)
for (let i=0; i < OpcodeKeys.length; i++) {
	cecCtrl.cec.on( OpcodeKeys[i], function () {
		this.connection.sendUTF(OpcodeKeys[i]);
	})
}*/