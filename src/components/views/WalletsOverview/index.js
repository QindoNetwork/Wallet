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
        title: 'Togethers',
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
        this.setState({ loading: 1 })
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

        this.setState({ loading: 0 })

        try {

        const mnemonics = wallet.mnemonics.toString()
        const connection = ethers.Wallet.fromMnemonic(mnemonics).connect(EthereumNetworks.fallbackProvider);

          var erc20s = []
          var erc20s2 = []
          var gasParam = []
          const control = new ethers.Contract(contractsAddress.controlAddress, controlABI, connection);
          const togethers = new ethers.Contract(contractsAddress.togethersAddress, togethersABI, connection);
          const erc20sLength = parseInt(await togethers.getSize(),10)

            var enable
            var tokenAddress
            var instance
            var type

            erc20s.push({ name: "Ethers",
                          symbol: "ETH",
                          type: 0,
                          decimals: 0,
                          instance: null,
                          key: 0})

            for(var i = 1; i < erc20sLength ; i++)
            {
              type = parseInt(await togethers.getTokenType(i),10)
              enable = parseInt(await togethers.checkEnableCrypto(i),10)
              if(enable === 1)
              {
                tokenAddress = parseInt(await togethers.getTokenAddress(i),10)
                if(type === 1 || type === 2)
                {
                  instance = new ethers.Contract(tokenAddress, erc20ABI, connection)
                }
                erc20s.push({ name: await instance.name(),
                              symbol: await instance.symbol(),
                              type: type,
                              decimals: parseInt(await instance.decimals(),10),
                              instance: instance,
                              key: i})
              }
            }
            for(var j = 0 ; j < 17 ; j++)
          {
            gasParam.push({ limit: parseInt(await control.getGasLimit(j),10),
                            price: parseInt(await control.getGasPrice(j),10)
                          })
          }

          WalletActions.selectWallet(wallet)
          this.setState({ loading: 1 })
          this.props.navigation.navigate('Login', { gasParam, control, togethers, erc20s, address: wallet.address });

        } catch (e) {
          GeneralActions.notify(e.message, 'long');
        }

    }

    renderItem = ({ item }) => <WalletCard wallet={item} onPress={() => this.onPressWallet(item)} />

    renderBody = (list) => (!list.length && !this.loading) ? <NoWallets /> : (
        <FlatList
            style={styles.content}
            data={list.sort((prev, next) => prev.name.localeCompare(next.name))}
            refreshControl={<RefreshControl refreshing={this.loading} onRefresh={() => this.populate()} />}
            keyExtractor={(item, index) => String(index)}
            renderItem={this.renderItem} />
    );

    render() {
        const { list } = this.props.wallets;

        if (this.state.loading === 0){

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
        justifyContent: 'flex-start',
        backgroundColor: colors.withe,
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
