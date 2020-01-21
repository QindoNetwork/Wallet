pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./Administration.sol";

contract Togethers is Administration {

  mapping (address => string) public mappAddressToUser;
  mapping (uint => string) public mappGroupIDToGroupName;
  mapping (uint => mapping (address => profile)) public mappProfileInGroup;
  mapping (address => uint[]) public mappGroupsForAddress;
  mapping (uint => address[]) public mappUsersInGroup;
  mapping (uint => address) public checkNameUnicity;
  mapping (address => mapping (uint => bool)) public mappAskForAdd;

  struct profile
  {
    bool isMember;
    bool open;
    bool owner;
    uint DemandID;
  }

  External1 public TGTU;
  External1 public TGTE;

  constructor() public {
    owner = msg.sender;
    ID = 2;
    checkNameUnicity[returnHash("Togethers")] = address(this);
    TGTU = External1(0x90D6fEd293786Ac81A32fac426191e4BE73B8155); // change
    TGTE = External1(0x90D6fEd293786Ac81A32fac426191e4BE73B8155); // change
  }

  function ask(uint _groupID) public
  {
    require(getUsersLength(_groupID) > 0);
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
    mappSpaceInfo[ID].user = msg.sender;
    mappSpaceInfo[ID].description = _description;
    emit newDemand(ID,msg.sender);
    ID += 1;
  }

  function payForFunds(address _publicKey,  uint groupID, uint _tokenAmount, address _crypto) public payable
  {
    require(stop == false);
    require(mappProfileInGroup[groupID][_publicKey].open == true);
    require(mappProfileInGroup[groupID][msg.sender].isMember == true);
    uint amount;
    uint index;
    if (_crypto == address(0))
    {
      require(_tokenAmount > 0);
      amount = msg.value;
      index = 0;
    }
    else
    {
      require(msg.value == 0);
      require(_tokenAmount != 0);
      require(mappCryptoEnable[_crypto] == true);
      amount = _tokenAmount;
      index = 1;
      if (mappAllowCryptoForUS[_crypto] == true)
      {
        mappGiven[mappProfileInGroup[groupID][_publicKey].DemandID][2].add(amount);
        External2(_crypto).transferFrom(msg.sender,address(this),_tokenAmount);
      }
      if (mappAllowCryptoForEU[_crypto] == true)
      {
        mappGiven[mappProfileInGroup[groupID][_publicKey].DemandID][1].add(amount);
        External2(_crypto).transferFrom(msg.sender,address(this),_tokenAmount);
      }
    }
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
      TGTE.mintExternal(msg.sender,mappGiven[DemandID][1]);
    }
    if (mappGiven[DemandID][2] > 0)
    {
      TGTU.mintExternal(msg.sender,mappGiven[DemandID][2]);
    }
  }

  function changeToken(uint _tokenAmount, address _crypto) public
  {
    if (mappAllowCryptoForUS[_crypto] == true)
    {
      TGTU.burnExternal(msg.sender,_tokenAmount);
      External2(_crypto).transfer(msg.sender,_tokenAmount);
    }
    if (mappAllowCryptoForEU[_crypto] == true)
    {
      TGTE.burnExternal(msg.sender,_tokenAmount);
      External2(_crypto).transfer(msg.sender,_tokenAmount);
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

  function getUserName(uint _group, uint _num) view public returns (string memory)
  {
    if (_num >= getUsersLength(_group))
    {
      return "";
    }
    return mappAddressToUser[mappUsersInGroup[_group][_num]];
  }

  function getGroup(uint _num) view public returns (string memory)
  {
    return mappGroupIDToGroupName[mappGroupsForAddress[msg.sender][_num]];
  }

  function getAddressFromName(string memory _name) view public returns (address)
  {
    return checkNameUnicity[returnHash(_name)];
  }

  function getUserAddress(uint _group, uint _num) view public returns (address)
  {
    if (_num >= getUsersLength(_group))
    {
      return address(0);
    }
    return mappUsersInGroup[_group][_num];
  }

  function getGroupID(uint _num) view public returns (uint)
  {
    return mappGroupsForAddress[msg.sender][_num];
  }

  function getGroupsLength(address _key) view public returns (uint)
  {
    return mappGroupsForAddress[_key].length;
  }

  function getUsersInGroup(uint groupID) view public returns (address[] memory)
  {
    return mappUsersInGroup[groupID];
  }

  function getUsersGroups() view public returns (uint[] memory)
  {
    return mappGroupsForAddress[msg.sender];
  }

  function getUsersLength(uint _group) view public returns (uint)
  {
    return mappUsersInGroup[_group].length;
  }

  function getUserFriends(address user) view public returns (address[] memory)
  {
    address[] memory profiles;
    uint index;
    uint groupLength = getGroupsLength(user);
    for ( uint i = 0; i < groupLength; i++ ) {
        uint groupID = getGroupID(i);
        uint userLength = getUsersLength(groupID);
        if ( userLength > 1 ) {
          for ( uint j = 0; j < userLength; j++ ) {
             bool ok = true;
             address currentAddress = getUserAddress(groupID,j);
             if ( currentAddress != user) {
              for ( uint k = 0; k < profiles.length; k++ ) {
                   if ( profiles[k] == currentAddress) {
                     ok = false;
                     break;
                   }
               }
               if ( ok == true ) {
                 profiles[index] = currentAddress;
                 index += 1;
               }
             }
           }
        }
    }
    return profiles;
  }

  function getSpaceID(uint groupID, address _user) view public returns (uint)
  {
    return mappProfileInGroup[groupID][_user].DemandID;
  }

  function isMemmber(uint groupID, address _user) view public returns (uint)
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

}
