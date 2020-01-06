import React from 'react';
import { TouchableOpacity, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import CryptoCard from './CryptoCard';

export class CryptoType1 extends React.Component {

  state = { loading: 0, active: 0 };

  async componentDidMount() {
    const address = this.props.navigation.getParam('address')
    const togethers = this.props.navigation.getParam('togethers')
    const groupID = this.props.navigation.getParam('groupID')
    try {
      this.setState({ active:   parseInt ( await togethers.isOpen(groupID,address),10),
                      loading: 1})
    } catch (e) {
    GeneralActions.notify(e.message, 'long');
    }
  }

    render() {

      const address = this.props.navigation.getParam('address')
      const ERC20s = this.props.navigation.getParam('ERC20s')
      const gasParam = this.props.navigation.getParam('gasParam')
      const togethers = this.props.navigation.getParam('togethers')
      const groupID = this.props.navigation.getParam('groupID')
      const type = 1

      if (this.state.loading === 0){

        return(

        <View style={styles.container}>
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
        </View>

      )

      }

      if (this.state.active === 0){

        return(

          <View style={styles.container}>
          <View style={styles.body}>
              <Text>There is no demand</Text>
              </View>
          </View>

      )
      }

      return(

        <View style={styles.container}>
            <FlatList
              data={ERC20s}
              renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.content}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('SendCoins', { control, max, crypto:item.instance, togethers, ERC20s, gasParam, address,type })}>
                  <CryptoCard crypto={item} address={address}/>
              </TouchableOpacity>
            )}
        />
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
    leftColumn: {
        width: 40,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    middleColumn: {
        flex: 2
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
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
