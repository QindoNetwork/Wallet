import React from 'react';
import { TouchableOpacity, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Button } from '@components/widgets';
import ProfileCard from './ProfileCard';

export class Profiles extends React.Component {

    state = { loading: 0, profiles: [], length: 0 };

    async componentDidMount() {
      const togethers = this.props.navigation.getParam('togethers')
      const address = this.props.navigation.getParam('address')
      const item = this.props.navigation.getParam('item')
      let profiles = []
      try {
        this.setState({ length:  parseInt ( await togethers.getUsersLength(item.id),10) })
        if ( this.state.length !== 0 ) {
          for ( var i = 0; i < this.state.length; i++ ) {
            let currentAddress = parseInt (await togethers.getUserAddress(item.id,i),10)
            if ( currentAddress !== address ) {
              profiles.push({ id:  address,
                              name: await togethers.getUserName(item.id,i) })
            }
          }
          this.setState({ profiles, loading: 1})
        }
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

   onPressProfile(item) {
      try {
        this.props.navigation.navigate('ProfileData', { gasParam, address, ERC20s, togethers });
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

    renderBody(){
      return      (
        <FlatList
            data={this.state.profiles.sort((prev, next) => prev.name.localeCompare(next.name))}
            renderItem={({ item }) => (
              <TouchableOpacity
              style={styles.content}
              activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate('ProfileData',
              {
                groupID : this.props.navigation.getParam('item').id,
                item: item,
                togethers : this.props.navigation.getParam('togethers'),
                address : this.props.navigation.getParam('address'),
                ERC20s : this.props.navigation.getParam('ERC20s'),
                gasParam : this.props.navigation.getParam('gasParam'),
              })
              }>
                <ProfileCard group={item}/>
              </TouchableOpacity>
            )}
        />)

        }

    render() {

      const togethers = this.props.navigation.getParam('togethers')
      const max = this.props.navigation.getParam('max')

      if (this.state.loading === 0){

        return(

        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
        </View>

      )

      }

      if (this.state.length === 0){

        return(

          <View style={styles.container}>
              <Text>You have no friend</Text>
          </View>

      )

      }

      if (this.state.length >= max){

        return(

          <View style={styles.container}>
              {this.renderBody()}
          </View>

      )

      }

      return (
        <View style={styles.container}>
            {this.renderBody()}
            <View style={styles.buttonsContainer}>
              <View style={styles.body}>
                <Button
                  children="Next"
                  onPress={() => this.props.navigation.navigate('AddProfile', {togethers})}/>
              </View>
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
