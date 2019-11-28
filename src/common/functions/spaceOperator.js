import { Contracts as contractInstance } from '@common/actions';

export async function swapOption(address1,address2,offer){
  return await contractInstance.spaceOperatorInstance.swapOption(address1,address2,offer)
}

export async function mappSpacePrice(spaceID){
  return await contractInstance.spaceOperatorInstance.mappSpacePrice(spaceID)
}
