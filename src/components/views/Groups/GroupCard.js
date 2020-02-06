import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';;
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Languages as LanguagesActions  } from '@common/actions';
import { inject, observer } from 'mobx-react';

@inject('languages')
@observer
export default class GroupsCard extends React.Component {

    render() {

      const { group } = this.props;
      var label1 = '# ' + group.id
      var label2 = 'Inactive'
      var label3 = 'Member'
      if ( group.active == true) {
        label2 = "Active"
      }
      if ( group.owner == true) {
        label3 = "Owner"
      }

        return (
                <View style={styles.container}>
                    <View style={styles.leftColumn}>
                        <Icon name='cube' size='large' color={colors.lightRed}/>
                    </View>
                    <View style={styles.middleColumn}>
                        <Text style={styles.title}>{group.name}</Text>
                        <Text style={styles.description}>{label1}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <View style={styles.balanceContainer}>
                            <Text style={styles.balance}>{label2}</Text>
                            <Text style={styles.fiatbalance}>{label3}</Text>
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
        borderRadius: 10,
        alignItems: 'center',
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
        color: colors.darkGray,
        marginLeft: measures.defaultMargin
    },
    next: {
        color: colors.lightGray
    }
});
