import React from 'react';
import {
  createAppContainer,
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
    LoadPrivateKey: { screen: Views.LoadPrivateKey },
    LoadWallet: { screen: Views.LoadWallet },
    NewWallet: { screen: Views.NewWallet },
    NewWalletName: { screen: Views.NewWalletName },
    SelectDestination: { screen: Views.SelectDestination },
    Settings: { screen: Views.Settings },
    ShowPrivateKey: { screen: Views.ShowPrivateKey },
    WalletDetails: { screen: Views.WalletDetails },
    WalletsOverview: { screen: Views.WalletsOverview },

    AddProfile: { screen: Views.TogethersApplication.AddProfile },
    AskGroup: { screen: Views.TogethersApplication.AskGroup },
    ConfirmPayment: { screen: Views.TogethersApplication.ConfirmPayment },
    CreateGroup: { screen: Views.TogethersApplication.CreateGroup },
    Crypto: { screen: Views.TogethersApplication.Crypto },
    MyProfile: { screen: Views.TogethersApplication.MyProfile },
    Pay: { screen: Views.TogethersApplication.Pay },
    Pending: { screen: Views.TogethersApplication.Pending },
    ProfileData: { screen: Views.TogethersApplication.ProfileData },
    Profiles: { screen: Views.TogethersApplication.Profiles },
    Register: { screen: Views.TogethersApplication.Register },

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

export default AppContainer;
