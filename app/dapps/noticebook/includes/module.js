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
		
		var moduleroot = './dapps/noticebook/includes';

		modulescriptloader.push_script( moduleroot + '/control/controllers.js');

		modulescriptloader.push_script( moduleroot + '/model/publicnotice.js');
		modulescriptloader.push_script( moduleroot + '/model/publicnoticebook.js');
		modulescriptloader.push_script( moduleroot + '/model/interface/publicnoticebook-contractinterface.js');
		modulescriptloader.push_script( moduleroot + '/model/interface/publicnoticebook-localpersistor.js');
		
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
		console.log('module registerHooks called for ' + this.name);
		
		var global = this.global;
		
		global.registerHook('postFinalizeGlobalScopeInit_hook', 'noticebook', this.postFinalizeGlobalScopeInit_hook);
	}
	
	//
	// hooks
	//
	postFinalizeGlobalScopeInit_hook(result, params) {
		console.log('postFinalizeGlobalScopeInit_hook called for ' + this.name);
		
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
	
	// notice book
	getLocalPublicNoticeBooks(session, bForceRefresh) {
		var global = this.global;
		var commonmodule = global.getModuleObject('common');
		var contracts = commonmodule.getContractsObject(bForceRefresh);
		
		var array = [];
		
		var locals = contracts.getLocalOnlyContractObjects();

		for (var i = 0; i < locals.length; i++) {
			var local = locals[i];
			
			if (local.getContractType() == 'PublicNoticeBook')
			array.push(local);
		}

		return array;
	}
	
	getChainPublicNoticeBooks(session, bForceRefresh) {
		var global = this.global;
		var commonmodule = global.getModuleObject('common');
		
		var contracts = commonmodule.getContractsObject(bForceRefresh);
		
		var array = [];
		
		var chains = contracts.getChainContractObjects();

		for (var i = 0; i < chains.length; i++) {
			var chain = chains[i];
			
			if (chain.getContractType() == 'PublicNoticeBook')
			array.push(chain);
		}

		return array;
	}
	
	findChainPublicNoticeBook(noticebookarray, address) {
		if (!address)
			return;
		
		var addr = address.trim().toLowerCase();
		
		for (var i = 0; i < noticebookarray.length; i++) {
			var bookaddress = noticebookarray[i].getAddress().trim().toLowerCase();
			if (bookaddress == addr)
				return noticebookarray[i];
		}
	}
	
	
	// public notice
	createBlankPublicNoticeObject(session, publicnoticebook) {
		var publicnotice = new this.PublicNotice(session, publicnoticebook);
		
		return publicnotice;
	}
	
	getPublicNoticesFromJsonArray(session, publicnoticebook, jsonarray) {
		return this.PublicNotice.getPublicNoticesFromJsonArray(this, session, publicnoticebook, jsonarray)
	}
	
}

GlobalClass.getGlobalObject().registerModuleObject(new Module());

// dependencies
GlobalClass.getGlobalObject().registerModuleDepency('noticebook', 'noticebook-dapp');