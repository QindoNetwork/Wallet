import React from 'react';
import { Clipboard, ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Wallet as WalletUtils } from '@common/utils';
import Modal from 'react-native-modal';
import { Contracts as contractsAddress } from '@common/constants';
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions } from '@common/actions';

@inject('languages')
@observer
export default class TransactionCard extends React.Component {

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
      if (this.props.transaction.from === ''){
        return 'unknown contract';
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
      if (this.props.transaction.to === ''){
        return 'unknown contract';
      }
      else return this.props.transaction.to;
    }

    get iconName() {
        return (this.isReceiving) ? 'download' : 'upload';
    }

    get balance() {
        return Number(WalletUtils.formatBalance(this.props.transaction.value));
    }

    get timestamp() {
        return (this.props.transaction.timeStamp) ?
            moment.unix(this.props.transaction.timeStamp).format('DD/MM/YYYY hh:mm:ss') : 'Pending';
    }

    get transactionError() {
        return Number(this.props.transaction.isError) > 0 ? 'Yes' : 'No';
    }

    copyToClipboard(transaction) {
        Clipboard.setString(transaction);
        GeneralActions.notify('Copied to clipboard', 'short');
    }

    renderColumn = (icon, label, action) => (
        <TouchableWithoutFeedback onPress={action}>
            <View style={styles.actionColumn}>
                <Icon name={icon} style={styles.actionIcon} />
                <Text style={styles.actionLabel}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    );

    show() {
        this.setState({ show: true });
    }

    hide() {
        this.setState({ show: false });
    }

    renderTransactionOperator = () => (
        <Text
            style={styles.operatorLabel}
            ellipsizeMode="tail"
            numberOfLines={1}
            children={this.isReceiving ? `From ${this.from}` : `To ${this.to}`} />
    )

    renderBody = (transaction) => (
        <View style={styles.container2}>
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => this.hide()}>
                    <View>
                        <Icon name="close" size="large" />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Amount (ETH):</Text>
            </View>
            <View style={styles.actions}>
                    <View style={styles.actionsBar}>
                        {this.renderColumn('copy', '', () => this.copyToClipboard('tatatat'))}
                    </View>
            </View>
        </View>
    );

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
            <TouchableOpacity onPress={() => this.show()}>
                <View style={styles.container}>
                    <View style={styles.leftColumn}>
                        <Icon name={this.iconName} type="fe" />
                    </View>
                    <View style={styles.centerColumn}>
                        {this.renderTransactionOperator()}
                        <Text>{this.timestamp}</Text>
                    </View>
                    <Modal
                        isVisible={this.state.show}
                        onBackButtonPress={() => this.hide()}
                        onBackdropPress={() => this.hide()}
                        children={this.renderBody(transaction)} />
                </View>
            </TouchableOpacity>
        );
        }
        return (
            <TouchableOpacity onPress={() => this.show()}>
                <View style={styles.container}>
                    <View style={styles.leftColumn}>
                        <Icon name={this.iconName} type="fe" />
                    </View>
                    <View style={styles.centerColumn}>
                        {this.renderTransactionOperator()}
                        <Text>{this.timestamp}</Text>
                    </View>
                    <Modal
                        isVisible={this.state.show}
                        onBackButtonPress={() => this.hide()}
                        onBackdropPress={() => this.hide()}
                        children={this.renderBody(transaction)} />
                </View>
            </TouchableOpacity>
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
    },
    header: {
        paddingVertical: measures.defaultPadding,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    content: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: colors.secondary
    },
    row: {
        alignItems: 'center',
        flexDirection: 'column',
        marginVertical: measures.defaultMargin / 2
    },
    actions: {
        height: 56
    },
    actionsBar: {
        flexDirection: 'row',
        flex: 3
    },
    actionColumn: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    value: {
        textAlign: 'center'
    },
    container2: {
        backgroundColor: colors.white,
        paddingHorizontal: measures.defaultPadding,
        maxHeight: 400,
        borderRadius: 4
    },
});
