import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from '@components/widgets';
import { measures, colors } from '@common/styles';
import { Gas as gas, Conversions as conversions, Contracts as contractsAddress } from '@common/constants';
import { General as GeneralActions, Transactions as TransactionActions, Languages as LanguagesActions } from '@common/actions';
import { Image as ImageUtils, Transaction as TransactionUtils } from '@common/utils';
import Modal from 'react-native-modal';
import { inject, observer } from 'mobx-react';
import { sha256 } from 'react-native-sha256';
import { ERC20ABI as erc20ABI } from '@common/ABIs';
import { ethers } from 'ethers';

@inject('wallet','languages')
@observer
export class ConfirmTransaction extends React.Component {

    static navigationOptions = { title: 'Confirm transaction' };

    state = { show: false, user: '', groupID: '', password: '', registered: 0, loading: 0, loading2: 1 };

    async componentDidMount() {

              const { togethers, target, groupID } = this.props.navigation.state.params;

      try {
        let name = await togethers.mappAddressToUser(target)
        if(name ==='') {
          name = 'unknown'
        }
        this.setState({
                        registered: parseInt (await togethers.verifyRegistration(),10),
                        user: name,
                        groupID: await togethers.mappGroupIDToGroupName(groupID),
                        loading: 1
                      })
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
    }

    renderButtons() {

      const { gasParam } = this.props.navigation.state.params;
      const maxPrice =  gasParam[gas.eRC20transfer].limit * gasParam[gas.eRC20transfer].price * conversions.gigaWeiToWei
      const ethPrice = ((maxPrice / conversions.weiToEthereum) / 2) * 3

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
              <Text style={styles.detail}>Approximatly {ethPrice} ETH</Text>
            </View>)
      }

    renderModal() {

      if(this.state.loading2 === 0)
      {
        return(
          <View style={styles.containerModal}>
              <View style={styles.body}>
                <ActivityIndicator size="large" color="darkslategray"/>
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
          <Text style={styles.message}>Enter Password</Text>
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
        const { utils } = ethers;
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
          value = utils.parseEther(amount)
        }
        else {
        value = (amount * (Math.pow(10,item.decimals))).toString()
        }
        if(groupID !== '0') {
          nonce = await TransactionActions.nextNonce(wallet)
              if(item.name !== 'Ethers') {
                overrides = {
                    gasLimit: gasParam[gas.eRC20allowance].limit,
                    gasPrice: gasParam[gas.eRC20allowance].price * conversions.gigaWeiToWei,
                    nonce: nonce,
                    };
                await TransactionActions.erc20approve(value,item.instance,overrides)
                nonce = nonce + 1
                overrides = {
                    gasLimit: gasParam[gas.payForFunds].limit,
                    gasPrice: gasParam[gas.payForFunds].price * conversions.gigaWeiToWei,
                    nonce: nonce,
                    };
                    await togethers.payForFunds(target,groupID,value,item.address,overrides);
              }
              else {
                overrides = {
                    gasLimit: gasParam[gas.payForFunds].limit,
                    gasPrice: gasParam[gas.payForFunds].price * conversions.gigaWeiToWei,
                    value,
                    };
                    await togethers.payForFunds(target,groupID,0,item.address,overrides);
              }
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
        const { amount, target, loading, item, groupID } = this.props.navigation.state.params;
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

        if(groupID === '0') {
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
                        <Text style={styles.title}>Name</Text>
                        <Text style={styles.value}>{this.state.user}</Text>
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
                      <Text style={styles.title}>Name</Text>
                      <Text style={styles.value}>{this.state.user}</Text>
                  </View>
                  <View style={styles.textColumn}>
                      <Text style={styles.title}>Amount ({item.symbol}) </Text>
                      <Text style={styles.value}>{amount}</Text>
                  </View>
                  <View style={styles.textColumn}>
                      <Text style={styles.title}>Group</Text>
                      <Text style={styles.value}>{this.state.groupID}</Text>
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
          </View>)
    }
}

const styles = StyleSheet.create({
  containerModal: {
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
  container: {
      flex: 1,
      padding: measures.defaultPadding,
      alignItems: 'stretch',
      justifyContent: 'space-between',
      backgroundColor: colors.defaultBackground,
    },
    input: {
        width: '100%',
        padding: 10,
        paddingLeft: 0,
        marginRight: 0,
        textAlign: 'center',
        color: colors.black
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
