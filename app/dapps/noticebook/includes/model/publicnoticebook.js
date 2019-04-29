'use strict';

var PublicNoticeBook = class {
	
	// "constants"
	/*static get STATUS_LOST() { return -100;}	

	static get STATUS_NOT_FOUND() { return -20;}	
	static get STATUS_UNKOWN() { return -10;}	

	static get STATUS_LOCAL() { return 1;}
	
	static get STATUS_SENT() { return 10;}	
	static get STATUS_PENDING() { return 100;}	
	
	static get STATUS_DEPLOYED() { return 200;}	
	static get STATUS_CANCELLED() { return 300;}	
	static get STATUS_REJECTED() { return 400;}	
	
	static get STATUS_ON_CHAIN() { return 1000;}*/	

	constructor(session, contractaddress) {
		this.session = session;
		this.address = contractaddress;
		
		this.uuid = null;

		this.status = PublicNoticeBook.STATUS_LOCAL;


		// local data
		this.contractindex = null; // index in list of contracts

		this.local_owner = null;
		this.local_owneridentifier = null;
		
		this.local_booktitle = null;
		this.local_description = null;
		
		this.local_creation_date = new Date().getTime();
		this.local_submission_date = null;
		
		// chain data
		this.chain_contract_name = null;
		this.chain_contract_version = null;

		// company
		this.chain_owner = null;
		this.chain_booktitle = null;
		
		
		// arrays
		this.localnoticearray = [];
		this.chainnoticearray = [];

		
		// operating variables
		this.contractlocalpersistor = null;
		this.contractinterface = null;
		
		// Contracts class
		var global = session.getGlobalObject();
		var commonmodule = global.getModuleObject('common');
		var ethnodemodule = global.getModuleObject('ethnode');
		
		this.Contracts = ethnodemodule.Contracts;
		
		this.savedstatus = this.Contracts.STATUS_LOCAL;
		
		this.livestatus = this.Contracts.STATUS_LOCAL;	}

	getAddress() {
		return this.address;
	}
	
	setAddress(address) {
		this.address = address;
	}
	
	getContractType() {
		return 'PublicNoticeBook';
	}
	
	getUUID() {
		if (this.uuid)
			return this.uuid;
		
		this.uuid = this.session.getUUID();
		
		return this.uuid;
	}
	
	getContractLocalPersistor() {
		if (this.contractlocalpersistor)
			return this.contractlocalpersistor;
		
		var session = this.session;
		var contractuuid = this.getUUID();
		
		var global = GlobalClass.getGlobalObject();
		var noticebookmodule = global.getModuleObject('noticebook');
		
		this.contractlocalpersistor = new noticebookmodule.PublicNoticeBookLocalPersistor(session, contractuuid)
		
		return this.contractlocalpersistor;
	}
	
	// initialization of object
	initContract(json) {
		console.log('PublicNoticeBook.initContract called for ' + this.address);
		
		//console.log('json is ' + JSON.stringify(json));
		
		var global = GlobalClass.getGlobalObject();
		var noticebookmodule = global.getModuleObject('noticebook');
		
		// load local ledger elements (if any)
		
		if (json["uuid"])
			this.uuid = json["uuid"];
		
		if (json["status"])
			this.setStatus(json["status"]);
		
		if (json["booktitle"])
			this.local_booktitle = json["booktitle"];
		
		if (json["description"])
			this.local_description = json["description"];
		
		if (json["owner"])
			this.setLocalOwner(json["owner"]);
			
		if (json["creationdate"])
			this.setLocalCreationDate(json["creationdate"]);
			
		if (json["submissiondate"])
			this.setLocalSubmissionDate(json["submissiondate"]);
			
		// load local notices
		if (json['notices']) {
			console.log('reading array of ' + json['notices'].length + ' notices');
			
			var localnoticearray = noticebookmodule.getPublicNoticesFromJsonArray(this.session, this, json['notices']);
			
			for (var i = 0; i < localnoticearray.length; i++) {
				this.addLocalNotice(localnoticearray[i]);
			}
		}
		
	}
	
	getLocalJson() {
		// ledger part
		var uuid = this.getUUID();
		var address = this.getAddress();
		var contracttype = this.getContractType();
		
		var status = this.getStatus();
		
		var booktitle = this.getLocalBookTitle();
		var description = this.getLocalDescription();
		var owner = this.getLocalOwner();
		
		var creationdate= this.getLocalCreationDate();
		var submissiondate= this.getLocalSubmissionDate();

		
		var json = {uuid: uuid, address: address, contracttype: contracttype, status: status, 
				creationdate: creationdate, submissiondate: submissiondate,
				description: description,  booktitle: booktitle,  owner: owner};
		
		// notice list
		if (this.localnoticearray) {
			var jsonarray = []

			for (var i = 0; i < this.localnoticearray.length; i++) {
				var notice = this.localnoticearray[i];
				
				if (notice.isLocalOnly()) {
					var jsonelement = notice.getLocalJson();
					jsonarray.push(jsonelement);
				}
			}
			
			//console.log('returning ' + jsonarray.length + ' local notices');
			json['notices'] = jsonarray;
		}

		return json;
	}
	
	saveLocalJson(callback) {
		console.log('PublicNoticeBook.saveLocalJson called for ' + this.address);

		var persistor = this.getContractLocalPersistor();
		
		persistor.savePublicNoticeBookJson(this, callback);
	}
	
	//
	// collections
	//
	
	// notices
	getNoticeFromKey(key) {
		var notc;
		var i;
		
		console.log('getNoticeFromKey called for key ' + key);
		
		// local first
		for (i = 0; i < this.localnoticearray.length; i++) {
			notc = this.localnoticearray[i];
			
			if ((notc) && (notc.getNoticeIndex() == key))
				return notc;
		}
		
		// then chain
		for (i = 0; i < this.chainnoticearray.length; i++) {
			notc = this.chainnoticearray[i];
			
			if ((notc) && (notc.getNoticeIndex() == key))
				return notc;
		}
		
		console.log('getNoticeFromKey did not found any notice with key ' + key);
	}
	
	removeNoticeObject(notice) {
		if (!notice)
			return;
		
		var key = notice.getNoticeIndex();
		var i;
		var notc;
		
		if (notice.isLocalOnly()) {
			// local
			for (i = 0; i < this.localnoticearray.length; i++) {
				notc = this.localnoticearray[i];
				
				if ((notc) && (notc.getNoticeIndex() == key))
					this.localnoticearray.splice(i, 1);
			}
		}
		else {
			// chain
			for (i = 0; i < this.chainnoticearray.length; i++) {
				notc = this.chainnoticearray[i];
				
				if ((notc) && (notc.getNoticeIndex() == key))
					this.chainnoticearray.splice(i, 1);
			}
			
		}
	}
	
	getLocalNotices() {
		var array = [];
		
		for (var i = 0; i < this.localnoticearray.length; i++) {
			var notice = this.localnoticearray[i];
			
			if (notice.getStatus() != PublicNoticeBook.STATUS_ON_CHAIN)
			array.push(notice);
		}
		
		return array;
	}
	
	addLocalNotice(notice) {
		var length = this.localnoticearray.length;
		this.localnoticearray.push(notice);
		
		var key = "key" + Math.floor((Math.random() * 1000) + 1) + "-index" + length;
		notice.setNoticeIndex(key);
	}
	
	hasPendingNotices() {
		var i;
		var notc;

		for (i = 0; i < this.localnoticearray.length; i++) {
			notc = this.localnoticearray[i];
			
			if ((notc) && (notc.getStatus() == PublicNoticeBook.STATUS_PENDING))
				return true;
		}
		
		return false;
	}
	
	checkPendingNotices(bRemove) {
		var noticestoremove = [];
		var i;
		var notc;
		
		// collect pending notices that have been deployed
		for (i = 0; i < this.localnoticearray.length; i++) {
			notc = this.localnoticearray[i];
			
			if ((notc) && (notc.getStatus() == PublicNoticeBook.STATUS_PENDING)) {
				var referenceid = notc.getLocalReferenceID();
				var chainnotice = this.getChainNoticeFromReferenceID(referenceid);
				
				if (chainnotice)  {
					notc.setStatus(PublicNoticeBook.STATUS_ON_CHAIN);
					noticestoremove.push(notc);
				}
			}
		}
		
		// remove notices if any
		if ((noticestoremove.length) && bRemove) {
			for (i = 0; i < noticestoremove.length; i++) {
				notc = noticestoremove[i];
				
				// we no longer remove
				console.log('WARNING checkPendingNotices called with remove flag, but removing is obsolete');
				//this.removeNoticeObject(notc);
			}
		}
		
		return noticestoremove.length;
	}
	
	getChainNotices() {
		var array = [];
		
		for (var i = 0; i < this.chainnoticearray.length; i++) {
			var notice = this.chainnoticearray[i];
			
			array.push(notice);
		}

		return array;
	}
	
	addChainNoticeAt(notice, index) {
		this.chainnoticearray[index] = notice;
		
		var key = "key" + Math.floor((Math.random() * 1000) + 1) + "-index" + index;
		notice.setNoticeIndex(key);
	}
	
	getChainNoticeFromReferenceID(referenceid) {
		var i;
		var notc;

		for (i = 0; i < this.chainnoticearray.length; i++) {
			notc = this.chainnoticearray[i];
			
			if ((notc) && (notc.getChainReferenceID() == referenceid))
				return notc;
		}
		
	}
	
	
	
	// local part
	isLocalOnly() {
		if (this.address == null)
			return true;
		else
			return false;
	}
	
	isLocal() {
		return true; // necessarily true for contracts
	}
	
	isOnChain() {
		return (this.status == PublicNoticeBook.STATUS_ON_CHAIN);
	}
	
	getStatus() {
		// 4 local saved status STATUS_LOCAL, STATUS_LOST, STATUS_CANCELLED, STATUS_REJECTED
		// 2 local saved transient status STATUS_SENT, STATUS_PENDING
		// 1 chain saved status STATUS_DEPLOYED
		return this.savedstatus;
	}
	
	getLiveStatus() {
		// 3 local live status STATUS_LOCAL, STATUS_SENT, STATUS_PENDING
		// 2 chain live status STATUS_NOT_FOUND, STATUS_ON_CHAIN
		return this.livestatus;
	}
	
	setStatus(status) {
		switch(status) {
			case this.Contracts.STATUS_LOST:
			case this.Contracts.STATUS_LOCAL:
			case this.Contracts.STATUS_SENT:
			case this.Contracts.STATUS_PENDING:
			case this.Contracts.STATUS_DEPLOYED:
			case this.Contracts.STATUS_CANCELLED:
			case this.Contracts.STATUS_REJECTED:
				this.savedstatus = status;
				break;
			default:
				// do not change for a unknown status
				break;
		}
	}
	
	checkStatus(callback) {
		var Contracts = this.Contracts;
		var chaintestfunction = (this.getChainContractVersion).bind(this);
		var contractinstance = this.getContractInterface().getContractInstance();
		
		return Contracts.checkStatus(this, chaintestfunction, contractinstance, callback);
		/*if (this.address == null) {
			var status = this.getStatus();
			
			if (callback)
				callback(null, status);
			
			return status;
		}
		
		var self = this;
		
		this.getChainContractVersion(function(err, res) {
			if (res) {
				self.setStatus(PublicNoticeBook.STATUS_ON_CHAIN);
			}
			
			if ((err) || (!res)) {
				var currenttatus = self.getStatus();
				
				switch(currenttatus) {
				case PublicNoticeBook.STATUS_LOCAL:
					case PublicNoticeBook.STATUS_LOST:
					case PublicNoticeBook.STATUS_NOT_FOUND:
					case PublicNoticeBook.STATUS_SENT:
					case PublicNoticeBook.STATUS_PENDING:
					case PublicNoticeBook.STATUS_CANCELLED:
					case PublicNoticeBook.STATUS_REJECTED:
						break;
					
					case PublicNoticeBook.STATUS_DEPLOYED:
					case PublicNoticeBook.STATUS_ON_CHAIN:
						self.setStatus(PublicNoticeBook.STATUS_NOT_FOUND);
						break;
					default:
						self.setStatus(PublicNoticeBook.STATUS_UNKOWN);
						break;
				}
				
				if (currenttatus == PublicNoticeBook.STATUS_ON_CHAIN)
				self.setStatus(PublicNoticeBook.STATUS_LOST);
			}

			var status = self.getStatus();
			
			if (callback)
				callback(null, status);
			
			return status;
		});*/
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
	
	getContractIndex() {
		return this.contractindex;
	}
	
	setContractIndex(index) {
		return this.contractindex = index;
	}
	
	getLocalBookTitle() {
		return this.local_booktitle;
	}
	
	setLocalBookTitle(booktitle) {
		this.local_booktitle = booktitle;
	}
	
	getLocalDescription() {
		return this.local_description;
	}
	
	setLocalDescription(description) {
		this.local_description = description;
	}
	
	getLocalOwner() {
		return this.local_owner;
	}
	
	setLocalOwner(localowner) {
		this.local_owner = localowner;
	}
	
	getLocalOwnerIdentifier() {
		return this.local_owneridentifier;
	}
	
	setLocalOwnerIdentifier(localowneridentifier) {
		this.local_owneridentifier = localowneridentifier;
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
	
	// chain part
	getContractInterface() {
		if (this.contractinterface)
			return this.contractinterface;
		
		var session = this.session;
		var contractaddress = this.address;
		
		var global = GlobalClass.getGlobalObject();
		var noticebookmodule = global.getModuleObject('noticebook');
		
		this.contractinterface = new noticebookmodule.PublicNoticeBookContractInterface(session, contractaddress)
		
		return this.contractinterface;
	}
	
	
	
	// deployment
	deploy(payingaccount, owningaccount, gas, gasPrice, callback) {
		var self = this;
		var session = this.session;
		//var EthereumNodeAccess = session.getEthereumNodeAccessInstance();

		var fromaddress = payingaccount.getAddress();
		
		console.log('PublicNoticeBook.deploy called for ' + this.local_description + " from " + fromaddress + " with gas limit " + gas + " and gasPrice " + gasPrice);
		
		var contractinterface = this.getContractInterface();
		
		var contractowner = this.getLocalOwner();
		var booktitle = this.getLocalBookTitle();
		
		var transactionuuid = this.getUUID();
		
		var promise = contractinterface.deploy(contractowner, booktitle, payingaccount, owningaccount, gas, gasPrice, transactionuuid)
		.then(function(res) {
			console.log('PublicNoticeBook.deploy promise of deployment resolved, result is: ' + res);
			
			self.setStatus(PublicNoticeBook.STATUS_PENDING);
			self.setAddress(contractinterface.getAddress());
			
			if (callback)
				callback(null, res);
			
			return res;
			
		});
		
		return promise;
	}
	
	validatePublicNoticeRegistration(payingaccount, gas, gasPrice, publicnotice, callback) {
		return true;
	}
	
	publishNotice(payingaccount, gas, gasPrice, publicnotice, callback) {
		var self = this;
		var session = this.session;
		
		var fromaddress = payingaccount.getAddress();
		
		var publicnoticetitle = publicnotice.getLocalTitle();
		
		console.log('PublicNoticeBook.publishNotice called for ' + publicnoticetitle + " from " + fromaddress + " with gas limit " + gas + " and gasPrice " + gasPrice);
		
		
		// we validate the transaction
		if (!this.validatePublicNoticeRegistration(payingaccount, gas, gasPrice, publicnotice, callback))
			return;
		
		var contractinterface = this.getContractInterface();
		
		var noticetype = publicnotice.getLocalNoticeType();
		var title = publicnotice.getLocalTitle();
		var jsoncontent = publicnotice.getLocalJsonContent();
		var jsoncontentstring = JSON.stringify(jsoncontent);
		
		var referenceID = (this.getUUID() !== null ? this.getUUID() : session.guid());
		publicnotice.setLocalReferenceID(referenceID);
		publicnotice.saveLocalJson();
		
		var promise = contractinterface.publishNotice(noticetype, title, jsoncontentstring, referenceID, payingaccount, gas, gasPrice)
		.then(function(res) {
			console.log('PublicNoticeBook.publishNotice promise of registration should be resolved, result is: ' + res);
			
			publicnotice.setStatus(PublicNoticeBook.STATUS_PENDING);
			publicnotice.saveLocalJson();
			
			if (callback)
				callback(null, res);
			
			return res;
		});
		
		return promise;
	}
	
	//
	// asynchronous methods
	//
	
	getChainContractVersion(callback) {
		console.log('PublicNoticeBook.getChainContractVersion called for ' + this.address);
		
		var contractinterface = this.getContractInterface();
		
		var promise = contractinterface.getContractVersion()
		.then(function (res) {
			console.log('PublicNoticeBook.getChainContractVersion returns ' + res);
			
			if (callback) {
				if (res)
					callback(null, res);
				else
					callback('PublicNoticeBook.getChainContractVersion returned null result', null);
			}
			
			return res;
		});
		
		return promise;
		
	}
	
	getChainOwner(callback) {
		console.log('PublicNoticeBook.getChainOwner called for ' + this.address);
		
		var contractinterface = this.getContractInterface();
		
		var promise = contractinterface.getOwner()
		.then(function (res) {
			console.log('PublicNoticeBook.getChainOwner returns ' + res);
			
			if (callback)
				callback(null, res);
			
			return res;
		});
		
		return promise;
		
	}
	
	getChainBookTitle(callback) {
		console.log('PublicNoticeBook.getChainBookTitle called for ' + this.address);
		
		var contractinterface = this.getContractInterface();
		
		var promise = contractinterface.getBookTitle()
		.then(function (res) {
			console.log('PublicNoticeBook.getChainBookTitle received ' + res);
			
			if (callback)
				callback(null, res);
			
			return res;
		});
		
		return promise;
		
	}
	
	// notices
	getChainNoticeAt(index, callback) {
		var self = this;
		var session = this.session;
		
		var global = GlobalClass.getGlobalObject();
		var noticebookmodule = global.getModuleObject('noticebook');

		var publicnotice = noticebookmodule.createBlankPublicNoticeObject(session, this);
		
		var contractinterface = this.getContractInterface();
		
		var promise = contractinterface.getNoticeAt(index)
		.then(function(res) {
			console.log('PublicNoticeBook.getChainNoticeAt received ' + res);
			
			if (res) {
				var notice_type = res['notice_type'];
				var title = res['title'];
				var json_content_string = res['json_content'];
				var json_content = JSON.parse(json_content_string);
				var referenceID = res['referenceID'];
				
				publicnotice.setStatus(PublicNoticeBook.STATUS_ON_CHAIN);
				
				publicnotice.setChainReferenceID(referenceID);

				publicnotice.setUUID(referenceID); // use this uuid saved in the chain
				
				publicnotice.setChainNoticeType(notice_type);
				publicnotice.setChainTitle(title);
				publicnotice.setChainJsonContent(json_content);
				
				publicnotice.setChainPosition(index);
				
				self.addChainNoticeAt(publicnotice, index);
				
				if (callback)
					callback(null, publicnotice);
				
				return res;
			}
			else {
				
				if (callback)
					callback('error retrieving notice at ' + index, null);
			}
			
		});
		
		return promise;
	}
	
	getChainNoticeCount(callback) {
		console.log('PublicNoticeBook.getChainNoticeCount called for ' + this.address);
		
		var contractinterface = this.getContractInterface();
		
		var promise = contractinterface.getNoticeCount()
		.then(function (res) {
			console.log('PublicNoticeBook.getChainNoticeCount received ' + res);
			
			if (callback)
				callback(null, res);
			
			return res;
		});
		
		return promise;
		
	}
	
	getChainNoticeList(callback) {
		console.log('PublicNoticeBook.getNoticeList called for ' + this.address);
		
		var self = this;
		var session = this.session;
		
		var global = GlobalClass.getGlobalObject();
		var noticebookmodule = global.getModuleObject('noticebook');

		var contractinterface = this.getContractInterface();
		
		var promise = this.getChainNoticeCount(function (err, count) {
			if (!count)
				return callback(null, []);

			return count;
			
		}).then(function (count) {
			console.log("count of notices is " + count);
			
			var callfunc = function(contractinterface) {
				var promises = [];
				
				for (var i = 0; i < count; i++) {
					var singlepromise = self.getChainNoticeAt(i);
					
					promises.push(singlepromise);
				}
				
				return Promise.all(promises).then(function(res) {
			    	console.log("all getNoticeAt promises have been resolved, array is now complete");
				});
			};
		
			if (contractinterface)
			 return callfunc(contractinterface);
			
		})
		.then(function(res) {
	    	console.log("PublicNoticeBook.getChainNoticeList array is now complete");
	    	
	    	// if we have pending notices, we check if some have been deployed
	    	if (self.hasPendingNotices()) {
	    		self.checkPendingNotices(true); // true to force remove
	    	}
			
	    	if (callback)
				callback(null, self.chainnoticearray);
    	});
		
		return promise;
	}
}


if ( typeof GlobalClass !== 'undefined' && GlobalClass )
	GlobalClass.registerModuleClass('noticebook', 'PublicNoticeBook', PublicNoticeBook);
else
	module.exports = PublicNoticeBook; // we are in node js
