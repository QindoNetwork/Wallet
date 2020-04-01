import { sha256 } from 'react-native-sha256';
import { General as GeneralActions  } from '@common/actions';
import { Contracts as contractsAddress } from '@common/constants';
import { Languages as LanguagesActions, Wallets as WalletsActions } from '@common/actions';

export async function createGroup(togethers, args, overrides,languages) {
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

export async function ask(togethers, args, address, overrides,languages) {
  const { groupID } = args
  let result = "OK"
  try {
  if (await parseInt (togethers.groupNumber(),10) < groupID)
  {
    result = "KO"
    GeneralActions.notify(LanguagesActions.label1(languages), 'long');
  }
  const profile = await togethers.getProfileInGroup(groupID,address)
  if (new Boolean (profile.ask) == true)
  {
    result = "KO"
    GeneralActions.notify(LanguagesActions.label2(languages), 'long');
  }
  if (new Boolean (profile.isMember) == true)
  {
    result = "KO"
    GeneralActions.notify(LanguagesActions.label169(languages), 'long');
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

export async function createProfile(togethers, args, overrides,languages) {
  const { groupID, value } = args
  let result = "OK"
  try {
    const profile = await togethers.getProfileInGroup(groupID,value)
    if(new Boolean(profile.ask) == false)
    {
      GeneralActions.notify(LanguagesActions.label3(languages), 'long');
      return "KO"
    }
    if(new Boolean(profile.isMember) == true)
    {
      GeneralActions.notify(LanguagesActions.label4(languages), 'long');
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

export async function changePassword(togethers, args, overrides,languages) {
  const { value, oldPassword } = args
  let result = "OK"
  try {
    if (parseInt (await togethers.connectUser(hashPassword),10) === 1)
    {
      result = "KO"
      GeneralActions.notify(LanguagesActions.label5(languages), 'long');
    }
    else await togethers.changePassword(value,overrides)
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
    return result
  }

export async function changeUserName(togethers, args, address, overrides,languages) {
  const { value } = args
  let result = "OK"
  try {
    if (parseInt(await togethers.verifyUserAvailability(value),10) === 0 )
    {
      result = "KO"
      GeneralActions.notify(LanguagesActions.label6(languages), 'long');
    }
    else {
      await togethers.changeUserName(value,overrides)
      WalletsActions.changeWalletName(address, value);
    }
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
  return result
}

export async function withdrawFunds(togethers, args, overrides,languages) {
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

export async function askForFunds(togethers, args, overrides,languages) {
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

export async function quitGroup(togethers, args, address, overrides,languages) {
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

export async function transferGroupOwnership(togethers, args, overrides,languages) {
  const { target, groupID } = args
  let result = "OK"
  try {
    await togethers.transferGroupOwnership(groupID,target,overrides)
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
  return result
}

export async function removeMember(togethers, args, overrides,languages) {
  const { target, groupID } = args
  let result = "OK"
  try {
    const active = new Boolean (await (togethers.getProfiles(groupID)).active)
    if (active == true)
    {
      GeneralActions.notify(LanguagesActions.label6(languages), 'long');
      result = "KO"
    }
    else await togethers.removeMember(target,groupID,overrides)
  }catch (e) {
    GeneralActions.notify(e.message, 'long');
    result = "KO"
  }
  return result
}
