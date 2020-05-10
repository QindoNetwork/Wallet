pragma solidity ^0.5.0;

import "../owner/Ownable.sol";

interface External2 {
  function transferFrom(address from, address to, uint256 tokenId) external;
  function getApproved(uint256 tokenId) external view returns (address);
}

interface External1 {
  function symbol() external view returns (string memory);
  function name() external view returns (string memory);
  function decimals() external view returns (uint);
  function totalSupply() external view returns (uint);
  function mintExternal(address account, uint256 value) external returns (bool);
  function burnExternal(address account, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function transfer(address to, uint256 value) external returns (bool);
  function Escrow() external returns (address);
  function balanceOf(address owner) external view returns (uint256);

}

contract SpaceOperator is Ownable {

  event swapDemand(uint indexed a, uint indexed b, address from, address indexed to, uint offer);
  event onSale(uint indexed spaceFrom, uint TGTCPrice);

  mapping (uint => option) public swapOption;
  mapping (uint => uint) public mappSpacePrice;

  struct option
  {
    uint spaceID;
    uint offer;
  }

  External1 TGTCToken;
  External2 TGTSToken;

  constructor(address tgts, address tgtc) public {
    owner = msg.sender;
    TGTSToken = External2(tgts);
    TGTCToken = External1(tgtc);
  }

  function exchangeSpace(uint spaceFrom, uint spaceTo, uint optionalTGTCOffer) public
  {
    address addressTo = TGTSToken.getApproved(spaceTo);
    require(TGTSToken.getApproved(spaceFrom) == msg.sender && addressTo != address(0) && addressTo != msg.sender);
    if (swapOption[spaceTo].spaceID == spaceFrom)
    {
      TGTSToken.transferFrom(msg.sender,addressTo,spaceFrom);
      TGTSToken.transferFrom(addressTo,msg.sender,spaceTo);
      if (swapOption[spaceTo].offer != 0)
      {
        TGTCToken.transferFrom(msg.sender,addressTo,swapOption[spaceTo].offer);
      }
    }
    else
    {
      if (optionalTGTCOffer != 0)
      {
        swapOption[spaceTo].offer = optionalTGTCOffer;
      }
      swapOption[spaceFrom].spaceID = spaceTo;
      emit swapDemand(spaceFrom,spaceTo,msg.sender,addressTo,optionalTGTCOffer);
    }
  }

  function sellSpace(uint spaceFrom, uint TGTCPrice) public
  {
    require(TGTSToken.getApproved(spaceFrom) == msg.sender && TGTCPrice != 0);
    mappSpacePrice[spaceFrom] = TGTCPrice;
    emit onSale(spaceFrom,TGTCPrice);
  }

  function buySpace(uint spaceFrom, uint TGTCAmount) public
  {
    require(TGTCAmount == mappSpacePrice[spaceFrom] && mappSpacePrice[spaceFrom] != 0);
    address target = TGTSToken.getApproved(spaceFrom);
    TGTCToken.transferFrom(msg.sender,target,TGTCAmount);
    TGTSToken.transferFrom(target,msg.sender,spaceFrom);
    mappSpacePrice[spaceFrom] == 0;
  }

}
