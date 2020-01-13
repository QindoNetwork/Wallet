import React from 'react';
import { Alert, TouchableOpacity, RefreshControl,FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Button } from '@components/widgets';
import ProfileCard from './ProfileCard';
import { HeaderIcon } from '@components/widgets';
import { Gas as gas, Conversions as conversions, Restrictions as restrictions } from '@common/constants';
import { inject, observer } from 'mobx-react';
import { SecureTransaction } from '@components/widgets';
@inject('prices', 'wallet')
@observer

export class Profiles extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('item').name,
        headerRight: (
            <HeaderIcon
                name='person-add'
                size='medium'
                color={colors.white}
                onPress={() => navigation.navigate('AddProfile',
                {
                  groupID : navigation.getParam('item').id,
                  togethers : navigation.getParam('togethers'),
                  address : navigation.getParam('address'),
                  ERC20s : navigation.getParam('ERC20s'),
                  gasParam : navigation.getParam('gasParam'),
                  max : navigation.getParam('max'),
                })
              } />
        )
    })

      state = { show: false, loading: 0, profiles: [], length: 0, owner: 0, active: 0 };

      renderModal() {

        const { gasParam, togethers, erc20s, address, item, groupID, length  } = this.props.navigation.state.params;
        let limit = gasParam[gas.quitGroup].limit
        limit = limit * ( this.state.length + length )
        const price = gasParam[gas.quitGroup].price

        if (this.state.show === true) {
        return (  <SecureTransaction
              togethers={togethers}
              values={{groupID}}
              limit={limit}
              price={price}
              erc20s={erc20s}
              address={address}
              gasParam={gasParam}
              navigation={this.props.navigation}
              type={gas.quitGroup}/> )
        }
      }

      async componentDidMount() {
        const { gasParam, togethers, erc20s, address, item  } = this.props.navigation.state.params;
        let profiles = []
        try {
          this.setState({ length:  parseInt ( await togethers.getUsersLength(item.id),10),
                          active:  parseInt ( await togethers.isOpen(item.id,address),10),
                          owner : parseInt ( await togethers.isOwner(item.id,address),10) })
          if ( this.state.length > 1 ) {
            let currentAddress
            for ( var i = 0; i < this.state.length; i++ ) {
              currentAddress = await togethers.getUserAddress(item.id,i)
              if ( currentAddress !== address ) {
                profiles.push({ id:  currentAddress,
                                name: await togethers.mappAddressToUser(currentAddress) })
              }
            }
          }
          this.setState({ profiles, loading: 1 })
        } catch (e) {
        GeneralActions.notify(e.message, 'long');
        }
      }

      demand(groupID, owner, togethers, address, erc20s, gasParam) {
        if (this.state.active === 1){
          this.props.navigation.navigate('CloseDemand',{ groupID, owner, togethers, address, erc20s, gasParam })
        }
        else this.props.navigation.navigate('OpenDemand',{ groupID, owner, togethers, address, erc20s, gasParam })
      }

      onPressQuit() {
        if (this.state.owner === 1){
          GeneralActions.notify("The owner have to be the last of the group to quit", 'long');
        }
        else this.setState({ show: true })
  }

      render() {
        const { profiles, owner, active } = this.state
        const profilesLength = this.state.length
        const { gasParam, togethers, erc20s, address, item, length, max } = this.props.navigation.state.params
        const groupID = item.id

        if (this.state.loading === 0){

          return(

          <View style={styles.container}>
            <View style={styles.body}>
              <ActivityIndicator size="large"/>
            </View>
          </View>

        )

        }

      return(
        <View style={styles.container}>
        <View style={styles.buttonsContainer}>
            <Button
              children="My demand"
              onPress={() => this.demand(groupID, owner, togethers, address, erc20s, gasParam )}/>
        </View>
        <FlatList
            data={profiles.sort((prev, next) => prev.name.localeCompare(next.name))}
            renderItem={({ item }) => (
              <TouchableOpacity
              style={styles.content}
              activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate('ProfileData',{ groupID , owner, item, togethers, address, erc20s, gasParam, length, profilesLength })
              }>
                <ProfileCard profile={item} groupID={groupID} togethers={togethers}/>
              </TouchableOpacity>
            )}
        />
        <View style={styles.buttonsContainer}>
            <Button
              children="Quit"
              onSubmit={() => onPressQuit()}/>
        </View>
        {this.renderModal()}
        </View>
        )

}

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: colors.defaultBackground,
        padding: measures.defaultPadding
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    message: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'center',
        marginVertical: measures.defaultMargin,
        marginHorizontal: 32
    },
    content: {
        marginTop: measures.defaultMargin
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        height: 52
    },
    input: {
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: colors.black,
        padding: 4,
        paddingLeft: 0,
        marginRight: 2,
        textAlign: 'center',
        color: colors.black
    }
});
