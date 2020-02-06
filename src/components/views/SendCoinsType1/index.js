import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Button, Calculator } from '@components/widgets';
import { colors } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Conversions as conversions } from '@common/constants';
import { ERC20ABI as erc20ABI } from '@common/ABIs';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';
import { ethers } from 'ethers';
import { SecureTransaction } from '@components/widgets';

export class SendCoinsType1 extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
      title: 'Amount'
  });

  state = { loading: 0, max: 0 };

  async componentDidMount() {
    try {
    const { item, cryptoOne } = this.props.navigation.state.params;
      var balance1 = cryptoOne.balance * (Math.pow(10,-(cryptoOne.decimals)))
      var balance2 = item.instance.balanceOf(contractsAddress.togethersAddress) * (Math.pow(10,-(item.decimals)))
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
      var { amount } = this.refs.calc;
        if (!amount || amount === 0 ) return;
        if (amount > this.state.max) {
        GeneralActions.notify("You or contract don t have enough balance", 'long');
        }
        else {
          this.props.navigation.navigate('ConfirmSwap', { togethers, gasParam, amount, item, cryptoOne });
          }
  }

    render() {

      const { item, cryptoOne } = this.props.navigation.state.params

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
            <Text style={styles.title}>Transform {cryptoOne.symbol} into {item.symbol} ( maximum : {this.state.max} ) </Text>
                <Calculator ref="calc" symbol={item.symbol}/>
                <Button children="Continue" onPress={() => this.onPressContinue()} />
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
