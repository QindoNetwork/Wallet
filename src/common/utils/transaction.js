export function createTransaction(to, value, gasLimit, gasPrice, options = {}) {
  if (!value) throw new Error('The transaction value is required.');
  return { gasPrice, ...options, to, gasLimit, value };
}

export function isValidTransaction(transaction) {
  return transaction instanceof Object
    && Number(transaction.value) > 0 && Number(transaction.gasLimit) > 0 && typeof transaction.to === 'string';
}
