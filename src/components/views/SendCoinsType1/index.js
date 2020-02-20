import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Button, Calculator } from '@components/widgets';
import { colors } from '@common/styles';
import { General as GeneralActions, Languages as LanguagesActions  } from '@common/actions';
import { SecureTransaction } from '@components/widgets';
import { inject, observer } from 'mobx-react';

@inject('languages')
@observer
export class SendCoinsType1 extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

    onPressContinue(max) {
      const { languages } = this.props
      const { togethers, gasParam, item, cryptoOne } = this.props.navigation.state.params;
      var { amount } = this.refs.calc;
        if (!amount || amount === 0 ) return;
        if (amount > max) {
        GeneralActions.notify(LanguagesActions.label78(languages.selectedLanguage), 'long');
        }
        else {
          this.props.navigation.navigate('ConfirmSwap', { togethers, gasParam, amount, item, cryptoOne, title: LanguagesActions.title22(languages.selectedLanguage) });
          }
  }

    render() {

      const { item, cryptoOne } = this.props.navigation.state.params;
        var balance1 = cryptoOne.balance / (Math.pow(10,cryptoOne.decimals))
        var balance2 = item.balance / (Math.pow(10,item.decimals))
        var max
        if (balance1 > balance2) {
          max = balance2
        }
        else {
          max = balance1
        }

        return (
            <View style={styles.container}>
            <Text style={styles.title}>Transform {cryptoOne.symbol} into {item.symbol} ( maximum : {max} ) </Text>
                <Calculator ref="calc" symbol="<-->"/>
                <Button children="Continue" onPress={() => this.onPressContinue(max)} />
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
