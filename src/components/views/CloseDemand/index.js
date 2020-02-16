import React from 'react';
import { ScrollView, FlatList, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Identity as IdentityAction } from '@common/actions';
import { Gas as gas } from '@common/constants';
import { SecureTransaction } from '@components/widgets';
import { CryptoCard } from '@components/widgets';
import Header from './Header';
import { inject, observer } from 'mobx-react';

@inject('languages')
@observer
export class CloseDemand extends React.Component {

  static navigationOptions = { title: "My demand" };

  state = { stats: [], show: false, loading: 0, stats2: [] };

  componentDidMount() {
    const { profile } = this.props.navigation.state.params;
    var stat
    var stats
    var stats2
      for ( var i = 0; i < profile.stats.length; i++ ) {
        stat = (!profile.stats[i]) ? 0 : parseInt (profile.stats[i],10)
       if (stat !== 0){
          stats.push({  balance:  stat,
                        name: IdentityAction.getHomeStableName(i),
                        symbol: IdentityAction.getHomeStableSymbol(i),
                        decimals: 18 })
        }
      }
      this.setState({ stats: true, loading: 0 })
  }

  renderModal() {

    const { gasParam, togethers, groupID, quit } = this.props.navigation.state.params;
    const gasType = (quit) ? gas.quitGroup : gas.withdrawFunds;

    if (this.state.show === true) {
    return (  <SecureTransaction
          togethers={togethers}
          values={{groupID}}
          gasParam={gasParam}
          navigation={this.props.navigation}
          type={gasType}/> )
    }
  }

  render() {

    if(this.state.loading === 0)
    {
      return(
        <View style={styles.container}>
            <View style={styles.body}>
              <ActivityIndicator size="large"/>
            </View>
          </View>
    )
    }

    return(

      <ScrollView style={styles.container}>
      <Text style={styles.message}>{this.props.profile.description}</Text>
      <Header/>
      <FlatList
              style={styles.content}
              data={this.state.stats.sort((prev, next) => prev.name.localeCompare(next.name))}
              renderItem={({ item }) => (<CryptoCard crypto={item} />)} />
            <View style={styles.buttonsContainer}>
                <Button
                  children="Close"
                  onPress={() => this.setState({ show: true })}/>
            </View>
            <Header/>
            <FlatList
                    style={styles.content}
                    data={this.state.stats.sort((prev, next) => prev.name.localeCompare(next.name))}
                    renderItem={({ item }) => (<View><Header/><CryptoCard crypto={item} /></View>)} />
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
