import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import { measures, colors } from '@common/styles';
import { Wallets as WalletActions, General as GeneralActions } from '@common/actions';
import NotificationCard from './NotificationCard';
import { ethers } from 'ethers';
import { Contracts as contractsAddress, Network as EthereumNetworks } from '@common/constants';

@inject('wallet')
@observer
export class Notifications extends React.Component {

  static navigationOptions = { title: "Notifications" };

    state = { loading: 0, filters: [] };

    componentDidMount() {
      this.updateHistory()
    }

    async updateHistory() {
      const { wallet } = this.props;
      const { togethers } = this.props.navigation.state.params;
      let filters = []
      let filter
      const topic = ethers.utils.id("askEvent(uint256,address)");
      let temp
      let profile
      try {
          const req = await togethers.getGroups()
          for ( var i = 0; i < req.length; i++ ) {
            groupID = parseInt (req[i],10)
            profile = await togethers.getProfileInGroup(groupID,wallet.item.address)
            if (new Boolean(profile.isMember) == true){
              filter = {
                  address: contractsAddress,
                  topics: [ topic ]
                }
                EthereumNetworks.fallbackProvider.on(filter, (result) => {
                  filters.push(result)
                  });
             }
           }

           this.setState({ filters, loading: 1 })
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
    }

    renderItem = (item) => <NotificationCard notification={item} />

    render() {

      if (this.state.loading === 0){

        return(

        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large" color="darkslategray"/>
          </View>
        </View>

      )

      }

        return (
            <View style={styles.container}>
            <FlatList
                style={styles.content}
                data={this.state.filters}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={() => this.updateHistory()} />}
                keyExtractor={(element) => element.hash}
                renderItem={this.renderItem(item)} />
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
