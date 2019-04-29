'use strict';

var Module = class {
	
	constructor() {
		this.name = 'noticebook-dapp-plugins';
		
		this.global = null; // put by global on registration
		this.isready = false;
		this.isloading = false;
	}
	
	init() {
		console.log('module init called for ' + this.name);
		
		this.isready = true;
	}
	
	// compulsory  module functions
	loadModule(parentscriptloader, callback) {
		console.log('loadModule called for module ' + this.name);

		if (this.isloading)
			return;
			
		this.isloading = true;

		var self = this;
		var global = this.global;
		

		// load modules corresponding to the noticebook plugins you want to activate
		var modulescriptloader = global.getScriptLoader('noticebookdapppluginsloader', parentscriptloader);
		
		var moduleroot = './dapps/noticebook/plugins';

		modulescriptloader.push_script( moduleroot + '/simpletype-plugin.js');

		
		modulescriptloader.load_scripts(function() { self.init(); if (callback) callback(null, self); });
		
		return modulescriptloader;
	}
	
	isReady() {
		return this.isready;
	}

	hasLoadStarted() {
		return this.isloading;
	}
	
	// optional  module functions
	postRegisterModule() {
		if (!this.isloading) {
			var global = this.global;
			var rootscriptloader = global.getRootScriptLoader();
			
			this.loadModule(rootscriptloader);
		}
	}
	


}

GlobalClass.getGlobalObject().registerModuleObject(new Module());

// dependencies
GlobalClass.getGlobalObject().registerModuleDepency('noticebook-dapp-plugins', 'noticebook-dapp');