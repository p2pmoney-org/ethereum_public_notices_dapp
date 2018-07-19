'use strict';


class Views {
	
	constructor(global) {
		this.global = global;
		
		var noticebookmodule = global.getModuleObject('noticebook');
		
		this.PublicNoticeBook = noticebookmodule.PublicNoticeBook;
	}
	
	getLoginWidget() {
		console.log('Views.getLoginWidget called');

		var global = this.global;
		var session = global.getModuleObject('common').getSessionObject();

		console.log('is anonymous: ' + (session.isAnonymous() ? 'true' : 'false'));
		
		var message = global.t("You are about to login on another system");
		var logintext = (session.isAnonymous() ? global.t('Anonymous' ): session.getSessionUserIdentifier());
		console.log('login text is: ' + logintext);

		/*var loginlink = "<a id=\"test\" class=\"btn btn-block btn-social btn-github\">  " +
		"<i class=\"fa fa-github\"></i> " + logintext + " </a>";*/
		
		var loginlink = "<a href='javascript:GlobalClass.getGlobalObject().getModuleObject(\"mvc\").getControllersObject().handleShowLoginBox(\"" 
					+ message 
					+ "\")' >"
					+ '{{useridentifier}}' 
					+ "</a>"

		var content = loginlink;
		console.log('loginlink text is: ' + loginlink);
		
		return content;
	}
	
	getPublicNoticeStatusString(obj) {
		var global = this.global;
		var status = obj.getStatus();
		
		switch(status) {
			case PublicNoticeBook.STATUS_LOST:
				return global.t('lost');
			case PublicNoticeBook.STATUS_LOCAL:
				return global.t('local');
			case PublicNoticeBook.STATUS_PENDING:
				return global.t('pending');
			case PublicNoticeBook.STATUS_ON_CHAIN:
				return global.t('on chain');
			default:
				return global.t('unknown');
		}
		
	}
	
}

GlobalClass.registerModuleClass('mvc', 'Views', Views);
