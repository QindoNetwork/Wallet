import React from 'react';
import { Text, FlatList, RefreshControl, StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import { HeaderIcon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Wallets as WalletActions, Languages as LanguagesActions } from '@common/actions';
import WalletCard from './WalletCard';
import { inject, observer } from 'mobx-react';
import { ethers } from 'ethers';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';
import { ControlABI as controlABI } from '@common/ABIs';

@inject('wallets','languages')
@observer
export class WalletsOverview extends React.Component {

    state = { loading: 0, gasParam: [], wallets: [] };

    static navigationOptions = ({ navigation, screenProps }) => ({
            title: 'Welcome',
            headerRight: (
                <HeaderIcon
                    name='add'
                    size='large'
                    color={colors.white}
                    onPress={() => navigation.navigate('NewWalletName')
                  } />
            ),
        });

    async componentDidMount() {
      try {
        await WalletActions.loadWallets()
        await LanguagesActions.loadLanguage()
          var gasParam = []
          const control = new ethers.Contract(contractsAddress.controlAddress, controlABI, EthereumNetworks.fallbackProvider);
          var gasTemp

          const listLength = parseInt(await control.listLength(),10)

          for(var j = 0 ; j < listLength ; j++)
          {
            gasTemp = await control.mappFunctionToGasParameters(j)
            gasParam.push({ limit: parseInt(gasTemp.gasLimit,10),
                            price: parseInt(gasTemp.gasPrice,10)
                          })
  }
          const { list } = this.props.wallets;
          this.setState({ loading: 1, gasParam, wallets: list })
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
    }

    onPressWallet(wallet) {
      const { languages } = this.props
        WalletActions.selectWallet(wallet)
        this.props.navigation.navigate('Login', { gasParam: this.state.gasParam, title: LanguagesActions.title1(languages.selectedLanguage)  });
    }

    renderItem = ({ item }) => <WalletCard wallet={item} onPress={() => this.onPressWallet(item)} />

    renderBody = (list) => (!list.length) ? (
    this.props.navigation.navigate('NewWalletName', { replaceRoute: true })
    ) : (<View>
        <FlatList
            style={styles.content}
            data={list.sort((prev, next) => prev.name.localeCompare(next.name))}
            renderItem={this.renderItem} />
            <View style={styles.avatar}>
            <Image source={require('../../widgets/Logos/2587429327_24309964-ea25-4f7e-94e1-5f65fef6c12d.png')} />
            </View>
            </View>

    );

    render() {

      const list = this.state.wallets;

        if (this.state.loading === 0){

          return(

            <View style={styles.container}>
              <View style={styles.body}>
              <Text style={styles.message}>
                  {LanguagesActions.label165(this.props.languages.selectedLanguage)}
              </Text>
                <ActivityIndicator size="large" color="darkslategray"/>
                <Text style={styles.message}>
                    {LanguagesActions.label166(this.props.languages.selectedLanguage)}
                </Text>
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
