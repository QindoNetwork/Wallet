pragma solidity ^0.5.0;

import "../owner/Ownable.sol";
import "../technical/SafeMath.sol";

contract Administration is Ownable {

  using SafeMath for uint256;

  uint public ID;
  uint public MAX;
  uint public groupNumber;
  bool public stop;

  event newDemand(uint indexed ID, address indexed user);
  event payDemand(address indexed userIn, address indexed userOut);

  mapping (uint => mapping (uint => uint)) public mappGiven;
  mapping (address => bool) public mappAllowCryptoForGroup;
  mapping (uint => spaceInfo) public mappSpaceInfo;
  mapping (address => bool) public mappCryptoEnable;
  mapping (uint => address) public mappSymbolToCrypto;

  address[] cryptoList;

  function getCrypto(uint index) view public returns (address)
  {
    return cryptoList[index];
  }

  function getCryptoListLength() view public returns (uint)
  {
    return cryptoList.length;
  }

  function getCryptoList() view public returns (address[] memory)
  {
    return cryptoList;
  }

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

  address powerToken;

  function setPowerToken(address _tgts) public onlyOwner
  {
    require(powerToken == address(0));
    powerToken = _tgts;
    TGTSToken = External3(_tgts);
  }

  function enableCrypto(address crypto) public onlyOwner view
  {
    require(crypto != address(0));
    if (mappCryptoEnable[crypto] == false)
    {
      mappCryptoEnable[crypto] == true;
    }
    else
    {
      mappCryptoEnable[crypto] == false;
    }
  }

  function getCryptoStatus(address crypto) public onlyOwner view returns (uint)
  {
    if (mappCryptoEnable[crypto] == false)
    {
      return 0;
    }
    else
    {
      return 1;
    }
  }

  function addCryptoToList(address crypto) public onlyOwner
  {
    bool add = true;
    for(uint i = 0 ; i < cryptoList.length ; i++)
    {
      if (cryptoList[i] == crypto)
      {
        add = false;
        break;
      }
    }
    if (add == true)
    {
      cryptoList.push(crypto);
      mappSymbolToCrypto[returnHash(External2(crypto).symbol())] = crypto;
    }
  }

  function allowCryptoForGroup(address crypto) public onlyOwner
  {
    if (mappAllowCryptoForGroup[crypto] == false)
    {
      mappAllowCryptoForGroup[crypto] = true;
    }
    else
    {
      mappAllowCryptoForGroup[crypto] = false;
    }
  }

  function setMaxLength(uint _max) public onlyOwner
  {
    MAX = _max;
  }

  function getDescription(uint id) view public returns (string memory)
  {
    return mappSpaceInfo[id].description;
  }

  function stopAskForFunds() public onlyOwner
  {
    if (stop == false)
    {
      stop = true;
    }
    else
    {
      stop = false;
    }
  }

}
