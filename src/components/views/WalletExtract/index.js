import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import { measures, colors } from '@common/styles';
import { Wallets as WalletActions } from '@common/actions';
import TransactionCard from './TransactionCard';
import { General as GeneralActions } from '@common/actions';

@inject('wallet')
@observer
export class WalletExtract extends React.Component {

    state = { loading: 0 };

    componentDidMount() {
      this.updateHistory()
    }
    async updateHistory() {
      try {
          await WalletActions.updateBalance(this.props.wallet.item)
          await WalletActions.updateHistory(this.props.wallet.item);
          this.setState({ loading: 1 })
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
    }

    renderItem = (address) => ({ item }) => <TransactionCard transaction={item} walletAddress={address} togethers={this.props.togethers} />

    renderBody = ({ item, history, loading, pendingTransactions }) =>  (!history.length && !loading) ? (<View style={styles.container}>
        <Text style={styles.message}>
            {LanguagesActions.label91(this.props.languages.selectedLanguage)}
        </Text>
    </View>) : (
        <View>
        <FlatList
            style={styles.content}
            data={pendingTransactions.concat(history.slice().reverse())}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={() => this.updateHistory()} />}
            keyExtractor={(element) => element.hash}
            renderItem={this.renderItem(item.address)} />
</View>
    );

    render() {

      if (this.state.loading === 0){

        return(

        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large" color="darkslategray"/>
          </View>
        </View>

      )

      }

        return (
            <View style={styles.container}>
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
        backgroundColor: colors.defaultBackground,
        padding: measures.defaultPadding
    },
    content: {
        marginTop: measures.defaultMargin
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
