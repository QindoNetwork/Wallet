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
    ChangeCurrency: { screen: Views.ChangeCurrency },
    ConfirmMnemonics: { screen: Views.ConfirmMnemonics },
    ConfirmTransaction: { screen: Views.ConfirmTransaction },
    CreateMnemonics: { screen: Views.CreateMnemonics },
    CreateWallet: { screen: Views.CreateWallet },
    LoadMnemonics: { screen: Views.LoadMnemonics },
    NewWallet: { screen: Views.NewWallet },
    NewWalletName: { screen: Views.NewWalletName },
    SelectDestination: { screen: Views.SelectDestination },
    SendCoins: { screen: Views.SendCoins },
    Settings: { screen: Views.Settings },
    ShowPrivateKey: { screen: Views.ShowPrivateKey },
    WalletDetails: { screen: Views.WalletDetails },
    WalletsOverview: { screen: Views.WalletsOverview },

    AddProfile: { screen: Views.AddProfile },
    AskGroup: { screen: Views.AskGroup },
    CreateGroup: { screen: Views.CreateGroup },
    Crypto: { screen: Views.Crypto },
    MyProfile: { screen: Views.MyProfile },
    Pay: { screen: Views.Pay },
    Profiles: { screen: Views.Profiles },
    Register: { screen: Views.Register },
    Groups: { screen: Views.Groups },
    Login: { screen: Views.Login },
    AddGroup: { screen: Views.AddGroup },
    OpenDemand: { screen: Views.OpenDemand },
    CloseDemand: { screen: Views.CloseDemand },

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
