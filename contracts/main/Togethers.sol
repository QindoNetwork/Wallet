pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./Administration.sol";

contract Togethers is Administration {

  mapping (address => string) public mappAddressToUser;
  mapping (uint => string) private mappGroupIDToGroupName;
  mapping (uint => mapping (address => profile)) private mappProfileInGroup;
  mapping (address => uint[]) public mappGroupsForAddress;
  mapping (uint => address[]) private mappUsersInGroup;
  mapping (uint => address) private checkNameUnicity;
  mapping (address => mapping (uint => bool)) private mappAskForAdd;

  struct profile
  {
    bool isMember;
    bool open;
    bool owner;
    uint DemandID;
  }

  constructor() public {
    owner = msg.sender;
    MAX = 50;
    ID = 2;
    checkNameUnicity[returnHash("Togethers")] = address(this);
    addCryptoToList(0x90D6fEd293786Ac81A32fac426191e4BE73B8155);
  }

  function ask(uint _groupID) public
  {
    require(getUsersLength(_groupID) > 0);
    require(mappProfileInGroup[_groupID][msg.sender].isMember == false);
    require(mappAskForAdd[msg.sender][_groupID] == false);
    require(getGroupsLength(msg.sender) < MAX);
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
    require(getGroupsLength(msg.sender) < MAX);
    mappProfileInGroup[groupNumber][msg.sender].owner = true;
    mappGroupIDToGroupName[groupNumber] = _groupName;
    mappAskForAdd[msg.sender][groupNumber] = true;
    mappCryptoGroupList[groupNumber].push(address(0));
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
    mappProfileInGroup[_groupID][_key].isMember = true;
    mappGroupsForAddress[_key].push(_groupID);
    mappUsersInGroup[_groupID].push(_key);
  }

  function createProfile(uint groupID, address _key) public
  {
    require(mappProfileInGroup[groupID][_key].isMember == false);
    require(mappAskForAdd[_key][groupID] == true);
    require(getGroupsLength(_key) < MAX && getGroupsLength(msg.sender) < MAX && getUsersLength(groupID) < MAX);
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
      External2(_crypto).transferFrom(msg.sender,address(this),_tokenAmount);
      amount = _tokenAmount;
    }
    bool add = true;
    for(uint i = 0 ; i < mappCryptoGroupList[groupID].length ; i++)
    {
      if (mappCryptoGroupList[groupID][i] == _crypto)
      {
        add = false;
        break;
      }
    }
    if (add == true)
    {
      mappCryptoGroupList[groupID].push(_crypto);
    }
    mappGiven[mappProfileInGroup[groupID][_publicKey].DemandID][_crypto].add(amount);
  }

  function withdrawFunds(uint groupID) public
  {
    require(mappProfileInGroup[groupID][msg.sender].open == true);
    mappProfileInGroup[groupID][msg.sender].open = false;
    uint DemandID = mappProfileInGroup[groupID][msg.sender].DemandID;
    for(uint i = 0 ; i <= mappCryptoGroupList[groupID].length ; i++)
      {
      address crypto = mappCryptoGroupList[groupID][i];
        if (mappGiven[DemandID][crypto] > 0)
        {
          if (i == 0)
          {
            if (address(this).balance >= mappGiven[DemandID][crypto])
            {
              msg.sender.transfer(mappGiven[DemandID][crypto]);
              mappGiven[DemandID][crypto] = 0;
            }
            else emit withdrawIssue(msg.sender,crypto,mappGiven[DemandID][crypto]);
          }
          else
          {
            if (External2(crypto).balanceOf(address(this)) >= mappGiven[DemandID][crypto])
            {
              External2(crypto).transfer(msg.sender,mappGiven[DemandID][crypto]);
              mappGiven[DemandID][crypto] = 0;
            }
            else emit withdrawIssue(msg.sender,crypto,mappGiven[DemandID][crypto]);
          }
        }
      }
  }

  function removeMember(address _publicKey, uint groupID) public
  {
    require(_publicKey != msg.sender);
    require(mappProfileInGroup[groupID][_publicKey].isMember == true);
    require(mappProfileInGroup[groupID][msg.sender].owner == true);
    deleteProfile(groupID,_publicKey);
  }

  function quitGroup(uint _groupID) public
  {
    require(mappProfileInGroup[_groupID][msg.sender].owner == false || mappUsersInGroup[_groupID].length == 1);
    deleteProfile(_groupID,msg.sender);
  }

  function deleteProfile(uint _groupID, address _publicKey) private
  {
    require(mappProfileInGroup[_groupID][_publicKey].isMember == true);
    require(mappProfileInGroup[_groupID][_publicKey].open == false);
    initProfileInfo(_groupID,_publicKey);
    deleteProfileInGroup(_groupID,_publicKey);
    deleteGroupForProfile(_groupID,_publicKey);
  }

  function deleteProfileInGroup(uint _groupID, address _publicKey) private
  {
    for(uint i = 0 ; i < mappUsersInGroup[_groupID].length ; i++)
    {
      if (mappUsersInGroup[_groupID][i] == _publicKey)
      {
        for (uint k = i; k < mappUsersInGroup[_groupID].length-1; k++){
            mappUsersInGroup[_groupID][k] = mappUsersInGroup[_groupID][k+1];
        }
        delete mappUsersInGroup[_groupID][mappUsersInGroup[_groupID].length-1];
        mappUsersInGroup[_groupID].length --;
        break;
      }
    }
  }

  function deleteGroupForProfile(uint _groupID, address _publicKey) private
  {
    for(uint j = 0 ; j < mappGroupsForAddress[_publicKey].length ; j++)
    {
      if (mappGroupsForAddress[_publicKey][j] == _groupID)
      {
        for (uint g = j; g < mappGroupsForAddress[_publicKey].length-1; g++){
            mappGroupsForAddress[_publicKey][g] = mappGroupsForAddress[_publicKey][g+1];
        }
        delete mappGroupsForAddress[_publicKey][mappGroupsForAddress[_publicKey].length-1];
        mappGroupsForAddress[_publicKey].length --;
        break;
      }
    }
  }

  function initProfileInfo(uint _groupID, address _publicKey) private
  {
    mappProfileInGroup[_groupID][_publicKey].isMember = false;
    mappProfileInGroup[_groupID][_publicKey].owner = false;
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
             if ( currentAddress != user ) {
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

  function getCryptoPersonalList(address user) view public returns (address[] memory)
  {
    address[] memory list;
    uint index;
    uint groupLength = getGroupsLength(user);
    for ( uint i = 0; i < groupLength; i++ ) {
        uint groupID = getGroupID(i);
        uint listLength = getCryptoGroupListLength(groupID);
        for ( uint j = 0; j < listLength; j++ ) {
             bool ok = true;
             address currentCrypto = getCryptoGroup(groupID,j);
             for ( uint k = 0; k < list.length; k++ ) {
                   if ( list[k] == currentCrypto) {
                     ok = false;
                     break;
                   }
               }
               if ( ok == true ) {
                 list[index] = currentCrypto;
                 index += 1;
               }
             }

    }
    return list;
  }

}
