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
        const abi = controlABI;
        const address = "0xADb3469deA30e61Fb9D90eA7d15B55f7159FE808";
        var provider = new ethers.providers.InfuraProvider('ropsten');
        var wallet = ethers.Wallet.fromMnemonic("vicious pupil cheese improve advance squirrel measure spell depend discover permit cabin");
        wallet = wallet.connect(provider);
        var contract = new ethers.Contract(address, abi, wallet);
        var sendTransactionPromise = contract.createPassword("test");
        sendTransactionPromise.then(function(tx) {
            console.log(tx);
        });
  }

    render() {
        return <Text>{ this.state.txn }</Text>
      }
}
