import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';
import { key } from '@common/constants/infuraAPI';
import Control from '../build/contracts/Control';

const url = 'https://rospten.infura.io/v3/' + key

export async function createPassword(_password,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await Control.methods.createPassword(_password).send({
        from: accounts[0],
        gas: '1000000',
        });
}
