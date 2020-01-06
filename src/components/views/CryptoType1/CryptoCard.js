import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Wallet as WalletUtils } from '@common/utils';

@inject('prices', 'wallet')
@observer

export default class CryptoCard extends React.Component {

  state = { loading: 0, balance: 0 };

  async componentDidMount() {
    try {
      if (this.props.crypto.key !== 0){
        this.setState({ balance:  parseInt ( await this.props.crypto.instance.balanceOf(this.props.address),10) })
      }
      else this.setState({ balance:  Number(WalletUtils.formatBalance(this.props.wallet.item.balance))})
      this.setState({ loading: 1})
    } catch (e) {
    GeneralActions.notify(e.message, 'long');
    }
  }

  balance(value) {
      const { crypto } = this.props
      if(crypto.name !== 'Ethers') {
        return Number(value/(10*crypto.decimals))
      }
      else return value
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
                        <Text style={styles.title}>{this.props.crypto.symbol}</Text>
                        <Text style={styles.description}>{this.props.crypto.name}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <View style={styles.balanceContainer}>
                            <Text style={styles.balance}>{this.balance(this.state.balance).toFixed(3)}</Text>
                        </View>
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
        flex: 2
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
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
