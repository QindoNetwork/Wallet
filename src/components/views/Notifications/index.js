import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import { measures, colors } from '@common/styles';
import { Wallets as WalletActions } from '@common/actions';
import NotificationCard from './NotificationCard';
import { GeneralActions } from '@common/actions';

@inject('wallet')
@observer
export class Notifications extends React.Component {

    state = { loading: 0, filters: [] };

    componentDidMount() {
      this.updateHistory()
    }

    async updateHistory() {
      const { wallet } = this.props;
      const { togethers } = this.props.navigation.state.params;
      let filters = []
      let filter
      let temp
      let profile
      try {
          const req = await togethers.getGroups()
          for ( var i = 0; i < req.length; i++ ) {
            groupID = parseInt (req[i],10)
            profile = await togethers.mappProfileInGroup(groupID,wallet.item.address)
            if (new Boolean(profile.isMember) == true){

             }
           }

           this.setState({ filters, loading: 1 })
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
    }

    renderItem = (item) => <NotificationCard notification={item} />

    renderBody = ({ item, history, loading, pendingTransactions }) =>  (!history.length && !loading) ? (<View style={styles.container}>
        <Text style={styles.message}>
            There are still no transactions involving this wallet.
        </Text>
    </View>) : (
        <View>
        <FlatList
            style={styles.content}
            data={this.state.filters}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={() => this.updateHistory()} />}
            keyExtractor={(element) => element.hash}
            renderItem={this.renderItem(item)} />
</View>
    );

    render() {

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
                {this.renderBody(this.props.wallet)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: colors.defaultBackground,
        padding: measures.defaultPadding
    },
    content: {
        marginTop: measures.defaultMargin
    }
});
