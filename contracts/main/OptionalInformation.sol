pragma solidity ^0.5.0;

import "../owner/Ownable.sol";

contract OptionalInformation is Ownable {

  mapping (address => user) private mappAddressToOptionalUserInfo;

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

  constructor() public {
    owner = msg.sender;
  }

  address powerToken;

  function setPowerToken(address _tgts) public onlyOwner
  {
    require(powerToken == address(0));
    powerToken = _tgts;
    TGTSToken = External3(_tgts);
  }

  function setAllInformation(uint nationality, bool gender, string memory personalAddress,
    uint birth, string memory email, uint phone, uint language, string memory ipfsImage, string memory snapShat, string memory name) public
  {
    mappAddressToOptionalUserInfo[msg.sender].nationality = nationality;
    mappAddressToOptionalUserInfo[msg.sender].gender = gender;
    mappAddressToOptionalUserInfo[msg.sender].phone = phone;
    mappAddressToOptionalUserInfo[msg.sender].email = email;
    mappAddressToOptionalUserInfo[msg.sender].personalAddress = personalAddress;
    mappAddressToOptionalUserInfo[msg.sender].language = language;
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
    return mappAddressToOptionalUserInfo[_user].nationality;
  }

  function getGender(address _user) view public returns (bool)
  {
    return mappAddressToOptionalUserInfo[_user].gender;
  }

  function getPhone(address _user) view public returns (uint)
  {
    return mappAddressToOptionalUserInfo[_user].phone;
  }

  function getEmail(address _user) view public returns (string memory)
  {
    return mappAddressToOptionalUserInfo[_user].email;
  }

  function getPersonalAddress(address _user) view public returns (string memory)
  {
    return mappAddressToOptionalUserInfo[_user].personalAddress;
  }

  function getBirth(address _user) view public returns (uint)
  {
    return mappAddressToOptionalUserInfo[_user].birth;
  }

}
