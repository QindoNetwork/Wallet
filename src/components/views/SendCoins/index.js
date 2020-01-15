import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Calculator } from '@components/widgets';
import { colors } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Wallet as WalletUtils } from '@common/utils';
import { Conversions as conversions } from '@common/constants';
import { ERC20ABI as erc20ABI } from '@common/ABIs';
import { Contracts as contractsAddress } from '@common/constants';
import { ethers } from 'ethers';

import { inject, observer } from 'mobx-react';

@inject('wallet')
@observer

export class SendCoins extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
      title: 'Amount'
  });

  state = { loading: 0, balance: 0 };

  async componentDidMount() {
    const { item, address, connection } = this.props.navigation.state.params;
    try {
      if (item.key !== 0){
        const instance = new ethers.Contract(item.address, erc20ABI, connection)
        this.setState({ balance:  parseInt ( await instance.balanceOf(address),10) })
      }
      else this.setState({ balance: this.props.wallet.item.balance })

      this.setState({ loading: 1 })
    } catch (e) {
    GeneralActions.notify(e.message, 'long');
    }
  }

    onPressContinue() {
      const { item, erc20s, gasParam, address, togethers, groupID, contract, connection } = this.props.navigation.state.params
      var { amount } = this.refs.calc;
      let isOK = true
        if (!amount) return;
        if (item.type === 0) {
          if (amount > this.state.balance) {
          isOK === false
        }
        }else if (amount * (Math.pow(10,item.decimals)) > this.state.balance) {
          isOK === false
        }
        if (isOK === false) {
        GeneralActions.notify("You don t have enough balance", 'long');
        }
        else {
          this.props.navigation.navigate('SelectDestination', { contract, groupID, contract, amount, item, togethers, erc20s, gasParam, address });
        }
  }

    render() {

      if (this.state.loading === 0){

        return(

            <ActivityIndicator size="large"/>
      )

      }

        return (
            <View style={styles.container}>
                <Calculator ref="calc" />
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
