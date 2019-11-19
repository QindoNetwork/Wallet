import { drizzleConnect } from "drizzle-react"
import React, { Component } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from "prop-types";
import timer from 'react-native-timer'

import styles from '../Styles'

class ConfirmPayment extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.state = {
      showMsg: false
    };

  }

  componentDidMount() {

    this.setState({showMsg: true}, () => timer.setTimeout(
      this, 'hideMsg', () => this.setState({showMsg: false}), 2000
    ));
  }

  componentWillUnmount() {
    timer.clearTimeout(this);
  }

  submitForm = () => {
    let amount = 0
    let value = 0
    if(this.props.type == 1){
      if(this.props.crypto != 0){
        value = this.props.value
        this.contracts[this.props.name].methods["increaseAllowance"].cacheSend(this.contracts.Togethers.address, value, {gas: 300000, from: this.props.account , gasPrice: this.props.gasPrice});
      }
      else {
        amount = this.props.value
      }
      this.contracts["Togethers"].methods["payForFunds"].cacheSend(this.props.target, this.props.groupID, amount, this.props.crypto, {gas: 300000, from: this.props.account, value: amount, gasPrice: this.props.gasPrice});
    }
    else {
      this.contracts["Togethers"].methods["withdrawFunds"].cacheSend(this.props.groupID, {gas: 400000, from: this.props.account, gasPrice: this.props.gasPrice})
    }
  return (this.props.navigation.navigate('PendingScreen',
    {
    account: this.props.account,
    }))
    }

  render() {
    if(this.state.showMsg === true){
        return <ActivityIndicator size="large" color="#0000ff" />
    }

    return(

      <View style={styles.inputWrapper}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => this.submitForm()}
        >
            <Text style={styles.buttonText}>Confirm Payment</Text>
        </TouchableOpacity>

        </View>

      )
  }

}

ConfirmPayment.contextTypes = {
  drizzle: PropTypes.object,
};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts,
  };
};

export default drizzleConnect(ConfirmPayment, mapStateToProps);
