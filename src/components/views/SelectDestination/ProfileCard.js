import React from 'react';
import { Image, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Image as ImageUtils } from '@common/utils';

export default class ProfilesCard extends React.Component {

    render() {
        const { profile } = this.props;

        return (
            <View style={styles.container}>
                    <View style={styles.leftColumn}>
                    <Image style={styles.avatar}
                        source={{ uri: ImageUtils.generateAvatar(profile.id,100) }} />
                    </View>
                    <View style={styles.middleColumn}>
                        <Text style={styles.title}>{profile.name}</Text>
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
    title: {
        fontSize: measures.fontSizeMedium,
        color: colors.gray,
        fontWeight: 'bold'
    },
    avatar: {
        width: 50,
        height: 50
    }
});
