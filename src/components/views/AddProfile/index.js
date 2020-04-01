import { General as GeneralActions  } from '@common/actions';
import React, { Component } from 'react'
import { Gas as gas } from '@common/constants';
import { colors, measures } from '@common/styles';
import { FlatList, TouchableOpacity, View, StyleSheet, Text, ActivityIndicator, RefreshControl } from 'react-native'
import { SecureTransaction } from '@components/widgets';
import { Button, Camera, InputWithIcon } from '@components/widgets';
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions } from '@common/actions';
import ProfileCard from '../SelectDestination/ProfileCard';
import Header from './Header';

@inject('languages','wallet')
@observer
export class AddProfile extends Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

  state = { show: false, address: '', loading: 0, profiles: [] };

  async updateData() {
    const { address, togethers, groupID, owner } = this.props.navigation.state.params

     let profiles = []
     let temp = []
     try {
       let profile = []
       if (owner == true) {
       const list = await togethers.getAskMembershipList(groupID)
         for ( var i = 0; i < list.length; i++ ) {
           profile = await togethers.getProfileInGroup(groupID,list[i])
           if ( new Boolean (profile.isMember) == false && new Boolean (profile.ask) == true ) {
           profiles.push({   id:  list[i],
                                     name:  profile.name
                                   })
              }
            }
       }
       this.setState({ profiles, loading: 1})
     } catch (e) {
     GeneralActions.notify(e.message, 'long');
     }
   }

   componentDidMount() {
     this.updateData()
    }

  renderModal(value) {

    const { gasParam, togethers, groupID  } = this.props.navigation.state.params;

    if (this.state.show === true) {
    return (  <SecureTransaction
          togethers={togethers}
          values={{groupID,value}}
          gasParam={gasParam}
          navigation={this.props.navigation}
          type={gas.createProfile}/> )
    }
  }

  render() {
    const { profiles } = this.state
    const { languages } = this.props

    if (this.props.navigation.state.params.owner == false) {
      return(

      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.message}>{ LanguagesActions.label119(languages.selectedLanguage) }</Text>
        </View>
      </View>

    )
      }

    if (this.state.loading === 0){
      return(
        <View style={styles.container}>
        <InputWithIcon
            ref="input"
            autoFocus
            icon="qr-scanner"
            placeholder={ LanguagesActions.label10(languages.selectedLanguage) }
            onChangeText={(address) => this.setState({ address })}
            onPressIcon={() => this.refs.camera.show()} />
        <Camera
            ref="camera"
            modal
            onClose={() => this.refs.camera.hide()}
            onBarCodeRead={address => this.refs.input.onChangeText(address)} />
            <Text style={styles.message}>___________________________</Text>
          <View style={styles.buttonsContainer}>
                  <Button children={ LanguagesActions.label11(languages.selectedLanguage) } onPress={() => this.setState({ show: true })} />
                </View>
        {this.renderModal(this.state.address)}
          <View style={styles.body}>
            <ActivityIndicator size="large" color="darkslategray"/>
          </View>
          </View>

    )

    }

    return (
      <View style={styles.container}>
      <InputWithIcon
          ref="input"
          autoFocus
          icon="qr-scanner"
          placeholder={ LanguagesActions.label10(languages.selectedLanguage) }
          onChangeText={(address) => this.setState({ address })}
          onPressIcon={() => this.refs.camera.show()} />
      <Camera
          ref="camera"
          modal
          onClose={() => this.refs.camera.hide()}
          onBarCodeRead={address => this.refs.input.onChangeText(address)} />
          <View style={styles.buttonsContainer}>
                  <Button children={ LanguagesActions.label11(languages.selectedLanguage) } onPress={() => this.setState({ show: true })} />
                </View>
          <Text style={styles.message}>___________________________</Text>
      <Header length={this.state.profiles.length}/>
      <FlatList
          data={profiles.sort((prev, next) => prev.name.localeCompare(next.name))}
          refreshControl={<RefreshControl refreshing={this.props.wallet.loading} onRefresh={() => this.updateData()} />}
          renderItem={({ item }) => (
            <TouchableOpacity
            style={styles.content}
            activeOpacity={0.8}
            onPress={() => {this.refs.input.onChangeText(item.id)} }
            >
              <ProfileCard profile={item}/>
            </TouchableOpacity>
          )}
      />
      {this.renderModal(this.state.address)}
      </View>
      );


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
    buttonsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        height: 52
    },
    message: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'center',
        marginVertical: measures.defaultMargin,
        marginHorizontal: 32
    }
});
