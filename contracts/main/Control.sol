pragma solidity ^0.5.0;

import "../owner/Ownable.sol";

contract Control is Ownable {

  mapping (address => uint) private userPassword;
  mapping (address => bool) public lockedAccount;
  mapping (address => bool) public resetAuthorization;
  mapping (address => user) private mappAddressToOptionalUserInfo;
  mapping (uint => gasParameters) private mappFunctionToGasParameters;

  struct user
  {
    string ipfsImage;
    string snapShat;
    string name;
  }

  struct gasParameters
  {
    string functionName;
    uint gasPrice;
    uint gasLimit;
  }

  constructor() public {
    mappFunctionToGasParameters[0].functionName = "ask";
    mappFunctionToGasParameters[0].gasPrice = 5;
    mappFunctionToGasParameters[0].gasLimit = 500000;
    mappFunctionToGasParameters[1].functionName = "transferGroupOwnership";
    mappFunctionToGasParameters[1].gasPrice = 5;
    mappFunctionToGasParameters[1].gasLimit = 500000;
    mappFunctionToGasParameters[2].functionName = "setUser";
    mappFunctionToGasParameters[2].gasPrice = 5;
    mappFunctionToGasParameters[2].gasLimit = 110000;
    mappFunctionToGasParameters[3].functionName = "createGroup";
    mappFunctionToGasParameters[3].gasPrice = 5;
    mappFunctionToGasParameters[3].gasLimit = 500000;
    mappFunctionToGasParameters[4].functionName = "createProfile";
    mappFunctionToGasParameters[4].gasPrice = 5;
    mappFunctionToGasParameters[4].gasLimit = 500000;
    mappFunctionToGasParameters[5].functionName = "askForFunds";
    mappFunctionToGasParameters[5].gasPrice = 5;
    mappFunctionToGasParameters[5].gasLimit = 150000;
    mappFunctionToGasParameters[6].functionName = "withdrawFunds";
    mappFunctionToGasParameters[6].gasPrice = 5;
    mappFunctionToGasParameters[6].gasLimit = 1500000;
    mappFunctionToGasParameters[7].functionName = "removeMember";
    mappFunctionToGasParameters[7].gasLimit = 50000;
    mappFunctionToGasParameters[7].gasPrice = 5;
    mappFunctionToGasParameters[8].functionName = "quitGroup";
    mappFunctionToGasParameters[8].gasPrice = 5;
    mappFunctionToGasParameters[8].gasLimit = 50000;
    mappFunctionToGasParameters[9].functionName = "defaultTransaction";
    mappFunctionToGasParameters[9].gasPrice = 5;
    mappFunctionToGasParameters[9].gasLimit = 41000;
    mappFunctionToGasParameters[10].functionName = "createPassword";
    mappFunctionToGasParameters[10].gasPrice = 5;
    mappFunctionToGasParameters[10].gasLimit = 45000;
    mappFunctionToGasParameters[11].functionName = "payForFunds";
    mappFunctionToGasParameters[11].gasPrice = 5;
    mappFunctionToGasParameters[11].gasLimit = 1500000;
    owner = msg.sender;
  }

  function setPowerToken(address _tgts) public onlyOwner
  {
    require(powerToken == address(0));
    powerToken = _tgts;
    TGTSToken = External3(powerToken);
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

  function verifyRegistration() public view returns (uint)
  {
    if (userPassword[msg.sender] == 0)
    {
      return 0;
    }
    else return 1;
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

  function connectUser(string memory _password) public view returns (uint)
  {
    if (returnHash(_password) == userPassword[msg.sender]
    && lockedAccount[msg.sender] == false)
    {
      return 1;
    }
    else return 0;
  }

  function setUserInfo(string memory name, string memory snapShat, string memory ipfsImage) public
  {
    mappAddressToOptionalUserInfo[msg.sender].ipfsImage = ipfsImage;
    mappAddressToOptionalUserInfo[msg.sender].snapShat = snapShat;
    mappAddressToOptionalUserInfo[msg.sender].name = name;
  }

  function eraseInfo() public
  {
    mappAddressToOptionalUserInfo[msg.sender].ipfsImage = "";
    mappAddressToOptionalUserInfo[msg.sender].snapShat = "";
    mappAddressToOptionalUserInfo[msg.sender].name = "";
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

  function getName(address _user) view public returns (string memory)
  {
    return mappAddressToOptionalUserInfo[_user].name;
  }

  function getSnapshat(address _user) view public returns (string memory)
  {
    return mappAddressToOptionalUserInfo[_user].snapShat;
  }

}
