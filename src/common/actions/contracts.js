import { ethers } from 'ethers';
import * as ABIs from '@common/ABIs';
import { Contracts as contractsAddress } from '@common/constants';

const network = EthereumNetworks.NETWORK_KEY;
const provider = ethers.getDefaultProvider(network)

export const callControl = new ethers.Contract(contractsAddress.controlAddress, ABIs.controlABI, provider)
export const callTogethers = new ethers.Contract(contractsAddress.togethersAddress, ABIs.togethersABI, provider)

export function ControlInstanceTrx(mnemonics) {
    let wallet = ethers.Wallet.fromMnemonic(this.props.mnemonics);
    wallet = wallet.connect(provider);
    return new ethers.Contract(contractsAddress.controlAddress, ABIs.controlABI, provider)
}

export function TogethersInstanceTrx(mnemonics) {
    let wallet = ethers.Wallet.fromMnemonic(this.props.mnemonics);
    wallet = wallet.connect(provider);
    return new ethers.Contract(contractsAddress.togethersAddress, ABIs.togethersABI, wallet);
}

export function ERC20Instance(address) {
    return new ethers.Contract(address, ABIs.ERC20ABI, provider)
}

export function ERC20InstanceTrx(address) {
    let wallet = ethers.Wallet.fromMnemonic(this.props.mnemonics);
    wallet = wallet.connect(provider);
    return new ethers.Contract(address, ABIs.ERC20ABI, wallet);
}
