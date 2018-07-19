'use strict';

var ModuleControllers = class {
	
	constructor(module) {
		this.module = module;
	}
	
	createPublicNoticeBookObject(data) {
		console.log("Controllers.createPublicNoticeContract called");
		
		var address = (data && data['address'] ? data['address'] : null);
		var owner = (data && data['owner'] ? data['owner'] : null);
		var booktitle = (data && data['booktitle'] ? data['booktitle'] : null);
		var description = (data && data['description'] ? data['description'] : null);


		var module = this.module;
		var global = module.global;
		var session = global.getModuleObject('common').getSessionObject();
		
		var contracts = session.getContractsObject();
		
		
		var contract = contracts.createBlankContractObject('PublicNoticeBook');
		
		contract.setAddress(address);

		contract.setLocalOwner(owner);
		contract.setLocalDescription(description);
		contract.setLocalBookTitle(booktitle);
		
		return contract;
	}
	
	savePublicNoticeBookObject(contract) {
		if (!contract)
			return;
		
		var module = this.module;
		var global = module.global;
		
		var commonmodule = global.getModuleObject('common');
		var session = commonmodule.getSessionObject();
		
		var contracts = session.getContractsObject();
		
		var contractindex = contract.getContractIndex();
		
		if (!contracts.getContractObjectFromKey(contractindex)) {
			// insert
			contracts.addContractObject(contract);
			
			session.saveContractObjects(contracts);
		}
		else {
			// update
			contract.saveLocalJson();
		}

	}

	savePublicNoticeObject(notice) {
		if (!notice)
			return;
		
		notice.saveLocalJson();
	}

	savePublicNoticeBooks() {
		var module = this.module;
		var global = module.global;
		
		var commonmodule = global.getModuleObject('common');
		var session = commonmodule.getSessionObject();
		
		var contracts = session.getContractsObject();

		session.saveContractObjects(contracts);
	}

	getPublicNoticeBookFromKey(contractindex) {
		console.log("Controllers.getPublicNoticeBookFromKey called with index: " + contractindex);

		var module = this.module;
		var global = module.global;
		var session = global.getModuleObject('common').getSessionObject();
		
		var contracts = session.getContractsObject();
		
		
		var contract = contracts.getContractObjectFromKey(contractindex);
		
		return contract;
	}
}

GlobalClass.registerModuleClass('noticebook', 'Controllers', ModuleControllers);