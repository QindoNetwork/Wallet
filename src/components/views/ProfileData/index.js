import React from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Contracts as contractsAddress } from '@common/constants';
import { HeaderIcon } from '@components/widgets';
import { General as GeneralActions, Identity as IdentityAction, Languages as LanguagesActions } from '@common/actions';
import { CryptoCard } from '@components/widgets';
import { inject, observer } from 'mobx-react';
import Header from './Header';

@inject('wallet','languages')
@observer
export class ProfileData extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('item').name,
        headerRight: (
            <HeaderIcon
                name='key'
                size='large'
                color={colors.white}
                onPress={() => navigation.navigate('AdminProfile',
                {
                  ...navigation.state.params
                })
              } />

        )
    })

    state = { loading: 0, stats: [], stats2: [], stats3: [], stats4: [] };

    async componentDidMount() {
      const { wallet } = this.props
      const { togethers, item, groupID } = this.props.navigation.state.params;
      let stats = []
      let stats2 = []
      let stats3 = []
      let stats4 = []
      let peerToPeerStats
      let profileStats
      try {
        const decimals = parseInt(await togethers.max(),10)
        for ( var i = 0; i < (await togethers.getStableCoinList()).length; i++ ) {
        peerToPeerStats = await togethers.getStats(item.id,i)
        stats2.push({
                        balance: parseInt(peerToPeerStats.In,10),
                        name: IdentityAction.getHomeStableName(i),
                        symbol: IdentityAction.getHomeStableSymbol(i),
                        decimals
                       })
                       stats3.push({
                                       balance: parseInt(peerToPeerStats.Out,10),
                                       name: IdentityAction.getHomeStableName(i),
                                       symbol: IdentityAction.getHomeStableSymbol(i),
                                       decimals
                                      })

        if ( item.active == true ) {
        profileStats = await togethers.getProfileStats(groupID,wallet.item.address,i)
        stats4.push({
                        balance: parseInt(profileStats.In,10),
                        name: IdentityAction.getHomeStableName(i),
                        symbol: IdentityAction.getHomeStableSymbol(i),
                        decimals
                       })
          stats.push({
                          balance: parseInt(profileStats.Out,10),
                          name: IdentityAction.getHomeStableName(i),
                          symbol: IdentityAction.getHomeStableSymbol(i),
                          decimals
                         })
                       }
        }
        this.setState({ stats, stats2, stats3, stats4, loading: 1 })
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

    renderProfile() {

      const { stats, stats4 } = this.state
      const { item } = this.props.navigation.state.params;

      return(
        <View>
        <Text style={styles.message}>{item.description}</Text>
        <Header type = '0'/>
        <FlatList
              data={stats.sort((prev, next) => prev.symbol.localeCompare(next.symbol))}
              renderItem={({ item }) => (
              <CryptoCard crypto={item}/>
            )}
        />
        <Header type = '3'/>
        <FlatList
              data={stats4.sort((prev, next) => prev.symbol.localeCompare(next.symbol))}
              renderItem={({ item }) => (
              <CryptoCard crypto={item}/>
            )}
        />
        </View>)
  }

    renderData() {

      const { stats2, stats3, stats4 } = this.state

        return(
          <View>
          <Header type = '1'/>
          <FlatList
                data={stats2.sort((prev, next) => prev.symbol.localeCompare(next.symbol))}
                renderItem={({ item }) => (
                <CryptoCard crypto={item}/>
              )}
          />
          <Header type = '2'/>
          <FlatList
                data={stats3.sort((prev, next) => prev.symbol.localeCompare(next.symbol))}
                renderItem={({ item }) => (
                <CryptoCard crypto={item}/>
              )}
          />
          </View>)
      }

  render() {

    const { togethers, item, gasParam, groupID } = this.props.navigation.state.params;
    const { languages } = this.props

    if (this.state.loading === 0){

      return(

      <View style={styles.container}>
        <View style={styles.body}>
          <ActivityIndicator size="large" color="darkslategray"/>
        </View>
      </View>

    )

    }

    if (item.active == true){
      return(
        <ScrollView style={styles.container}>
        <View style={styles.buttonsContainer}>
            <Button
              children={LanguagesActions.label154(languages.selectedLanguage)}
              onPress={() => this.props.navigation.navigate('CryptoType1',
              { togethers, groupID, profile: item, gasParam, title: LanguagesActions.title20(languages.selectedLanguage) })}/>
        </View>
        {this.renderProfile()}
        {this.renderData()}
      </ScrollView>)
    }

    return(
      <ScrollView style={styles.container}>
      {this.renderData()}
      </ScrollView>)

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
    middleColumn: {
        flex: 2
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
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
    buttonDisabled: {
        opacity: 0.5,
    },
    input: {
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: colors.black,
        padding: 4,
        paddingLeft: 0,
        marginRight: 2,
        textAlign: 'center',
        color: colors.black
    }
});
