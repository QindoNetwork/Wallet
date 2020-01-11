import { ethers } from 'ethers';
import { Network as EthereumNetworks } from '@common/constants';

const { utils, Wallet } = ethers;

const PROVIDER = EthereumNetworks.fallbackProvider;

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

export function estimateFee({ gasUsed, gasPrice }) {
    return gasUsed * Number(formatBalance(gasPrice));
}
