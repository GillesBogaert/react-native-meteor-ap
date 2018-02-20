/* eslint-disable import/prefer-default-export, react/prop-types */
import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ProfileLayout from '../screens/ProfileLayout';
import Profile from '../screens/Profile';

export const ProfileStack = StackNavigator({
  ProfileLayout: {
    screen: ProfileLayout,
    navigationOptions: {
      title: 'Account',
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Account',
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Account',
    },
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In',
    },
  },
}, {
  headerMode: 'screen',
});

export const Tabs = TabNavigator({
  Account: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Account',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="account-circle"
          color={tintColor}
          size={28}
        />
      ),
    },
  },
}, {
  tabBarPosition: 'bottom',
  tabBarComponent: TabBarBottom,
});
