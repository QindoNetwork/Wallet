import React from 'react';
import { TouchableOpacity, RefreshControl, FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import GroupCard from './GroupCard';
import Header from './Header';

export class Groups extends React.Component {

    state = { loading: 0, groups: [] };

    async componentDidMount() {
      const { togethers, address } = this.props
      let groups = []
      try {
        const req = await togethers.getGroups()
        for ( var i = 0; i < req.length; i++ ) {
          groupID = parseInt (req[i],10)
          groups.push({   id:  groupID,
                          name: await togethers.mappGroupIDToGroupName(groupID)  })
        }
        this.setState({ groups, loading: 1 })
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

    render() {

      const { address, togethers, gasParam  } = this.props;

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
          <Header/>
          <FlatList
            data={this.state.groups.sort((prev, next) => prev.name.localeCompare(next.name))}
            renderItem={({ item }) => (
              <TouchableOpacity
              style={styles.content}
              activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate('Profiles',{ item, gasParam, address, togethers })}>
                <GroupCard  group={item} address={address} togethers={togethers} />
              </TouchableOpacity>
            )}
        />
        <View style={styles.buttonsContainer}>
                <Button
                  children="Add group"
                  onPress={() => this.props.navigation.navigate('AddGroup', { ...this.props })}/>
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
