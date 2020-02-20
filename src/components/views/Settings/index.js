import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions } from '@common/actions';
import ListItem from './ListItem';
import { Languages as LanguagesActions } from '@common/actions';

@inject('wallet','languages')
@observer
export class Settings extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Settings'
    });

    chooseLanguage() {
        const { languages } = this.props
        this.props.navigation.navigate('ChangeLanguage', { title: LanguagesActions.title9(languages.selectedLanguage) });
    }

    eraseAllData() {
        GeneralActions.eraseAllData();
        this.props.navigation.pop();
    }

    confirmErase() {
      const { languages } = this.props
        Alert.alert(
            LanguagesActions.label79(languages.selectedLanguage),
            LanguagesActions.label80(languages.selectedLanguage),
            [
                { text: LanguagesActions.label81(languages.selectedLanguage), onPress: () => {}, style: 'cancel' },
                { text: LanguagesActions.label82(languages.selectedLanguage), onPress: () => this.eraseAllData() }
            ],
            { cancelable: false }
        );
    }

    renderItems = (items) => items.map((item, index) => (
        <ListItem onPress={item.action} key={index}>
            <View style={styles.itemContainer}>
                <View style={styles.icon}>
                    <Icon name={item.iconName} type={item.iconType} />
                </View>
                <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
        </ListItem>
    ));

    render() {
      const { languages } = this.props
        return (
            <ScrollView style={styles.container}>
                {this.renderItems([
                    { title: LanguagesActions.label83(languages.selectedLanguage), iconName: 'trash', iconType: '', action: () => this.confirmErase() },
                    { title: LanguagesActions.label84(languages.selectedLanguage), iconName: 'shirt', iconType: '', action: () => this.chooseLanguage() },
                ])}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackground,
        flex: 1
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    icon: {
        width: 24,
        height: 24,
        margin: measures.defaultMargin
    },
    itemTitle: {
        fontSize: measures.fontSizeMedium
    }
});
