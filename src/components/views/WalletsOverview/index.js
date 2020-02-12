import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import { HeaderIcon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Wallets as WalletActions, Languages as LanguagesActions } from '@common/actions';
import WalletCard from './WalletCard';
import { ethers } from 'ethers';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';
import { ControlABI as controlABI, TogethersABI as togethersABI } from '@common/ABIs';
import { inject, observer } from 'mobx-react';

@inject('wallets')
@observer
export class WalletsOverview extends React.Component {

    state = { loading: 0 };

    static navigationOptions = ({ navigation, screenProps }) => ({
            title: 'Welcome',
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
                LanguagesActions.loadLanguage()
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
          var gas

            const listLength = parseInt(await control.listLength(),10)

            for(var j = 0 ; j < listLength ; j++)
            {
            gas = await control.mappFunctionToGasParameters(j)
            gasParam.push({ limit: parseInt(gas.gasLimit,10),
                            price: parseInt(gas.gasPrice,10)
                          })
          }
          WalletActions.selectWallet(wallet)
          this.props.navigation.navigate('Login', { gasParam, togethers });
          this.setState({ loading: 1 })
        } catch (e) {
          GeneralActions.notify(e.message, 'long');
        }

    }

    renderItem = ({ item }) => <WalletCard wallet={item} onPress={() => this.onPressWallet(item)} />

    renderBody = (list) => (!list.length && !this.loading) ? (<View style={styles.container}>
        <Text style={styles.message}>
            There are no wallets configured. Click on the + button to add a new one.
        </Text>
    </View>) : (<View>
        <FlatList
            style={styles.content}
            data={list.sort((prev, next) => prev.name.localeCompare(next.name))}
            keyExtractor={(item, index) => String(index)}
            renderItem={this.renderItem} />
            <View style={styles.avatar}>
            <Image source={require('../../widgets/Logos/2587429327_24309964-ea25-4f7e-94e1-5f65fef6c12d.png')} />
            </View>
            </View>

    );

    render() {
        const { list } = this.props.wallets;

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
                {this.renderBody(list)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: colors.defaultBackground,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
      backgroundColor: colors.defaultBackground,
        marginTop: 8
    },
    avatar: {
      alignItems: 'stretch',
      justifyContent: 'space-around',
      flexDirection: 'row',
      height: 75,
      borderTopWidth: 15,
      borderBottomWidth: 20,
      borderColor: 'transparent',
      backgroundColor: 'transparent'
    }
});
