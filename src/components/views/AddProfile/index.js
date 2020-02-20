import { General as GeneralActions  } from '@common/actions';
import React, { Component } from 'react'
import { Gas as gas } from '@common/constants';
import { colors, measures } from '@common/styles';
import { FlatList, TouchableOpacity, View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { SecureTransaction } from '@components/widgets';
import { Button, Camera, InputWithIcon } from '@components/widgets';
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions } from '@common/actions';
import ProfileCard from '../SelectDestination/ProfileCard';

@inject('languages','wallet')
@observer
export class AddProfile extends Component {

  static navigationOptions = { title: "Add a friend" };

  state = { show: false, address: '', loading: 0, profiles: [] };

  async componentDidMount() {
    const { address, togethers, groupID } = this.props.navigation.state.params
    const { item } = this.props.wallet

     let profiles = []
     let temp = []
     try {
       const no = await togethers.getProfiles(groupID)
       const groups = await togethers.getGroups()
         for ( var i = 0; i < groups.length; i++ ) {
           if ( parseInt (groups[i],10) !== groupID ) {
           temp = await togethers.getProfiles(parseInt (groups[i],10))
             for ( var j = 0; j < temp.length; j++ ) {
                var ok = 1
                var ok2 = 1
                var currentAddress = temp[j]
                if ( currentAddress !== item.address ) {
                 for ( var k = 0; k < profiles.length; k++ ) {
                      if ( profiles[k].id === currentAddress) {
                        ok = 0
                        break
                      }
                      for ( var i = 0; i < no.length; i++ ) {
                           if ( no[i].id === profiles[k].id) {
                             ok2 = 0
                             break
                           }
                       }
                  }
                  if ( ok === 1 && ok2 === 1 ) {
                    profiles.push({   id:  currentAddress,
                                     name:  await togethers.mappAddressToUser(currentAddress)  })
                  }
                }
              }
       }
       }
       this.setState({ profiles, loading: 1})
     } catch (e) {
     GeneralActions.notify(e.message, 'long');
     }
   }



   onPressContinue(target) {

       this.setState({ address: target })
       this.setState({ show: true })

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
              <View style={styles.body}>
                <ActivityIndicator size="large" color="darkslategray"/>
              </View>
            <View style={styles.buttonsContainer}>
                    <Button children={ LanguagesActions.label11(languages.selectedLanguage) } onPress={() => this.setState({ show: true })} />
                  </View>
          {this.renderModal(this.state.address)}
          </View>

    )

    }

    return (
      <View style={styles.container}>
      <InputWithIcon
          ref="input"
          autoFocus
          icon="qr-scanner"
          placeholder="Destination address"
          onChangeText={(address) => this.setState({ address })}
          onPressIcon={() => this.refs.camera.show()} />
      <Camera
          ref="camera"
          modal
          onClose={() => this.refs.camera.hide()}
          onBarCodeRead={address => this.refs.input.onChangeText(address)} />
          <Text style={styles.message}>___________________________</Text>
          <FlatList
            data={profiles.sort((prev, next) => prev.name.localeCompare(next.name))}
            renderItem={({ item }) => (
              <TouchableOpacity
              style={styles.content}
              activeOpacity={0.8}
              onPress={() => this.onPressContinue(item.id)}>
                <ProfileCard profile={item} />
              </TouchableOpacity>
            )}
        />
        <View style={styles.buttonsContainer}>
                <Button children="Continue" onPress={() => this.onPressContinue(this.state.address)} />
              </View>
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
