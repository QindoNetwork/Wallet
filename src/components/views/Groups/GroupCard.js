import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';

export default class GroupsCard extends React.Component {

  state = {active: 0, loading: 0 };

   async componentDidMount() {
     const { togethers, address, group, owner } = this.props
     try {
       this.setState({ owner:   parseInt ( await togethers.isOwner(group.id,address),10),
                       active:  parseInt ( await togethers.isOpen(group.id,address),10),
                       loading: 1})
     } catch (e) {
     GeneralActions.notify(e.message, 'long');
     }
   }

    render() {

      const { group } = this.props;
      const { active, loading, owner } = this.state
      var label1 = '# ' + group.id
      var label2 = ''
      var label3 = ''
      if ( active === 1) {
        label2 = "Active"
      }
      if ( owner === 1) {
        label3 = "owner"
      }

      if (loading === 0){

        return(

        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
        </View>

      )

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
