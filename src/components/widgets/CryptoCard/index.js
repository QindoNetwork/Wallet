import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Identity as IdentityAction } from '@common/actions';

export class CryptoCard extends React.Component {

  balance(value) {
      const { crypto } = this.props
      return Number(value/(Math.pow(10,crypto.decimals))).toFixed(3)
  }

  renderIcon(symbol) {
    switch (symbol) {
        case 'DAI': return <Image style={styles.avatar} source={require('../../widgets/Logos/multi-collateral-dai-dai-logo.png')} />
        case 'USDT': return <Image style={styles.avatar} source={require('../../widgets/Logos/tether-usdt-logo.png')} />
        case 'GUSD': return <Image style={styles.avatar} source={require('../../widgets/Logos/gemini-dollar-gusd-logo.png')} />
        case 'EURS': return <Image style={styles.avatar} source={require('../../widgets/Logos/statiseuro_28.png')} />
        case 'ETH': return <Image style={styles.avatar} source={require('../../widgets/Logos/ethereum-eth-logo.png')} />
        case 'TUSD': return <Image style={styles.avatar} source={require('../../widgets/Logos/trueusd-tusd-logo.png')} />
        case 'USDC': return <Image style={styles.avatar} source={require('../../widgets/Logos/usd-coin-usdc-logo.png')} />
        case 'PAX': return <Image style={styles.avatar} source={require('../../widgets/Logos/paxos-standard-pax-logo.png')} />
        case 'AEUR': return <Image style={styles.avatar} source={require('../../widgets/Logos/Augmint.png')} />
        case 'TGTU': return <Image style={styles.avatar} source={require('../../widgets/Logos/TGTU.png')} />
        case 'TGTE': return <Image style={styles.avatar} source={require('../../widgets/Logos/TGTE.png')} />
        default:
        return(  <Icon name='cash' size='large'/>)
    }
  }

    render() {

        return (
                <View style={styles.container}>
                <View style={styles.leftColumn}>
                      {this.renderIcon(this.props.crypto.symbol)}
                </View>
                    <View style={styles.middleColumn}>
                        <Text style={styles.title}>{this.props.crypto.symbol}</Text>
                        <Text style={styles.description}>{this.props.crypto.name}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <View style={styles.balanceContainer}>
                            <Text style={styles.balance}>{this.balance(this.props.crypto.balance)}</Text>
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
        width: 50,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    middleColumn: {
        flex: 2
    },
    rightColumn: {
        flex: 2,
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
    avatar: {
        width: 40,
        height: 40
    }
});
