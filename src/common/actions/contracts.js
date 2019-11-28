import { ethers } from 'ethers';
import { Contracts as contractsAddress } from '@common/constants';

const network = 'ropsten';
let provider = ethers.getDefaultProvider(network);

export function spaceManagerInstance() {
    return new ethers.Contract(contractsAddress.spaceManagerAddress, ABIs.SpaceManagerABI, provider);
}

export function spaceOperatorInstance() {
    return new ethers.Contract(contractsAddress.spaceOperatorAddress, ABIs.SpaceOperatorABI, provider);
}

export function togethersInstance() {
    return new ethers.Contract(contractsAddress.togethersAddress, ABIs.TogethersABI, provider);
}

export function togethersCoinInstance() {
    return ERC20Instance(contractsAddress.togethersCoinAddress);
}

export function controlInstance() {
    return new ethers.Contract(contractsAddress.controlAddress, ABIs.ControlABI, provider);
}

export function OtherERC20Instance(address) {
    return new ERC20Instance(address);
}

function ERC20Instance(address) {
    return new ethers.Contract(address, ABIs.ERC20ABI, provider);
}
