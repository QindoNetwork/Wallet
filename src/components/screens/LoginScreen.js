import React, { Component } from "react";
import { View, Text} from 'react-native';
import Welcome from "../components/Welcome";
import PropTypes from "prop-types";
import { drizzleConnect } from "drizzle-react";

import styles from '../Styles'

import Toast from 'react-native-whc-toast'
import ErrorBoundary from 'react-native-error-boundary'

class LoginScreen extends Component {

  render() {

    const { navigation } = this.props;
    const account = navigation.getParam('account');
    const balance = navigation.getParam('balance');;

    return (

      <View style={styles.container}>
      <ErrorBoundary  FallbackComponent={CustomFallback}>
      <Toast ref="toast"/>
      <Welcome balance={balance} account={account} navigation={this.props.navigation}/>
                      </ErrorBoundary>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  accounts: PropTypes.object.isRequired,
  accountBalances: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    accountBalances: state.accountBalances,
  };
};

export default drizzleConnect(LoginScreen, mapStateToProps);

class Error extends Component {

    render() {

        return   <Text style={styles.screenTitle}>ERROR</Text>

    }
}

const CustomFallback = (props: { error: Error, resetError: Function }) => (
  <Error/>
)
