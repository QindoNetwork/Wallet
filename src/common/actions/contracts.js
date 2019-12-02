import { ethers } from 'ethers';
import * as ABIs from '@common/ABIs';
import { Contracts as contractsAddress } from '@common/constants';

const network = 'ropsten';
let provider = ethers.getDefaultProvider(network);

export function spaceManagerInstance(wallet) {
    let contract = new ethers.Contract(contractsAddress.spaceManagerAddress, ABIs.SpaceManagerABI, provider);
    return contract.connect(wallet);
}

export function spaceOperatorInstance(wallet) {
    let contract = new ethers.Contract(contractsAddress.spaceOperatorAddress, ABIs.SpaceOperatorABI, provider);
    return contract.connect(wallet);
}

export function togethersInstance(wallet) {
    let contract = new ethers.Contract(contractsAddress.togethersAddress, ABIs.TogethersABI, provider);
    return contract.connect(wallet);
}

export function togethersCoinInstance(wallet) {
    return  ERC20Instance(contractsAddress.togethersCoinAddress,wallet);
}

export function controlInstance(wallet) {
    let contract = new ethers.Contract(contractsAddress.controlAddress, ABIs.ControlABI, provider);
    return contract.connect(wallet);
}

//others ERC20

export function ERC20Instance(address,wallet) {
    let contract = new ethers.Contract(address, ABIs.ERC20ABI, provider);
    return contract.connect(wallet);
}
