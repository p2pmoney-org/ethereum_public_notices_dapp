'use strict';

var Plugin = class {
	
	constructor() {
		this.type = 'simple';
		
		this.global = null; // // put by module 'noticebook-dapp' on registration
	}
	
	// plugin functions
	
	// create
	getCreateListTypeLabel() {
		// compulsory function
		return this.global.t('Create simple public notice');
	}
	
	getCreateFormPath() {
		return "./dapps/noticebook/plugins/angular-ui/partials/notice-create-form.html";
	}
	
	prepareNoticeCreateForm($scope, $state, $stateParams) {
		$scope.noticecontent = {text: 'SIMPLE'};
	}
	
	handleNoticeCreateForm($scope, notice) {
		var content = $scope.noticecontent.text;
		
		var jsoncontent = {};
	    
		jsoncontent.plaintext = content;

		notice.setLocalJsonContent(jsoncontent);
	}
	
	// modify
	getModifyFormPath() {
		return "./dapps/noticebook/plugins/angular-ui/partials/notice-modify-form.html";
	}
	
	prepareNoticeModifyForm($scope, $state, $stateParams, notice) {
		var jsoncontent = notice.getLocalJsonContent();
    	var content = jsoncontent.plaintext;
  	
    	$scope.noticecontent = { text: content};
	}
	
	handleNoticeModifyForm($scope, notice) {
		var content = $scope.noticecontent.text;
		
		var jsoncontent = {};
		
		jsoncontent.plaintext = content;

		notice.setLocalJsonContent(jsoncontent);
	}
	
	// view
	getViewPath() {
		// compulsory function
		return "./dapps/noticebook/plugins/angular-ui/partials/notice-view.html";
	}
	
	prepareNoticeView($scope, $state, $stateParams, notice) {
		// compulsory function
		
	}
	
}


GlobalClass.getGlobalObject().getModuleObject('noticebook-dapp').registerPlugin(new Plugin());