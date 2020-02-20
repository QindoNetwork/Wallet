import React from 'react';
import { Clipboard, Share, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import QRCode from 'react-native-qrcode-svg';
import { Icon } from '@components/widgets';
import { General as GeneralActions, Languages as LanguagesActions } from '@common/actions';
import { colors, measures } from '@common/styles';
import { QRCodeCard } from '@components/widgets';

@inject('languages')
@observer
export class ReceiveCoins extends React.Component {

    render() {
      const { languages } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.centered}>{LanguagesActions.label74(languages.selectedLanguage)}</Text>
                <QRCodeCard/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground,
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
