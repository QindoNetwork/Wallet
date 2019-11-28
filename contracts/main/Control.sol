pragma solidity ^0.5.0;

import "../owner/Ownable.sol";

contract Control is Ownable {

  uint private gasPrice;
  uint private feesAsk;
  uint private feesPay;

  mapping (address => uint) public userPassword; // private for production
  mapping (address => bool) public lockedAccount;
  mapping (address => bool) public resetAuthorization;

  constructor(address _tgts) public {
    gasPrice = 30000000000;
    owner = msg.sender;
    TGTSToken = External3(_tgts);
  }

  function modifyGasPrice(uint _gasPrice) public onlyOwner
  {
    gasPrice = _gasPrice;
  }

  function modifyFeesPay(uint _amount) public onlyOwner
  {
    feesPay = _amount;
  }

  function modifyFeesAsk(uint _amount) public onlyOwner
  {
    feesAsk = _amount;
  }

  function createPassword(string memory _password) public
  {
    require(userPassword[msg.sender] == 0);
    userPassword[msg.sender] = returnHash(_password);
  }

  function changePassword(string memory NewPassword, string memory oldPassword) public
  {
    uint newHash = returnHash(NewPassword);
    require(newHash == returnHash(oldPassword));
    userPassword[msg.sender] = newHash;
  }

  function lockAccount() public view
  {
    if (lockedAccount[msg.sender] == false)
    {
      lockedAccount[msg.sender] == true;
    }
    else lockedAccount[msg.sender] == false;
  }

  function resetAutho(address pk) public onlyOwner
  {
    resetAuthorization[pk] = true;
  }

  function resetPassword() public
  {
    require(resetAuthorization[msg.sender] == true);
    userPassword[msg.sender] == 0;
    resetAuthorization[msg.sender] = false;
  }

  function connectUser(string memory _password) public view returns (bool)
  {
    if (returnHash(_password) == userPassword[msg.sender]
    && lockedAccount[msg.sender] == false)
    {
      return true;
    }
    else return false;
  }

}
