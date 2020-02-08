pragma solidity ^0.5.0;

import "../token/TogethersSpace.sol";
import "../technical/SafeMath.sol";

contract SpaceManager is TogethersSpace {

  using SafeMath for uint256;

  event newSociety(address indexed from, uint indexed ID);
  event decision(address indexed from, bool decision);

  mapping (uint => string) public urls;
  mapping (address => society) public mappSociety;
  mapping (uint => address) public checkedSociety;
  mapping (uint => bool) public isApproved;
  mapping (uint => uint) public mappIDSocietyToHash;
  mapping (address => uint[]) public mappSpacesList;
  mapping (uint => uint) private mappPassword;

  External1 public TGTCToken;

  uint public TGTCPrice;
  uint constant public spacePrice = 1000000000000000000;

  address spaceOperator;

  constructor(address tgtc) public {
    TGTCToken = External1(tgtc);
    owner = msg.sender;
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

  function getSpaceInfoName(uint _space) public view returns (string memory)
  {
    return mappSociety[checkedSociety[_space]].name;
  }

  function getSpaceInfoSIRET(uint _space) public view returns (uint)
  {
    return mappSociety[checkedSociety[_space]].SIRET;
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
      if (getApproved(space[i]) == msg.sender)
      {
        urls[space[i]] = url;
      }
    }
  }

  function modifyTGTCPrice(uint price) public onlyOwner
  {
    TGTCPrice = price;
  }

  function buySpaces(uint[] memory space) public
  {
    require(isApproved[mappSociety[msg.sender].ID] == true);
    uint k;
    for (uint i = 0; i < space.length; i++)
    {
      if (_exists(space[i]) == false)
      {
        mappSpacesList[msg.sender].push(space[i]);
        k=k+1;
        _mint(msg.sender,i);
      }
    }
    if (k > 0)
    {
      TGTCToken.burnExternal(msg.sender,spacePrice.mul(k));
    }
  }

}
