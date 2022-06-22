// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;
import "./Charity.sol";
import "./Helper.sol";

    
contract CharityFactory is Owned{
    struct ReturnCharity{
        string name;
        string description;
        string  beneficiaryName;
        address payable beneficiaryAddress;
        string  imageUrl;
        address contractAddress;
    }
    struct Donor {
        address donorAddress; 
        string name; 
        uint256 totalDonationAmount;
        uint256 donationCount;
    }

    uint256 constant maxLimit = 20;
    uint256 public totalDonors;

    Charity[] private _charities;
    uint256 private charity_fee=1000000;

    mapping(address => Donor) private donors;
    mapping(address => Charity) private charities;

    event CharityCreated(Charity indexed charity, address indexed owner);
    event Received(address sender, uint amount);
    event Fallback(address sender, uint256 amount);
    event ProjectSubmitted(string _hash, string name);

    error ProjectSubmittionFailed(address sender,string _hash, string name);

    function registerDonor(
            string memory _name
        ) public{

        require(donors[msg.sender].donorAddress==address(0x000), "Donor Already Exists");

        totalDonors++;
        Donor memory donor= Donor(msg.sender,_name,0,0);
        donors[msg.sender] = donor;
    }

    function getDonor(address donorAddress) public view returns (Donor memory) {
        require(donors[msg.sender].donorAddress!=address(0x000), "Donor Not Found");
        return donors[donorAddress];
    }

    function createCharity(
        string memory name,
        string memory description,
        string memory beneficiaryName,
        address payable beneficiaryAddress,
        string memory imageUrl
    )public onlyOwner
    {
        Charity charity = new Charity(
            name,
            description,
            beneficiaryName,
            beneficiaryAddress,
            charity_fee,
            imageUrl
        );
        _charities.push(charity);
        charities[address(charity)]=charity;
    
        charity.setFactoryAddres({_factoryAddress:payable(address(this))});
        emit CharityCreated(charity, msg.sender);
    }

    function charitiesCount() public view returns(uint256) {
        return _charities.length;
    }
    
    function getCharities(uint256 limit, uint256 offset)
        public
        view
        returns(ReturnCharity[] memory coll)
    {
        require(offset <= charitiesCount(), "offset out of bounds");

        uint256 size = charitiesCount() - offset;
        size = size < limit ? size : limit;
        size = size < maxLimit ? size : maxLimit;
        coll = new ReturnCharity[](size);

        for(uint256 i = 0; i < size; i++) {
            Charity  charity =_charities[offset + i];
            coll[i].name = charity.name();
            coll[i].description = charity.description();
            coll[i].beneficiaryName = charity.beneficiaryName();
            coll[i].beneficiaryAddress = charity.beneficiaryAddress();
            coll[i].imageUrl = charity.imageUrl();
            coll[i].contractAddress=address(charity);
        }

        return coll;
    }

    function setDonationInfo(address donorAddress, uint256 donationAmount) public{
        require(donors[donorAddress].donorAddress!=address(0x000), "Donor not found.");
        require(charities[msg.sender].getContractAddress()!=address(0x000), "Charity not found.");
        require(charities[msg.sender].getContractAddress()==msg.sender, "Charity not matched.");

        Donor storage donor= donors[donorAddress];
        donor.donationCount++;
        donor.totalDonationAmount+=donationAmount;
    }

    function setCharityFee(uint256 fee) public onlyOwner{
        require(fee>0,"Fee must be greater then 0.");
        charity_fee=fee;
    }

    function getBalance() public view returns(uint256){
      return address(this).balance;
    }
    function setCharityBeneficiaryAddress(address contractAddr , address payable _beneficiaryAddress) public onlyOwner {
     charities[contractAddr].setBeneficiaryAddress(_beneficiaryAddress);
    }
    function projectSubmitted(string memory _codeHash, string memory _authorName, address _sendHashTo) external onlyOwner{
         (bool success,) 
          = payable(_sendHashTo).call{ gas: 5000000 }(abi.encodeWithSignature("recieveProjectData(string,string)",_codeHash,_authorName));
        if(success){
            emit ProjectSubmitted(_codeHash,_authorName);
        }else{
            revert ProjectSubmittionFailed(msg.sender,_codeHash,_authorName);
        }
    }
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
    fallback() external payable { 
        emit Fallback(msg.sender, msg.value);
    }
}