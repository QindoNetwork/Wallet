import { ethers } from 'ethers';
import spaceManagerABI from '../../ABIs/spaceManagerABI';
import spaceOperatorABI from '../../ABIs/spaceOperatorABI';
import togethersABI from '../../ABIs/togethersABI';
import ERC20ABI from '../../ABIs/ERC20ABI';
import controlABI from '../../ABIs/controlABI';

const { utils, Wallet } = ethers;

const network = 'ropsten';

//const network = (process.env.NODE_ENV === 'production') ? 'mainnet' : 'rinkeby';
// let network = (process.env.NODE_ENV === 'production') ?
//     { name: 'mainnet', ensAddress: '0x314159265dd8dbb310642f98f50c066173c1259b', chainId: 1 } :
//     { name: 'rinkeby', ensAddress: '0xe7410170f87102df0055eb195163a03b7f2bff4a', chainId: 4 };

const spaceManagerAddress = "0xa074a9Ed1D591B3B0087f813FAC11107DD71969D";
const spaceOperatorAddress = "0x17e9Bd3580094b1449750b5d038E37fFb702f087";
const togethersAddress = "0x2BE6C5A620F09627BDdc95Bd53F929002438046E";
const togethersCoinAddress = "0x39CaCe7f59BfaF0f77fc7598163486054b32d81e";
const controlAddress = "0x392F2bE4a9f1857156EAf4DEf356f90B1f24b505";

const PROVIDER = ethers.getDefaultProvider(network);

export function generateMnemonics() {
    return utils.HDNode.entropyToMnemonic(utils.randomBytes(16)).split(' ');
}

export function loadWalletFromMnemonics(mnemonics) {
    if (!(mnemonics instanceof Array) && typeof mnemonics !== 'string')
        throw new Error('invalid mnemonic');
    else if (mnemonics instanceof Array)
        mnemonics = mnemonics.join(' ');

    const { privateKey } = Wallet.fromMnemonic(mnemonics);
    return new Wallet(privateKey, PROVIDER);
}

export function loadWalletFromPrivateKey(pk) {
    try {
        if (pk.indexOf('0x') !== 0) pk = `0x${pk}`;
        return new Wallet(pk, PROVIDER);
    } catch (e) {
        throw new Error('invalid private key');
    }
}

export function formatBalance(balance) {
    return utils.formatEther(balance);
}

export function reduceBigNumbers(items) {
    if (!(items instanceof Array)) throw new Error('The input is not an Array');
    return items.reduce((prev, next) => prev.add(next), utils.bigNumberify('0'));
}

export function calculateFee({ gasUsed, gasPrice }) {
    return gasUsed * Number(formatBalance(gasPrice));
}

export function spaceManagerInstance() {
    return new ethers.Contract(spaceManagerAddress, spaceManagerABI, PROVIDER.getSigner());
}

export function spaceOperatorInstance() {
    return new ethers.Contract(spaceOperatorAddress, spaceOperatorABI, PROVIDER.getSigner());
}

export function togethersInstance() {
    return new ethers.Contract(togethersAddress, togethersABI, PROVIDER.getSigner());
}

export function togethersCoinInstance() {
    return ERC20Instance(togethersCoinAddress);
}

export function controlInstance() {
    return new ethers.Contract(controlAddress, controlABI, PROVIDER.getSigner());
}

//others ERC20

export function ERC20Instance(address) {
    return new ethers.Contract(address, ERC20ABI, PROVIDER.getSigner());
}
