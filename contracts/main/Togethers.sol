pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./Administration.sol";

contract Togethers is Administration {

  mapping (uint => string) public mappGroupIDToGroupName;
  mapping (uint => mapping (address => profile)) public mappProfileInGroup;
  mapping (address => uint[]) private mappGroupsForAddress;
  mapping (uint => address[]) private mappUsersInGroup;
  mapping (address => mapping (uint => bool)) private mappAskForAdd;
  mapping (uint => mapping (uint8 => uint)) private mappGiven;

  struct profile
  {
    bool isMember;
    bool open;
    bool owner;
    uint DemandID;
    string description;
  }

  struct stats
  {
    uint USDin;
    uint EURin;
    uint ETHIn;
  }

  External1 public TTUSD;
  External1 public TTEUR;

  constructor() public {
    owner = msg.sender;
    checkNameUnicity[returnHash("Togethers")] = address(this);
    TTUSD = External1(0x9e838F34E40C4680B71Da2fDc9A1Db05F0169292);
    TTEUR = External1(0x8461a630013Bf5ACB33698c6f43Bd09FF3e66c6F);
    cryptoList.push(0x9e838F34E40C4680B71Da2fDc9A1Db05F0169292);
    cryptoList.push(0x8461a630013Bf5ACB33698c6f43Bd09FF3e66c6F);
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
    ID += 1;
  }

  function payForFunds(address _publicKey,  uint groupID, uint _tokenAmount, address _crypto) public payable
  {
    require(stop == false);
    require(_publicKey != msg.sender);
    require(mappProfileInGroup[groupID][_publicKey].open == true);
    require(mappProfileInGroup[groupID][msg.sender].isMember == true);
    uint amount;
    uint8 family;
    if (_crypto == address(0))
    {
      require(_tokenAmount == 0);
      require(msg.value > 0);
      amount = msg.value;
    }
    else
    {
      require(msg.value == 0);
      require(_tokenAmount > 0);
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
      require(External1(_crypto).balanceOf(msg.sender) >= _tokenAmount);
      External1(_crypto).transferFrom(msg.sender,address(this),_tokenAmount);
      amount = _tokenAmount.mul(10**(18-(External1(_crypto).decimals())));
    }
    mappGiven[mappProfileInGroup[groupID][_publicKey].DemandID][family].add(amount);
    emit payDemand(msg.sender,amount,_crypto,mappProfileInGroup[groupID][_publicKey].DemandID);
  }

  function withdrawFunds(uint groupID) public
  {
    require(mappProfileInGroup[groupID][msg.sender].open == true);
    mappProfileInGroup[groupID][msg.sender].open = false;
    uint DemandID = mappProfileInGroup[groupID][msg.sender].DemandID;
    uint money;
    if (mappGiven[DemandID][0] > 0)
    {
      msg.sender.transfer(mappGiven[DemandID][0]);
    }
    if (mappGiven[DemandID][1] > 0)
    {
      if (fees == true)
      {
        money = mappGiven[DemandID][1].div(1000);
        TTEUR.mintExternal(owner,money);
      }
      else
      {
        money = 0;
      }
      TTEUR.mintExternal(msg.sender,mappGiven[DemandID][1].sub(money));
    }
    if (mappGiven[DemandID][2] > 0)
    {
      if (fees == true)
      {
        money = mappGiven[DemandID][2].div(1000);
        TTUSD.mintExternal(owner,money);
      }
      else
      {
        money = 0;
      }
      TTUSD.mintExternal(msg.sender,mappGiven[DemandID][2].sub(money));
    }
  }

  function changeToken(uint _tokenAmount, address _crypto) public
  {
    require(mappCryptoEnable[_crypto] == true);
    uint cryptoAmount = _tokenAmount.mul(10**(-(18-(External1(_crypto).decimals()))));
    require(External1(_crypto).balanceOf(address(this)) >= cryptoAmount);
    if (mappAllowCryptoForUS[_crypto] == true)
    {
      require(TTUSD.balanceOf(msg.sender) >= _tokenAmount);
      TTUSD.burnExternal(msg.sender,_tokenAmount);
      External1(_crypto).transfer(msg.sender,cryptoAmount);
    }
    if (mappAllowCryptoForEU[_crypto] == true)
    {
      require(TTEUR.balanceOf(msg.sender) >= _tokenAmount);
      TTEUR.burnExternal(msg.sender,_tokenAmount);
      External1(_crypto).transfer(msg.sender,cryptoAmount);
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

  function getGroups() view public returns (uint[] memory)
  {
    uint[] memory list;
    uint j;
    for (uint i = 0; i < mappGroupsForAddress[msg.sender].length; i++)
    {
      if (mappProfileInGroup[mappGroupsForAddress[msg.sender][i]][msg.sender].isMember == true)
      {
        list[j] = mappGroupsForAddress[msg.sender][i];
        j++;
      }
    }
    return list;
  }

  function getProfiles(uint _group) view public returns (address[] memory)
  {
    address[] memory list;
    uint j;
    for (uint i = 0; i < mappUsersInGroup[_group].length; i++)
    {
      if (mappProfileInGroup[_group][mappUsersInGroup[_group][i]].isMember == true)
      {
        list[j] = mappUsersInGroup[_group][i];
        j++;
      }
    }
    return list;
  }

  function getCryptoInfo(address _crypto) view public returns (erc20 memory)
  {
    uint decimals = External1(_crypto).decimals();
    string memory symbol = External1(_crypto).symbol();
    string memory name = External1(_crypto).name();
    uint status;
    uint statusU;
    uint statusE;
    if (mappCryptoEnable[_crypto] == false)
    {
      status = 0;
    }
    else status = 1;
    if (mappAllowCryptoForUS[_crypto] == false)
    {
      statusU = 0;
    }
    else statusU = 1;
    if (mappAllowCryptoForEU[_crypto] == false)
    {
      statusE = 0;
    }
    else statusE = 1;
    return erc20(symbol,name,decimals,status,statusU,statusE);
  }

  function getStablecoinList() view public returns (address[] memory)
  {
    return stablecoinList;
  }

  function getCryptoList() view public returns (address[] memory)
  {
    return cryptoList;
  }

  function getGiven(address _user, uint groupID) view public returns (stats memory)
  {
    uint spaceID = mappProfileInGroup[groupID][_user].DemandID;
    uint USDin = mappGiven[spaceID][2];
    uint EURin = mappGiven[spaceID][1];
    uint ETHIn = mappGiven[spaceID][0];
    return stats(USDin,EURin,ETHIn);
  }

}
