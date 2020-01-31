import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from '@components/widgets';
import { measures, colors } from '@common/styles';
import { Gas as gas, Conversions as conversions } from '@common/constants';
import { General as GeneralActions, Transactions as TransactionActions } from '@common/actions';
import { Image as ImageUtils, Transaction as TransactionUtils, Wallet as WalletUtils } from '@common/utils';
import Modal from 'react-native-modal';
import { inject, observer } from 'mobx-react';
import { sha256 } from 'react-native-sha256';
import { ERC20ABI as erc20ABI } from '@common/ABIs';
import { Contracts as contractsAddress } from '@common/constants';
import { ethers } from 'ethers';
@inject('wallet')
@observer

export class ConfirmTransaction extends React.Component {

    static navigationOptions = { title: 'Confirm transaction' };

    state = { show: false, password: '', registered: 0, loading: 0, loading2: 1 };

    async componentDidMount() {

              const { togethers } = this.props.navigation.state.params;

      try {
        this.setState({
                        registered: parseInt (await togethers.verifyRegistration(),10),
                        loading: 1
                      })
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
    }

    renderButtons() {

        return(
            <View>
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

    renderModal() {

      if(this.state.loading2 === 0)
      {
        return(
          <View style={styles.containerModal}>
              <View style={styles.body}>
                <ActivityIndicator size="large"/>
              </View>
            </View>
      )
      }

      if(this.state.registerd === 0)
      {
        return(
            <View style={styles.containerModal}>
            <View style={styles.body}>
            <Text style={styles.message}>Confirm</Text>
            </View>
              {this.renderButtons()}
            </View>)
      }

      return(
          <View style={styles.containerModal}>
          <View style={styles.body}>
          <Text style={styles.message}>Confirm</Text>
          <Text style={styles.message}>Password</Text>
          <TextInput
              style={styles.input}
              secureTextEntry
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({ password })} />
              </View>
          {this.renderButtons()}
          </View>)

    }

    async onPressContinue() {
        this.setState({ loading2: 0 })
        const { wallet } = this.props
        const { item, togethers, gasParam, amount, target, groupID } = this.props.navigation.state.params;
        let overrides
        let result = 0
        let value
        let instance
        try {
        let nonce
        if (this.state.registered === 1) {
          const hashPassword = sha256(this.state.password)
          result = parseInt (await togethers.connectUser(hashPassword),10)
          if (result === 0) {
            this.hide()
            GeneralActions.notify("Password not good", 'long');
            return
          }
        }
        if(item.name === 'Ethers') {
          value = amount
        }
        else {
        value = (amount * (Math.pow(10,item.decimals))).toString()
        }
        if(groupID !== '0') {
          nonce = await TransactionActions.nextNonce(address)
              if(item.name !== 'Ethers') {
                overrides = {
                    gasLimit: gasParam[eRC20allowance].limit,
                    gasPrice: gasParam[eRC20allowance].price * conversions.gigaWeiToWei,
                    nonce: nonce,
                    };
                TransactionActions.erc20approve(value,item.instance,overrides)
                nonce = nonce + 1
              }
              overrides = {
                  gasLimit: gasParam[payForFunds].limit,
                  gasPrice: gasParam[payForFunds].price * conversions.gigaWeiToWei,
                  nonce: nonce,
                  };
                  await togethers.payForFunds(target,groupID,value,item.address,overrides);
            }
            else {
            if(item.name !== 'Ethers') {
              overrides = {
                  gasLimit: gasParam[gas.eRC20transfer].limit,
                  gasPrice: gasParam[gas.eRC20transfer].price * conversions.gigaWeiToWei,
                  };
                  await item.instance.transfer(target,value,overrides)
            }
            else {
                  const gasLimit = gasParam[gas.defaultTransaction].limit
                  const gasPrice = gasParam[gas.defaultTransaction].price * conversions.gigaWeiToWei
                  const txn = TransactionUtils.createTransaction(target, value, gasLimit, gasPrice);
                  await TransactionActions.sendTransaction(wallet.item, txn);
            }
            }
            this.props.navigation.navigate('WalletDetails', { togethers, gasParam, replaceRoute: true, leave: 0 });
            GeneralActions.notify('Success, wait for confirmation in historic', 'short');
          }catch (e) {
            this.hide()
            GeneralActions.notify(e.message, 'long');
        }
    }

    hide() {
      this.props.navigation.pop()
    }

    render() {
        const { amount, target, loading, item } = this.props.navigation.state.params;
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
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.row}>
                        <View style={styles.textColumn}>
                            <Text style={styles.title}>Wallet address</Text>
                            <Text style={styles.value}
                                numberOfLines={1}
                                ellipsizeMode="middle"
                                children={target} />
                        </View>
                        <Image style={styles.avatar}
                            source={{ uri: ImageUtils.generateAvatar(target,500) }} />
                    </View>
                    <View style={styles.textColumn}>
                        <Text style={styles.title}>Amount ({item.symbol}) </Text>
                        <Text style={styles.value}>{amount}</Text>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                      children="Confirm payment"
                      onPress={() =>   this.setState({ show: true })}/>
                  </View>
                  <Modal
                      isVisible={this.state.show}
                      children={this.renderModal()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  containerModal: {
      backgroundColor: colors.white,
      paddingHorizontal: measures.defaultPadding,
      maxHeight: 700,
      borderRadius: 4
  },
    container: {
        flex: 1,
        padding: measures.defaultPadding,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: colors.defaultBackground,
    },
    content: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textColumn: {
        marginVertical: measures.defaultMargin,
    },
    title: {
        fontSize: measures.fontSizeMedium + 1,
        fontWeight: 'bold',
    },
    value: {
        fontSize: measures.fontSizeMedium,
        width: 200
    },
    avatar: {
        width: 100,
        height: 100
    }
});
