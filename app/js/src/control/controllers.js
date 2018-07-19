'use strict';

class Controllers {
	
	constructor(global) {
		this.global = global;
		
		// notice types
		this.noticetype_partials = [];
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
		
		// header
		angular_app.controller("HomeLinkCtrl",  ['$scope', function ($scope) {
			controllers.prepareHomeLink($scope);
		}]);

		angular_app.controller("LoginViewCtrl", ['$rootScope', '$scope', '$sce', '$timeout', '$injector', function ($rootScope, $scope, $sce, $timeout, $injector) {
			$scope.injectorforrefresh = $injector;
			controllers.prepareLoginView($rootScope, $scope, $sce, $timeout);
		}]);
		
		// home
		angular_app.controller("HomeViewCtrl",  ['$scope', function ($scope) {
			controllers.prepareHomeView($scope);
		}]);

		
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
		angular_app.controller("NoticesViewCtrl",  ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
			controllers.prepareNoticesView($scope, $state, $stateParams);
		}]);
		
		// notice view
		angular_app.controller("NoticeViewCtrl",  ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
			controllers.prepareNoticeView($scope, $state, $stateParams);
		}]);
		
		
		// notice view
		angular_app.controller("NoticeOnTheWireListViewCtrl",  ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
			controllers.prepareNoticeOnTheWireListView($scope, $state, $stateParams);
		}]);
		
		
		//
		// TESTS BEGIN
		
		
		// home link
		angular_app.controller("ClockCtrl",  ['$scope','$timeout', function ($scope, $timeout) {
			controllers.prepareClockView($scope, $timeout);
		}]);

		// TESTS END
		//
		
		//
		// Controllers for forms
		//
		
		angular_app.controller("EmailFormCtrl", ['$scope','$location', function ($scope, $location) {
			controllers.prepareEmailForm($scope, $location);
		}]);
		
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
		angular_app.controller("PageRequestHandler", ['$rootScope','$scope','$location', function ($rootScope, $scope, $location) {
			controllers.handlePageRequest($rootScope, $scope, $location);
		}]);
		
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
		
		angular_app.directive('loginLink', function () {
			return controllers.getLoginLink();
		});
		
		angular_app.directive('modifynoticeRef', function () {
			return controllers.getModifyNoticeRef();
		});
		
		angular_app.directive('datetime', function () {
			return controllers.getDateTime();
		});
		
		// 
		// filters
		//
		angular_app.filter('transl', function() {
			return controllers.translate;
		});
		
		
		//
		// registering states
		//
		
		angular_app.config(['$stateProvider', function ($stateProvider) {
		    $stateProvider
		    .state('root', { url: '/', views: {'main@': {templateUrl: './templates/home.html', controller: "PageRequestHandler", } },
		          ncyBreadcrumb: { label: global.t('Home page') } })
		    .state('home', { url: '/home', views: {'main@': {templateUrl: './templates/home.html', controller: "PageRequestHandler", } },
		          ncyBreadcrumb: { label: global.t('Home page') } })
		    .state('home.noticebooks', {url: '/noticebooks', views: {'main@': {templateUrl: './templates/public-noticebooks.html', controller: "PageRequestHandler",}},
		        ncyBreadcrumb: { label: global.t('Notice Books') }})
		    .state('home.noticebooks.create', {url: '/create', views: {'main@': {templateUrl: './templates/noticebook-create.html', controller: "PageRequestHandler",}},
		        ncyBreadcrumb: { label: global.t('Create') }})
		    .state('home.noticebooks.import', {url: '/import', views: {'main@': {templateUrl: './templates/noticebook-import.html', controller: "PageRequestHandler",}},
		        ncyBreadcrumb: { label: global.t('Import') }})
		    .state('home.noticebooks.modify', {url: '/modify/:index', views: {'main@': {templateUrl: './templates/noticebook-modify.html', controller: "PageRequestHandler",}},
		        ncyBreadcrumb: { label: global.t('Modify') }})
		    .state('home.noticebooks.deploy', {url: '/deploy/:index', views: {'main@': {templateUrl: './templates/noticebook-deploy.html', controller: "PageRequestHandler",}},
		        ncyBreadcrumb: { label: global.t('Publish') }})
		    .state('home.noticebooks.delete', {url: '/delete/:index', views: {'main@': {controller: "NoticeBookRemoveRequestHandler",}},
		        ncyBreadcrumb: { label: global.t('Delete') }})
		    .state('home.noticebooks.notices', {url: '/notices/:index', views: {'main@': {templateUrl: './templates/public-notices.html', controller: "PageRequestHandler",}},
		        ncyBreadcrumb: { label: global.t('Notices') }})
		    .state('home.noticebooks.notices.create', {url: '/create', views: {'main@': {templateUrl: './templates/notice-create.html', controller: "PageRequestHandler",}},
		        ncyBreadcrumb: { label: global.t('Create') }})
		    .state('home.noticebooks.notices.modify', {url: '/modify/:number', views: {'main@': {templateUrl: './templates/notice-modify.html', controller: "PageRequestHandler",}},
		        ncyBreadcrumb: { label: global.t('Modify') }})
		    .state('home.noticebooks.notices.deploy', {url: '/deploy/:number', views: {'main@': {templateUrl: './templates/notice-deploy.html', controller: "PageRequestHandler",}},
		        ncyBreadcrumb: { label: global.t('Publish') }})
		    .state('home.noticebooks.notices.delete', {url: '/delete/:number', views: {'main@': {controller: "NoticeRemoveRequestHandler",}},
		        ncyBreadcrumb: { label: global.t('Delete') }})
		    .state('home.about', {url: '/about', views: {'main@': {templateUrl: './templates/about.html', controller: "PageRequestHandler",}},
		        ncyBreadcrumb: { label: global.t('About') }})
		    .state('home.account', {url: '/account', views: {'main@': {templateUrl: './templates/account.html', controller: "PageRequestHandler",}},
		        ncyBreadcrumb: { label: global.t('Account') }})
		    .state('home.detail', { url: '/:id', views: { 'main@': {  templateUrl: 'detail.html'}},
		        data: { displayName: '{{ id }}' },
		        resolve: {id: function ($stateParams) {return $stateParams.id} }  })

		}]);
		
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
	
	
	//
	// Commands
	//
	
	gotoStatePage(pagestate, params) {
		console.log("Controllers.gotoStatePage called for: " + pagestate);

		var global = this.global;
		var app = global.getAppObject();
		var angular_app = app.getAngularApp();
		
		var gonow = function () {
			var $injector = app.getAngularInjector();
			var $state = $injector.get('$state');
			
			if ($state.current.name != pagestate) {
				console.log("current state is " + $state.current.name);
				console.log("jumping to " + pagestate);
				
				$state.go(pagestate, params);
			}
		};
		
		gonow();
	}
	
	translate(string) {
		// 'this' is not defined
		var global = GlobalClass.getGlobalObject();
		
		return global.t(string);
	}
	
	//
	// Requests
	//
	
	handlePageRequest($rootScope, $scope, $location) {
		console.log("Controllers.handlePageRequest called with location: " + JSON.stringify($location));
		  
		$scope.message = "your location is " + $location.hash();
		  
		var global = this.global;
		var session = global.getModuleObject('common').getSessionObject();
		console.log('is anonymous: ' + (session.isAnonymous() ? 'true' : 'false'));
		
		$rootScope.global = global; // to give access to global object from anywhere in the view
		
		$rootScope.useridentifier = (session.isAnonymous() ? global.t('Anonymous' ): session.getSessionUserIdentifier());
		
		var now = new Date(); // get the current time
        $rootScope.globaldate = now.toISOString();
        
		// pause loop
        this.pauseReadBlockLoop();
	}
	
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
		
		this.gotoStatePage('home.noticebooks');
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
	    
		
		this.gotoStatePage('home.noticebooks.notices', {index: contractindex});
	}
	
	//
	// Views
	//
	
	// templates elements
	
	prepareHomeLink($scope) {
		console.log("Controllers.prepareHomeLinkView called");
		
		/*var d = new Date();
		var homeLink = document.getElementById("home-link");

		var href = homeLink.getAttribute("href")
		homeLink.setAttribute("href",href + "?t="+d.getTime());*/
		
	}
	
	prepareLoginView($rootScope, $scope, $sce, $timeout) {
		console.log("Controllers.prepareloginView called with $sce: " + JSON.stringify($sce));
		
		var global = this.global;
		var views = global.getModuleObject('mvc').getViewsObject();
		
		// test login link content
		var content = views.getLoginWidget();

		$scope.content = $sce.trustAsHtml(content);	
		
		// test on timestamp
 		var now = new Date(); // get the current time
        var nowtime = now.getTime();
    	$scope.clock = nowtime;
        $scope.date = now.toISOString();
        $rootScope.globaldate = now.toISOString();
        $rootScope.globaldate2 = now.toISOString();
        
        console.log('$scope.$id is ' + $scope.$id);
        console.log('$scope.date is ' + $scope.date);
        // end test
	}

	// partials
	
	prepareHomeView($scope) {
		console.log("Controllers.prepareHomeView called");
		
		var global = this.global;
		var message = global.t("Hello, AngularJS");
		
		$scope.message = message;	
	}
	
	_getNoticeBookArray($scope, views, contract) {
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
	
	prepareNoticeBooksView($scope) {
		console.log("Controllers.prepareNoticeBooksView called");
		
		var global = this.global;
		var commonmodule = global.getModuleObject('common');
		var contracts = commonmodule.getContractsObject(true);
		
		var mvcmodule = global.getModuleObject('mvc');
		var views = mvcmodule.getViewsObject();
		
		// local contracts
		var localnoticebooks = [];
		
		var localnoticebookarray = contracts.getLocalOnlyContractObjects();
		
		if (localnoticebookarray) {
			for (var i = 0; i < localnoticebookarray.length; i++) {
				var contract = localnoticebookarray[i];
				
				if (contract) {
					var noticebook = this._getNoticeBookArray($scope, views, contract);
					
					localnoticebooks.push(noticebook);
				}
			}
		}
		
		$scope.localnoticebooks = localnoticebooks;
		

		// chain contracts
		var chainnoticebooks = [];
		
		var chainnoticebookarray = contracts.getChainContractObjects();
		
		if (chainnoticebookarray) {
			for (var i = 0; i < chainnoticebookarray.length; i++) {
				var contract = chainnoticebookarray[i];
				
				if (contract) {
					var noticebook = this._getNoticeBookArray($scope, views, contract);
					
					chainnoticebooks.push(noticebook);
				}
			}
		}
		
		$scope.chainnoticebooks = chainnoticebooks;
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

			$scope.chainnoticecount = {
					text: (noticebookcontract.isLocalOnly() ? global.t('not deployed yet') : global.t('loading'))
			};
			
			// number of notices
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
			console.log()
			
			for (var i=0; i < localnoticesarray.length; i++) {
				var localnotice = localnoticesarray[i];
				
				var notice = [];
				
				var statusstring = views.getPublicNoticeStatusString(localnotice);
				
				var number = localnotice.getNoticeIndex();
				var title = localnotice.getLocalTitle();
				var noticetype = localnotice.getLocalNoticeType();
				var orderid = localnotice.getChainPosition();
				var referenceid = localnotice.getLocalReferenceID();
				
				notice.isLocalOnly = true;
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
	
	prepareNoticesView($scope, $state, $stateParams) {
		console.log("Controllers.prepareNoticesView called");
		
	    var contractindex = $stateParams.index;

		var self = this;
	    var global = this.global;
		
	    var noticebookmodule = global.getModuleObject('noticebook');
		
		var mvcmodule = global.getModuleObject('mvc');
		var views = mvcmodule.getViewsObject();
		
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		$scope.noticebookindex = (noticebookcontract ? noticebookcontract.getContractIndex() : null);

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
		
	prepareNoticeView($scope, $state, $stateParams) {
		console.log("Controllers.prepareNoticeView called");
		
	    var contractindex = $stateParams.index;

	    var global = this.global;
		var noticebookmodule = global.getModuleObject('noticebook');
		
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		if (noticebookcontract) {
			$scope.noticebookindex = noticebookcontract.getContractIndex();
			
			var noticearay = [];
			
		    var noticeindex = $stateParams.number;
		    var notice = noticebookcontract.getNoticeFromKey(noticeindex);
		    
		    if (notice) {
		    	$scope.isLocalOnly = notice.isLocalOnly();
		    	
		    	$scope.localnoticedescription = { text: notice.getLocalDescription()};
		    	$scope.localnoticetitle = { text: notice.getLocalTitle()};
		    	
		    	$scope.chainnoticetitle = { text: global.t('local only')};
		    	
		    	if (!notice.isLocalOnly()) {
		    		$scope.chainnoticetitle.text = global.t('loading...');
		    	}
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
	}
	
	// notice import
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
		
	}

	// notice modification
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
	}
	
	// notice modification
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
		
	// notices
	prepareNoticeCreateForm($scope, $state, $stateParams) {
		console.log("Controllers.prepareNoticeCreateForm called");
		
		var self = this;

	    var contractindex = $stateParams.index;

		// call module controller
		var global = this.global;
		var noticebookmodule = global.getModuleObject('noticebook');
		
		var noticebookcontrollers = noticebookmodule.getControllersObject();
		
		var noticebookcontract = noticebookcontrollers.getPublicNoticeBookFromKey(contractindex);
		
		if (noticebookcontract) {
			$scope.noticebookindex = noticebookcontract.getContractIndex();
			
		}
		
		  
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
			var noticetype = 'simple';
			
			var title = $scope.noticetitle.text;
			var description = $scope.noticedescription.text;
			var content = $scope.noticecontent.text;
			
			var jsoncontent = {plaintext: content};
			var jsoncontentstring = JSON.stringify(jsoncontent);
			
			var notice = noticebookmodule.createBlankPublicNoticeObject(session, noticebookcontract);
			
			notice.setLocalNoticeType(noticetype);
			notice.setLocalTitle(title);
			notice.setLocalDescription(description);
			notice.setLocalJsonContent(jsoncontent);
			
			noticebookcontract.addLocalNotice(notice);
			
			// save noticebook
			noticebookcontrollers.savePublicNoticeBookObject(noticebookcontract);
		}
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
				
		    	var jsoncontent = notice.getLocalJsonContent();
		    	var content = jsoncontent.plaintext;
		    	
		    	$scope.noticecontent = { text: content};
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
				var title = $scope.noticetitle.text;
				var description = $scope.noticedescription.text;
				var content = $scope.noticecontent.text;
				
				var jsoncontent = {plaintext: content};
				var jsoncontentstring = JSON.stringify(jsoncontent);
				
				notice.setLocalTitle(title);
				notice.setLocalDescription(description);
				notice.setLocalJsonContent(jsoncontent);
				
				noticebookcontrollers.savePublicNoticeObject(notice);
		    	
		    }
		}
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
		
		if ((noticebookcontract) && (!noticebookcontract.isLocalOnly())) {
			var session = commonmodule.getSessionObject();
			
			var owner = noticebookcontract.getLocalOwner();
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
				try {
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
				catch(e) {
					app.setMessage("Error: " + e);
				}
		    	
		    }
		    else {
		    	alert('could not find notice ' + noticeindex);
		    }
			

			app.refreshDisplay();
		}
	}
	

	//
	// directives
	//
	
	showLoginBox(message) {
		console.log("Controllers.showLoginBox called with message: " + JSON.stringify(message));

		var global = this.global;
		var app = global.getAppObject();
		
		var session = global.getModuleObject('common').getSessionObject();
		
		var result = []; // description of the form entries
		
		var ret = global.invokeHooks('loginForm_hook', result);
		
		if (ret && result && result.length) {
			// build a form
			var message = 'result length = ' + result.length;
			
			for (var i=0; i < result.length; i++) {
				var field = result[i];
				
				message += ' field '+ i + ' has name ' + field['name'] + ' of type ' + field['name'];
				
			}
			
			alert(message);
		}
		else {
			// standard prompt asking for private key
			var privatekey = prompt(global.t("Please enter your private key. It will be kept in memory until a refresh in your browser."), "");

			if (privatekey != null) {
				
				var sessionaccount = global.getModuleObject('common').createBlankAccountObject();
				
				sessionaccount.setPrivateKey(privatekey);
				
				session.impersonateAccount(sessionaccount);
				
				console.log('is anonymous: ' + (session.isAnonymous() ? 'true' : 'false'));
				

		        app.refreshDisplay();
			}	
		}

	}
	
	handleShowLoginBox(message) {
		console.log("Controllers.handleShowLoginBox called with message: " + JSON.stringify(message));
		
		var global = this.global;
		var app = global.getAppObject();
		
		var session = global.getModuleObject('common').getSessionObject();

		var sessionuser = session.getSessionUserObject();
		
		if (sessionuser != null) {
			if (confirm('Do you want to disconnect your account?')) {
				session.disconnectUser();
				
				app.refreshDisplay();
				
			} else {
			    // Do nothing!
			}			
		}
		else {
			var result = [];
			
			var params = [];
			
			params.push(message);
			
			var ret = global.invokeHooks('handleShowLoginBox_hook', result, params);
			
			if (ret && result && result.length) {
				console.log('login box handled by a module');
			}
			else {
				this.showLoginBox(message);
			}
			
		}

	}
	
	getLoginLink(){  
		console.log("Controllers.getLoginLink called");
		/*var global = this.global;
		var message = global.t("You are about to login on another system");
		
		return {
	        restrict: 'E',
	        template: "<a href='javascript:GlobalClass.getGlobalObject().getControllersObject().handleShowLoginBox(\"" + message + "\")' class=\"btn btn-block btn-social btn-github\"><i class=\"fa fa-github\"></i> Sign in with Github </a>"
	    }*/
		
		var global = this.global;
		var views = global.getModuleObject('mvc').getViewsObject();
		

		var loginwidget = views.getLoginWidget();
		
		return {
	        restrict: 'E',
	        /*scope: {},
	        link: function($scope, element, attrs) {
	            if (element[0].tagName !== 'A') {
	                return;  // simply do nothing (or raise an error)
	            }
	            element[0].href = 'javascript:alert("It works in 1.4.1, too!")';
	            console.log('INVOKED');
	            var elm = document.getElementById("loginlink");
	            console.log("element is " + JSON.stringify(elm));
	            elm.href = "javascript:GlobalClass.getGlobalObject().getModuleObject(\"mvc\").getControllersObject().handleShowLoginBox('')";
	        },
	        template: useridentifier*/
	        template: loginwidget
	    }	
	}
	
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
	
	getDateTime(){  
		console.log("Controllers.getDateTime called");
		var d = new Date();
		var time = d.getTime();
		
		console.log('time is now ' + time);
		return {
	        restrict: 'E',
	        template: '<div>' + time + '</div>'
	    }	
	}


	//
	// TESTS BEGIN
	
	prepareClockView($scope, $timeout) {
	    $scope.clock = "loading clock..."; // initialize the time variable
	    $scope.date = "loading date...";
	    $scope.tickInterval = 1000 //ms

	    var tick = function() {
	    	var now = new Date(); // get the current time
	        $scope.clock = now.getTime();
	        $scope.date = now.toISOString();
	        $timeout(tick, $scope.tickInterval); // reset the timer
	    }

	    // Start the timer
	    $timeout(tick, $scope.tickInterval);
	}	

	//
	// Forms
	//
	prepareEmailForm($scope, $route, $routeParams) {
		console.log("Controllers.prepareEmailForm called with route: " + JSON.stringify($route));

		var self = this;
		  
		$scope.email = {
				text: 'test@flexrun.com'
		};
		  
		$scope.handleSubmit = function(){
			self.handleEmailSubmit($scope, $route, $routeParams);
		}
		
	}

	handleEmailSubmit($scope, $route, $routeParams) {
		console.log("Controllers.handleEmailSubmit called with route: " + JSON.stringify($route));
		console.log("and route params: " + JSON.stringify($routeParams));

		alert("Email is " + $scope.email.text);
	}
	
	// TESTS END
	//

}

GlobalClass.registerModuleClass('mvc', 'Controllers', Controllers);


