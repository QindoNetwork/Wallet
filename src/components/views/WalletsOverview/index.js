import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { HeaderIcon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Wallets as WalletActions, Prices as PricesActions } from '@common/actions';
import NoWallets from './NoWallets';
import WalletCard from './WalletCard';

import { ethers } from 'ethers';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';
import { ControlABI as controlABI, TogethersABI as togethersABI, ERC20ABI as erc20ABI } from '@common/ABIs';

@inject('prices', 'wallets')
@observer
export class WalletsOverview extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Wallets',
        headerLeft: (
            <HeaderIcon
                name='add'
                size='large'
                color={colors.white}
                onPress={() => navigation.navigate('NewWalletName')} />
        ),
        headerRight: (
            <HeaderIcon
                name='settings'
                size='medium'
                type='md'
                color={colors.white}
                onPress={() => navigation.navigate('Settings')} />
        )
    });

    get loading() {
        return this.props.prices.loading || this.props.wallets.loading;
    }

    componentDidMount() {
        this.populate();
    }

    async populate() {
        try {
            await Promise.all([
                WalletActions.loadWallets(),
                PricesActions.loadActiveRate()
                    .then(() => PricesActions.getPrice())
            ]);
        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
    }

    onPressWallet(wallet) {
        if (this.loading) return;
        const infuraProvider = new ethers.providers.InfuraProvider(EthereumNetworks.NETWORK_KEY);
        const etherscanProvider = new ethers.providers.EtherscanProvider(EthereumNetworks.NETWORK_KEY);
        const togethersProvider = new ethers.providers.JsonRpcProvider(EthereumNetworks.INFURA_URL + EthereumNetworks.INFURA_API_KEY, EthereumNetworks.NETWORK_KEY);
        const fallbackProvider = new ethers.providers.FallbackProvider([
            togethersProvider,
            infuraProvider,
            etherscanProvider,
          ]);
        const mnemonics = wallet.mnemonics.toString()
        const connection = ethers.Wallet.fromMnemonic(mnemonics).connect(fallbackProvider);
        try {
          var erc20s = []
          const control = new ethers.Contract(contractsAddress.controlAddress, controlABI, connection);
          const togethers = new ethers.Contract(contractsAddress.togethersAddress, togethersABI, connection);
          erc20s.push(togethers)
          erc20s.push(new ethers.Contract(contractsAddress.togetherscoinAddress, erc20ABI, connection))
          WalletActions.selectWallet(wallet)
          this.props.navigation.navigate('Login', { wallet, control, togethers, erc20s });
        } catch (e) {
          GeneralActions.notify(e.message, 'long');
        }
    }

    renderItem = ({ item }) => <WalletCard wallet={item} onPress={() => this.onPressWallet(item)} />

    renderBody = (list) => (!list.length && !this.loading) ? <NoWallets /> : (
        <FlatList
            style={styles.content}
            data={list}
            refreshControl={<RefreshControl refreshing={this.loading} onRefresh={() => this.populate()} />}
            keyExtractor={(item, index) => String(index)}
            renderItem={this.renderItem} />
    );

    render() {
        const { list } = this.props.wallets;
        return (
            <View style={styles.container}>
                {this.renderBody(list)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: measures.defaultPadding,
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    content: {
        marginTop: measures.defaultMargin
    }
});
