import { ethers } from 'ethers';
import * as ABIs from '@common/ABIs';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';

const network = EthereumNetworks.NETWORK_KEY;
const provider = ethers.getDefaultProvider(network)

export function ControlInstance(mnemonics) {
    return new ethers.Contract(contractsAddress.controlAddress, ABIs.ControlABI, connectInstance(mnemonics))
}

export function TogethersInstance(mnemonics) {
    return new ethers.Contract(contractsAddress.togethersAddress, ABIs.TogethersABI, connectInstance(mnemonics));
}

export function ERC20Instance(address,mnemonics) {
    return new ethers.Contract(address, ABIs.ERC20ABI, connectInstance(mnemonics));
}

function connectInstance(mnemonics) {
    let wallet = ethers.Wallet.fromMnemonic(mnemonics.toLowerCase());
    return wallet.connect(provider);
}
