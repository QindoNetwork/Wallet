import { ethers } from 'ethers';
import * as ABIs from '@common/ABIs';
import { Contracts as contractsAddress } from '@common/constants';
import { wallet as WalletStore } from '@common/stores';

export function spaceManagerInstance(signer) {
    return new ethers.Contract(contractsAddress.spaceManagerAddress, ABIs.SpaceManagerABI, signer);
}

export function spaceOperatorInstance(signer) {
    return new ethers.Contract(contractsAddress.spaceOperatorAddress, ABIs.SpaceOperatorABI, signer);
}

export function togethersInstance(signer) {
    return new ethers.Contract(contractsAddress.togethersAddress, ABIs.TogethersABI, signer);
}

export function togethersCoinInstance(signer) {
    return ERC20Instance(contractsAddress.togethersCoinAddress,signer);
}

export function controlInstance(signer) {
    return new ethers.Contract(contractsAddress.controlAddress, ABIs.ControlABI, signer);
}

//others ERC20

export function ERC20Instance({ address, signer } ) {
    return new ethers.Contract(address, ABIs.ERC20ABI, signer);
}
