pragma solidity ^0.5.0;

import "../owner/Ownable.sol";
import "../technical/SafeMath.sol";

contract Administration is Ownable {

  using SafeMath for uint256;

  uint public ID;
  uint public groupNumber;
  bool public stop;

  event newDemand(uint indexed ID, address indexed user, uint groupID);
  event payDemand(address indexed userIn, address userOut);

  mapping (uint => mapping (uint => uint)) public mappGiven;
  mapping (address => bool) public mappAllowCryptoForEU;
  mapping (address => bool) public mappAllowCryptoForUS;
  mapping (address => bool) public mappCryptoEnable;
  mapping (uint => address) public mappSymbolToCrypto;

  mapping (address => uint) internal userPassword;

  address powerToken;
  address[] public cryptoList;
  address[] public stablecoinList;

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

  function setPowerToken(address _tgts) public onlyOwner
  {
    require(powerToken == address(0));
    powerToken = _tgts;
    TGTSToken = External2(_tgts);
  }

  function enableCrypto(address crypto) public onlyOwner view
  {
    require(crypto != address(0));
    require(checkCryptoToList(crypto) == false);
    if (mappCryptoEnable[crypto] == false)
    {
      mappCryptoEnable[crypto] == true;
    }
    else
    {
      mappCryptoEnable[crypto] == false;
    }
  }

  function getCryptoStatus(address crypto) public view returns (uint)
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

  function getStableUSStatus(address crypto) public view returns (uint)
  {
    if (mappAllowCryptoForUS[crypto] == false)
    {
      return 0;
    }
    else
    {
      return 1;
    }
  }

  function getStableEUStatus(address crypto) public view returns (uint)
  {
    if (mappAllowCryptoForEU[crypto] == false)
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
    require(crypto != address(0));
    require(checkCryptoToList(crypto) == true);
    cryptoList.push(crypto);
    mappSymbolToCrypto[returnHash(External1(crypto).symbol())] = crypto;
  }

  function checkCryptoToList(address crypto) private view returns (bool)
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
    return add;
  }

  function addStablecoinToList(address crypto) public onlyOwner
  {
    require(crypto != address(0));
    require(checkCryptoToList(crypto) == false);
    require(checkStablecoin(crypto) == true);
    stablecoinList.push(crypto);
  }

  function checkStablecoin(address crypto) private view returns (bool)
  {
    bool add = true;
    for(uint i = 0 ; i < stablecoinList.length ; i++)
    {
      if (stablecoinList[i] == crypto)
      {
        add = false;
        break;
      }
    }
    return add;
  }

  function allowCryptoForUS(address crypto) public onlyOwner
  {
    require(checkStablecoin(crypto) == false);
    if (mappAllowCryptoForUS[crypto] == false && mappAllowCryptoForEU[crypto] == false)
    {
      mappAllowCryptoForUS[crypto] = true;
    }
    else
    {
      mappAllowCryptoForUS[crypto] = false;
    }
  }

  function allowCryptoForEU(address crypto) public onlyOwner
  {
    require(checkStablecoin(crypto) == false);
    if (mappAllowCryptoForUS[crypto] == false && mappAllowCryptoForEU[crypto] == false)
    {
      mappAllowCryptoForEU[crypto] = true;
    }
    else
    {
      mappAllowCryptoForEU[crypto] = false;
    }
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
