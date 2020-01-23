pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./Administration.sol";

contract Togethers is Administration {

  mapping (address => string) public mappAddressToUser;
  mapping (uint => string) public mappGroupIDToGroupName;
  mapping (uint => mapping (address => profile)) private mappProfileInGroup;
  mapping (address => uint[]) private mappGroupsForAddress;
  mapping (uint => address[]) private mappUsersInGroup;
  mapping (uint => address) public checkNameUnicity;
  mapping (address => mapping (uint => bool)) public mappAskForAdd;

  struct profile
  {
    bool isMember;
    bool open;
    bool owner;
    uint DemandID;
    string description;
  }

  External1 public TTUSD;
  External1 public TTEUR;

  constructor() public {
    owner = msg.sender;
    ID = 2;
    checkNameUnicity[returnHash("Togethers")] = address(this);
    TTUSD = External1(0xB2cF75ac68F49976fA256905F6629d15AC76e851);
    TTEUR = External1(0x6473EF312B1775fb06Ed44b1ce987171F81fDdE3);
    addCryptoToList(0x935b36B0b591eFEF7D1293c333e294c8867CEB22);
    addCryptoToList(0x6687708159B8165b793e6928868BE2627C412900);
    addCryptoToList(0x7eF2665272DC22d477ca3b20f8d41b8110F94c48);
    addStablecoinToList(0x935b36B0b591eFEF7D1293c333e294c8867CEB22);
    addStablecoinToList(0x6687708159B8165b793e6928868BE2627C412900);
    addStablecoinToList(0x7eF2665272DC22d477ca3b20f8d41b8110F94c48);
    enableCrypto(0x935b36B0b591eFEF7D1293c333e294c8867CEB22);
    enableCrypto(0x6687708159B8165b793e6928868BE2627C412900);
    enableCrypto(0x7eF2665272DC22d477ca3b20f8d41b8110F94c48);
    allowCryptoForUS(0x935b36B0b591eFEF7D1293c333e294c8867CEB22);
    allowCryptoForEU(0x6687708159B8165b793e6928868BE2627C412900);
    allowCryptoForEU(0x7eF2665272DC22d477ca3b20f8d41b8110F94c48);
  }

  function ask(uint _groupID) public
  {
    require(mappUsersInGroup[_groupID].length > 0);
    require(mappProfileInGroup[_groupID][msg.sender].isMember == false);
    require(mappAskForAdd[msg.sender][_groupID] == false);
    mappAskForAdd[msg.sender][_groupID] = true;
  }

  function transferGroupOwnership(uint _groupID, address newOwner) public
  {
    require(mappProfileInGroup[_groupID][msg.sender].owner == true);
    require(mappProfileInGroup[_groupID][newOwner].isMember == true);
    mappProfileInGroup[_groupID][msg.sender].owner = false;
    mappProfileInGroup[_groupID][newOwner].owner = true;
  }

  function setUser(string memory _pseudo, string memory _password) public
  {
    uint currentID = returnHash(_pseudo);
    require(checkNameUnicity[currentID] == address(0));
    createPassword(_password);
    checkNameUnicity[currentID] = msg.sender;
    mappAddressToUser[msg.sender] = _pseudo;
  }

  function changeUserName(string memory _pseudo) public
  {
    require(userPassword[msg.sender] != 0);
    uint currentID = returnHash(_pseudo);
    require(checkNameUnicity[currentID] == address(0));
    checkNameUnicity[returnHash(mappAddressToUser[msg.sender])] = address(0);
    checkNameUnicity[currentID] = msg.sender;
    mappAddressToUser[msg.sender] = _pseudo;
  }

  function createGroup(string memory _groupName) public
  {
    groupNumber += 1;
    mappProfileInGroup[groupNumber][msg.sender].owner = true;
    mappGroupIDToGroupName[groupNumber] = _groupName;
    mappAskForAdd[msg.sender][groupNumber] = true;
    addMember(groupNumber,msg.sender);
  }

  function verifyUserAvailability(string memory _pseudo) public view returns (uint)
  {
    uint currentID = returnHash(_pseudo);
    if (checkNameUnicity[currentID] == address(0))
    {
      return 1;
    }
    return 0;
  }

  function verifyGroupAsked(uint groupNumber, address _key) public view returns (uint)
  {
    if (mappAskForAdd[_key][groupNumber] == true)
    {
      return 1;
    }
    return 0;
  }

  function addMember(uint _groupID, address _key) private
  {
    require(mappProfileInGroup[_groupID][msg.sender].owner == true);
    bool isRegisterd;
    for (uint i = 0; i < mappGroupsForAddress[_key].length; i++)
    {
      if (mappGroupsForAddress[_key][i] == _groupID)
      {
        isRegisterd = true;
        break;
      }
    }
    if (isRegisterd == false)
    {
      mappGroupsForAddress[_key].push(_groupID);
      mappUsersInGroup[_groupID].push(_key);
    }
    mappProfileInGroup[_groupID][_key].isMember = true;
  }

  function createProfile(uint groupID, address _key) public
  {
    require(mappProfileInGroup[groupID][_key].isMember == false);
    require(mappAskForAdd[_key][groupID] == true);
    addMember(groupID,_key);
  }

  function askForFunds(uint groupID, string memory _description) public
  {
    require(stop == false);
    require(mappProfileInGroup[groupID][msg.sender].open == false);
    require(mappProfileInGroup[groupID][msg.sender].isMember == true);
    mappProfileInGroup[groupID][msg.sender].open = true;
    mappProfileInGroup[groupID][msg.sender].DemandID = ID;
    mappProfileInGroup[groupID][msg.sender].description = _description;
    emit newDemand(ID,msg.sender,groupID);
    ID += 1;
  }

  function payForFunds(address _publicKey,  uint groupID, uint _tokenAmount, address _crypto) public payable
  {
    require(stop == false);
    require(mappProfileInGroup[groupID][_publicKey].open == true);
    require(mappProfileInGroup[groupID][msg.sender].isMember == true);
    uint amount;
    uint family;
    if (_crypto == address(0))
    {
      require(_tokenAmount > 0);
      amount = msg.value;
    }
    else
    {
      require(msg.value == 0);
      require(_tokenAmount != 0);
      require(mappCryptoEnable[_crypto] == true);
      amount = _tokenAmount;
      if (mappAllowCryptoForUS[_crypto] == true)
      {
        family = 2;
      }
      if (mappAllowCryptoForEU[_crypto] == true)
      {
        family = 1;
      }
      require(family != 0);
      External1(_crypto).transferFrom(msg.sender,address(this),_tokenAmount);
    }
    mappGiven[mappProfileInGroup[groupID][_publicKey].DemandID][family].add(amount);
    emit payDemand(msg.sender,_publicKey);
  }

  function withdrawFunds(uint groupID) public
  {
    require(mappProfileInGroup[groupID][msg.sender].open == true);
    mappProfileInGroup[groupID][msg.sender].open = false;
    uint DemandID = mappProfileInGroup[groupID][msg.sender].DemandID;
    if (mappGiven[DemandID][0] > 0)
    {
      msg.sender.transfer(mappGiven[DemandID][0]);
    }
    if (mappGiven[DemandID][1] > 0)
    {
      TTEUR.mintExternal(msg.sender,mappGiven[DemandID][1]);
    }
    if (mappGiven[DemandID][2] > 0)
    {
      TTUSD.mintExternal(msg.sender,mappGiven[DemandID][2]);
    }
  }

  function changeToken(uint _tokenAmount, address _crypto) public
  {
    require(mappCryptoEnable[_crypto] == true);
    require(External1(_crypto).balanceOf(msg.sender) >= _tokenAmount);
    if (mappAllowCryptoForUS[_crypto] == true)
    {
      require(TTUSD.balanceOf(msg.sender) >= _tokenAmount);
      TTUSD.burnExternal(msg.sender,_tokenAmount);
      External1(_crypto).transfer(msg.sender,_tokenAmount);
    }
    if (mappAllowCryptoForEU[_crypto] == true)
    {
      require(TTEUR.balanceOf(msg.sender) >= _tokenAmount);
      TTEUR.burnExternal(msg.sender,_tokenAmount);
      External1(_crypto).transfer(msg.sender,_tokenAmount);
    }
  }

  function removeMember(address _publicKey, uint groupID) public
  {
    require(_publicKey != msg.sender);
    require(mappProfileInGroup[groupID][msg.sender].isMember == true);
    require(mappProfileInGroup[groupID][msg.sender].owner == true);
    deleteProfile(groupID,_publicKey);
  }

  function quitGroup(uint _groupID) public
  {
    require(mappProfileInGroup[_groupID][msg.sender].owner == false || mappUsersInGroup[_groupID].length == 1);
    if (mappProfileInGroup[_groupID][msg.sender].owner == true)
    {
      mappProfileInGroup[_groupID][msg.sender].owner = false;
    }
    deleteProfile(_groupID,msg.sender);
  }

  function deleteProfile(uint _groupID, address _publicKey) private
  {
    require(mappProfileInGroup[_groupID][_publicKey].isMember == true);
    require(mappProfileInGroup[_groupID][_publicKey].open == false);
    mappProfileInGroup[_groupID][_publicKey].isMember = false;
    mappAskForAdd[_publicKey][_groupID] = false;
  }

  function getSpaceID(uint groupID, address _user) view public returns (uint)
  {
    return mappProfileInGroup[groupID][_user].DemandID;
  }

  function isMember(uint groupID, address _user) view public returns (uint)
  {
    if (mappProfileInGroup[groupID][_user].isMember == true)
    {
      return 1;
    }
    return 0;
  }

  function isOwner(uint groupID, address _user) view public returns (uint)
  {
    if (mappProfileInGroup[groupID][_user].owner == true)
    {
      return 1;
    }
    return 0;
  }

  function isOpen(uint groupID, address _user) view public returns (uint)
  {
    if (mappProfileInGroup[groupID][_user].open == true)
    {
      return 1;
    }
    return 0;
  }

  function getDescription(uint groupID, address _user) view public returns (string memory)
  {
    return mappProfileInGroup[groupID][_user].description;
  }

  function getGroups() view public returns (uint[] memory)
  {
    return mappGroupsForAddress[msg.sender];
  }

  function getProfiles(uint _group) view public returns (address[] memory)
  {
    return mappUsersInGroup[_group];
  }

}
