import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Wallet as WalletUtils } from '@common/utils';
import { Wallets as WalletActions } from '@common/actions';
import { General as GeneralActions  } from '@common/actions';

export default class GroupsCard extends React.Component {

  state = {active: 0, owner: 0, loading: 0, nbDemands: 0 };

   async componentDidMount() {
     const { togethers, address, group } = this.props
     try {
       var length = parseInt ( await togethers.getUsersLength(group.id),10)
       this.setState({ owner:   parseInt ( await togethers.isOwner(group.id,address),10),
                       active:  parseInt ( await togethers.isOpen(group.id,address),10)})
       var nbDemands = 0
       for ( var i = 0; i < length; i++ ) {
           var currentAddress = await togethers.getUserAddress(group.id,i)
           var active = parseInt ( await togethers.isOpen(group.id,currentAddress),10)
           if ( currentAddress !== address && active === 1) {
             nbDemands = nbDemands + 1
           }
       }
       this.setState({ nbDemands, loading: 1 })
     } catch (e) {
     GeneralActions.notify(e.message, 'long');
     }
   }

    render() {

      const { group } = this.props;
      const { active, owner, nbDemands, loading } = this.state
      var label1 = 'ID: ' + group.id
      var label2 = ''
      if ( active === 1) {
        label2 = "active"
      }
      if ( owner === 1) {
        label1 = label1 + " (owner)"
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
                            <Text style={styles.balance}>{ nbDemands }</Text>
                            <Text style={styles.fiatBalance}>{label2}</Text>
                        </View>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        backgroundColor: colors.red,
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
        color: colors.white,
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
        color: colors.white,
        marginLeft: measures.defaultMargin,
        fontWeight: 'bold'
    },
    fiatbalance: {
        fontSize: measures.fontSizeMedium - 3,
        color: colors.white,
        marginLeft: measures.defaultMargin
    },
    next: {
        color: colors.lightGray
    }
});
