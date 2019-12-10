import { Contracts as contractInstance } from '@common/actions';

export async function ID(){
  return await contractInstance.togethersInstance.ID()
}

export async function MAX(){
  return await contractInstance.togethersInstance.MAX()
}

export async function groupNumber(){
  return await contractInstance.togethersInstance.groupNumber()
}

export async function ratioForReward(){
  return await contractInstance.togethersInstance.ratioForReward()
}

export async function tgtcAmount(){
  return await contractInstance.togethersInstance.tgtcAmount()
}

export async function disableCrypto(crypto){
  return await contractInstance.togethersInstance.disableCrypto(crypto)
}

export async function mappGiven(groupID,address,crypto){
  return await contractInstance.togethersInstance.mappGiven(groupID,address,crypto)
}

export async function mappSpaceInfo(spaceID){
  return await contractInstance.togethersInstance.mappSpaceInfo(spaceID)
}

export async function getTokenAddress(crypto){
  return await contractInstance.togethersInstance.getTokenAddress(crypto)
}

export async function getTokenDecimal(crypto){
  return await contractInstance.togethersInstance.getTokenDecimal(crypto)
}

export async function getTokenSymbol(crypto){
  return await contractInstance.togethersInstance.getTokenSymbol(crypto)
}

export async function getTokenName(crypto){
  return await contractInstance.togethersInstance.getTokenName(crypto)
}

export async function getSize(){
  return await contractInstance.togethersInstance.getSize()
}

export async function mappStatsPeerToPeer(from,to,crypto){
  return await contractInstance.togethersInstance.mappStatsPeerToPeer(from,to,crypto)
}

export async function mappAddressToUser(address){
  return await contractInstance.togethersInstance.mappAddressToUser(address)
}

export async function mappGroupIDToGroupName(groupID){
  return await contractInstance.togethersInstance.mappGroupIDToGroupName(groupID)
}

export async function mappProfileInGroup(groupID,address){
  return await contractInstance.togethersInstance.mappProfileInGroup(groupID,address)
}

export async function mappGroupsForAddress(address){
  return await contractInstance.togethersInstance.mappGroupsForAddress(address)
}

export async function mappUsersInGroup(groupID){
  return await contractInstance.togethersInstance.mappUsersInGroup(groupID)
}

export async function checkNameUnicity(digest){
  return await contractInstance.togethersInstance.checkNameUnicity(digest)
}

export async function checkGroupUnicity(address,digest){
  return await contractInstance.togethersInstance.checkGroupUnicity(address,digest)
}

export async function mappAskForAdd(address,groupID){
  return await contractInstance.togethersInstance.mappAskForAdd(address,groupID)
}

export async function getUserName(_group,_num){
  return await contractInstance.getUserName(_group,_num)
}

export async function getUserName2(_group,_num){
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
