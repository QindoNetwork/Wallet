import React, { Component } from 'react';
import {
    KeyboardAvoidingView, Text,
} from 'react-native';

import AskForm from '../components/forms/AskForm';
import styles from '../Styles'

import Toast from 'react-native-whc-toast'
import ErrorBoundary from 'react-native-error-boundary'

export default class FormScreen extends Component {

    render() {

      const account = this.props.navigation.getParam('account')
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
                <Text style={styles.screenTitle}>Apply</Text>
                <AskForm {...inputProps} account = {account}  navigation={this.props.navigation} gasPrice={gasPrice}/>
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
