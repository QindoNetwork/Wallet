import { Contracts as contractInstance } from '@common/actions';

export async function name(signer) {
  let ERC20Instance = contractInstance.ERC20Instance(signer)
  return await ERC20Instance.name()
}

export async function symbol(signer) {
  let ERC20Instance = contractInstance.ERC20Instance(signer)
  return await ERC20Instance.symbol()
}

export async function decimals(signer) {
  let ERC20Instance = contractInstance.ERC20Instance(signer)
  return await ERC20Instance.decimals()
}

export async function transfer(address,value,signer) {
  let ERC20Instance = contractInstance.ERC20Instance(signer)
  return await ERC20Instance.transfer(address,value)
}

export async function approve(address,value,signer) {
  let ERC20Instance = contractInstance.ERC20Instance(signer)
  return await ERC20Instance.approve(address,value)
}

export async function balanceOf(address,signer) {
  let ERC20Instance = contractInstance.ERC20Instance(signer)
  return await ERC20Instance.balanceOf(address)
}
