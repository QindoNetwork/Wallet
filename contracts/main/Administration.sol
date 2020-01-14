pragma solidity ^0.5.0;

import "../owner/Ownable.sol";
import "../technical/SafeMath.sol";

contract Administration is Ownable {

  using SafeMath for uint256;

  uint public ID;
  uint public MAX;
  uint public TokenID;
  uint public groupNumber;
  bool public stop;
  uint public ERC20AllowanceExpiry;

  event newDemand(uint indexed ID, address indexed user);
  event withdrawIssue(address user, uint crypto, uint amount);

  mapping (uint => bool) internal disableCrypto;
  mapping (uint => mapping (address => mapping (uint => uint))) internal mappGiven;
  mapping (uint => spaceInfo) internal mappSpaceInfo;
  mapping (uint => tokenType) private mapTokenType;
  mapping (address => uint[]) public mapPersonalTokenList;

  mapping (address => uint) internal userPassword;

  function createPassword(string memory _password) internal
  {
    require(userPassword[msg.sender] == 0);
    userPassword[msg.sender] = returnHash(_password);
  }

  function verifyRegistration() public view returns (uint)
  {
    if (userPassword[msg.sender] == 0)
    {
      return 0;
    }
    else return 1;
  }

  function changePassword(string memory NewPassword, string memory oldPassword) public
  {
    uint newHash = returnHash(NewPassword);
    require(userPassword[msg.sender] == returnHash(oldPassword));
    userPassword[msg.sender] = newHash;
  }

  function resetPassword() public view
  {
    userPassword[msg.sender] == 0;
  }

  function connectUser(string memory _password) public view returns (uint)
  {
    if (returnHash(_password) == userPassword[msg.sender])
    {
      return 1;
    }
    else return 0;
  }

  struct spaceInfo
  {
    string description;
    address user;
  }

  struct tokenType
  {
    uint Type;
    address ID;
  }

  address powerToken;

  function setPowerToken(address _tgts) public onlyOwner
  {
    require(powerToken == address(0));
    powerToken = _tgts;
    TGTSToken = External3(_tgts);
  }

  function setMaxLength(uint _max) public onlyOwner
  {
    MAX = _max;
  }

  function setExpiry(uint _delai) public onlyOwner
  {
    ERC20AllowanceExpiry = _delai;
  }

  function setTokenERC20List(address[] memory list) public onlyOwner
  {
    for (uint i = 0; i < list.length; i++)
    {
      TokenID += 1;
      uint j = i + TokenID;
      if (mapTokenType[j].Type == 0)
      {
        mapTokenType[j].Type = 1;
        mapTokenType[j].ID = list[i];
      }
    }
  }

  function useNewToken(address _address, uint _type) public onlyOwner
  {
    require(_address != address(0));
    require(_type != (0));
    TokenID += 1;
    mapTokenType[TokenID].Type = _type;
    mapTokenType[TokenID].ID = _address;
  }

  function usePersonalToken(uint index) public
  {
    require(mapTokenType[index].Type != 0);
    mapPersonalTokenList[msg.sender].push(index);
  }

  function removePersonalToken(uint index) public
  {
    require(mapPersonalTokenList[msg.sender].length > index);
    for (uint k = index; k < mapPersonalTokenList[msg.sender].length-1; k++){
            mapPersonalTokenList[msg.sender][k] = mapPersonalTokenList[msg.sender][k+1];
    }
    delete mapPersonalTokenList[msg.sender][mapPersonalTokenList[msg.sender].length-1];
    mapPersonalTokenList[msg.sender].length --;
  }

  function getTokenAddress(uint index) public view returns (address)
  {
    return mapTokenType[index].ID;
  }

  function getTokenType(uint index) public view returns (uint)
  {
    return mapTokenType[index].Type;
  }

  function enableCrypto(uint _index) public onlyOwner
  {
    if (disableCrypto[_index] == false)
    {
      disableCrypto[_index] = true;
    }
    else
    {
      disableCrypto[_index] = false;
    }
  }

  function checkEnableCrypto(uint _index) view public returns (uint)
  {
    if (disableCrypto[_index] == false)
    {
      return 1;
    }
    else
    {
      return 0;
    }
  }

  function checkIsEmpty(uint groupID) internal view returns (bool)
  {
    for(uint i = 0 ; i <= TokenID ; i++)
    {
      if (mappGiven[groupID][msg.sender][i] > 0)
      {
        return false;
      }
    }
    return true;
  }

  function getDescription(uint id) view public returns (string memory)
  {
    return mappSpaceInfo[id].description;
  }

  function getCryptoGiven(uint groupID, address to, uint crypto) view public returns (uint)
  {
    return mappGiven[groupID][to][crypto];
  }

  function stopAskForFunds() public view onlyOwner
  {
    if (stop == false)
    {
      stop == true;
    }
    else
    {
      stop == false;
    }
  }

}
