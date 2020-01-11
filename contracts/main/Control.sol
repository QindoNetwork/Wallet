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
    uint phone;
    string email;
    uint birth;
    string personalAddress;
    uint language;
    uint nationality;
    bool gender;
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
    mappFunctionToGasParameters[3].gasLimit = 200000;
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
    mappFunctionToGasParameters[10].functionName = "ChangeSnapshat";
    mappFunctionToGasParameters[10].gasPrice = 5;
    mappFunctionToGasParameters[10].gasLimit = 45000;
    mappFunctionToGasParameters[11].functionName = "payForFunds";
    mappFunctionToGasParameters[11].gasPrice = 5;
    mappFunctionToGasParameters[11].gasLimit = 1500000;
    mappFunctionToGasParameters[12].functionName = "ERC20allowance";
    mappFunctionToGasParameters[12].gasPrice = 5;
    mappFunctionToGasParameters[12].gasLimit = 45000;
    mappFunctionToGasParameters[13].functionName = "ChangePassword";
    mappFunctionToGasParameters[13].gasPrice = 5;
    mappFunctionToGasParameters[13].gasLimit = 45000;
    mappFunctionToGasParameters[14].functionName = "ChangeImage";
    mappFunctionToGasParameters[14].gasPrice = 5;
    mappFunctionToGasParameters[14].gasLimit = 45000;
    mappFunctionToGasParameters[15].functionName = "ChangeUserName";
    mappFunctionToGasParameters[15].gasPrice = 5;
    mappFunctionToGasParameters[15].gasLimit = 45000;
    mappFunctionToGasParameters[16].functionName = "ERC20transfer";
    mappFunctionToGasParameters[16].gasPrice = 5;
    mappFunctionToGasParameters[16].gasLimit = 45000;
    owner = msg.sender;
  }

  address powerToken;

  function setPowerToken(address _tgts) public onlyOwner
  {
    require(powerToken == address(0));
    powerToken = _tgts;
    TGTSToken = External3(_tgts);
  }

  function setAllInformation(uint nationality, bool gender, string personalAddress,
    uint birth, string email, uint phone, uint language, string ipfsImage string snapShat, string name) public
  {
    mappAddressToOptionalUserInfo[msg.sender].nationality = nationality;
    mappAddressToOptionalUserInfo[msg.sender].gender = gender;
    mappAddressToOptionalUserInfo[msg.sender].phone = phone;
    mappAddressToOptionalUserInfo[msg.sender].email = email;
    mappAddressToOptionalUserInfo[msg.sender].personalAddress = personalAddress;
    mappAddressToOptionalUserInfo[msg.sender].language = _language;
    mappAddressToOptionalUserInfo[msg.sender].ipfsImage = ipfsImage;
    mappAddressToOptionalUserInfo[msg.sender].name = name;
    mappAddressToOptionalUserInfo[msg.sender].snapShat = snapShat;
    mappAddressToOptionalUserInfo[msg.sender].birth = birth;
  }

  function setNationality(uint nationality) public
  {
    mappAddressToOptionalUserInfo[msg.sender].nationality = nationality;
  }

  function setGender(uint gender) public
  {
    mappAddressToOptionalUserInfo[msg.sender].gender = gender;
  }

  function setPhone(uint phone) public
  {
    mappAddressToOptionalUserInfo[msg.sender].phone = phone;
  }

  function setEmail(string memory email) public
  {
    mappAddressToOptionalUserInfo[msg.sender].email = email;
  }

  function setBirth(uint birth) public
  {
    mappAddressToOptionalUserInfo[msg.sender].birth = birth;
  }

  function setPersonalAddress(string memory personalAddress) public
  {
    mappAddressToOptionalUserInfo[msg.sender].personalAddress = personalAddress;
  }

  function setLanguage(uint _language) public
  {
    mappAddressToOptionalUserInfo[msg.sender].language = _language;
  }

  function setImage(string memory ipfsImage) public
  {
    mappAddressToOptionalUserInfo[msg.sender].ipfsImage = ipfsImage;
  }

  function setName(string memory name) public
  {
    mappAddressToOptionalUserInfo[msg.sender].name = name;
  }

  function setSnapshat(string memory snapShat) public
  {
    mappAddressToOptionalUserInfo[msg.sender].snapShat = snapShat;
  }

  function setGasLimit(uint limit, uint _function)  public onlyOwner
  {
    mappFunctionToGasParameters[_function].gasLimit = limit;
  }

  function setGasPrice(uint price, uint _function)  public onlyOwner
  {
    mappFunctionToGasParameters[_function].gasPrice = price;
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

  function getLanguage(address _user) view public returns (uint)
  {
    return mappAddressToOptionalUserInfo[_user].language;
  }

  function getNationality(address _user) view public returns (string memory)
  {
    return mappAddressToOptionalUserInfo[_user].nationality = nationality;
  }

  function getGender(address _user) view public returns (bool)
  {
    return mappAddressToOptionalUserInfo[_user].gender = gender;
  }

  function getPhone(address _user) view public returns (uint)
  {
    return mappAddressToOptionalUserInfo[_user].phone = phone;
  }

  function getEmail(address _user) view public returns (string memory)
  {
    return mappAddressToOptionalUserInfo[_user].email = email;
  }

  function getPersonalAddress(address _user) view public returns (string memory)
  {
    return mappAddressToOptionalUserInfo[_user].personalAddress = personalAddress;
  }

  function getBirth(address _user) view public returns (uint)
  {
    return mappAddressToOptionalUserInfo[_user].birth = birth;
  }

}
