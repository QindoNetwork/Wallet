import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';
import { key } from '@common/constants/infuraAPI';
import SpaceManager from '../build/contracts/SpaceManager';

const url = 'https://rospten.infura.io/v3/' + key

export async function getTGTCs(amount,mnemonic,gasLimit,value) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await SpaceManager.methods.getTGTCs(amount).send({
        from: accounts[0],
        value: value,
        gas: '1000000',
        });
}

export async function buySpaces(list,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await SpaceManager.methods.transfer(list).send({
        from: accounts[0],
        gas: '1000000',
        });
}

export async function lockSpaces(list,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await SpaceManager.methods.transfer(list).send({
        from: accounts[0],
        gas: '1000000',
        });
}

export async function modifySpaces(list,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await SpaceManager.methods.modifySpaces(list).send({
        from: accounts[0],
        gas: '1000000',
        });
}

export async function registerSociety(password,name,siret,signatory,email,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await SpaceManager.methods.registerSociety(password,name,siret,signatory,email,value).send({
        from: accounts[0],
        gas: '1000000',
        });
}
