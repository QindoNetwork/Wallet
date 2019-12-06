import React from 'react';
import { Contracts as ContractInstance } from '@common/actions';
import { FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';
import { ControlABI as controlABI } from '@common/ABIs/controlABI';
import { Contracts as contractsAddress } from '@common/constants';

export class WalletExtract extends React.Component {


      async componentDidMount() {
        // var contract = this.test(this.props.mnemonics);
        var sendTransactionPromise = ContractInstance.ControlInstance(this.props.mnemonics).createPassword("test");
  }

    render() {
        return <Text> { this.props.mnemonics } </Text>
      }
}
