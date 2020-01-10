import { ethers } from 'ethers';
import { notify } from './general';
import { wallet as WalletStore } from '@common/stores';
import { Transactions as TransactionsService } from '@common/services';
import { Contracts as contractsAddress } from '@common/constants';

async function waitForTransaction(wallet, txn) {
  await wallet.provider.waitForTransaction(txn.hash);
  WalletStore.moveToHistory(txn);
  notify('Transaction confirmed');
}

export async function sendTransaction(wallet, txn) {
  if (!(wallet instanceof ethers.Wallet)) throw new Error('Invalid wallet');
  txn = await TransactionsService.sendTransaction(wallet, txn);
  WalletStore.addPendingTransaction(txn);
  waitForTransaction(wallet, txn);
  return txn;
}

export async function nextNonce(address) {
  const count = await wallet.provider.getTransactionCount(address);
  return number(count + 1);
}

export async function erc20approve(amount,type,nonce,instance,expiry,overrides) {
  const address = contractsAddress.togethersAddress
  const blockExpiry = await wallet.provider.getBlockNumber() + expiry;
  if (type === 1){
    await instance.increaseAllowance(address,amount, overrides)
  }
  if (type === 2){
    await instance.allowance(address,amount, overrides)
  }
  if (type === 3){
    //permit dai...
  }
  if (type === 4){
    //other...
  }
  if (type === 5){
    //other...
  }
}
