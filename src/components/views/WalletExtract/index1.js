import React from 'react';
import { Control as ControlInstance } from '@common/functions';
import { FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';
import { ethers } from 'ethers';
import { ControlABI as controlABI } from '@common/ABIs/controlABI';
import { Contracts as contractsAddress } from '@common/constants';

export class WalletExtract extends React.Component {

    constructor() {
        super();
        this.state = {
          txn: 1,
        };
      }

      async componentDidMount() {
      const network = 'ropsten';
      let provider = ethers.getDefaultProvider(network);
      let contract = new ethers.Contract(contractsAddress.controlAddress, controlABI, provider)
      let val =  parseInt( await contract.userPassword("0xcfe40ea57389d79b7679eda66059ecb30167e31c"),10)
      this.setState({ txn: val });
  }

    render() {
        return <Text>{ this.state.txn }</Text>
      }
}
