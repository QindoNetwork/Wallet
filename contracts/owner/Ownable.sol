pragma solidity ^0.5.0;

interface External2 {
  function balanceOf(address who) external view returns (uint256);
  function symbol() external view returns (string memory);
  function burnExternal(address account, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function transfer(address to, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256) ;
}

interface External1 {
  function burnExternal(address account, uint256 value) external returns (bool);
  function mintExternal(address account, uint256 value) external returns (bool);
  function balanceOf(address who) external view returns (uint256);
}

interface External3 {
  function transferFrom(address from, address to, uint256 tokenId) external;
  function getApproved(uint256 tokenId) external view returns (address);
}

contract Ownable {

  address payable public owner;

  External3 public TGTSToken;

  uint constant public powerToken1 = 0;
  uint constant public powerToken2 = 1;

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function transferOwnership(address payable newOwner) onlyOwner public {
    require(TGTSToken.getApproved(powerToken1) == newOwner || TGTSToken.getApproved(powerToken2) == newOwner);
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

  function returnHash(string memory _char) internal pure returns (uint)
  {
    return uint(keccak256(bytes(_char)));
  }


}
