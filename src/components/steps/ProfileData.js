import { drizzleConnect } from "drizzle-react"
import React, { Component } from "react";
import {ScrollView, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import PropTypes from "prop-types";
import { ListItem, SearchBar, List } from "react-native-elements";

import styles from '../Styles'

import { PayScreen, Info } from "./Details";

class ProfileData extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.state = {
      dataKey: null,
      dataKey1: [],
      dataKey2: [],
      dataKey3: [],
      dataKey4: [],
    };
  }

  renderRemove() {
    return       <TouchableOpacity
        style={styles.button}
        onPress={() => { Alert.alert(
          'Confirm',
          'Are you sure you want remove this user? this action will take few minuts you will be notified if success',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Yes', onPress: () => this.remove()},
            ]
          )
      }
    }>
        <Text style={styles.label}>REMOVE</Text>
    </TouchableOpacity>
  }

  renderTransfer() {
    return       <TouchableOpacity
        style={styles.button}
        onPress={() => { Alert.alert(
          'Confirm',
          'Are you sure you want give ownership to this user? this action will take few minuts you will be notified if success',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Yes', onPress: () => this.transferGroupOwnership()},
            ]
          )
      }
    }>
        <Text style={styles.label}>MAKE NEW OWNER</Text>
    </TouchableOpacity>
  }

  remove = () => {
    this.contracts["Togethers"].methods["removeMember"].cacheSend(this.props.profileID, this.props.groupID, {gas: 200000, from: this.props.account, gasPrice: this.props.gasPrice/2})
    return this.props.navigation.navigate('PendingScreen')
  }

  transferGroupOwnership = () => {
    this.contracts["Togethers"].methods["transferGroupOwnership"].cacheSend( this.props.groupID, this.props.profileID, {gas: 200000, from: this.props.account, gasPrice: this.props.gasPrice})
    return this.props.navigation.navigate('PendingScreen')
  }


  componentDidMount() {

    let keys = []
    let oneHand = []
    let otherHand = []
    let yourCurrent = []
    for ( var j = 0; j < this.props.size; j++) {
      keys.push(this.contracts["Togethers"].methods["mappGiven"].cacheCall(this.props.groupID,this.props.profileID,j,{from: this.props.account}))
      oneHand.push(this.contracts["Togethers"].methods["mappStatsPeerToPeer"].cacheCall(this.props.account,this.props.profileID,j,{from: this.props.account}))
      otherHand.push(this.contracts["Togethers"].methods["mappStatsPeerToPeer"].cacheCall(this.props.profileID,this.props.account,j,{from: this.props.account}))
      yourCurrent.push(this.contracts["Togethers"].methods["mappLockPay"].cacheCall(this.props.demandID, this.props.account,j,{from: this.props.account}))
    }

    this.setState({
      dataKey1 : keys,
      dataKey: this.contracts["Togethers"].methods["mappProfileInGroup"].cacheCall(this.props.groupID,this.props.profileID,{from: this.props.account}),
      dataKey2: oneHand,
      dataKey3: otherHand,
      dataKey4: yourCurrent,

                })
  }

  render() {

        // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
        if (
          !(
            this.state.dataKey in
            this.props.contracts["Togethers"]["mappProfileInGroup"]

            &&

            this.state.dataKey2[this.props.size - 1] in
            this.props.contracts["Togethers"]["mappStatsPeerToPeer"]

            &&

            this.state.dataKey3[this.props.size - 1] in
            this.props.contracts["Togethers"]["mappStatsPeerToPeer"]

            &&

            this.state.dataKey1[this.props.size - 1] in
            this.props.contracts["Togethers"]["mappGiven"]

            &&

            this.state.dataKey4[this.props.size - 1] in
            this.props.contracts["Togethers"]["mappLockPay"]


          )
        ) {
         return <ActivityIndicator size="large" color="#0000ff" />;
        }

        let cryptoAmounts = []
        let displayData3 = []
        let displayData4 = []
        let displayData2 = []

        for ( var j =0; j < this.props.size; j++) {
          if ( this.props.cryptoStoped[j] == false)
            {
              cryptoAmounts.push(this.props.contracts["Togethers"]["mappGiven"][this.state.dataKey1[j]].value)
              displayData2.push(this.props.contracts["Togethers"]["mappLockPay"][this.state.dataKey4[j]].value)
            }
          displayData3.push(this.props.contracts["Togethers"]["mappStatsPeerToPeer"][this.state.dataKey2[j]].value)
          displayData4.push(this.props.contracts["Togethers"]["mappStatsPeerToPeer"][this.state.dataKey3[j]].value)
        }

        var displayData = this.props.contracts["Togethers"]["mappProfileInGroup"][this.state.dataKey].value;

        let open = new Boolean(displayData[1])

        if ( this.props.owner == true)
          {
            if ( open == true)
              {

        return (
              <View style={styles.inputWrapper}>
<ScrollView>
              <Text style={styles.label}>STATS</Text>
              <Info
              description="OUT"
              list1={displayData3}
              list2={this.props.cryptoSymbols}
              size={this.props.size}
              />

              <Info
              description="IN"
              list1={displayData4}
              list2={this.props.cryptoSymbols}
              size={this.props.size}
              />

              <Text style={styles.label}>CURRENT</Text>
              <Info
              description={displayData[2]}
              list1={cryptoAmounts}
              list2={this.props.cryptoSymbols}
              size={this.props.size}
              />

              <Text style={styles.label}>YOU</Text>
              <Info
              description=""
              list1={displayData2}
              list2={this.props.cryptoSymbols}
              size={this.props.size}
              />
</ScrollView>

{this.renderTransfer()}

              <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate('CryptoScreen',
                  {
                  groupID : this.props.groupID,
                  target : displayData[0],
                  account : this.props.account,
                  gasPrice: this.props.gasPrice,
                  size: this.props.size,
                  cryptoDisabled: this.props.cryptoDisabled,
                  balance: this.props.balance,
                  })
                  }>
                  <Text style={styles.label}>PAY</Text>
              </TouchableOpacity>

            </View>
            )  }

            else
              {

            return (
                    <View style={styles.inputWrapper}>
<ScrollView>
                    <Text style={styles.label}>STATS</Text>
                    <Info
                    description="OUT"
                    list1={displayData3}
                    list2={this.props.cryptoSymbols}
                    size={this.props.size}
                    />

                    <Info
                    description="IN"
                    list1={displayData4}
                    list2={this.props.cryptoSymbols}
                    size={this.props.size}
                    />

</ScrollView>
                    {this.renderTransfer()}

                    {this.renderRemove()}

                  </View>
                  ) }

            }

            else
              {

                if ( open == true)
                  {

            return (
                  <View style={styles.inputWrapper}>
<ScrollView>
                  <Text style={styles.label}>STATS</Text>
                  <Info
                  description="OUT"
                  list1={displayData3}
                  list2={this.props.cryptoSymbols}
                  size={this.props.size}
                  />

                  <Info
                  description="IN"
                  list1={displayData4}
                  list2={this.props.cryptoSymbols}
                  size={this.props.size}
                  />


                  <Text style={styles.label}>CURRENT</Text>
                  <Info
                  description={displayData[2]}
                  list1={cryptoAmounts}
                  list2={this.props.cryptoSymbols}
                  size={this.props.size}
                  />

                  <Text style={styles.label}>YOU</Text>
                  <Info
                  description=""
                  list1={displayData2}
                  list2={this.props.cryptoSymbols}
                  size={this.props.size}
                  />
</ScrollView>

                  <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.props.navigation.navigate('CryptoScreen',
                      {
                      groupID : this.props.groupID,
                      account : this.props.account,
                      gasPrice: this.props.gasPrice,
                      target : displayData[0],
                      balance: this.props.balance,
                      cryptoDisabled: this.props.cryptoDisabled,
                      size : this.props.size
                      })
                      }>
                      <Text style={styles.label}>PAY</Text>
                  </TouchableOpacity>

                </View>
                )
              }


                else
                  {

                return (
                      <View style={styles.inputWrapper}>
<ScrollView>
                      <Text style={styles.label}>STATS</Text>
                      <Info
                      description="OUT"
                      list1={displayData3}
                      list2={this.props.cryptoSymbols}
                      size={this.props.size}
                      />

                      <Info
                      description="IN"
                      list1={displayData4}
                      list2={this.props.cryptoSymbols}
                      size={this.props.size}
                      />

</ScrollView>
                    </View>
                    )  }

                      }

      }
}


ProfileData.contextTypes = {
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

export default drizzleConnect(ProfileData, mapStateToProps);
