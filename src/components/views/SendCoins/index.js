import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Calculator } from '@components/widgets';
import { colors } from '@common/styles';
import { General as GeneralActions, Languages as LanguagesActions, Identity as IdentityAction } from '@common/actions';
import { Conversions as conversions } from '@common/constants';
import { inject, observer } from 'mobx-react';

@inject('wallet','languages')
@observer
export class SendCoins extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

    onPressContinue() {
      const { item, gasParam, togethers, groupID, profile } = this.props.navigation.state.params
      var { amount } = this.refs.calc;
      const { languages } = this.props
      let isOK = true
        if (!amount || amount === 0) return;
        if (item.name === IdentityAction.getHomeStableName(0)) {
          if (amount * conversions.weiToEthereum > item.balance) {
          isOK = false
          }
        }else {
          if (amount * (Math.pow(10,item.decimals)) > item.balance) {
          isOK = false
          }
        }
        if (isOK === false) {
        GeneralActions.notify(LanguagesActions.label76(languages.selectedLanguage), 'long');
        }else {
          if (groupID !== '0') {
              this.props.navigation.navigate('ConfirmTransaction', { item, groupID, amount, togethers, gasParam, target: profile.id, title: LanguagesActions.title3(languages.selectedLanguage) });
          }
          else this.props.navigation.navigate('SelectDestination', { item, groupID, amount, togethers, gasParam, title: LanguagesActions.title4(languages.selectedLanguage) });
        }
  }

    render() {
      const { item } = this.props.navigation.state.params
      const { languages } = this.props

        return (
            <View style={styles.container}>
                <Calculator ref="calc" symbol={item.symbol} />
                <Button children={LanguagesActions.label77(languages.selectedLanguage)} onPress={() => this.onPressContinue()} />
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
