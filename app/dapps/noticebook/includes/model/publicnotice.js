'use strict';

var PublicNotice = class {
	
	constructor(session, publicnoticebook) {
		this.session = session;
		this.publicnoticebook = publicnoticebook;
		
		this.uuid = null;

		this.status = PublicNoticeBook.STATUS_LOCAL;
		
		// local part
		this.local_noticetype = null;
		
		this.local_description = null;
		
		this.local_title = null;
		this.local_jsoncontent = null;
		
		this.local_referenceID = null;

		this.local_creation_date = new Date().getTime();
		this.local_submission_date = null;

		
		// blockchain data
		this.position = -1; // position in contract internal struct array

		this.chain_noticetype = null;
		
		this.chain_title = null;
		this.chain_jsoncontent = null;
		
		this.chain_referenceID = null;
		
		
		// operations
		this.noticeindex = null;
	}
	
	getPublicNoticeBookObject() {
		return this.publicnoticebook;
	}
	
	getUUID() {
		if (this.uuid)
			return this.uuid;
		
		this.uuid = this.session.getUUID();
		
		return this.uuid;
	}
	
	isLocalOnly() {
		//return (this.position == -1);
		return ((this.status != PublicNoticeBook.STATUS_ON_CHAIN) && (this.local_orderid == null));
	}
	
	isLocal() {
		return (this.status != PublicNoticeBook.STATUS_ON_CHAIN);
	}
	
	isOnChain() {
		return (this.status == PublicNoticeBook.STATUS_ON_CHAIN);
	}
	
	getStatus() {
		return this.status;
	}
	
	setStatus(status) {
		switch(status) {
			case PublicNoticeBook.STATUS_LOST:
			case PublicNoticeBook.STATUS_NOT_FOUND:
			case PublicNoticeBook.STATUS_LOCAL:
			case PublicNoticeBook.STATUS_SENT:
			case PublicNoticeBook.STATUS_PENDING:
			case PublicNoticeBook.STATUS_DEPLOYED:
			case PublicNoticeBook.STATUS_CANCELLED:
			case PublicNoticeBook.STATUS_REJECTED:
			case PublicNoticeBook.STATUS_ON_CHAIN:
				this.status = status;
				break;
			default:
				// do not change for a unknown status
				break;
		}
	}
	
	initFromLocalJson(json) {
		if (json["uuid"])
			this.uuid = json["uuid"];
		
		var status = (json['status'] ? json['status'] : PublicNoticeBook.STATUS_LOCAL);
		
		var noticetype = jsonarray[i]['noticetype'];
		var title = jsonarray[i]['title'];
		var description = jsonarray[i]['description'];
		var referenceid = jsonarray[i]['referenceid'];
		
		var jsoncontent = jsonarray[i]['jsoncontent'];
		var jsoncontentstring = JSON.stringify(jsoncontent);
		
		this.setStatus(status);
		
		this.setLocalNoticeType(noticetype);
		this.setLocalTitle(title);
		this.setLocalDescription(description);
		this.setLocalReferenceID(referenceid);

		this.setLocalJsonContent(jsoncontent);
		
		if (json["creationdate"])
			this.setLocalCreationDate(json["creationdate"]);
			
		if (json["submissiondate"])
			this.setLocalSubmissionDate(json["submissiondate"]);
	}
	
	getLocalJson() {
		
		var uuid = this.getUUID();
		var status = this.getStatus();
		
		var noticetype = this.local_noticetype;
		
		var title = this.local_title;
		var description = this.local_description;
		
		var jsoncontent = this.local_jsoncontent;
		
		var referenceid = this.local_referenceID;

		var creationdate= this.getLocalCreationDate();
		var submissiondate= this.getLocalSubmissionDate();
		
		
		var json = {uuid: uuid, status: status, 
				creationdate: creationdate, submissiondate: submissiondate, referenceid: referenceid, 
				noticetype: noticetype, title: title, description: description, jsoncontent: jsoncontent};
		
		return json;
	}
	
	saveLocalJson() {
		var persistor = this.getPublicNoticeBookObject().getContractLocalPersistor();
		
		persistor.savePublicNoticeJson(this);
	}
	
	getNoticeIndex() {
		return this.noticeindex;
	}
	
	setNoticeIndex(index) {
		this.noticeindex = index;
	}
	
	// local data
	getLocalNoticeType() {
		return this.local_noticetype;
	}
	
	setLocalNoticeType(noticetype) {
		this.local_noticetype = noticetype;
	}
	
	getLocalTitle() {
		return this.local_title;
	}
	
	setLocalTitle(title) {
		this.local_title = title;
	}
	
	getLocalDescription() {
		return this.local_description;
	}
	
	setLocalDescription(description) {
		this.local_description = description;
	}

	getLocalJsonContent() {
		return this.local_jsoncontent;
	}
	
	setLocalJsonContent(jsoncontent) {
		this.local_jsoncontent = jsoncontent;
	}
	
	getLocalReferenceID() {
		return this.local_referenceID;
	}
	
	setLocalReferenceID(referenceID) {
		this.local_referenceID = referenceID;
	}
	
	getLocalCreationDate() {
		return this.local_creation_date;
	}
	
	setLocalCreationDate(creation_date) {
		this.local_creation_date = creation_date;
	}
	
	getLocalSubmissionDate() {
		return this.local_submission_date;
	}
	
	setLocalSubmissionDate(submission_date) {
		this.local_submission_date = submission_date;
	}
	
	// chain data
	getChainPosition() {
		return this.position;
	}
	
	setChainPosition(pos) {
		this.position = pos;
	}
	
	getChainTitle() {
		return this.chain_title;
	}
	
	setChainTitle(title) {
		this.chain_title = title;
	}
	
	getChainNoticeType() {
		return this.chain_noticetype;
	}
	
	setChainNoticeType(noticetype) {
		this.chain_noticetype = noticetype;
	}
	
	getChainJsonContent() {
		return this.chain_jsoncontent;
	}
	
	setChainJsonContent(jsoncontent) {
		this.chain_jsoncontent = jsoncontent;
	}
	
	getChainReferenceID() {
		return this.chain_referenceID;
	}
	
	setChainReferenceID(referenceID) {
		this.chain_referenceID = referenceID;
	}
	
	// static
	static getPublicNoticesFromJsonArray(module, session, noticebook, jsonarray) {
		var array = [];
		
		if (!jsonarray)
			return array;
		
		for (var i = 0; i < jsonarray.length; i++) {

			var publicnotice = module.createBlankPublicNoticebject(session, noticebook);
			
			publicnotice.initFromLocalJson(jsonarray[i]);
			
			array.push(publicnotice);
		}
		
		return array;
	}
}

if ( typeof GlobalClass !== 'undefined' && GlobalClass )
	GlobalClass.registerModuleClass('noticebook', 'PublicNotice', PublicNotice);
else
	module.exports = PublicNotice; // we are in node js