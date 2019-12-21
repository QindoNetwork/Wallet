import React from 'react';
import { Alert, TouchableOpacity, RefreshControl,FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Button } from '@components/widgets';
import ProfileCard from './ProfileCard';
import { HeaderIcon } from '@components/widgets';
import Case1 from './Case1';
import Case2 from './Case2';
import Case3 from './Case3';
import Case4 from './Case4';

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

      state = { loading: 0, profiles: [], length: 0, owner: 0, active: 0 };

    async componentDidMount() {
      const togethers = this.props.navigation.getParam('togethers')
      const address = this.props.navigation.getParam('address')
      const item = this.props.navigation.getParam('item')
      let profiles = []
      try {
        this.setState({ length:  parseInt ( await togethers.getUsersLength(item.id),10),
                        active:  parseInt ( await togethers.isOpen(item.id,address),10),
                        owner : parseInt ( await togethers.isOwner(item.id,address),10) })
        if ( this.state.length > 1 ) {
          for ( var i = 0; i < this.state.length; i++ ) {
            let currentAddress = await togethers.getUserAddress(item.id,i)
            if ( currentAddress !== address ) {
              profiles.push({ id:  currentAddress,
                              name: await togethers.getUserName(item.id,i) })
            }
          }
        }
        this.setState({ profiles, loading: 1})
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

    render() {
      const { profiles } = this.state
      const { navigation } = this.props
      const groupID = navigation.getParam('item').id
      const togethers = navigation.getParam('togethers')
      const address = this.props.navigation.getParam('address')
      const ERC20s = this.props.navigation.getParam('ERC20s')
      const gasParam = this.props.navigation.getParam('gasParam')
      const max = navigation.getParam('max')


      if (this.state.loading === 0){

        return(

        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
        </View>

      )

      }

      if ((this.state.owner === 0 && this.state.length > 1) || (this.state.owner === 1 && this.state.length === 1)){

        if (this.state.active === 1){

        return(

              <Case1/>

      )
        }

        return(

              <Case2/>

      )

      }

      if (this.state.active === 1){

      return(

            <Case3/>

    )
      }

      return(

            <Case4/>
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
    content: {
        marginTop: measures.defaultMargin
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
