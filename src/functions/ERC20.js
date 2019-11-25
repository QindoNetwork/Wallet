import * as utils from './common/utils';

let contractInstance = utils.Wallet.ERC20Instance()

export async function name() {
    return await contractInstance.name()
}

export async function symbol() {
    return await contractInstance.symbol()
}

export async function decimals() {
    return await contractInstance.decimals()
}

export async function transfer(address,value) {
    return await contractInstance.transfer(address,value)
}

export async function approve(address,value) {
    return await contractInstance.approve(address,value)
}

export async function balanceOf(address) {
    return await contractInstance.balanceOf(address)
}
