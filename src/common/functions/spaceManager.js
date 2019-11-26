import { Wallet as Walletutils } from '@common/utils';

let contractInstance = Walletutils.spaceManagerInstance()

export async function urls(spaceID){
  return await contractInstance.urls(spaceID)
}

export async function lockedSpace(spaceID){
  return await contractInstance.lockedSpace(spaceID)
}

export async function mappSociety(spaceID){
  return await contractInstance.mappSociety(spaceID)
}

export async function checkedSociety(spaceID){
  return await contractInstance.checkedSociety(spaceID)
}

export async function isApproved(societyID){
  return await contractInstance.isApproved(societyID)
}

export async function mappIDSocietyToHash(spaceID){
  return await contractInstance.mappIDSocietyToHash(spaceID)
}

export async function mappSpacesList(spaceID){
  return await contractInstance.mappSpacesList(spaceID)
}

export async function balckList(spaceID){
  return await contractInstance.balckList(spaceID)
}

export async function mappPassword(spaceID){
  return await contractInstance.mappPassword(spaceID)
}

export async function TGTCPrice(spaceID){
  return await contractInstance.TGTCPrice(spaceID)
}

export async function MaxTokenCount(){
  return await contractInstance.MaxTokenCount()
}

export async function spacePrice(){
  return await contractInstance.spacePrice()
}

export async function getSpaceInfoName(spaceID){
  return await contractInstance.getSpaceInfoName(spaceID)
}

export async function getSpaceInfoSIRET(spaceID){
  return await contractInstance.getSpaceInfoSIRET(spaceID)
}

export async function getNBSpaces(address){
  return await contractInstance.getNBSpaces(address)
}

export async function getLastSpaceID(){
  return await contractInstance.getNBSpaces()
}

export async function registerSociety(password,name,siret,signatory,email) {
    await contractInstance.registerSociety(password,name,siret,signatory,email)
}

export async function getTGTCs(amount) {
    await contractInstance.getTGTCs(_password)
}

export async function modifySpaces(list,url) {
    await contractInstance.modifySpaces(list,url)
}

export async function lockSpaces(list) {
    await contractInstance.lockSpaces(list)
}

export async function buySpaces(list) {
    await contractInstance.buySpaces(list)
}
