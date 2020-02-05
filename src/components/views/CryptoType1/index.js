import React from 'react';
import { Crypto } from '..';

export class CryptoType1 extends React.Component {

    render() {

      const { navigation, togethers, groupID, profile } = this.props

      return(

        <Crypto navigation = { navigation }
                togethers = { togethers }
                groupID = { groupID }
                profile = { profile }
                gasParam = { gasParam }/>

      )

      }

}
