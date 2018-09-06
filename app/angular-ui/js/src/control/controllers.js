'use strict';

class Controllers {
	
	constructor(global) {
		this.global = global;
		
		var dappsmodule = global.getModuleObject('dapps');
		this.dappscontrollers = (dappsmodule ? dappsmodule.getAngularControllers() : null);
	}
	
	registerControllers(app) {
		var global = this.global;
		
		var angular_app = app.getAngularApp();
		var controllers = this;
		
		var dappscontrollers = this.dappscontrollers;
		
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

		
		// menu bar
		angular_app.controller("MenuBarCtrl",  ['$scope', function ($scope) {
			controllers.preparMenuBarView($scope);
		}]);

		// partials
		
		// account
		angular_app.controller("AccountViewCtrl",  ['$scope', function ($scope) {
			controllers.prepareAccountView($scope);
		}]);

		
		
		//
		// Controllers for forms
		//
		
		angular_app.controller("LoginFormCtrl", ['$scope', function ($scope) {
			controllers.prepareLoginForm($scope);
		}]);
		
		angular_app.controller("LogoutFormCtrl", ['$scope', function ($scope) {
			controllers.prepareLogoutForm($scope);
		}]);
		
		
		//
		// Handlers for requests (clicks, forms,..)
		//
		
		// pages
		angular_app.controller("PageRequestHandler", ['$rootScope','$scope','$location', function ($rootScope, $scope, $location) {
			controllers.handlePageRequest($rootScope, $scope, $location);
		}]);
		
		
		//
		// Getters for directives
		//
		
		angular_app.directive('loginLink', function () {
			return controllers.getLoginLink();
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
		// Registering controllers for DAPPs
		//
		for (var i = 0; i < (dappscontrollers ? dappscontrollers.length : 0); i++) {
			dappscontrollers[i].registerControllers(app);
		}
		
		
		//
		// registering states
		//
		
		angular_app.config(['$stateProvider', function ($stateProvider) {
			controllers.registerStates($stateProvider);
			
			for (var i = 0; i < (dappscontrollers ? dappscontrollers.length : 0); i++) {
				if (dappscontrollers[i].registerStates)
					dappscontrollers[i].registerStates($stateProvider);
			}
		}]);
		
	}
	
	registerStates($stateProvider) {
		var global = this.global;

		$stateProvider
	    .state('root', { url: '/', views: {'main@': {templateUrl: './angular-ui/templates/home.html', controller: "PageRequestHandler", } },
	          ncyBreadcrumb: { label: global.t('Home page') } })
	    .state('home', { url: '/home', views: {'main@': {templateUrl: './angular-ui/templates/home.html', controller: "PageRequestHandler", } },
	          ncyBreadcrumb: { label: global.t('Home page') } })
	    .state('home.about', {url: '/about', views: {'main@': {templateUrl: './angular-ui/templates/about.html', controller: "PageRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('About') }})
	    .state('home.account', {url: '/account', views: {'main@': {templateUrl: './angular-ui/templates/account.html', controller: "PageRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('Account') }})
	    .state('home.login', {url: '/login', views: {'main@': {templateUrl: './angular-ui/templates/login.html', controller: "PageRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('Login') }})
	    .state('home.logout', {url: '/logout', views: {'main@': {templateUrl: './angular-ui/templates/logout.html', controller: "PageRequestHandler",}},
	        ncyBreadcrumb: { label: global.t('Logout') }})
	    .state('home.example', { url: '/:id', views: { 'main@': {  templateUrl: 'example.html'}},
	        data: { displayName: '{{ id }}' },
	        resolve: {id: function ($stateParams) {return $stateParams.id} }  })
		
	}
	
	
	//
	// Commands
	//
	
	gotoHome() {
		this.gotoStatePage('home');
	}
	
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
		
		$rootScope.session = {};
		$rootScope.session.isanonymous = session.isAnonymous();
		$rootScope.session.sessionuuid = session.getSessionUUID();
		
		$rootScope.useridentifier = (session.isAnonymous() ? global.t('Anonymous' ): session.getSessionUserIdentifier());
		
		var now = new Date(); // get the current time
        $rootScope.globaldate = now.toISOString();
        
        // DAPPs
        var dappscontrollers = this.dappscontrollers;
		for (var i = 0; i < (dappscontrollers ? dappscontrollers.length : 0); i++) {
			if (dappscontrollers[i].handlePageRequest)
			dappscontrollers[i].handlePageRequest($rootScope, $scope, $location);
		}
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
	
	preparMenuBarView($scope) {
		console.log("Controllers.preparMenuBarView called");
		
		var global = this.global;
		
		var menuitems = [];
		
		$scope.menuitems = menuitems;
		
		var result = [];
		
		var params = [];
		
		params.push($scope);
		params.push(menuitems);

		var ret = global.invokeHooks('alterMenuBar_hook', result, params);
		
		if (ret && result && result.length) {
			console.log('menubar overload handled by a module');			
		}
	}

	// partials
	
	prepareHomeView($scope) {
		console.log("Controllers.prepareHomeView called");
		
		var global = this.global;
		var message = global.t("Hello, AngularJS");
		
		$scope.message = message;	
	}
	
	prepareAccountView($scope) {
		console.log("Controllers.prepareHomeView called");
		
		var global = this.global;
		var commonmodule = global.getModuleObject('common');
		
		var session = commonmodule.getSessionObject();
		
		if (!session.isAnonymous()) {
			var user = session.getSessionUserObject();
			
			$scope.username = user.getUserName();
			
			$scope.useremail = user.getUserEmail();
			
			$scope.useruuid = user.getUserUUID();
		}
		
	}
	
	
	//
	// Forms
	//
	
	// login
	prepareLoginForm($scope) {
		console.log("Controllers.prepareLoginForm called");

		var global = this.global;
		var self = this;
		
		var loginform = document.getElementById("loginForm");
		
		angular.element(document).ready(function () {
			var result = [];
			
			var params = [];
			
			params.push($scope);
			params.push(loginform);

			var ret = global.invokeHooks('alterLoginForm_hook', result, params);
			
			if (ret && result && result.length) {
				console.log('loginform overload handled by a module');			
			}
	    });
		
		
		// submit function
		$scope.handleSubmit = function(){
			self.handleLoginSubmit($scope);
		}
	}
	
	handleLoginSubmit($scope) {
		console.log("Controllers.handleLoginSubmit called");
		
		var global = this.global;

		var result = [];
		
		var params = [];
		
		params.push($scope);

		var ret = global.invokeHooks('handleLoginSubmit_hook', result, params);
		
		if (ret && result && result.length) {
			console.log('handleLoginSubmit overloaded by a module');			
		}
		else {
			var privatekey = $scope.privatekey.text;
			
			this._impersonatePrivateKey(privatekey);
		}

		this.gotoHome();

	}
	
	// login
	prepareLogoutForm($scope) {
		console.log("Controllers.prepareLogoutForm called");

		var global = this.global;
		var self = this;
		
		var logoutform = document.getElementById("logoutForm");
		
		angular.element(document).ready(function () {
			var result = [];
			
			var params = [];
			
			params.push($scope);
			params.push(logoutform);

			var ret = global.invokeHooks('alterLogoutForm_hook', result, params);
			
			if (ret && result && result.length) {
				console.log('logoutform overload handled by a module');			
			}
			
		});
		
		// submit function
		$scope.handleSubmit = function(){
			self.handleLogoutSubmit($scope);
		}
	}
	
	handleLogoutSubmit($scope) {
		console.log("Controllers.handleLogoutSubmit called");
		
		var global = this.global;
		
		// warn of logout
		var result = [];
		
		var params = [];
		
		params.push($scope);

		var ret = global.invokeHooks('handleLogoutSubmit_hook', result, params);
		
		// but log out anyway
		this._logout();
		
		this.gotoHome();
	}
	
	_logout() {
		var global = this.global;
		var session = global.getModuleObject('common').getSessionObject();
		
		session.disconnectUser();
		
		app.refreshDisplay();
		
	}

	

	//
	// directives
	//
	
	_impersonatePrivateKey(privatekey) {
		var global = this.global;
		var app = global.getAppObject();
		
		var session = global.getModuleObject('common').getSessionObject();

		if (privatekey != null) {
			
			var sessionaccount = global.getModuleObject('common').createBlankAccountObject();
			
			sessionaccount.setPrivateKey(privatekey);
			
			session.impersonateAccount(sessionaccount);
			
			console.log('is anonymous: ' + (session.isAnonymous() ? 'true' : 'false'));
			

	        app.refreshDisplay();
		}	
		
	}
	
	showLoginBox(message) {
		console.log("Controllers.showLoginBox called with message: " + JSON.stringify(message));

		var global = this.global;
		//var app = global.getAppObject();
		
		//var session = global.getModuleObject('common').getSessionObject();
		
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

			this._impersonatePrivateKey(privatekey);
		}

	}
	
	handleShowLoginBox(message) {
		console.log("Controllers.handleShowLoginBox called with message: " + JSON.stringify(message));
		
		var promptbox = false;
		
		var global = this.global;
		var app = global.getAppObject();
		
		var session = global.getModuleObject('common').getSessionObject();

		var sessionuser = session.getSessionUserObject();
		
		if (sessionuser != null) {
			if (promptbox) {
				if (confirm('Do you want to disconnect your account?')) {
					session.disconnectUser();
					
					app.refreshDisplay();
					
				} else {
				    // Do nothing!
				}			
			}
			else {
				this.gotoStatePage('home.logout');
			}
		}
		else {
			if (promptbox) {
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
			else {
				this.gotoStatePage('home.login');
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


