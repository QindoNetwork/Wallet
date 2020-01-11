import React from 'react';
import { Alert, TouchableOpacity, RefreshControl,FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Button } from '@components/widgets';
import ProfileCard from './ProfileCard';
import { HeaderIcon } from '@components/widgets';
import { Gas as gas } from '@common/constants';
import { inject, observer } from 'mobx-react';
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
                })
              } />
        )
    })

      state = { loading: 0, profiles: [], length: 0, owner: 0, active: 0, gasParam: this.props.navigation.getParam('gasParam'), functionIndex: gas.quitGroup };

      async componentDidMount() {
        const togethers = this.props.navigation.getParam('togethers')
        const address = this.props.navigation.getParam('address')
        const item = this.props.navigation.getParam('item')
        const gasParam = this.state.gasParam
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

      demand(groupID, owner, togethers, address, ERC20s, gasParam) {
        if (this.state.active === 1){
          this.props.navigation.navigate('CloseDemand',{ groupID, owner, togethers, address, ERC20s, gasParam })
        }
        else this.props.navigation.navigate('OpenDemand',{ groupID, owner, togethers, address, ERC20s, gasParam })
      }

      async onPressQuit(groupID,togethers,price,limit) {
        if (this.state.owner === 1){
          GeneralActions.notify("The owner have to be the last of the group to quit", 'long');
        }
        let overrides = {
        gasLimit: limit * this.state.length,
        gasPrice: price * 1000000000,
        //nonce: 123,
        //value: utils.parseEther('1.0'),
        };
      try {
        await togethers.quitGroup(groupID,overrides)
        this.props.navigation.navigate('WalletDetails', { wallet: this.props.swallet.item, replaceRoute: true, leave: 3 });
        GeneralActions.notify('Your transaction was sent successfully and now is waiting for confirmation. Please wait', 'long');
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
  }

      render() {
        const { profiles, length, owner, active } = this.state
        const { navigation } = this.props
        const groupID = navigation.getParam('item').id
        const togethers = navigation.getParam('togethers')
        const address = this.props.navigation.getParam('address')
        const ERC20s = this.props.navigation.getParam('ERC20s')
        const gasParam = this.state.gasParam
        const max = navigation.getParam('max')
        const limit = gasParam[this.state.functionIndex].limit
        const price = gasParam[this.state.functionIndex].price
        const ethPrice = (price * limit * this.state.length) / 1000000000


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
              onPress={() => this.demand(groupID, owner, togethers, address, ERC20s, gasParam)}/>
        </View>
        <FlatList
            data={profiles.sort((prev, next) => prev.name.localeCompare(next.name))}
            renderItem={({ item }) => (
              <TouchableOpacity
              style={styles.content}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ProfileData',{ groupID, owner, item, togethers, address, ERC20s, gasParam })
              }>
                <ProfileCard profile={item} groupID={groupID} togethers={togethers}/>
              </TouchableOpacity>
            )}
        />
        <View style={styles.buttonsContainer}>
            <Button
              children="Quit"
              onPress={() => {
                  Alert.alert(
                    'SignUp',
                    'It will cost maximum ' + ethPrice + ' ETH',
                    [
                        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                        { text: 'Confirm', onPress: () => this.onPressQuit(groupID,togethers,price,limit) }
                    ],
                    { cancelable: false }
                );
                }
              }/>
        </View>
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
