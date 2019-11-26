import { Contracts as contractInstance } from '@common/actions';

export async function urls(spaceID,signer){
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  return await spaceManagerInstance.urls(spaceID)
}

export async function lockedSpace(spaceID,signer){
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  return await spaceManagerInstance.lockedSpace(spaceID)
}

export async function mappSociety(spaceID,signer){
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  return await spaceManagerInstance.mappSociety(spaceID)
}

export async function checkedSociety(spaceID,signer){
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  return await spaceManagerInstance.checkedSociety(spaceID)
}

export async function isApproved(societyID,signer){
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  return await spaceManagerInstance.isApproved(societyID)
}

export async function mappIDSocietyToHash(spaceID,signer){
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  return await spaceManagerInstance.mappIDSocietyToHash(spaceID)
}

export async function mappSpacesList(spaceID,signer){
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  return await spaceManagerInstance.mappSpacesList(spaceID)
}

export async function balckList(spaceID,signer){
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  return await spaceManagerInstance.balckList(spaceID)
}

export async function mappPassword(spaceID,signer){
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  return await spaceManagerInstance.mappPassword(spaceID)
}

export async function TGTCPrice(spaceID,signer){
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  return await spaceManagerInstance.TGTCPrice(spaceID)
}

export async function MaxTokenCount(signer){
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  return await spaceManagerInstance.MaxTokenCount()
}

export async function spacePrice(signer){
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  return await spaceManagerInstance.spacePrice()
}

export async function getSpaceInfoName(spaceID,signer){
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  return await spaceManagerInstance.getSpaceInfoName(spaceID)
}

export async function getSpaceInfoSIRET(spaceID,signer){
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  return await spaceManagerInstance.getSpaceInfoSIRET(spaceID)
}

export async function getNBSpaces(address,signer){
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  return await spaceManagerInstance.getNBSpaces(address)
}

export async function getLastSpaceID(signer){
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  return await spaceManagerInstance.getNBSpaces()
}

export async function registerSociety(password,name,siret,signatory,emai,signerl) {
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  await spaceManagerInstance.registerSociety(password,name,siret,signatory,email)
}

export async function getTGTCs(amount,signer) {
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  await spaceManagerInstance.getTGTCs(_password)
}

export async function modifySpaces(list,url) {
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  await spaceManagerInstance.modifySpaces(list,url)
}

export async function lockSpaces(list,signer) {
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  await spaceManagerInstance.lockSpaces(list)
}

export async function buySpaces(list,signer) {
  let spaceManagerInstance = contractInstance.spaceManagerInstance(signer)
  await spaceManagerInstance.buySpaces(list)
}
