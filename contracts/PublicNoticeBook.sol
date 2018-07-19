pragma solidity ^0.4.24;

contract PublicNoticeBook {
	string public contract_name;
	uint public contract_version;

	// company
	address public owner;
	
	string public booktitle;

	// list of published notices
	Notice[] notices;
	
	struct Notice {
	    string notice_type;
	    string title;
	    
	    string json_content;
	    
	    string referenceID;
	}
	
	// constructor
	constructor(address _owner, string _booktitle) public {
		contract_name = "publicnoticebook";
		contract_version = 20180901;
		
		owner = _owner;
		booktitle = _booktitle;
	}
	
	// notices
	function publishNotice(string _notice_type, string _title, string _json_content, string _referenceID) public payable returns (uint _noticeindex) {
	    uint __current_number_of_notices = notices.length;
        notices.length = __current_number_of_notices + 1;
	    
        Notice storage __notice = notices[__current_number_of_notices];
       
        __notice.notice_type = _notice_type;
        __notice.title = _title;
        __notice.json_content = _json_content;
        __notice.referenceID = _referenceID;
       
 	    _noticeindex = __current_number_of_notices;
	}

	function getNoticeCount() public view returns (uint _count) {
	    _count = notices.length;
	}
	
	function getNoticeAt(uint _index) public view returns (string _notice_type, string _title, string _json_content, string _referenceID) {
	    uint __current_number_of_notices = notices.length;
	    
	    require((_index >= 0) && (_index < __current_number_of_notices));
	    
	    Notice storage __notice = notices[_index];
	    
        _notice_type = __notice.notice_type;
        _title = __notice.title;
        _json_content = __notice.json_content;
        _referenceID = __notice.referenceID;
    }
	
}
