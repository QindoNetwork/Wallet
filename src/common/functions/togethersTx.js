import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';
import { key } from '@common/constants/infuraAPI';
import Togethers from '../build/contracts/Togethers';

const url = 'https://rospten.infura.io/v3/' + key

export async function ask(address,amount,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await Togethers.methods.ask(address,amount).send({
        from: accounts[0],
        gas: '1000000',
        });
}

export async function transferGroupOwnership(spaceID,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await Togethers.methods.transferGroupOwnership(spaceID).send({
        from: accounts[0],
        gas: '1000000',
        });
}

export async function setUser(spaceID,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await Togethers.methods.setUser(spaceID).send({
        from: accounts[0],
        gas: '1000000',
        });
}

export async function createGroup(_groupName,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await Togethers.methods.createGroup(_groupName).send({
        from: accounts[0],
        gas: '1000000',
        });
}

export async function createProfile(groupID,_pseudo,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await Togethers.methods.createProfile(groupID,_pseudo).send({
        from: accounts[0],
        gas: '1000000',
        });
}

export async function askForFunds(address,amount,value,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await Togethers.methods.askForFunds(address,amount,value).send({
        from: accounts[0],
        gas: '1000000',
        value : value,
        });
}

export async function payForFunds(_publicKey,groupID,value,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await Togethers.methods.payForFunds(_publicKey,groupID).send({
        from: accounts[0],
        gas: '1000000',
        value : value,
        });
}

export async function withdrawFunds(groupID,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  return await Togethers.methods.withdrawFunds(groupID).send({
        from: accounts[0],
        gas: '1000000',
        });
}

export async function removeMember(_publicKey,groupID,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await Togethers.methods.removeMember(_publicKey,groupID).send({
        from: accounts[0],
        gas: '1000000',
        });
}

export async function quitGroup(_groupID,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await Togethers.methods.quitGroup(_groupID).send({
        from: accounts[0],
        gas: '1000000',
        });
}

export async function enableCrypto(_groupID,mnemonic,gasLimit) {
  let signer = new HDWalletProvider(mnemonic,url)
  let web3 = new Web3(signer);
  let accounts = await web3.eth.getAccounts();
  await Togethers.methods.enableCrypto(_groupID).send({
        from: accounts[0],
        gas: '1000000',
        });
}
