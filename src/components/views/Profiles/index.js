import React from 'react';
import { TouchableOpacity, RefreshControl, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Languages as LanguagesActions } from '@common/actions';
import { Button } from '@components/widgets';
import ProfileCard from './ProfileCard';
import { HeaderIcon } from '@components/widgets';
import { Gas as gas, Conversions as conversions, Restrictions as restrictions } from '@common/constants';
import { inject, observer } from 'mobx-react';
import { SecureTransaction } from '@components/widgets';
import Header from './Header';

@inject('wallet','languages')
@observer
export class Profiles extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('profile').name,
        headerRight: (
            <HeaderIcon
                name='person-add'
                size='large'
                color={colors.white}
                onPress={() => navigation.navigate('AddProfile',
                {
                  groupID : navigation.getParam('profile').id,
                  togethers : navigation.getParam('togethers'),
                  gasParam : navigation.getParam('gasParam'),
                  title : navigation.getParam('title'),
                  owner : navigation.getParam('profile').owner,
                })
              } />
        )
    })

      state = { show: false, loading: 0, profiles: [] };

      renderModal() {

        const { gasParam, togethers, profile  } = this.props.navigation.state.params;
        const groupID = profile.id
        const active = profile.active

            if (this.state.show === true) {
                return (  <SecureTransaction
                  togethers={togethers}
                  values={{groupID}}
                  gasParam={gasParam}
                  navigation={this.props.navigation}
                  type={gas.quitGroup}/> )
                }
      }

      componentDidMount() {
        this.updateData()
      }

      async updateData() {
        const { gasParam, togethers, profile } = this.props.navigation.state.params;
        const { wallet } = this.props;
        const groupID = profile.id
        let profiles = []
        try {
          const req = await togethers.getProfiles(groupID)
          let currentAddress
          let temp
            for ( var i = 0; i < req.length; i++ ) {
              this.setState({ length: req.length })
              currentAddress = req[i]
              temp = await togethers.getProfileInGroup(groupID,currentAddress)
              if ( currentAddress !== wallet.item.address && new Boolean(temp.isMember) == true) {
                profiles.push({ id:  currentAddress,
                                name: temp.name,
                                owner: new Boolean(temp.owner),
                                active: new Boolean(temp.open),
                                description: temp.description
                                })
              }
          }
          this.setState({ profiles, loading: 1 })
        } catch (e) {
        GeneralActions.notify(e.message, 'long');
        }
      }

      demand(groupID, togethers, gasParam, profile, profiles) {
        const { languages } = this.props
        if (this.props.navigation.state.params.profile.active == true){
          this.props.navigation.navigate('CloseDemand',{ groupID, togethers, gasParam, profiles, profile, title: LanguagesActions.title12(languages.selectedLanguage)  })
        }
        else this.props.navigation.navigate('OpenDemand',{ groupID, togethers, gasParam, title: LanguagesActions.title13(languages.selectedLanguage)  })
      }

      render() {
        const { profiles } = this.state
        const { wallet, navigation, languages } = this.props
        const { gasParam, togethers, profile } = this.props.navigation.state.params
        const groupID = profile.id

        if (this.state.loading === 0){

          return(

          <View style={styles.container}>
            <View style={styles.body}>
              <ActivityIndicator size="large" color="darkslategray"/>
            </View>
          </View>

        )

        }

if (this.props.navigation.state.params.profile.active == true){
        return(
          <ScrollView style={styles.container}>
          <Header length={this.state.profiles.length}/>
          <View style={styles.buttonsContainer}>
              <Button
                children={LanguagesActions.label120(languages.selectedLanguage)}
                onPress={() => this.demand(groupID, togethers, gasParam, profile, profiles )}/>
          </View>
          <FlatList
              data={profiles.sort((prev, next) => prev.name.localeCompare(next.name))}
              refreshControl={<RefreshControl refreshing={wallet.loading} onRefresh={() => this.updateData()} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                style={styles.content}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ProfileData',{ item, user: profile, togethers, gasParam, groupID, title: item.name })
                }>
                  <ProfileCard profile={item} togethers={togethers}/>
                </TouchableOpacity>
              )}
          />
          </ScrollView>
          )
        }

      return(
        <ScrollView style={styles.container}>
        <Header length={this.state.profiles.length}/>
        <View style={styles.buttonsContainer}>
            <Button
              children={LanguagesActions.label120(languages.selectedLanguage)}
              onPress={() => this.demand(groupID, togethers, gasParam, profile, profiles )}/>
        </View>
        <FlatList
            data={profiles.sort((prev, next) => prev.name.localeCompare(next.name))}
            refreshControl={<RefreshControl refreshing={wallet.loading} onRefresh={() => this.updateData()} />}
            renderItem={({ item }) => (
              <TouchableOpacity
              style={styles.content}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ProfileData',{ item, user: profile, togethers, gasParam, groupID, title: item.name })
              }>
                <ProfileCard profile={item} togethers={togethers}/>
              </TouchableOpacity>
            )}
        />
        <View style={styles.buttonsContainer}>
            <Button
              children={LanguagesActions.label121(languages.selectedLanguage)}
              onSubmit={() => this.setState({ show: true })}/>
        </View>
        {this.renderModal()}
        </ScrollView>
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
