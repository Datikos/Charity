// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "./Helper.sol";

contract Charity is Owned,Mutex {

    string public name;
    string public description;
    string public beneficiaryName;
    address payable public beneficiaryAddress;
    string public imageUrl;


    uint256 public totalDonations; //same as balance
    uint256 public donationsCount;

    address payable private factoryAddress;
    uint256 immutable charity_fee;

    error InsufficientBalance(uint256 available, uint256 required);
    error UnknownError(address sender, uint256 amount);


    struct Donation {
      uint256 amount;
      uint256 date; 
      string message;
      address donorAddress;
    }

    event DonationReceived(address indexed donor, uint256 value);
    event Withdraw(uint256 amount);
    event Received(address sender, uint256 amount);
    event Fallback(address sender, uint256 amount);

    mapping(address => Donation[]) private _donations;
    modifier onlyBeneficiary {
        require(
            msg.sender == beneficiaryAddress,
            "Only beneficiary can call this function."
        );
        _;
    }
    constructor(
      string memory _name,
      string memory _description,
      string memory _beneficiaryName,
      address payable _beneficiaryAddress,
      uint256 _charity_fee,
      string memory _imageUrl
      ) {
        name  = _name;
        description = _description;
        beneficiaryName = _beneficiaryName;
        beneficiaryAddress  = _beneficiaryAddress;
        charity_fee = _charity_fee;
        imageUrl=_imageUrl;
    }

    function setFactoryAddres(address payable _factoryAddress) external onlyOwner{
        factoryAddress  = _factoryAddress;
    }
    function setBeneficiaryAddress(address payable _beneficiaryAddress) public onlyOwner {
      beneficiaryAddress = _beneficiaryAddress;
    }
    function donate(string memory _message) public payable  noReentrancy {
        Donation memory donation = Donation({
            amount: msg.value,
            date: block.timestamp,
            message: _message,
            donorAddress: msg.sender
        });
        _donations[msg.sender].push(donation);
        totalDonations += msg.value;
        donationsCount++;

        (bool setInfoSuccess,) 
          = payable(factoryAddress).call{ gas: 5000000 }(abi.encodeWithSignature("setDonationInfo(address,uint256)",msg.sender,msg.value));

        if(!setInfoSuccess){
          revert UnknownError(msg.sender,msg.value);
        }
        require(address(this).balance >= charity_fee, "Address: insufficient balance");

        if(msg.value>charity_fee){
          totalDonations-=charity_fee;
          bool sendResult = payable(factoryAddress).send(charity_fee);
          if(!sendResult){
              revert UnknownError({sender: msg.sender,amount: msg.value});
          }
        }else{
          revert InsufficientBalance({available: msg.value,required: charity_fee});
        }

        emit DonationReceived(msg.sender, msg.value);
    }
  
    function myDonationsCount() public view returns(uint256) {
        return _donations[msg.sender].length;
    }
    function myDonations() public view returns(Donation[] memory)
    {
        return _donations[msg.sender];
    }
    function withdraw() public onlyBeneficiary noReentrancy {
        uint256 balance = address(this).balance;
        if(balance>totalDonations){
          balance=totalDonations;
        }
        beneficiaryAddress.transfer(balance);
        emit Withdraw(balance);
    }

    function getBalance() public view returns(uint256){
      return address(this).balance;
    }

    function getContractAddress() external view returns(address){
      return address(this);
    }
    receive() external payable {
        totalDonations+=msg.value;
        emit Received(msg.sender, msg.value);
    }

    fallback() external payable { 
        emit Fallback(msg.sender, msg.value);
    }
}