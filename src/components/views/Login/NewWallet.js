import React, { Fragment } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Languages as LanguagesActions } from '@common/actions';
import { inject, observer } from 'mobx-react';
import { QRCodeCard } from '@components/widgets';

@inject('languages')
@observer
export default class NewWallet extends React.Component {

    render() {
      const { languages } = this.props
      return (
        <View style={styles.container}>
        <Text style={styles.centered}>{LanguagesActions.label43(languages.selectedLanguage)}</Text>
        <QRCodeCard/>
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
    centered: {
        alignSelf: 'center'
    }
});
