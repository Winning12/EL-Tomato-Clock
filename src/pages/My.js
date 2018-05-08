import React, { Component } from 'react'
import { 
    Image,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    ImageBackground,
    } from 'react-native'
import Login from './Login_new'
import Register from './Register'
import MyChart from './MyChart'
import Profile from './Profile'
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

const TransitionConfiguration = () => ({
  screenInterpolator: (sceneProps) => {
    const { scene } = sceneProps;
    const { route } = scene;
    const params = route.params || {};
    const transition = params.transition || 'forHorizontal';
    return CardStackStyleInterpolator[transition](sceneProps);
  },
});

export const ProfileRoutes = StackNavigator({
  Home: { screen: Profile },
  Login: { screen : Login},
  Register: { screen : Register},
  }, {
      transitionConfig: TransitionConfiguration,
});

export default class My extends Component {
  render() {
      return <ProfileRoutes />;
  }
}


