pragma solidity ^0.5.0;

import "../owner/Ownable.sol";

contract Control is Ownable {

  mapping (address => uint) private userPassword;
  mapping (address => bool) private isRegistered;
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
    string functionName;
    uint gasPrice;
    uint gasLimit;
  }

  constructor(address _tgts) public {
    uint gwei = 1000000000;
    uint defaultGasPrice = 4000000000 * gwei;
    uint defaultGasLimit = 21000 * gwei;
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
    mappFunctionToGasParameters[8].functionName = "defaultTransaction";
    mappFunctionToGasParameters[8].gasPrice = defaultGasPrice;
    mappFunctionToGasParameters[8].gasLimit = defaultGasLimit;
    mappFunctionToGasParameters[9].functionName = "createPassword";
    mappFunctionToGasParameters[9].gasPrice = defaultGasPrice;
    mappFunctionToGasParameters[9].gasLimit = defaultGasLimit;
    owner = msg.sender;
    //TGTSToken = External3(0xDDeB78A777c424F74B95c2AD29ec7B9a20802116);
    TGTSToken = External3(_tgts);
  }

  function createPassword(string memory _password) public
  {
    require(userPassword[msg.sender] == 0);
    userPassword[msg.sender] = returnHash(_password);
    isRegistered[msg.sender] = true;
  }

  function changePassword(string memory NewPassword, string memory oldPassword) public
  {
    uint newHash = returnHash(NewPassword);
    require(newHash == returnHash(oldPassword));
    userPassword[msg.sender] = newHash;
  }

  function verifyRegistration() public view returns (uint)
  {
    if (isRegistered[msg.sender] == false)
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
