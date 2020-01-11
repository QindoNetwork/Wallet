import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Image as ImageUtils } from '@common/utils';

export default class ProfilesCard extends React.Component {

  state = {active: 0, owner: 0, loading: 0 };

   async componentDidMount() {

     const { togethers, address, profile, groupID } = this.props
     try {
       this.setState({ owner:   parseInt ( await togethers.isOwner(groupID,profile.id),10),
                       active:  parseInt ( await togethers.isOpen(groupID,profile.id),10),
                       loading: 1 })
     } catch (e) {
     GeneralActions.notify(e.message, 'long');
     }
   }

    render() {
        const { profile } = this.props;
        const { active, owner, loading } = this.state
        var label1 = ''
        var label2 = ''
        if ( active === 1) {
          label2 = "active"
        }
        if ( owner === 1) {
          label1 = "owner"
        }

        if (loading === 0){

          return(

          <View style={styles.container}>
            <View style={styles.body}>
              <ActivityIndicator size="large"/>
            </View>
          </View>
        )}

        return (
            <View style={styles.container}>
                    <View style={styles.leftColumn}>
                    <Image style={styles.avatar}
                        source={{ uri: ImageUtils.generateAvatar(profile.id,50) }} />
                    </View>
                    <View style={styles.middleColumn}>
                        <Text style={styles.title}>{profile.name}</Text>
                        <Text style={styles.description}>{label1}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <View style={styles.balanceContainer}>
                            <Text style={styles.balance}>{label2}</Text>
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
        width: 40,
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
        width: 20,
        height: 20
    }
});
