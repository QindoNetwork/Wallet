import React from 'react';
import { TouchableOpacity, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import CryptoCard from './CryptoCard';

export class Crypto extends React.Component {

    render() {

      const gasParam = this.props.navigation.getParam('gasParam')
      const togethers = this.props.navigation.getParam('togethers')
      const max = this.props.navigation.getParam('max')
      const address = this.props.navigation.getParam('address')
      const erc20s = this.props.navigation.getParam('erc20s')

      return(

        <View style={styles.container}>
          <View style={styles.body}>
        <FlatList
            data={erc20s}
            renderItem={({ item }) => (
              <TouchableOpacity
              style={styles.content}
              activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate('SendCoins',
              {
                item: item,
                gasParam: this.props.gasParam,
                address: this.props.address,
                ERC20s: this.props.ERC20s,
                togethers: this.props.togethers,
                max: this.props.max,
              })
              }>
                <CryptoCard instance={item.instance} address={address}/>
              </TouchableOpacity>
            )}
        />
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
