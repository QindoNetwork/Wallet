import * as yup from 'yup'
import { Formik } from 'formik'
import { General as GeneralActions  } from '@common/actions';
import { Button } from '@components/widgets';
import React, { Component, Fragment } from 'react'
import { colors, measures } from '@common/styles';
import { Keyboard, View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'

export class AddGroup extends Component {

  static navigationOptions = { title: "Add group" };

  render() {

      return (
          <View style={styles.container}>
              <View style={styles.body}>
                <View style={styles.buttonsContainer}>
                  <Button
                    children="Create a new group"
                    onPress={() => this.props.navigation.navigate('CreateGroup',
                    {
                      togethers : this.props.navigation.getParam('togethers'),
                      address : this.props.navigation.getParam('address'),
                      gasParam : this.props.navigation.getParam('gasParam'),
                    })}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                  <Button
                    children="Apply for an existing one"
                    onPress={() => this.props.navigation.navigate('AskGroup',
                    {
                      togethers : this.props.navigation.getParam('togethers'),
                      address : this.props.navigation.getParam('address'),
                      gasParam : this.props.navigation.getParam('gasParam'),
                    })}
                    />
                </View>
              </View>
          </View>
      );
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
    buttonDisabled: {
        opacity: 0.5,
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
