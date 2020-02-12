import React from 'react';
import { TouchableOpacity, RefreshControl, FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions, Languages as LanguagesActions } from '@common/actions';
import GroupCard from './GroupCard';
import Header from './Header';
import { inject, observer } from 'mobx-react';

@inject('wallet','languages')
@observer
export class Groups extends React.Component {

    state = { loading: 0, groups: [] };

    componentDidMount() {
      this.updateData()
    }

    async updateData() {
      const { togethers, wallet } = this.props
      let groups = []
      let profile
      try {
        const req = await togethers.getGroups()
        for ( var i = 0; i < req.length; i++ ) {
          groupID = parseInt (req[i],10)
          profile = await togethers.mappProfileInGroup(groupID,wallet.item.address)
         if (new Boolean(profile.isMember) == true){
            groups.push({   id:  groupID,
                            name: await togethers.mappGroupIDToGroupName(groupID),
                            owner:   new Boolean(profile.owner),
                            active:  new Boolean(profile.open),
                            description: profile.description,
                            stats: await togethers.getProfileStats(groupID,wallet.item.address)})
          }
        }
        this.setState({ groups, loading: 1 })
      } catch (e) {
      GeneralActions.notify(e.message, 'long');
      }
    }

    render() {

      const { togethers, gasParam, wallet  } = this.props;

      if (this.state.loading === 0){

        return(

        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
        </View>

      )

      }

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
          <Header length={this.state.groups.length}/>
          <FlatList
            data={this.state.groups.sort((prev, next) => prev.name.localeCompare(next.name))}
            refreshControl={<RefreshControl refreshing={wallet.item.loading} onRefresh={() => this.updateData()} />}
            renderItem={({ item }) => (
              <TouchableOpacity
              style={styles.content}
              activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate('Profiles',{ profile:item, gasParam, togethers })}>
                <GroupCard  group={item} togethers={togethers} />
              </TouchableOpacity>
            )}
        />
        <View style={styles.buttonsContainer}>
                <Button
                  children="Add group"
                  onPress={() => this.props.navigation.navigate('AddGroup', { gasParam, togethers })}/>
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
