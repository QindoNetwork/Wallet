import React from 'react';
import { Clipboard, StyleSheet, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Wallet as WalletUtils } from '@common/utils';
import { General as GeneralActions  } from '@common/actions';

export default class TransactionDetails extends React.Component {

    state = { show: false };

    get balance() {
        return Number(WalletUtils.formatBalance(this.props.transaction.value));
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
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => this.hide()}>
                    <View>
                        <Icon name="close" size="large" />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Amount (ETH):</Text>
                <Text style={styles.value}>{this.balance}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Gas used:</Text>
                <Text style={styles.value}>{transaction.gasUsed}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Error:</Text>
                <Text style={styles.value}>{this.transactionError}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Transaction hash:</Text>
                <Text style={styles.value}>{transaction.hash}</Text>
            </View>
            <View style={styles.actions}>
                    <View style={styles.actionsBar}>
                        {this.renderColumn('copy', '', () => this.copyToClipboard(transaction.hash))}
                    </View>
            </View>
        </View>
    );

    render() {
        const { transaction } = this.props;
        return (
            <Modal
                isVisible={this.state.show}
                onBackButtonPress={() => this.hide()}
                onBackdropPress={() => this.hide()}
                children={this.renderBody(transaction)} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: measures.defaultPadding,
        maxHeight: 400,
        borderRadius: 4
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
    }
});
