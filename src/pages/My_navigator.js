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
import Login from './Login'
import Register from './Register'
import Statistic from './Statistic'
import Sharing from './MySharing'
import Profile from './Profile'
import Ranking from './Ranking'
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
  Statistic: {screen:Statistic},
  Sharing: { screen:Sharing},
  Ranking: {screen:Ranking},
  }, {
      transitionConfig: TransitionConfiguration,
});

export default class My_navigator extends Component {
  render() {
      return <ProfileRoutes />;
  }
}


