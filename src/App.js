import React, { Component } from "react"
import { CssBaseline } from "@material-ui/core"

import LoginScreen from './components/screens/LoginScreen'
import AskGroupScreen from './components/screens/AskGroupScreen'
import AddProfileScreen from './components/screens/AddProfileScreen'
import DemandScreen from './components/screens/DemandScreen'
import CreateGroupScreen from './components/screens/CreateGroupScreen'
import RegisterNewUserScreen from './components/screens/RegisterNewUserScreen'
import LanguagesScreen from './components/screens/LanguagesScreen'
import GroupsScreen from './components/screens/GroupsScreen'
import CryptoScreen from './components/screens/CryptoScreen'
import ProfilesScreen from './components/screens/ProfilesScreen'
import ProfileDataScreen from './components/screens/ProfileDataScreen'
import PayScreen from './components/screens/PayScreen'
import PendingScreen from './components/screens/PendingScreen'
import MyProfileScreen from './components/screens/MyProfileScreen'
import UploadIPFSScreen from './components/screens/UploadIPFSScreen'
import NameScreen from './components/screens/NameScreen'
import WoopsScreen from './components/screens//WoopsScreen'
import ConfirmPaymentScreen from './components/screens/ConfirmPaymentScreen'
import ConnectScreen from './components/screens/ConnectScreen'

import Welcome from '../Welcome';

import { BrowserRouter as Router, Route } from 'react-router-dom' //HashRoute before build for deploy on ipfs
import logo from '../../logo.png'
import "../../App.css"

export default class AppNavigation extends Component {
  render() {

    return (

      <React.Fragment>
        <CssBaseline />

          <div className="header">
            <div className="container_logo">
              <div className="logo">
                <img className="img_logo" src={ logo } alt="" />
              </div>

              <div className="UNION">
                <h1>ETHER UNION</h1>
              </div>

              <div className="commentStyle">
                Send or receive ethers, stay connected with yours and earn tokens,
                enter in a new social network system of consuming and play to our super lotery
              </div>

            </div>
          </div>


          <div className="main_content">

            <Grid container alignItems="center" justify="center">
              <Grid item xs={8} lg={10} >
                <Router>
                  <Route exact path="/welcome" component={LoginScreen}/>
                  <Route exact path="/groups" component={GroupsScreen}/>
                  <Route exact path="/groups/friends" component={ProfilesScreen}/>
                  <Route exact path="/groups/friends/data" component={ProfileDataScreen}/>
                  <Route exact path="/groups/apply" component={AskGroupScreen}/>
                  <Route exact path="/groups/add" component={AddProfileScreen}/>
                  <Route exact path="/groups/ask" component={DemandScreen}/>
                  <Route exact path="/ceateGroup" component={CreateGroupScreen}/>
                  <Route exact path="/user/pseudo" component={RegisterNewUserScreen}/>
                  <Route exact path="/language" component={LanguagesScreen}/>
                  <Route exact path="/groups/friends/data/pay" component={PayScreen}/>
                  <Route exact path="/groups/friends/data/crypto" component={CryptoScreen}/>
                  <Route exact path="/groups/myData" component={MyProfileScreen}/>
                  <Route exact path="/user/uploadImage" component={UploadIPFSScreen}/>
                  <Route exact path="/user/pseudo" component={NameScreen}/>
                </Router>
              </Grid>
            </Grid>
          </div >

      </React.Fragment>
    )
  }
}
