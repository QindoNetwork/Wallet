import React, { Component } from 'react';
import {
    KeyboardAvoidingView, Text, Alert,
} from 'react-native';

import styles from '../Styles'

import Toast from 'react-native-whc-toast'

import DescriptionDemandForm from '../components/forms/DescriptionDemandForm';
import ErrorBoundary from 'react-native-error-boundary'

export default class DemandScreen extends Component {

  render() {

    const account = this.props.navigation.getParam('account');
    const groupID = this.props.navigation.getParam('groupID');
    const groupName = this.props.navigation.getParam('groupName');
    const gasPrice = this.props.navigation.getParam('gasPrice');

    const inputProps = {
        autoCapitalize: 'none',
        autoCorrect: false,
        keyboardType: 'numeric',
        returnKeyType: 'done',
    };

      return (

          <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <ErrorBoundary  FallbackComponent={CustomFallback}>
          <Toast ref="toast"/>
              <Text style={styles.screenTitle}>Send the demand to your friends</Text>
              <DescriptionDemandForm {...inputProps} account={account} gasPrice={gasPrice}
              groupID={groupID} navigation={this.props.navigation} groupName={groupName}
              />
              </ErrorBoundary>
          </KeyboardAvoidingView>
      );
  }
}

class Error extends Component {

    render() {

        return   <Text style={styles.screenTitle}>ERROR</Text>

    }
}

const CustomFallback = (props: { error: Error, resetError: Function }) => (
  <Error/>
)
