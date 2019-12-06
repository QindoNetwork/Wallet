import React from 'react';
import { Contracts as ContractInstance } from '@common/actions';
import { FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';
import { ethers } from 'ethers';
import { ControlABI as controlABI } from '@common/ABIs/controlABI';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';

export class WalletExtract extends React.Component {

    constructor() {
        super();
        this.state = {
          txn: 1,
        };
      }

      test(m) {
        var mnemonics = m.toString()
        var provider = new ethers.providers.InfuraProvider(EthereumNetworks.NETWORK_KEY);
        var wallet = ethers.Wallet.fromMnemonic(mnemonics);
        wallet = wallet.connect(provider);
        return new ethers.Contract(contractsAddress.controlAddress, controlABI, wallet);
      }


      async componentDidMount() {
        // var contract = this.test(this.props.mnemonics);
        var sendTransactionPromise = ContractInstance.ControlInstance(this.props.mnemonics).createPassword("test");
        sendTransactionPromise.then(function(tx) {
            console.log(tx);
        });
  }

    render() {
        return <Text>{ this.state.txn } { this.props.password } { this.props.mnemonics } </Text>
      }
}
