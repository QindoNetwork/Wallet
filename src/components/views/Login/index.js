import React, { Fragment } from 'react'
import { Clipboard, Share, TouchableWithoutFeedback, Keyboard, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import QRCode from 'react-native-qrcode-svg';
import { Gas as gas } from '@common/constants';
import { Icon } from '@components/widgets';
import { Wallet as WalletUtils } from '@common/utils';
import * as yup from 'yup'
import { Formik } from 'formik'
import { sha256 } from 'react-native-sha256';

export class Login extends React.Component {

    static navigationOptions = { title: 'Login' };

    state = { loading: 0, registered: 0, password: '', result: 0, gasParam: this.props.navigation.getParam('gasParam'), functionIndex: gas.setUser };

    async onPressContinueSignUp(password1,password2,pseudo) {
      Keyboard.dismiss();
      var isOK = 1;
      try {
        if (!pseudo) {
          isOK = 0;
          GeneralActions.notify("Pseudo required", 'long');
        }
        if (password1 !== password2) {
          isOK = 0;
          GeneralActions.notify("Passwords not equals", 'long');
        }
        if ( parseInt(await this.props.navigation.getParam('togethers').verifyUserAvailability(pseudo)) !== 1 ) {
          isOK = 0;
          GeneralActions.notify("pseudonyme already exists", 'long');
        }
        if ( isOK === 1 ) {
          let overrides = {
              gasLimit: this.state.gasParam[this.state.functionIndex].limit,
              gasPrice: this.state.gasParam[this.state.functionIndex].price * 1000000000,
              //nonce: 123,
              //value: utils.parseEther('1.0'),
              };
          const hashPassword = sha256(password1)
          await this.props.navigation.getParam('togethers').setUser(pseudo, 1, hashPassword, overrides);
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

    async onPressContinueLogin() {
        Keyboard.dismiss();
        const { password } = this.state;
        const hashPassword = sha256(password)
        try {
          this.setState({
                          result : parseInt (await this.props.navigation.getParam('togethers').connectUser(hashPassword),10)
                        })
        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
        if (this.state.result === 1) {
          this.exit()
        }
        else {
          GeneralActions.notify("Password not good", 'long');
        }
    }

    async componentDidMount() {

      try {
        this.setState({
                        registered: parseInt (await this.props.navigation.getParam('togethers').verifyRegistration(),10),
                        loading: 1
                      })
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
    }

    renderLogin() {


        return ( <View style={styles.container}>
          <View style={styles.body}>

              <Text style={styles.message}>Password</Text>
              <TextInput
                  style={styles.input}
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  onChangeText={password => this.setState({ password })} />
          </View>
          <View style={styles.buttonsContainer}>
              <Button
                  children="Next"
                  onPress={() => this.onPressContinueLogin()}/>
          </View>
      </View>)
    }

    renderNewWallet(EthPrice) {
      return (
        <Formik
          initialValues={{ password1: '', password2: '', pseudo: '' }}
          onSubmit={values => {
              Alert.alert(
                'SignUp',
                'It will cost maximum ' + EthPrice + ' ETH',
                [
                    { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                    { text: 'Confirm', onPress: () => this.onPressContinueSignUp(values.password1,values.password2,values.pseudo) }
                ],
                { cancelable: false }
            );
            }
          }
          validationSchema={yup.object().shape({
            password1: yup
              .string()
              .min(2, 'Too Short!')
              .max(30, 'Too Long!')
              .required('Required'),
            password2: yup
              .string()
              .min(2, 'Too Short!')
              .max(30, 'Too Long!')
              .required('Required'),
            pseudo: yup
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
            <Text style={styles.message}>Choose a pseudonyme</Text>
            <TextInput
              style={styles.input}
              value={values.pseudo}
              onChangeText={handleChange('pseudo')}
              placeholder="pseudo"
              />
            <Text style={styles.message}>Password</Text>
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

    renderWalletEmpty() {
      return (
        <View style={styles.container}>
        <Text style={styles.centered}>Low balance, you need ether to register (at least {EthPrice} ETH), show the code below to receive ethers and enter to the community!</Text>
        <View style={styles.centered}>
            <QRCode size={256} value={this.props.navigation.getParam('address')} />
        </View>
          <View style={styles.actions}>
              <View style={styles.actionsBar}>
                  {this.renderColumn('copy', 'Copy', () => this.copyToClipboard())}
                  {this.renderColumn('share', 'Share', () => this.share())}
              </View>
          </View>
      </View>
      )
    }


    render() {

      const balance =  Number(WalletUtils.formatBalance(this.props.navigation.getParam('address')))
      const maxPrice =  this.state.gasParam[this.state.functionIndex].limit * this.state.gasParam[this.state.functionIndex].price
      const EthPrice = maxPrice / 1000000000

      if(this.state.loading === 0)
      {
        return (
        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
        </View>
        );
      }

      if(this.state.registered === 1)
      {
        return (
                this.renderLogin()
        );
      }

      if(maxPrice * 1000000000 > balance )
      {
        return (
                this.renderWalletEmpty(EthPrice)
        );
      }

        return (
                this.renderNewWallet(EthPrice)
        );
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
