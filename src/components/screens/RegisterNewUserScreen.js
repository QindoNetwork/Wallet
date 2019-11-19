import React, { Component } from 'react';
import {
    KeyboardAvoidingView, Text, Alert,
} from 'react-native';

import styles from '../Styles'

import Toast from 'react-native-whc-toast'

import RegisterForm from '../components/forms/RegisterForm';
import ErrorBoundary from 'react-native-error-boundary'

export default class RegisterNewUserScreen extends Component {

    render() {

      const languageKey = this.props.navigation.getParam('languageKey');
      const account = this.props.navigation.getParam('account');
      const gasPrice = this.props.navigation.getParam('gasPrice');
      const name = this.props.navigation.getParam('name');
      const ipfs = this.props.navigation.getParam('ipfs');


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
                <Text style={styles.screenTitle}>Choose your pseudo</Text>
                <RegisterForm {...inputProps} navigation={this.props.navigation} gasPrice={gasPrice}
                 languageKey = {languageKey}  account = {account} name = {name} ipfs = {ipfs}
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
