pragma solidity ^0.5.0;

import "../owner/Ownable.sol";
import "../technical/SafeMath.sol";

contract Administration is Ownable {

  using SafeMath for uint256;

  bool public stop;
  uint public fees;

  mapping (address => bool) public mappAllowCryptoForEU;
  mapping (address => bool) public mappAllowCryptoForUS;
  mapping (address => bool) public mappCryptoEnable;
  mapping (uint => address) public checkNameUnicity;
  mapping (address => string) public mappAddressToUser;

  mapping (address => uint) internal userPassword;

  address[] cryptoList;
  address[] stablecoinList;

  struct erc20
  {
    string symbol;
    string name;
    uint decimals;
    bool status;
    bool statusU;
    bool statusE;
  }

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

  function resetPassword() public
  {
    userPassword[msg.sender] == 0;
    checkNameUnicity[returnHash(mappAddressToUser[msg.sender])] = address(0);
  }

  function connectUser(string memory _password) public view returns (uint)
  {
    if (returnHash(_password) == userPassword[msg.sender])
    {
      return 1;
    }
    else return 0;
  }

  function enableCrypto(address crypto) public onlyOwner
  {
    require(crypto != address(0));
    require(checkCryptoToList(crypto) == false);
    if (mappCryptoEnable[crypto] == false)
    {
      mappCryptoEnable[crypto] = true;
    }
    else
    {
      mappCryptoEnable[crypto] = false;
    }
  }

  function addCryptoToList(address crypto) public onlyOwner
  {
    require(crypto != address(0));
    require(crypto != address(0));
    require(External1(crypto).totalSupply() > 0);
    cryptoList.push(crypto);
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
    if (mappCryptoEnable[crypto] == true && mappAllowCryptoForUS[crypto] == false && mappAllowCryptoForEU[crypto] == false)
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

  function activateFees(uint _fees) public onlyOwner
  {
    if (_fees < 100)
    {
      fees = 0;
    }
    else
    {
      fees = _fees;
    }
  }

}
