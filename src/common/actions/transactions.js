import { ethers } from 'ethers';
import { notify } from './general';
import { wallet as WalletStore } from '@common/stores';
import { Transactions as TransactionsService } from '@common/services';
import { Contracts as contractsAddress } from '@common/constants';
import { General as GeneralActions } from '@common/actions';


export async function sendTransaction(wallet, txn) {
  if (!(wallet instanceof ethers.Wallet)) throw new Error('Invalid wallet');
  txn = await TransactionsService.sendTransaction(wallet, txn);
  return txn;
}

export async function nextNonce(address) {
  const count = await wallet.provider.getTransactionCount(address);
  return number(count + 1);
}

export async function erc20approve(amount,instance,overrides) {
  const address = contractsAddress.togethersAddress
  await instance.approve(address,amount,overrides)
}
