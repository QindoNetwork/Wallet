pragma solidity ^0.5.0;

import "../owner/Ownable.sol";

contract Control is Ownable {

  uint public feesAsk;
  uint public feesPay;

  mapping (address => password) private userPassword;
  mapping (address => bool) public lockedAccount;
  mapping (address => bool) public resetAuthorization;
  mapping (address => user) private mappAddressToOptionalUserInfo;
  mapping (uint => gasParameters) private mappFunctionToGasParameters;

  struct password
  {
    uint code;
    bool active;
  }

  struct user
  {
    string ipfsImage;
    string snapShat;
  }

  struct gasParameters
  {
    string functionName;
    uint gasPrice;
    uint gasLimit;
  }

  constructor(address _tgts) public {
    uint defaultGasPrice = 30000000000;
    uint defaultGasLimit = 30000000000;
    mappFunctionToGasParameters[0].functionName = "ask";
    mappFunctionToGasParameters[0].gasPrice = defaultGasPrice;
    mappFunctionToGasParameters[0].gasLimit = defaultGasLimit;
    mappFunctionToGasParameters[1].functionName = "transferGroupOwnership";
    mappFunctionToGasParameters[1].gasPrice = defaultGasPrice;
    mappFunctionToGasParameters[1].gasLimit = defaultGasLimit;
    mappFunctionToGasParameters[2].functionName = "setUser";
    mappFunctionToGasParameters[2].gasPrice = defaultGasPrice;
    mappFunctionToGasParameters[2].gasLimit = defaultGasLimit;
    mappFunctionToGasParameters[3].functionName = "createGroup";
    mappFunctionToGasParameters[3].gasPrice = defaultGasPrice;
    mappFunctionToGasParameters[3].gasLimit = defaultGasLimit;
    mappFunctionToGasParameters[4].functionName = "createProfile";
    mappFunctionToGasParameters[4].gasPrice = defaultGasPrice;
    mappFunctionToGasParameters[4].gasLimit = defaultGasLimit;
    mappFunctionToGasParameters[5].functionName = "askForFunds";
    mappFunctionToGasParameters[5].gasPrice = defaultGasPrice;
    mappFunctionToGasParameters[5].gasLimit = defaultGasLimit;
    mappFunctionToGasParameters[6].functionName = "withdrawFunds";
    mappFunctionToGasParameters[6].gasPrice = defaultGasPrice;
    mappFunctionToGasParameters[6].gasLimit = defaultGasLimit;
    mappFunctionToGasParameters[7].functionName = "removeMember";
    mappFunctionToGasParameters[7].gasLimit = defaultGasLimit;
    mappFunctionToGasParameters[7].gasPrice = defaultGasPrice;
    mappFunctionToGasParameters[8].functionName = "quitGroup";
    mappFunctionToGasParameters[8].gasPrice = defaultGasPrice;
    mappFunctionToGasParameters[8].gasLimit = defaultGasLimit;
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
    userPassword[msg.sender].active = true;
  }

  function changePassword(string memory NewPassword, string memory oldPassword) public
  {
    uint newHash = returnHash(NewPassword);
    require(newHash == returnHash(oldPassword));
    userPassword[msg.sender].code = newHash;
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
    userPassword[msg.sender].active = false;
  }

  function hasPassword() public returns (bool)
  {
    return userPassword[msg.sender].active;
  }

  function getPassword() public returns(uint)
  {
    return userPassword[msg.sender].code;
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
