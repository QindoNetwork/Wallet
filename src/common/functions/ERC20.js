import { Contracts as contractInstance } from '@common/actions';

export async function name() {
  return await contractInstance.ERC20Instance.name()
}

export async function symbol() {
  return await contractInstance.ERC20Instance.symbol()
}

export async function decimals() {
  return await contractInstance.ERC20Instance.decimals()
}

export async function balanceOf(address) {
  return await contractInstance.ERC20Instance.balanceOf(address)
}
