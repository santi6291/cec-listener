class DOMcontroller{
	constructor(){
		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		this.eventType = isMobile ? 'touchend' : 'click';
		this.buttons = document.querySelectorAll('button[data-js-hook]');
	}

	hook(hookName, single=false){
		return document.querySelectorAll(`[data-js-hook~="${hookName}"]`)
	}

	onClick(hook, cb){
		return this.hook(hook).forEach(
			(el, index) => el.addEventListener(this.eventType, cb)
		);
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

	}
}
module.exports = new DOMcontroller()