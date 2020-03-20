import React from 'react';
import {
  createAppContainer,
  NavigationActions,
  createStackNavigator
} from 'react-navigation';
import * as Views from './components/views';
import { colors } from './common/styles';

export const INITIAL_ROUTE = 'WalletsOverview';

const navigator = createStackNavigator(
  {
    ConfirmTransaction: { screen: Views.ConfirmTransaction },
    CreateMnemonics: { screen: Views.CreateMnemonics },
    CreateWallet: { screen: Views.CreateWallet },
    LoadMnemonics: { screen: Views.LoadMnemonics },
    NewWallet: { screen: Views.NewWallet },
    NewWalletName: { screen: Views.NewWalletName },
    SelectDestination: { screen: Views.SelectDestination },
    SendCoins: { screen: Views.SendCoins },
    WalletDetails: { screen: Views.WalletDetails },
    WalletsOverview: { screen: Views.WalletsOverview },
    AddProfile: { screen: Views.AddProfile },
    AskGroup: { screen: Views.AskGroup },
    CreateGroup: { screen: Views.CreateGroup },
    ProfileData: { screen: Views.ProfileData },
    Profiles: { screen: Views.Profiles },
    Groups: { screen: Views.Groups },
    Login: { screen: Views.Login },
    AddGroup: { screen: Views.AddGroup },
    OpenDemand: { screen: Views.OpenDemand },
    CloseDemand: { screen: Views.CloseDemand },
    CryptoType1: { screen: Views.CryptoType1 },
    CryptoType2: { screen: Views.CryptoType2 },
    SendCoinsType1: { screen: Views.SendCoinsType1 },
    ChangePseudonyme: { screen: Views.ChangePseudonyme },
    ChangePassword: { screen: Views.ChangePassword },
    ChangeLanguage: { screen: Views.ChangeLanguage },
    AdminProfile: { screen: Views.AdminProfile },
    ConfirmSwap: { screen: Views.ConfirmSwap },
    MainHistory: { screen: Views.MainHistory },
    MainSwap: { screen: Views.MainSwap },
    MainNetwork: { screen: Views.MainNetwork },
    MainSend: { screen: Views.MainSend },
    MainReceive: { screen: Views.MainReceive },
    MainSettings: { screen: Views.MainSettings }
  },
  {
    initialRouteName: INITIAL_ROUTE,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary
      },
      headerTintColor: colors.secondary,
      tintColor: colors.secondary
    }
  }
);

const AppContainer = createAppContainer(navigator);

const parentGetStateForAction = navigator.router.getStateForAction;

navigator.router.getStateForAction = (action, inputState) => {
  const state = parentGetStateForAction(action, inputState);

  // fix it up if applicable
  if (state && action.type === NavigationActions.NAVIGATE) {
    if (action.params && action.params.replaceRoute) {
      const leave = action.params.leave || 1;
      delete action.params.replaceRoute;
      while (state.routes.length > leave && state.index > 0) {
        const oldIndex = state.index - 1;
        // remove one that we are replacing
        state.routes.splice(oldIndex, 1);
        // index now one less
        state.index = oldIndex;
      }
    }
  }

  return state;
};

export default AppContainer;
