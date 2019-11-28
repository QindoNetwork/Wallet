import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';
import { key } from '@common/constants/infuraAPI';
import TogethersCoin from '../build/contracts/TogethersCoin';

const url = 'https://rospten.infura.io/v3/' + key

export async function transfer(_password,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await TogethersCoin.methods.transfer(address,value).send({
        from: accounts[0],
        gas: '1000000',
        });
}

export async function approve(_password,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await TogethersCoin.methods.approve(address,value).send({
        from: accounts[0],
        gas: '1000000',
        });
}
