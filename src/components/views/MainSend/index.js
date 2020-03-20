import React from 'react';
import { TabView } from '@components/widgets';
import { Crypto } from '..';
import { HeaderIcon } from '@components/widgets';
import { colors } from '@common/styles';
import { Languages as LanguagesActions } from '@common/actions';
import { inject, observer } from 'mobx-react';

@inject('languages')
@observer
export class MainSend extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
          title: navigation.getParam('title'),
      })

      render() {

        return (
          <Crypto togethers = {this.props.navigation.getParam('togethers')} navigation = {this.props.navigation} groupID = '0' gasParam = {this.props.navigation.getParam('gasParam')} />
          );
        }
}
