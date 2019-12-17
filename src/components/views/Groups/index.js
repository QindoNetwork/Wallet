import React from 'react';
import { TouchableOpacity, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import GroupCard from './GroupCard';

export class Groups extends React.Component {

    state = {loading: 0, groups: [], length: 0 };

    async componentDidMount() {
      const { togethers, address } = this.props
      let groups = []
      try {
        this.setState({ length:  parseInt ( await togethers.getGroupsLength(address),10) })
        if ( this.state.length !== 0 ) {
          for ( var i = 0; i < this.state.length; i++ ) {
            groups.push({   id:  parseInt (await togethers.getGroupID(i),10),
                            name: await togethers.getGroup(i)  })
          }
        }
        this.setState({ groups, loading: 1})
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

    renderBody(){
      return      (
        <FlatList
            data={this.state.groups.sort((prev, next) => prev.name.localeCompare(next.name))}
            renderItem={({ item }) => (
              <TouchableOpacity
              style={styles.content}
              activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate('Profiles',
              {
                item: item,
                gasParam: this.props.gasParam,
                address: this.props.address,
                ERC20s: this.props.ERC20s,
                togethers: this.props.togethers,
                max: this.props.max,
              })
              }>
                <GroupCard group={item}/>
              </TouchableOpacity>
            )}
        />)

        }

    render() {

      const gasParam = this.props.navigation.getParam('gasParam')
      const togethers = this.props.navigation.getParam('togethers')
      const max = this.props.navigation.getParam('max')
      const address = this.props.navigation.getParam('address')

      if (this.state.loading === 0){

        return(

        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
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
                  onPress={() => this.props.navigation.navigate('AddGroup', {togethers, address, gasParam })}/>
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
