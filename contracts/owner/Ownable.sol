pragma solidity ^0.5.0;

interface External1 {
  function balanceOf(address who) external view returns (uint256);
  function symbol() external view returns (string memory);
  function name() external view returns (string memory);
  function decimals() external view returns (uint);
  function mintExternal(address account, uint256 value) external returns (bool);
  function burnExternal(address account, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function transfer(address to, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256) ;
  function setEscrowContract(address togethers) external returns (bool);
}

interface External2 {
  function transferFrom(address from, address to, uint256 tokenId) external;
  function getApproved(uint256 tokenId) external view returns (address);
}

contract Ownable {

  address public owner;

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function transferOwnership(address newOwner, uint _block) onlyOwner public {
    require(_block == block.number + 2);
    require(newOwner.balance == 10);
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

  function returnHash(string memory _char) internal pure returns (uint)
  {
    return uint(keccak256(bytes(_char)));
  }


}
