pragma solidity ^0.5.0;

import "../owner/Ownable.sol";
import "../technical/SafeMath.sol";

contract Administration is Ownable {

  using SafeMath for uint256;

  uint public ID;
  uint public MAX;
  uint public groupNumber;
  uint public nbDemands;
  uint public feesPay;
  bool public stop;
  uint constant spacePrice = 1000000000000000000;

  event newDemand(uint indexed ID);
  event payDemand(uint indexed ID);
  event endDemand(uint indexed ID);

  mapping (uint => bool) internal disableCrypto;
  mapping (uint => mapping (address => mapping (uint => uint))) internal mappGiven;
  mapping (uint => spaceInfo) internal mappSpaceInfo;
  mapping (address => mapping (address => mapping (uint => uint))) internal mappStatsPeerToPeer;

  Token[] list;

  struct Token
  {
    string name;
    string symbol;
    address ID;
    uint decimal;
  }

  struct spaceInfo
  {
    string description;
    uint language;
  }

  address powerToken;
  uint box;
  uint box2;

  function setPowerToken(address _tgts) public onlyOwner
  {
    require(powerToken == address(0));
    powerToken = _tgts;
    TGTSToken = External3(powerToken);
  }

  function setMaxLength(uint _max) public onlyOwner
  {
    MAX = _max;
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
    for(uint i = 0 ; i < getSize() ; i++)
    {
      if (mappGiven[groupID][msg.sender][i] > 0)
      {
        return false;
      }
    }
    return true;
  }

  function getMoney() public onlyOwner
  {
    msg.sender.transfer(box2);
    box2 = 0;
  }

  function addInbox() public payable
  {
    box.add(msg.value);
  }

  function getDescription(uint id) view public returns (string memory)
  {
    return mappSpaceInfo[id].description;
  }

  function getSpaceLanguage(uint id) view public returns (uint)
  {
    return mappSpaceInfo[id].language;
  }

  function getCryptoGiven(uint groupID, address to, uint crypto) view public returns (uint)
  {
    return mappGiven[groupID][to][crypto];
  }

  function getStats(address from, address to, uint crypto) view public returns (uint)
  {
    return mappStatsPeerToPeer[from][to][crypto];
  }

  function modifyFees(uint _amount) public onlyOwner
  {
    feesPay = _amount;
  }

  function blockAskForFunds() public onlyOwner
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
