async function createGroup(togethers, args, overrides) {
  const { value } = args
  await togethers.createGroup(value,overrides)
}

async function ask(togethers, args, overrides) {
  const { value } = args
  await togethers.ask(value,overrides)
}

async function createProfile(togethers, args, overrides) {
  const { groupID, value } = args
  await togethers.createProfile(groupID,value,overrides)
}

async function changePassword(togethers, args, overrides) {
  const { password1 } = args
  await togethers.changePassword(password1,overrides)
}

async function changeUserName(togethers, args, overrides) {
  const { name } = args
  await togethers.changeUserName(name,overrides)
}

async function withdrawFunds(togethers, args, overrides) {
  const { groupID } = args
  await togethers.withdrawFunds(groupID,overrides)
}

async function payForFunds(togethers, args, overrides) {
  const { address, groupID, value, crypto } = args
  return await togethers.withdrawFunds(address,groupID,value,crypto,overrides)
}

async function askForFunds(togethers, args, overrides) {
  const { groupID, value } = args
  return await togethers.askForFunds(groupID,value,overrides)
}

async function quitGroup(togethers, args, overrides) {
  const { groupID } = args
  return await togethers.quitGroup(groupID,overrides)
}

async function transferGroupOwnership(togethers, args, overrides) {
  const { address, groupID } = args
  return await togethers.transferGroupOwnership(address,groupID,overrides)
}

async function removeMember(togethers, args, overrides) {
  const { address, groupID } = args
  return await togethers.removeMember(address,groupID,overrides)
}
