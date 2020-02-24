import React from 'react';
import { Clipboard, Share, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import QRCode from 'react-native-qrcode-svg';
import { Icon } from '@components/widgets';
import { General as GeneralActions, Languages as LanguagesActions } from '@common/actions';
import { colors, measures } from '@common/styles';

@inject('wallet','languages')
@observer
export class QRCodeCard extends React.Component {

    copyToClipboard() {
        const { item } = this.props.wallet;
        const { languages } = this.props;
        Clipboard.setString(item.address);
        GeneralActions.notify(LanguagesActions.label159(languages.selectedLanguage), 'short');
    }

    share() {
        const { item } = this.props.wallet;
        Share.share({
            title: 'Wallet address:',
            message: item.address
        });
    }

    renderColumn = (icon, label, action) => (
        <TouchableWithoutFeedback onPress={action}>
            <View style={styles.actionColumn}>
                <Icon name={icon} style={styles.actionIcon} />
                <Text style={styles.actionLabel}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    );

    render() {
        const { wallet: { item }, languages } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.centered}>
                    <QRCode size={256} value={item.address} />
                </View>
                <Text style={styles.centered}>{item.address}</Text>
                <View style={styles.actions}>
                    <View style={styles.actionsBar}>
                        {this.renderColumn('copy', LanguagesActions.label160(languages.selectedLanguage), () => this.copyToClipboard())}
                        {this.renderColumn('share', LanguagesActions.label161(languages.selectedLanguage), () => this.share())}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-around',
        padding: measures.defaultPadding
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
    centered: {
        alignSelf: 'center'
    }

});
