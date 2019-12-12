import React from 'react';
import { FlatList, RefreshControl, ScrollView, Keyboard, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { HeaderIcon } from '@components/widgets';
import { Contracts, General as GeneralActions  } from '@common/actions';
import GroupCard from './GroupCard';
import NoGroups from './NoGroups';

export class Groups extends React.Component {

    state = {loading: 0, groups: [], groupNames: [] };

    componentDidMount() {
        this.populate();
    }

    async populate() {
      const { togethers, address } = this.props
      let groups = []
      let length = 0
      try {
        length = parseInt ( await togethers.getGroupsLength(address),10)
        if ( length !== 0 ) {
          for ( var i = 0; i < length; i++ ) {
            groups.push({   key:  parseInt (await togethers.getGroupID(i),10),
                            name: await togethers.getGroup(i)  })
          }
          this.setState({ groups, loading: 1})
        }
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

   onPressGroup() {
      try {
        GeneralActions.notify("work", 'long');
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

    renderItem = ({ item }) => <GroupCard group={item} onPress={() => this.onPressGroup(item)} />

    renderBody = (list) => (!list.length) ? <NoGroups /> : (
        <FlatList
            style={styles.content}
            data={list}
            refreshControl={<RefreshControl refreshing={this.loading} onRefresh={() => this.populate()} />}
            keyExtractor={(item, index) => String(index)}
            renderItem={this.renderItem} />
    );

    render() {

      const { togethers, navigation } = this.props
      const { groupIDs, groupNames } = this.state

      if (this.state.loading === 0){

        return(

        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
        </View>

      )

      }

      return (
        <View style={styles.container}>
          <View style={styles.body}>
            <ScrollView>
                {this.renderBody(this.state.groups)}
            </ScrollView>
            <View style={styles.buttonsContainer}>
              <Button
                  children="Next"
                  onPress={() => navigation.navigate('CreateGroup', {togethers})}/>
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
