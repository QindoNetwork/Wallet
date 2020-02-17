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

@inject('languages','wallet')
@observer
export class CloseDemand extends React.Component {

  static navigationOptions = { title: "My demand" };

  state = { stats: [], show: false, loading: 0, profileStats: [] };

  async componentDidMount() {
    const { profile } = this.props.navigation.state.params;
    const { wallet } = this.props
    var stat
    var stats
    var stats2
    var profileStats
    var idStats
    const myStats =  await togethers.getProfileStats(profile.id,wallet.item.address)
      for ( var i = 0; i < myStats.length; i++ ) {
        stat = (!myStats[i]) ? 0 : parseInt (myStats[i],10)
       if (stat !== 0){
          stats.push({  balance:  stat,
                        name: IdentityAction.getHomeStableName(i),
                        symbol: IdentityAction.getHomeStableSymbol(i),
                        decimals: 18 })
        }
      }
      for ( var k = 0; k < profiles.length; k++ ) {
      idStats =  await togethers.getIdStats(profile.id,profile.demandID,profiles[k].id)
      if ( profiles[k].id !== wallet.item.address && new Boolean(profiles[k].isMember) == true) {
      for ( var j = 0; j < idStats.length; j++ ) {
        stat = (!idStats[j]) ? 0 : parseInt (idStats[j],10)
       if (stat !== 0){
          stats2.push({  balance:  stat,
                        name: IdentityAction.getHomeStableName(i),
                        symbol: IdentityAction.getHomeStableSymbol(i),
                        decimals: 18 })
        }
      }
      profileStats.push({ id:  profiles[k].id,
                      name: profiles[k].name,
                      stats: stats2 })
      }
      }
      this.setState({ stats, profileStats, loading: 0 })
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
                    data={this.state.profileStats.sort((prev, next) => prev.name.localeCompare(next.name))}
                    renderItem={({ item }) => (<FlatList
                    style={styles.content}
                    data={item.stats.sort((prev, next) => prev.name.localeCompare(next.name))}
                    renderItem={({ item }) => (<View><Header/><CryptoCard crypto={item} /></View>)} />)} />
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
