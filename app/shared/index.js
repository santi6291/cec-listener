const EventEmitter = require('events');

class Helper extends EventEmitter{
	constructor(appName){
		super()
		this._appName = appName;
		this._projectRoot = this.setProjectRoot();
	}

	log(...msg) {
		msg.unshift(`[${new Date()}] ${this._appName} - `)
		return console.log.apply(null, msg);
	}

	setProjectRoot(){
		const path = require('path');
		return path.join(__dirname, '../../');
	}
	
	getProjectRoot(path){
		return this._projectRoot+path;
	}
}
module.exports = Helper;