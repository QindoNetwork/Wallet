import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';
import { key } from '@common/constants/infuraAPI';
import SpaceOperator from '../build/contracts/SpaceOperator';

const url = 'https://rospten.infura.io/v3/' + key

export async function exchangeSpace(from,to,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await SpaceOperator.methods.exchangeSpace(from,to).send({
        from: accounts[0],
        gas: '1000000',
        });
}

export async function buySpaces(address,amount,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await SpaceOperator.methods.transfer(address,amount).send({
        from: accounts[0],
        gas: '1000000',
        });
}

export async function sellSpace(address,price,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await SpaceOperator.methods.sellSpace(address,price).send({
        from: accounts[0],
        gas: '1000000',
        });
}
