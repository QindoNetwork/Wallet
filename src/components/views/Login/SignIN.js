import React, { Fragment } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';
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
import { wallets as WalletsStore } from '@common/stores';

@inject('wallet','languages')
@observer
export default class SignIN extends React.Component {

  async componentDidMount() {

    const { togethers, wallet } = this.props;

    try {
      const walletName = await togethers.mappAddressToUser(wallet.item.address)
      WalletsStore.setWalletName(wallet.item.address, walletName);
    } catch (e) {
        GeneralActions.notify(e.message, 'long');
    }
  }

    async onPressContinueLogin() {
        Keyboard.dismiss();
        const { gasParam, togethers, languages } = this.props;
        const { password } = this.state;
        const hashPassword = sha256(password)
        try {
          this.setState({
                          result : parseInt (await togethers.connectUser(hashPassword),10)
                        })

        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
        if (this.state.result === 1) {
          this.props.navigation.navigate('WalletDetails', { gasParam, togethers, replaceRoute: true });
        }
        else {
          GeneralActions.notify(LanguagesActions.label46(languages.selectedLanguage), 'long');
        }
    }

    render() {
      const { languages } = this.props
        return ( <View style={styles.container}>
          <View style={styles.body}>
              <Text style={styles.message}>{LanguagesActions.label44(languages.selectedLanguage)}</Text>
              <TextInput
                  style={styles.input}
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  placeholder={LanguagesActions.label44(languages.selectedLanguage)}
                  onChangeText={password => this.setState({ password })} />
          </View>
          <View style={styles.buttonsContainer}>
              <Button
                  children={LanguagesActions.label45(languages.selectedLanguage)}
                  onPress={() => this.onPressContinueLogin()}/>
          </View>
      </View>)
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
