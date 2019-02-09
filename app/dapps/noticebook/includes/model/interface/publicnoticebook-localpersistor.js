'use strict';

var PublicNoticeBookLocalPersistor = class {
	
	constructor(session, contractuuid) {
		this.session = session;
		this.contractuuid = contractuuid;
		
		this.commonmodule = this.session.getGlobalObject().getModuleObject('common');
	}
	
	savePublicNoticeBookJson(noticebook, callback) {
		var session = this.session;
		var keys = ['contracts'];
		
		var uuid = noticebook.getUUID();
		var json = noticebook.getLocalJson();
		
		var commonmodule = this.commonmodule;
		
		var jsonleaf = commonmodule.getLocalJsonLeaf(session, keys, uuid);
		
		if (jsonleaf) {
			commonmodule.updateLocalJsonLeaf(session, keys, uuid, json);
		}
		else {
			commonmodule.insertLocalJsonLeaf(session, keys, null, null, json);
		}
		
		// save contracts
		var contractsjson = commonmodule.readLocalJson(session, keys); // from cache, since no refresh
		
		commonmodule.saveLocalJson(session, keys, contractsjson, callback);
	}
	
	savePublicNoticeJson(notice, callback) {
		var session = this.session;
		var keys = ['contracts'];
		
		var uuid = notice.getUUID();
		var json = notice.getLocalJson();
		
		var commonmodule = this.commonmodule;
		
		var jsonleaf = commonmodule.getLocalJsonLeaf(session, keys, uuid)
		
		if (jsonleaf) {
			commonmodule.updateLocalJsonLeaf(session, keys, uuid, json);
		}
		else {
			var parentuuid = notice.getPublicNoticeBookObject().getUUID();
			commonmodule.insertLocalJsonLeaf(session, keys, parentuuid, 'notices', json);
		}
		
		// save contracts
		var contractsjson = commonmodule.readLocalJson(session, keys); // from cache, since no refresh
		
		commonmodule.saveLocalJson(session, keys, contractsjson, callback);
	}
	
}

if ( typeof GlobalClass !== 'undefined' && GlobalClass )
	GlobalClass.registerModuleClass('noticebook', 'PublicNoticeBookLocalPersistor', PublicNoticeBookLocalPersistor);
else
	module.exports = StockLedgerLocalPersistor; // we are in node js
