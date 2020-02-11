import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { HeaderIcon } from '@components/widgets';
import { General as GeneralActions  } from '@common/actions';
import { CryptoCard } from '@components/widgets';
import ProfileCard from './ProfileCard';
import { inject, observer } from 'mobx-react';

@inject('wallet')
@observer
export class ProfileData extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: "profile",
        headerRight: (
            <HeaderIcon
                name='cash'
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
      const { togethers, user } = this.props.navigation.state.params;
      let stats = []
      let stats2 = []
      let stats3 = []
      let one
      let two
      let three
      var info
      try {
        const statsIn = await togethers.getStats(wallet.item.address,user.id)
        const statsOut = await togethers.getStats(user.id,wallet.item.address)
        const crypto = await togethers.getHomeStableList()
        for ( var i = 0; i <= getHomeStableList().length; i++ ) {
          one = !user.stats[i] ? 0 : user.stats[i]
          two = !statsIn[i] ? 0 : statsIn[i]
          three = !statsOut[i] ? 0 : statsOut[i]
          if ( i === 0 ) {
          stats.push({
                          balance: one,
                          symbol: "ETH",
                          name: "Ethers",
                          decimals: 0,
                         })
                         stats2.push({
                                         balance: two,
                                         symbol: "ETH",
                                         name: "Ethers",
                                         decimals: 0,
                                        })
                                        stats3.push({
                                                        balance: three,
                                                        symbol: "ETH",
                                                        name: "Ethers",
                                                        decimals: 0,
                                                       })
          }
          else {
          info = await togethers.getCryptoInfo(crypto[i])
          stats.push({
                          balance: one,
                          symbol: info.symbol,
                          name: info.name,
                          decimals: info.decimals,
                         })
                         stats2.push({
                                         balance: two,
                                         symbol: info.symbol,
                                         name: info.name,
                                         decimals: info.decimals,
                                        })
                                        stats3.push({
                                                        balance: three,
                                                        symbol: info.symbol,
                                                        name: info.name,
                                                        decimals: info.decimals,
                                                       })

        }
        }
        this.setState({ stats, stats2, stats3, loading: 1 })
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

    renderData() {

      const { stats, stats2, stats3 } = this.state

        return(
          <View style={styles.container}>
          <ProfileCard profile={profile}/>
          <FlatList
                data={stats.sort((prev, next) => prev.symbol.localeCompare(next.symbol))}
                renderItem={({ item }) => (
                <CryptoCard crypto={item}/>
              )}
          />
          <FlatList
                data={stats2.sort((prev, next) => prev.symbol.localeCompare(next.symbol))}
                renderItem={({ item }) => (
                <CryptoCard crypto={item}/>
              )}
          />
          <FlatList
                data={stats3.sort((prev, next) => prev.symbol.localeCompare(next.symbol))}
                renderItem={({ item }) => (
                <CryptoCard crypto={item}/>
              )}
          />
          </View>)
      }

  render() {

    const { togethers, user, gasParam } = this.props.navigation.state.params;

    if (this.state.loading === 0){

      return(

      <View style={styles.container}>
        <View style={styles.body}>
          <ActivityIndicator size="large"/>
        </View>
      </View>

    )

    }

    if (user.active == true){
      return(
        <View style={styles.container}>
        {this.renderData()}
        <View style={styles.buttonsContainer}>
            <Button
              children="Send"
              onPress={() => this.props.navigation.navigate('CryptoType1',
              { togethers, groupID: user.id, profile: user, gasParam })}/>
        </View>
      </View>)
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
