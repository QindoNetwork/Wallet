import { ethers } from 'ethers';
import * as ABIs from '@common/ABIs';
import { Contracts as contractsAddress, Network as ethereumNetwork } from '@common/constants';

const network = ethereumNetwork.network;
const provider = ethers.providers.InfuraProvider(network);

function connectNetwork(Mnemonic) {
  var wallet = ethers.Wallet.fromMnemonic(Mnemonic);
  return wallet = wallet.connect(provider);
}

export function togethersInstance(Mnemonic) {
    return new ethers.Contract(contractsAddress.togethersAddress, ABIs.TogethersABI, connectNetwork(Mnemonic));
}

export function controlInstance(Mnemonic) {
    return new ethers.Contract(contractsAddress.controlAddress, ABIs.ControlABI, connectNetwork(Mnemonic));
}

export function ERC20Instance(Mnemonic,address) {
    return new ethers.Contract(address, ABIs.ERC20ABI, connectNetwork(Mnemonic));
}
