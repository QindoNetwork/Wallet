import { Contracts as contractInstance } from '@common/actions';

export async function ID(signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.ID()
}

export async function MAX(signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.MAX()
}

export async function groupNumber(signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.groupNumber()
}

export async function ratioForReward(signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.ratioForReward()
}

export async function tgtcAmount(signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.tgtcAmount()
}

export async function disableCrypto(crypto,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.disableCrypto(crypto)
}

export async function mappGiven(groupID,address,crypto,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.mappGiven(groupID,address,crypto)
}

export async function mappSpaceInfo(spaceID,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.mappSpaceInfo(spaceID)
}

export async function getTokenAddress(crypto,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.getTokenAddress(crypto)
}

export async function getTokenDecimal(crypto,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.getTokenDecimal(crypto)
}

export async function getTokenSymbol(crypto,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.getTokenSymbol(crypto)
}

export async function getTokenName(crypto,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.getTokenName(crypto)
}

export async function mappStatsPeerToPeer(from,to,crypto,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.mappStatsPeerToPeer(from,to,crypto)
}

export async function mappAddressToUser(address,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.mappAddressToUser(address)
}

export async function mappGroupIDToGroupName(groupID,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.mappGroupIDToGroupName(groupID)
}

export async function mappProfileInGroup(groupID,address,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.mappProfileInGroup(groupID,address)
}

export async function mappGroupsForAddress(address,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.mappGroupsForAddress(address)
}

export async function mappUsersInGroup(groupID,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.mappUsersInGroup(groupID)
}

export async function checkNameUnicity(digest,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await contractInstance.checkNameUnicity(digest)
}

export async function checkGroupUnicity(address,digest,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.checkGroupUnicity(address,digest)
}

export async function mappAskForAdd(address,groupID,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await togethersInstance.mappAskForAdd(address,groupID)
}

export async function ask(spaceID,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  await togethersInstance.ask(spaceID)
}

export async function transferGroupOwnership(spaceID,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  await togethersInstance.transferGroupOwnership(spaceID)
}

export async function setUser(spaceID,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  await togethersInstance.setUser(spaceID)
}

export async function createGroup(_groupName,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  await togethersInstance.createGroup(_groupName)
}
export async function createProfile(groupID,_pseudo,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  await togethersInstance.createProfile(groupID,_pseudo)
}

export async function askForFunds(groupID,_description,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  await togethersInstance.askForFunds(groupID,_description)
}

export async function payForFunds(_publicKey,groupID,_tokenAmount,_crypto,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  await togethersInstance.payForFunds(_publicKey,groupID,_tokenAmount,_crypto)
}

export async function withdrawFunds(groupID,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  await togethersInstance.withdrawFunds(groupID)
}

export async function removeMember(_publicKey,groupID,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  await togethersInstance.removeMember(_publicKey,groupID)
}

export async function quitGroup(_groupID,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  await togethersInstance.quitGroup(_groupID)
}

export async function getUserName(_group,_num,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await contractInstance.getUserName(_group,_num)
}

export async function getUserName2(_group,_num,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await contractInstance.getUserName2(_group, _num)
}

export async function getGroup(_num,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await contractInstance.getGroup(_num)
}

export async function getUserAddress(_group,_num,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await contractInstance.getUserAddress(_group,_num)
}

export async function getGroupID(_num,signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await contractInstance.getGroupID(_num)
}

export async function getGroupsLength(signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await contractInstance.getGroupsLength()
}

export async function getUsersLength(signer){
  let togethersInstance = contractInstance.togethersInstance(signer)
  return await contractInstance.getUsersLength()
}
