import { Wallet as Walletutils } from '@common/utils';

let contractInstance = Walletutils.spaceOperatorInstance()

export async function swapOption(address1,address2,offer){
  return await contractInstance.swapOption(address1,address2,offer)
}

export async function mappSpacePrice(spaceID){
  return await contractInstance.mappSpacePrice(spaceID)
}

export async function exchangeSpace(list,url) {
    await contractInstance.exchangeSpace(list,url)
}

export async function sellSpace(address,price) {
    await contractInstance.sellSpace(address,price)
}

export async function buySpace(address,amount) {
    await contractInstance.buySpace(address,amount)
}
