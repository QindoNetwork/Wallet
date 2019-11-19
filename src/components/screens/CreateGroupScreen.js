import React, { Component } from 'react';
import {
    KeyboardAvoidingView, Text, Alert,
} from 'react-native';

import styles from '../Styles'

import Toast from 'react-native-whc-toast'

import CreateGroupForm from '../components/forms/CreateGroupForm';
import ErrorBoundary from 'react-native-error-boundary'

export default class CreateGroupScreen extends Component {

    render() {

      const account = this.props.navigation.getParam('account');
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
                <Text style={styles.screenTitle}>Create a group</Text>
                <CreateGroupForm {...inputProps} account={account} navigation={this.props.navigation} gasPrice={gasPrice}
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
