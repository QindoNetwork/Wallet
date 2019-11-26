import { Contracts as contractInstance } from '@common/actions';

export async function gasPrice(signer) {
  let controlInstance = contractInstance.controlInstance(signer)
  return await controlInstance.gasPrice()
}

export async function connectUser(_password,signer) {
  let controlInstance = contractInstance.controlInstance(signer)
  return await controlInstance.connectUser(_password)
}

export async function createPassword(_password,signer) {
  let controlInstance = contractInstance.controlInstance(signer)
  await controlInstance.createPassword(_password)
}
