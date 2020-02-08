import { sha256 } from 'react-native-sha256';
import { General as GeneralActions  } from '@common/actions';
import { Contracts as contractsAddress } from '@common/constants';
import { Languages as LanguagesActions, Wallets as WalletsActions } from '@common/actions';

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
  if (await parseInt (togethers.groupNumber(),10) < groupID)
  {
    result = "KO"
    GeneralActions.notify('this group does not exists', 'long');
  }
  if (new Boolean (await togethers.mappAskForAdd(address,groupID)) == true)
  {
    result = "KO"
    GeneralActions.notify('you already asked', 'long');
  }
  if (result === "OK") {
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
    if(await new Boolean(togethers.mappAskForAdd(value,groupID)) == false)
    {
      GeneralActions.notify("this user did not ask to apply", 'long');
      return "KO"
    }
    const profile = await togethers.mappProfileInGroup(groupID,value)
    const isMember = new Boolean(profile.isMember)
    if(isMember == true)
    {
      GeneralActions.notify("Is member already", 'long');
      return "KO"
    }
    if (result === "OK")
    {
    await togethers.createProfile(groupID,value,overrides)
    }
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
  return result
}

export async function changePassword(togethers, args, overrides) {
  const { value, oldPassword } = args
  let result = "OK"
  try {
    if (parseInt (await togethers.connectUser(hashPassword),10) === 1)
    {
      result = "KO"
      GeneralActions.notify('password not good', 'long');
    }
    else await togethers.changePassword(value,overrides)
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
    return result
  }

export async function changeUserName(togethers, args, address, overrides) {
  const { value } = args
  let result = "OK"
  try {
    if (parseInt(await togethers.verifyUserAvailability(value),10) === 0 )
    {
      result = "KO"
      GeneralActions.notify('Username unavailable', 'long');
    }
    else {
      await togethers.changeUserName(value,overrides)
      await WalletsActions.changeWalletName(address, value);
    }
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

export async function quitGroup(togethers, args, address, overrides) {
  const { groupID } = args
  let result = "OK"
  let notlastOne = 0
  try {
    const users = await togethers.getProfiles(groupID)
    for (let i = 0; i < users.length; i++)
    {
      if (new Boolean(mappProfileInGroup[groupID][users[i]].isMember) == true && users[i] != address)
      {
        notlastOne = 1;
        break;
      }
    }
    if (owner == true && notlastOne === 0)
    {
      GeneralActions.notify("admin cannot quit if is not last", 'long');
      result = "KO"
    }
    if (active == true)
    {
      GeneralActions.notify("close your demand before", 'long');
      result = "KO"
    }
    if (result === "OK")
    {
      await togethers.quitGroup(groupID,overrides)
    }
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
    const active = new Boolean (await togethers.mappUsersInGroup(groupID).active)
    if (active == true)
    {
      GeneralActions.notify("the user have to close his demand", 'long');
      result = "KO"
    }
    else await togethers.removeMember(target,groupID,overrides)
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
  return result
}
