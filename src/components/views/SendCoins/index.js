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

    onPressContinue() {
      const { item, gasParam, togethers, groupID, profile } = this.props.navigation.state.params
      var { amount } = this.refs.calc;
      let isOK = true
        if (!amount || amount === 0) return;
        if (item.name === 'Ethers') {
          if (amount * conversions.weiToEthereum > item.balance) {
          isOK === false
          }
        }else {
          if (amount * (Math.pow(10,item.decimals)) > item.balance) {
          isOK === false
          }
        }
        if (isOK === false) {
        GeneralActions.notify("You don t have enough balance", 'long');
        }else {
          if (groupID !== '0') {
              this.props.navigation.navigate('ConfirmTransaction', { item, groupID, amount, togethers, gasParam, target: profile.id });
          }
          else this.props.navigation.navigate('SelectDestination', { item, groupID, amount, togethers, gasParam });
        }
  }

    render() {
      const { item } = this.props.navigation.state.params

        return (
            <View style={styles.container}>
                <Calculator ref="calc" symbol={item.symbol} />
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
