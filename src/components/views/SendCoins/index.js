import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Calculator } from '@components/widgets';
import { colors } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';

export class SendCoins extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
      title: 'Amount'
  });

  state = { loading: 0, balance: 0 };

  async componentDidMount() {
    const { item, address } = this.props.navigation.state.params;
    try {
      if (item.key !== 0){
        this.setState({ balance:  parseInt ( await item.instance.balanceOf(address),10) })
      }
      else this.setState({ balance:  Number(WalletUtils.formatBalance(this.props.wallet.item.balance))})

      this.setState({ loading: 1 })
    } catch (e) {
    GeneralActions.notify(e.message, 'long');
    }
  }

    onPressContinue() {
      const { item, erc20s, gasParam, address } = this.props.navigation.state.params
      const { amount } = this.refs.calc;

        if (!amount) return;
        if (amount < balance) {
        GeneralActions.notify("You don t have enough balance", 'long');
        }
        this.props.navigation.navigate('SelectDestination', { amount, item, togethers, erc20s, gasParam, address });
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
