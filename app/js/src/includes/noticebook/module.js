'use strict';

var Module = class {
	
	constructor() {
		this.name = 'noticebook';
		
		this.global = null; // put by global on registration
		this.isready = false;
		this.isloading = false;
		
		this.controllers = null;
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

		// noticebook
		var modulescriptloader = global.getScriptLoader('noticebookloader', parentscriptloader);
		
		modulescriptloader.push_script('./js/src/includes/noticebook/control/controllers.js');

		modulescriptloader.push_script('./js/src/includes/noticebook/model/publicnotice.js');
		modulescriptloader.push_script('./js/src/includes/noticebook/model/publicnoticebook.js');
		modulescriptloader.push_script('./js/src/includes/noticebook/model/interface/publicnoticebook-contractinterface.js');
		modulescriptloader.push_script('./js/src/includes/noticebook/model/interface/publicnoticebook-localpersistor.js');
		
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
	registerHooks() {
		console.log('noticebook module registerHooks called');
		
		var global = this.global;
		
		global.registerHook('postFinalizeGlobalScopeInit_hook', 'noticebook', this.postFinalizeGlobalScopeInit_hook);
	}
	
	//
	// hooks
	//
	postFinalizeGlobalScopeInit_hook(result, params) {
		console.log('noticebook postFinalizeGlobalScopeInit_hook called');
		
		var global = this.global;

		var commonmodule = this.global.getModuleObject('common');
		
		var contracts = commonmodule.getContractsObject();
		
		// register PublicNoticeBook in the contracts global object
		contracts.registerContractClass('PublicNoticeBook', this.PublicNoticeBook);
		
		// force refresh of list
		commonmodule.getContractsObject(true);

		result.push({module: 'noticebook', handled: true});
		
		return true;
	}


	//
	// control
	//
	
	getControllersObject() {
		if (this.controllers)
			return this.controllers;
		
		this.controllers = new this.Controllers(this);
		
		return this.controllers;
	}

	//
	// model
	//
	createBlankPublicNoticeObject(session, publicnoticebook) {
		var publicnotice = new this.PublicNotice(session, publicnoticebook);
		
		return publicnotice;
	}
	
	getPublicNoticesFromJsonArray(session, jsonarray) {
		return this.PublicNotice.getPublicNoticesFromJsonArray(this, session, jsonarray)
	}
	
	
}

GlobalClass.getGlobalObject().registerModuleObject(new Module());

// dependencies
GlobalClass.getGlobalObject().registerModuleDepency('noticebook', 'common');