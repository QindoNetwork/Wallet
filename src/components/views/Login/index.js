import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Contracts, General as GeneralActions  } from '@common/actions';

export class Login extends React.Component {

    static navigationOptions = { title: 'Login' };

    state = {loading: 0, registered: 0, password: '', password1: '', password2: '', pseudo: '', result: 0, gasPrice: 0, gasLimit: 0 };

    async onPressContinueSignUp(wallet,mnemonics,address) {
        Keyboard.dismiss();
        if (this.state.password1 === this.state.password2) {
          try {
            //{ gasLimit: this.state.gasLimit, gasPrice: this.state.gasPrice }
            await Contracts.TogethersInstance(mnemonics).setUser(this.state.pseudo, 1)
            await Contracts.ControlInstance(mnemonics).createPassword(this.state.password1);
            this.props.navigation.navigate('WalletDetails', { wallet, mnemonics, address, navigation: this.props.navigation, replaceRoute: true });
          } catch (e) {
              GeneralActions.notify(e.message, 'long');
          }
        }
        else {
          GeneralActions.notify("Passwords not equals", 'long');
        }
    }

    async onPressContinueLogin(wallet,mnemonics,address) {
        Keyboard.dismiss();
        try {
          this.setState({
                          result : parseInt (await Contracts.ControlInstance(mnemonics).connectUser(this.state.password, { from : address }),10)
                        })
        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
        if (this.state.result === 1) {
          this.props.navigation.navigate('WalletDetails', { wallet, mnemonics, address, replaceRoute: true  });
        }
        else {
          GeneralActions.notify("Password not good", 'long');
        }
    }

    async componentDidMount() {

      try {
        this.setState({
                        registered: parseInt (await Contracts.ControlInstance(this.props.navigation.getParam('mnemonics')).verifyRegistration({ from : this.props.navigation.getParam('address') }),10),
                        loading: 1
                      })
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
    }

    renderLogin(wallet,mnemonics,address) {
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
                  onPress={() => this.onPressContinueLogin(wallet,mnemonics,address)}/>
          </View>
      </View>)
    }

    renderNewWallet(wallet,mnemonics,address) {
      return (
        <View style={styles.container}>
          <View style={styles.body}>
            <Text style={styles.message}>Choose a pseudonyme</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                underlineColorAndroid="transparent"
                onChangeText={pseudo => this.setState({ pseudo })} />
              <Text style={styles.message}>Password</Text>
              <TextInput
                  style={styles.input}
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  onChangeText={password1 => this.setState({ password1 })} />
              <Text style={styles.message}>Confirm Password</Text>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  secureTextEntry
                  onChangeText={password2 => this.setState({ password2 })} />
          </View>
          <View style={styles.buttonsContainer}>
              <Button
                  children="Next"
                  onPress={() => this.onPressContinueSignUp(wallet,mnemonics,address)}/>
          </View>
      </View>
      )
    }


    render() {

      var wallet = this.props.navigation.getParam('wallet')
      var mnemonics = this.props.navigation.getParam('mnemonics')
      var address = this.props.navigation.getParam('address')

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
                this.renderLogin(wallet,mnemonics,address)
        );
      }
        return (
                this.renderNewWallet(wallet,mnemonics,address)
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
