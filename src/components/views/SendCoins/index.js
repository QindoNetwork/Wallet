import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Calculator } from '@components/widgets';
import { colors } from '@common/styles';

export class SendCoins extends React.Component {

    onPressContinue() {
      const { navigation } = this.props
      const gasParam = navigation.getParam('gasParam')
      const address = navigation.getParam('address')
      const erc20s = navigation.getParam('erc20s')
      const control = navigation.getParam('control')
      const togethers = navigation.getParam('togethers')
      const crypto = navigation.getParam('crypto')
      const max = navigation.getParam('max')
        const { amount } = this.refs.calc;
        if (!amount) return;
        this.props.navigation.navigate('SelectDestination', { crypto, amount, gasParam, address, erc20s, control, togethers, max });
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
