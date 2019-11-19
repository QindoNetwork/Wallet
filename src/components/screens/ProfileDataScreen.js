import React, { Component } from "react";
import { View, FlatList, StyleSheet, Text, Button, ActivityIndicator, TouchableOpacity,} from 'react-native';
import ProfileData from "../components/ProfileData";
import styles from '../Styles'

import Toast from 'react-native-whc-toast'
import ErrorBoundary from 'react-native-error-boundary'

class ProfileDataScreen extends Component {

  render() {

    const account = this.props.navigation.getParam('account');
    const profileID = this.props.navigation.getParam('key');
    const profileName = this.props.navigation.getParam('user');
    const groupID = this.props.navigation.getParam('groupID');
    const gasPrice = this.props.navigation.getParam('gasPrice');
    const balance = this.props.navigation.getParam('balance');
    const size = this.props.navigation.getParam('size');
    const cryptoSymbols = this.props.navigation.getParam('cryptoSymbols');
    const owner = this.props.navigation.getParam('owner');
    const demandID = this.props.navigation.getParam('demandID');

  return (
      <View style={styles.container}>
      <ErrorBoundary  FallbackComponent={CustomFallback}>
      <Toast ref="toast"/>
      <Text style={styles.screenTitle}>{profileName}</Text>
        <ProfileData navigation={this.props.navigation} gasPrice={gasPrice} account={account} owner={owner}  demandID={demandID}
        groupID={groupID} profileID={profileID} balance={balance} cryptoSymbols={cryptoSymbols} size={size}/>
</ErrorBoundary>
      </View>
    );
  }

}

export default ProfileDataScreen;


class Error extends Component {

    render() {

        return   <Text style={styles.screenTitle}>ERROR</Text>

    }
}

const CustomFallback = (props: { error: Error, resetError: Function }) => (
  <Error/>
)
