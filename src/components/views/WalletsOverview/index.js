import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View, ActivityIndicator } from 'react-native';
import { inject, observer } from 'mobx-react';
import { HeaderIcon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Wallets as WalletActions } from '@common/actions';
import NoWallets from './NoWallets';
import WalletCard from './WalletCard';
import { ethers } from 'ethers';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';
import { ControlABI as controlABI, TogethersABI as togethersABI } from '@common/ABIs';

@inject('wallets')
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
        return this.props.wallets.loading;
    }

    async componentDidMount() {
        try {
            await Promise.all([
                WalletActions.loadWallets(),
            ]);
        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
        this.setState({ loading: 1 })
    }

    async onPressWallet(wallet) {

        if (this.loading) return;

        this.setState({ loading: 0 })

        try {

        const mnemonics = wallet.mnemonics.toString()
        const connection = ethers.Wallet.fromMnemonic(mnemonics).connect(EthereumNetworks.fallbackProvider);

          var gasParam = []
          const control = new ethers.Contract(contractsAddress.controlAddress, controlABI, connection);
          const togethers = new ethers.Contract(contractsAddress.togethersAddress, togethersABI, connection);
            var enable
            var tokenAddress
            var instance
            var type
            var gas

            for(var j = 0 ; j <= 15 ; j++)
            {
            gas = await control.mappFunctionToGasParameters(j)
            gasParam.push({ limit: parseInt(gas.gasLimit,10),
                            price: parseInt(gas.gasPrice,10)
                          })
          }
          WalletActions.selectWallet(wallet)
          this.setState({ loading: 1 })
          this.props.navigation.navigate('Login', { gasParam, togethers, address: wallet.address });

        } catch (e) {
          GeneralActions.notify(e.message, 'long');
        }

    }

    renderItem = ({ item }) => <WalletCard wallet={item} onPress={() => this.onPressWallet(item)} />

    renderBody = (list) => (!list.length && !this.loading) ? <NoWallets /> : (
        <FlatList
            style={styles.content}
            data={list.sort((prev, next) => prev.name.localeCompare(next.name))}
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
