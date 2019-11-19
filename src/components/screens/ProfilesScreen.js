import React, { Component } from "react";
import {ScrollView, View, Text, Button,} from 'react-native';
import ProfilesList from "../components/ProfilesList";

import styles from '../Styles'

import Toast from 'react-native-whc-toast'
import ErrorBoundary from 'react-native-error-boundary'

class ProfilesScreen extends Component {

  render() {

    const account = this.props.navigation.getParam('account');
    const groupID = this.props.navigation.getParam('groupID');
    const groupName = this.props.navigation.getParam('groupName');
    const gasPrice = this.props.navigation.getParam('gasPrice');
    const balance = this.props.navigation.getParam('balance');
    const size = this.props.navigation.getParam('size');
    const max = this.props.navigation.getParam('max');

    return (
      <View style={styles.container}>
      <ErrorBoundary  FallbackComponent={CustomFallback}>
      <Toast ref="toast"/>
      <Text style={styles.screenTitle}>{groupName}</Text>
          <ProfilesList navigation={this.props.navigation} balance={balance} size={size}
           gasPrice={gasPrice} account={account} max={max} groupID={groupID} groupName={groupName}/>
           </ErrorBoundary>
      </View>

    );
  }
}

export default ProfilesScreen;

class Error extends Component {

    render() {

        return   <Text style={styles.screenTitle}>ERROR</Text>

    }
}

const CustomFallback = (props: { error: Error, resetError: Function }) => (
  <Error/>
)
