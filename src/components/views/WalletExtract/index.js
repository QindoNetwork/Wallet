import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import { measures } from '@common/styles';
import { Wallets as WalletActions } from '@common/actions';
import Balance from './Balance';
import TransactionCard from './TransactionCard';
import NoTransactions from './NoTransactions';
import { GeneralActions } from '@common/actions';
import { Togethers as TogethersFunctions } from '@common/functions';

@inject('wallet')
@observer
export class WalletExtract extends React.Component {

    state = { test: '34' };

    componentDidMount() {
      this.updateHistory();
      this.setState({
              test : TogethersFunctions.ID(this.props.wallet.item),
      })
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
        <FlatList
            style={styles.content}
            data={pendingTransactions.concat(history.slice().reverse())}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={() => this.updateHistory()} />}
            keyExtractor={(element) => element.hash}
            renderItem={this.renderItem(item.address)} />
    );

    render() {
        return (
            <View style={styles.container}>
            <Text>{this.state.test}</Text>
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
