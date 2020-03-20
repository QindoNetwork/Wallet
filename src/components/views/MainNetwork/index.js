import React from 'react';
import { TabView } from '@components/widgets';
import { Groups } from '..';
import { HeaderIcon } from '@components/widgets';
import { colors } from '@common/styles';
import { Languages as LanguagesActions } from '@common/actions';
import { inject, observer } from 'mobx-react';

@inject('languages')
@observer
export class MainNetwork extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
          title: navigation.getParam('title'),
          headerRight: (
              <HeaderIcon
                  name='add'
                  size='large'
                  color={colors.white}
                  onPress={() => navigation.navigate('AddGroup', { gasParam: navigation.getParam('gasParam'), togethers: navigation.getParam('togethers'), title: navigation.getParam('title2') }
                  )
                  }/>),
      })

      render() {

        return (
          <Groups navigation = {this.props.navigation} gasParam = {this.props.navigation.getParam('gasParam')} togethers = {this.props.navigation.getParam('togethers')} mode = '1' />
          );
        }
}
