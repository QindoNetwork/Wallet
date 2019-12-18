pragma solidity ^0.5.0;

import "../token/TogethersSpace.sol";
import "../technical/SafeMath.sol";

contract SpaceManager is TogethersSpace {

  using SafeMath for uint256;

  event newSociety(address indexed from, uint indexed ID);
  event decision(address indexed from, bool decision);

  mapping (uint => string) public urls;
  mapping (uint => address) public lockedSpace;
  mapping (address => society) public mappSociety;
  mapping (uint => address) public checkedSociety;
  mapping (uint => bool) public isApproved;
  mapping (uint => uint) public mappIDSocietyToHash;
  mapping (address => uint[]) public mappSpacesList;
  mapping (uint => uint) public mappPassword;

  External2 public TGTCToken;
  External1 public MainContract;

  uint public MaxTokenCount;
  uint public TGTCPrice;

  address spaceOperator;

  constructor(address tgtc, address main) public {
    TGTCToken = External2(tgtc);
    MainContract = External1(main);
    TGTSToken = External3(address(this));
    owner = msg.sender;
    MaxTokenCount = 10000;
    // get powerTokens
    _mint(msg.sender,powerToken1);
    _mint(msg.sender,powerToken2);
  }

  struct society
  {
    string name;
    uint ID;
    uint SIRET;
    string signatory;
    string email;
  }

  uint public ID;

  function setSpaceOperator(address _spaceOperator) public onlyOwner
  {
    spaceOperator = _spaceOperator;
  }

  function changeMaxTokenCount(uint _max) public onlyOwner
  {
    MaxTokenCount = _max;
  }

  function getSpaceInfoName(uint _space) public view returns (string memory)
  {
    return mappSociety[checkedSociety[_space]].name;
  }

  function getSpaceInfoSIRET(uint _space) public view returns (uint)
  {
    return mappSociety[checkedSociety[_space]].SIRET;
  }

  function getNBSpaces(address _society) public view returns (uint)
  {
    return mappSpacesList[_society].length;
  }

  function getLastSpaceID() public returns (uint)
  {
    return MainContract.ID();
  }

  function registerSociety(string memory password, string memory name, uint SIRET, string memory signatory, string memory email) public
  {
    uint hashPassword = returnHash(password);
    require(hashPassword == mappPassword[SIRET]);
    uint hashs = returnHash(name);
    require(checkedSociety[hashs] == address(0) || checkedSociety[hashs] == msg.sender);
    if (checkedSociety[hashs] == msg.sender)
    {
      mappSociety[msg.sender].email = email;
      mappSociety[msg.sender].signatory = signatory;
    }
    else
    {
      checkedSociety[hashs] = msg.sender;
      ID += 1;
      mappSociety[msg.sender].name = name;
      mappSociety[msg.sender].ID = ID;
      mappSociety[msg.sender].SIRET = SIRET;
      mappSociety[msg.sender].email = email;
      mappSociety[msg.sender].signatory = signatory;
      mappIDSocietyToHash[ID] = hashs;
    }
    emit newSociety(msg.sender,ID);
  }

  function givePassword(uint SIRET, string memory password) onlyOwner public
  {
    mappPassword[SIRET] = returnHash(password);
  }

  function approveSociety(uint _ID) onlyOwner public
  {
    if (isApproved[_ID] == false)
    {
      isApproved[_ID] = true;
      isApprovedForAll(checkedSociety[mappIDSocietyToHash[_ID]],spaceOperator);
    }
    else
    {
      isApproved[_ID] = false;
    }
    emit decision(checkedSociety[mappIDSocietyToHash[_ID]],isApproved[_ID]);
  }

  function modifySpaces(uint[] memory space, string memory url) public
  {
    for (uint i = 0; i < space.length; i++)
    {
      if (getApproved(space[i]) == msg.sender && space[i] != powerToken1 && space[i] != powerToken2)
      {
        urls[space[i]] = url;
      }
    }
  }

  function modifyTGTCPrice(uint price) public onlyOwner
  {
    TGTCPrice = price;
  }

  function getTGTCs(uint amount) public payable
  {
    require(msg.value == TGTCPrice.mul(amount));
    MainContract.addInbox.value(msg.value);
    TGTCToken.transfer(msg.sender,amount);
  }

  function showTGTCsInContract() public view returns (uint)
  {
    return TGTCToken.balanceOf(address(this));
  }

  function lockSpaces(uint[] memory space) public
  {
    for (uint i = 0; i < space.length; i++)
    {
      if (getApproved(space[i]) == msg.sender && space[i] != powerToken1 && space[i] != powerToken2)
      {
        lockedSpace[space[i]] = msg.sender;
        _burn(space[i]);
      }
    }
  }

  function buySpaces(uint[] memory space) public
  {
    require(isApproved[mappSociety[msg.sender].ID] == true);
    require(TGTCToken.balanceOf(msg.sender) >=  space.length * spacePrice);
    uint k;
    for (uint i = 0; i < space.length; i++)
    {
      if (_exists(space[i]) == false && i > getLastSpaceID())
      {
        if (balanceOf(msg.sender) > MaxTokenCount)
        {
          break;
        }
        mappSpacesList[msg.sender].push(space[i]);
        k=k+1;
        _mint(msg.sender,i);
      }
    }
    if (k > 0)
    {
      TGTCToken.burnExternal(msg.sender,MainContract.spacePrice().mul(k));
    }
  }

}
