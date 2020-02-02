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

@inject('wallet')
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
                  gasParam : navigation.getParam('gasParam'),
                  owner : navigation.getParam('item').owner,
                })
              } />
        )
    })

      state = { show: false, loading: 0, profiles: [] };

      renderModal() {

        const { gasParam, togethers, item  } = this.props.navigation.state.params;
        const groupID = item.id

        if (this.state.show === true) {
        return (  <SecureTransaction
              togethers={togethers}
              values={{groupID}}
              gasParam={gasParam}
              navigation={this.props.navigation}
              type={gas.quitGroup}/> )
        }
      }

      async componentDidMount() {
        const { gasParam, togethers, item } = this.props.navigation.state.params;
        const { wallet } = this.props;
        const groupID = item.id
        let profiles = []
        try {
          const req = await togethers.getProfiles(groupID)
          let currentAddress
            for ( var i = 0; i < req.length; i++ ) {
              currentAddress = req[i]
              var profile = await togethers.mappProfileInGroup(groupID,currentAddress)
              if ( currentAddress !== wallet.item.address && new Boolean(profile.isMember) === true) {
                profiles.push({ id:  currentAddress,
                                name: await togethers.mappAddressToUser(currentAddress),
                                owner: new Boolean(profile.owner),
                                active: new Boolean(profile.open),
                                description: profile.description})
              }
          }
          this.setState({ profiles, loading: 1 })
        } catch (e) {
        GeneralActions.notify(e.message, 'long');
        }
      }

      demand(groupID, owner, togethers, gasParam) {
        if (this.props.navigation.state.params.item.active == true){
          this.props.navigation.navigate('CloseDemand',{ groupID , owner, togethers, gasParam })
        }
        else this.props.navigation.navigate('OpenDemand',{ groupID, owner, togethers, gasParam })
      }

      onPressQuit() {
        if (this.state.owner === 1){
          GeneralActions.notify("The owner have to be the last of the group to quit", 'long');
        }
        else this.setState({ show: true })
  }

      render() {
        const { profiles } = this.state
        const { gasParam, togethers, item } = this.props.navigation.state.params
        const groupID = item.id
        const owner = item.owner
        const active = item.active

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
              onPress={() => this.demand(groupID, owner, togethers, gasParam )}/>
        </View>
        <FlatList
            data={profiles.sort((prev, next) => prev.name.localeCompare(next.name))}
            renderItem={({ item }) => (
              <TouchableOpacity
              style={styles.content}
              activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate('ProfileData',{ groupID , owner, profile: item, togethers, gasParam })
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
