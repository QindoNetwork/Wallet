import { ethers } from 'ethers';
import * as ABIs from '@common/ABIs';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';

const network = EthereumNetworks.NETWORK_KEY;
const provider = ethers.getDefaultProvider(network)

export function ControlInstance() {
    return new ethers.Contract(contractsAddress.controlAddress, ABIs.ControlABI, provider)
}

export function TogethersInstance() {
    return new ethers.Contract(contractsAddress.togethersAddress, ABIs.TogethersABI, provider)
}

export function ControlInstanceTrx(mnemonics) {
    let wallet = ethers.Wallet.fromMnemonic(mnemonics);
    wallet = wallet.connect(provider);
    return new ethers.Contract(contractsAddress.controlAddress, ABIs.ControlABI, wallet)
}

export function TogethersInstanceTrx(mnemonics) {
    let wallet = ethers.Wallet.fromMnemonic(mnemonics);
    wallet = wallet.connect(provider);
    return new ethers.Contract(contractsAddress.togethersAddress, ABIs.TogethersABI, wallet);
}

export function ERC20Instance(address) {
    return new ethers.Contract(address, ABIs.ERC20ABI, provider)
}

export function ERC20InstanceTrx(address,mnemonics) {
    let wallet = ethers.Wallet.fromMnemonic(mnemonics);
    wallet = wallet.connect(provider);
    return new ethers.Contract(address, ABIs.ERC20ABI, wallet);
}
