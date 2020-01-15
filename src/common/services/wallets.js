import * as StorageService from './storage';
import { Wallet } from '@common/constants';

export async function loadWalletPKs() {
    const pks = await StorageService.getItem(Wallet.STORAGE_KEY);
    return pks ? JSON.parse(pks) : [];
}

export async function saveWalletPKs(wallets) {
    const map = wallets.map(({ name, privateKey, mnemonics }) => ({ name, privateKey, mnemonics }));
    await StorageService.setItem(Wallet.STORAGE_KEY, JSON.stringify(map));
}

export function deleteWalletPKs() {
    return StorageService.deleteItem(Wallet.STORAGE_KEY);
}
