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
import { wallets as WalletsStore } from '@common/stores';

@inject('wallet','languages')
@observer
export default class SignUP extends React.Component {

  state = { loading: 0, registered: 0 };

  async componentDidMount() {

    const { togethers, wallet } = this.props;

    try {
      this.setState({
                      registered: parseInt(await togethers.verifyUserAvailability(wallet.item.name),10),
                      loading: 1
                    })
    } catch (e) {
        GeneralActions.notify(e.message, 'long');
    }
  }

    async onPressSignUp1(password1,password2) {
        Keyboard.dismiss();
        const { gasParam, togethers, wallet, languages } = this.props;
        const overrides = {
            gasLimit: gasParam[gas.setUser].limit,
            gasPrice: gasParam[gas.setUser].price * conversions.gigaWeiToWei,
            };
        try {
            if (password1 !== password2) {
              GeneralActions.notify(LanguagesActions.label47(languages.selectedLanguage), 'long');
            }
            else {
              const hashPassword = sha256(password1)
              await togethers.setUser(wallet.item.name,hashPassword,overrides)
              this.props.navigation.navigate('WalletDetails', { gasParam, togethers, replaceRoute: true });
            }
          }catch (e) {
            GeneralActions.notify(e.message, 'long');
          }
        }

        async onPressSignUp2(pseudo,password1,password2) {
            Keyboard.dismiss();
            const { gasParam, togethers, wallet } = this.props;
            const overrides = {
                gasLimit: gasParam[gas.setUser].limit,
                gasPrice: gasParam[gas.setUser].price * conversions.gigaWeiToWei,
                };
            try {
                let result = "OK"
                if (password1 !== password2) {
                  result = "KO"
                  GeneralActions.notify(LanguagesActions.label47(languages.selectedLanguage), 'long');
                }
                if ( parseInt(await togethers.verifyUserAvailability(pseudo),10) !== 1 ) {
                  result = "KO"
                  GeneralActions.notify(LanguagesActions.label48(languages.selectedLanguage), 'long');
                }
                if (result === "OK") {
                  const hashPassword = sha256(password1)
                  await togethers.setUser(pseudo,hashPassword,overrides)
                  WalletsStore.setWalletName(wallet.item.address, name);
                  this.props.navigation.navigate('WalletDetails', { gasParam, togethers, replaceRoute: true });
                }
              }catch (e) {
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

              if(this.state.registered === 1)
              {
                return (
                  <View style={styles.container}>
                  { this.renderCase1() }
                  </View>
                );
              }

              return (
                <View style={styles.container}>
                  { this.renderCase2() }
                  </View>
                );
            }

        renderCase1() {
          const { gasParam, languages } = this.props;
          const maxPrice =  gasParam[gas.setUser].limit * gasParam[gas.setUser].price * conversions.gigaWeiToWei
          const ethPrice = (maxPrice / conversions.weiToEthereum) / 2

          return (
            <Formik
              initialValues={{ password1: '', password2: ''}}
              onSubmit={(values) => this.onPressSignUp1(values.password1,values.password2)}
              validationSchema={yup.object().shape({
                password1: yup
                  .string()
                  .min(restrictions.minPassword)
                  .max(restrictions.maxPassword)
                  .required('Required'),
                password2: yup
                  .string()
                  .required('Required')
              })}
            >
              {({handleChange, values, errors, isValid, handleSubmit}) => (
                <Fragment>
            <View style={styles.container}>
              <View style={styles.body}>
                <Text style={styles.message}>{LanguagesActions.label49(languages.selectedLanguage)}</Text>
                <TextInput
                  style={styles.input}
                  value={values.password1}
                  secureTextEntry
                  onChangeText={handleChange('password1')}
                  placeholder={LanguagesActions.label49(languages.selectedLanguage)}
                  />
                <Text style={styles.message}>{LanguagesActions.label50(languages.selectedLanguage)}</Text>
                <TextInput
                  style={styles.input}
                  value={values.password2}
                  secureTextEntry
                  onChangeText={handleChange('password2')}
                  placeholder={LanguagesActions.label49(languages.selectedLanguage)}
                  />
              </View>
          <View style={styles.buttonsContainer}>
              <Button
                  children={LanguagesActions.label51(languages.selectedLanguage)}
                  disabled={!isValid}
                  onPress={handleSubmit}/>
          </View>
          <Text style={styles.detail}>{LanguagesActions.label52(languages.selectedLanguage)} {ethPrice} ETH</Text>
      </View>
      </Fragment>
    )}
    </Formik>
      )
    }

    renderCase2() {
      const { gasParam, languages } = this.props;
      const maxPrice =  gasParam[gas.setUser].limit * gasParam[gas.setUser].price * conversions.gigaWeiToWei
      const ethPrice = (maxPrice / conversions.weiToEthereum) / 2

      return (
        <Formik
          initialValues={{ password1: '', password2: '', pseudo: '' }}
          onSubmit={(values) => this.onPressSignUp2(values.pseudo,values.password1,values.password2)}
          validationSchema={yup.object().shape({
            password1: yup
              .string()
              .min(restrictions.minPassword)
              .max(restrictions.maxPassword)
              .required('Required'),
            password2: yup
              .string()
              .required('Required'),
            pseudo: yup
              .string()
              .min(restrictions.minPseudonyme)
              .max(restrictions.maxPseudonyme)
              .required('Required')
          })}
        >
          {({handleChange, values, errors, isValid, handleSubmit}) => (
            <Fragment>
        <View style={styles.container}>
          <View style={styles.body}>
            <Text style={styles.message}>{LanguagesActions.label53(languages.selectedLanguage)}</Text>
            <TextInput
              style={styles.input}
              value={values.pseudo}
              onChangeText={handleChange('pseudo')}
              placeholder={LanguagesActions.label53(languages.selectedLanguage)}
              />
            <Text style={styles.message}>{LanguagesActions.label49(languages.selectedLanguage)}</Text>
            <TextInput
              style={styles.input}
              value={values.password1}
              secureTextEntry
              onChangeText={handleChange('password1')}
              placeholder={LanguagesActions.label49(languages.selectedLanguage)}
              />
            <Text style={styles.message}>{LanguagesActions.label50(languages.selectedLanguage)}</Text>
            <TextInput
              style={styles.input}
              value={values.password2}
              secureTextEntry
              onChangeText={handleChange('password2')}
              placeholder={LanguagesActions.label49(languages.selectedLanguage)}
              />
          </View>
      <View style={styles.buttonsContainer}>
          <Button
              children={LanguagesActions.label51(languages.selectedLanguage)}
              disabled={!isValid}
              onPress={handleSubmit}/>
      </View>
      <Text style={styles.detail}>{LanguagesActions.label52(languages.selectedLanguage)} {ethPrice} ETH</Text>
  </View>
  </Fragment>
)}
</Formik>
  )
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
