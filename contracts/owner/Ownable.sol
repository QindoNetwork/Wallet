pragma solidity ^0.5.0;

interface External1 {
  function balanceOf(address who) external view returns (uint256);
  function symbol() external view returns (string memory);
  function name() external view returns (string memory);
  function decimals() external view returns (uint);
  function burnExternal(address account, uint256 value) external returns (bool);
  function mintExternal(address account, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function transfer(address to, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256) ;
}

interface External2 {
  function transferFrom(address from, address to, uint256 tokenId) external;
  function getApproved(uint256 tokenId) external view returns (address);
}

contract Ownable {

  address payable public owner;

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function transferOwnership(address payable newOwner) onlyOwner public {
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

  function returnHash(string memory _char) internal pure returns (uint)
  {
    return uint(keccak256(bytes(_char)));
  }


}
