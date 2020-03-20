import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Icon, HeaderIcon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { inject, observer } from 'mobx-react';
import { Languages as LanguagesActions } from '@common/actions';

@inject('languages')
@observer
export class WalletDetails extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Togethers",
        headerLeft: (
            <HeaderIcon
                name='log-out'
                size='large'
                color={colors.white}
                onPress={() => navigation.navigate('WalletsOverview',
                  { replaceRoute: true }
                )
                }/>),
    })

  render() {
    const { gasParam, togethers, groupID } = this.props.navigation.state.params;
   return (
     <View style={styles.container}>
     <TouchableOpacity onPress={() => this.props.navigation.navigate('MainReceive',{ togethers, title: LanguagesActions.title24(this.props.languages.selectedLanguage) })}>
         <View style={styles.cardContainer} backgroundColor='darkslateblue'>
         <View style={styles.leftColumn}>
         <Icon name='play' size='large' color='white' />
         </View>
             <View style={styles.middleColumn}>
                 <Text style={styles.title}>{LanguagesActions.label86(this.props.languages.selectedLanguage)}</Text>
             </View>
             <View style={styles.rightColumn}>
             <Icon name='qrcode' size='large' color='white' type='fa' />

             </View>
         </View>
     </TouchableOpacity>
     <TouchableOpacity onPress={() => this.props.navigation.navigate('MainSend',{ groupID, togethers, gasParam, title: LanguagesActions.title25(this.props.languages.selectedLanguage)  })}>
         <View style={styles.cardContainer} backgroundColor='darkred'>
         <View style={styles.leftColumn}>
         <Icon name='play' size='large' color='white'/>
         </View>
             <View style={styles.middleColumn}>
                 <Text style={styles.title}>{LanguagesActions.label87(this.props.languages.selectedLanguage)}</Text>
             </View>
             <View style={styles.rightColumn}>
             <Icon name='cube-send' size='large' color='white' type='mdc' />

             </View>
         </View>
     </TouchableOpacity>
     <TouchableOpacity onPress={() => this.props.navigation.navigate('MainNetwork',{ togethers, gasParam, title: LanguagesActions.title26(this.props.languages.selectedLanguage), title2: LanguagesActions.title6(this.props.languages.selectedLanguage) })}>
         <View style={styles.cardContainer} backgroundColor='darkslategray'>
         <View style={styles.leftColumn}>
         <Icon name='play' size='large' color='white' />
         </View>
             <View style={styles.middleColumn}>
                 <Text style={styles.title}>{LanguagesActions.label88(this.props.languages.selectedLanguage)}</Text>
             </View>
             <View style={styles.rightColumn}>
             <Icon name='contacts' size='large' color='white' />

             </View>
         </View>
     </TouchableOpacity>
     <TouchableOpacity onPress={() => this.props.navigation.navigate('MainSwap',{ togethers, gasParam, title: LanguagesActions.title27(this.props.languages.selectedLanguage) })}>
         <View style={styles.cardContainer} backgroundColor='darkblue'>
         <View style={styles.leftColumn}>
         <Icon name='play' size='large' color='white' />
         </View>
             <View style={styles.middleColumn}>
                 <Text style={styles.title}>{LanguagesActions.label89(this.props.languages.selectedLanguage)}</Text>
             </View>
             <View style={styles.rightColumn}>
             <Icon name='flask' size='large' color='white' />

             </View>
         </View>
     </TouchableOpacity>
     <TouchableOpacity onPress={() => this.props.navigation.navigate('MainHistory',{ togethers, title: LanguagesActions.title23(this.props.languages.selectedLanguage) })}>
         <View style={styles.cardContainer} backgroundColor='darkmagenta'>
         <View style={styles.leftColumn}>
         <Icon name='play' size='large' color='white' />
         </View>
             <View style={styles.middleColumn}>
                 <Text style={styles.title}>{LanguagesActions.label85(this.props.languages.selectedLanguage)}</Text>
             </View>
             <View style={styles.rightColumn}>
             <Icon name='list' size='large' color='white' />

             </View>
         </View>
     </TouchableOpacity>
     <TouchableOpacity onPress={() => this.props.navigation.navigate('MainSettings',{ togethers, gasParam, title: LanguagesActions.title28(this.props.languages.selectedLanguage) })}>
         <View style={styles.cardContainer} backgroundColor='darkcyan'>
         <View style={styles.leftColumn}>
         <Icon name='play' size='large' color='white' />
         </View>
             <View style={styles.middleColumn}>
                 <Text style={styles.title}>{LanguagesActions.label90(this.props.languages.selectedLanguage)}</Text>
             </View>
             <View style={styles.rightColumn}>
             <Icon name='settings' size='large' color='white' />

             </View>
         </View>
     </TouchableOpacity>
     </View>

   );
 }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: colors.defaultBackground,
   padding: 8,
   alignItems: 'stretch',
   justifyContent: 'flex-start',
 },
 cardContainer: {
     alignItems: 'stretch',
     borderRadius: 10,
     flexDirection: 'row',
     alignItems: 'center',
     paddingHorizontal: 8,
     marginBottom: 1,
     marginTop: 1,
     height: 130
 },
 leftColumn: {
     flex: 1,
     justifyContent: 'center',
     color: 'darkslategray'
 },
 middleColumn: {
     flex: 4,
     justifyContent: 'center',
     color: 'white'
 },
 rightColumn: {
     flex: 1,
     justifyContent: 'flex-end',
     flexDirection: 'row',
     color: 'white'
 },
 title: {
     fontSize: 20,
     color: 'white',
     fontWeight: 'bold',
     color: 'white'
 },
 avatar: {
   backgroundColor: 'transparent',
   width: 100,
   height: 100
 }
});
