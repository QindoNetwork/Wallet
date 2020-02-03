import React from 'react';
import { TouchableOpacity, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Button } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { General as GeneralActions  } from '@common/actions';
import { Crypto } from '..';

export class CryptoType1 extends React.Component {

    render() {

      if (this.props.active === 0){

        return(

          <View style={styles.container}>
          <View style={styles.body}>
              <Text style={styles.message}>There is no demand</Text>
              </View>
          </View>

      )
      }

      return(

        <Crypto navigation = {this.props.navigation} {...this.props.navigation.state.params}/>

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
