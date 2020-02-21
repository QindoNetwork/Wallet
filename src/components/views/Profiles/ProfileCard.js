import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Languages as LanguagesActions } from '@common/actions';
import { Image as ImageUtils } from '@common/utils';
import { inject, observer } from 'mobx-react';

@inject('languages')
@observer
export default class ProfilesCard extends React.Component {

  get label2() {
      return (this.props.profile.active == true) ? LanguagesActions.label155(this.props.languages.selectedLanguage) : LanguagesActions.label156(this.props.languages.selectedLanguage);
  }

  get label1() {
      return (this.props.profile.owner == true) ? LanguagesActions.label157(this.props.languages.selectedLanguage) : LanguagesActions.label158(this.props.languages.selectedLanguage);
  }


    render() {

        return (
            <View style={styles.container}>
                    <View style={styles.leftColumn}>
                    <Image style={styles.avatar}
                        source={{ uri: ImageUtils.generateAvatar(this.props.profile.id,100) }} />
                    </View>
                    <View style={styles.middleColumn}>
                        <Text style={styles.title}>{this.props.profile.name}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <View style={styles.balanceContainer}>
                            <Text style={styles.balance}>{this.label2}</Text>
                            <Text style={styles.fiatbalance}>{this.label1}</Text>
                        </View>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: measures.defaultPadding,
        marginBottom: measures.defaultMargin,
        height: 70
    },
    leftColumn: {
        width: 60,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    middleColumn: {
        flex: 2
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    title: {
        fontSize: measures.fontSizeMedium,
        color: colors.gray,
        fontWeight: 'bold'
    },
    description: {
        fontSize: measures.fontSizeMedium - 2,
        color: colors.gray,
    },
    balanceContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    balance: {
        fontSize: measures.fontSizeMedium - 1,
        color: colors.gray,
        marginLeft: measures.defaultMargin,
        fontWeight: 'bold'
    },
    fiatbalance: {
        fontSize: measures.fontSizeMedium - 3,
        color: colors.gray,
        marginLeft: measures.defaultMargin
    },
    next: {
        color: colors.lightGray
    },
    avatar: {
        width: 50,
        height: 50
    }
});
