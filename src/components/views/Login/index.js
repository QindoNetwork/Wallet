import React, { Fragment } from 'react'
import { Clipboard, Share, TouchableWithoutFeedback, Keyboard, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions } from '@common/actions';
import QRCode from 'react-native-qrcode-svg';
import { Gas as gas, Restrictions as restrictions, Conversions as conversions } from '@common/constants';
import { Icon } from '@components/widgets';
import { Wallet as WalletUtils } from '@common/utils';
import * as yup from 'yup'
import { Formik } from 'formik'
import { sha256 } from 'react-native-sha256';
import { Languages as LanguagesActions } from '@common/actions';
import { inject, observer } from 'mobx-react';
import NewWallet from './NewWallet'
import SignIN from './SignIN'
import SignUP from './SignUP'

@inject('wallet','languages')
@observer
export class Login extends React.Component {

    static navigationOptions = { title: 'Login' };

    state = { loading: 0, registered: 0 };

    async componentDidMount() {

      const { togethers } = this.props.navigation.state.params;
      const { item } = this.props.wallet;

      try {
        this.setState({
                        registered: parseInt (await togethers.verifyRegistration(),10),
                        loading: 1
                      })
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
    }

    render() {

      const { gasParam, togethers } = this.props.navigation.state.params;
      const { navigation } = this.props;
      const balance = this.props.wallet.item.balance
      const gasLimit = gasParam[gas.defaultTransaction].limit
      const gasPrice = gasParam[gas.defaultTransaction].price * conversions.gigaWeiToWei

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

      if(this.state.registered === 1)
      {
        return (
          <SignIN togethers={togethers} navigation={navigation} gasParam={gasParam}/>
        );
      }

      if(balance > gasLimit * gasPrice)
      {
        return (
          <SignUP togethers={togethers} navigation={navigation} gasParam={gasParam}/>
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
