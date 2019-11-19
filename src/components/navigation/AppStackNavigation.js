/**
 * Firechat- React-Native Firebase Chat  Stater(https://www.enappd.com)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 *
 */
 import React from 'react'

import { DrizzleProvider } from "drizzle-react"
import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from '../../app/screens/LoginScreen'
import AskGroupScreen from '../../app/screens/AskGroupScreen'
import AddProfileScreen from '../../app/screens/AddProfileScreen'
import DemandScreen from '../../app/screens/DemandScreen'
import CreateGroupScreen from '../../app/screens/CreateGroupScreen'
import RegisterNewUserScreen from '../../app/screens/RegisterNewUserScreen'
import LanguagesScreen from '../../app/screens/LanguagesScreen'
import GroupsScreen from '../../app/screens/GroupsScreen'
import CryptoScreen from '../../app/screens/CryptoScreen'
import ProfilesScreen from '../../app/screens/ProfilesScreen'
import ProfileDataScreen from '../../app/screens/ProfileDataScreen'
import PayScreen from '../../app/screens/PayScreen'
import PendingScreen from '../../app/screens/PendingScreen'
import MyProfileScreen from '../../app/screens/MyProfileScreen'
import UploadIPFSScreen from '../../app/screens/UploadIPFSScreen'
import NameScreen from '../../app/screens/NameScreen'
import WoopsScreen from '../../app/screens/WoopsScreen'
import ConfirmPaymentScreen from '../../app/screens/ConfirmPaymentScreen'
import ConnectScreen from '../../app/screens/ConnectScreen'


import WhatsappListContainer from '../../app/screens/chatLists/whatsAppList/whatsappListContainer';
import ArtboardListContainer from '../../app/screens/chatLists/artboardList/artboardListContainer';
import BreezeScreenContainer from '../../app/screens/chatScreens/breezeScreen/breezeScreenContainer';
import WhatsAppScreenContainer from '../../app/screens/chatScreens/whatsAppScreen/whatsAppScreenContainer';
import ProfileContainer from '../../app/screens/ProfilePage/profileContainer';




import drizzleOptions from "../../drizzleOptions"
import store from "../../middleware"
import LoadingContainer from "../../app/components/LoadingContainer"

export default class App extends React.Component {
  render() {
    return (
      <DrizzleProvider store={store} options={drizzleOptions}>
        <LoadingContainer>
          <Routes />
        </LoadingContainer>
      </DrizzleProvider>
    );
  }
}

const MainNavigator = createStackNavigator({


  WhatsAppScreenContainer:  {screen: WhatsAppScreenContainer},
  ConnectScreen:            {screen: ConnectScreen},

  LoginScreen:              {screen: LoginScreen},
  GroupsScreen:             {screen: GroupsScreen},
  ProfilesScreen:           {screen: ProfilesScreen},
  ProfileDataScreen:        {screen: ProfileDataScreen},
  AskGroupScreen:           {screen: AskGroupScreen},
  AddProfileScreen:         {screen: AddProfileScreen},
  DemandScreen:             {screen: DemandScreen},
  CreateGroupScreen:        {screen: CreateGroupScreen},
  RegisterNewUserScreen:    {screen: RegisterNewUserScreen},
  LanguagesScreen:          {screen: LanguagesScreen},
  PayScreen:                {screen: PayScreen},
  PendingScreen:            {screen: PendingScreen},
  CryptoScreen:             {screen: CryptoScreen},
  MyProfileScreen:          {screen: MyProfileScreen},
  UploadIPFSScreen:         {screen: UploadIPFSScreen},
  NameScreen:               {screen: NameScreen},
  WoopsScreen:              {screen: WoopsScreen},
  ConfirmPaymentScreen:     {screen: ConfirmPaymentScreen},


  WhatsApp: { screen: WhatsappListContainer },
  Artboard: { screen: ArtboardListContainer },
  Breeze: { screen: BreezeScreenContainer },
  whatsChat: { screen: WhatsAppScreenContainer },
  Profile: { screen: ProfileContainer },
},{
        initialRouteName: 'WhatsApp',
        headerMode: 'none'
    })

const Routes = createAppContainer(MainNavigator);
