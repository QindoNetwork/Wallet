import { drizzleConnect } from "drizzle-react"
import React, { Children, Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from 'react-native';

import styles from '../Styles'

/*
 * Create component.
 */

class LoadingContainer extends Component {
  render() {
    if (this.props.web3.status === "failed") {
      if (this.props.errorComp) {
        return this.props.errorComp;
      }

      return (
        <View style={styles.container}>
              <Text>
                This device has no connection to the Ethereum network.
              </Text>
        </View>

      );
    }

    if (
      this.props.web3.status === "initialized" &&
      Object.keys(this.props.accounts).length === 0
    ) {
      return (
        <View style={styles.container}>
              <Text>
                Please
                check and make your device point at the
                correct network and your account is unlocked.
              </Text>
        </View>
      );
    }

    if (this.props.drizzleStatus.initialized) {
      return Children.only(this.props.children);
    }

    if (this.props.loadingComp) {
      return this.props.loadingComp;
    }

    return (
            <Text>Loading dapp...</Text>
    );
  }
}

LoadingContainer.contextTypes = {
  drizzle: PropTypes.object,
};

LoadingContainer.propTypes = {
  children: PropTypes.node,
  accounts: PropTypes.object.isRequired,
  drizzleStatus: PropTypes.object.isRequired,
  web3: PropTypes.object.isRequired,
  loadingComp: PropTypes.node,
  errorComp: PropTypes.node,
};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
  };
};

export default drizzleConnect(LoadingContainer, mapStateToProps);
