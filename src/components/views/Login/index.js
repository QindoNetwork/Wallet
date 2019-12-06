import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Contracts as ContractInstance } from '@common/actions';

export class Login extends React.Component {

    static navigationOptions = { title: 'Login' };

    state = {registered: false, password: '', password1: '', password2: '' };

    onPressContinueSignUp(password1,password2) {
        Keyboard.dismiss();
        const pass1 = password1.toString()
        const pass2 = password2.toString()
        const wallet = this.props.wallet
        const mnemonics = this.props.wallet
        const address = this.props.wallet
        if (pass1 !== pass2) return;
        ContractInstance.ControlInstance(this.props.mnemonics).createPassword(pass1);
        this.props.navigation.navigate('WalletsDetail', { wallet, mnemonics, address, replaceRoute: true });
        GeneralActions.notify("wait for validation", 'long');
    }

    async onPressContinueLogin(password) {
        Keyboard.dismiss();
        const pass = password.toString()
        const wallet = this.props.wallet
        const mnemonics = this.props.wallet
        const address = this.props.wallet
        var resp = new Boolean (await ContractInstance.ControlInstance(this.props.mnemonics).connectUser(resp));
        if (!resp) return;
        this.props.navigation.navigate('WalletsDetail', { wallet, mnemonics, address, replaceRoute: true });
    }

    async componentDidMount() {
      var sendTransactionPromise = await (ContractInstance.ControlInstance(this.props.mnemonics).isRegistered());
      this.setState({ registered: new Boolean(sendTransactionPromise) })
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
                  onPress={() => this.onPressContinueLogin(this.state.password)} />
          </View>
      </View>)
    }

    renderNewWallet() {
      return (
        <View style={styles.container}>
          <View style={styles.body}>
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
                  onPress={() => this.onPressContinueSignUp(this.state.password1, this.state.password2)} />
          </View>
      </View>
      )
    }


    render() {
      if(this.state.registered === true)
      {
        return (
            <View style={styles.container}>
                {this.renderLogin()}
            </View>
        );
      }
        return (
            <View style={styles.container}>
                {this.renderNewWallet()}
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
