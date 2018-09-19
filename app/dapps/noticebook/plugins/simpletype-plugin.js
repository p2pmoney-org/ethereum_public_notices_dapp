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
		return "./dapps/noticebook/plugins/angular-ui/partials/notice-simple-create-form.html";
	}
	
	prepareNoticeCreateForm($scope, $state, $stateParams) {
		$scope.noticetype = 'simple';
		$scope.noticecontent = {text: 'SIMPLE'};
	}
	
	handleNoticeCreateForm(notice, $scope) {
		var content = $scope.noticecontent.text;
		
		var jsoncontent = {};
	    
		jsoncontent.plaintext = content;

		notice.setLocalJsonContent(jsoncontent);
	}
	
	// modify
	getModifyFormPath() {
		return "./dapps/noticebook/plugins/angular-ui/partials/notice-simple-modify-form.html";
	}
	
	prepareNoticeModifyForm(notice, $scope, $state, $stateParams) {
		if (!notice.isLocalOnly())
			return;
		
		var jsoncontent = notice.getLocalJsonContent();
    	var content = jsoncontent.plaintext;
  	
    	$scope.noticecontent = { text: content};
	}
	
	handleNoticeModifyForm(notice, $scope) {
		var content = $scope.noticecontent.text;
		
		var jsoncontent = {};
		
		jsoncontent.plaintext = content;

		notice.setLocalJsonContent(jsoncontent);
	}
	
	// view
	getViewPath() {
		// compulsory function
		return "./dapps/noticebook/plugins/angular-ui/partials/notice-simple-view.html";
	}
	
	prepareNoticeView(notice, $scope, $state, $stateParams, $sce) {
		// compulsory function
		var jsoncontent = (notice.isLocalOnly() ? notice.getLocalJsonContent() : notice.getChainJsonContent());
    	var content = jsoncontent.plaintext;
    	
    	console.log('jsoncontent.plaintext is ' + jsoncontent.plaintext);
  	
    	$scope.noticecontent = { text: content};
	}
	
}


GlobalClass.getGlobalObject().getModuleObject('noticebook-dapp').registerPlugin(new Plugin());