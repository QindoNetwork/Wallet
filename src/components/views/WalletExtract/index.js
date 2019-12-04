import React from 'react';
import { Control as ControlInstance } from '@common/functions';
import { FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';
import { ethers } from 'ethers';
import { ControlABI as controlABI } from '@common/ABIs/controlABI';
import { Contracts as contractsAddress } from '@common/constants';
import { ethers } from 'ethers';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';

export function ControlInstance(mnemonics) {
    return new ethers.Contract(contractsAddress.controlAddress, ABIs.ControlABI, connectInstance(mnemonics))

export class WalletExtract extends React.Component {

    constructor() {
        super();
        this.state = {
          txn: 1,
        };
      }


      async componentDidMount() {
        const abi = controlABI;
        const address = "0xB0680252B14d60b87c7a01E78B7dA52288967BF9";
        var provider = new ethers.providers.InfuraProvider(EthereumNetworks.NETWORK_KEY);
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
