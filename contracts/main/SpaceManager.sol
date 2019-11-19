pragma solidity ^0.5.0;

import "../token/TogethersSpace.sol";
import "../owner/Ownable.sol";
import "../technical/SafeMath.sol";

interface External1 {
  function burnExternal(address account, uint256 value) external returns (bool);
  function ID() external returns (uint);
  function balanceOf(address owner) external view returns (uint256);
  function tgtcAmount() external returns (uint);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
}

contract SpaceManager is TogethersSpace, Ownable {

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
  mapping (uint => description) public balckList;
  mapping (uint => uint) public mappPassword;

  External1 public TGTCToken;
  External1 public MainContract;

  uint public TGTCPrice;
  uint public MaxTokenCount;

  address spaceOperator;

  constructor(address tgtc, address main) public {
    TGTCToken = External1(tgtc);
    MainContract = External1(main);
    owner = msg.sender;
    MaxTokenCount = 10000;
  }

  struct society
  {
    string name;
    uint ID;
    uint SIRET;
    string signatory;
    string email;
  }

  struct description
  {
    bool isBlacklisted;
    string reason;
  }

  uint public ID;

  function setSpaceOperator(address _spaceOperator) public onlyOwner
  {
    require(spaceOperator == address(0));
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

  function getSocietyName(address _society) public view returns (string memory)
  {
    return mappSociety[_society].name;
  }

  function getSocietyID(address _society) public view returns (uint)
  {
    return mappSociety[_society].ID;
  }

  function getSocietyEmail(address _society) public view returns (string memory)
  {
    return mappSociety[_society].email;
  }

  function getSocietySignatory(address _society) public view returns (string memory)
  {
    return mappSociety[_society].signatory;
  }

  function getSocietySIRET(address _society) public view returns (uint)
  {
    return mappSociety[_society].SIRET;
  }

  function getLastSpaceID() public returns (uint)
  {
    return MainContract.ID();
  }

  function registerSociety(string memory password, string memory name, uint SIRET, string memory signatory, string memory email) public
  {
    uint hashPassword = uint(keccak256(bytes(password)));
    require(hashPassword == mappPassword[SIRET]);
    uint hashs = uint(keccak256(bytes(name)));
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
    mappPassword[SIRET] = uint(keccak256(bytes(password)));
  }

  function approveSociety(uint _ID) onlyOwner public
  {
    require(balckList[_ID].isBlacklisted == false);
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

  function blackListSociety(uint _ID, string memory _reason) onlyOwner public
  {
    require(isApproved[ID] == false);
    balckList[_ID].isBlacklisted = true;
    balckList[_ID].reason = _reason;
  }

  function getBlackListState(uint _ID) public view returns (bool)
  {
    return balckList[_ID].isBlacklisted;
  }

  function getMoney() public onlyOwner
  {
    msg.sender.transfer(address(this).balance);
  }

  function modifyTGTCPrice(uint price) public onlyOwner
  {
    TGTCPrice = price;
  }

  function putTGTCs(uint amount) public onlyOwner
  {
    require(TGTCPrice != 0);
    TGTCToken.transferFrom(msg.sender,address(this),amount);
  }

  function getTGTCs(uint amount) public payable
  {
    require(TGTCPrice != 0);
    require(msg.value == TGTCPrice.mul(amount));
    TGTCToken.transfer(msg.sender,amount);
  }

  function getBlackListReason(uint _ID) public view returns (string memory)
  {
    return balckList[_ID].reason;
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

  function lockSpaces(uint[] memory space) public
  {
    for (uint i = 0; i < space.length; i++)
    {
      if (getApproved(space[i]) == msg.sender)
      {
        lockedSpace[space[i]] = msg.sender;
        _burn(space[i]);
      }
    }
  }

  function buySpaces(uint[] memory space) public
  {
    require(isApproved[mappSociety[msg.sender].ID] == true);
    require(TGTCToken.balanceOf(msg.sender) >=  space.length * MainContract.tgtcAmount());
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
      TGTCToken.burnExternal(msg.sender,MainContract.tgtcAmount() * k);
    }
  }
}
