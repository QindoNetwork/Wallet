import React from 'react';
import { Contracts as ContractInstance } from '@common/actions';
import { FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';

export class Login extends React.Component {


      async componentDidMount() {
        // var contract = this.test(this.props.mnemonics);
        var sendTransactionPromise = ContractInstance.ControlInstance(this.props.navigation.getParam('mnemonics')).createPassword("test");
  }

    render() {
        return <Text> {this.props.navigation.getParam('mnemonics')} </Text>
      }
}
