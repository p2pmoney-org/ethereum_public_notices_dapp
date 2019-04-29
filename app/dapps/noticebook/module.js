'use strict';

var Module = class {
	
	constructor() {
		this.name = 'noticebook-dapp';
		
		this.global = null; // put by global on registration
		this.isready = false;
		this.isloading = false;
		
		this.controllers = null; // one object, even if plural used
		
		this.plugins = {}; // map
		
		this.registerModel();
	}
	
	init() {
		console.log('module init called for ' + this.name);
		
		var global = this.global;
		var dappsmodule = global.getModuleObject('dapps');
		
		// create controllers
		var noticebookcontrollers = new this.NoticeBookAngularControllers(global);
		dappsmodule.pushAngularController(noticebookcontrollers);
		
		this.isready = true;
	}
	
	// compulsory  module functions
	loadModule(parentscriptloader, callback) {
		console.log('loadModule called for module ' + this.name);

		if (this.isready) {
			if (callback)
				callback(null, this);
			
			return;
		}

		if (this.isloading) {
			var error = 'calling loadModule while still loading for module ' + this.name;
			console.log('error: ' + error);
			
			if (callback)
				callback(error, null);
			
			return;
		}
			
		this.isloading = true;

		var self = this;
		var global = this.global;

		// noticebook ui
		var modulescriptloader = global.getScriptLoader('noticebookdapploader', parentscriptloader);
		
		var moduleroot = './dapps/noticebook';

		modulescriptloader.push_script( moduleroot + '/angular-ui/js/src/control/controllers.js');
		modulescriptloader.push_script( moduleroot + '/angular-ui/js/src/view/views.js');
		
		// plug-ins
		modulescriptloader.push_script( './dapps-plugins/noticebook/module.js', function() {
			// load module if initialization has finished
			if (global.isReady())
			global.loadModule('noticebook-dapp-plugins', modulescriptloader);
		 });

		
		modulescriptloader.load_scripts(function() { self.init(); if (callback) callback(null, self); });
		
		return modulescriptloader;
	}
	
	isReady() {
		return this.isready;
	}

	hasLoadStarted() {
		return this.isloading;
	}
	
	registerModel() {
		var global = (this.global ? this.global : GlobalClass.getGlobalObject());
		
		if (global.isGlobalScopeInitializing())
			throw 'registerModel is called too late, after global scope intialization started.'
		
		console.log('registerModel called for ' + this.name);

		var dappsmodelsloader = global.findScriptLoader('dappsmodelsloader');

		var moduleroot = './dapps/noticebook';
		
		//noticebook
		dappsmodelsloader.push_script( moduleroot + '/includes/module.js', function() {
			// load module if initialization has finished
			if (global.isReady())
			global.loadModule('noticebook', dappsmodelsloader);
		 });
		
	}
	
	// functions
	registerPlugin(plugin) {
		if ((!plugin) || (!plugin.type))
			return;
		
		// compulsory functions
		if (!plugin.getCreateListTypeLabel)
			throw 'getCreateListTypeLabel function missing for plugin ' + plugin.type;
		
		if (!plugin.getViewPath)
			throw 'getViewPath function missing for plugin ' + plugin.type;
		
		if (!plugin.prepareNoticeView)
			throw 'prepareNoticeView function missing for plugin ' + plugin.type;
		
		var global = this.global;
		
		plugin.global = global;
		
		this.plugins[plugin.type] = plugin;
	}
	
	getPlugin(type) {
		if (type)
		return this.plugins[type]
	}
	
	getPlugins() {
		var array = [];
		
		for (var key in this.plugins) {
		    if (!this.plugins[key]) continue;
		    
		    array.push(this.plugins[key]);
		}
		
		return array;
		
	}
}

GlobalClass.getGlobalObject().registerModuleObject(new Module());

// dependencies
GlobalClass.getGlobalObject().registerModuleDepency('noticebook-dapp', 'dapps');
