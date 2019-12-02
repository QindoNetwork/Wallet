pragma solidity ^0.5.0;

import "../owner/Ownable.sol";

contract Control is Ownable {

  uint public feesAsk;
  uint public feesPay;

  mapping (address => uint) private userPassword;
  mapping (address => bool) public lockedAccount;
  mapping (address => bool) public resetAuthorization;
  mapping (address => user) private mappAddressToOptionalUserInfo;
  mapping (uint => gasParameters) private mappFunctionToGasParameters;

  struct user
  {
    string ipfsImage;
    string snapShat;
  }

  struct gasParameters
  {
    uint gasPrice;
    uint gasLimit;
  }

  constructor(address _tgts) public {
    mappFunctionToGasParameters[0].gasPrice = 30000000000;
    mappFunctionToGasParameters[0].gasLimit = 30000000000;
    mappFunctionToGasParameters[1].gasPrice = 30000000000;
    mappFunctionToGasParameters[1].gasLimit = 30000000000;
    mappFunctionToGasParameters[2].gasPrice = 30000000000;
    mappFunctionToGasParameters[2].gasLimit = 30000000000;
    mappFunctionToGasParameters[3].gasPrice = 30000000000;
    mappFunctionToGasParameters[3].gasLimit = 30000000000;
    mappFunctionToGasParameters[4].gasPrice = 30000000000;
    mappFunctionToGasParameters[4].gasLimit = 30000000000;
    mappFunctionToGasParameters[5].gasPrice = 30000000000;
    mappFunctionToGasParameters[5].gasLimit = 30000000000;
    mappFunctionToGasParameters[6].gasPrice = 30000000000;
    mappFunctionToGasParameters[6].gasLimit = 30000000000;
    mappFunctionToGasParameters[7].gasPrice = 30000000000;
    mappFunctionToGasParameters[7].gasLimit = 30000000000;
    mappFunctionToGasParameters[8].gasPrice = 30000000000;
    mappFunctionToGasParameters[8].gasLimit = 30000000000;
    mappFunctionToGasParameters[9].gasPrice = 30000000000;
    mappFunctionToGasParameters[9].gasLimit = 30000000000;
    mappFunctionToGasParameters[10].gasPrice = 30000000000;
    mappFunctionToGasParameters[10].gasLimit = 30000000000;
    owner = msg.sender;
    TGTSToken = External3(_tgts);
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

  function setUserInfo(string memory snapShat, string memory ipfsImage) public
  {
    mappAddressToOptionalUserInfo[msg.sender].ipfsImage = ipfsImage;
    mappAddressToOptionalUserInfo[msg.sender].snapShat = snapShat;
  }

  function eraseInfo() public
  {
    mappAddressToOptionalUserInfo[msg.sender].ipfsImage = "";
    mappAddressToOptionalUserInfo[msg.sender].snapShat = "";
  }

  function setGasParameters(uint limit, uint price, uint _function)  public onlyOwner
  {
    mappFunctionToGasParameters[_function].gasPrice = price;
    mappFunctionToGasParameters[_function].gasLimit = limit;
  }

  function getGasPrice(uint _function) view public returns (uint)
  {
    return mappFunctionToGasParameters[_function].gasPrice;
  }

  function getGasLimit(uint _function) view public returns (uint)
  {
    return mappFunctionToGasParameters[_function].gasLimit;
  }

  function getIpfsImage(address _user) view public returns (string memory)
  {
    return mappAddressToOptionalUserInfo[_user].ipfsImage;
  }

  function getSnapshat(address _user) view public returns (string memory)
  {
    return mappAddressToOptionalUserInfo[_user].snapShat;
  }

}
