import React from 'react';
import { TabView } from '@components/widgets';
import { ReceiveCoins } from '..';
import { HeaderIcon } from '@components/widgets';
import { colors } from '@common/styles';
import { Languages as LanguagesActions } from '@common/actions';
import { inject, observer } from 'mobx-react';

@inject('languages')
@observer
export class MainReceive extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
          title: navigation.getParam('title'),
      })

      render() {

        return (
          <ReceiveCoins />
          );
        }
}
