pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./Administration.sol";

contract Togethers is Administration {

  mapping (uint => string) public mappGroupIDToGroupName;
  mapping (uint => mapping (address => profile)) public mappProfileInGroup;
  mapping (address => uint[]) private mappGroupsForAddress;
  mapping (uint => address[]) private mappUsersInGroup;
  mapping (address => mapping (uint => bool)) public mappAskForAdd;
  mapping (address => mapping (address => Stats)) public mappPeerToPeerStats;

  struct profile
  {
    bool isMember;
    bool open;
    bool owner;
    string description;
    Stats stats;
  }

  struct Stats
  {
    uint USDin;
    uint EURin;
    uint ETHIn;
    uint Otherin;
  }

  address public constant ttusd = 0x9e838F34E40C4680B71Da2fDc9A1Db05F0169292;
  address public constant tteur = 0x8461a630013Bf5ACB33698c6f43Bd09FF3e66c6F;

  uint groupNumber;

  constructor() public {
    owner = msg.sender;
    checkNameUnicity[returnHash("Togethers")] = address(this);
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
    allowCryptoForUS(dai);
    allowCryptoForUS(Gemini);
    allowCryptoForUS(Tether);
    allowCryptoForEU(Stasis);
    allowCryptoForUS(ttusd);
    allowCryptoForEU(tteur);
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
      mappProfileInGroup[groupID][_publicKey].stats.ETHIn.add(amount);
      mappPeerToPeerStats[msg.sender][_publicKey].ETHIn.add(amount);
    }
    else
    {
      require(msg.value == 0);
      require(_tokenAmount > 0);
      require(mappCryptoEnable[_crypto] == true);
      amount = _tokenAmount;
      External1(_crypto).transferFrom(msg.sender,address(this),_tokenAmount);
      amount = _tokenAmount.mul(10**(-(18-(External1(_crypto).decimals()))));
    if (mappAllowCryptoForEU[_crypto] == true)
    {
       mappProfileInGroup[groupID][_publicKey].stats.EURin.add(amount);
       mappPeerToPeerStats[msg.sender][_publicKey].EURin.add(amount);
    }
    if (mappAllowCryptoForUS[_crypto] == true)
    {
       mappProfileInGroup[groupID][_publicKey].stats.USDin.add(amount);
       mappPeerToPeerStats[msg.sender][_publicKey].USDin.add(amount);
    }
    if (mappAllowCryptoForOther[_crypto] == true)
    {
       mappProfileInGroup[groupID][_publicKey].stats.Otherin.add(amount);
       mappPeerToPeerStats[msg.sender][_publicKey].Otherin.add(amount);
    }
    }
  }

  function withdrawFunds(uint groupID) public
  {
    require(mappProfileInGroup[groupID][msg.sender].open == true);
    mappProfileInGroup[groupID][msg.sender].open = false;
    if (mappProfileInGroup[groupID][msg.sender].stats.ETHIn > 0)
    {
      msg.sender.transfer(mappProfileInGroup[groupID][msg.sender].stats.ETHIn);
      mappProfileInGroup[groupID][msg.sender].stats.ETHIn = 0;
    }
    if (mappProfileInGroup[groupID][msg.sender].stats.EURin > 0)
    {
      External1(tteur).mintExternal(msg.sender,mappProfileInGroup[groupID][msg.sender].stats.EURin);
      mappProfileInGroup[groupID][msg.sender].stats.EURin = 0;
    }
    if (mappProfileInGroup[groupID][msg.sender].stats.USDin > 0)
    {
      External1(ttusd).mintExternal(msg.sender,mappProfileInGroup[groupID][msg.sender].stats.USDin);
      mappProfileInGroup[groupID][msg.sender].stats.USDin = 0;
    }
    if (mappProfileInGroup[groupID][msg.sender].stats.Otherin > 0)
    {
      External1(other).mintExternal(msg.sender,mappProfileInGroup[groupID][msg.sender].stats.Otherin);
      mappProfileInGroup[groupID][msg.sender].stats.Otherin = 0;
    }
  }

  function changeToken(uint _tokenAmount, address _crypto1, address _crypto2) public
  {
    require(mappCryptoEnable[_crypto1] == true && mappCryptoEnable[_crypto2] == true);
    require(_crypto1 != _crypto2);
    require((mappAllowCryptoForUS[_crypto1] == true && mappAllowCryptoForUS[_crypto2] == true) ||
            (mappAllowCryptoForEU[_crypto1] == true && mappAllowCryptoForEU[_crypto2] == true) ||
            (mappAllowCryptoForOther[_crypto1] == true && mappAllowCryptoForOther[_crypto2] == true));
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
    bool statusU = mappAllowCryptoForUS[_crypto];
    bool statusE = mappAllowCryptoForEU[_crypto];
    bool statusO = mappAllowCryptoForOther[_crypto];
    return erc20(symbol,name,decimals,status,statusU,statusE,statusO);
  }

  function getCryptoList() view public returns (address[] memory)
  {
    return cryptoList;
  }

}
