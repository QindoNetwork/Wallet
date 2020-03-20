import React from 'react';
import { Crypto } from '..';

export class CryptoType1 extends React.Component {

  static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title')
    })

    render() {

      const { navigation } = this.props
      const { togethers, groupID, profile, gasParam } = this.props.navigation.state.params;

      return(

        <Crypto navigation = { navigation }
                togethers = { togethers }
                groupID = { groupID }
                profile = { profile }
                gasParam = { gasParam }
                type = '1'/>

      )

      }

}
