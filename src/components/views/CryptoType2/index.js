import React from 'react';
import { TouchableOpacity, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Contracts as contractsAddress } from '@common/constants';
import CryptoCard from './CryptoCard';

export class CryptoType2 extends React.Component {

  state = { loading: 0, erc20s2: [] };

  async componentDidMount() {
    const { togethers, cryptoOne, erc20s} = this.props.navigation.state.params
    try {
    var currentAddress
    var info
    var erc20s2 = []
      for ( var i = 0; i < erc20s.length; i++ ) {
        currentAddress = erc20s[i].address
        info = await togethers.getCryptoInfo(currentAddress)
        if ( ((cryptoOne.statusE == true && new Boolean(info.statusE) == true) ||
            (cryptoOne.statusU == true && new Boolean(info.statusU) == true) ||
          (cryptoOne.statusO == true && new Boolean(info.statusO) == true)) &&
            currentAddress !== cryptoOne.address ) {
              balance = parseInt (await erc20s[i].instance.balanceOf(contractsAddress.togethersAddress),10)
              erc20s2.push({
                      name: info.name,
                      symbol: info.symbol,
                      decimals: parseInt (info.decimals,10),
                      address: currentAddress,
                      balance
                     })
        }
      }
      this.setState({ erc20s2, loading: 1 })
    } catch (e) {
    GeneralActions.notify(e.message, 'long');
    }
  }

    render() {

      const { togethers, gasParam, cryptoOne } = this.props.navigation.state.params
      const { wallet } = this.props
      const { erc20s2 } = this.state

      if (this.state.loading === 0){

        return(

        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
        </View>

      )

      }

      return(

        <View style={styles.container}>
            <FlatList
              data={erc20s2.sort((prev, next) => prev.symbol.localeCompare(next.symbol))}
              renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.content}
                activeOpacity={0.8}
                onPress={() => this.props.navigation.navigate('SendCoinsType1', { cryptoOne, item, togethers, gasParam })}>
                  <CryptoCard crypto={item}/>
              </TouchableOpacity>
            )}
        />
      </View>

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
    leftColumn: {
        width: 40,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    middleColumn: {
        flex: 2
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    content: {
        marginTop: measures.defaultMargin
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
