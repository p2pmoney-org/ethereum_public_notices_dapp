'use strict';

var PublicNoticeBookContractInterface = class {
	
	constructor(session, contractaddress) {
		this.session = session;
		this.address = contractaddress;
		
		// operating variables
		this.finalized_init = null;
		
		this.contractinstance = null;
	}
	
	getAddress() {
		return this.address;
	}
	
	setAddress(address) {
		this.address = address;
	}
	
	getContractInstance() {
		if (this.contractinstance)
			return this.contractinstance;
		
		this.contractinstance = this.session.getContractInstance(this.address, './contracts/PublicNoticeBook.json');
		
		return this.contractinstance;
	}
	
	validateInstanceDeployment(payingaccount, owningaccount, gas, gasPrice, callback) {
		// we check the account is unlocked
		if (payingaccount.isLocked())
			throw 'account ' + payingaccount.getAddress() + ' is locked, unable to deploy contract: ' + this.localledgerdescription;
		
		// we validate we are signed-in with the correct owning account
		var session = this.session;
		
		if (!session.isSessionAccount(owningaccount))
			throw 'account ' + owningaccount.getAddress() + ' is not currently signed-in';
		
		return true;
	}
	
	// contract api
	activateContractInstance(callback) {
		return this.getContractInstance().activate(callback);
	}
	

	deploy(contractowner, booktitle,
			payingaccount, owningaccount, gas, gasPrice, callback) {
		var self = this;
		var session = this.session;

		var fromaddress = payingaccount.getAddress();
		
		console.log('PublicNoticeBookContractInterface.deploy called for ' + booktitle + " from " + fromaddress + " with gas limit " + gas + " and gasPrice " + gasPrice);
		
		
		// we validate the transaction
		if (!this.validateInstanceDeployment(payingaccount, owningaccount, gas, gasPrice, callback))
			return;
		
		var contractinstance = this.getContractInstance();
		
		var params = [];
		
		params.push(contractowner);
		params.push(booktitle);
		
		var promise = contractinstance.contract_new(params, payingaccount, gas, gasPrice)
		.then(function(res) {
			console.log('PublicNoticeBookContractInterface.deploy promise of deployment should be resolved');
			
			self.setAddress(contractinstance.getAddress());
			
			if (callback)
				callback(null, res);
			
			return res;
		});
		
		return promise;
	}
	
	getContractName(callback) {
		var self = this;
		var session = this.session;
		
		var contractinstance = this.getContractInstance();
		var params = [];
		
		var promise = contractinstance.method_call("contract_name", params, callback);
		
		return promise
	}
	
	getContractVersion(callback) {
		var self = this;
		var session = this.session;
		
		var contractinstance = this.getContractInstance();
		var params = [];
		
		var promise = contractinstance.method_call("contract_version", params, callback);
		
		return promise
	}
	
	getOwner(callback) {
		var self = this;
		var session = this.session;
		
		var contractinstance = this.getContractInstance();
		var params = [];
		
		var promise = contractinstance.method_call("owner", params, callback)
		.then(function(res) {
			console.log('PublicNoticeBookContractInterface.getOwner received ' + res);
			
			return res;
		});
		
		return promise
	}
	
	getBookTitle(callback) {
		var self = this;
		var session = this.session;
		
		var contractinstance = this.getContractInstance();
		var params = [];
		
		var promise = contractinstance.method_call("booktitle", params, callback)
		.then(function(res) {
			console.log('PublicNoticeBookContractInterface.getBookTitle received ' + res);
			
			return res;
		});
		
		return promise
	}
	
	
	// notices
	publishNotice(notice_type, title, json_content, referenceID, 
			payingaccount, gas, gasPrice, callback) {
		var self = this;
		var session = this.session;
		
		var fromaddress = payingaccount.getAddress();
		
		console.log('PublicNoticeBookContractInterface.publishNotice called from ' + fromaddress + ' with gas limit ' + gas + ' and gasPrice ' + gasPrice);

		var contractinstance = this.getContractInstance();

		var params = [];
		
		params.push((notice_type ? notice_type : 'simple'));
		params.push((title ? title : ''));
		params.push((json_content ? json_content : '{}'));
		params.push((referenceID ? referenceID : ''));
		
		var value = null;
		var txdata = null;
		var nonce = null;
		
		var promise = contractinstance.method_sendTransaction('publishNotice', params, payingaccount, value, gas, gasPrice, txdata, nonce, callback)
		.then(function(res) {
			console.log('PublicNoticeBookContractInterface.publishNotice promise of publish should be resolved');
			
			return res;
		});
		
		return promise;
	}
	
	getNoticeCount(callback) {
		var self = this;
		var session = this.session;
		
		var contractinstance = this.getContractInstance();
		var params = [];
		
		var promise = contractinstance.method_call("getNoticeCount", params, callback)
		.then(function(res) {
			console.log('PublicNoticeBookContractInterface.getNoticeCount received ' + res);
			
			return res;
		});
		
		return promise
	}
	
	getNoticeAt(index, callback) {
		var self = this;
		var session = this.session;
		
		var contractinstance = this.getContractInstance();
		var params = [];
		
		params.push(index);
		
		var promise = contractinstance.method_call("getNoticeAt", params)
		.then(function(res) {
			console.log('PublicNoticeBookContractInterface.getNoticeAt received ' + res);
			
			var ret = [];
			ret['notice_type'] = res[0];
			ret['title'] = res[1];
			ret['json_content'] = res[2];
			ret['referenceID'] = res[3];

			if (callback)
				callback(null, ret);
			
			return ret;
		});
		
		return promise
	}
	
		
}


if ( typeof GlobalClass !== 'undefined' && GlobalClass )
	GlobalClass.registerModuleClass('noticebook', 'PublicNoticeBookContractInterface', PublicNoticeBookContractInterface);
else
	module.exports = PublicNoticeBookContractInterface; // we are in node js

