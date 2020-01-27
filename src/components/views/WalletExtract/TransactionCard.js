import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Wallet as WalletUtils } from '@common/utils';
import TransactionDetails from './TransactionDetails';
import { Contracts as contractsAddress } from '@common/constants';

@inject('prices')
@observer
export default class TransactionCard extends React.Component {

  state = { pseudoFrom: '', pseudoTo: '' };

  async componentDidMount() {

    this.setState({
                      pseudoFrom : await this.props.togethers.mappAddressToUser(this.props.transaction.from),
                      pseudoTo : await this.props.togethers.mappAddressToUser(this.props.transaction.to),
                    })
  }

    get isReceiving() {
        return this.to.toLowerCase() === this.props.walletAddress.toLowerCase();
    }

    get isConfirmed() {
        return this.props.transaction.confirmations > 0;
    }

    get from() {
      if (this.props.transaction.from.toLowerCase() === contractsAddress.togethersAddress.toLowerCase()){
        return 'Togethers';
      }
      if ( this.state.pseudoFrom !== '' ){
        return this.state.pseudoFrom;
      }
      else return this.props.transaction.from;
    }

    get to() {
      if (this.props.transaction.to.toLowerCase() === contractsAddress.togethersAddress.toLowerCase()){
        return 'Togethers';
      }
      if ( this.state.pseudoTo !== ''  ){
        return this.state.pseudoTo;
      }
      else return this.props.transaction.to;
    }

    get iconName() {
        return (this.isReceiving) ? 'download' : 'upload';
    }

    get balance() {
        return Number(WalletUtils.formatBalance(this.props.transaction.value));
    }

    get fiatLabel() {
        return this.props.prices.selectedRate.toUpperCase();
    }

    get fiatBalance() {
        return Number(this.props.prices.usd * this.balance).toFixed(2);
    }

    get timestamp() {
        return (this.props.transaction.timeStamp) ?
            moment.unix(this.props.transaction.timeStamp).format('DD/MM/YYYY hh:mm:ss') : 'Pending';
    }

    renderTransactionOperator = () => (
        <Text
            style={styles.operatorLabel}
            ellipsizeMode="tail"
            numberOfLines={1}
            children={this.isReceiving ? `From ${this.from}` : `To ${this.to}`} />
    );

    renderConfirmationStatus() {
        return this.isConfirmed ?
            <Icon name="checkmark" color={colors.success} /> :
            <Icon name="clock" type="ei" color={colors.pending} />
    }

    render() {
        const { transaction, walletAddress } = this.props;

        if (this.balance > 0) {
        return (
            <TouchableHighlight onPress={() => this.refs.details.wrappedInstance.show()}>
                <View style={styles.container}>
                    <View style={styles.leftColumn}>
                        <Icon name={this.iconName} type="fe" />
                    </View>
                    <View style={styles.centerColumn}>
                        {this.renderTransactionOperator()}
                        <Text>{this.timestamp}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <View style={styles.amountContainer}>
                            <Text
                                style={styles.amountLabel}
                                ellipsizeMode="tail"
                                numberOfLines={1}
                                children={this.balance.toFixed(4)} />
                            <Text style={styles.fiatLabel}>{this.fiatLabel} {this.fiatBalance}</Text>
                        </View>
                    </View>
                    <TransactionDetails
                        ref="details"
                        transaction={transaction}
                        walletAddress={walletAddress} />
                </View>
            </TouchableHighlight>
        );
        }
        return (
            <TouchableHighlight onPress={() => this.refs.details.wrappedInstance.show()}>
                <View style={styles.container}>
                    <View style={styles.leftColumn}>
                        <Icon name={this.iconName} type="fe" />
                    </View>
                    <View style={styles.centerColumn}>
                        {this.renderTransactionOperator()}
                        <Text>{this.timestamp}</Text>
                    </View>
                    <TransactionDetails
                        ref="details"
                        transaction={transaction}
                        walletAddress={walletAddress} />
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: colors.white,
        height: 64,
        marginBottom: measures.defaultMargin,
    },
    leftColumn: {
        color: colors.gray,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
    centerColumn: {
        flex: 1,
        height: 64,
        color: colors.gray,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    operatorLabel: {
        color: colors.gray,
        fontWeight: 'bold',
        fontSize: measures.fontSizeMedium
    },
    rightColumn: {
        color: colors.gray,
        paddingHorizontal: measures.defaultPadding,
        width: 150,
        flexDirection: 'row',
    },
    amountContainer: {
        flex: 1,
        flexDirection: 'column',
        color: colors.gray,
        alignItems: 'flex-end'
    },
    confirmationsContainer: {
        marginLeft: measures.defaultMargin,
        color: colors.gray,
        alignItems: 'center',
        justifyContent: 'center',
        width: 20
    },
    amountLabel: {
        fontWeight: 'bold',
        color: colors.gray,
        fontSize: measures.fontSizeMedium
    },
    fiatLabel: {
        color: colors.gray,
        fontSize: measures.fontSizeMedium - 4
    }
});
