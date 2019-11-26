import { Wallet as Walletutils } from '@common/utils';

let contractInstance = Walletutils.togethersInstance()

export async function ID(){
  return await contractInstance.ID()
}

export async function MAX(){
  return await contractInstance.MAX()
}

export async function groupNumber(){
  return await contractInstance.groupNumber()
}
export async function ratioForReward(){
  return await contractInstance.ratioForReward()
}

export async function tgtcAmount(){
  return await contractInstance.tgtcAmount()
}

export async function disableCrypto(crypto){
  return await contractInstance.disableCrypto(crypto)
}

export async function mappGiven(groupID,address,crypto){
  return await contractInstance.mappGiven(groupID,address,crypto)
}

export async function mappSpaceInfo(spaceID){
  return await contractInstance.mappSpaceInfo(spaceID)
}

export async function getTokenAddress(crypto){
  return await contractInstance.getTokenAddress(crypto)
}

export async function getTokenDecimal(crypto){
  return await contractInstance.getTokenDecimal(crypto)
}

export async function getTokenSymbol(crypto){
  return await contractInstance.getTokenSymbol(crypto)
}

export async function getTokenName(crypto){
  return await contractInstance.getTokenName(crypto)
}

export async function mappStatsPeerToPeer(from,to,crypto){
  return await contractInstance.mappStatsPeerToPeer(from,to,crypto)
}

export async function mappAddressToUser(address){
  return await contractInstance.mappAddressToUser(address)
}

export async function mappGroupIDToGroupName(groupID){
  return await contractInstance.mappGroupIDToGroupName(groupID)
}

export async function mappProfileInGroup(groupID,address){
  return await contractInstance.mappProfileInGroup(groupID,address)
}

export async function mappGroupsForAddress(address){
  return await contractInstance.mappGroupsForAddress(address)
}

export async function mappUsersInGroup(groupID){
  return await contractInstance.mappUsersInGroup(groupID)
}

export async function checkNameUnicity(digest){
  return await contractInstance.checkNameUnicity(digest)
}

export async function checkGroupUnicity(address,digest){
  return await contractInstance.checkGroupUnicity(address,digest)
}

export async function mappAskForAdd(address,groupID){
  return await contractInstance.mappAskForAdd(address,groupID)
}

export async function ask(spaceID){
  await contractInstance.ask(spaceID)
}

export async function transferGroupOwnership(spaceID){
  await contractInstance.transferGroupOwnership(spaceID)
}

export async function setUser(spaceID){
  await contractInstance.setUser(spaceID)
}

export async function createGroup(_groupName){
  await contractInstance.createGroup(_groupName)
}
export async function createProfile(groupID,_pseudo){
  await contractInstance.createProfile(groupID,_pseudo)
}

export async function askForFunds(groupID,_description){
  await contractInstance.askForFunds(groupID,_description)
}

export async function payForFunds(_publicKey,groupID,_tokenAmount,_crypto){
  await contractInstance.payForFunds(_publicKey,groupID,_tokenAmount,_crypto)
}

export async function withdrawFunds(groupID){
  await contractInstance.withdrawFunds(groupID)
}
export async function removeMember(_publicKey,groupID){
  await contractInstance.removeMember(_publicKey,groupID)
}

export async function quitGroup(_groupID){
  await contractInstance.quitGroup(_groupID)
}

export async function getUserName(_group,_num){
  return await contractInstance.getUserName(_group,_num)
}

export async function getUserName2(_group, _num){
  return await contractInstance.getUserName2(_group, _num)
}

export async function getGroup(_num){
  return await contractInstance.getGroup(_num)
}

export async function getUserAddress(_group,_num){
  return await contractInstance.getUserAddress(_group,_num)
}

export async function getGroupID(_num){
  return await contractInstance.getGroupID(_num)
}

export async function getGroupsLength(){
  return await contractInstance.getGroupsLength()
}

export async function getUsersLength(){
  return await contractInstance.getUsersLength()
}
