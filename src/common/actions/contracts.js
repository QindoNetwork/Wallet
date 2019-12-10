import { ethers } from 'ethers';
import { ControlABI as controlABI, TogethersABI as togethersABI, ERC20ABI as erc20ABI } from '@common/ABIs/controlABI';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';

// const provider = ethers.getDefaultProvider(EthereumNetworks.NETWORK_KEY)

function getProvider() {
// Connect to INFUA
var infuraProvider = new ethers.providers.InfuraProvider(EthereumNetworks.NETWORK_KEY);
// Connect to Etherscan
var etherscanProvider = new ethers.providers.EtherscanProvider(EthereumNetworks.NETWORK_KEY);
// Connect to togethers apiKey
var togethersProvider = new ethers.providers.JsonRpcProvider('http://ropsten.infura.io/v3/' + EthereumNetworks.INFURA_API_KEY, EthereumNetworks.NETWORK_KEY);

var fallbackProvider = new ethers.providers.FallbackProvider([
    togethersProvider,
    infuraProvider,
    etherscanProvider,
]);
return fallbackProvider
}

function connectWallet(m) {
  var mnemonics = m.toString()
  var wallet = ethers.Wallet.fromMnemonic(mnemonics);
  wallet = wallet.connect(getProvider());
  return wallet;
}

function ControlCall() {
    return new ethers.Contract(contractsAddress.controlAddress, controlABI, getProvider());
}

function TogethersCall() {
    return new ethers.Contract(contractsAddress.togethersAddress, togethersABI, getProvider());
}

export function ControlInstance(mnemonics) {
  return new ethers.Contract(contractsAddress.controlAddress, controlABI, connectWallet(mnemonics));
}

export function TogethersInstance(mnemonics) {
    return new ethers.Contract(contractsAddress.togethersAddress, togethersABI, connectWallet(mnemonics));
}

export function ERC20Instance(address,mnemonics) {
    return new ethers.Contract(address, erc20ABI, connectWallet(mnemonics));
}

export function getGasPriceAsk() {
  return ControlCall().getGasPrice(0);
}

export function getGasLimitAsk() {
  return ControlCall().getGasLimit(0);
}

export function getGasPriceTransferGroupOwnership() {
  return ControlCall().getGasPrice(1);
}

export function getGasLimitTransferGroupOwnership() {
  return ControlCall().getGasLimit(1);
}

export function getGasPriceSetUser() {
  return ControlCall().getGasPrice(2);
}

export function getGasLimitSetUser() {
  return ControlCall().getGasLimit(2);
}

export function getGasPriceCreateGroup() {
  return ControlCall().getGasPrice(3);
}

export function getGasLimitCreateGroup() {
  return ControlCall().getGasLimit(3);
}

export function getGasLimitCreateProfile() {
  return ControlCall().getGasLimit(4);
}

export function getGasPriceCreateProfile() {
  return ControlCall().getGasPrice(4);
}

export function getGasLimitAskForFunds() {
  return ControlCall().getGasLimit(5);
}

export function getGasPriceAskForFunds() {
  return ControlCall().getGasPrice(5);
}

export function getGasLimitWithdrawFunds() {
  return ControlCall().getGasLimit(6);
}

export function getGasPriceWithdrawFunds() {
  return ControlCall().getGasPrice(6);
}

export function getGasLimitRemoveMember() {
  return ControlCall().getGasLimit(7);
}

export function getGasPriceRemoveMember() {
  return ControlCall().getGasPrice(7);
}

export function getGasLimitQuitGroup() {
  return ControlCall().getGasLimit(8);
}

export function getGasPriceQuitGroup() {
  return ControlCall().getGasPrice(8);
}

export function defaultGasLimit() {
  return ControlCall().getGasLimit(9);
}

export function defaultGasPrice() {
  return ControlCall().getGasPrice(9);
}

export function getMAX() {
  return TogethersCall().MAX();
}

export function getGroupsLength(user) {
  return TogethersCall(user).getGroupsLength();
}

export function getUsersLength(group) {
  return TogethersCall(group).getUsersLength();
}
