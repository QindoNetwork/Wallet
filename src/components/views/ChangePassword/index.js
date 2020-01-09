import React, { Fragment } from 'react'
import { Clipboard, Share, TouchableWithoutFeedback, Keyboard, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import QRCode from 'react-native-qrcode-svg';
import { Icon } from '@components/widgets';
import { Gas as gas } from '@common/constants';
import { Wallet as WalletUtils } from '@common/utils';
import * as yup from 'yup'
import { Formik } from 'formik'
import { inject, observer } from 'mobx-react';
@inject('prices', 'wallet')
@observer

export class ChangePassword extends React.Component {

    static navigationOptions = { title: 'Login' };

    state = { gasParam: this.props.navigation.getParam('gasParam'), functionIndex: gas.changePassword };

    async onPressContinue(password1,password2,oldPassword) {
      Keyboard.dismiss();
      var isOK = 1;
      try {
        const result = parseInt (await this.props.navigation.getParam('togethers').connectUser(oldPassword),10)
        if (result === 0) {
          isOK = 0;
          GeneralActions.notify("Password not good", 'long');
        }
        if (password1 !== password2) {
          isOK = 0;
          GeneralActions.notify("Passwords not equals", 'long');
        }
        if (password1 === oldPassword) {
          isOK = 0;
          GeneralActions.notify("The new password have to be different", 'long');
        }
        if ( isOK === 1 ) {
          let overrides = {
              gasLimit: this.state.gasParam[this.state.functionIndex].limit,
              gasPrice: this.state.gasParam[this.state.functionIndex].price * 1000000000,
              //nonce: 123,
              //value: utils.parseEther('1.0'),
              };
          await this.props.navigation.getParam('togethers').changePassword(password1, overrides);
          this.exit()
          GeneralActions.notify('Your transaction was sent successfully and now is waiting for confirmation. Please wait', 'long');
        }
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
    }

    exit() {
        const { navigation } = this.props
        const gasParam = this.state.gasParam
        const address = navigation.getParam('address')
        const erc20s = navigation.getParam('erc20s')
        const togethers = navigation.getParam('togethers')
        const myPseudo = navigation.getParam('myPseudo')
        navigation.navigate('WalletDetails', { myPseudo, gasParam, address, erc20s, togethers, replaceRoute: true });
    }


    render() {

      const balance =  Number(WalletUtils.formatBalance(this.props.navigation.getParam('address')))
      const maxPrice =  this.state.gasParam[this.state.functionIndex].limit * this.state.gasParam[this.state.functionIndex].price
      const EthPrice = maxPrice / 1000000000

      return (
        <Formik
          initialValues={{ password1: '', password2: '', pseudo: '' }}
          onSubmit={values => {
              Alert.alert(
                'SignUp',
                'It will cost maximum ' + EthPrice + ' ETH',
                [
                    { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                    { text: 'Confirm', onPress: () => this.onPressContinue(values.password1,values.password2,values.oldPassword) }
                ],
                { cancelable: false }
            );
            }
          }
          validationSchema={yup.object().shape({
            oldPassword: yup
              .string()
              .min(2, 'Too Short!')
              .max(30, 'Too Long!')
              .required('Required'),
            password1: yup
              .string()
              .min(2, 'Too Short!')
              .max(30, 'Too Long!')
              .required('Required'),
            password2: yup
              .string()
              .min(2, 'Too Short!')
              .max(30, 'Too Long!')
              .required('Required')
          })}
        >
          {({handleChange, values, errors, isValid, handleSubmit}) => (
            <Fragment>
        <View style={styles.container}>
          <View style={styles.body}>
            <Text style={styles.message}>Old password</Text>
            <TextInput
              style={styles.input}
              value={values.oldPassword}
              onChangeText={handleChange('oldPassword')}
              placeholder="old password"
              />
            <Text style={styles.message}>New Password</Text>
            <TextInput
              style={styles.input}
              value={values.password1}
              secureTextEntry
              onChangeText={handleChange('password1')}
              placeholder="password"
              />
            <Text style={styles.message}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={values.password2}
              secureTextEntry
              onChangeText={handleChange('password2')}
              placeholder="password"
              />
          </View>
      <View style={styles.buttonsContainer}>
          <Button
              children="Next"
              disabled={!isValid}
              onPress={handleSubmit}/>
      </View>
  </View>
  </Fragment>
)}
</Formik>
  )
    }

}

const styles = StyleSheet.create({
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
        color: colors.black,
        fontSize: 16,
        textAlign: 'center',
        marginVertical: measures.defaultMargin,
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
        borderBottomWidth: 1,
        borderBottomColor: colors.black,
        padding: 4,
        paddingLeft: 0,
        marginRight: 2,
        textAlign: 'center',
        color: colors.black
    }
});
