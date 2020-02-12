import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { HeaderIcon } from '@components/widgets';
import { General as GeneralActions  } from '@common/actions';
import { CryptoCard } from '@components/widgets';
import { inject, observer } from 'mobx-react';

@inject('wallet')
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
      try {
        const statsIn = await togethers.getStats(wallet.item.address,item.id)
        const statsOut = await togethers.getStats(item.id,wallet.item.address)
        const one1 = !item.stats[0] ? 0 : parseInt (item.stats[0],10)
        const two1 = !statsIn[0] ? 0 : parseInt (statsIn[0],10)
        const three1 = !statsOut[0] ? 0 : parseInt (statsOut[0],10)
        const one2 = !item.stats[1] ? 0 : parseInt (item.stats[1],10)
        const two2 = !statsIn[1] ? 0 : parseInt (statsIn[1],10)
        const three2 = !statsOut[1] ? 0 : parseInt (statsOut[1],10)
        const one3 = !item.stats[2] ? 0 : parseInt (item.stats[2],10)
        const two3 = !statsIn[2] ? 0 : parseInt (statsIn[2],10)
        const three3 = !statsOut[2] ? 0 : parseInt (statsOut[2],10)

          stats.push({
                          balance: one1,
                          symbol: "ETH",
                          name: "Ethers",
                          decimals: 18,
                         })
                         stats2.push({
                                         balance: two1,
                                         symbol: "ETH",
                                         name: "Ethers",
                                         decimals: 18,
                                        })
                                        stats3.push({
                                                        balance: three1,
                                                        symbol: "ETH",
                                                        name: "Ethers",
                                                        decimals: 18,
                                                       })

          stats.push({
                          balance: one2,
                          symbol: "TGTE",
                          name: "Togethers-EUR",
                          decimals: 18,
                         })
                         stats2.push({
                                         balance: two2,
                                         symbol: "TGTE",
                                         name: "Togethers-EUR",
                                         decimals: 18,
                                        })
                                        stats3.push({
                                                        balance: three2,
                                                        symbol: "TGTE",
                                                        name: "Togethers-EUR",
                                                        decimals: 18,
                                                       })

                                                       stats.push({
                                                                       balance: one3,
                                                                       symbol: "TGTU",
                                                                       name: "Togethers-USD",
                                                                       decimals: 18,
                                                                      })
                                                                      stats2.push({
                                                                                      balance: two3,
                                                                                      symbol: "TGTU",
                                                                                      name: "Togethers-USD",
                                                                                      decimals: 18,
                                                                                     })
                                                                                     stats3.push({
                                                                                                     balance: three3,
                                                                                                     symbol: "TGTU",
                                                                                                     name: "Togethers-USD",
                                                                                                     decimals: 18,
                                                                                                    })

        this.setState({ stats, stats2, stats3, loading: 1 })
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

    renderProfile() {

      const { stats } = this.state
      const { item } = this.props.navigation.state.params;

        return(
          <View style={styles.container}>
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
          <View style={styles.container}>
          <Text style={styles.message}>From him</Text>
          <FlatList
                data={stats2.sort((prev, next) => prev.symbol.localeCompare(next.symbol))}
                renderItem={({ item }) => (
                <CryptoCard crypto={item}/>
              )}
          />
          <Text style={styles.message}>From you</Text>
          <FlatList
                data={stats3.sort((prev, next) => prev.symbol.localeCompare(next.symbol))}
                renderItem={({ item }) => (
                <CryptoCard crypto={item}/>
              )}
          />
          </View>)
      }

  render() {

    const { togethers, item, gasParam } = this.props.navigation.state.params;

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
        <View style={styles.container}>
        {this.renderProfile()}
        {this.renderData()}
        <View style={styles.buttonsContainer}>
            <Button
              children="Send"
              onPress={() => this.props.navigation.navigate('CryptoType1',
              { togethers, groupID: item.id, profile: item, gasParam })}/>
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
