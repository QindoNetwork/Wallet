import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Contracts, GeneralActions  } from '@common/actions';

export class Login extends React.Component {

    static navigationOptions = { title: 'Login' };

    state = {loading: 0, registered: 0, password: '', password1: '', password2: '' };

    async onPressContinueSignUp(wallet,mnemonics,address) {
        Keyboard.dismiss();
        if (this.state.password1 === this.state.password2) {
          try {
            await Contracts.ControlInstance(mnemonics).createPassword(this.state.password1);
            this.props.navigation.navigate('WalletsDetail', { wallet, mnemonics, address });
          } catch (e) {
              GeneralActions.notify(e.message, 'long');
          }
        }
        else {
        Alert.alert(
          'Passwords not equals',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ]
      )
      }
    }

    async onPressContinueLogin(wallet,mnemonics,address) {
        Keyboard.dismiss();
        var resp = 0
        try {
          resp = parseInt (await Contracts.ControlInstance(mnemonics).connectUser(this.state.password),10);
        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
        if (resp === 1) {
        this.props.navigation.navigate('WalletsDetail', { wallet, mnemonics, address });
        }
        else {
          Alert.alert(
          'Password not good',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ]
      )
      }
    }

    async componentDidMount() {
      var mnemonics = this.props.navigation.getParam('mnemonics')
      var promise = 0
      try {
        this.setState({ loading: 1,
                        registered: parseInt (await Contracts.ControlInstance(mnemonics).verifyRegistration(),10),
                      })
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
      this.setState({ loading: 1 })
    }

    renderLogin() {
        return ( <View style={styles.container}>
          <View style={styles.body}>
              <Text style={styles.message}>Login</Text>
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
                  onPress={() => {
                      Alert.alert(
                        'Confirm',
                      [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => this.onPressContinueLogin(this.state.password, this.state.password)},
                      ]
                    )
                    }
                  } />
          </View>
      </View>)
    }

    renderNewWallet() {
      return (
        <View style={styles.container}>
          <View style={styles.body}>
              <Text style={styles.message}>First connection : Sign Up</Text>
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
                  onPress={() => {
                      Alert.alert(
                        'Confirm',
                      [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => this.onPressContinueSignUp(this.state.password1, this.state.password2)},
                      ]
                    )
                    }
                  } />
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
            <ActivityIndicator size="large" color="#0000ff" />
        );
      }

      if(this.state.registered === 1)
      {
        return (
            <View style={styles.container}>
                {this.renderLogin(wallet,mnemonics,address)}
            </View>
        );
      }
        return (
            <View style={styles.container}>
                {this.renderNewWallet(wallet,mnemonics,address)}
            </View>
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
