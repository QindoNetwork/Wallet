import { ethers } from 'ethers';

let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
let signer = provider.getSigner();

export default signer;
