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
import { Contracts as contractsAddress } from '@common/constants';

@inject('languages','wallet')
@observer
export class CloseDemand extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

  state = { stats: [], show: false, loading: 0, profileStats: [] };

  async componentDidMount() {
    const { profile, profiles, togethers } = this.props.navigation.state.params;
    const { wallet } = this.props
    var stats = []
    var stats2 = []
    var profileStats = []
    var idStats
    var myStats
    try {
      for ( var i = 0; i < contractsAddress.homeStablecoinsNumber; i++ ) {
        myStats =  await togethers.mappProfileStats(profile.id,wallet.item.address,i)
          stats.push({  balance:  myStats,
                        name: IdentityAction.getHomeStableName(i),
                        symbol: IdentityAction.getHomeStableSymbol(i),
                        decimals: contractsAddress.homeStablecoinDecimals,
                         })
      }
      for ( var k = 0; k < profiles.length; k++ ) {
      if ( profiles[k].id !== wallet.item.address && new Boolean(profiles[k].isMember) == true) {
      for ( var j = 0; j < contractsAddress.homeStablecoinsNumber; j++ ) {
        idStats =  await togethers.mappIdStats(profile.id,profile.demandID,profiles[k].id,j)
          stats2.push({  balance:  idStats,
                        name: IdentityAction.getHomeStableName(i),
                        symbol: IdentityAction.getHomeStableSymbol(i),
                        decimals: contractsAddress.homeStablecoinDecimals,
                         })
      }
      profileStats.push({ id:  profiles[k].id,
                      name: profiles[k].name,
                      stats: stats2 })
      }
      }
      this.setState({ stats, profileStats, loading: 1 })
    }catch (e) {
      GeneralActions.notify(e.message, 'long');
  }
  }

  renderModal() {

    const { gasParam, togethers, groupID, quit } = this.props.navigation.state.params;
    const gasType = (quit) ? gas.quitGroup : gas.withdrawFunds;
    const { languages } = this.props

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
              <ActivityIndicator size="large" color="darkslategray"/>
            </View>
          </View>
    )
    }

    return(

      <ScrollView style={styles.container}>
      <View style={styles.buttonsContainer}>
          <Button
            children={ LanguagesActions.label23(languages.selectedLanguage) }
            onPress={() => this.setState({ show: true })}/>
      </View>
      <Text style={styles.message}>{this.props.navigation.state.params.profile.description}</Text>
      <Header/>
      <FlatList
              style={styles.content}
              data={this.state.stats.sort((prev, next) => prev.name.localeCompare(next.name))}
              renderItem={({ item }) => (<CryptoCard crypto={item} />)} />
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
