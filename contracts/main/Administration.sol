pragma solidity ^0.5.0;

import "../owner/Ownable.sol";
import "../technical/SafeMath.sol";

contract Administration is Ownable {

  using SafeMath for uint256;

  /**
   * @notice Fees in wey applied for token swap 1:1
   */
  uint public fees;
  /**
   * @notice Amount in wey from fees
   */
  uint public money;
  /**
   * @notice Map each satblecoin address accepted in boxes with one home stablecoin
   */
  mapping (address => uint8) public mappAllowCryptoForCategory;
  /**
   * @notice Enable or disable token use in the app
   */
  mapping (address => bool) public mappCryptoEnable;
  /**
   * @notice every user address has a unique name
   */
  mapping (uint => address) public checkNameUnicity;
  /**
   * @notice Map each satblecoin address accepted in boxes
   */
  mapping (address => string) public mappAddressToUser;
  /**
   * @notice the password security is SHA1 hashed and send from front and hashed again in keccak to be private saved
   */
  mapping (address => uint) internal userPassword;
  /**
   * @notice describe the type of home stablecoins
   */
  mapping (uint => string) public stablecoinType;

  /**
   * @notice the list of every token that can be used in the contract
   */
  address[] cryptoList;
  /**
   * @notice the liste of every home stablecoin, one category (USD,EUR) is unique
   */
  address[] homeStableList;

  /**
   * @notice the required decimal value of a homestablecoin
   */
  uint8 public constant max = 18;

  /**
   * @notice struct of a ERC20 object
   * @notice Category: if not 0 it is the index of homestablecoin a stablecoin is for
   * @notice status: is enable in the app or not
   */
  struct erc20
  {
    string symbol;
    string name;
    uint decimals;
    bool status;
    uint8 category;
    uint balance;
    uint balanceContract;
  }

  /**
   * @notice Create password when first connection
   * @param _password the SHA1 hashed password parameter
   */
  function createPassword(string memory _password) internal
  {
    require(userPassword[msg.sender] == 0);
    userPassword[msg.sender] = returnHash(_password);
  }

  /**
   * @notice Create password when first connection
   * @return 1 if the user already has a password
   * @return 0 if the user does not have a password
   */
  function verifyRegistration() public view returns (uint)
  {
    if (userPassword[msg.sender] == 0)
    {
      return 0;
    }
    else return 1;
  }

  /**
   * @notice Verify the availability of a username choosed by a user address
   * @return 1 if the username is available
   * @return 0 if the username is not available
   */
    function verifyUserAvailability(string memory _pseudo) public view returns (uint)
    {
      uint currentID = returnHash(_pseudo);
      if (checkNameUnicity[currentID] == address(0))
      {
        return 1;
      }
      return 0;
    }

  /**
   * @notice Change user password
   * @param NewPassword new password
   * @param oldPassword old password
   */
  function changePassword(string memory NewPassword, string memory oldPassword) public
  {
    uint newHash = returnHash(NewPassword);
    require(userPassword[msg.sender] == returnHash(oldPassword));
    userPassword[msg.sender] = newHash;
  }

  /**
   * @notice init password from external connection
   */
  function resetPassword() public
  {
    userPassword[msg.sender] == 0;
    checkNameUnicity[returnHash(mappAddressToUser[msg.sender])] = address(0);
  }

  /**
   * @notice Secure connection and transactions from the app
   * @return 1 if the password is OK
   * @return 0 if the password is wrong
   */
  function connectUser(string memory _password) public view returns (uint)
  {
    if (returnHash(_password) == userPassword[msg.sender])
    {
      return 1;
    }
    else return 0;
  }

  /**
   * @notice enable or disable token use in the list of token
   * @param crypto: the token address
   */
  function enableCrypto(address crypto) public onlyOwner
  {
    require(crypto != address(0));
    require(checkCryptoToList(crypto) == false);
    if (mappCryptoEnable[crypto] == false)
    {
      mappCryptoEnable[crypto] = true;
    }
    else
    {
      mappCryptoEnable[crypto] = false;
    }
  }

  /**
   * @notice Add a token in list
   * @notice the token should not to be in the list already
   * @notice the address should be a token address
   * @param crypto: the token address
   */
  function addCryptoToList(address crypto) public onlyOwner
  {
    require(crypto != address(0));
    require(checkCryptoToList(crypto) == true);
    require(External1(crypto).decimals() != 0);
    cryptoList.push(crypto);
  }

  /**
   * @notice Private function that control the used of crypto
   * @param crypto: the token address
   * @return true if the token is in the list, false if it is note
   */
  function checkCryptoToList(address crypto) private view returns (bool)
  {
    bool add = true;
    for(uint i = 0 ; i < cryptoList.length ; i++)
    {
      if (cryptoList[i] == crypto)
      {
        add = false;
        break;
      }
    }
    return add;
  }

  /**
   * @notice determine the category of a stablecoin then his corresponding home stablecoin
   * @param crypto: the token address
   * @param category: the home stablecoin number
   * @return true if the token is in the list, false if it is note
   */
  function allowCryptoForCategory(address crypto, uint8 category) public onlyOwner
  {
    require(category != 0 && category < homeStableList.length);
    require(mappCryptoEnable[crypto] == true);
    require(External1(crypto).decimals() <= max);
    for(uint i = 0 ; i < homeStableList.length ; i++)
    {
      if(homeStableList[i] == crypto)
      {
        require(i == category);
        break;
      }
    }
    mappAllowCryptoForCategory[crypto] = category;
  }

  /**
   * @notice add a new home stablecoin to the list
   * @notice should be a new created token mintable by this contract
   * @param crypto: the home stablecoin address
   * @param currency: the type of the stablecoin
   */
  function createNewHomeStable(address crypto, string memory currency) public onlyOwner
  {
    require(External1(crypto).decimals() == max);
    require(External1(crypto).totalSupply() == 0);
    require(External1(crypto).Escrow() == address(this));
    stablecoinType[homeStableList.length] = currency;
    homeStableList.push(crypto);
  }

  /**
   * @notice change the value of fees during stablecoin swap
   * @param _fees: tvalue of chenge fees in wey
   */
  function activateFees(uint _fees) public onlyOwner
  {
    fees = _fees;
  }

  /**
   * @return the list of used ERC20
   */
  function getCryptoList() view public returns (address[] memory)
  {
    return cryptoList;
  }

  /**
   * @return the list of home stablecoins
   */
  function getStableCoinList() view public returns (address[] memory)
  {
    return homeStableList;
  }


  /**
   * @notice the administrator get the ethers gathered from changes
   */
  function getMoney() public onlyOwner
  {
    msg.sender.transfer(money);
    money = 0;
  }


}
