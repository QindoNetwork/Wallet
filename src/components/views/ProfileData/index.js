import React from 'react';
import { TouchableOpacity, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator, Alert} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { HeaderIcon } from '@components/widgets';
import { General as GeneralActions  } from '@common/actions';
import CryptoCard from './CryptoCard';
import ProfileCard from './ProfileCard';
import { inject, observer } from 'mobx-react';
import { Gas as gas, Conversions as conversions, Restrictions as restrictions } from '@common/constants';
import { SecureTransaction } from '@components/widgets';
@inject('prices', 'wallet')
@observer

export class ProfileData extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: "profile",
        headerRight: (
            <HeaderIcon
                name='cash'
                size='medium'
                color={colors.white}
                onPress={() => navigation.navigate('CryptoType1',
                {
                  ...navigation.state.params
                })
              } />

        )
    })

    state = { loading: false, spaceID: 0 };

    async componentDidMount() {
      try {
        const { togethers, groupID, profile } = this.props.navigation.state.params
        this.setState({ spaceID:  parseInt ( await togethers.getSpaceID(groupID,profile.id),10),
                        loading: 1})
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

  render() {

    const { gasParam, togethers, address, profile, groupID, owner  } = this.props.navigation.state.params;
    const target = profile.id

    if (this.state.loading === 0){

      return(

        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
        </View>
    )

    }

    if (owner === 1){
      return(
        <View style={styles.container}>
        <View style={styles.leftColumn}>
            <ProfileCard togethers={togethers} spaceID={this.state.spaceID} target={target} groupID={groupID}/>
        </View>
        <View style={styles.buttonsContainer}>
            <Button
              children="Admin profile"
              onPress={() => navigation.navigate('AdminProfile',
              {
                ...this.props.navigation.state.params
              })}/>
        </View>
      </View>)
    }

    return(
      <View style={styles.container}>
      <View style={styles.leftColumn}>
          <ProfileCard togethers={togethers} spaceID={this.state.spaceID} target={target} groupID={groupID}/>
      </View>
    </View>)


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
    middleColumn: {
        flex: 2
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
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
    buttonsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        height: 52
    },
    buttonDisabled: {
        opacity: 0.5,
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
