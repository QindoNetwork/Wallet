import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View, ActivityIndicator } from 'react-native';
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

    state = { loading: 0 };

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

    async onPressWallet(wallet) {

        if (this.loading) return;
        const mnemonics = wallet.mnemonics.toString()
        const connection = ethers.Wallet.fromMnemonic(mnemonics).connect(EthereumNetworks.fallbackProvider);

        this.setState({ loading: 1 })

        try {

          var erc20s = []
          var gasParam = []
          const control = new ethers.Contract(contractsAddress.controlAddress, controlABI, connection);
          const togethers = new ethers.Contract(contractsAddress.togethersAddress, togethersABI, connection);
          const erc20sLength = parseInt(await togethers.getSize(),10)
          const max = parseInt(await togethers.MAX(),10)

          for(var i = 0 ; i < erc20sLength ; i++)
          {
            var tokenAddress = await togethers.getTokenAddress(i)
            erc20s.push({ name: await togethers.getTokenName(i),
                          symbol: await togethers.getTokenSymbol(i),
                          decimals: parseInt(await togethers.getTokenDecimal(i),10),
                          instance: new ethers.Contract(tokenAddress, erc20ABI, connection)})
          }

          for(var j = 0 ; j <= 10 ; j++)
          {
            gasParam.push({ limit: await parseInt(control.getGasLimit(j),10),
                            price: await parseInt(control.getGasPrice(j),10)
                          })
          }

          WalletActions.selectWallet(wallet)
          this.props.navigation.navigate('Login', { gasParam, wallet, control, togethers, erc20s, address: wallet.address, max });

        } catch (e) {
          GeneralActions.notify(e.message, 'long');
        }

        this.setState({ loading: 0 })

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

        if (this.state.loading === 1){

          return(

            <View style={styles.container}>
              <View style={styles.body}>
                <ActivityIndicator size="large"/>
              </View>
            </View>

        )

        }

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
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        marginTop: measures.defaultMargin
    }
});
