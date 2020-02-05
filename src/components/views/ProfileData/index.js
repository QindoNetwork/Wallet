import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { HeaderIcon } from '@components/widgets';
import { General as GeneralActions  } from '@common/actions';
import CryptoCard from '../Crypto/CryptoCard';
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

    state = { loading: 0, statsETH: 0, statsEUR: 0, statsUSD: 0, };

    async componentDidMount() {
      const { wallet } = this.props
      const { togethers, item } = this.props.navigation.state.params;
      try {
        const statsIn = await togethers.mappPeerToPeerStats(wallet.item.address,item.id)
        const statsOut = await togethers.mappPeerToPeerStats(item.id,wallet.item.address)
        const statsETH = statsOut.ETHIn - statsIn.ETHIn
        const statsEUR = statsOut.EURin - statsIn.EURin
        const statsUSD = statsOut.USDin - statsIn.USDin
        this.setState({ statsETH, statsEUR, statsUSD, loading: 1 })
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

    renderData() {

      const profile = this.props.navigation.state.params.item

      var erc20s = []
      var erc20s2 = []
      erc20s.push({ name: "Ethers",
                    symbol: "ETH",
                    balance: profile.ETHin })
      erc20s.push({ name: "Togethers-USD",
                    symbol: "TGTU",
                    balance: profile.USDin,
                    decimals: 18})
      erc20s.push({ name: "Togethers-EUR",
                    symbol: "TGTE",
                    balance: profile.EURin,
                    decimals: 18})


      erc20s2.push({ name: "Ethers",
                     symbol: "ETH",
                     balance: this.state.statsETH })
      erc20s2.push({ name: "Togethers-USD",
                      symbol: "TGTU",
                      balance: this.state.statsUSD,
                      decimals: 18})
      erc20s2.push({ name: "Togethers-EUR",
                      symbol: "TGTE",
                      balance: this.state.statsEUR,
                      decimals: 18})

        return(
          <View style={styles.container}>
          <View style={styles.leftColumn}>
              <ProfileCard profile={profile}/>
              <FlatList
                data={erc20s.sort((prev, next) => prev.symbol.localeCompare(next.symbol))}
                renderItem={({ item }) => (
                <CryptoCard crypto={item}/>
              )}
          />
          <FlatList
            data={erc20s2.sort((prev, next) => prev.symbol.localeCompare(next.symbol))}
            renderItem={({ item }) => (
            <CryptoCard crypto={item}/>
          )}
      />
          </View>
          </View>)
      }

  render() {

    const { item, togethers, user, gasParam } = this.props.navigation.state.params;

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
        {this.renderData()}
        <View style={styles.buttonsContainer}>
            <Button
              children="Send"
              onPress={() => this.props.navigation.navigate('CryptoType1',
              { togethers, groupID: user.id, profile: item, gasParam })}/>
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
