import React from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { HeaderIcon } from '@components/widgets';
import { General as GeneralActions, Identity as IdentityAction } from '@common/actions';
import { CryptoCard } from '@components/widgets';
import { inject, observer } from 'mobx-react';
import Header from './Header';

@inject('wallet','languages')
@observer
export class ProfileData extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: "profile",
        headerRight: (
            <HeaderIcon
                name='key'
                size='medium'
                color={colors.white}
                onPress={() => navigation.navigate('AdminProfile',
                {
                  ...navigation.state.params
                })
              } />

        )
    })

    state = { loading: 0, stats: [], stats2: [], stats3: [] };

    async componentDidMount() {
      const { wallet } = this.props
      const { togethers, item } = this.props.navigation.state.params;
      let stats = []
      let stats2 = []
      let stats3 = []
      let balance1 = 0
      let balance2 = 0
      let balance3 = 0
      try {
        const statsIn = await togethers.getStats(wallet.item.address,item.id)
        const statsOut = await togethers.getStats(item.id,wallet.item.address)
        for ( var i = 0; i < item.stats.length; i++ ) {
        balance1 = !item.stats[i] ? 0 : parseInt (item.stats[i],10)
        balance2 = !statsIn[i] ? 0 : parseInt (statsIn[i],10)
        balance3 = !statsOut[i] ? 0 : parseInt (statsOut[i],10)

          stats.push({
                          balance: balance1,
                          name: IdentityAction.getHomeStableName(i),
                          symbol: IdentityAction.getHomeStableSymbol(i),
                          decimals: 18,
                         })
                         stats2.push({
                                         balance: balance2,
                                         name: IdentityAction.getHomeStableName(i),
                                         symbol: IdentityAction.getHomeStableSymbol(i),
                                         decimals: 18,
                                        })
                                        stats3.push({
                                                        balance: balance3,
                                                        name: IdentityAction.getHomeStableName(i),
                                                        symbol: IdentityAction.getHomeStableSymbol(i),
                                                        decimals: 18,
                                                       })
        }
        this.setState({ stats, stats2, stats3, loading: 1 })
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

    renderProfile() {

      const { stats } = this.state
      const { item } = this.props.navigation.state.params;

        return(
          <View>
          <Header type = '0'/>
          <Text style={styles.message}>{item.description}</Text>
          <FlatList
                data={stats.sort((prev, next) => prev.symbol.localeCompare(next.symbol))}
                renderItem={({ item }) => (
                <CryptoCard crypto={item}/>
              )}
          />
          </View>)
      }

    renderData() {

      const { stats2, stats3 } = this.state

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

    if (this.state.loading === 0){

      return(

      <View style={styles.container}>
        <View style={styles.body}>
          <ActivityIndicator size="large"/>
        </View>
      </View>

    )

    }

    if (item.active == true){
      return(
        <ScrollView style={styles.container}>
        {this.renderProfile()}
        <View style={styles.buttonsContainer}>
            <Button
              children="Send"
              onPress={() => this.props.navigation.navigate('CryptoType1',
              { togethers, groupID, profile: item, gasParam })}/>
        </View>
        {this.renderData()}
      </ScrollView>)
    }

    return(
      <View style={styles.container}>
      {this.renderData()}
      </View>)

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
