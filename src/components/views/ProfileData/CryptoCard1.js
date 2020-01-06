import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Wallet as WalletUtils } from '@common/utils';

export default class CryptoCard1 extends React.Component {

  state = { loading: 0, amount1: 0, amount2: 0 };

  async componentDidMount() {
    const { togethers, item, from, to } = this.props
    try {
      this.setState({ amount1:  parseInt ( await togethers.mappStatsPeerToPeer(from, to, item.key),10),
                      amount2:  parseInt ( await togethers.mappStatsPeerToPeer(to, from, item.key),10),
                      loading: 1 })
    } catch (e) {
      GeneralActions.notify(e.message, 'long');
    }
  }

  balance(value) {
      const { item } = this.props
      if(item.name === 'Ethers') {
        return Number(value/1000000000)
      }
      else return Number(value/(10*item.decimals))
  }

    render() {

        if (this.state.loading === 0){

          return(

              <ActivityIndicator size="large"/>
        )

        }

        return (
                <View style={styles.container}>
                    <View style={styles.leftColumn}>
                        <Icon name='cash' size='large'/>
                    </View>
                    <View style={styles.middleColumn}>
                        <Text style={styles.title}>{this.props.item.symbol}</Text>
                        <Text style={styles.description}>{this.balance(this.state.amount1).toFixed(3)}</Text>
                    </View>
                    <View style={styles.middleColumn}>
                        <Text style={styles.title}>/</Text>
                    </View>
                    <View style={styles.middleColumn}>
                        <Text style={styles.title}>{this.props.item.symbol}</Text>
                        <Text style={styles.description}>{this.balance(this.state.amount2).toFixed(3)}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Icon name='cash' size='large'/>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: measures.defaultPadding,
        marginBottom: measures.defaultMargin,
        height: 70
    },
    leftColumn: {
        width: 40,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    middleColumn: {
        flex: 1
    },
    rightColumn: {
      width: 40,
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    title: {
        fontSize: measures.fontSizeMedium,
        color: colors.gray,
        fontWeight: 'bold'
    },
    description: {
        fontSize: measures.fontSizeMedium - 2,
        color: colors.gray,
    },
    balanceContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    balance: {
        fontSize: measures.fontSizeMedium - 1,
        color: colors.gray,
        marginLeft: measures.defaultMargin,
        fontWeight: 'bold'
    },
    fiatbalance: {
        fontSize: measures.fontSizeMedium - 3,
        color: colors.gray,
        marginLeft: measures.defaultMargin
    },
    next: {
        color: colors.lightGray
    }
});
