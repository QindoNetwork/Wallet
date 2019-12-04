pragma solidity ^0.5.0;

import "../owner/Ownable.sol";
import "../technical/SafeMath.sol";

contract Administration is Ownable {

  using SafeMath for uint256;

  uint public ID;
  uint public MAX;
  uint public groupNumber;
  uint public nbDemands;
  uint constant public tgtcAmount = 1000000000000000000;
  uint public feesAsk;
  uint public feesPay;

  event newDemand(uint indexed ID, address indexed from);
  event payDemand(uint indexed ID, address indexed from);
  event endDemand(uint indexed ID, address indexed from);
  event askEvent(address indexed from, uint ID);
  event transferGroupOwnershipEvent(address indexed from, uint ID);
  event setUserEvent(address indexed from);
  event createGroupEvent(address indexed from);
  event createProfileEvent(address indexed from, uint ID);

  mapping (uint => bool) public disableCrypto;
  mapping (uint => mapping (address => mapping (uint => uint))) public mappGiven;
  mapping (uint => spaceInfo) internal mappSpaceInfo;

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

  function modifyFees(uint _amount1, uint _amount2) public onlyOwner
  {
    feesPay = _amount1;
    feesAsk = _amount2;
  }


}
