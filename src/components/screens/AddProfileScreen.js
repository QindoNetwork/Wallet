import React, { Component } from 'react';
import {
    KeyboardAvoidingView, Text,
} from 'react-native';

import styles from '../Styles'

import Toast from 'react-native-whc-toast'

import AddProfileForm from '../components/forms/AddProfileForm';
import ErrorBoundary from 'react-native-error-boundary'

export default class AddProfileScreen extends Component {

    render() {

      const account = this.props.navigation.getParam('account');
      const groupID = this.props.navigation.getParam('groupID');
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
                <Text style={styles.screenTitle}>Add to the group</Text>
                <AddProfileForm {...inputProps} account={account}
                groupID={groupID} navigation={this.props.navigation}
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
