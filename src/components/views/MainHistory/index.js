import React from 'react';
import { TabView } from '@components/widgets';
import { WalletExtract } from '..';
import { HeaderIcon } from '@components/widgets';
import { colors } from '@common/styles';
import { Languages as LanguagesActions } from '@common/actions';
import { inject, observer } from 'mobx-react';

@inject('languages')
@observer
export class MainHistory extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
          title: navigation.getParam('title'),
      })

      render() {

        return (
          <WalletExtract togethers = {this.props.navigation.getParam('togethers')} />
          );
        }

}
