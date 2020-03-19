import React from 'react';
import { TouchableOpacity, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator, RefreshControl } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Languages as LanguagesActions } from '@common/actions';
import { Contracts as contractsAddress } from '@common/constants';
import { CryptoCard } from '@components/widgets';
import Header from './Header';
import { inject, observer } from 'mobx-react';

@inject('wallet','languages')
@observer
export class CryptoType2 extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

  state = { loading: 0, erc20s2: [] };

  componentDidMount() {
    this.updateData()
  }

  async updateData() {
    const { togethers, cryptoOne, erc20 } = this.props.navigation.state.params
    try {
    var currentAddress
    var info
    var erc20s2 = []
      for ( var i = 0; i < erc20.length; i++ ) {
        currentAddress = erc20[i].address
        info = await togethers.getCryptoInfo(currentAddress)
        if ( parseInt(info.category,10) === cryptoOne.category && currentAddress !== cryptoOne.address ) {
              balance = parseInt (await erc20[i].instance.balanceOf(contractsAddress.togethersAddress),10)
              if ( balance > 0 ) {
              erc20s2.push({
                      name: info.name,
                      symbol: info.symbol,
                      decimals: parseInt (info.decimals,10),
                      address: currentAddress,
                      balance
                     })
              }
        }
      }
      this.setState({ erc20s2, loading: 1 })
    } catch (e) {
    GeneralActions.notify(e.message, 'long');
    }
  }

    render() {

      const { togethers, gasParam, cryptoOne } = this.props.navigation.state.params
      const { wallet, languages } = this.props
      const { erc20s2 } = this.state

      if (this.state.loading === 0){

        return(

        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large" color="darkslategray"/>
          </View>
        </View>

      )

      }

      if (erc20s2.length === 0){

        return(

          <View style={styles.container}>
              <Text style={styles.message}>
                  {LanguagesActions.label164(languages.selectedLanguage)}
              </Text>
          </View>

      )

      }

      return(

        <View style={styles.container}>
        <Header/>
            <FlatList
              data={erc20s2.sort((prev, next) => prev.symbol.localeCompare(next.symbol))}
                            refreshControl={<RefreshControl refreshing={wallet.item.loading} onRefresh={() => this.updateData()} />}
              renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.content}
                activeOpacity={0.8}
                onPress={() => this.props.navigation.navigate('SendCoinsType1', { cryptoOne, item, togethers, gasParam, title: LanguagesActions.title16(languages.selectedLanguage) })}>
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
