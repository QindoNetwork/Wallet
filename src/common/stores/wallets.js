import { action, observable } from 'mobx';
import { ethers } from 'ethers';

const INITIAL = {
    list: [],
    loading: false
};

export class WalletsStore {

    @observable list = INITIAL.list;
    @observable loading = INITIAL.loading;

    @action isLoading(state) {
        this.loading = Boolean(state);
    }

    @action addWallet(walletName, wallet, mnemonics) {
        if (!(wallet instanceof ethers.Wallet)) throw new Error('Invalid Wallet');
        wallet.name = walletName;
        wallet.mnemonics = mnemonics;
        let doublon = 0
        for ( var i = 0; i < this.list.length; i++ ) {
         if (this.list[i].mnemonics === mnemonics){
           doublon = 1
        }
        }
        if (doublon === 0){
          this.list.push(wallet);
       }
    }

    @action removeWallet(wallet) {
        this.list = this.list.filter(w => w.address !== wallet.address);
    }

    @action setBalance(address, amount) {
        const wallet = this.list.find(wallet => wallet.address === address);
        if (!wallet) throw new Error('Wallet not found');
        wallet.balance = amount;
        const otherWallets = this.list.filter(wallet => wallet.address !== address);
        this.list = [...otherWallets, wallet];
    }

    @action setWalletName(address, name) {
        const wallet = this.list.find(wallet => wallet.address === address);
        if (!wallet) throw new Error('Wallet not found');
        wallet.name = name;
        const otherWallets = this.list.filter(wallet => wallet.address !== address);
        this.list = [...otherWallets, wallet];
    }

    @action reset() {
        this.list = INITIAL.list;
        this.loading = INITIAL.loading;
    }
}

export default new WalletsStore();
