import { wallet as WalletStore, wallets as WalletsStore } from '@common/stores';
import { Wallets as WalletsService, Api as ApiService } from '@common/services';
import { Wallet as WalletUtils } from '@common/utils';

export async function addWallet(walletName, wallet, mnemonics) {
    WalletsStore.isLoading(true);
    WalletsStore.addWallet(walletName, wallet, mnemonics);
    WalletsStore.isLoading(false);
}

export async function loadWallets() {
    WalletsStore.isLoading(true);
    const pks = await WalletsService.loadWalletPKs();
    pks.map(({ name, privateKey, mnemonics }) => {
        const wallet = WalletUtils.loadWalletFromPrivateKey(privateKey);
        WalletsStore.addWallet(name, wallet, mnemonics);
    });
    WalletsStore.isLoading(false);
}

export async function updateBalance(wallet) {
    WalletStore.isLoading(true);
    const balance = await wallet.getBalance();
    WalletsStore.setBalance(wallet.address, balance);
    saveWallets();
    selectWallet(wallet);
    WalletStore.isLoading(false);
}

export async function changeWalletName(address,name) {
    WalletsStore.setWalletName(address,name);
    saveWallets();
}

export async function removeWallet(wallet) {
    WalletsStore.removeWallet(wallet);
}

export async function saveWallets() {
    await WalletsService.saveWalletPKs(WalletsStore.list);
}

export async function selectWallet(wallet) {
    WalletStore.select(wallet);
}

export async function updateHistory(wallet) {
    WalletStore.isLoading(true);
    const { data } = await ApiService.getHistory(wallet.address);
    if (data.status == 1) WalletStore.setHistory(data.result);
    WalletStore.isLoading(false);
}
