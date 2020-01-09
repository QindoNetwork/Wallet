import React, { Fragment } from 'react'
import { Clipboard, Share, TouchableWithoutFeedback, Keyboard, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Contracts as ContractsActions  } from '@common/actions';
import QRCode from 'react-native-qrcode-svg';
import { Gas as gas } from '@common/constants';
import { Icon } from '@components/widgets';
import { Wallet as WalletUtils } from '@common/utils';
import * as yup from 'yup'
import { Formik } from 'formik'
import Modal from 'react-native-modal';

export class SecureTransaction extends React.Component {

    state = { loading: 0, registered: 0, password: '', show: true };

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

    async onPressContinueLogin() {
        Keyboard.dismiss();
        try {
          const result = parseInt (await this.props.navigation.getParam('togethers').connectUser(this.state.password),10)
        } catch (e) {
            GeneralActions.notify(e.message, 'long');
        }
        if (result === 1) {
          this.exit()
        }
        else {
          GeneralActions.notify("Password not good", 'long');
        }
    }

    exit() {

      const { togethers, values, limit, price , type, nonce } = this.props

      let overrides

      if (type === "7") {
        overrides = {
          gasLimit: limit,
          gasPrice: price * 1000000000,
          nonce: nonce
          //value: utils.parseEther('1.0'),
          };
      }

      else {
        overrides = {
          gasLimit: limit,
          gasPrice: price * 1000000000,
          //nonce: 123,
          //value: utils.parseEther('1.0'),
          };
      }

      try {

      if (type === gas.createGroup) {
        ContractsActions.createGroup(togethers,values,overrides)
      }
      if (type === "2") {
        ContractsActions.ask(togethers,values,overrides)
      }
      if (type === "3") {
        ContractsActions.createProfile(togethers,values,overrides)
      }
      if (type === "4") {
        ContractsActions.changePassword(togethers,values,overrides)
      }
      if (type === "5") {
        ContractsActions.changeUserName(togethers,values,overrides)
      }
      if (type === "6") {
        ContractsActions.withdrawFunds(togethers,values,overrides)
      }
      if (type === "7") {
        ContractsActions.payForFunds(togethers,values,overrides)
      }
      if (type === "8") {
        ContractsActions.askForFunds(togethers,values,overrides)
      }
      if (type === "9") {
        ContractsActions.quitGroup(togethers,values,overrides)
      }
      if (type === "10") {
        ContractsActions.transferGroupOwnership(togethers,values,overrides)
      }
      if (type === "11") {
        ContractsActions.removeMember(togethers,values,overrides)
      }
      this.hide()
      this.props.navigation.navigate('WalletDetails', { wallet: this.props.swallet.item, replaceRoute: true, leave: 2 });
      GeneralActions.notify('Your transaction was sent successfully and now is waiting for confirmation. Please wait', 'long');

    } catch (e) {
        GeneralActions.notify(e.message, 'long');
    }

    }

    hide() {
        this.setState({ show: false });
    }

  renderBody = () => ( <View style={styles.container}>
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
</View>);

render() {
    const { transaction } = this.props;

    if(this.state.registered === 0)
    {
    return(  <View style={styles.container}>
      <View style={styles.buttonsContainer}>
          <Button
              children="Next"
              onPress={() => this.onPressContinueLogin()}/>
      </View>
    </View>)
    }

    if(this.state.loading === 0)
    {
      return (
        <View style={styles.container}>
        <View style={styles.body}>
          <ActivityIndicator size="large"/>
        </View>
      </View>);
    }

    return (
        <Modal
            isVisible={this.state.show}
            onBackButtonPress={() => this.hide()}
            onBackdropPress={() => this.hide()}
            children={this.renderBody()} />
    );
}

}


const styles = StyleSheet.create({
container: {
    backgroundColor: colors.white,
    paddingHorizontal: measures.defaultPadding,
    maxHeight: 700,
    borderRadius: 4
},
buttonsContainer: {
    width: '100%',
    justifyContent: 'space-between',
    height: 52
},
header: {
    paddingVertical: measures.defaultPadding,
    alignItems: 'flex-end',
    justifyContent: 'center'
},
content: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: colors.secondary
},
row: {
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: measures.defaultMargin / 2
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
label: {
    fontWeight: 'bold',
    textAlign: 'center'
},
value: {
    textAlign: 'center'
}
});
