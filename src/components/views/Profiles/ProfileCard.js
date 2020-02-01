import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Image as ImageUtils } from '@common/utils';

export default class ProfilesCard extends React.Component {

    render() {
        const { profile, active, owner } = this.props;
        var label1 = 'Member'
        var label2 = 'Inactive'
        if ( active === true ) {
          label2 = "Active"
        }
        if ( owner === true ) {
          label1 = "Owner"
        }

        return (
            <View style={styles.container}>
                    <View style={styles.leftColumn}>
                    <Image style={styles.avatar}
                        source={{ uri: ImageUtils.generateAvatar(profile.id,100) }} />
                    </View>
                    <View style={styles.middleColumn}>
                        <Text style={styles.title}>{profile.name}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <View style={styles.balanceContainer}>
                            <Text style={styles.balance}>{label2}</Text>
                            <Text style={styles.fiatbalance}>{label1}</Text>
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
