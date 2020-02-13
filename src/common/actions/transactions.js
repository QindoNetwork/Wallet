import { ethers } from 'ethers';
import { notify } from './general';
import { Transactions as TransactionsService } from '@common/services';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';
import { General as GeneralActions } from '@common/actions';


export async function sendTransaction(wallet, txn) {
  if (!(wallet instanceof ethers.Wallet)) throw new Error('Invalid wallet');
  txn = await TransactionsService.sendTransaction(wallet, txn);
  return txn;
}

export async function nextNonce(wallet) {
  let count = parseInt(await EthereumNetworks.fallbackProvider.getTransactionCount(wallet.item.address),10);
  count = count + 1
  return count;
}

export async function erc20approve(amount,instance,overrides) {
  const address = contractsAddress.togethersAddress
  await instance.approve(address,amount,overrides)
}
