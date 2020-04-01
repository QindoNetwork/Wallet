pragma solidity ^0.5.0;

import "../owner/Ownable.sol";

contract Control is Ownable {

  mapping (uint => gasParameters) public mappFunctionToGasParameters;
  mapping (uint => string) public mappUserToIPFSImage;
  mapping (address => string) public mappCryptoToIPFSImage;
  mapping (uint => string) public mappGroupToIPFSImage;

  uint public listLength;

struct gasParameters
{
  string functionName;
  uint gasPrice;
  uint gasLimit;
}

constructor() public {
    mappFunctionToGasParameters[0].functionName = "ask";
    mappFunctionToGasParameters[0].gasPrice = 5;
    mappFunctionToGasParameters[0].gasLimit = 110000;
    mappFunctionToGasParameters[1].functionName = "transferGroupOwnership";
    mappFunctionToGasParameters[1].gasPrice = 5;
    mappFunctionToGasParameters[1].gasLimit = 50000;
    mappFunctionToGasParameters[2].functionName = "setUser";
    mappFunctionToGasParameters[2].gasPrice = 5;
    mappFunctionToGasParameters[2].gasLimit = 100000;
    mappFunctionToGasParameters[3].functionName = "createGroup";
    mappFunctionToGasParameters[3].gasPrice = 5;
    mappFunctionToGasParameters[3].gasLimit = 210000;
    mappFunctionToGasParameters[4].functionName = "createProfile";
    mappFunctionToGasParameters[4].gasPrice = 5;
    mappFunctionToGasParameters[4].gasLimit = 160000;
    mappFunctionToGasParameters[5].functionName = "askForFunds";
    mappFunctionToGasParameters[5].gasPrice = 5;
    mappFunctionToGasParameters[5].gasLimit = 110000;
    mappFunctionToGasParameters[6].functionName = "withdrawFunds";
    mappFunctionToGasParameters[6].gasPrice = 5;
    mappFunctionToGasParameters[6].gasLimit = 125000;
    mappFunctionToGasParameters[7].functionName = "removeMember";
    mappFunctionToGasParameters[7].gasPrice = 5;
    mappFunctionToGasParameters[7].gasLimit = 30000;
    mappFunctionToGasParameters[8].functionName = "quitGroup";
    mappFunctionToGasParameters[8].gasPrice = 5;
    mappFunctionToGasParameters[8].gasLimit = 210000;
    mappFunctionToGasParameters[9].functionName = "defaultTransaction";
    mappFunctionToGasParameters[9].gasPrice = 5;
    mappFunctionToGasParameters[9].gasLimit = 40000;
    mappFunctionToGasParameters[10].functionName = "payForFunds";
    mappFunctionToGasParameters[10].gasPrice = 5;
    mappFunctionToGasParameters[10].gasLimit = 210000;
    mappFunctionToGasParameters[11].functionName = "ERC20allowance";
    mappFunctionToGasParameters[11].gasPrice = 5;
    mappFunctionToGasParameters[11].gasLimit = 60000;
    mappFunctionToGasParameters[12].functionName = "ChangePassword";
    mappFunctionToGasParameters[12].gasPrice = 5;
    mappFunctionToGasParameters[12].gasLimit = 60000;
    mappFunctionToGasParameters[13].functionName = "ChangeUserName";
    mappFunctionToGasParameters[13].gasPrice = 5;
    mappFunctionToGasParameters[13].gasLimit = 70000;
    mappFunctionToGasParameters[14].functionName = "ERC20transfer";
    mappFunctionToGasParameters[14].gasPrice = 5;
    mappFunctionToGasParameters[14].gasLimit = 110000;
    mappFunctionToGasParameters[15].functionName = "ChangeToken";
    mappFunctionToGasParameters[15].gasPrice = 5;
    mappFunctionToGasParameters[15].gasLimit = 110000;
    listLength = 16;
    owner = msg.sender;
  }

  function setGasLimit(uint limit, uint _function)  public onlyOwner
  {
    require(_function <= listLength);
    if (_function == listLength)
    {
      listLength += 1;
    }
    mappFunctionToGasParameters[_function].gasLimit = limit;
  }

  function setGasPrice(uint price, uint _function)  public onlyOwner
  {
    require(_function <= listLength);
    if (_function == listLength)
    {
      listLength += 1;
    }
    mappFunctionToGasParameters[_function].gasPrice = price;
  }

  function setGasFunctionName(string memory name, uint _function)  public onlyOwner
  {
    require(_function <= listLength);
    if (_function == listLength)
    {
      listLength += 1;
    }
    mappFunctionToGasParameters[_function].functionName = name;
  }

  function setCryptoToIPFSImage(string memory ipfs, address crypto)  public onlyOwner
  {
      mappCryptoToIPFSImage[crypto] = ipfs;
  }

  function setUserToIPFSImage(string memory ipfs, uint userID)  public
  {
      mappUserToIPFSImage[userID] = ipfs;
  }

  function setGroupToIPFSImage(string memory ipfs, uint groupID)  public
  {
      mappGroupToIPFSImage[groupID] = ipfs;
  }

  function getGasPrice(uint _function) view public returns (uint)
  {
    return mappFunctionToGasParameters[_function].gasPrice;
  }

  function getGasLimit(uint _function) view public returns (uint)
  {
    return mappFunctionToGasParameters[_function].gasLimit;
  }

  function getGasFunctionName(uint _function) view public returns (string memory)
  {
    return mappFunctionToGasParameters[_function].functionName;
  }

}
