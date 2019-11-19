import { drizzleConnect } from "drizzle-react"
import React, { Component } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from "prop-types";
import signer from "../signer";

import styles from '../Styles'

class Welcome extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.state = {
      dataKey1: null,
      dataKey2: null,
      dataKey3: null,
    };
  }

  componentDidMount() {

this.setState({

      dataKey1: this.contracts["Togethers"].methods["mappAddressToUser"].cacheCall(signer),
      dataKey2: this.contracts["Togethers"].methods["getGroupsLength"].cacheCall({from: signer}),
      dataKey3: this.contracts["TogethersCoin"].methods["balanceOf"].cacheCall(signer),

             })
  }

  render() {
    // Contract is not yet intialized.
    if (!this.props.contracts["Togethers"].initialized) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if (
      !(
        this.state.dataKey1 in
        this.props.contracts["Togethers"]["mappAddressToUser"]

        &&

        this.state.dataKey2 in
        this.props.contracts["Togethers"]["getGroupsLength"]

        &&

        this.state.dataKey3 in
        this.props.contracts["TogethersCoin"]["balanceOf"]

      )
    ) {
      return <ActivityIndicator size="large" color="#0000ff" />
      }

    var displayData1 = this.props.contracts["Togethers"]["mappAddressToUser"][this.state.dataKey1].value;
    var displayData2 = this.props.contracts["Togethers"]["getGroupsLength"][this.state.dataKey2].value;
    var displayData4 = this.props.contracts["TogethersCoin"]["balanceOf"][this.state.dataKey3].value;

    var balance = this.props.accountBalances[signer];

    var max = 200;

    if (displayData1[3] != 0) {

      return (
        <View style={styles.inputWrapper}>
        <View style={styles.inputWrapper}>
        <Text style={styles.screenTitle}>
          Welcome
        </Text>
        <Text style={styles.screenTitle}>
          {displayData1[1]}
        </Text>
        <Text style={styles.screenTitle}>
          {this.props.balance}
        </Text>
        <Text style={styles.label}>{displayData4}</Text>
        </View>
<View style={styles.inputWrapper}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('GroupsScreen',
            {
              name: displayData1[0],
              language: displayData1[1],
              account: this.props.account,
              getGroupsLength: displayData2,
              balance: this.props.balance,
              max: max
              })
            }>
            <Text style={styles.label}>CONTINUE WITH THIS ACCOUNT</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('LanguagesScreen',
              {

              account: this.props.account,
              name: displayData1[0],
              pseudo: displayData1[1],
              language: displayData1[3],
              ipfs: displayData1[2],

              })
            }>
            <Text style={styles.label}>CHANGE PARAMETERS</Text>
        </TouchableOpacity>
        </View>
</View>

      );
    }

    else {

      return (

        <View style={styles.inputWrapper}>

          <Text style={styles.screenTitle}>
            ENTER INTO THE COMMUNITY
          </Text>
          <Text style={styles.label}>
            {this.props.account}
          </Text>
          <Text style={styles.label}>
            {this.props.balance}
          </Text>

          <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('LanguagesScreen',
                {

                account: this.props.account,
                name: "",
                pseudo: "",
                language: "",
                ipfs: "",

                })
              }>
              <Text style={styles.label}>CREATE USER</Text>
          </TouchableOpacity>

        </View>
      );
    }

  }
}

Welcome.contextTypes = {
  drizzle: PropTypes.object,
};
/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts,
    accountBalances: state.accountBalances,
  };
};

export default drizzleConnect(Welcome, mapStateToProps);
