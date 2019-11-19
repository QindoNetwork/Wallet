pragma solidity ^0.5.0;

import "./Administration.sol";

contract Togethers is Administration {

  event newDemand(uint indexed ID);
  event payDemand(uint indexed ID);
  event endDemand(uint indexed ID);

  mapping (address => mapping (address => mapping (uint => uint))) public mappStatsPeerToPeer;
  mapping (uint => mapping (address => mapping (uint => uint))) public mappGiven;
  mapping (address => user) public mappAddressToUser;
  mapping (uint => spaceInfo) public mappSpaceInfo;
  mapping (uint => string) public mappGroupIDToGroupName;
  mapping (uint => mapping (address => profile)) public mappProfileInGroup;
  mapping (address => uint[]) public mappGroupsForAddress;
  mapping (uint => address[]) public mappUsersInGroup;
  mapping (uint => address) public checkNameUnicity;
  mapping (uint => address) public checkGroupUnicity;
  mapping (address => mapping (uint => bool)) public mappAskForAdd;
  mapping (uint => mapping (address => mapping (uint => uint))) public mappLockPay;
  mapping (uint => uint) public mappNbDemandsInGroup;

  struct user
  {
    string name;
    string pseudo;
    string ipfsImage;
    uint language;
  }

  struct profile
  {
    bool isMember;
    bool open;
    bool owner;
    uint DemandID;
  }

  struct spaceInfo
  {
    string description;
    uint language;
  }

  constructor(address tgtc) public {
    owner = msg.sender;
    TGTCToken = External2(tgtc);
  }

  function returnHash(string memory _char) public pure returns (uint)
  {
    return uint(keccak256(bytes(_char)));
  }

  function setThirdParty(address _tgts) onlyOwner public
  {
    TGTSToken = External2(_tgts);
    require(TGTSToken.ID() == 1);
  }

  function ask(string memory _groupName) public
  {
    uint currentID = returnHash(_groupName);
    require(getUsersLength(currentID) > 0);
    require(mappAddressToUser[msg.sender].language != 0);
    require(mappAskForAdd[msg.sender][currentID] == false);
    mappAskForAdd[msg.sender][currentID] = true;
  }

  function transferGroupOwnership(uint _groupID, address newOwner) public
  {
    require(mappProfileInGroup[_groupID][msg.sender].owner == true);
    require(mappProfileInGroup[_groupID][newOwner].isMember == true);
    mappProfileInGroup[_groupID][msg.sender].owner = false;
    mappProfileInGroup[_groupID][newOwner].owner = true;
  }

  function setUser(string memory _pseudo, string memory _ipfsImage, string memory _userName, uint _language) public
  {
    uint currentID = returnHash(_pseudo);
    require(checkNameUnicity[currentID] == address(0));
    checkNameUnicity[currentID] = msg.sender;
    mappAskForAdd[msg.sender][currentID] = true;
    mappAddressToUser[msg.sender].name = _userName;
    mappAddressToUser[msg.sender].pseudo = _pseudo;
    mappAddressToUser[msg.sender].language = _language;
    mappAddressToUser[msg.sender].ipfsImage = _ipfsImage;
  }

  function createGroup(string memory _groupName) public
  {
    require(mappAddressToUser[msg.sender].language != 0);
    uint groupID = returnHash(_groupName);
    require(checkGroupUnicity[groupID] == address(0));
    mappProfileInGroup[groupID][msg.sender].owner = true;
    mappGroupIDToGroupName[groupID] = _groupName;
    checkGroupUnicity[groupID] = msg.sender;
    addMember(groupID,msg.sender);
  }

  function addMember(uint _groupID, address _key) private
  {
    mappProfileInGroup[_groupID][_key].isMember = true;
    mappGroupsForAddress[_key].push(_groupID);
    mappUsersInGroup[_groupID].push(_key);
  }

  function createProfile(uint groupID, string memory _pseudo) public
  {
    uint currentID = returnHash(_pseudo);
    address _publicKey = checkNameUnicity[currentID];
    require(mappProfileInGroup[groupID][_publicKey].isMember == false);
    require(mappProfileInGroup[groupID][msg.sender].owner == true);
    require(mappAskForAdd[_publicKey][groupID] == true);
    require(getGroupsLength() < 200);
    require(getUsersLength(groupID) < 200);
    addMember(groupID,_publicKey);
  }

  function askForFunds(uint[] memory groupID, string memory _description) public
  {
    uint j;
    require(groupID.length <= getGroupsLength());
    for (uint i = 0; i < groupID.length; i++)
    {
      if (mappProfileInGroup[groupID[i]][msg.sender].open == false
        && mappProfileInGroup[groupID[i]][msg.sender].isMember == true)
      {
        mappProfileInGroup[groupID[i]][msg.sender].open = true;
        mappProfileInGroup[groupID[i]][msg.sender].DemandID = ID;
        mappSpaceInfo[ID].language = mappAddressToUser[msg.sender].language;
        mappSpaceInfo[ID].description = _description;
        emit newDemand(ID);
        mappNbDemandsInGroup[groupID[i]] += 1;
        ID += 1;
        j += 1;
      }
    }
    if (j > 0 && TGTCToken.balanceOf(owner) < TGTCToken.totalSupply().div(2))
    {
      TGTCToken.mintExternal(owner,j.mul(switchReward()));
    }
  }

  function payForFunds(address _publicKey,  uint groupID, uint _tokenAmount, uint _crypto) public payable
  {
    require(mappProfileInGroup[groupID][_publicKey].open == true);
    require(mappProfileInGroup[groupID][msg.sender].isMember == true);
    require(_crypto < getSize() && disableCrypto[_crypto] == false);
    uint amount;
    if (_crypto == 0)
    {
      require(_tokenAmount == 0);
      require(msg.value != 0);
      amount = msg.value;
    }
    else
    {
      require(msg.value == 0);
      require(_tokenAmount != 0);
      External2(getTokenAddress(_crypto)).transferFrom(msg.sender,address(this),_tokenAmount);
      amount = _tokenAmount;
    }
    mappLockPay[mappProfileInGroup[groupID][_publicKey].DemandID][msg.sender][_crypto] += amount;
    mappStatsPeerToPeer[msg.sender][_publicKey][_crypto] += amount;
    if (checkIsEmpty(groupID) == true)
    {
      TGTCToken.mintExternal(msg.sender,switchReward());
    }
    mappGiven[groupID][_publicKey][_crypto] += amount;
    emit payDemand(ID);
  }

  function withdrawFunds(uint groupID) public
  {
    require(mappProfileInGroup[groupID][msg.sender].open == true);
    mappProfileInGroup[groupID][msg.sender].open = false;
    mappNbDemandsInGroup[groupID] -= 1;
    if (checkIsEmpty(groupID) == false)
    {
      for(uint i = 0 ; i < getSize() ; i++)
      {
        if (mappGiven[groupID][msg.sender][i] > 0 && stopCrypto[i] == false)
        {
          if (i == 0)
          {
            msg.sender.transfer(mappGiven[groupID][msg.sender][i]);
          }
          else
          {
            External2(getTokenAddress(i)).transfer(msg.sender,mappGiven[groupID][msg.sender][i]);
          }
          mappGiven[groupID][msg.sender][i] = 0;
        }
      }
      emit endDemand(ID);
      if (TGTSToken.getApproved(mappProfileInGroup[groupID][msg.sender].DemandID) != address(0))
      {
        TGTCToken.mintExternal(msg.sender,switchReward().mul(2));
      }
      else TGTCToken.mintExternal(msg.sender,switchReward());
    }
  }

  function checkIsEmpty(uint groupID) private view returns (bool)
  {
    for(uint i = 0 ; i < getSize() ; i++)
    {
      if (mappGiven[groupID][msg.sender][i] > 0)
      {
        return false;
      }
    }
    return true;
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
    || mappUsersInGroup[_groupID].length != 1);
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
    if (getUsersLength(_groupID) == 0)
    {
      checkGroupUnicity[_groupID] = address(0);
    }
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

  function getUserName2(uint _group, uint _num) view public returns (string memory)
  {
    if (_num >= getUsersLength(_group))
    {
      return "";
    }
    return mappAddressToUser[mappUsersInGroup[_group][_num]].name;
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

}
