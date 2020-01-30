import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Button, Calculator } from '@components/widgets';
import { colors } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Wallet as WalletUtils } from '@common/utils';
import { Conversions as conversions } from '@common/constants';
import { ERC20ABI as erc20ABI } from '@common/ABIs';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';
import { ethers } from 'ethers';
import { inject, observer } from 'mobx-react';

@inject('wallet')
@observer

export class SendCoinsType1 extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
      title: 'Amount'
  });

  state = { loading: 0, max: 0, show: false  };

  renderModal(value) {

    const { gasParam, togethers, address, item  } = this.props.navigation.state.params;
    const crypto = item.address;
    const amount = value * (Math.pow(10,18))

    if (this.state.show === true) {
    return (  <SecureTransaction
          togethers={togethers}
          values={{amount,crypto}}
          address={address}
          gasParam={gasParam}
          navigation={this.props.navigation}
          type={gas.changeToken}/> )
    }
  }

  async componentDidMount() {
    try {
    const { item, address, type } = this.props.navigation.state.params;
    const { wallet } = this.props;
    const mnemonics = wallet.item.mnemonics.toString()
    const connection = ethers.Wallet.fromMnemonic(mnemonics).connect(EthereumNetworks.fallbackProvider);
    var token
      if (type === "TTE") {
        token = contractsAddress.TTEURAddress
      }
      else {
        token = contractsAddress.TTUSDAddress
      }
      const instance = new ethers.Contract(token, erc20ABI, connection)
      var balance1 = item.balance * (Math.pow(10,-(item.decimals)))
      var balance2 = parseInt (await instance.balanceOf(wallet.item.address),10) * (Math.pow(10,-18))
      if (balance1 > balance2) {
        this.setState({ max : balance2, loading: 1  })
      }
      else {
        this.setState({ max: balance1, loading: 1 })
      }
    } catch (e) {
    GeneralActions.notify(e.message, 'long');
    }
  }

    onPressContinue() {
      const { item, gasParam, togethers, address } = this.props.navigation.state.params
      const { instance } = this.state
      var token
      if (type === "TTE") {
        token = contractsAddress.TTEURAddress
      }
      else token = contractsAddress.TTUSDAddress
      var { amount } = this.refs.calc;
      let isOK = true
        if (!amount) return;
        if (amount > this.state.max) {
        GeneralActions.notify("You or contract don t have enough balance", 'long');
        }
        else this.setState({ show : true })
  }

    render() {

      const { item } = this.props.navigation.state.params

      if (this.state.loading === 0){

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
            <Text style={styles.title}>Transform {type} into {item.symbol} ( maximum : {this.state.max} ) </Text>
                <Calculator ref="calc" symbol={item.symbol}/>
                <Button children="Continue" onPress={() => this.onPressContinue()} />
                {this.renderModal(this.refs.calc)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground,
        flex: 1,
        alignItems: 'stretch'
    }
});
