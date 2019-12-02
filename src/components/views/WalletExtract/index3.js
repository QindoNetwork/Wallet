import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import { measures } from '@common/styles';
import { Wallets as WalletActions } from '@common/actions';
import Balance from './Balance';
import TransactionCard from './TransactionCard';
import NoTransactions from './NoTransactions';
import { GeneralActions } from '@common/actions';
import { Network as EthereumNetworks, Contracts as contractsAddress } from '@common/constants';
import { ControlABI as controlABI } from '@common/ABIs/controlABI';
import { TogethersABI as togethersABI } from '@common/ABIs/togethersABI';

@inject('wallet')
@observer
export class WalletExtract extends React.Component {

  state = { password: 1, inputPassword: 0, callControl: null, callTogethers: null, sendControl: null, sendTogethers: null };

    componentDidMount() {
      this.getProviders();
      this.updateHistory();
    }

    async getProviders() {
      const network = EthereumNetworks.NETWORK_KEY;
      let provider = ethers.getDefaultProvider(network);
      let callControl = new ethers.Contract(contractsAddress.controlAddress, controlABI, provider)
      let callTogethers = new ethers.Contract(contractsAddress.togethersAddress, togethersABI, provider)

      let wallet = ethers.Wallet.fromMnemonic(this.props.mnemonics);
      wallet = wallet.connect(provider);
      let sendControl = new ethers.Contract(contractsAddress.controlAddress, controlABI, wallet);
      let sendTogethers = new ethers.Contract(contractsAddress.togethersAddress, togethersABI, wallet);

      let _password =  parseInt( await callControl.userPassword("0xcfe40ea57389d79b7679eda66059ecb30167e31c"),10)
      this.setState({ password: _password,
                      callControl: callControl,
                      sendTogethers: sendTogethers,
                      sendControl: sendControl,
                      callTogethers: callTogethers });
    }

    async updateHistory() {
        try {
            await WalletActions.updateHistory(this.props.wallet.item);
        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
    }

    renderItem = (address) => ({ item }) => <TransactionCard transaction={item} walletAddress={address} />

    renderBody = ({ item, history, loading, pendingTransactions }) =>  (!history.length && !loading) ? <NoTransactions /> : (
        <View>
        <Text>{this.state.password}</Text>
        <Text>{this.props.mnemonics}</Text>
        <FlatList
            style={styles.content}
            data={pendingTransactions.concat(history.slice().reverse())}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={() => this.updateHistory()} />}
            keyExtractor={(element) => element.hash}
            renderItem={this.renderItem(item.address)} />
</View>
    );

    render() {
        return (
            <View style={styles.container}>

                <Balance />
                {this.renderBody(this.props.wallet)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        flex: 1,
        padding: measures.defaultPadding
    },
    content: {
        marginTop: measures.defaultMargin
    }
});
