import { ethers } from 'ethers';
const { utils } = ethers;

export function createTransaction(to, value, gasLimit, gasPrice, options = {}) {
  if (!value) throw new Error('The transaction value is required.');
  else if (!(Number(value) > 0)) throw new Error('The transaction value is invalid.');
  value = utils.parseEther(value);
  return { gasPrice, ...options, to, gasLimit, value };
}

export function isValidTransaction(transaction) {
  return transaction instanceof Object
    && Number(transaction.value) > 0 && Number(transaction.gasLimit) > 0 && typeof transaction.to === 'string';
}
