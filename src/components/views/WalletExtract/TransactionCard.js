import React from 'react';
import { Clipboard, ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Wallet as WalletUtils } from '@common/utils';
import Modal from 'react-native-modal';
import { Contracts as contractsAddress } from '@common/constants';
import { inject, observer } from 'mobx-react';
import { General as GeneralActions, Languages as LanguagesActions, Identity as IdentityAction } from '@common/actions';

@inject('languages')
@observer
export default class TransactionCard extends React.Component {

  state = { pseudoFrom: '', pseudoTo: '', show: false };

  async componentDidMount() {

    this.setState({
                      pseudoFrom : await this.props.togethers.mappAddressToUser(this.props.transaction.from),
                      pseudoTo : await this.props.togethers.mappAddressToUser(this.props.transaction.to),
                    })
  }

    get isReceiving() {
        return this.props.transaction.to === this.props.walletAddress.toLowerCase();
    }

    get from() {
      if ( this.state.pseudoFrom !== '' ){
        return this.state.pseudoFrom;
      }
      else return IdentityAction.getIdentity(this.props.transaction.from);
    }

    get to() {
      if ( this.state.pseudoTo !== ''  ){
        return this.state.pseudoTo;
      }
      else return IdentityAction.getIdentity(this.props.transaction.to)
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
      const { languages } = this.props
        return Number(this.props.transaction.isError) > 0 ? LanguagesActions.label92(languages.selectedLanguage) : LanguagesActions.label93(languages.selectedLanguage);
    }

    copyToClipboard(transaction) {
        const { languages } = this.props
        Clipboard.setString(transaction);
        GeneralActions.notify(LanguagesActions.label94(languages.selectedLanguage), 'short');
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
            children={this.isReceiving ? `${LanguagesActions.label95(this.props.languages.selectedLanguage)} ${this.from}` : `${LanguagesActions.label96(this.props.languages.selectedLanguage)} ${this.to}`} />
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
                <Text style={styles.label}>{LanguagesActions.label98(this.props.languages.selectedLanguage)} (ETH):</Text>
                <Text style={styles.value}>{this.balance.toFixed(3)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>{LanguagesActions.label99(this.props.languages.selectedLanguage)}:</Text>
                <Text style={styles.value}>{transaction.gasUsed}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>{LanguagesActions.label100(this.props.languages.selectedLanguage)}:</Text>
                <Text style={styles.value}>{this.transactionError}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>{LanguagesActions.label101(this.props.languages.selectedLanguage)}:</Text>
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
        const { transaction, walletAddress } = this.props;

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
