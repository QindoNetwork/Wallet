import { sha256 } from 'react-native-sha256';
import { General as GeneralActions  } from '@common/actions';

export async function setUser(togethers, args, overrides) {
  const { pseudo,password1,password2 } = args
  let isOK = 1
    if (!pseudo) {
      isOK = 0
      GeneralActions.notify("Pseudo required", 'long');
    }
    if (password1 !== password2) {
      isOK = 0
      GeneralActions.notify("Passwords not equals", 'long');
    }
    if ( parseInt(await togethers.verifyUserAvailability(pseudo)) !== 1 ) {
      isOK = 0
      GeneralActions.notify("pseudonyme already exists", 'long');
    }
    if (isOK === 1) {
      const hashPassword = sha256(password1)
      await togethers.setUser(pseudo,1,hashPassword,overrides)
    }
}

export async function createGroup(togethers, args, overrides) {
  const { groupName } = args
  await togethers.createGroup(groupName,overrides)
}

export async function ask(togethers, args, address, overrides) {
  const { groupID } = args
  let isOK = 1
  if (await togethers.groupNumber() < groupID)
  {
    isOK = 0
    GeneralActions.notify('this group does not exists', 'long');
  }
  if (await togethers.getGroupsLength(address) >= togethers.MAX())
  {
    isOK = 0
    GeneralActions.notify('you have too manay groups', 'long');
  }
  if (await togethers.getUsersLength(groupID) >= togethers.MAX())
  {
    isOK = 0
    GeneralActions.notify('there is too many members in this group', 'long');
  }
  if (await togethers.verifyGroupAsked(groupID) === 1)
  {
    isOK = 0
    GeneralActions.notify('you already asked', 'long');
  }
  if (isOK === 1) {
    await togethers.ask(groupID,overrides)
  }
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
