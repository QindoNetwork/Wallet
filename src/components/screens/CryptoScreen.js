import React, { Component } from "react";
import {ScrollView, View, FlatList, Text, Button, ActivityIndicator, TouchableOpacity,} from 'react-native';
import CryptoChoice from "../components/CryptoChoice";

import styles from '../Styles'

import Toast from 'react-native-whc-toast'
import ErrorBoundary from 'react-native-error-boundary'

class CryptoScreen extends Component {

  render() {

    const account = this.props.navigation.getParam('account');
    const groupID = this.props.navigation.getParam('groupID');
    const gasPrice = this.props.navigation.getParam('gasPrice');
    const target = this.props.navigation.getParam('target');
    const size = this.props.navigation.getParam('size');
    const balance = this.props.navigation.getParam('balance');
    const cryptoDisabled = this.props.navigation.getParam('cryptoDisabled');


    return(

      <View style={styles.container}>
      <ErrorBoundary  FallbackComponent={CustomFallback}>
      <Toast ref="toast"/>
      <Text style={styles.screenTitle}>Your crypto</Text>
      <CryptoChoice navigation={this.props.navigation}
                  account={account}
                  groupID={groupID}
                   gasPrice={gasPrice}
                   balance={balance}
                   target={target}
                   size={size}
                   cryptoDisabled={cryptoDisabled}
                  />
                  </ErrorBoundary>
      </View>
    );
  }
}

export default CryptoScreen;

class Error extends Component {

    render() {

        return   <Text style={styles.screenTitle}>ERROR</Text>

    }
}

const CustomFallback = (props: { error: Error, resetError: Function }) => (
  <Error/>
)
