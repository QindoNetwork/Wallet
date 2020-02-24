pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./Administration.sol";

contract Togethers is Administration {

  mapping (uint => string) public mappGroupIDToGroupName;
  mapping (uint => mapping (address => profile)) private mappProfileInGroup;
  mapping (address => uint[]) private mappGroupsForAddress;
  mapping (uint => address[]) private mappUsersInGroup;
  mapping (address => mapping (uint => bool)) public mappAskForAdd;
  mapping (address => mapping (address => mapping (uint8 => uint))) private mappPeerToPeerStats;
  mapping (uint => mapping (address => mapping (uint8 => uint))) public mappProfileStats;
  mapping (uint => mapping (address => mapping (uint8 => uint))) public mappIdStats;

  uint public id;

  struct profile
  {
    bool isMember;
    bool open;
    bool owner;
    string description;
    uint id;
  }

    struct stats
  {
    uint In;
    uint Out;
  }

  uint public groupNumber;

  constructor() public {
    owner = msg.sender;
    checkNameUnicity[returnHash("Togethers")] = address(this);
    homeStableList.push(address(0));
    mappAllowCryptoForCategory[address(0)] = 0;
    stablecoinType[0] = 'NaN';
    address ttusd = 0x2cc0ceF3f0ABD4f1d7Ed6F057c30FF39c93c7958;
    address tteur = 0x2394799D18E30EDCAE0296d03C590Facc9cf60cE;
    cryptoList.push(ttusd);
    cryptoList.push(tteur);
    enableCrypto(ttusd);
    enableCrypto(tteur);
    stablecoinType[1] = 'USD';
    stablecoinType[2] = 'EUR';
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
    id += 1;
    mappProfileInGroup[groupID][msg.sender].open = true;
    mappProfileInGroup[groupID][msg.sender].description = _description;
    mappProfileInGroup[groupID][msg.sender].id = id;
  }

  function payForFunds(address _publicKey,  uint groupID, uint _tokenAmount, address _crypto) public payable
  {
    uint amount;
    if (msg.value > 0)
    {
      amount = msg.value;
    }
    else
    {
      require(mappCryptoEnable[_crypto] == true);
      amount = _tokenAmount;
      External1(_crypto).transferFrom(msg.sender,address(this),_tokenAmount);
      if (External1(_crypto).decimals() < max)
      {
        amount = amount.mul(10**(max - (External1(_crypto).decimals())));
      }
    }
    mappProfileStats[groupID][_publicKey][mappAllowCryptoForCategory[_crypto]] += amount;
    mappPeerToPeerStats[msg.sender][_publicKey][mappAllowCryptoForCategory[_crypto]] += amount;
    mappIdStats[mappProfileInGroup[groupID][_publicKey].id][msg.sender][mappAllowCryptoForCategory[_crypto]] += amount;
  }

  function withdrawFunds(uint groupID) public
  {
    mappProfileInGroup[groupID][msg.sender].open = false;
    for(uint8 i = 0 ; i < homeStableList.length ; i++)
    {
    if (mappProfileStats[groupID][msg.sender][i] > 0)
    {
      if ( i == 0 )
      {
        msg.sender.transfer(mappProfileStats[groupID][msg.sender][i]);
      }
      else
      {
        External1(homeStableList[i]).mintExternal(msg.sender,mappProfileStats[groupID][msg.sender][i]);
      }
      mappProfileStats[groupID][msg.sender][i] = 0;
    }
    }
  }

  function changeToken(uint _tokenAmount, address _crypto1, address _crypto2) public
  {
    require(mappCryptoEnable[_crypto1] == true && mappCryptoEnable[_crypto2] == true);
    require(mappAllowCryptoForCategory[_crypto1] == mappAllowCryptoForCategory[_crypto2]);
    External1(_crypto1).transferFrom(msg.sender,address(this),_tokenAmount.mul(10**(External1(_crypto1).decimals())));
    _tokenAmount = _tokenAmount.mul(10**(External1(_crypto2).decimals()));
    uint money;
    if (fees > 0)
    {
      money = _tokenAmount.div(fees);
      External1(_crypto2).transfer(owner,money);
    }
    else
    {
      money = 0;
    }
    External1(_crypto2).transfer(msg.sender,_tokenAmount.sub(money));
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
    if ( mappProfileInGroup[_groupID][msg.sender].open == true )
    {
      withdrawFunds(_groupID);
    }
    if (mappProfileInGroup[_groupID][msg.sender].owner == true)
    {
      for (uint i = 0; i < mappUsersInGroup[_groupID].length; i++)
      {
        if (mappProfileInGroup[_groupID][mappUsersInGroup[_groupID][i]].isMember == true && mappUsersInGroup[_groupID][i] != msg.sender)
        {
          mappProfileInGroup[_groupID][mappUsersInGroup[_groupID][i]].owner = true;
          break;
        }
      }
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
    require(mappProfileInGroup[_group][msg.sender].isMember == true);
    return mappUsersInGroup[_group];
  }

  function getCryptoInfo(address _crypto) view public returns (erc20 memory)
  {
    uint decimals = External1(_crypto).decimals();
    string memory symbol = External1(_crypto).symbol();
    string memory name = External1(_crypto).name();
    bool status = mappCryptoEnable[_crypto];
    uint8 category = mappAllowCryptoForCategory[_crypto];
    return erc20(symbol,name,decimals,status,category);
  }

  function getStats(address to, uint8 crypto) view public returns (stats memory)
  {
    uint Out = mappPeerToPeerStats[msg.sender][to][crypto];
    uint In = mappPeerToPeerStats[to][msg.sender][crypto];
    return stats(In,Out);
  }

  function getProfileStats(uint groupID, address _user, uint8 crypto) view public returns (stats memory)
  {
    require(mappProfileInGroup[groupID][msg.sender].isMember == true);
    uint In = mappProfileStats[groupID][_user][crypto];
    uint Out = mappIdStats[mappProfileInGroup[groupID][_user].id][msg.sender][crypto];
    return stats(In,Out);
  }

  function getProfileInGroup(uint groupID, address _user) view public returns (profile memory)
  {
    require(mappProfileInGroup[groupID][msg.sender].isMember == true);
    return mappProfileInGroup[groupID][_user];
  }

}
