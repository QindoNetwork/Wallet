import { Contracts as contractInstance } from '@common/actions';

export async function lockedAccount(address) {
  return await contractInstance.controlInstance.lockedAccount(address)
}

export async function gasPrice() {
  return await contractInstance.controlInstance.gasPrice()
}

export async function connectUser(_password) {
  return await contractInstance.controlInstance.connectUser(_password)
}

export async function userPassword(_password) {
  return await contractInstance.controlInstance.userPassword(_password)
}
