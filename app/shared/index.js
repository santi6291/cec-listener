
class Helper {
	constructor(appName){
		this._appName = appName;
		this._projectRoot = this.setProjectRoot();
	}

	log(msg) {
		return console.log(`${new Date()} - ${this._appName} - ${msg}`);
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