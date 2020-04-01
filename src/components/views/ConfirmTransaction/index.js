import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from '@components/widgets';
import { measures, colors } from '@common/styles';
import { Gas as gas, Conversions as conversions, Contracts as contractsAddress } from '@common/constants';
import { General as GeneralActions, Transactions as TransactionActions, Languages as LanguagesActions, Identity as IdentityAction } from '@common/actions';
import { Image as ImageUtils, Transaction as TransactionUtils } from '@common/utils';
import Modal from 'react-native-modal';
import { inject, observer } from 'mobx-react';
import { sha256 } from 'react-native-sha256';
import { ERC20ABI as erc20ABI } from '@common/ABIs';
import { ethers } from 'ethers';
import { Wallet as WalletUtils } from '@common/utils';

@inject('wallet','languages')
@observer
export class ConfirmTransaction extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

    state = { show: false, user: '', groupID: '', password: '', registered: 0, loading: 0, loading2: 1 };

    async componentDidMount() {

              const { togethers, target, groupID } = this.props.navigation.state.params;
              const { languages } = this.props
      try {
        let name = await togethers.mappAddressToUser(target)
        if(name ==='') {
          name = LanguagesActions.label124(languages.selectedLanguage)
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
      const ethPrice =  Number(((((maxPrice / conversions.weiToEthereum) / 2) * 3))).toFixed(3)
      const { languages } = this.props

        return(
            <View>
              <View style={styles.buttonsContainer}>
                <Button
                  children={LanguagesActions.label28(languages.selectedLanguage)}
                  onPress={() => this.onPressContinue()}
                  />
              </View>
              <View style={styles.buttonsContainer}>
                <Button
                  children={LanguagesActions.label29(languages.selectedLanguage)}
                  onPress={() => this.hide()}
                  />
              </View>
              <Text style={styles.detail}>{LanguagesActions.label30(languages.selectedLanguage)} {ethPrice} ETH</Text>
            </View>)
      }

    renderModal() {
const { languages } = this.props
      if(this.state.loading2 === 0)
      {
        return(
          <View style={styles.containerModal}>
              <View>
                <ActivityIndicator size="large" color="darkslategray"/>
              </View>
            </View>
      )
      }

      if(this.state.registered === 1)
      {
        return(
            <View style={styles.containerModal}>
            <View>
            <Text style={styles.message}>{LanguagesActions.label126(languages.selectedLanguage)}</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                underlineColorAndroid="transparent"
                onChangeText={password => this.setState({ password })} />
                </View>
            {this.renderButtons()}
            </View>)
      }

      return(
          <View style={styles.containerModal}>
          <View>
          <Text style={styles.message}>{LanguagesActions.label125(languages.selectedLanguage)}</Text>
          </View>
            {this.renderButtons()}
          </View>)

    }

    async onPressContinue() {
        this.setState({ loading2: 0 })
        const { wallet, languages } = this.props
        const { item, togethers, gasParam, amount, target, groupID } = this.props.navigation.state.params;
        const { utils } = ethers;
        let overrides
        let value
        let instance
        try {
        if (this.state.registered === 1) {
          const hashPassword = sha256(this.state.password)
          const result = parseInt (await togethers.connectUser(hashPassword),10)
          if (result === 0) {
            this.hide()
            GeneralActions.notify(LanguagesActions.label127(languages.selectedLanguage), 'long');
            return
          }
        }
        if(item.name === IdentityAction.getHomeStableName(0)) {
          value = utils.parseEther(amount)
        }
        else {
        value = (amount * (Math.pow(10,item.decimals))).toString()
        }
        if(groupID !== '0') {
              if(item.name !== IdentityAction.getHomeStableName(0)) {
                overrides = {
                    gasLimit: gasParam[gas.eRC20allowance].limit,
                    gasPrice: gasParam[gas.eRC20allowance].price * conversions.gigaWeiToWei,
                    };
                await TransactionActions.erc20approve(value,item.instance,overrides)
                overrides = {
                    gasLimit: gasParam[gas.payForFunds].limit,
                    gasPrice: gasParam[gas.payForFunds].price * conversions.gigaWeiToWei,
                    value: parseInt (await togethers.fees(),10)
                    };
                    await togethers.payForFunds(target,groupID,value,item.address,overrides);
                    GeneralActions.notify(target + ' ' + groupID + ' ' + value + ' ' + item.address , 'long');
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
            if(item.name !== IdentityAction.getHomeStableName(0)) {
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
            GeneralActions.notify(LanguagesActions.label128(languages.selectedLanguage), 'short');
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
        const { languages } = this.props;
        if(this.state.loading === 0)
        {
          return(
            <View style={styles.container}>
                <View>
                  <ActivityIndicator size="large" color="darkslategray"/>
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
                            <Text style={styles.title}>{LanguagesActions.label129(languages.selectedLanguage)}</Text>
                            <Text style={styles.value}
                                numberOfLines={1}
                                ellipsizeMode="middle"
                                children={target} />
                        </View>
                        <Image style={styles.avatar}
                            source={{ uri: ImageUtils.generateAvatar(target,500) }} />
                    </View>
                    <View style={styles.textColumn}>
                        <Text style={styles.title}>{LanguagesActions.label130(languages.selectedLanguage)}</Text>
                        <Text style={styles.value}>{this.state.user}</Text>
                    </View>
                    <View style={styles.textColumn}>
                        <Text style={styles.title}>{LanguagesActions.label131(languages.selectedLanguage)} ({item.symbol}) </Text>
                        <Text style={styles.value}>{amount}</Text>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                      children={LanguagesActions.label137(languages.selectedLanguage)}
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
                          <Text style={styles.title}>{LanguagesActions.label132(languages.selectedLanguage)}</Text>
                          <Text style={styles.value}
                              numberOfLines={1}
                              ellipsizeMode="middle"
                              children={target} />
                      </View>
                      <Image style={styles.avatar}
                          source={{ uri: ImageUtils.generateAvatar(target,500) }} />
                  </View>
                  <View style={styles.textColumn}>
                      <Text style={styles.title}>{LanguagesActions.label133(languages.selectedLanguage)}</Text>
                      <Text style={styles.value}>{this.state.user}</Text>
                  </View>
                  <View style={styles.textColumn}>
                      <Text style={styles.title}>{LanguagesActions.label134(languages.selectedLanguage)} ({item.symbol}) </Text>
                      <Text style={styles.value}>{amount}</Text>
                  </View>
                  <View style={styles.textColumn}>
                      <Text style={styles.title}>{LanguagesActions.label135(languages.selectedLanguage)}</Text>
                      <Text style={styles.value}>{this.state.groupID}</Text>
                  </View>
              </View>
              <View style={styles.buttonsContainer}>
                  <Button
                    children={LanguagesActions.label136(languages.selectedLanguage)}
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
