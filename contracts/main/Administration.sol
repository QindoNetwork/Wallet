pragma solidity ^0.5.0;

import "../owner/Ownable.sol";
import "../technical/SafeMath.sol";

interface External2 {
  function totalSupply() external view returns (uint256);
  function balanceOf(address who) external view returns (uint256);
  function mintExternal(address account, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function transfer(address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function getApproved(uint256 tokenId) external view returns (address);
  function ID() external view returns (uint);
}

contract Administration is Ownable {

  External2 public TGTCToken;
  External2 public TGTSToken;

  using SafeMath for uint256;

  uint public ID;

  uint constant public tgtcAmount = 1000000000000000000;

  mapping (uint => bool) public disableCrypto;
  mapping (uint => bool) public stopCrypto;

  Token[] list;

  struct Token
  {
    string name;
    string symbol;
    address ID;
    uint decimal;
  }

  function useNewToken(string memory name, string memory symbol, address _address, uint decimal) public onlyOwner
  {
    require(_address != address(0));
    list.push(Token(name,symbol,_address,decimal));
  }

  function getTokenAddress(uint256 index) public view returns (address)
  {
    return list[index].ID;
  }

  function getTokenDecimal(uint256 index) public view returns (uint)
  {
    return list[index].decimal;
  }

  function getTokenSymbol(uint256 index) public view returns (string memory)
  {
    return list[index].symbol;
  }

  function getTokenName(uint256 index) public view returns (string memory)
  {
    return list[index].name;
  }

  function getSize() public view returns (uint)
  {
    return list.length;
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
      stopCrypto[_index] = false;
    }
  }

  function switchReward() internal view returns (uint)
  {
    uint tgtcReward;
    if (ID < 100)
    {
      tgtcReward = tgtcAmount.mul(10000);
    }
    if (100 >= ID && ID < 1000)
    {
      tgtcReward = tgtcAmount.mul(1000);
    }
    if (1000 >= ID && ID < 10000)
    {
      tgtcReward = tgtcAmount.mul(100);
    }
    if (10000 >= ID && ID < 100000)
    {
      tgtcReward = tgtcAmount.mul(10);
    }
    else
    {
      tgtcReward = tgtcAmount;
    }
    return tgtcReward;
  }

  function protectCrypto(uint _index) public onlyOwner
  {
    if (stopCrypto[_index] == false && disableCrypto[_index] == true)
    {
      stopCrypto[_index] = true;
    }
    else stopCrypto[_index] = false;
  }

}
