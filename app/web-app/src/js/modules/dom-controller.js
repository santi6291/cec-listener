class DOMcontroller{
	constructor(){
		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		this.eventType = isMobile ? 'touchend' : 'click';
		this.buttons = document.querySelectorAll('button[data-js-hook]');
	}

	hook(hookName, attName='data-js-hook'){
		return document.querySelectorAll(`[${attName}~="${hookName}"]`)
	}

	onClick(hook, cb){
		let nodeList = this.hook(hook)
		for (let i=0; i < nodeList.length; i++) {
			nodeList[i].addEventListener(this.eventType, cb)
		}
	}
	
	updateStatus(status){
		this.updatePower(status.on)
		this.updateDevices(status.devices)
	}

	updatePower(isOn){
		let power = isOn? 'OFF' : 'ON';
		let classToggle = isOn? 'add' : 'remove';
		
		this.hook('power-status')[0].innerHTML = power;
		this.hook('power-button')[0].classList[classToggle]('alert');
	}
	
	updateDevices(devices){
		devices.forEach((device, index)=>this.updateDevice(device, index))
	}

	updateDevice(device, index){
		let hdmiAddr = device.address.split('.')[0];
		let el = this.hook(hdmiAddr, 'data-hdmi-address')[0];
		if (el) {
			el.innerHTML = device.osd_string
		}
	}

}
module.exports = new DOMcontroller()