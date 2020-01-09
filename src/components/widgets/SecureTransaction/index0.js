import React, { Fragment } from 'react'
import { Clipboard, Share, TouchableWithoutFeedback, Keyboard, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Contracts as ContractsActions  } from '@common/actions';
import QRCode from 'react-native-qrcode-svg';
import { Icon } from '@components/widgets';
import { Wallet as WalletUtils } from '@common/utils';
import * as yup from 'yup'
import { Formik } from 'formik'
import Modal from 'react-native-modal';
import { Gas as gas, Conversions as conversions, Restrictions as restrictions } from '@common/constants';

export class SecureTransaction extends React.Component {

    state = { show: this.props.show };

    async onPressContinueLogin() {
        Keyboard.dismiss();
        try {
          const result = parseInt (await this.props.togethers.connectUser(this.state.password),10)
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
      this.hide()
      let overrides

      if (type === gas.payForFunds) {
        overrides = {
          gasLimit: limit,
          gasPrice: price * conversions.gigaWeiToWei,
          nonce: nonce
          };
      }

      else {
        overrides = {
          gasLimit: limit,
          gasPrice: price * conversions.gigaWeiToWei,
          };
      }

      try {

      if (type === gas.createGroup) {
        ContractsActions.createGroup(togethers,values,overrides)
      }
      if (type === gas.ask) {
        ContractsActions.ask(togethers,values,overrides)
      }
      if (type === gas.createProfile) {
        ContractsActions.createProfile(togethers,values,overrides)
      }
      if (type === gas.changePassword) {
        ContractsActions.changePassword(togethers,values,overrides)
      }
      if (type === gas.changeUserName) {
        ContractsActions.changeUserName(togethers,values,overrides)
      }
      if (type === gas.withdrawFunds) {
        ContractsActions.withdrawFunds(togethers,values,overrides)
      }
      if (type === gas.payForFunds) {
        ContractsActions.payForFunds(togethers,values,overrides)
      }
      if (type === gas.askForFunds) {
        ContractsActions.askForFunds(togethers,values,overrides)
      }
      if (type === gas.quitGroup) {
        ContractsActions.quitGroup(togethers,values,overrides)
      }
      if (type === gas.transferGroupOwnership) {
        ContractsActions.transferGroupOwnership(togethers,values,overrides)
      }
      if (type === gas.removeMember) {
        ContractsActions.removeMember(togethers,values,overrides)
      }
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
      <Text style={styles.message}>Password</Text>
</View>);

render() {

    const { togethers, values, limit, price, type } = this.props;
    const maxPrice =  limit * price * conversions.gigaWeiToWei
    const EthPrice = maxPrice / conversions.weiToEthereum

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
buttonsContainer: {
    width: '100%',
    justifyContent: 'space-between',
    height: 52
},
message: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: measures.defaultMargin,
    marginHorizontal: 32
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
},
container: {
    backgroundColor: colors.white,
    paddingHorizontal: measures.defaultPadding,
    maxHeight: 700,
    borderRadius: 4
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
