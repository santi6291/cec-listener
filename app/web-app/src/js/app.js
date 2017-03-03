class buttonActions{
	constructor(){
		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		this.eventType = isMobile ? 'touchend' : 'click';
		this.clientURL = 'ws://localhost:8000';
		this.clientProtocol = 'cec-protocol';
		
		this.buttons = document.querySelectorAll('button');
		this.client = new WebSocket(this.clientURL, this.clientProtocol);

		this.client.onmessage = this.onMessage;
		this.client.onopen = this.onOpen;
		this.bindButtons();
	}

	onMessage(event){
		console.log('onMessage', event)
	}

	onOpen(event){
		console.log('onOpen', event)
	}

	bindButtons(){
		// console.log(this.buttons)
		this.buttons.forEach((el, index)=>this.buttonLoop(el, index));
	}

	buttonLoop(el, index){
		el.addEventListener(this.eventType, (e)=>this.buttonClick(e));
	}

	buttonClick(e){
		this.cecAction(e.target.dataset.cecAction);
	}

	createMessage(action, type){
		return JSON.stringify({action, type});
	}

	cecAction(action){
		let msg = this.createMessage(action, 'action')
		this.client.send(action)
	}
}
new buttonActions()