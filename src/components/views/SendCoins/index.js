import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Calculator } from '@components/widgets';
import { colors } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';

export class SendCoins extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
      title: 'Amount'
  });

    onPressContinue() {
      const { navigation } = this.props
      const gasParam = navigation.getParam('gasParam')
      const balance = navigation.getParam('balance')
      const address = navigation.getParam('address')
      const erc20s = navigation.getParam('erc20s')
      const togethers = navigation.getParam('togethers')
      const crypto = navigation.getParam('crypto')
      const type = navigation.getParam('type')
        const { amount } = this.refs.calc;
        if (!amount) return;
        if (amount < balance) {
        GeneralActions.notify("You don t have enough balance", 'long');
        }
        this.props.navigation.navigate('SelectDestination', { crypto, amount, gasParam, address, erc20s, togethers, type });
    }

    render() {
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
