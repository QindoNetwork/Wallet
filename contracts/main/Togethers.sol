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
  mapping (address => mapping (uint => bool)) private mappAskForAdd;
  mapping (uint => mapping (uint8 => uint)) private mappGiven;
  mapping (address => mapping (address => mapping (uint8 => uint))) private mappStats;

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
    uint USDout;
    uint EURin;
    uint EURout;
    uint ETHIn;
    uint ETHOut;
  }

  External1 public TTUSD;
  External1 public TTEUR;

  constructor() public {
    owner = msg.sender;
    checkNameUnicity[returnHash("Togethers")] = address(this);
    TTUSD = External1(0xB2cF75ac68F49976fA256905F6629d15AC76e851);
    TTEUR = External1(0x6473EF312B1775fb06Ed44b1ce987171F81fDdE3);
    address dai = 0xb3162F1d3E9071001c5286cc0Cd533C3958dc65f;
    address Gemini = 0x6a36989540818bd8686873A2f36E39Ac9Da2e102;
    address Tether = 0x92EB10B521fd63D0a2df10B36f284C150b1Ca17F;
    address Stasis = 0xc3249b1240e44b19c42d8a6d27e15f80376e542d;
    addCryptoToList(dai);
    addCryptoToList(Gemini);
    addCryptoToList(Tether);
    addCryptoToList(Stasis);
    addStablecoinToList(dai);
    addStablecoinToList(Gemini);
    addStablecoinToList(Tether);
    addStablecoinToList(Stasis);
    enableCrypto(dai);
    enableCrypto(Gemini);
    enableCrypto(Tether);
    enableCrypto(Stasis);
    allowCryptoForUS(dai);
    allowCryptoForUS(Gemini);
    allowCryptoForUS(Tether);
    allowCryptoForEU(Stasis);
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
    require(mappProfileInGroup[groupID][_publicKey].open == true);
    require(mappProfileInGroup[groupID][msg.sender].isMember == true);
    uint amount;
    uint8 family;
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
      require(External1(_crypto).balanceOf(msg.sender) >= _tokenAmount);
      External1(_crypto).transferFrom(msg.sender,address(this),_tokenAmount);
      amount = _tokenAmount.mul(10**(18-(External1(_crypto).decimals())));
    }
    mappGiven[mappProfileInGroup[groupID][_publicKey].DemandID][family].add(amount);
    mappStats[msg.sender][_publicKey][family].add(amount);
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
    if (mappCryptoEnable[_crypto] == false)
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

  function getStats(address _user) view public returns (stats memory)
  {
    uint USDin = mappStats[msg.sender][_user][2];
    uint USDout = mappStats[_user][msg.sender][2];
    uint EURin = mappStats[msg.sender][_user][1];
    uint EURout = mappStats[_user][msg.sender][1];
    uint ETHIn = mappStats[msg.sender][_user][0];
    uint ETHOut = mappStats[_user][msg.sender][0];
    return stats(USDin,USDout,EURin,EURout,ETHIn,ETHOut);
  }

  function getGiven(address _user, uint groupID) view public returns (stats memory)
  {
    uint spaceID = mappProfileInGroup[groupID][_user].DemandID;
    uint USDin = mappGiven[spaceID][2];
    uint EURin = mappGiven[spaceID][1];
    uint ETHIn = mappGiven[spaceID][0];
    return stats(USDin,0,EURin,0,ETHIn,0);
  }


}
