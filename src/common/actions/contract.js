import { sha256 } from 'react-native-sha256';
import { General as GeneralActions  } from '@common/actions';

export async function setUser(togethers, args, overrides) {
  const { pseudo,password1,password2 } = args
  let result = "OK"
  try {
    if (!pseudo) {
      result = "KO"
      GeneralActions.notify("Pseudo required", 'long');
    }
    if (password1 !== password2) {
      result = "KO"
      GeneralActions.notify("Passwords not equals", 'long');
    }
    if ( parseInt(await togethers.verifyUserAvailability(pseudo)) !== 1 ) {
      result = "KO"
      GeneralActions.notify("pseudonyme already exists", 'long');
    }
    if (result === "OK") {
      const hashPassword = sha256(password1)
      await togethers.setUser(pseudo,hashPassword,overrides)
    }
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
  return result
}

export async function createGroup(togethers, args, overrides) {
  const { groupName } = args
  let result = "OK"
  try {
    await togethers.createGroup(groupName,overrides)
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
  return result
}

export async function ask(togethers, args, address, overrides) {
  const { groupID } = args
  let result = "OK"
  try {
  if (await togethers.groupNumber() < groupID)
  {
    result = "KO"
    GeneralActions.notify('this group does not exists', 'long');
  }
  if (await togethers.getGroupsLength(address) >= togethers.MAX())
  {
    result = "KO"
    GeneralActions.notify('you have too many groups', 'long');
  }
  if (await togethers.getUsersLength(groupID) >= togethers.MAX())
  {
    result = "KO"
    GeneralActions.notify('there is too many members in this group', 'long');
  }
  if (await togethers.verifyGroupAsked(groupID,address) === 1)
  {
    result = "KO"
    GeneralActions.notify('you already asked', 'long');
  }
  if (result = "OK") {
    await togethers.ask(groupID,overrides)
  }
}catch (e) {
  GeneralActions.notify(e.message, 'long');
  result = "KO"
}
  return result
}

export async function createProfile(togethers, args, overrides) {
  const { groupID, value } = args
  let result = "OK"
  try {
    if(await parseInt ( togethers.verifyGroupAsked(groupID,value),10) === 1)
    {
      GeneralActions.notify("You cannot add this profile or he did not ask to apply", 'long');
      return "KO"
    }
    await togethers.createProfile(groupID,value,overrides)
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
  return result
}

export async function changePassword(togethers, args, overrides) {
  const { password1 } = args
  let result = "OK"
  try {
    await togethers.changePassword(password1,overrides)
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
    return result
  }

export async function changeUserName(togethers, args, overrides) {
  const { name } = args
  let result = "OK"
  try {
    await togethers.changeUserName(name,overrides)
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
  return result
}

export async function withdrawFunds(togethers, args, overrides) {
  const { groupID } = args
  let result = "OK"
  try {
    await togethers.withdrawFunds(groupID,overrides)
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
  return result
}

export async function payForFunds(togethers, args, overrides) {
  const { address, groupID, value, crypto } = args
  let result = "OK"
  try {
    await togethers.payForFunds(address,groupID,value,crypto,overrides)
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
  return result
}

export async function askForFunds(togethers, args, overrides) {
  const { groupID, description } = args
  let result = "OK"
  try {
    await togethers.askForFunds(groupID,description,overrides)
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
  return result
}

export async function quitGroup(togethers, args, overrides) {
  const { groupID } = args
  let result = "OK"
  try {
    await togethers.quitGroup(groupID,overrides)
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
  return result
}

export async function transferGroupOwnership(togethers, args, overrides) {
  const { target, groupID } = args
  let result = "OK"
  try {
    await togethers.transferGroupOwnership(target,groupID,overrides)
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
  return result
}

export async function removeMember(togethers, args, overrides) {
  const { target, groupID } = args
  let result = "OK"
  try {
    await togethers.removeMember(target,groupID,overrides)
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
  return result
}
