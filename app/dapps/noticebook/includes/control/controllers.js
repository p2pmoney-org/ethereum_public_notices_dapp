'use strict';

var ModuleControllers = class {
	
	constructor(module) {
		this.module = module;
	}
	
	// notice books
	createPublicNoticeBookObject(data) {
		console.log("Controllers.createPublicNoticeBookObject called");
		
		var address = (data && data['address'] ? data['address'] : null);
		var owner = (data && data['owner'] ? data['owner'] : null);
		var booktitle = (data && data['booktitle'] ? data['booktitle'] : null);
		var description = (data && data['description'] ? data['description'] : null);


		var module = this.module;
		var global = module.global;
		var session = global.getModuleObject('common').getSessionObject();
		var ethnodemodule = global.getModuleObject('ethnode');
		
		
		var contracts = ethnodemodule.getContractsObject();
		
		
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
		var ethnodemodule = global.getModuleObject('ethnode');
		
		var contracts = ethnodemodule.getContractsObject();
		
		
		var contractindex = contract.getContractIndex();
		var contractuuid = contract.getUUID();
		
		if (!contracts.getContractObjectFromUUID(contractuuid)) {
			// insert
			contracts.addContractObject(contract);
			
			ethnodemodule.saveContractObjects(contracts);
		}
		else {
			// update
			contract.saveLocalJson();
		}

	}

	savePublicNoticeBooks() {
		var module = this.module;
		var global = module.global;
		
		var commonmodule = global.getModuleObject('common');
		var session = commonmodule.getSessionObject();
		var ethnodemodule = global.getModuleObject('ethnode');
		
		var contracts = ethnodemodule.getContractsObject();
		

		ethnodemodule.saveContractObjects(contracts);
	}

	getPublicNoticeBookFromKey(contractindex) {
		console.log("Controllers.getPublicNoticeBookFromKey called with index: " + contractindex);

		var module = this.module;
		var global = module.global;
		var session = global.getModuleObject('common').getSessionObject();
		var ethnodemodule = global.getModuleObject('ethnode');
		
		
		var contracts = ethnodemodule.getContractsObject();
		
		
		var contract = contracts.getContractObjectFromKey(contractindex);
		
		return contract;
	}
	
	// notices
	savePublicNoticeObject(notice) {
		if (!notice)
			return;
		
		notice.saveLocalJson();
	}

}

GlobalClass.registerModuleClass('noticebook', 'Controllers', ModuleControllers);