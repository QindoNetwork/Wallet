pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./Administration.sol";

contract Togethers is Administration {

  mapping (uint => string) public mappGroupIDToGroupName;
  mapping (uint => mapping (address => profile)) public mappProfileInGroup;
  mapping (address => uint[]) private mappGroupsForAddress;
  mapping (uint => address[]) private mappUsersInGroup;
  mapping (address => mapping (uint => bool)) public mappAskForAdd;
  mapping (address => mapping (address => uint[])) private mappPeerToPeerStats;

  struct profile
  {
    bool isMember;
    bool open;
    bool owner;
    string description;
    uint[] stats;
  }

  uint public groupNumber;

  constructor() public {
    owner = msg.sender;
    checkNameUnicity[returnHash("Togethers")] = address(this);
    homeStableList.push(address(0));
    address ttusd = 0x9e838F34E40C4680B71Da2fDc9A1Db05F0169292;
    address tteur = 0x8461a630013Bf5ACB33698c6f43Bd09FF3e66c6F;
    cryptoList.push(ttusd);
    cryptoList.push(tteur);
    enableCrypto(ttusd);
    enableCrypto(tteur);
    address dai = 0xb3162F1d3E9071001c5286cc0Cd533C3958dc65f;
    address Gemini = 0x6a36989540818bd8686873A2f36E39Ac9Da2e102;
    address Tether = 0x92EB10B521fd63D0a2df10B36f284C150b1Ca17F;
    address Stasis = 0xc3249b1240e44b19c42d8a6d27e15f80376e542d;
    cryptoList.push(dai);
    cryptoList.push(Gemini);
    cryptoList.push(Tether);
    cryptoList.push(Stasis);
    enableCrypto(dai);
    enableCrypto(Gemini);
    enableCrypto(Tether);
    enableCrypto(Stasis);
    homeStableList.push(ttusd);
    homeStableList.push(tteur);
    allowCryptoForCategory(dai,1);
    allowCryptoForCategory(Gemini,1);
    allowCryptoForCategory(Tether,1);
    allowCryptoForCategory(Stasis,2);
    allowCryptoForCategory(ttusd,1);
    allowCryptoForCategory(tteur,2);
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
    require(mappProfileInGroup[groupID][msg.sender].open == false);
    require(mappProfileInGroup[groupID][msg.sender].isMember == true);
    mappProfileInGroup[groupID][msg.sender].open = true;
    mappProfileInGroup[groupID][msg.sender].description = _description;
    emit askEvent(groupID,msg.sender);
  }

  function payForFunds(address _publicKey,  uint groupID, uint _tokenAmount, address _crypto) public payable
  {
    require(_publicKey != msg.sender);
    require(mappProfileInGroup[groupID][_publicKey].open == true);
    require(mappProfileInGroup[groupID][msg.sender].isMember == true);
    uint amount;
    if (_crypto == address(0))
    {
      require(_tokenAmount == 0);
      require(msg.value > 0);
      amount = msg.value;
      mappProfileInGroup[groupID][_publicKey].stats[0].add(amount);
      mappPeerToPeerStats[msg.sender][_publicKey][0].add(amount);
    }
    else
    {
      require(msg.value == 0);
      require(_tokenAmount > 0);
      require(mappCryptoEnable[_crypto] == true);
      amount = _tokenAmount;
      External1(_crypto).transferFrom(msg.sender,address(this),_tokenAmount);
      amount = _tokenAmount.mul(10**(-(18-(External1(_crypto).decimals()))));
      mappProfileInGroup[groupID][_publicKey].stats[mappAllowCryptoForCategory[_crypto]].add(amount);
      mappPeerToPeerStats[msg.sender][_publicKey][mappAllowCryptoForCategory[_crypto]].add(amount);
    }
    emit payEvent(msg.sender,_publicKey,_crypto,amount);
  }

  function withdrawFunds(uint groupID) public
  {
    require(mappProfileInGroup[groupID][msg.sender].open == true);
    mappProfileInGroup[groupID][msg.sender].open = false;
    for(uint i = 0 ; i < homeStableList.length ; i++)
    {
    if (mappProfileInGroup[groupID][msg.sender].stats[i] > 0)
    {
      if ( i == 0 )
      {
        msg.sender.transfer(mappProfileInGroup[groupID][msg.sender].stats[i]);
      }
      else
      {
        External1(homeStableList[i]).mintExternal(msg.sender,mappProfileInGroup[groupID][msg.sender].stats[i]);
      }
      mappProfileInGroup[groupID][msg.sender].stats[i] = 0;
    }
    }
  }

  function changeToken(uint _tokenAmount, address _crypto1, address _crypto2) public
  {
    require(mappCryptoEnable[_crypto1] == true && mappCryptoEnable[_crypto2] == true);
    require(_crypto1 != _crypto2);
    require(mappAllowCryptoForCategory[_crypto1] == mappAllowCryptoForCategory[_crypto2]);
    uint cryptoAmount1 = _tokenAmount.mul(10**(-(18-(External1(_crypto1).decimals()))));
    uint cryptoAmount2 = _tokenAmount.mul(10**(-(18-(External1(_crypto2).decimals()))));
    External1(_crypto1).transferFrom(msg.sender,address(this),cryptoAmount1);
    uint money;
    if (fees > 0)
    {
      money = cryptoAmount2.div(fees);
      External1(_crypto2).transfer(owner,money);
    }
    else
    {
      money = 0;
    }
    External1(_crypto2).transfer(msg.sender,cryptoAmount2.sub(money));
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
    bool notlastOne;
    for (uint i = 0; i < mappUsersInGroup[_groupID].length; i++)
    {
      if (mappProfileInGroup[_groupID][mappUsersInGroup[_groupID][i]].isMember == true && mappUsersInGroup[_groupID][i] != msg.sender)
      {
        notlastOne = true;
        break;
      }
    }
    require(mappProfileInGroup[_groupID][msg.sender].owner == false || notlastOne == false);
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
    return mappGroupsForAddress[msg.sender];
  }

  function getProfiles(uint _group) view public returns (address[] memory)
  {
    return mappUsersInGroup[_group];
  }

  function getCryptoInfo(address _crypto) view public returns (erc20 memory)
  {
    uint decimals = External1(_crypto).decimals();
    string memory symbol = External1(_crypto).symbol();
    string memory name = External1(_crypto).name();
    bool status = mappCryptoEnable[_crypto];
    uint category = mappAllowCryptoForCategory[_crypto];
    return erc20(symbol,name,decimals,status,category);
  }

  function getStats(address from, address to) view public returns (uint[] memory)
  {
    return mappPeerToPeerStats[from][to];
  }

}
