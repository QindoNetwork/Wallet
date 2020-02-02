import React from 'react';
import { TouchableOpacity, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import CryptoCard from '../Crypto/CryptoCard';
import { Network as EthereumNetworks } from '@common/constants';
import { inject, observer } from 'mobx-react';
import { ethers } from 'ethers';
import { Contracts as contractsAddress } from '@common/constants';
import { ERC20ABI as erc20ABI } from '@common/ABIs';

@inject('wallet')
@observer
export class CryptoType2 extends React.Component {

  state = { loading: 0, erc20s: [] };

  async componentDidMount() {
    const { wallet } = this.props
    const { togethers, type } = this.props.navigation.state.params
    try {
    const mnemonics = wallet.item.mnemonics.toString()
    const connection = ethers.Wallet.fromMnemonic(mnemonics).connect(EthereumNetworks.fallbackProvider);
    var erc20s = []
    var currentAddress
    var info
    const req = await togethers.getStablecoinList()
      for ( var i = 0; i < req.length; i++ ) {
        currentAddress = req[i]
        info = await togethers.getCryptoInfo(currentAddress)
        if ( (type === 'TTE' && new Boolean(info.statusE) == true) ||
            (type === 'TTU' && new Boolean(info.statusU) == true)) {
              instance = new ethers.Contract(currentAddress, erc20ABI, connection)
              balance = parseInt (await instance.balanceOf(contractsAddress.togethersAddress),10)
              erc20s.push({
                      name: info.name,
                      symbol: info.symbol,
                      decimals: parseInt (info.decimals,10),
                      balance: balance,
                      address: currentAddress
                     })
        }
      }
      this.setState({ erc20s, loading: 1 })
    } catch (e) {
    GeneralActions.notify(e.message, 'long');
    }
  }

    render() {

      const { togethers, gasParam, type, groupID } = this.props.navigation.state.params
      const { erc20s } = this.state

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
              data={erc20s.sort((prev, next) => prev.symbol.localeCompare(next.symbol))}
              renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.content}
                activeOpacity={0.8}
                onPress={() => this.props.navigation.navigate('SendCoinsType1', { type, item, togethers, gasParam })}>
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
