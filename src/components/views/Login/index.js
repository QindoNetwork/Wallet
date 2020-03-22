import React from 'react'
import { StyleSheet, View, ActivityIndicator} from 'react-native';
import { colors, measures } from '@common/styles';
import { Gas as gas, Conversions as conversions } from '@common/constants';
import { Languages as LanguagesActions, Wallets as WalletActions, General as GeneralActions } from '@common/actions';
import { inject, observer } from 'mobx-react';
import NewWallet from './NewWallet'
import SignIN from './SignIN'
import SignUP from './SignUP'
import { ethers } from 'ethers';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';
import { TogethersABI as togethersABI } from '@common/ABIs';

@inject('languages','wallet')
@observer
export class Login extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

    state = { loading: 0, registered: 0, togethers: null };

    async componentDidMount() {

      try {
        await WalletActions.updateBalance(this.props.wallet.item)
        const mnemonics = this.props.wallet.item.mnemonics.toString()
        const connection = ethers.Wallet.fromMnemonic(mnemonics).connect(EthereumNetworks.fallbackProvider);

          const togethers = new ethers.Contract(contractsAddress.togethersAddress, togethersABI, connection);

          this.setState({
                        registered: parseInt (await togethers.verifyRegistration(),10),
                        togethers,
                        loading: 1
                      })
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
    }

    render() {

      if(this.state.loading === 0)
      {
        return (
        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large" color="darkslategray"/>
          </View>
        </View>
        );
      }

      const { navigation, wallet } = this.props;
      const { gasParam } = this.props.navigation.state.params;

      if(this.state.registered === 1)
      {
        return (
          <SignIN togethers={this.state.togethers} navigation={navigation} gasParam={gasParam}/>
        );
      }

      const balance = wallet.item.balance
      const gasLimit = gasParam[gas.defaultTransaction].limit
      const gasPrice = gasParam[gas.defaultTransaction].price * conversions.gigaWeiToWei

      if(balance > gasLimit * gasPrice)
      {
        return (
          <SignUP togethers={this.state.togethers} navigation={navigation} gasParam={gasParam}/>
        );
      }

        return (
          <NewWallet/>
        );
    }

}

const styles = StyleSheet.create({
  container1: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'space-between',
      backgroundColor: colors.defaultBackground,
      padding: measures.defaultPadding
  },
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: colors.defaultBackground,
        padding: measures.defaultPadding
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    message: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: measures.defaultMargin,
        marginHorizontal: 32
    },
    detail: {
        color: 'black',
        fontSize: 10,
        textAlign: 'center',
        marginVertical: measures.defaultMargin/2,
        marginHorizontal: 32
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        height: 52
    },
    actions: {
        height: 56
    },
    actionsBar: {
        flexDirection: 'row',
        flex: 3
    },
    actionColumn: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    centered: {
        alignSelf: 'center'
    },
    input: {
        width: '90%',
        padding: 4,
        paddingLeft: 0,
        marginRight: 2,
        textAlign: 'center',
        color: 'black',
    }
});
