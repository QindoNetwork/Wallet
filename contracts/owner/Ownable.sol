pragma solidity ^0.5.0;

interface External1 {
  function ID() external returns (uint);
}

interface External2 {
  function totalSupply() external view returns (uint256);
  function balanceOf(address who) external view returns (uint256);
  function mintExternal(address account, uint256 value) external returns (bool);
  function burnExternal(address account, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function transfer(address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
}

interface External3 {
  function transferFrom(address from, address to, uint256 tokenId) external;
  function getApproved(uint256 tokenId) external view returns (address);
  function getLastSpaceID() external returns (uint);
}

contract Ownable {

  address public owner;

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

  function transferOwnership(address newOwner) onlyOwner public {
    require(TGTSToken.getApproved(powerToken1) == newOwner || TGTSToken.getApproved(powerToken2) == newOwner);
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

  function returnHash(string memory _char) internal pure returns (uint)
  {
    return uint(keccak256(bytes(_char)));
  }


}
