'use strict';

var DAPPControllers = class {
	
	constructor(global) {
		this.global = global;
		
		this.name = 'noticebook';
		
		// notice types
		this.noticetype_partials = [];
		
		var NoticeBookViews = global.getModuleObject('dapps').NoticeBookAngularViews;
		this.noticebookviews = new NoticeBookViews(global);
	}
	
	getAngularControllers() {
		var mvcmodule = this.global.getModuleObject('mvc');
		
		return mvcmodule.getControllersObject();
	}
	
	registerControllers(app) {
		var global = this.global;
		
		var angular_app = app.getAngularApp();
		var controllers = this;

		//
		// registering controllers
		//
		
		
		//
		// Controllers for views
		//
		
		// templates
		
		// partials
		
		// list of notice books
		angular_app.controller("NoticeBooksViewCtrl",  ['$scope', function ($scope) {
			controllers.prepareNoticeBooksView($scope);
		}]);

		// notice book view
		angular_app.controller("NoticeBookViewCtrl",  ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
			controllers.prepareNoticeBookView($scope, $state, $stateParams);
		}]);
		
		// list of notices
		angular_app.controller("NoticesPluginsCtrl",  ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
			controllers.prepareNoticesPlugins($scope, $state, $stateParams);
		}]);
		
		angular_app.controller("NoticesViewCtrl",  ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
			controllers.prepareNoticesView($scope, $state, $stateParams);
		}]);
		
		// notice view
		angular_app.controller("NoticeViewCtrl",  ['$scope', '$state', '$stateParams', '$sce', function ($scope, $state, $stateParams, $sce) {
			controllers.prepareNoticeView($scope, $state, $stateParams, $sce);
		}]);
		
		
		// notice view
		angular_app.controller("NoticeOnTheWireListViewCtrl",  ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
			controllers.prepareNoticeOnTheWireListView($scope, $state, $stateParams);
		}]);
		
		//
		// Controllers for forms
		//
		
		// notice books
		angular_app.controller("NoticeBookCreateFormCtrl", ['$scope', function ($scope) {
			controllers.prepareNoticeBookCreateForm($scope);
		}]);
		
		
		angular_app.controller("NoticeBookImportFormCtrl", ['$scope', function ($scope) {
			controllers.prepareNoticeBookImportForm($scope);
		}]);
		
		
		angular_app.controller("NoticeBookModifyFormCtrl", ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
			controllers.prepareNoticeBookModifyForm($scope, $state, $stateParams);
		}]);
		
		angular_app.controller("NoticeBookDeployFormCtrl", ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
			controllers.prepareNoticeBookDeployForm($scope, $state, $stateParams);
		}]);
		
		
		// notices
		angular_app.controller("NoticeCreateFormCtrl", ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
			controllers.prepareNoticeCreateForm($scope, $state, $stateParams);
		}]);
		
		angular_app.controller("NoticeModifyFormCtrl", ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
			controllers.prepareNoticeModifyForm($scope, $state, $stateParams);
		}]);
		
		angular_app.controller("NoticeDeployFormCtrl", ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
			controllers.prepareNoticeDeployForm($scope, $state, $stateParams);
		}]);

		//
		// Handlers for requests (clicks, forms,..)
		//
		
		// pages

		// notice books
		angular_app.controller("NoticeBookRemoveRequestHandler", ['$scope','$state', '$stateParams', function ($scope, $state, $stateParams) {
			controllers.handleRemoveNoticeBookRequestFromList($scope, $state, $stateParams);
		}]);
		
		// notices
		angular_app.controller("NoticeRemoveRequestHandler", ['$scope','$state', '$stateParams', function ($scope, $state, $stateParams) {
			controllers.handleRemoveNoticeRequestFromList($scope, $state, $stateParams);
		}]);

		
		//
		// Getters for directives
		//
		
		angular_app.directive('modifynoticeRef', function () {
			return controllers.getModifyNoticeRef();
		});
		
		angular_app.directive('ckeditor', function(){
	        return controllers.getCKEditor();
	    });
		
		//
		// registering notice types
		//
		this.noticetype_partials['simple'] = [];
		this.noticetype_partials['simple']['form'] = [];
		this.noticetype_partials['simple']['form']['create'] = './partials/notice-create-form';
		this.noticetype_partials['simple']['form']['modify'] = './partials/notice-modify-form';
		this.noticetype_partials['simple']['form']['deploy'] = './partials/notice-deploy-form';
		this.noticetype_partials['simple']['view'] = [];
		this.noticetype_partials['simple']['view']['item'] = './partials/notice-view-form';

		this.noticetype_partials['tender'] = [];
		this.noticetype_partials['tender']['form'] = [];
		this.noticetype_partials['tender']['form']['create'] = './partials/tender-create-form';
		this.noticetype_partials['tender']['form']['modify'] = './partials/tender-modify-form';
		this.noticetype_partials['tender']['form']['deploy'] = './partials/tender-deploy-form';
		this.noticetype_partials['tender']['view'] = [];
		this.noticetype_partials['tender']['view']['item'] = './partials/tender-view-form';
	}
	
	getStates() {
		var statearray = [];
		
		var global = this.global;
		var app = this.app;
		
		statearray
	    .push(['home.onthewire', {url: '/onthewire', views: {'main@': {templateUrl: app.getHtmlUrl('./dapps/noticebook/angular-ui/templates/onthewire.html'), controller: "PageRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('Notice Books') }});
		statearray
	    .push(['home.noticebooks', {url: '/noticebooks', views: {'main@': {templateUrl: app.getHtmlUrl('./dapps/noticebook/angular-ui/templates/public-noticebooks.html'), controller: "PageRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('Notice Books') }});
		statearray
	    .push(['home.noticebooks.create', {url: '/create', views: {'main@': {templateUrl: app.getHtmlUrl('./dapps/noticebook/angular-ui/templates/noticebook-create.html'), controller: "PageRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('Create') }});
		statearray
	    .push(['home.noticebooks.import', {url: '/import', views: {'main@': {templateUrl: app.getHtmlUrl('./dapps/noticebook/angular-ui/templates/noticebook-import.html'), controller: "PageRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('Import') }});
		statearray
	    .push(['home.noticebooks.modify', {url: '/modify/:index', views: {'main@': {templateUrl: app.getHtmlUrl('./dapps/noticebook/angular-ui/templates/noticebook-modify.html'), controller: "PageRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('Modify') }});
		statearray
	    .push(['home.noticebooks.deploy', {url: '/deploy/:index', views: {'main@': {templateUrl: app.getHtmlUrl('./dapps/noticebook/angular-ui/templates/noticebook-deploy.html'), controller: "PageRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('Publish') }});
		statearray
	    .push(['home.noticebooks.view', {url: '/view/:index', views: {'main@': {templateUrl: app.getHtmlUrl('./dapps/noticebook/angular-ui/templates/noticebook-view.html'), controller: "PageRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('View') }});
		statearray
	    .push(['home.noticebooks.delete', {url: '/delete/:index', views: {'main@': {controller: "NoticeBookRemoveRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('Delete') }});
		statearray
	    .push(['home.noticebooks.notices', {url: '/notices/:index', views: {'main@': {templateUrl: app.getHtmlUrl('./dapps/noticebook/angular-ui/templates/public-notices.html'), controller: "PageRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('Notices') }});
		statearray
	    .push(['home.noticebooks.notices.create', {url: '/create/:type', views: {'main@': {templateUrl: app.getHtmlUrl('./dapps/noticebook/angular-ui/templates/notice-create.html'), controller: "PageRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('Create') }});
		statearray
	    .push(['home.noticebooks.notices.modify', {url: '/modify/:number', views: {'main@': {templateUrl: app.getHtmlUrl('./dapps/noticebook/angular-ui/templates/notice-modify.html'), controller: "PageRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('Modify') }});
		statearray
	    .push(['home.noticebooks.notices.deploy', {url: '/deploy/:number', views: {'main@': {templateUrl: app.getHtmlUrl('./dapps/noticebook/angular-ui/templates/notice-deploy.html'), controller: "PageRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('Publish') }});
		statearray
	    .push(['home.noticebooks.notices.view', {url: '/view/:number', views: {'main@': {templateUrl: app.getHtmlUrl('./dapps/noticebook/angular-ui/templates/notice-view.html'), controller: "PageRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('View') }});
		statearray
	    .push(['home.noticebooks.notices.delete', {url: '/delete/:number', views: {'main@': {controller: "NoticeRemoveRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('Delete') }});
		
		return statearray;
	}
	
	//
	// Requests
	//
	
	handleRemoveNoticeBookRequestFromList($scope, $state, $stateParams) {
		console.log("Controllers.handleRemoveNoticeBookRequestFromList called");
	    
		var global = this.global;
		var app = global.getAppObject();

		var contractindex = $stateParams.index;

	    var global = this.global;
	    
		var commonmodule = global.getModuleObject('common');
		var session = commonmodule.getSessionObject();
		var contracts = session.getContractsObject();
	    
		var noticebookmodule = global.getModuleObject('noticebook');
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		if (noticebookcontract) {
			if (confirm('Are you sure you want to remove "' + noticebookcontract.getLocalDescription() + '"?')) {
				contracts.removeContractObject(noticebookcontract);

				session.saveContractObjects(contracts);
			}
		}
		else {
			alert(contractindex + 'not found');
		}
		
		this.getAngularControllers().gotoStatePage('home.noticebooks');
	}
		  
	handleRemoveNoticeRequestFromList($scope, $state, $stateParams) {
		console.log("Controllers.handleRemoveNoticeRequestFromList called");
		
		var global = this.global;
		var contractindex = $stateParams.index;

	    var global = this.global;
	    
		var commonmodule = global.getModuleObject('common');
		var contracts = commonmodule.getContractsObject();
	    
		var noticebookmodule = global.getModuleObject('noticebook');
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		if (noticebookcontract) {
			var noticeindex = $stateParams.number;
		    var notice = noticebookcontract.getNoticeFromKey(noticeindex);
		    
		    if (notice) {
		    	if (confirm('Are you sure you want to remove "' + notice.getLocalDescription() + '"?')) {
		    		
		    		noticebookcontract.removeNoticeObject(notice);

		    		noticebookcontrollers.savePublicNoticeBookObject(noticebookcontract);

					app.refreshDisplay();
		    	}
		    }
			
		}
		
		this.getAngularControllers().gotoStatePage('home.noticebooks.notices', {index: contractindex});
	}
	

	handlePageRequest($rootScope, $scope, $location) {
		// pause loop
        this.pauseReadBlockLoop();
		
	}
	
	//
	// Views
	//
	
	// templates elements
	
	_getViewNoticeBookArray($scope, views, contract) {
		var global = this.global;
		
		var noticebook = [];
		
		noticebook.index = contract.getContractIndex();

		noticebook.isLocalOnly = contract.isLocalOnly();
		
		noticebook.statusstring = views.getPublicNoticeStatusString(contract);

		noticebook.description = contract.getLocalDescription();
		noticebook.contracttype = contract.getContractType();
		noticebook.owner = (contract.isLocalOnly() ? contract.getLocalOwner() : global.t('loading'));
		noticebook.address = (contract.isLocalOnly() ? null: contract.getAddress());
		
	    var writeowner = function (contract, noticebook) {
			return contract.getChainOwner(function(err, res) {

				if (res) {
					console.log('chain owner resolved to ' + res);
					noticebook.owner = res;
				}
				
				if (err)  {
					console.log('error in chain owner ' + res);
					noticebook.owner = global.t('not found');
				}
				
				// tell scope a value has changed
				$scope.$apply();
			})
		};

	    var writestatus = function (contract, noticebook) {
	    	var oldstatus = contract.getStatus();
	    	
			return contract.checkStatus(function(err, res) {

				if (err)  {
					console.log('error in chain owner ' + res);
				}
				
				var refresh = false;
		    	var newstatus = contract.getStatus();

		    	if (newstatus != oldstatus) {
		    		noticebook.statusstring = views.getPublicNoticeStatusString(contract);
		    		refresh = true;
		    	}
				
				// tell scope a value has changed
				if (refresh)
				$scope.$apply();
			})
		};
		
		if (contract.isLocalOnly() == false) {
			writeowner(contract, noticebook);
			writestatus(contract, noticebook);
		}
		
		return noticebook;
	}
	
	_getViewNoticeBooksArray($scope, views, modelnoticebookarray) {
		var viewnoticebooks = [];
		
		if (modelnoticebookarray) {
			for (var i = 0; i < modelnoticebookarray.length; i++) {
				var contract = modelnoticebookarray[i];
				
				if (contract) {
					var viewnoticebook = this._getViewNoticeBookArray($scope, views, contract);
					
					viewnoticebooks.push(viewnoticebook);
				}
			}
		}
		
		return viewnoticebooks;
	}
	
	prepareNoticeBooksView($scope) {
		console.log("Controllers.prepareNoticeBooksView called");
		
		var global = this.global;
		var self = this;
		var app = global.getAppObject();

		var commonmodule = global.getModuleObject('common');
		var session = commonmodule.getSessionObject();
		
		//var mvcmodule = global.getModuleObject('mvc');
		var views = this.noticebookviews;
		
		// local contracts
		// (in memory)
		var localnoticebooks = [];
		
		var noticebookmodule = global.getModuleObject('noticebook');
		var localnoticebookarray = noticebookmodule.getLocalPublicNoticeBooks(session, true, function(err, res) {
			
			// list of contracts has been refreshed
			
			// update local and chain lists
			$scope.localnoticebooks = self._getViewNoticeBooksArray($scope, views, noticebookmodule.getLocalPublicNoticeBooks(session, false));
			
			$scope.chainnoticebooks = self._getViewNoticeBooksArray($scope, views, noticebookmodule.getChainPublicNoticeBooks(session, false));
		
			// putting $apply in a deferred call to avoid determining if callback is called
			// from a promise or direct continuation of the code
			setTimeout(function() {
			    $scope.$apply();
			  }, 100);
		});
		
		if (localnoticebookarray) {
			localnoticebooks = this._getViewNoticeBooksArray($scope, views, localnoticebookarray);
		}
		
		$scope.localnoticebooks = localnoticebooks;

		// chain contracts
		// (in memory)
		var chainnoticebooks = [];
		
		//var chainnoticebookarray = contracts.getChainContractObjects();
		var chainnoticebookarray = noticebookmodule.getChainPublicNoticeBooks(session, false);
		
		if (chainnoticebookarray) {
			chainnoticebooks = this._getViewNoticeBooksArray($scope, views, chainnoticebookarray)
		}
		
		$scope.chainnoticebooks = chainnoticebooks;
		
		// refresh list to update both parts
		noticebookmodule.getPublicNoticeBooks(session, true, function(err, res) {
			
			// list of contracts has been refreshed
			
			// update local and chain lists
			$scope.localnoticebooks = self._getViewNoticeBooksArray($scope, views, noticebookmodule.getLocalPublicNoticeBooks(session, false));
			
			$scope.chainnoticebooks = self._getViewNoticeBooksArray($scope, views, noticebookmodule.getChainPublicNoticeBooks(session, false));
		
			// putting $apply in a deferred call to avoid determining if callback is called
			// from a promise or direct continuation of the code
			setTimeout(function() {
			    $scope.$apply();
			  }, 100);
		});

	}
	
	prepareNoticeBookView($scope, $state, $stateParams) {
		console.log("Controllers.prepareNoticeBookView called");
		
	    var contractindex = $stateParams.index;

	    var global = this.global;
		var noticebookmodule = global.getModuleObject('noticebook');
		
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		if (noticebookcontract) {
			$scope.noticebookindex = noticebookcontract.getContractIndex();
			$scope.isLocalOnly = noticebookcontract.isLocalOnly();
			
			$scope.noticebookuuid = {
					text: noticebookcontract.getUUID()
			};	
			
			// local part
			$scope.address = {
					text: noticebookcontract.getAddress()
			};	
			
			$scope.localdescription = {
					text: noticebookcontract.getLocalDescription()
			};	
			
			$scope.localbooktitle = {
					text: noticebookcontract.getLocalBookTitle()
			};	
			
			$scope.localowner = {
					text: noticebookcontract.getLocalOwner()
			};
			
			// chain part
			
			// book title
			$scope.chainbooktitle = {
					text: (noticebookcontract.isLocalOnly() ? global.t('not deployed yet') : global.t('loading'))
			};
			
			var writebooktitle = function (contract) {
				return contract.getChainBookTitle(function(err, res) {
					if (res) $scope.chainbooktitle.text = res;
					
					if (err) $scope.chainbooktitle.text = global.t('not found');
					
					$scope.$apply();
				})
			};

			if (noticebookcontract.isLocalOnly() == false)
				writebooktitle(noticebookcontract);

			// owner
			$scope.chainowneraddress = {
					text: (noticebookcontract.isLocalOnly() ? global.t('not deployed yet') : global.t('loading'))
			};
			
			var writeowneraddress = function (contract) {
				return contract.getChainOwner(function(err, res) {
					if (res) $scope.chainowneraddress.text = res;
					
					if (err) $scope.chainowneraddress.text = global.t('not found');
					
					$scope.$apply();
				})
			};

			if (noticebookcontract.isLocalOnly() == false)
				writeowneraddress(noticebookcontract);
		
			// number of notices
			$scope.chainnoticecount = {
					text: (noticebookcontract.isLocalOnly() ? global.t('not deployed yet') : global.t('loading'))
			};
			
			var writenoticecount = function (contract) {
				return contract.getChainNoticeCount(function(err, res) {
					if (res) $scope.chainnoticecount.text = res;
					
					if (err) $scope.chainnoticecount.text = global.t('not found');
					
					$scope.$apply();
				})
			};

			if (noticebookcontract.isLocalOnly() == false)
				writenoticecount(noticebookcontract);
		}
		
	}	
	
	_getLocalNoticeArray(views, noticebookcontract) {
		var global = this.global;

		var localnotices = [];
		
		
		if (noticebookcontract) {

			var localnoticesarray = noticebookcontract.getLocalNotices();
			console.log('localnoticesarray count is ' + localnoticesarray.length);
			
			for (var i=0; i < localnoticesarray.length; i++) {
				var localnotice = localnoticesarray[i];
				
				var notice = [];
				
				var statusstring = views.getPublicNoticeStatusString(localnotice);
				
				var number = localnotice.getNoticeIndex();
				var noticeuuid = localnotice.getUUID();
				var title = localnotice.getLocalTitle();
				var noticetype = localnotice.getLocalNoticeType();
				var orderid = localnotice.getChainPosition();
				var referenceid = localnotice.getLocalReferenceID();
				
				notice.isLocalOnly = true;
				notice.uuid = noticeuuid;
				notice.statusstring = statusstring;
				notice.number = number;
				notice.title = (title ? title : global.t('no title'));
				notice.noticetype = noticetype;
				notice.orderid = (orderid != -1 ? orderid : global.t('local'));
				notice.referenceid = (referenceid ? referenceid : global.t('local'));

				localnotices.push(notice);
			}
		}
		
		return localnotices;
	}
	
	prepareNoticesPlugins($scope, $state, $stateParams, $sce) {
		console.log("Controllers.prepareNoticesPlugins called");
		
	    var contractindex = $stateParams.index;

	    var global = this.global;
	    
	    // noticebook
	    var noticebookmodule = global.getModuleObject('noticebook');
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		$scope.noticebookindex = (noticebookcontract ? noticebookcontract.getContractIndex() : null);

	    //
	    // plugins
	    //
	    var noticebookdappmodule = global.getModuleObject('noticebook-dapp');
	    
	    var noticebookplugins = noticebookdappmodule.getPlugins();
	    var plugins = [];
	    
	    for (var i = 0; i < noticebookplugins.length; i++) {
	    	var noticebookplugin = noticebookplugins[i];
	    	var plugin = {};
	    	
	    	plugin.type = noticebookplugin.type;
	    	plugin.label = noticebookplugin.getCreateListTypeLabel();
	    	plugin.path = (noticebookplugin.getCreateFormPath ? noticebookplugin.getCreateFormPath() : null);
	    	
	    	if (plugin.path)
	    	plugins.push(plugin);
	    }
	    
	    $scope.plugins = plugins;
	    
	}
		
	prepareNoticesView($scope, $state, $stateParams) {
		console.log("Controllers.prepareNoticesView called");
		
	    var contractindex = $stateParams.index;

		var self = this;
	    var global = this.global;
		
	    
	    // noticebook
	    var noticebookmodule = global.getModuleObject('noticebook');
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		$scope.noticebookindex = (noticebookcontract ? noticebookcontract.getContractIndex() : null);

		//
	    // list
		//var mvcmodule = global.getModuleObject('mvc');
		var views = this.noticebookviews;
		
	    //

		// local
		var localnotices = this._getLocalNoticeArray(views, noticebookcontract);
		
		$scope.localnotices = localnotices;
		
		// chain
		var chainnotices = [];
		
		if (noticebookcontract) {
			var hasPendingNotices = noticebookcontract.hasPendingNotices();
			
			var updatearray = function(contract, viewarray) {
				
				return contract.getChainNoticeList(function(err, res) {
					
					if (res) {
						console.log('list is returned with ' + res.length + ' elements');
						var chainarray = res;
						
						// grow viewarray if chainarray is longer
						while(chainarray.length > viewarray.length) {
							var notice = [];
							
							viewarray.push(notice);
						}
						
						// in reverse order to have most recent on top
						for (var i = chainarray.length - 1; i >=0; i--) {
							var chainnotice = chainarray[i];
							var notice = viewarray[i];
							
							var statusstring = views.getPublicNoticeStatusString(chainnotice);
							
							var number = chainnotice.getNoticeIndex();
							var title = chainnotice.getChainTitle();
							var noticetype = chainnotice.getChainNoticeType();
							var orderid = chainnotice.getChainPosition();
							var referenceid = chainnotice.getChainReferenceID();
							
							notice.isLocalOnly = false;
							notice.statusstring = statusstring;
							notice.number = number;
							notice.title = (title ? title : global.t('no title'));
							notice.noticetype = noticetype;
							notice.orderid = orderid;
							notice.referenceid = referenceid;
						}
						
						if (hasPendingNotices) {
							// we reload local array in case some pending notices are now on the blockchain
							var localnotices = self._getLocalNoticeArray(views, noticebookcontract);
							
							$scope.localnotices = localnotices;
						}
						
						$scope.$apply();
					}
					
					if (err) console.log('error: ' + err);
				});
				
			};
			
			// create right number of lines and fill with loading
			noticebookcontract.getChainNoticeCount(function(err, res) {
				var count = res;
				console.log('writing ' + count + ' lines with loading');
			
				for (var i=0; i < count; i++) {
					var notice = [];
					
					notice.isLocalOnly = false;
					notice.statusstring = global.t('loading...');
					notice.number = global.t('loading...');
					notice.title = global.t('loading...');
					notice.noticetype = global.t('loading...');
					notice.orderid = global.t('loading...');
					notice.referenceid = global.t('loading...');

					chainnotices.push(notice);
				}
			
				$scope.$apply();
			}).then(function(count) {
				// then update content of lines
				updatearray(noticebookcontract, chainnotices);
			});
			
		}
		
		$scope.chainnotices = chainnotices;
	}
		
	prepareNoticeView($scope, $state, $stateParams, $sce) {
		console.log("Controllers.prepareNoticeView called");
		
	    var contractindex = $stateParams.index;

	    var global = this.global;
		var noticebookmodule = global.getModuleObject('noticebook');
		
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		if (noticebookcontract) {
			$scope.noticebookindex = noticebookcontract.getContractIndex();
			
		    var noticeindex = $stateParams.number;
		    var notice = noticebookcontract.getNoticeFromKey(noticeindex);
		    
		    if (notice) {
				$scope.isLocalOnly = notice.isLocalOnly();
		    	
				$scope.noticetype = ( $scope.isLocalOnly ? notice.getLocalNoticeType() : notice.getChainNoticeType());

	    		$scope.noticeuuid = { text: notice.getUUID()};
	    		
	    		if (notice.isLocalOnly()) {
		    		$scope.localnoticetype = { text: notice.getLocalNoticeType()};
		    		$scope.localnoticedescription = { text: notice.getLocalDescription()};
			    	$scope.localnoticetitle = { text: notice.getLocalTitle()};
			    	$scope.localreferenceid = { text: notice.getLocalReferenceID()};
			    	
			    	$scope.chainnoticetype = { text: global.t('local only')};
			    	$scope.chainnoticetitle = { text: global.t('local only')};
			    	$scope.chainreferenceid = { text: global.t('local only')};
		    	}
		    	else {
		    		$scope.localnoticetype = { text: global.t('deployed')};
		    		$scope.localnoticedescription = { text: global.t('deployed')};
			    	$scope.localnoticetitle = { text: global.t('deployed')};
			    	$scope.localreferenceid = { text: global.t('deployed')};
			    	
			    	$scope.chainnoticetype = { text: notice.getChainNoticeType()};
			    	$scope.chainnoticetitle = { text: notice.getChainTitle()};
			    	$scope.chainreferenceid = { text: notice.getChainReferenceID()};
		    	}

			    var noticebookdappmodule = global.getModuleObject('noticebook-dapp');
				var noticeplugin = noticebookdappmodule.getPlugin($scope.noticetype);
				
				noticeplugin = (noticeplugin ? noticeplugin : noticebookdappmodule.getPlugin('simple'));
				
				var plugin = {};
				
		    	plugin.type = noticeplugin.type;
				plugin.path = noticeplugin.getViewPath();

				$scope.plugin = plugin;
				
				// ask plugin to prepare what it needs for its form
				noticeplugin.prepareNoticeView(notice, $scope, $state, $stateParams, $sce);
		    }
		    
		}
	}
	
	activateReadBlockLoop() {
		this.readloopactive = true;
	}
	
	pauseReadBlockLoop() {
		this.readloopactive = false;
	}
	
	_readLastBlockLoop(loopnum, $scope) {
		if (!loopnum)
			loopnum = 0;
		
		var self = this;
		
		var global = this.global;
		
		var chainreadermodule = global.getModuleObject('chainreader');
		var chainreadercontrollers = chainreadermodule.getControllersObject();
		
		loopnum++;
		//console.log("loop number " + loopnum);
		
		if (loopnum > 5) {
			throw 'ERROR: stopping loop';
		}
		
		chainreadercontrollers.getLastBlockData(function (err, res) {
			$scope.transactions = [];

			if (err) {
				$scope.blocknumber = global.t('not found');
				$scope.gasUsed = global.t('not found');
				
			}
			else {
				if (typeof res != 'undefined') {
					var data = res;
					
					var block = data['block'];
					
					$scope.blocknumber = data['blocknumber'];
					$scope.gasUsed = data['gasUsed'] + ' loop ' + loopnum;
					
					if (block) {
						var promise = block.getTransactions(function(err, res) {
							var txarray = res;
							
							if (txarray) {
								for (var i=0; i < txarray.length; i++) {
									var tx = txarray[i];
									var transaction = [];
									
									transaction['hash'] = tx.hash;
									transaction['time'] = tx.time;
									
									if (tx.isContractCreationTx)
										transaction['TxType'] = global.t('contract creation');
									else if (tx.isContractCallTx) 
										transaction['TxType'] = global.t('contract call');
									else
										transaction['TxType'] = global.t('transaction');
									
									if (tx.isContractCallTx) {
										var func = function(tx) {
											chainreadercontrollers.getTransactionContract(tx, function(err, res) {
												if ((tx.contractname) && (tx.contractversion)) {
													transaction['TxType'] += ' - ' + tx.contractname + ' - ' + tx.contractversion;
													$scope.$apply();
												}
											});
										}
										
										func(tx);
									}
										
									
									$scope.transactions.push(transaction);
								}
								
								// tell scope a value has changed
								$scope.$apply();
							}
							
							
						});
					}
				}
				else {
					$scope.blocknumber = global.t('not found');
					$scope.gasUsed = global.t('not found');

				}
			}
			
			// tell scope a value has changed
			$scope.$apply();
			
			// start another look
			if (self.readloopactive)
			setTimeout(function() {self._readLastBlockLoop(loopnum, $scope);},1000);
		});
	}

	
	prepareNoticeOnTheWireListView($scope, $state, $stateParams) {
		console.log("Controllers.prepareNoticeOnTheWireListView called");
		
		var global = this.global;
		
		$scope.blocknumber = global.t('loading');
		$scope.gasUsed = global.t('loading');
		
		$scope.transactions = [];
		
		this.activateReadBlockLoop();
		this._readLastBlockLoop(0, $scope);

	}
		
	//
	// Forms
	//
	
	//
	// notice books
	
	// notice book creation
	prepareNoticeBookCreateForm($scope) {
		console.log("Controllers.prepareNoticeBookCreateForm called");

		var global = this.global;
		var self = this;
		  
		// filling fields
		$scope.description = {
				text: global.t('Enter description')
		};
		  
		// submit function
		$scope.handleSubmit = function(){
			self.handleNoticeBookCreateSubmit($scope);
		}
	}
	
	handleNoticeBookCreateSubmit($scope) {
		console.log("Controllers.handleNoticeBookCreateSubmit called");

		// fill data array
		var data = [];
		
		data['booktitle'] = $scope.booktitle.text;
		data['description'] = $scope.description.text;
		data['owner'] = $scope.owner.text;
		
		// call module controller
		var global = this.global;
		var noticebookmodule = global.getModuleObject('noticebook');
		
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		// create (local) noticebook for these values
		var noticebook = noticebookcontrollers.createPublicNoticeBookObject(data);
		
		// save noticebook
		noticebookcontrollers.savePublicNoticeBookObject(noticebook);
		
		this.getAngularControllers().gotoStatePage('home.noticebooks');
	}
	
	// notice book import
	prepareNoticeBookImportForm($scope) {
		console.log("Controllers.prepareNoticeBookImportForm called");

		var global = this.global;
		var self = this;
		  
		// filling fields
		$scope.description = {
				text: global.t('Enter description')
		};
		  
		// submit function
		$scope.handleSubmit = function(){
			self.handleNoticeBookImportSubmit($scope);
		}
	}
	
	handleNoticeBookImportSubmit($scope) {
		console.log("Controllers.handleNoticeBookImportSubmit called");

		// fill data array
		var data = [];
		
		data['description'] = $scope.description.text;
		data['address'] = $scope.address.text;
		
		// call module controller
		var global = this.global;
		var app = global.getAppObject();
		var noticebookmodule = global.getModuleObject('noticebook');
		
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		// create (local) contract for these values
		var contract = noticebookcontrollers.createPublicNoticeBookObject(data);
		
		if (contract) {
			// save contract
			noticebookcontrollers.savePublicNoticeBookObject(contract);
			
			// start a promise chain, to collect owner, chain ledger description,..
			console.log("starting retrieving chain data");

			var owner;
			var promise = contract.getChainOwner(function(err, res) {
				owner = res;
				
				console.log("chain owner is " + res);
				
				return contract.getChainBookTitle(function(err, res) {
					return res;
				}).then(function(booktitle) {
					console.log("chain book title is " + booktitle);
					console.log("chain owner is now " + owner);
					
					contract.setLocalOwner(owner);
					contract.setLocalBookTitle(booktitle);
					
					// save noticebook
					noticebookcontrollers.savePublicNoticeBookObject(contract);
					
					console.log("deployed contract completely retrieved");

					app.setMessage("deployed contract completely retrieved");
				});
			});
		}
		
		this.getAngularControllers().gotoStatePage('home.noticebooks');
	}

	// notice book modification
	prepareNoticeBookModifyForm($scope, $state, $stateParams) {
		console.log("Controllers.prepareNoticeModifyForm called");
		
		var self = this;

	    var contractindex = $stateParams.index;

		// call module controller
		var global = this.global;
		var noticebookmodule = global.getModuleObject('noticebook');
		
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);

		// filling fields
		var noticebook = [];
		
		$scope.noticebook = noticebook;
		
		if (noticebookcontract) {
			noticebook.index = noticebookcontract.getContractIndex();
			
			$scope.booktitle = {
					text: (noticebookcontract ? noticebookcontract.getLocalBookTitle() : global.t('no title'))
			};
			  
			$scope.description = {
					text: (noticebookcontract ? noticebookcontract.getLocalDescription() : global.t('no description'))
			};
			  
			$scope.owner = {
					text: (noticebookcontract ? noticebookcontract.getLocalOwner() : null)
			};
			
		}

		  
		// submit function
		$scope.handleSubmit = function(){
			self.handleNoticeBookModifySubmit($scope);
		}
	}

	handleNoticeBookModifySubmit($scope) {
		console.log("Controllers.handleNoticeBookModifySubmit called");
	    
		var contractindex = $scope.noticebook.index;

		var data = [];
		
	    data['booktitle'] = $scope.booktitle.text;
		data['description'] = $scope.description.text;
		data['owner'] = $scope.owner.text;
		
		var global = this.global;
		var noticebookmodule = global.getModuleObject('noticebook');
		
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		// get (local) noticebook 
		var noticebook = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		noticebook.setLocalOwner(data['owner']);
		noticebook.setLocalDescription(data['description']);
		noticebook.setLocalBookTitle(data['booktitle']);
		
		// save noticebook
		noticebookcontrollers.savePublicNoticeBookObject(noticebook);
		
		this.getAngularControllers().gotoStatePage('home.noticebooks');
	}
	
	// notice book deployment
	prepareNoticeBookDeployForm($scope, $state, $stateParams) {
		console.log("Controllers.prepareNoticeBookDeployForm called");
		
		var self = this;

	    var contractindex = $stateParams.index;

		// call module controller
		var global = this.global;
		
		var noticebookmodule = global.getModuleObject('noticebook');
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		var divcue = document.getElementsByClassName('div-form-cue')[0];
		
		var commonmodule = global.getModuleObject('common');
		var commoncontrollers = commonmodule.getControllersObject();

		var values = commoncontrollers.getContractDeploymentDefaultValues(noticebookcontract, divcue);

		// filling fields
		var noticebook = [];
		
		$scope.noticebook = noticebook;

		$scope.walletused = {
				text: (values['walletused'] ? values['walletused'] : null)
		};
		
		$scope.password = {
				text: null
		};
		
		$scope.gaslimit = {
				text: (values['gaslimit'] ? values['gaslimit'] : null)
		};
		
		$scope.gasprice = {
				text: (values['gasprice'] ? values['gasprice'] : null)
		};

		if (noticebookcontract) {
			noticebook.index = noticebookcontract.getContractIndex();
			
		}
		
		
		// submit function
		$scope.handleSubmit = function(){
			self.handleNoticeBookDeploySubmit($scope);
		}
	}
	
	handleNoticeBookDeploySubmit($scope) {
		console.log("Controllers.handleNoticeBookDeploySubmit called");
		
		var global = this.global;
		var app = global.getAppObject();

		var wallet = $scope.walletused.text;
		var password = $scope.password.text;
		
		var gaslimit = $scope.gaslimit.text;
		var gasPrice = $scope.gasprice.text;
		
		var contractindex = $scope.noticebook.index;
		
		
		var commonmodule = global.getModuleObject('common');
		var contracts = commonmodule.getContractsObject();
		
		var noticebookmodule = global.getModuleObject('noticebook');
		var noticebookcontrollers = noticebookmodule.getControllersObject();


		var contract = contracts.getContractObjectFromKey(contractindex);
		
		if ((contract) && (contract.isLocalOnly())) {
			var session = commonmodule.getSessionObject();
			
			var owner = contract.getLocalOwner();
			var owningaccount = commonmodule.getAccountObject(owner);

			var payingaccount = commonmodule.getAccountObject(wallet);
			
			// unlock account
			payingaccount.unlock(password, 300); // 300s, but we can relock the account
			
			// check that current session impersonates the contract's owner
			
			if (!session.isSessionAccount(owningaccount)) {
				alert("You must be connected with the account of the contract's owner");
				console.log('owning account is ' + owner + ' session account is ' + session.getSessionUserIdentifier());
				return;
			}
			
			try {
				contract.deploy(payingaccount, owningaccount, gaslimit, gasPrice, function (err, res) {
					
					if (!err) {
						console.log('contract deployed at ' + res);
						
						// save noticebook
						noticebookcontrollers.savePublicNoticeBookObject(contract);
						
						app.setMessage("contract has been deployed at " + res);
					}
					else  {
						console.log('error deploying contract ' + err);
					}
						
				});
				
				app.setMessage("contract deployment created a pending transaction");
				
			}
			catch(e) {
				app.setMessage("Error: " + e);
			}
			

			app.refreshDisplay();
		}
	}
		
	//
	// notices

	prepareNoticeCreateForm($scope, $state, $stateParams) {
		console.log("Controllers.prepareNoticeCreateForm called");
		
		var self = this;

	    var contractindex = $stateParams.index;
	    var noticetype = $stateParams.type;

		// call module controller
		var global = this.global;
		var noticebookmodule = global.getModuleObject('noticebook');
		
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		if (noticebookcontract) {
			$scope.noticebookindex = noticebookcontract.getContractIndex();
			
		}
		
	    var noticebookdappmodule = global.getModuleObject('noticebook-dapp');
		var noticeplugin = noticebookdappmodule.getPlugin(noticetype);
		
		noticeplugin = (noticeplugin && noticeplugin.getCreateFormPath && noticeplugin.prepareNoticeCreateForm ? noticeplugin : noticebookdappmodule.getPlugin('simple'));
		
		var plugin = {};
		
    	plugin.type = noticeplugin.type;
		plugin.path = noticeplugin.getCreateFormPath();
		
		$scope.plugin = plugin;
		
		// ask plugin to prepare what it needs for its form
		noticeplugin.prepareNoticeCreateForm($scope, $state, $stateParams);
		
		  
		// submit function
		$scope.handleSubmit = function(){
			self.handleNoticeCreateForm($scope);
		}
	}

	handleNoticeCreateForm($scope) {
		console.log("Controllers.handleNoticeCreateForm called");
		
		var contractindex = $scope.noticebookindex;
		
		var global = this.global;

		// common module
		var commonmodule = global.getModuleObject('common');
		var session = commonmodule.getSessionObject();
		var contracts = session.getContractsObject();

		// noticebook module
		var noticebookmodule = global.getModuleObject('noticebook');
		
		// noticebook module controller
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		if (noticebookcontract) {
			var type = ($scope.noticetype ? $scope.noticetype : 'simple');
			var title = $scope.noticetitle.text;
			var description = $scope.noticedescription.text;
			var content = $scope.noticecontent.text;
			
			var noticebookdappmodule = global.getModuleObject('noticebook-dapp');
			var noticeplugin = noticebookdappmodule.getPlugin(type);
			
			noticeplugin = (noticeplugin && noticeplugin.handleNoticeCreateForm ? noticeplugin : noticebookdappmodule.getPlugin('simple'));

			
			// create notice and add to the book
			var notice = noticebookmodule.createBlankPublicNoticeObject(session, noticebookcontract);
			
			notice.setLocalNoticeType(type);
			notice.setLocalTitle(title);
			notice.setLocalDescription(description);
			
			// ask plugin to save what it needs in the notice object
			noticeplugin.handleNoticeCreateForm(notice, $scope);
			
			noticebookcontract.addLocalNotice(notice);
			
			// save noticebook
			noticebookcontrollers.savePublicNoticeBookObject(noticebookcontract);
		}
		
		this.getAngularControllers().gotoStatePage('home.noticebooks.notices', {index: contractindex});
	}

	prepareNoticeModifyForm($scope, $state, $stateParams) {
		console.log("Controllers.prepareNoticeModifyForm called");
		
		var self = this;

	    var contractindex = $stateParams.index;

	    var global = this.global;
		var noticebookmodule = global.getModuleObject('noticebook');
		
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		if (noticebookcontract) {
			$scope.noticebookindex = noticebookcontract.getContractIndex();
			
		    var noticeindex = $stateParams.number;
		    var notice = noticebookcontract.getNoticeFromKey(noticeindex);
		    
		    if (notice) {
		    	$scope.noticeindex = notice.getNoticeIndex();
		    	
		    	$scope.isLocalOnly = notice.isLocalOnly();
		    	
		    	$scope.noticedescription = { text: notice.getLocalDescription()};
		    	$scope.noticetitle = { text: notice.getLocalTitle()};
				
				$scope.noticetype = notice.getLocalNoticeType();
			    
			    var noticebookdappmodule = global.getModuleObject('noticebook-dapp');
				var noticeplugin = noticebookdappmodule.getPlugin($scope.noticetype);
				
				noticeplugin = (noticeplugin && noticeplugin.getModifyFormPath && noticeplugin.prepareNoticeModifyForm ? noticeplugin : noticebookdappmodule.getPlugin('simple'));
				
				var plugin = {};
				
		    	plugin.type = noticeplugin.type;
				plugin.path = noticeplugin.getModifyFormPath();

				$scope.plugin = plugin;
				
				// ask plugin to prepare what it needs for its form
				noticeplugin.prepareNoticeModifyForm(notice, $scope, $state, $stateParams);
		    }
		    
		}

		// submit function
		$scope.handleSubmit = function(){
			self.handleNoticeModifyForm($scope);
		}
	}

	handleNoticeModifyForm($scope) {
		console.log("Controllers.handleNoticeModifyForm called");
		
		var contractindex = $scope.noticebookindex;
		
		var global = this.global;

		// common module
		var commonmodule = global.getModuleObject('common');
		var contracts = commonmodule.getContractsObject();

		// noticebook module
		var noticebookmodule = global.getModuleObject('noticebook');
		
		// noticebook module controller
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		if (noticebookcontract) {
			var noticeindex = $scope.noticeindex;
			
		    var notice = noticebookcontract.getNoticeFromKey(noticeindex);
		    
		    if (notice) {
				var type = notice.getLocalNoticeType();
				
				var title = $scope.noticetitle.text;
				var description = $scope.noticedescription.text;
				
				var noticebookdappmodule = global.getModuleObject('noticebook-dapp');
				var noticeplugin = noticebookdappmodule.getPlugin(type);
				
				noticeplugin = (noticeplugin && noticeplugin.handleNoticeModifyForm ? noticeplugin : noticebookdappmodule.getPlugin('simple'));

				notice.setLocalTitle(title);
				notice.setLocalDescription(description);
				
				// ask plugin to save what it needs in the notice object
				noticeplugin.handleNoticeModifyForm(notice, $scope);

				noticebookcontrollers.savePublicNoticeObject(notice);
		    	
		    }
		}
		
		this.getAngularControllers().gotoStatePage('home.noticebooks.notices', {index: contractindex});
	}
	
	prepareNoticeDeployForm($scope, $state, $stateParams) {
		console.log("Controllers.prepareNoticeDeployForm called");
		
		var self = this;

	    var contractindex = $stateParams.index;

		// call module controller
		var global = this.global;
		
		var noticebookmodule = global.getModuleObject('noticebook');
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		var divcue = document.getElementsByClassName('div-form-cue')[0];
		
		var commonmodule = global.getModuleObject('common');
		var commoncontrollers = commonmodule.getControllersObject();

		var values = commoncontrollers.getContractDeploymentDefaultValues(noticebookcontract, divcue);

		// filling fields
		var noticebook = [];
		
		$scope.noticebook = noticebook;

		$scope.walletused = {
				text: (values['walletused'] ? values['walletused'] : null)
		};
		
		$scope.password = {
				text: null
		};
		
		$scope.gaslimit = {
				text: (values['gaslimit'] ? values['gaslimit'] : null)
		};
		
		$scope.gasprice = {
				text: (values['gasprice'] ? values['gasprice'] : null)
		};

		if (noticebookcontract) {
			$scope.noticebookindex = noticebookcontract.getContractIndex();
			
		    var noticeindex = $stateParams.number;
		    var notice = noticebookcontract.getNoticeFromKey(noticeindex);
		    
		    if (notice) {
		    	$scope.noticeindex = notice.getNoticeIndex();
		    	
		    	$scope.isLocalOnly = notice.isLocalOnly();
		    	
		    	$scope.noticedescription = { text: notice.getLocalDescription()};
		    	$scope.noticetitle = { text: notice.getLocalTitle()};
		    }
		}

		// submit function
		$scope.handleSubmit = function(){
			self.handleNoticeDeployForm($scope);
		}
	}

	handleNoticeDeployForm($scope) {
		console.log("Controllers.handleNoticeDeployForm called");
		var global = this.global;
		var app = global.getAppObject();

		var wallet = $scope.walletused.text;
		var password = $scope.password.text;
		
		var gaslimit = $scope.gaslimit.text;
		var gasPrice = $scope.gasprice.text;
		
		var contractindex = $scope.noticebookindex;
		
		
		var commonmodule = global.getModuleObject('common');
		var contracts = commonmodule.getContractsObject();

		var noticebookmodule = global.getModuleObject('noticebook');
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		if (noticebookcontract) {
			if (noticebookcontract.isOnChain()) {
				
				try {
					var session = commonmodule.getSessionObject();
					
					var ret = noticebookcontract.getChainOwner(function (err, res) {
						var owner = res;
						
						if (!owner) {
							alert("Could not read contract's owner address");
							return;
						}
						
						var owningaccount = commonmodule.getAccountObject(owner);

						var payingaccount = commonmodule.getAccountObject(wallet);
						
						// unlock account
						payingaccount.unlock(password, 300); // 300s, but we can relock the account
						
						// check that current session impersonates the contract's owner
						
						if (!session.isSessionAccount(owningaccount)) {
							alert("You must be connected with the account of the contract's owner");
							console.log('owning account is ' + owner + ' session account is ' + session.getSessionUserIdentifier());
							return;
						}
						
						// get notice
						var noticeindex = $scope.noticeindex;
					    var notice = noticebookcontract.getNoticeFromKey(noticeindex);
					    
					    if (notice) {
								noticebookcontract.publishNotice(payingaccount, gaslimit, gasPrice, notice, function (err, res) {
									
									if (!err) {
										console.log('notice deployed');
										
										// save local address
										noticebookcontrollers.savePublicNoticeObject(notice);
										
										app.setMessage("notice has been deployed at " + res);
									}
									else  {
										console.log('error deploying notice ' + err);
									}
										
								});
								
								app.setMessage("notice deployment created a pending transaction");
								
					    	
					    }
					    else {
					    	alert('could not find notice ' + noticeindex);
					    }
						

						app.refreshDisplay();										
					
					});
					
					
				}
				catch(e) {
					app.setMessage("Error: " + e);
				}
			}
			else {
				alert("Book must already be deployed before publishing notices");
				return;
			}
		}
		else {
			alert("Could not find the book with the index " + contractindex);
			return;
		}
		
		this.getAngularControllers().gotoStatePage('home.noticebooks.notices', {index: contractindex});
	}

	//
	// directives
	//

	getModifyNoticeRef(){  
		console.log("Controllers.getModifyNoticeRef called");
		
		return {
	        restrict: 'A',
	        scope: {
	            noticetype: '='
	         },
	        compile: function($scope, $element, $attrs) {
	        	console.log('$element is ' + Object.getOwnPropertyNames($element));
	        	
	        	var children = $element.$$element.children();
	        	if (children) {
		        	for (var i=0; i < children.length; i ++) {
		        		var child = children[i];
		        		if (child.getAttribute('ui-sref')) {
		        			child.setAttribute('ui-sref','home.noticebooks.notices.deploy({index: noticebookindex, number: notice.number})');
				        	//attrs.$set('ui-sref','home.noticebooks.notices.modify({index: noticebookindex, number: notice.number})');
		        		}
		        		
		        	}
	        	}
	        	
	        	return;
	        }
		}
	}
	
	getCKEditor(){  
		console.log("Controllers.getCKEditor called");
		
		var self = this;
		
		return {
			restrict: "A",
			require: '?ngModel',
            link: function ($scope, $elem, $attrs, $ngModel) {
            	var textarea = $elem[0];
            		
            	var ck = CKEDITOR.replace(textarea);
                
                if (!$ngModel) return;
                
                ck.on('instanceReady', function () {
                    ck.setData($ngModel.$viewValue);
                });

                function updateModel() {
                    $scope.$apply(function () {
                    	var html = ck.getData();
                    	
                    	$ngModel.$setViewValue(html);
                    	
                    	$scope.noticeplaintext = html;
                    });
                };
                  
                ck.on('change', updateModel);
                ck.on('key', updateModel);
                ck.on('dataReady', updateModel);
                
                $ngModel.$render = function (value) {
                    ck.setData($ngModel.$viewValue);
                };           
            }
		}
	}

}

if ( typeof window !== 'undefined' && window )
GlobalClass.registerModuleClass('noticebook-dapp', 'NoticeBookAngularControllers', DAPPControllers);
else
module.exports = DAPPControllers; // we are in node js