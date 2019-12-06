import { ethers } from 'ethers';
import { ControlABI as controlABI, TogethersABI as togethersABI, ERC20ABI as erc20ABI } from '@common/ABIs/controlABI';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';

const network = EthereumNetworks.NETWORK_KEY;
const provider = ethers.getDefaultProvider(network)

function connectWallet(m) {
  var mnemonics = m.toString()
  var provider = new ethers.providers.InfuraProvider(EthereumNetworks.NETWORK_KEY);
  var wallet = ethers.Wallet.fromMnemonic(mnemonics);
  wallet = wallet.connect(provider);
  return wallet;
}

function ControlCall() {
    return new ethers.Contract(contractsAddress.controlAddress, controlABI, provider);
}

function TogethersCall() {
    return new ethers.Contract(contractsAddress.togethersAddress, togethersABI, provider);
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
  return TogethersCall().MAX;
}
