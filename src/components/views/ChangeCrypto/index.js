import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, ActivityIndicator, RefreshControl} from 'react-native';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Languages as LanguagesActions } from '@common/actions';
import { CryptoCard } from '@components/widgets';
import Header from './Header';
import { ERC20ABI as erc20ABI } from '@common/ABIs';
import { inject, observer } from 'mobx-react';
import { Network as EthereumNetworks } from '@common/constants';
import { ethers } from 'ethers';
import { Gas as gas, Conversions as conversions } from '@common/constants';

@inject('wallet','languages')
@observer
export class ChangeCrypto extends React.Component {

  state = { loading: 0, erc20s: [] };

  componentDidMount() {
    this.updateData()
  }

  pressCard(erc20, cryptoOne, togethers, gasParam) {
    if (cryptoOne.balance > 0){
    this.props.navigation.navigate('CryptoType2', { erc20, cryptoOne, togethers, gasParam, title: LanguagesActions.title2(this.props.languages.selectedLanguage) })
    }
    else {
      return
    }
  }

  async updateData() {
    const { togethers, groupID, gasParam, wallet } = this.props
    try {
    const mnemonics = wallet.item.mnemonics.toString()
    const connection = ethers.Wallet.fromMnemonic(mnemonics).connect(EthereumNetworks.fallbackProvider);
    var erc20s = []
    var currentAddress
    var info
    var instance
    var balance
    var category
      const req = await togethers.getCryptoList()
      for ( var i = 0; i < req.length; i++ ) {
        currentAddress = req[i]
        info = await togethers.getCryptoInfo(currentAddress)
        category = parseInt(info.category,10)
        if(category !== 0 && new Boolean(info.status) == true ){
          instance = new ethers.Contract(currentAddress, erc20ABI, connection)
            erc20s.push({ name: info.name,
                      symbol: info.symbol,
                      decimals: parseInt (info.decimals,10),
                      instance: instance,
                      address: currentAddress,
                      balance: parseInt (info.balance,10),
                      category: category,
                      balanceContract: parseInt (info.balanceContract,10)
                    })
            }
        }
      this.setState({ erc20s, loading: 1 })
    } catch (e) {
    GeneralActions.notify(e.message, 'long');
    }
  }

    render() {

      const { togethers, groupID, gasParam, wallet, navigation } = this.props
      const { erc20s, loading } = this.state

      if (loading === 0){

        return(

        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large" color="darkslategray"/>
          </View>
        </View>

      )

      }

      return(

        <View style={styles.container}>
          <Header/>

            <FlatList
              data={erc20s.sort((prev, next) => prev.symbol.localeCompare(next.symbol))}
              refreshControl={<RefreshControl refreshing={wallet.loading} onRefresh={() => this.updateData()} />}
              renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.content}
                activeOpacity={0.8}
                onPress={() => this.pressCard(erc20s,item, togethers, gasParam)}>
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
    }
});
