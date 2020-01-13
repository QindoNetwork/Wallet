import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '@components/widgets';
import { measures, colors } from '@common/styles';
import { Gas as gas } from '@common/constants';
import { General as GeneralActions, Transactions as TransactionActions } from '@common/actions';
import { Image as ImageUtils, Transaction as TransactionUtils, Wallet as WalletUtils } from '@common/utils';
import { inject, observer } from 'mobx-react';
import Modal from 'react-native-modal';
@inject('prices', 'wallet')
@observer

export class ConfirmTransaction extends React.Component {

    static navigationOptions = { title: 'Confirm transaction' };

    state = { show: false, password: '', registered: 0 };

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

    renderModal() {

      if(this.state.registerd === 0)
      {
        return(
            <View style={styles.container}>
            <Text style={styles.message}>Confirm</Text>
              {this.renderButtons()}
            </View>)
      }

      return(
          <View style={styles.container}>
          <Text style={styles.message}>Confirm</Text>
          <Text style={styles.message}>Password</Text>
          <TextInput
              style={styles.input}
              secureTextEntry
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({ password })} />
          {this.renderButtons()}
          </View>)

    }

    async onPressContinue() {
        const { item, togethers, erc20s, gasParam, address, amount, target, contract } = this.props.navigation.state.params;
        let overrides
        let nonce = TransactionActions.nextNonce(address)
        let value
        let result
        if (this.state.registered === 1) {
          const hashPassword = sha256(this.state.password)
          result = parseInt (await togethers.connectUser(hashPassword),10)
        }
        else result = 1
        if (result === 0) {
          this.hide()
          GeneralActions.notify("Password not good", 'long');
        }
        if(item.key === 0) {
          value = amount * conversions.weiToEthereum
        }
        else value = amount * 10^decimal
        try {
            if(contract) {
              if(crypto !== 0) {
                overrides = {
                    gasLimit: gasParam[eRC20allowance].limit,
                    gasPrice: gasParam[eRC20allowance].price * conversions.gigaWeiToWei,
                    nonce: nonce,
                    };
                const delay = await togethers.ERC20AllowanceExpiry()
                TransactionActions.erc20approve(value,type,nonce,instance,delay,overrides)
                nonce = nonce + 1
              }
              overrides = {
                  gasLimit: gasParam[payForFunds].limit,
                  gasPrice: gasParam[payForFunds].price * conversions.gigaWeiToWei,
                  nonce: nonce,
                  };
                  await togethers.payForFunds(target,groupID,value,crypto,overrides);
            }
            else {
            if(crypto !== 0) {
              overrides = {
                  gasLimit: gasParam[gas.eRC20transfer].limit,
                  gasPrice: gasParam[gas.eRC20transfer].price * conversions.gigaWeiToWei,
                  };
                  await item.instance.transfer(address,value,overrides)
            }
            else {
              overrides = {
                  gasLimit: gasParam[gas.defaultTransaction].limit,
                  gasPrice: gasParam[gas.defaultTransaction].price * conversions.gigaWeiToWei,
                  };
                  wallet.isLoading(true);
                  const txn = await TransactionUtils.createTransaction(address, value, gasLimit, gasPrice);
                  await TransactionActions.sendTransaction(wallet.item, txn, overrides);
            }
            }
          }catch (e) {
            GeneralActions.notify(e.message, 'long');
            this.hide()
        } finally {
          this.setState({show: false})
          this.props.navigation.navigate('WalletDetails', { ...this.props, replaceRoute: true, leave: 0 });
          GeneralActions.notify('Success, wait for confirmation in historic', 'short');
        }
    }

    hide() {
      this.setState({show: false})
      this.props.navigation.pop()
    }

    render() {
        const { amount, target, loading } = this.state;
        if(loading === 0)
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
                        <Text style={styles.title}>Amount (ETH)</Text>
                        <Text style={styles.value}>{WalletUtils.formatBalance(amount)}</Text>
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
