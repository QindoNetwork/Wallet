import { Contracts as contractInstance } from '@common/actions';

export async function swapOption(address1,address2,offer,signer){
  let spaceOperatorInstance = contractInstance.spaceOperatorInstance(signer)
  return await spaceOperatorInstance.swapOption(address1,address2,offer)
}

export async function mappSpacePrice(spaceID,signer){
  let spaceOperatorInstance = contractInstance.spaceOperatorInstance(signer)
  return await spaceOperatorInstance.mappSpacePrice(spaceID)
}

export async function exchangeSpace(list,url,signer) {
  let spaceOperatorInstance = contractInstance.spaceOperatorInstance(signer)
  await spaceOperatorInstance.exchangeSpace(list,url)
}

export async function sellSpace(address,price,signer) {
  let spaceOperatorInstance = contractInstance.spaceOperatorInstance(signer)
  await spaceOperatorInstance.sellSpace(address,price)
}

export async function buySpace(address,amount,signer) {
  let spaceOperatorInstance = contractInstance.spaceOperatorInstance(signer)
  await spaceOperatorInstance.buySpace(address,amount)
}
