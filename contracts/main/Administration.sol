pragma solidity ^0.5.0;

import "../owner/Ownable.sol";
import "../technical/SafeMath.sol";

contract Administration is Ownable {

  using SafeMath for uint256;

  uint public fees;

  mapping (address => uint8) public mappAllowCryptoForCategory;
  mapping (address => bool) public mappCryptoEnable;
  mapping (uint => address) public checkNameUnicity;
  mapping (address => string) public mappAddressToUser;
  mapping (address => uint) internal userPassword;
  mapping (uint => string) public stablecoinType;

  address[] cryptoList;
  address[] homeStableList;

  struct erc20
  {
    string symbol;
    string name;
    uint decimals;
    bool status;
    uint8 category;
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

    function verifyUserAvailability(string memory _pseudo) public view returns (uint)
  {
    uint currentID = returnHash(_pseudo);
    if (checkNameUnicity[currentID] == address(0))
    {
      return 1;
    }
    return 0;
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
    require(checkCryptoToList(crypto) == false);
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

  function allowCryptoForCategory(address crypto, uint8 category) public onlyOwner
  {
    require(category != 0);
    require(mappCryptoEnable[crypto] == true);
    mappAllowCryptoForCategory[crypto] = category;
  }

  function createNewHomeStable(address crypto, string memory currency) public onlyOwner
  {
    require(External1(crypto).decimals() == 18);
    require(External1(crypto).totalSupplly() == 0);
    stablecoinType[homeStableList.length] = currency;
    homeStableList.push(crypto);
  }

  function activateFees(uint _fees) public onlyOwner
  {
    fees = _fees;
  }

  function getCryptoList() view public returns (address[] memory)
  {
    return cryptoList;
  }

  function getStableCoinList() view public returns (address[] memory)
  {
    return homeStableList;
  }

}
