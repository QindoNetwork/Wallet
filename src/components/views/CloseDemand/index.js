import React from 'react';
import { ScrollView, FlatList, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Gas as gas } from '@common/constants';
import { SecureTransaction } from '@components/widgets';
import { CryptoCard } from '@components/widgets';
import Header from './Header';
import { inject, observer } from 'mobx-react';

@inject('languages')
@observer
export class CloseDemand extends React.Component {

  static navigationOptions = { title: "My demand" };

  state = { show: false };

  renderModal() {

    const { gasParam, togethers, groupID } = this.props.navigation.state.params;

    if (this.state.show === true) {
    return (  <SecureTransaction
          togethers={togethers}
          values={{groupID}}
          gasParam={gasParam}
          navigation={this.props.navigation}
          type={gas.withdrawFunds}/> )
    }
  }

  render() {

    const { profile } = this.props.navigation.state.params;
    var stat
    var stats
    var ok = 0
      for ( var i = 0; i < profile.stats.length; i++ ) {
        stat = !profile.stats[i] ? 0 : parseInt (profile.stats[i],10)
       if (stat !== 0){
         ok = 1
          if (i === 0){
          stats.push({  balance:  stat,
                        name: 'Ethers',
                        symbol: 'ETH',
                        decimals: 18 })
          }
          if (i === 1){
          stats.push({  balance:  stat,
                        name: 'Togethers-EUR',
                        symbol: 'TGTE',
                        decimals: 18 })
          }
          if (i === 2){
          stats.push({  balance:  stat,
                        name: 'Togethers-USD',
                        symbol: 'TGTU',
                        decimals: 18 })
          }
        }
      }

      if (ok === 0){
        return(

          <View style={styles.container}>
          <Text style={styles.message}>{description}</Text>
          <Text style={styles.message}>there is nothing to withdraw</Text>
          {this.renderModal()}
        </View>
        )
      }

    return(

      <ScrollView style={styles.container}>
      <Text style={styles.message}>{description}</Text>
      <Header/>
      <FlatList
              style={styles.content}
              data={stats.sort((prev, next) => prev.name.localeCompare(next.name))}
              renderItem={({ item }) => (<CryptoCard crypto={item} />)} />
            <View style={styles.buttonsContainer}>
                <Button
                  children="Close"
                  onPress={() => this.setState({ show: true })}/>
            </View>
      {this.renderModal()}
    </ScrollView>
  )

}
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: colors.defaultBackground,
        padding: measures.defaultPadding
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    message: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'center',
        marginVertical: measures.defaultMargin,
        marginHorizontal: 32
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        height: 52
    },
    content: {
        marginTop: measures.defaultMargin
    },
});
