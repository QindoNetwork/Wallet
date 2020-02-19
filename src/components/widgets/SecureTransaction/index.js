import React, { Fragment } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, View, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Contract as ContractActions, Transaction as TransactionActions  } from '@common/actions';
import Modal from 'react-native-modal';
import { Gas as gas, Conversions as conversions } from '@common/constants';
import { sha256 } from 'react-native-sha256';
import { inject, observer } from 'mobx-react';

@inject('wallet','languages')
@observer
export class SecureTransaction extends React.Component {

    state = { show: true, loading: 0, registered: 0, password: '' };

    async componentDidMount() {

      try {
        this.setState({
                        registered: parseInt (await this.props.togethers.verifyRegistration(),10),
                        loading: 1
                      })
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
    }

    async onPressContinue() {
        Keyboard.dismiss();
        const { languages } = this.props
        this.setState({ loading: 0 });
        try {
          let result
          if (this.state.registered === 1) {
            const hashPassword = sha256(this.state.password)
            result = parseInt (await this.props.togethers.connectUser(hashPassword),10)
          }
          else result = 1
          if (result === 1) {
            this.exit()
          }
          else {
            this.hide()
            GeneralActions.notify("Password not good", 'long');
          }
        } catch (e) {
          this.hide()
          GeneralActions.notify(e.message, 'long');
        }

    }

    async exit() {

      const { togethers, type, navigation, values, gasParam, wallet, languages } = this.props
      const address = wallet.item.address
      const gasLimit = gasParam[type].limit
      const gasPrice = gasParam[type].price * conversions.gigaWeiToWei
      const overrides = {
          gasLimit,gasPrice
          };

      var tx = "KO"
      if (gasLimit * gasPrice < wallet.item.balance) {
        switch (type) {
                case gas.createGroup:
                    tx = await ContractActions.createGroup(togethers,values,overrides,languages)
                    break;
                case gas.ask:
                    tx = await ContractActions.ask(togethers,values,address,overrides,languages)
                    break;
                case gas.createProfile:
                    tx = await ContractActions.createProfile(togethers,values,overrides,languages)
                    break;
                case gas.changePassword:
                    tx = await ContractActions.changePassword(togethers,values,overrides,languages)
                    break;
                case gas.changeUserName:
                    tx = await ContractActions.changeUserName(togethers,values,address,overrides,languages)
                    break;
                case gas.withdrawFunds:
                    tx = await ContractActions.withdrawFunds(togethers,values,overrides,languages)
                    break;
                case gas.askForFunds:
                    tx = await ContractActions.askForFunds(togethers,values,overrides,languages)
                    break;
                case gas.quitGroup:
                    tx = await ContractActions.quitGroup(togethers,values,address,overrides,languages)
                    break;
                case gas.transferGroupOwnership:
                    tx = await ContractActions.transferGroupOwnership(togethers,values,overrides,languages)
                    break;
                case gas.removeMember:
                    tx = await ContractActions.removeMember(togethers,values,overrides,languages)
                    break;
            default:
                GeneralActions.notify('unknown function', 'long');
                break;
        }
        if (tx === "KO") {
          this.hide()
        }
        else {
          this.setState({show: false})
          navigation.navigate('WalletDetails', { ...this.props, replaceRoute: true, leave: 0 });
          GeneralActions.notify('Success, wait for confirmation in historic', 'short');
        }
      }else {
        GeneralActions.notify('Low balance', 'long');
        }
    }

    hide() {
      this.setState({show: false})
      this.props.navigation.pop()
    }

    renderDescription(ethPrice) {
      const { languages } = this.props
      return(
          <Text style={styles.detail}>Approximatly {ethPrice} ETH</Text>)
    }

    renderButtons() {
      const { languages } = this.props
      return(
        <View style={styles.body}>
          <View style={styles.buttonsContainer}>
            <Button
              children="Continue"
              onPress={() => this.onPressContinue()}
              />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              children="Cancel"
              onPress={() => this.hide()}
              />
          </View>
        </View>)
    }


  renderBody(ethPrice) {
    if(this.state.loading === 0)
    {
      return(
        <View style={styles.container}>
            <View style={styles.body}>
              <ActivityIndicator size="large"/>
            </View>
          </View>
    )
    }
    if(this.state.registered === 0)
    {
      return(
        <View>
        {this.renderButtons()}
        {this.renderDescription(ethPrice)}
        </View>
    )
    }
    return(
      <View style={styles.container}>
      <Text style={styles.message}>Enter password</Text>
        <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="password"
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({ password })} />
        {this.renderButtons()}
        {this.renderDescription(ethPrice)}
        </View>
  )
}

render() {

    const { type, gasParam } = this.props;
    const maxPrice =  gasParam[type].limit * gasParam[type].price * conversions.gigaWeiToWei
    const ethPrice = (maxPrice / conversions.weiToEthereum) / 2

    return (
        <Modal
            isVisible={this.state.show}
            children={this.renderBody(ethPrice)} />
    );
}

}


const styles = StyleSheet.create({
buttonsContainer: {
    width: '100%',
    justifyContent: 'space-between',
    height: 52
},
detail: {
    color: 'black',
    fontSize: 10,
    textAlign: 'center',
    marginVertical: measures.defaultMargin/2,
    marginHorizontal: 32
},
message: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: measures.defaultMargin,
    marginHorizontal: 32
},
input: {
    width: '100%',
    padding: 10,
    paddingLeft: 0,
    marginRight: 0,
    textAlign: 'center',
    color: colors.black
},
container: {
    backgroundColor: colors.white,
    paddingHorizontal: measures.defaultPadding,
    maxHeight: 700,
    borderRadius: 4
}
});
