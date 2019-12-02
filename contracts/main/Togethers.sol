pragma solidity ^0.5.0;

import "./Administration.sol";

contract Togethers is Administration {

  event newDemand(uint indexed ID, address indexed from);
  event payDemand(uint indexed ID, address indexed from);
  event endDemand(uint indexed ID);

  mapping (address => mapping (address => mapping (uint => uint))) public mappStatsPeerToPeer;
  mapping (address => user) private mappAddressToUser;
  mapping (uint => string) public mappGroupIDToGroupName;
  mapping (uint => mapping (address => profile)) private mappProfileInGroup;
  mapping (address => uint[]) private mappGroupsForAddress;
  mapping (uint => address[]) private mappUsersInGroup;
  mapping (uint => address) public checkNameUnicity;
  mapping (address => mapping (uint => uint)) public checkGroupUnicity;
  mapping (address => mapping (uint => bool)) public mappAskForAdd;

  struct user
  {
    string pseudo;
    uint language;
    uint blockNumber;
  }

  struct profile
  {
    bool isMember;
    bool open;
    bool owner;
    uint DemandID;
  }

  constructor() public {
    owner = msg.sender;
    MAX = 100;
    ID = 2;
  }

  function ask(uint _groupID) public
  {
    require(getUsersLength(_groupID) > 0);
    require(mappAddressToUser[msg.sender].language != 0);
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

  function setUser(string memory _pseudo, uint _language) public
  {
    uint currentID = returnHash(_pseudo);
    require(checkNameUnicity[currentID] == address(0));
    checkNameUnicity[currentID] = msg.sender;
    mappAskForAdd[msg.sender][currentID] = true;
    mappAddressToUser[msg.sender].pseudo = _pseudo;
    mappAddressToUser[msg.sender].language = _language;
  }

  function createGroup(string memory _groupName) public
  {
    groupNumber += 1;
    require(mappAddressToUser[msg.sender].language != 0);
    require(checkGroupUnicity[msg.sender][returnHash(_groupName)] == 0);
    mappProfileInGroup[groupNumber][msg.sender].owner = true;
    mappGroupIDToGroupName[groupNumber] = _groupName;
    addMember(groupNumber,msg.sender);
  }

  function addMember(uint _groupID, address _key) private
  {
    mappProfileInGroup[_groupID][_key].isMember = true;
    mappGroupsForAddress[_key].push(_groupID);
    mappUsersInGroup[_groupID].push(_key);
    checkGroupUnicity[_key][returnHash(mappGroupIDToGroupName[_groupID])] = _groupID;
  }

  function createProfile(uint groupID, string memory _pseudo) public
  {
    uint currentID = returnHash(_pseudo);
    address _publicKey = checkNameUnicity[currentID];
    require(mappProfileInGroup[groupID][_publicKey].isMember == false);
    require(mappProfileInGroup[groupID][msg.sender].owner == true);
    require(mappAskForAdd[_publicKey][groupID] == true);
    require(getGroupsLength() < MAX);
    require(getUsersLength(groupID) < MAX);
    addMember(groupID,_publicKey);
  }

  function askForFunds(uint groupID, string memory _description, uint _fees) public payable
  {
    require(msg.value == _fees);
    require(mappProfileInGroup[groupID][msg.sender].open == false);
    require(mappProfileInGroup[groupID][msg.sender].isMember == true);
    box.add(_fees);
    mappProfileInGroup[groupID][msg.sender].open = true;
    mappProfileInGroup[groupID][msg.sender].DemandID = ID;
    mappAddressToUser[msg.sender].blockNumber = block.number;
    mappSpaceInfo[ID].language = mappAddressToUser[msg.sender].language;
    mappSpaceInfo[ID].description = _description;
    nbDemands += 1;
    emit newDemand(ID,msg.sender);
    ID += 1;
    External2(getTokenAddress(1)).mintExternal(getTokenAddress(1),tgtcAmount);
  }

  function payForFunds(address _publicKey,  uint groupID, uint _tokenAmount, uint _crypto, uint _fees) public payable
  {
    require(msg.value >= _fees);
    require(mappProfileInGroup[groupID][_publicKey].open == true);
    require(mappProfileInGroup[groupID][msg.sender].isMember == true);
    require(_crypto < getSize() && disableCrypto[_crypto] == false);
    uint amount;
    if (_crypto == 0)
    {
      amount = msg.value.sub(_fees);
    }
    else
    {
      require(_tokenAmount != 0);
      External2(getTokenAddress(_crypto)).transferFrom(msg.sender,address(this),_tokenAmount);
      amount = _tokenAmount;
    }
    mappStatsPeerToPeer[msg.sender][_publicKey][_crypto].add(amount);
    mappGiven[groupID][_publicKey][_crypto].add(amount);
    box.add(_fees);
    emit payDemand(ID,msg.sender);
  }

  function withdrawFunds(uint groupID) public returns (uint)
  {
    require(mappProfileInGroup[groupID][msg.sender].open == true);
    uint bonus;
    mappProfileInGroup[groupID][msg.sender].open = false;
    if (checkIsEmpty(groupID) == false)
    {
      for(uint i = 0 ; i < getSize() ; i++)
      {
        if (mappGiven[groupID][msg.sender][i] > 0 && disableCrypto[i] == false)
        {
          if (i == 0)
          {
            msg.sender.transfer(mappGiven[groupID][msg.sender][i]);
          }
          else External2(getTokenAddress(i)).transfer(msg.sender,mappGiven[groupID][msg.sender][i]);
          mappGiven[groupID][msg.sender][i] = 0;
        }
      }
      if (block.number > mappAddressToUser[msg.sender].blockNumber)
      {
        bonus = box.div(nbDemands);
        if (bonus != 0)
        {
          msg.sender.transfer(bonus);
          box.sub(bonus);
        }
      }
    }
    emit endDemand(mappProfileInGroup[groupID][msg.sender].DemandID);
    nbDemands -= 1;
    return bonus;
  }

  function removeMember(address _publicKey, uint groupID) public
  {
    require(_publicKey != msg.sender);
    require(mappProfileInGroup[groupID][msg.sender].owner == true);
    require(mappProfileInGroup[groupID][_publicKey].isMember == true);
    require(mappProfileInGroup[groupID][_publicKey].open == false);
    deleteProfile(groupID,_publicKey);
  }

  function quitGroup(uint _groupID) public
  {
    require(mappProfileInGroup[_groupID][msg.sender].isMember == true);
    require((mappProfileInGroup[_groupID][msg.sender].owner == true && mappUsersInGroup[_groupID].length == 1)
    || (mappUsersInGroup[_groupID].length != 1 && mappProfileInGroup[_groupID][msg.sender].owner == false));
    require(mappProfileInGroup[_groupID][msg.sender].open == false);
    deleteProfile(_groupID,msg.sender);
  }

  function deleteProfile(uint _groupID, address _publicKey) private
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
    mappProfileInGroup[_groupID][_publicKey].isMember = false;
    mappProfileInGroup[_groupID][_publicKey].owner = false;
    mappProfileInGroup[_groupID][_publicKey].open = false;
    checkGroupUnicity[_publicKey][returnHash(getGroup(_groupID))] = 0;
    mappAskForAdd[_publicKey][_groupID] = false;
  }

  function getUserName(uint _group, uint _num) view public returns (string memory)
  {
    if (_num >= getUsersLength(_group))
    {
      return "";
    }
    return mappAddressToUser[mappUsersInGroup[_group][_num]].pseudo;
  }

  function getGroup(uint _num) view public returns (string memory)
  {
    return mappGroupIDToGroupName[mappGroupsForAddress[msg.sender][_num]];
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

  function getGroupsLength() view public returns (uint)
  {
    return mappGroupsForAddress[msg.sender].length;
  }

  function getUsersLength(uint _group) view public returns (uint)
  {
    return mappUsersInGroup[_group].length;
  }

  function getUsersLanguage() view public returns (uint)
  {
    return mappAddressToUser[msg.sender].language;
  }

  function isOwner(uint groupID, address _user) view public returns (bool)
  {
    return mappProfileInGroup[groupID][_user].owner;
  }

  function isOpen(uint groupID, address _user) view public returns (bool)
  {
    return mappProfileInGroup[groupID][_user].open;
  }

  function getDemandID(uint groupID, address _user) view public returns (uint)
  {
    return mappProfileInGroup[groupID][_user].DemandID;
  }

}
