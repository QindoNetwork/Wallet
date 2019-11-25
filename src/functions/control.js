import * as utils from './common/utils';

let contractInstance = utils.Wallet.controlInstance()

export async function gasPrice() {
    return await contractInstance.gasPrice()
}

export async function connectUser(_password) {
    return await contractInstance.connectUser(_password)
}

export async function createPassword(_password) {
    await contractInstance.createPassword(_password)
}
