import * as yup from 'yup'
import { Formik } from 'formik'
import { General as GeneralActions  } from '@common/actions';
import { Button } from '@components/widgets';
import React, { Component, Fragment } from 'react'
import { colors, measures } from '@common/styles';
import {Keyboard, View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'

export class AddProfile extends Component {

  static navigationOptions = { title: "Add a friend" };

  state = { loading: 0, owner: 0 };

  async componentDidMount() {
    const groupID = this.props.navigation.getParam('groupID')
    const address = this.props.navigation.getParam('address')
    try {
        this.setState({ owner:  parseInt ( await togethers.isOwner(groupID,address),10),
                        loading: 1})
      } catch (e) {
          GeneralActions.notify(e.message, 'long');
      }
  }

   async submitForm(value) {
    Keyboard.dismiss();
    const togethers = this.props.navigation.getParam('togethers')
    const groupID = this.props.navigation.getParam('groupID')
    try {
      let overrides = {
          gasLimit: this.props.navigation.getParam('gasParam')[4].limit,
          gasPrice: this.props.navigation.getParam('gasParam')[4].price * 1000000000,
          //nonce: 123,
          //value: utils.parseEther('1.0'),
          };
          await togethers.createProfile(groupID,value,overrides)
          GeneralActions.notify('Your transaction was sent successfully and now is waiting for confirmation. Please wait', 'long');
    } catch (e) {
        GeneralActions.notify("You cannot add this profile or he did not ask to apply", 'long');
    }
  }

  render() {

    const maxPrice =  this.props.navigation.getParam('gasParam')[4].limit * this.props.navigation.getParam('gasParam')[4].price

    const EthPrice = maxPrice / 1000000000

    if (this.state.loading === 0){

      return(

      <View style={styles.container}>
        <View style={styles.body}>
          <ActivityIndicator size="large"/>
        </View>
      </View>

    )

    }

    if (this.state.owner === 1) {

    return (
        <Formik
          initialValues={{ pseudo: '' }}
          onSubmit={values => {
            Alert.alert(
              'SignUp',
              'It will cost maximum ' + EthPrice + ' ETH',
              [
                  { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                  { text: 'Confirm', onPress: () => this.submitForm(values.pseudo) }
              ],
              { cancelable: false }
          );
          }
        }
          validationSchema={yup.object().shape({
            pseudo: yup
              .string()
              .min(2)
              .max(30)
              .required(),
          })}
        >
          {({handleChange, values, errors, setFieldTouched, touched, isValid, handleSubmit}) => (
            <Fragment>
              <View style={styles.container}>
              <View style={styles.body}>
                <TextInput
                  style={styles.input}
                  value={values.pseudo}
                  onChangeText={handleChange('pseudo')}
                  onBlur={() => setFieldTouched('pseudo')}
                  placeholder="pseudonyme"
                  />
                  <View style={styles.buttonsContainer}>
                      <Button
                          children="ADD FRIEND"
                          disabled={!isValid}
                          onPress={handleSubmit}/>
                  </View>
                  </View>
                  </View>
            </Fragment>
          )}
        </Formik>
      );

      }

      return(

      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.message}>You have to be administrator to add a member to the group</Text>
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
