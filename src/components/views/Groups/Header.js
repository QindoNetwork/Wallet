import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, measures } from '@common/styles';
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions } from '@common/actions';

@inject('languages')
@observer
export default class Header extends React.Component {

    render() {
      const { languages } = this.props
      if(this.props.length > 1){
        return (
            <View style={styles.container}>
                <View style={styles.leftColumn}>
                    <Text style={styles.title}>{this.props.length} {LanguagesActions.label38(languages.selectedLanguage)}</Text>
                </View>
            </View>
        )}
        return (
            <View style={styles.container}>
                <View style={styles.leftColumn}>
                    <Text style={styles.title}>{this.props.length} {LanguagesActions.label122(languages.selectedLanguage)}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 60,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray
    },
    leftColumn: {
        flex: 1
    },
    title: {
        fontSize: measures.fontSizeLarge,
        color: colors.black
    }
});
