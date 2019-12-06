import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Contracts as ContractInstance } from '@common/actions';

export class Login extends React.Component {

    static navigationOptions = { title: 'New Wallet Name' };

    state = { password: '', password1: '', password2: '' };

    onPressContinueSignUp() {
        Keyboard.dismiss();
        const { walletName, walletDescription, password1, password2 } = this.state;
        if (password1 === password2) return;
        ContractInstance.ControlInstance(this.props.mnemonics).createPassword(password1);
        this.props.navigation.navigate('WalletsOverview', { replaceRoute: true });
    }

    onPressContinueLogin() {
        Keyboard.dismiss();
        const { walletName, walletDescription, password1, password2 } = this.state;
        if (!walletName && !pseudonyme && password1 === password2) return;
        const password = password1
        this.props.navigation.navigate('WalletsOverview', { replaceRoute: true });
    }

    isRegistered() {
        Keyboard.dismiss();
        const { walletName, walletDescription, password1, password2 } = this.state;
        if (!walletName && !pseudonyme && password1 === password2) return;
        isRegistered
        const password = password1
        this.props.navigation.navigate('NewWallet', { walletName, walletDescription, password });
    }

    async componentDidMount() {
      try {
          var sendTransactionPromise = contractInstance.ControlInstance(this.props.mnemonics).verifyRegistration();
          sendTransactionPromise.then(function(tx) {
            GeneralActions.notify(tx, 'long');
          });
          await WalletActions.updateHistory(this.props.wallet.item);
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
                  onPress={() => this.onPressContinue()} />
          </View>
      </View>)
    }

    renderNewWallet() {
      return (
        <View style={styles.container}>
          <View style={styles.body}>
              <Text style={styles.message}>Give a name to the new wallet</Text>
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
                  onPress={() => this.onPressContinue()} />
          </View>
      </View>
      )
    }


    render() {
        return (
            <View style={styles.container}>

                <Balance />
                {this.renderBody(this.props.wallet)}
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
