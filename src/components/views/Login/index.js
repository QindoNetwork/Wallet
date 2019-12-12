import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';

export class Login extends React.Component {

    static navigationOptions = { title: 'Login' };

    state = {loading: 0, registered: 0, password: '', password1: '', password2: '', pseudo: '', result: 0, gasPrice: 0, gasLimit: 0 };

    async onPressContinueSignUp() {
        Keyboard.dismiss();
        const { password1, password2, pseudo } = this.state;
        if (password1 === password2 && pseudo ) {
          try {
            await this.props.navigation.getParam('togethers').setUser(pseudo, 1);
            await this.props.navigation.getParam('control').createPassword(password1);
            this.enter()
          } catch (e) {
              GeneralActions.notify(e.message, 'long');
          }
        }
        else {
          GeneralActions.notify("Passwords not equals or pseudonyme already exists", 'long');
        }
    }

    enter() {
        const wallet = this.props.navigation.getParam('wallet')
        const gasParam = this.props.navigation.getParam('gasParam')
        const address = this.props.navigation.getParam('address')
        const ERC20s = this.props.navigation.getParam('ERC20s')
        const control = this.props.navigation.getParam('control')
        const togethers = this.props.navigation.getParam('togethers')
        this.props.navigation.navigate('WalletDetails', { wallet, gasParam, address, ERC20s, control, togethers, replaceRoute: true });
    }

    async onPressContinueLogin() {
        Keyboard.dismiss();
        const { password } = this.state;
        try {
          this.setState({
                          result : parseInt (await this.props.navigation.getParam('control').connectUser(password),10)
                        })
        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
        if (this.state.result === 1) {
          this.enter()
        }
        else {
          GeneralActions.notify("Password not good", 'long');
        }
    }

    async componentDidMount() {

      try {
        this.setState({
                        registered: parseInt (await this.props.navigation.getParam('control').verifyRegistration(),10),
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

    renderNewWallet() {
      return (
        <View style={styles.container}>
          <View style={styles.body}>
            <Text style={styles.message}>Choose a pseudonyme</Text>
            <TextInput
                style={styles.input}
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
                  onPress={() => this.onPressContinueSignUp()}/>
          </View>
      </View>
      )
    }


    render() {

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
        return (
                this.renderNewWallet()
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
