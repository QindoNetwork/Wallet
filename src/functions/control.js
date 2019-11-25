import * as utils from './common/utils';

let contractInstance = utils.Wallet.controlInstance()

export gasPrice = await contractInstance.gasPrice()

export gasPrice = () => (
     await contractInstance.gasPrice()
);

export connectUser = (_password) => (
     await contractInstance.connectUser(_password)
);


export async function createPassword(_password) {
    await contractInstance.createPassword(_password)
}
