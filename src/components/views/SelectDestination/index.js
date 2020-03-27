import React from 'react';
import { RefreshControl, TouchableOpacity, ActivityIndicator, FlatList, TextInput, Text, StyleSheet, View } from 'react-native';
import { Button, Camera, InputWithIcon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { inject, observer } from 'mobx-react';
import { General as GeneralActions, Languages as LanguagesActions } from '@common/actions';
import ProfileCard from './ProfileCard';

@inject('wallet','languages')
@observer
export class SelectDestination extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

    state = { loading: 0, profiles: [], address: '' };

    async componentDidMount() {
      const { address, togethers, groupID } = this.props.navigation.state.params
      const { item } = this.props.wallet
      const { languages } = this.props

       let profiles = []
       let temp = []
       try {
         const groups = await togethers.getGroups()
           for ( var i = 0; i < groups.length; i++ ) {
             temp = await togethers.getProfiles(parseInt (groups[i],10))
               for ( var j = 0; j < temp.length; j++ ) {
                  var ok = 1
                  var currentAddress = temp[j]
                  if ( currentAddress !== item.address ) {
                   for ( var k = 0; k < profiles.length; k++ ) {
                        if ( profiles[k].id === currentAddress) {
                          ok = 0
                          break
                        }
                    }
                    if ( ok === 1 ) {
                      profiles.push({   id:  currentAddress,
                                       name:  await togethers.mappAddressToUser(currentAddress)  })
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

        const { item, togethers, gasParam, amount, groupID } = this.props.navigation.state.params
        const { languages } = this.props
        this.props.navigation.navigate('ConfirmTransaction', { groupID, item, togethers, gasParam, amount, target, title: LanguagesActions.title21(languages.selectedLanguage) });

    }

    renderInput() {

      const { languages } = this.props
        return(

          <View>
              <InputWithIcon
                  ref="input"
                  autoFocus
                  icon="qr-scanner"
                  placeholder={LanguagesActions.label75(languages.selectedLanguage)}
                  onChangeText={(address) => this.setState({ address })}
                  onPressIcon={() => this.refs.camera.show()} />
              <Camera
                  ref="camera"
                  modal
                  onClose={() => this.refs.camera.hide()}
                  onBarCodeRead={address => this.refs.input.onChangeText(address)} />
          </View>


      )

      }

    render() {
      const { profiles } = this.state
      const { languages } = this.props

      if (this.state.loading === 0){

        return(

          <View style={styles.container}>
          {this.renderInput()}
                  <View style={styles.body}>
                    <ActivityIndicator size="large" color="darkslategray"/>
                  </View>
                  <View style={styles.buttonsContainer}>
                          <Button children={LanguagesActions.label138(languages.selectedLanguage)} onPress={() => this.onPressContinue(this.state.address)} />
                        </View>
          </View>


      )

      }

        return (
            <View style={styles.container}>
            {this.renderInput()}
            <View style={styles.buttonsContainer}>
                    <Button children={LanguagesActions.label138(languages.selectedLanguage)} onPress={() => this.onPressContinue(this.state.address)} />
                  </View>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightGray,
        flex: 1,
        padding: measures.defaultPadding
    },
    content: {
        flex: 1,
        alignItems: 'stretch',
        marginVertical: measures.defaultMargin
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
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        height: 52
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
    }
});
