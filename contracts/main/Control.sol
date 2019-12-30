pragma solidity ^0.5.0;

import "../owner/Ownable.sol";

contract Control is Ownable {

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

  address powerToken;

  function setPowerToken(address _tgts) public onlyOwner
  {
    require(powerToken == address(0));
    powerToken = _tgts;
    TGTSToken = External3(_tgts);
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
