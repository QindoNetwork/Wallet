import { drizzleConnect } from "drizzle-react"
import React, { Component } from "react";
import {ScrollView, View, ActivityIndicator, TouchableOpacity, Text, Alert} from 'react-native';
import PropTypes from "prop-types";
import { ListItem, List } from "react-native-elements";

import { MyProfileScreen, ProfileDataScreen, DemandScreen, AddProfileScreen } from "./Details";

import styles from '../Styles'

class ProfilesList extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.state = {
      dataKey2: null,
      dataKey1: [],
      dataKey: [],
      dataKey3: null,
      dataKey4: [],
      dataKey5: [],
      dataKey7: [],
      dataKey8: [],
      dataKey9: [],
    };
  }

  renderProfileDataScreen(param1,param2,param3,param4,param5,param6) {
    return      (
      <ProfileDataScreen
      account={this.props.account}
      groupID={this.props.groupID}
      gasPrice={this.props.gasPrice}
      navigation={this.props.navigation}
      balance={this.props.balance}
      cryptoSymbols={param1}
      cryptoDisabled={param2}
      cryptoStoped={param3}
      size={this.props.size}
      owner={param4}
      list={param5}
      demandID={param6}
      />)
  }

  renderDemandScreen(param1) {
    return      (
      <DemandScreen
      account={this.props.account}
      groupID={[this.props.groupID]}
      gasPrice={this.props.gasPrice}
      cryptoDisabled={param1}
      navigation={this.props.navigation}
      />
    )
  }

  renderAddProfileScreen() {
    return      (
      <AddProfileScreen
      account={this.props.account}
      groupID={this.props.groupID}
      gasPrice={this.props.gasPrice}
      navigation={this.props.navigation}
      />
    )
  }

  renderMyProfileScreen(param1,param2,param3,param4,param5,param6) {
    return      (
      <MyProfileScreen
      account={this.props.account}
      groupID={this.props.groupID}
      navigation={this.props.navigation}
      user={param1}
      displayData={param2}
      cryptoStoped={param3}
      cryptoAmounts={param4}
      cryptoSymbols={param5}
      size={this.props.size}
      length={param6}
      />
    )
  }


  renderQuit() {
    return       <TouchableOpacity
              style={styles.button}
              onPress={() => { Alert.alert(
                'Confirm',
                'Are you sure you want quit this group? this action will take few minuts you will be notified if success',
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'Yes', onPress: () => this.quit()},
                  ]
                )
            }
          }>
              <Text style={styles.label}>QUIT GROUP</Text>
          </TouchableOpacity>
  }

  quit = () => {
    this.contracts["Togethers"].methods["quitGroup"].cacheSend(this.props.groupID, {gas: 200000, from: this.props.account, gasPrice: this.props.gasPrice/2})
    return this.props.navigation.navigate('PendingScreen')
  }


  componentDidMount() {

    let keys = []
    let disabled = []
    let stoped = []
    let names = []
    let names2 = []
    let keys2 = []
    let symbols = []
    for ( var i = 0; i < 200; i++) {
      keys.push(this.contracts["Togethers"].methods["getUserAddress"].cacheCall(this.props.groupID,i,{from: this.props.account}))
      names.push(this.contracts["Togethers"].methods["getUserName"].cacheCall(this.props.groupID,i,{from: this.props.account}))
      names2.push(this.contracts["Togethers"].methods["getUserName2"].cacheCall(this.props.groupID,i,{from: this.props.account}))
      }
    for ( var j = 0; j < this.props.size; j++) {
      disabled.push(this.contracts["Togethers"].methods["disableCrypto"].cacheCall(j))
      stoped.push(this.contracts["Togethers"].methods["stopCrypto"].cacheCall(j))
      keys2.push(this.contracts["Togethers"].methods["mappGiven"].cacheCall(this.props.groupID,this.props.account,j,{from: this.props.account}))
      symbols.push(this.contracts["Togethers"].methods["getTokenSymbol"].cacheCall(j))
    }

    this.setState({
                  dataKey1 : keys,
                  dataKey : names,
                  dataKey5 : names2,
                  dataKey2 : this.contracts["Togethers"].methods["getUsersLength"].cacheCall(this.props.groupID,{from: this.props.account}),
                  dataKey3 : this.contracts["Togethers"].methods["mappProfileInGroup"].cacheCall(this.props.groupID,this.props.account,{from: this.props.account}),
                  dataKey4 : keys2,
                  dataKey7 : symbols,
                  dataKey8 : disabled,
                  dataKey9 : stoped,
                })
  }


  render() {

        // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
        if (
          !(this.state.dataKey7[this.props.size - 1] in
            this.props.contracts["Togethers"]["getTokenSymbol"]

            &&

            this.state.dataKey4[this.props.size - 1] in
            this.props.contracts["Togethers"]["mappGiven"]

            &&

            this.state.dataKey3 in
            this.props.contracts["Togethers"]["mappProfileInGroup"]

            &&

            this.state.dataKey2 in
            this.props.contracts["Togethers"]["getUsersLength"]

            &&

            this.state.dataKey1[this.props.max - 1] in
            this.props.contracts["Togethers"]["getUserAddress"]

            &&

            this.state.dataKey[this.props.max - 1] in
            this.props.contracts["Togethers"]["getUserName"]

            &&

            this.state.dataKey5[this.props.max - 1] in
            this.props.contracts["Togethers"]["getUserName2"]

            &&

            this.state.dataKey8[this.props.size - 1] in
            this.props.contracts["Togethers"]["disabled"]

            &&

            this.state.dataKey9[this.props.size - 1] in
            this.props.contracts["Togethers"]["stoped"]


          )
        ) {
          return <ActivityIndicator size="large" color="#0000ff" />;
        }

        var length = this.props.contracts["Togethers"]["getUsersLength"][this.state.dataKey2].value;

        let myPseudo = ""
        let list = []
        let cryptoAmounts = []
        let cryptoSymbols = []
        let cryptoDisabled = []
        let cryptoStoped = []

        for ( var i =0; i < length; i++) {
          if (this.props.contracts["Togethers"]["getUserAddress"][this.state.dataKey1[i]].value != this.props.account)
          {

        list.push({key: this.props.contracts["Togethers"]["getUserAddress"][this.state.dataKey1[i]].value,
                  name: this.props.contracts["Togethers"]["getUserName"][this.state.dataKey[i]].value,
                  name2: this.props.contracts["Togethers"]["getUserName2"][this.state.dataKey5[i]].value})
                }
        else
        {
           myPseudo = this.props.contracts["Togethers"]["getUserName"][this.state.dataKey[i]].value
        }

        }

        for ( var j =0; j < this.props.size; j++) {
          cryptoSymbols.push(this.props.contracts["Togethers"]["getTokenSymbol"][this.state.dataKey7[j]].value)
          cryptoAmounts.push(this.props.contracts["Togethers"]["mappGiven"][this.state.dataKey4[j]].value)
          cryptoDisabled.push(new Boolean(this.props.contracts["Togethers"]["disabled"][this.state.dataKey8[j]].value))
          cryptoStoped.push(new Boolean(this.props.contracts["Togethers"]["stoped"][this.state.dataKey9[j]].value))
        }


var displayData = this.props.contracts["Togethers"]["mappProfileInGroup"][this.state.dataKey3].value;
let owner = new Boolean(displayData[3]);
let open = new Boolean(displayData[1]);

if (open == false)
{
  if (owner == true)
  {
    if (this.props.max > length)
    {
    return (
      <View style={styles.inputWrapper}>
        <ScrollView>
          {this.renderProfileDataScreen(cryptoSymbols,cryptoDisabled,cryptoStoped,owner,list,displayData[4])}
        </ScrollView>
          {this.renderDemandScreen(cryptoDisabled)}
          {this.renderQuit()}
          {this.renderAddProfileScreen()}
      </View>
      )
    }
    else
    {
    return (
      <View style={styles.inputWrapper}>
        <ScrollView>
          {this.renderProfileDataScreen(cryptoSymbols,cryptoDisabled,cryptoStoped,owner,list,displayData[4])}
        </ScrollView>
          {this.renderDemandScreen(cryptoDisabled)}
          {this.renderQuit()}
      </View>
      )
    }
  }
  else
  {
    return (

      <View style={styles.inputWrapper}>
        <ScrollView>
        {this.renderProfileDataScreen(cryptoSymbols,cryptoDisabled,cryptoStoped,owner,list,displayData[4])}
      </ScrollView>
      {this.renderDemandScreen(cryptoDisabled)}
      {this.renderQuit()}
      </View>
    )
  }

}

else

{

  if (owner == true)
  {
    if (this.props.max > length)
    {

      return (

        <View style={styles.inputWrapper}>
      <ScrollView>
      {this.renderProfileDataScreen(cryptoSymbols,cryptoDisabled,cryptoStoped,owner,list,displayData[4])}
        </ScrollView>
        {this.renderMyProfileScreen(myPseudo,displayData,cryptoStoped,cryptoAmounts,cryptoSymbols,length)}
        {this.renderQuit()}
        {this.renderAddProfileScreen()}
        </View>
    )
    }
    else
    {

      return (

        <View style={styles.inputWrapper}>
      <ScrollView>
      {this.renderProfileDataScreen(cryptoSymbols,cryptoDisabled,cryptoStoped,owner,list,displayData[4])}
        </ScrollView>
        {this.renderMyProfileScreen(myPseudo,displayData,cryptoStoped,cryptoAmounts,cryptoSymbols,length)}
        {this.renderQuit()}
        </View>
    )
  }
}
else
{
  return(
  <View style={styles.inputWrapper}>
  <ScrollView>
  {this.renderProfileDataScreen(cryptoSymbols,cryptoDisabled,cryptoStoped,owner,list,displayData[4])}
  </ScrollView>
  {this.renderMyProfileScreen(myPseudo,displayData,cryptoStoped,cryptoAmounts,cryptoSymbols,length)}
  {this.renderQuit()}
  </View>
)
}
}
}
}


ProfilesList.contextTypes = {
  drizzle: PropTypes.object,
};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts,
  };
};

export default drizzleConnect(ProfilesList, mapStateToProps);
