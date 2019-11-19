import React, { Component } from 'react';
import {
    View, Text,
} from 'react-native';

import styles from '../Styles'

import ConfirmPayment from '../components/ConfirmPayment';
import ErrorBoundary from 'react-native-error-boundary'

export default class ConfirmPaymentScreen extends Component {

    render() {

      const account = this.props.navigation.getParam('account');
      const groupID = this.props.navigation.getParam('groupID');
      const gasPrice = this.props.navigation.getParam('gasPrice');
      const crypto = this.props.navigation.getParam('crypto');
      const target = this.props.navigation.getParam('target');
      const amount = this.props.navigation.getParam('amount');


        return (
            <View style={styles.container}>
            <ErrorBoundary  FallbackComponent={CustomFallback}>
                <Text style={styles.screenTitle}>Confirm Payment</Text>
                <Text style={styles.screenTitle}>PUB....</Text>
                <ConfirmPayment account={account} gasPrice={gasPrice} groupID={groupID} crypto={crypto}
                navigation={this.props.navigation} target={target} amount={amount}
                />
                </ErrorBoundary>
            </View>
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
