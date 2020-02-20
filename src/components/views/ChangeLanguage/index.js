import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { colors, measures } from '@common/styles';
import { Icon } from '@components/widgets';
import { Languages as LanguagesActions } from '@common/actions';
import { Languages as LanguagesConstants } from '@common/constants';

import ListItem from './ListItem';

@inject('languages')
@observer
export class ChangeLanguage extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

    get selectedLanguage() {
        return this.props.languages.selectedLanguage;
    }

    selectLanguage(language) {
        LanguagesActions.selectActiveLanguage(language);
    }

    renderItems = (items) => items.map((item, index) => (
        <ListItem onPress={() => this.selectLanguage(item.label)} key={index}>
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                {(this.selectedLanguage === item.label) && (
                    <Icon name="checkmark" size='large'/>
                )}
            </View>
        </ListItem>
    ));

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.renderItems(LanguagesConstants.AVAILABLE_LANGUAGES)}
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
        justifyContent: 'space-between'
    },
    itemTitle: {
        fontSize: measures.fontSizeMedium,
        margin: measures.defaultMargin
    }
});
