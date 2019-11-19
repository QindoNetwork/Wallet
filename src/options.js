import { ethers } from 'ethers';
import SpaceManager from './ABIs/SpaceManagerABI';
import SpaceOperator from './ABIs/SpaceManagerABI';
import TokenERC20 from './ABIs/TokenERC20ABI';
import Togethers from './ABIs/TogethersABI';

const spaceManagerAddress = "0x15efD10f5e3f7Bac839E80a104bAfeaC879f2944";
const spaceOperatorAddress = "0x15efD10f5e3f7Bac839E80a104bAfeaC879f2944";
const togethersCoinAddress = "0x15efD10f5e3f7Bac839E80a104bAfeaC879f2944";
const togethersAddress = "0x15efD10f5e3f7Bac839E80a104bAfeaC879f2944";

//let provider = new ethers.providers.Web3Provider(window.ethereum);
let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
let signer = provider.getSigner();

let spaceManagerInstance = new ethers.Contract(spaceManagerAddress, SpaceManager, signer);
let spaceOperatorInstance = new ethers.Contract(spaceOperatorAddress, SpaceOperator, signer);
let togethersCoinInstance = new ethers.Contract(togethersCoinAddress, TokenERC20, signer);
let togethersInstance = new ethers.Contract(togethersAddress, Togethers, signer);

export spaceManagerInstance;
export spaceOperatorInstance;
export togethersCoinInstance;
export togethersInstance;
export TokenERC20;
