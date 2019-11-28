import { Contracts as contractInstance } from '@common/actions';

export async function urls(spaceID){
  return await contractInstance.spaceManagerInstance.urls(spaceID)
}

export async function lockedSpace(spaceID){
  return await contractInstance.spaceManagerInstance.lockedSpace(spaceID)
}

export async function mappSociety(spaceID){
  return await contractInstance.spaceManagerInstance.mappSociety(spaceID)
}

export async function checkedSociety(spaceID){
  return await contractInstance.spaceManagerInstance.checkedSociety(spaceID)
}

export async function isApproved(societyID){
  return await contractInstance.spaceManagerInstance.isApproved(societyID)
}

export async function mappIDSocietyToHash(spaceID){
  return await contractInstance.spaceManagerInstance.mappIDSocietyToHash(spaceID)
}

export async function mappSpacesList(spaceID){
  return await contractInstance.spaceManagerInstance.mappSpacesList(spaceID)
}

export async function balckList(spaceID){
  return await contractInstance.spaceManagerInstance.balckList(spaceID)
}

export async function mappPassword(spaceID){
  return await contractInstance.spaceManagerInstance.mappPassword(spaceID)
}

export async function TGTCPrice(spaceID){
  return await contractInstance.spaceManagerInstance.TGTCPrice(spaceID)
}

export async function MaxTokenCount(){
  return await contractInstance.spaceManagerInstance.MaxTokenCount()
}

export async function spacePrice(){
  return await contractInstance.spaceManagerInstance.spacePrice()
}

export async function getSpaceInfoName(spaceID){
  return await contractInstance.spaceManagerInstance.getSpaceInfoName(spaceID)
}

export async function getSpaceInfoSIRET(spaceID){
  return await contractInstance.spaceManagerInstance.getSpaceInfoSIRET(spaceID)
}

export async function getNBSpaces(address){
  return await contractInstance.spaceManagerInstance.getNBSpaces(address)
}

export async function getLastSpaceID(){
  return await contractInstance.spaceManagerInstance.getNBSpaces()
}
