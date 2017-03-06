const domCtrl = require('./modules/dom-controller');
const wsConnection = require('./modules/ws-connection');

domCtrl.onClick('hdmi', (e)=>{
	wsConnection.cecAction('activeSource', `${e.target.dataset.hdmiAddress}.0.0.0`);
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