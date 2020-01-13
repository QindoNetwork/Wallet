pragma solidity ^0.5.0;

import "./Administration.sol";

contract Togethers is Administration {

  mapping (address => string) public mappAddressToUser;
  mapping (uint => string) private mappGroupIDToGroupName;
  mapping (uint => mapping (address => profile)) private mappProfileInGroup;
  mapping (address => uint[]) private mappGroupsForAddress;
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
    useNewToken("Ethers","ETH",address(this),0,0);
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

  function payForFunds(address _publicKey,  uint groupID, uint _tokenAmount, uint _crypto) public payable
  {
    require(stop == false);
    require(mappProfileInGroup[groupID][_publicKey].open == true);
    require(mappProfileInGroup[groupID][msg.sender].isMember == true);
    require(_crypto < getSize() && disableCrypto[_crypto] == false);
    uint amount;
    if (_crypto == 0)
    {
      require(msg.value > 0);
      amount = msg.value;
    }
    else
    {
      require(msg.value == 0);
      require(_tokenAmount != 0);
      External2(getTokenAddress(_crypto)).transferFrom(msg.sender,address(this),_tokenAmount);
      amount = _tokenAmount;
    }
    mappGiven[groupID][_publicKey][_crypto].add(amount);
  }

  function withdrawFunds(uint groupID) public
  {
    require(mappProfileInGroup[groupID][msg.sender].open == true);
    mappProfileInGroup[groupID][msg.sender].open = false;
    if (checkIsEmpty(groupID) == false)
    {
      for(uint i = 0 ; i < getSize() ; i++)
      {
        if (mappGiven[groupID][msg.sender][i] > 0)
        {
          if (i == 0)
          {
            if (address(this).balance >= mappGiven[groupID][msg.sender][i])
            {
              msg.sender.transfer(mappGiven[groupID][msg.sender][i]);
              mappGiven[groupID][msg.sender][i] = 0;
            }
            else emit withdrawIssue(msg.sender,i,mappGiven[groupID][msg.sender][i]);
          }
          else
          {
            if (External2(getTokenAddress(i)).balanceOf(address(this)) >= mappGiven[groupID][msg.sender][i])
            {
              External2(getTokenAddress(i)).transfer(msg.sender,mappGiven[groupID][msg.sender][i]);
              mappGiven[groupID][msg.sender][i] = 0;
            }
            else emit withdrawIssue(msg.sender,i,mappGiven[groupID][msg.sender][i]);
          }
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

}
