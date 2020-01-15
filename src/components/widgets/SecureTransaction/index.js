import React, { Fragment } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, View, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Contract as ContractActions  } from '@common/actions';
import * as yup from 'yup'
import { Formik } from 'formik'
import Modal from 'react-native-modal';
import { Gas as gas, Conversions as conversions } from '@common/constants';
import { sha256 } from 'react-native-sha256';

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

      const { togethers, limit, price , type, nonce, navigation, values, address, connection } = this.props
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
        var tx = "KO"
        switch (type) {
                case gas.setUser:
                    tx = await ContractActions.setUser(togethers,values,overrides)
                    break;
                case gas.createGroup:
                    tx = await ContractActions.createGroup(togethers,values,overrides)
                    break;
                case gas.ask:
                    tx = await ContractActions.ask(togethers,values,address,overrides)
                    break;
                case gas.createProfile:
                    tx = await ContractActions.createProfile(togethers,values,overrides)
                    break;
                case gas.changePassword:
                    tx = await ContractActions.changePassword(togethers,values,overrides)
                    break;
                case gas.changeUserName:
                    tx = await ContractActions.changeUserName(togethers,values,overrides)
                    break;
                case gas.withdrawFunds:
                    tx = await ContractActions.withdrawFunds(togethers,values,overrides)
                    break;
                case gas.askForFunds:
                    tx = await ContractActions.askForFunds(togethers,values,overrides)
                    break;
                case gas.quitGroup:
                    tx = await ContractActions.quitGroup(togethers,values,overrides)
                    break;
                case gas.transferGroupOwnership:
                    tx = await ContractActions.transferGroupOwnership(togethers,values,overrides)
                    break;
                case gas.removeMember:
                    tx = await ContractActions.removeMember(togethers,values,overrides)
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
    }

    hide() {
      this.setState({show: false})
      this.props.navigation.pop()
    }

    renderDescription(ethPrice) {
      return(
        <View>
          <Text style={styles.message}>This action will cost maximum :</Text>
          <Text style={styles.message}>{ethPrice} ETH</Text>
        </View>)
    }

    renderButtons() {
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
        {this.renderDescription(ethPrice)}
        {this.renderButtons()}
        </View>
    )
    }
    return(
      <View style={styles.container}>
        {this.renderDescription(ethPrice)}
        <Text style={styles.message}>Password</Text>
        <TextInput
            style={styles.input}
            secureTextEntry
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({ password })} />
        {this.renderButtons()}
        </View>
  )
}

render() {

    const { limit, price } = this.props;
    const maxPrice =  limit * price * conversions.gigaWeiToWei
    const ethPrice = maxPrice / conversions.weiToEthereum

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
message: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: measures.defaultMargin,
    marginHorizontal: 32
},
input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    padding: 4,
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
