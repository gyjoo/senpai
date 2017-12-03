pragma solidity ^0.4.15;

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract Senpai {
	struct product{
		address uploader;
		string title;
		string file_url;
		uint256 price;
		uint created_at;
		uint download_num;
		uint like_num;
		uint source_type; // 깜지, 시험, 필기 기타
		uint department;
		string course_id;
		string description;
		bool activate;
	}

	function getTitle(uint idx) public view returns(string){ return products[idx].title; }
	function getUploader(uint idx) public view returns(address){ return products[idx].uploader; }
	function getFileUrl(uint idx) public view returns(string){ return products[idx].file_url; }
	function getPrice(uint idx) public view returns(uint256){ return products[idx].price; }
	function getCreatedAt(uint idx) public view returns(uint){ return products[idx].created_at; }
	function getDownloadNum(uint idx) public view returns(uint){ return products[idx].download_num; }
	function getLikeNum(uint idx) public view returns(uint){ return products[idx].like_num; }
	function getSourceType(uint idx) public view returns(uint){ return products[idx].source_type; }
	function getDepartment(uint idx) public view returns(uint){ return products[idx].department; }
	function getCourseId(uint idx) public view returns(string){ return products[idx].course_id; }
	function getDescription(uint idx) public view returns(string){ return products[idx].description; }



	struct user{
		string nickname;
		mapping(uint => uint) purchased_products;
		uint purchased_products_total;
		mapping(uint => uint) selling_products;
		uint selling_products_total;
	}


	mapping(uint => product) private products;
	uint products_total;

	mapping(address => user) private users;


	function like(uint pid) public returns (bool) {
		require(pid >= 0 && pid < products_total);
		products[pid].like_num++;
		return true;
	}

	function create_product(string _title, string _file_url, uint256 _price,
		uint _created_at, uint _source_type, uint _department, string _course_id,
		string _description) payable public returns (bool) {
			uint pid = products_total++;
			products[pid].title = _title;
			products[pid].file_url = _file_url;
			products[pid].price = _price;
			products[pid].created_at = _created_at;
			products[pid].source_type = _source_type;
			products[pid].department = _department;
			products[pid].course_id = _course_id;
			products[pid].description = _description;
			products[pid].activate = true;
			uint psid = users[msg.sender].selling_products_total++;
			users[msg.sender].selling_products[psid] = pid;
			return true;
		}


		function edit_product(uint pid, string _title, string _file_url, uint256 _price,
			uint _created_at, uint _source_type, uint _department, string _course_id,
			string _description, bool _activate) public returns (bool) {
				products[pid].uploader = msg.sender;
				products[pid].title = _title;
				products[pid].file_url = _file_url;
				products[pid].price = _price;
				products[pid].created_at = _created_at;
				products[pid].source_type = _source_type;
				products[pid].department = _department;
				products[pid].course_id = _course_id;
				products[pid].description = _description;
				products[pid].activate = _activate;
				return true;
			}

			function get_purchased_products(uint product_idx) public view returns (uint upid){
				address user_addr = msg.sender;
				upid = users[user_addr].purchased_products[product_idx];
				return upid;
			}

			function get_selling_products(uint product_idx) public view returns (uint upid){
				address user_addr = msg.sender;
				upid = users[user_addr].selling_products[product_idx];
				return upid;
			}

			function purchase_product(uint pid) payable public {
				require(pid >= 0 && pid < products_total);
				address buyer = msg.sender;
				//bool result = products[pid].uploader.send(msg.value);
				//require (result);
				uint uid = users[buyer].purchased_products_total++;
				users[buyer].purchased_products[uid] = pid;
				products[pid].download_num++;
			}

			function getProductsTotal() public view returns(uint a){
				a = products_total;
				return a;
			}

}


/*
Name (소스 제목)
Description (간략한 설명 by 업로더) // File_url (다운로드 기능) // Coin (가격) // Created_at (업로드 시간)
// Download (다운로드 수) // Like (좋아요) // Type (깜지 / 시험 / 필기 / 기타) // Department (학과)
// Course_id (학수번호)
Purchase : user_id, source_id, (coin),
Request : user_id, title,
 nickname

*/
