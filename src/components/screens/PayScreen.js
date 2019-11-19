import React, { Component } from 'react';
import {
    KeyboardAvoidingView, Text, Alert,
} from 'react-native';

import styles from '../Styles'

import Toast from 'react-native-whc-toast'

import PayForm from '../components/forms/PayForm';
import ErrorBoundary from 'react-native-error-boundary'

export default class PayScreen extends Component {

    render() {

      const account = this.props.navigation.getParam('account');
      const groupID = this.props.navigation.getParam('groupID');
      const gasPrice = this.props.navigation.getParam('gasPrice');
      const crypto = this.props.navigation.getParam('crypto');
      const target = this.props.navigation.getParam('target');
      const address = this.props.navigation.getParam('address');
      const decimal = this.props.navigation.getParam('decimal');
      const balance = this.props.navigation.getParam('balance');
      const name = this.props.navigation.getParam('name');

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
                <Text style={styles.screenTitle}>Pay</Text>
                <PayForm {...inputProps} account={account} gasPrice={gasPrice} groupID={groupID} crypto={crypto}
                navigation={this.props.navigation} target={target} address={address} decimal={decimal}
                 balance={balance} name={name}
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
