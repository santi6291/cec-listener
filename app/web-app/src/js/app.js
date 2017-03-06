const domCtrl = require('./modules/dom-controller');
const wsConnection = require('./modules/ws-connection');

domCtrl.onClick('hdmi', (e)=>{
	console.log(e.target)
})

domCtrl.onClick('power-button', (e)=>{
	wsConnection.cecAction('togglePower');	
})

wsConnection.onMessage('status', (status)=>{
	domCtrl.updateStatus(status);
});

wsConnection.onMessage('routeChange', (data)=>{
	console.log(data)
});