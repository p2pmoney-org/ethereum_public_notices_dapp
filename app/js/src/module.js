'use strict';


var Module = class {
	
	constructor() {
		this.name = 'mvc';
		
		this.global = null; // put by global on registration
		this.isready = false;
		this.isloading = false;
	}
	
	init() {
		console.log('module init called for ' + this.name);

		var global = this.global;
		
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
		var mvc = global.getModuleObject('mvc');
		
		var modulescriptloader = global.getScriptLoader('mvcmoduleloader', parentscriptloader);

		modulescriptloader.push_script('./js/src/control/controllers.js');
		modulescriptloader.push_script('./js/src/view/views.js');
		modulescriptloader.push_script('./js/src/model/models.js');

		modulescriptloader.load_scripts(function() { 
									self.init(); 
									mvc.Models.loadModules(parentscriptloader, function() {
										// spawning potential asynchronous operations
										global.finalizeGlobalScopeInit(function(res) {
											console.log("mvc module finished initialization of GlobalScope");
											if (callback) callback(null, self);
										});
										
									}); 
								});
		
		return modulescriptloader;
	}
	
	isReady() {
		return this.isready;
	}

	hasLoadStarted() {
		return this.isloading;
	}

	// optional  module functions
	
	// objects
	getControllersObject() {
		if (this.controllers)
			return this.controllers;
		
		var global = this.global;
		this.controllers = new this.Controllers(global);
		
		return this.controllers;
	}
	
	getViewsObject() {
		if (this.views)
			return this.views;
		
		var global = GlobalClass.getGlobalObject();

		var global = this.global;
		this.views = new this.Views(global);
		
		return this.views;
	}

}

GlobalClass.getGlobalObject().registerModuleObject(new Module());


//dependencies
//GlobalClass.getGlobalObject().registerModuleDepency('mvc', 'noticebook');