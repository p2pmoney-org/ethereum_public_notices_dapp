'use strict';

var DAPPViews = class {
	
	constructor(global) {
		this.global = global;
		
		this.name = 'noticebook';
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

if ( typeof window !== 'undefined' && window )
GlobalClass.registerModuleClass('dapps', 'NoticeBookAngularViews', DAPPViews);
else
module.exports = DAPPViews; // we are in node js