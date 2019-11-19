pragma solidity ^0.5.0;

contract Test {

  uint public value;

  function setValue(uint _value) onlyOwner public {
    value = _value;
  }

}
