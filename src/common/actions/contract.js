export async function createGroup(togethers, args, overrides) {
  const { groupName } = args
  await togethers.createGroup(groupName,overrides)
}

export async function ask(togethers, args, overrides) {
  const { value } = args
  await togethers.ask(value,overrides)
}

export async function createProfile(togethers, args, overrides) {
  const { groupID, value } = args
  await togethers.createProfile(groupID,value,overrides)
}

export async function changePassword(togethers, args, overrides) {
  const { password1 } = args
  await togethers.changePassword(password1,overrides)
}

export async function changeUserName(togethers, args, overrides) {
  const { name } = args
  await togethers.changeUserName(name,overrides)
}

export async function withdrawFunds(togethers, args, overrides) {
  const { groupID } = args
  await togethers.withdrawFunds(groupID,overrides)
}

export async function payForFunds(togethers, args, overrides) {
  const { address, groupID, value, crypto } = args
  await togethers.withdrawFunds(address,groupID,value,crypto,overrides)
}

export async function askForFunds(togethers, args, overrides) {
  const { groupID, value } = args
  await togethers.askForFunds(groupID,value,overrides)
}

export async function quitGroup(togethers, args, overrides) {
  const { groupID } = args
  await togethers.quitGroup(groupID,overrides)
}

export async function transferGroupOwnership(togethers, args, overrides) {
  const { address, groupID } = args
  await togethers.transferGroupOwnership(address,groupID,overrides)
}

export async function removeMember(togethers, args, overrides) {
  const { address, groupID } = args
  await togethers.removeMember(address,groupID,overrides)
}
