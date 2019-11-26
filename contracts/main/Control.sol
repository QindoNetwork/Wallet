pragma solidity ^0.5.0;

import "../owner/Ownable.sol";

contract Control is Ownable {

  uint public gasPrice;
  uint public feesAsk;
  uint public feesPay;
  
  mapping (address => uint) private userPassword;
  mapping (address => bool) public lockedAccount;

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

  function lockAccount() public
  {
    if (lockedAccount[msg.sender] == false)
    {
      lockedAccount[msg.sender] == true;
    }
    else lockedAccount[msg.sender] == false;
  }

  function resetPassword() public view returns (uint)
  {
    userPassword[msg.sender] == 0;
  }

  function connectUser(string memory _password) public view returns (bool)
  {
    if (returnHash(_password) == userPassword[msg.sender]
    && userPassword[msg.sender] != 0 && lockedAccount[msg.sender] == false)
    {
      return true;
    }
    else return false;
  }

}
