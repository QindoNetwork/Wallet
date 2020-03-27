import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from '@components/widgets';
import { measures, colors } from '@common/styles';
import { Gas as gas, Conversions as conversions } from '@common/constants';
import { General as GeneralActions, Transactions as TransactionActions, Languages as LanguagesActions } from '@common/actions';
import { Image as ImageUtils, Transaction as TransactionUtils } from '@common/utils';
import Modal from 'react-native-modal';
import { inject, observer } from 'mobx-react';
import { sha256 } from 'react-native-sha256';
import { ERC20ABI as erc20ABI } from '@common/ABIs';
import { Contracts as contractsAddress } from '@common/constants';
import { ethers } from 'ethers';
import { Wallet as WalletUtils } from '@common/utils';

@inject('wallet','languages')
@observer
export class ConfirmSwap extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

    state = { show: false, password: '', registered: 0, loading: 0, loading2: 1, price: 0 };

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

      const { amount, cryptoOne, item, gasParam } = this.props.navigation.state.params;
      const maxPrice = gasParam[gas.changeToken].limit * gasParam[gas.changeToken].price * conversions.gigaWeiToWei
      const ethPrice = ((((maxPrice / conversions.weiToEthereum) / 2))).toFixed(3)
      const { languages } = this.props

        return(
            <View>
              <View style={styles.buttonsContainer}>
                <Button
                  children={LanguagesActions.label25(languages.selectedLanguage)}
                  onPress={() => this.onPressContinue()}
                  />
              </View>
              <View style={styles.buttonsContainer}>
                <Button
                  children={LanguagesActions.label26(languages.selectedLanguage)}
                  onPress={() => this.hide()}
                  />
              </View>
              <Text style={styles.detail}>{LanguagesActions.label27(languages.selectedLanguage)} {ethPrice} ETH</Text>
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
          <View style={styles.body}>
          <Text style={styles.message}>{LanguagesActions.label125(languages.selectedLanguage)}</Text>
          </View>
            {this.renderButtons()}
          </View>)
    }

    async onPressContinue() {
        this.setState({ loading2: 0 })
        const { wallet, languages } = this.props
        const { instance, togethers, gasParam, amount, cryptoOne, item } = this.props.navigation.state.params;
        let overrides
        let result = 0
        let value
        let nonce
        try {
        value = (amount * (Math.pow(10,cryptoOne.decimals))).toString()
        if (this.state.registered === 1) {
          const hashPassword = sha256(this.state.password)
          result = parseInt (await togethers.connectUser(hashPassword),10)
          if (result === 0) {
            this.hide()
            GeneralActions.notify(LanguagesActions.label140(languages.selectedLanguage), 'long');
            return
          }
        }
        overrides = {
                  gasLimit: gasParam[gas.eRC20allowance].limit,
                  gasPrice: gasParam[gas.eRC20allowance].price * conversions.gigaWeiToWei,
                  };
        await TransactionActions.erc20approve(value,cryptoOne.instance,overrides)
        overrides = {
                  gasLimit: gasParam[gas.changeToken].limit,
                  gasPrice: gasParam[gas.changeToken].price * conversions.gigaWeiToWei,
                  value: parseInt (await togethers.fees(),10),
                  };
        value = (amount * (Math.pow(10,parseInt((await togethers.max()),10)))).toString()
        await togethers.changeToken(value,cryptoOne.address,item.address, overrides)
            this.props.navigation.navigate('WalletDetails', { togethers, gasParam, replaceRoute: true, leave: 0 });
            GeneralActions.notify(LanguagesActions.label141(languages.selectedLanguage), 'short');
          }catch (e) {
            this.hide()
            GeneralActions.notify(e.message, 'long');
        }
    }

    hide() {
      this.props.navigation.pop()
    }

    render() {
        const { amount, cryptoOne, item } = this.props.navigation.state.params;
        const { languages } = this.props

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
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.row}>
                        <View style={styles.textColumn}>
                            <Text style={styles.title}>{LanguagesActions.label142(languages.selectedLanguage)}</Text>
                            <Text style={styles.value}
                                numberOfLines={1}
                                ellipsizeMode="middle"
                                children={this.props.wallet.item.address} />
                        </View>
                        <Image style={styles.avatar}
                            source={{ uri: ImageUtils.generateAvatar(this.props.wallet.item.address,500) }} />
                    </View>
                    <View style={styles.textColumn}>
                        <Text style={styles.title}>{LanguagesActions.label143(languages.selectedLanguage)} ({cryptoOne.symbol} -> {item.symbol}) </Text>
                        <Text style={styles.value}>{amount}</Text>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                      children={LanguagesActions.label145(languages.selectedLanguage)}
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
    avatar: {
        width: 100,
        height: 100
    }
});
